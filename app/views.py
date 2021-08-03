from app import app
from flask import render_template, request, make_response
import os, requests
from dotenv import load_dotenv

load_dotenv()

@app.route('/')
def index():
    return render_template("index.html")
