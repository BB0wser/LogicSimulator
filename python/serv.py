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
	
	gates = rquest['gates']
	connections = rquest['connections']
	inputs = rquest['inputs']
	outputgate = rquest['outputgate']
	
	#call function here with these to run through logic
	#return boolean output in that function
	#output = backend(gates,connections, inputs, outputgate)

	#for now just returns this
	output = inputs[0] and inputs[1]
	rv = {'output' : output}
	return json.dumps(rv)

if __name__ == "__main__":
	app.run(debug=True, port=5000)
