import mock
import os
from google.cloud import datastore, storage
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import base64, json
from uuid import uuid4
import jwt
import hashlib

app = FastAPI()
bucket_name = "weighty-archive-270701.appspot.com"
key = 'sGhH?&zm?n6RmR8rJyrHe)VW?6?)NMmsX8zhAV8z&wwhhzs&8m'
salt = 'dhG_CkqG{JtsCSSnJ~sqtdJ=D=^qP^k4dYP3x?%3CY}Y7+q?Pq'
expiry_time = 10

origins = [
    "https://usport.club"
    "https://usport.club/signin"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
)

if os.getenv('GAE_ENV', '').startswith('standard'):
    #production
    db = datastore.Client()
else:
    # localhost
    os.environ["DATASTORE_DATASET"] = "test"
    os.environ["DATASTORE_EMULATOR_HOST"] = "localhost:8001"
    os.environ["DATASTORE_EMULATOR_HOST_PATH"] = "localhost:8001/datastore"
    os.environ["DATASTORE_HOST"] = "http://localhost:8001"
    os.environ["DATASTORE_PROJECT_ID"] = "test"
    db = datastore.Client(project="test")

def getGCSBucket():
    storage_client = storage.Client.from_service_account_json('serviceaccountkey.json')
    bucket = storage_client.get_bucket(bucket_name)
    return bucket

@app.post('/new_post')
async def create_post(request: Request, heading, body, authToken):

    if verifyAuthToken(authToken):
        request_forms_list = await request.form()
        image = request_forms_list.getlist('image')[0]
        image_name = None
        if image != 'null':
            image_name = str(uuid4()) + '_' + image.filename
            image_data = image.file
            bucket = getGCSBucket()
            blob = bucket.blob(image_name)
            blob.upload_from_file(image_data)
        post = datastore.Entity(db.key("Post"))
        post.update(
            {
                "image_name": image_name,
                "image": None,
                "heading": heading,
                "body": body,
                "date": datetime.now()
            }
        )

        db.put(post)

    posts = get_posts()
    return posts



def verifyAuthToken(authToken):
    decoded_token = jwt.decode(authToken, key=key, algorithms=['HS256', ])
    username = decoded_token['user']
    pwd = decoded_token['pwd']
    time_diff = datetime.now() - datetime.fromtimestamp(decoded_token['iat'])
    expiry = timedelta(hours=expiry_time)
    if verifyCredentials(username, pwd) and time_diff <= expiry:
        return True 
    else:
        return False

def verifyCredentials(username, pwd):
    query = db.query(kind="User")
    query.add_filter("username", "=", username)
    query.add_filter("pwd", "=", pwd)
    results = list(query.fetch())
    if results:
        return True
    else:
        return False

def encrypt_string(hash_string):
    salted_password = hash_string + salt
    sha_signature = hashlib.sha256(hash_string.encode()).hexdigest()
    return sha_signature

def create_auth_payload(decoded_payload):
    decoded_payload['iat'] = datetime.now()
    unsalted_password = decoded_payload['pwd']
    encrypted_password = encrypt_string(unsalted_password)
    decoded_payload['pwd'] = encrypted_password
    return decoded_payload


@app.post('/signin')
async def create_access_token(request: Request):

    request_body = await request.body()
    decoded_payload = json.loads(base64.b64decode(request_body))
    auth_payload = create_auth_payload(decoded_payload)

    new_token = jwt.encode(
        auth_payload,
        key,
        algorithm='HS256'
    )
    return new_token

@app.get('/get_posts')
def get_posts():
    post_query = db.query(kind="Post")
    post_query.order = ["-date"]
    posts = list(post_query.fetch())
    bucket = getGCSBucket()
    for post in posts:
        if 'image_name' in post and post['image_name'] is not None:
            blob = bucket.blob(post['image_name'])
            if 'image' in post and post['image'] is not None:
                contents = base64.b64encode(blob.download_as_string())
                post['image'] = contents
    return posts


@app.post('/new_user')
async def create_user(username, pwd):
    user = datastore.Entity(db.key("User"))
    encrypted_password = encrypt_string(pwd)
    user.update(
        {
            "username": username,
            "pwd": encrypted_password
        }
    )
    db.put(user)
    users = get_users()
    return users

@app.get('/get_users')
def get_users():
    user_query = db.query(kind="User")
    users = list(user_query.fetch())
    return users
    