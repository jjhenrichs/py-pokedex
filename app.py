from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import re

app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['pokedex']
collection = db['pokemon']

@app.route('/')
def home():    
    return render_template('index.html')


@app.route('/search', methods=['GET'])
def submit():
    query = request.args.get('pokemon_name', '').strip().lower().capitalize()

    results = []

    if query and re.fullmatch(r"^[A-Za-z]+(?:\.(?:\s[A-Za-z]+)|[ '-][A-Za-z]+)*(?:[♂♀])?$", query):
        results = list(collection.find({"name": query}))

    return render_template('index.html', results=results)

if __name__ == '__main__':
    app.run(debug=True)