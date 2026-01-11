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

@app.route('/api/pokemon')
def get_pokemon():
    query = request.args.get('q', '').strip().capitalize()

    kanto = list(collection.find({}))
    names = [pokemon['name'] for pokemon in kanto if query in pokemon['name']]

    return jsonify(names[:10])

@app.route('/search', methods=['GET'])
def submit():
    query = request.args.get('pokemon_name', '').strip().capitalize()

    if "-" in query:
        
        # Capitalize the character after the dash
        if query[-1] != "-":
            dash_index = query.index("-")
            upper_case = query[dash_index + 1].upper()
            query = query[:dash_index + 1] + upper_case + query[dash_index + 2:]

    results = []

    if query and re.fullmatch(r"^[A-Za-z]+(?:\.(?:\s[A-Za-z]+)|[ '-][A-Za-z]+)*(?:[♂♀])?$", query):
        results = list(collection.find({"name": query}))

    return render_template('index.html', results=results)

if __name__ == '__main__':
    app.run(debug=True)