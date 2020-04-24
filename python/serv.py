from flask import Flask, request
from flask_cors import CORS
import json
import sys

app = Flask(__name__)
CORS(app)
print(sys.path)

@app.route("/", methods=['POST', 'GET', 'OPTIONS'])
#@crossorigin(origin='localhost:3000',headers=['Content- Type','Authorization'])
def home():
	#response.headers.add('Access-Control-Allow-Origin', '*')
	return 'what you looking at?'

@app.route("/truth", methods=['POST'])
def truth():
	rquest = request.get_json()
	lenarray = len(rquest['inputs'])	
	
	#code to generate inputs for truth table
	size = 2**lenarray
	inputs = []
	for i in range(lenarray):
		val = True
		vec = []
		for k in range(size):
			if (k%(2**i)) == 0:
				val = not val
			vec.append(val)
		inputs.append(vec)
	
	print("size: ", size)
	for x in range(len(inputs)):
		print(inputs[x])
	
	rv = {
		'truth_table' : {
		}
	}
	for j in range(lenarray):
		string = "input" + str(j)
		rv['truth_table'][string] = inputs[j]
	
	
	#here we can loop
		#here we can pass in inputs to logic.py
		#here we can add output to outputs list
	
	#here we can add outputs to rv
	
	return json.dumps(rv, indent=4)
	
	
@app.route("/save", methods=['POST'])
def saveCircuit():
	#frontend should let user type in filename to save as
	rquest = request.get_json()
	
	#saves it to the "saves" directory
	saveas = "saves/" + rquest['saveas']
	rquest.pop('saveas')
	
	#creates if new file, overwrites if exists (need to overwrite so people can update their circuits and save again)
	try:
		with open(saveas,"w") as savejson:
			savejson.write(json.dumps(rquest, indent = 4))
			savejson.close()
	except:
		print("save failed")
		return "save failed"
	
	return "save successful"


@app.route("/load", methods=['POST'])
def loadCircuit():
	#user needs to know what files they have saved on frontend side
	
	#if its easier to send as just a string, we can make a /examples path just for loading from examples page
	rquest = request.get_json()
	
	#if its from the example page
	if rquest['file']['example']:
		filename = "examples/" + rquest['file']['filename']
	else:
		filename = "saves/" + rquest['file']['filename']
	
	try:
		with open(filename,"r") as f:
			data = json.load(f)
			f.close()
	except:
		#frontend will expect json object back
		print("ERROR: failed to load file")
		error = {"ERROR" : "couldnt load file"}
		return json.dumps(error)
	
	return json.dumps(data, indent=4)


@app.route("/jsonex", methods=['POST'])
def jasonex():
	#maybe move all this to "/"
	
	#make different path for generating truth table?
	#or generate truth table everytime so its ready on frontend?
	
	rquest = request.get_json()
	
#	gates = rquest['gates']
	andgates = None
	orgates = None
	notgates = None
	xorgates = None
	norgates = None
	nandgates = None
	
	if 'and' in rquest:
		andgates = rquest['and']
	
	if 'or' in rquest:
		orgates = rquest['or']
	
	if 'nor' in rquest:
		norgates = rquest['nor']
	
	if 'not' in rquest:
		notgates = rquest['not']
	
	if 'xor' in rquest:
		xorgates = rquest['xor']
	
	if 'nand' in rquest:
		nandgates = rquest['nand']
	
	connections = rquest['connections']
	inputs = rquest['inputs']
	
	#call function here with these to run through logic
	#return boolean output in that function
	#output = backend(gates,connections, inputs, outputgate)

	#
	#for i in range(len(gates) + len(connections) + len(inputs) + input(outputgate) ): This loop in necessary as a gate could be updated before a previous component is, changing the result of the gate.
	#										This may have to be modified in the future to allow for gates saving information.
	#	for gate in gates:
	#		gate.update()
	#	for connection in connections:
	#		connection.update()
	#	for output in outputgate:
	#		output.update()
	#

	#for now just returns this
	outputs = []
	outputs.append(inputs[0] and inputs[1])
	rv = {'output' : outputs}
	return json.dumps(rv)


if __name__ == "__main__":
	app.run(debug=True, port=5000)


