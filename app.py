from flask import Flask, render_template, request, url_for
from pymongo import MongoClient

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

    if query:
        print(query, '<---------')

        if query.isalpha():
            results = list(collection.find({"$or": [ {"name": query}] }))
            print(results, '<<-------')
        
    else:
        print('Something went wrong!', '<---------')

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)