from flask import Flask, request
import json

app = Flask(__name__)

@app.route("/", methods=['POST', 'GET'])
def home():
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
