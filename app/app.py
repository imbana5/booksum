import os
from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'Hello, World! This is a basic Flask app.'

@app.route('/test')
def hello_test():
  return "TEST!"

@app.route('/get-token')
def get_token():
  url = "https://iam.cloud.ibm.com/identity/token"
  data = {
    "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
    "apikey": "oNVhphAHzAPv2dBO30G_6LbO8R9oqLJmwUBLx-PH3Nwh"
  }

  response = requests.post(url, headers={"Content-Type": "application/x-www-form-urlencoded"}, data=data)

  #access_token = response.json().get("access_token")
  #headers = {
  #  "Authorization": f"Bearer {access_token}"
  #}
  return response.json()

@app.route('/ask-watsonx')
def ask_watsonx():
  reqBook  = request.args.get('book_title')
  reqToken = request.args.get('token')

  bookTitle = "The 7 Habits of Highly Effective People by Stephen Covey"

  if (reqBook):
    bookTitle = reqBook

  url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"

  body = {
    "input": """<|system|>
  You are a librarian called "BookSum". You are to summarize a book titled book_title. 
  After the brief summary, you will explain the book chapter by chapter.
  <|assistant|>
  """,
    "parameters": {
      "decoding_method": "greedy",
      "max_new_tokens": 900,
      "repetition_penalty": 1.05
    },
    "model_id": "ibm/granite-20b-multilingual",
    "project_id": "98ee2174-c330-4f42-ba18-cf059691c8e0"
  }

  body['input'] = body['input'].replace("book_title", bookTitle)

  headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer token"
  }

  headers['Authorization'] = headers['Authorization'].replace("token", reqToken)
 
  response = requests.post(
    url,
    headers=headers,
    json=body
  )

  if response.status_code != 200:
    return jsonify("Non-200 response: " + str(response.text))

  return response.json()

if __name__ == "__main__":
  app.run(debug=True)