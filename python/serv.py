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
	
	#frontend can send filename just as string, can change this to accept json if thats easier for frontend
	filename = "saves/" + request.data.decode()
	
	try:
		with open(filename,"r") as f:
			data = json.load(f)
			f.close()
	except:
		#frontend will expect json object back
		print("ERROR: failed to load file")
		error = {"ERROR" : "couldnt load file"}
		return json.dumps(error)
	
	return json.dumps(data)


@app.route("/jsonex", methods=['POST'])
def jasonex():
	rquest = request.get_json()
	
	gates = rquest['gates']
	connections = rquest['connections']
	inputs = rquest['inputs']
	outputgate = rquest['outputgate']
	for gate in gates:
		print(type(gate))
	
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
	output = inputs[0] and inputs[1]
	rv = {'output' : output}
	return json.dumps(rv)


if __name__ == "__main__":
	app.run(debug=True, port=5000)


