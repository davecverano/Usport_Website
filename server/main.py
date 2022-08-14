from google.cloud import datastore
from fastapi import FastAPI

app = FastAPI()
datastore_client = datastore.Client()

def store_post(dt):
    


def get_posts():


@app.get('/new_post')
def create_post():
    store_post()
    posts = get_posts
    return posts
    

    