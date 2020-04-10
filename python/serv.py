from flask import Flask, request
from flask_cors import CORS
import json
import sys

app = Flask(__name__)
CORS(app)
#print(sys.path)

@app.route("/", methods=['POST', 'GET', 'OPTIONS'])
#@crossorigin(origin='localhost:3000',headers=['Content- Type','Authorization'])
def home():
	#response.headers.add('Access-Control-Allow-Origin', '*')
	return 'what you looking at?'

@app.route("/jsonex", methods=['POST'])
def jasonex():
	rquest = request.get_json()

	lang = rquest['language']
	pversion = rquest['version_info']['python']
	frame = rquest['framework']
	fversion = rquest['version_info']['flask']
	type3 = rquest['types'][2]
	boolean = rquest['boolean_test']

	return '''The language is {} version {}
The framework is {} version {}
The third type is {}
The boolean was {}'''.format(lang, pversion, frame, fversion, type3, boolean)


if __name__ == "__main__":
	app.run(debug=True, port=5000)
