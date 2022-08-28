import mock
import os
from google.cloud import datastore, storage
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import base64, json
from uuid import uuid4
import jwt
import hashlib
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv


app = FastAPI()
expiry_time = 10



if os.getenv('GAE_ENV', '').startswith('standard'):
    #production
    db = datastore.Client()
    origins = [
    "https://usport.club"
    ]
else:
    # localhost
    load_dotenv()
    db = datastore.Client(project="test")
    origins = [
    "https://usport.club",
    "http://localhost:3000/",
    ]

bucket_name = os.getenv('bucket_name')
key = os.getenv('key')
salt = os.getenv('salt')
service_account_filename = os.getenv('service_account_filename')



app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def getGCSBucket():
    storage_client = storage.Client.from_service_account_json(service_account_filename)
    bucket = storage_client.get_bucket(bucket_name)
    return bucket


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


def create_auth_payload(decoded_payload, encrypted_password):
    decoded_payload['iat'] = datetime.now()
    decoded_payload['pwd'] = encrypted_password
    return decoded_payload


@app.post('/signin')
async def signIn(request: Request):

    request_body = await request.body()
    decoded_payload = json.loads(base64.b64decode(request_body))
    username = decoded_payload['user']
    unsalted_password = decoded_payload['pwd']
    encrypted_password = encrypt_string(unsalted_password)
    if verifyCredentials(username, encrypted_password):
        auth_payload = create_auth_payload(decoded_payload, encrypted_password)
        new_token = jwt.encode(
            auth_payload,
            key,
            algorithm='HS256'
        )
        return new_token
    else:
        raise HTTPException(status_code=401, detail="Incorrect Username or Password")
    raise HTTPException(status_code=400, detail="Bad Login")


@app.post('/new_post')
async def create_post(request: Request, heading, body, authToken, location):
    
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
                "date": datetime.now(),
                "location": location
            }
        )

        db.put(post)


    
    posts = get_posts(location)
    return posts


@app.get('/get_posts/{location}')
def get_posts(location):
    post_query = db.query(kind="Post")
    post_query.order = ["-date"]
    if location != 'all':
        post_query.add_filter("location", "=", location)
    posts = list(post_query.fetch())
    bucket = getGCSBucket()
    for post in posts:
        if 'image_name' in post and post['image_name'] is not None:
            blob = bucket.blob(post['image_name'])
            contents = base64.b64encode(blob.download_as_string())
            post['image'] = contents
    return posts


# @app.post('/new_user')
# async def create_user(username, pwd):
#     user = datastore.Entity(db.key("User"))
#     encrypted_password = encrypt_string(pwd)
#     user.update(
#         {
#             "username": username,
#             "pwd": encrypted_password
#         }
#     )
#     db.put(user)
#     users = get_users()
#     return users

# @app.get('/get_users')
# def get_users():
#     user_query = db.query(kind="User")
#     users = list(user_query.fetch())
#     return users


@app.post('/new_event')
async def create_schedule(heading, body, authToken, startDate, endDate, location):
    print(startDate)
    if verifyAuthToken(authToken):
        event = datastore.Entity(db.key("Events"))
        event.update(
            {
                "heading": heading,
                "body": body,
                "startDate": startDate,
                "endDate": endDate,
                "location": location
            }
        )
        db.put(event)

@app.get('/get_upcoming_events/{location}')
def get_upcoming_events(location):
    now = str(int(datetime.now().timestamp()))
    event_query = db.query(kind="Events")
    event_query.add_filter("startDate", ">=", now)
    event_query.add_filter("location", "=", location)
    event_query.order = ["-startDate"]
    events = list(event_query.fetch(limit=3))
    return events

@app.get('/get_past_events/{location}')
def get_upcoming_events(location):
    now = str(int(datetime.now().timestamp()))
    event_query = db.query(kind="Events")
    event_query.add_filter("startDate", "<=", now)
    event_query.add_filter("location", "=", location)
    event_query.order = ["startDate"]
    events = list(event_query.fetch(limit=3))
    return events

@app.post('/new_profile')
async def create_schedule(request: Request, name, title, authToken):
    if verifyAuthToken(authToken):
        request_forms_list = await request.form()
        image = request_forms_list.getlist('image')[0]
        if image != 'null':
            image_name = str(uuid4()) + '_' + image.filename
            image_data = image.file
            bucket = getGCSBucket()
            blob = bucket.blob(image_name)
            blob.upload_from_file(image_data)
        profile = datastore.Entity(db.key("Profile"))
        profile.update(
            {
                "image_name": image_name,
                "image": None,
                "name": name,
                "title": title,
            }
        )
        db.put(profile)

    profiles = get_profiles()
    return profiles 

@app.get('/get_profiles')
def get_profiles():
    profile_query = db.query(kind="Profile")
    profiles = list(profile_query.fetch())
    bucket = getGCSBucket()
    for profile in profiles:
        if 'image_name' in profile and profile['image_name'] is not None:
            blob = bucket.blob(profile['image_name'])
            contents = base64.b64encode(blob.download_as_string())
            profile['image'] = contents
    return profiles

@app.post('/new_contact')
def create_contact(name, email, body):
    pass


# @app.delete('/delete/{kind}')
# def delete(kind):
#     delete_query = db.query(kind=kind)
#     deletes = list(delete_query.fetch())
#     for delete in deletes:
#         db.delete(delete.key)
    