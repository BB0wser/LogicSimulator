from flask import Flask, request
import json

app = Flask(__name__)

@app.route("/", methods=['POST', 'GET'])
def home():
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
