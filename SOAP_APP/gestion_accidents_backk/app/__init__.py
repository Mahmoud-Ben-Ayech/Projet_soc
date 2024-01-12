from flask import Flask
from flask_soap import FlaskSoap
from flask_cors import CORS

app = Flask(__name__)

soap = FlaskSoap(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


from app.Parties import event




