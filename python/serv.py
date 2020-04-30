from flask import Flask, request
from flask_cors import CORS
import json
import sys
import gates as gates

app = Flask(__name__)
CORS(app)
#print(sys.path)


def createCircuit(inputGates, connections, inputs, outputs):
	#gates is a dictionary of gates of the types within gates.py
	#connections are connections of the types within gates.py
	#inputs are what the user determines is the circuit inputs
	#must all be dictionaries
	currentGates = []
	currentInputs = []
	currentConnections = []
	currentOutputs = []

	for inputCon in inputs:
		currentInputs.append(gates.Input(inputCon[1], inputCon[0]))

	for inputCon in connections:
		currentConnections.append(gates.Connection2(inputCon[0], inputCon[1], inputCon[2]))	

	for gate in inputGates:
		if gate[0].lower() == "and":
			input1 = gates.Connection2("0","0","0")
			input2 = gates.Connection2("0","0","0")
#			print(gate[1])
			for conn in currentConnections:
#				print(conn.connectedTo)
				if conn.connectedTo == gate[1]:
#					print(type(conn))
#					print("statment is true")
					if input1.connection_number == "0":
						input1 = conn
					else:
						input2 = conn
			currentGates.append(gates.And2(input1, input2, gate[1]))
#			print("added and")

		elif gate[0].lower() == "or":
			input1 = ""
			input2 = ""
			for conn in currentConnections:
				if conn.connectedTo == gate[1]:
					if input1 == "":
						input1 == conn
					else:
						input2 == conn
			currentGates.append(gates.Or2(input1, input2, gate[1]))
#			print("added or")

		elif gate[0].lower() == "not":
			input1 = ""
			for conn in currentConnections:
				if conn.connectedTo == gate[1]:
					input1 = conn
			currentGates.append(gates.Not2(input1, gate[1]))
#			print("added not")

	for i in range(len(inputGates) + len(connections) + len(inputs) ):
		for connection in currentConnections:
			found = False
			for inp in currentInputs:
				if connection.connectedFrom == inp.connection_number:
					connection.update(inp.value)
					found = True
					break

			if found == True:
				continue

			for gate in currentGates:
				if connection.connectedFrom == gate.connection_number:
					connection.update(gate.output)
					found = True
					break

			if found == True:
				continue

			for conn in currentConnections:
				if conn != connection:
					if connection.connectedFrom == conn.connection_number:
						connection.update(conn.value)
						found = True
						break

		for gate in currentGates:
#			print("B!!!!!!!!!!!!B")
#			print(gate)
#			print("E!!!!!!!!!!!!E")
#			try:
#				print(gate.inputTwo)
#			except:
#				print("No inputTwo to print")

			found = False


			#Multiple inputs
			for inp in currentInputs:
				for inp2 in currentInputs:
					if inp != inp2:
						if (gate.inputOne == inp.connection_number) and (gate.inputTwo == inp2.connection_number):
							gate.update(inp.value, inp2.value)
							found = True
#							print("Updating w/ input " + str(gate.connection_number))
							break
				if found == True:
					break

			if found == True:
				continue

#			for subgate in currentGates:
#				if gate != subgate:
#					for subgate2 in currentGates:
#						if subgate2 != gate:
#							if gate.inputOne == subgate.connection_number and sub.inputTwo == subgate.connection_number:
#								gate.update(subgate, subgate2)
#								#print("Updating " + str(gate.connection_number))
#								found = True
#								break

			if found == True:
				continue

			for conn in currentConnections:
				for conn2 in currentConnections:
					if conn != conn2:
#						print("###########")
#						print(gate.inputOne)
#						try:
#							print(gate.inputTwo)
#						except:
#							pass
#						print("###########")
						if isinstance(gate, gates.Not2) and (gate.connection_number == conn.connectedTo):
#							print("Updating with isinstance " + str(gate.connection_number))
							gate.update(conn.value)
#							print("hit")
						elif (gate.connection_number == conn.connectedTo) and (gate.connection_number == conn2.connectedTo):
#							print("Updating w/ connection " + str(gate.connection_number))
							gate.update(conn, conn2)
								

			#single input
			for inp in currentInputs:
				if (gate.inputOne == inp.connection_number):
					gate.update(inp.value())
#					print("Update w/ input single " + str(gate.connection_number))
					found = True

			if found == True:
				continue


			for conn in currentConnections:
				if (gate.inputOne == conn.connection_number):
					gate.update(conn.value)
#					print("Update w/ connection single " + str(gate.connection_number))
					found = True
		


#	print("currentGates: " + str(currentGates))
#	print(outputs)
	for out in outputs:
#		print("!!" + str(out) + "!!")
		for gate in currentGates:
#			print(gate.connection_number)
			if gate.connection_number == out:
				currentOutputs.append(gate.output)
#				print("appended")
		for inp in currentInputs:
#			print(inp.connection_number)
			if inp.connection_number == out:
				currentOutputs.append(inp.value)
#				print("appended")
		for conn in currentConnections:
#			print(conn.connection_number)
			if conn.connection_number == out:
				currentOutputs.append(inp.value)
#				print("appended")

#	currentOutputs = str(currentOutputs)

#	for i in range(len(currentConnections)):
#		print("conn" + str(i) + ": ", end="")
#		print(currentConnections[i].value)

#	for i in range(len(currentGates)):
#		print("gate" + str(i) + ": ", end="")
#		print(currentGates[i].output)

	return currentOutputs



@app.route("/", methods=['POST', 'GET', 'OPTIONS'])
#@crossorigin(origin='localhost:3000',headers=['Content- Type','Authorization'])
def home():
	#response.headers.add('Access-Control-Allow-Origin', '*')
	return 'what you looking at?'

@app.route("/truth", methods=['POST'])
def truth():
	rquest = request.get_json()
	if 'numinputs' in rquest:
		print("numinputs found")
		lenarray = rquest['numinputs']
	else:
		print("numinputs NOT found")
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
	
#	print("size: ", size)
	for x in range(len(inputs)):
		print("input"+str(x),inputs[x])
	
	rv = {
		'truth_table' : {
		}
	}
	
#	for j in range(lenarray):
#		string = "input" + str(j)
#		rv['truth_table'][string] = inputs[j]
	rv['truth_table']['inputs'] = inputs
	
	outputs = []
	for i in range(size):
		temp = []
		for j in range(lenarray):
			temp.append([inputs[j][i],"input"+str(j)])
		
		out = createCircuit(rquest["gates"], rquest["connections"], temp, rquest["output"]) 
		outputs.append(out[0])
	
	print("output",outputs)
	rv['truth_table']['outputs'] = outputs
	return json.dumps(rv, indent=4)
	
	
@app.route("/save", methods=['POST'])
def saveCircuit():
	#frontend should let user type in filename to save as
	rquest = request.get_json()
	
	#saves it to the "saves" directory
	#might need to change 'value' back to 'saveas'
	saveas = "saves/" + rquest['value'] + ".json"
	rquest.pop('value')
	
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
	if rquest['example']:
		filename = "examples/" + rquest['filename']
	else:
		filename = "saves/" + rquest['filename']
	
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


@app.route("/circuit", methods=['POST'])
def circuit():
	#make different path for generating truth table?
	#or generate truth table everytime so its ready on frontend?
	
	rquest = request.get_json()
	
	print(rquest)
	outputs = createCircuit(rquest["gates"], rquest["connections"], rquest["inputs"], rquest["output"]) 
	print(outputs)
	jason = {"outputs":outputs}
	print(jason)
	return json.dumps(jason,indent=4)

	

if __name__ == "__main__":
	app.run(debug=True, port=5000)


