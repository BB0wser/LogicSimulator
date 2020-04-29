from flask import Flask, request
import json
import gates as gates

app = Flask(__name__)

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
		currentConnections.append(gates.Connection2(inputCon[0], inputCon[1]))	

	for gate in inputGates:
		if gate[0].lower() == "and":
			input1 = []
			input2 = []
			print(gate[1])
			for conn in currentConnections:
				print(conn.connectedTo)
				if conn.connectedTo == gate[1]:
					print("statment is true")
					if input1 == []:
						input1 == conn
					else:
						input2 == conn
			currentGates.append(gates.And2(input1, input2, gate[1]))

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

		elif gate[0].lower() == "not":
			input1 = ""
			for conn in currentConnections:
				if conn.connection_number == gate[1]:
					input1 = conn
			currentGates.append(gates.Not2(input1, gate[1]))

	for i in range(len(inputGates) + len(connections) + len(inputs) ):
		for connection in currentConnections:
			found = False
			for inp in currentInputs:
				if connection.connectedTo == inp.connection_number:
					connection.update(inp.value)
					found = True
					break

			if found == True:
				break

			for gate in currentGates:
				if connection.connectedTo == gate.connection_number:
					connection.update(gate.value)
					found = True
					break

			if found == True:
				break

			for conn in currentConnections:
				if conn != connection:
					if connection.connectedTo == conn.connection_number:
						connection.update(conn.value)
						found = True
						break

		for gate in currentGates:
			found = False
			for inp in currentInputs:
				for inp2 in currentInputs:
					if inp != inp2:
						if (gate.inputOne == inp.connection_number) and (gate.inputTwo == inp2.connection_number):
							gate.update(inp, inp2)
							found = True
							break

			if found == True:
				break

			for subgate in currentGates:
				if gate != subgate:
					for subgate2 in currentGates:
						if subgate2 != gate:
							if gate.inputOne == subgate.connection_number and sub.inputTwo == subgate.connection_number:
								gate.update(subgate, subgate2)
								found = True
								break

			if found == True:
				break

			for conn in currentConnections:
				if connection.connectedTo == conn.connection_number:
					connection.update(conn.value)
					found = True
					break
	print("currentGates: " + str(currentGates))
	print(outputs)
	for out in outputs:
		print("!!" + str(out) + "!!")
		for gate in currentGates:
			print(gate.connection_number)
			if gate.connection_number == out:
				currentOutputs.append(gate.output)
				print("appended")
		for inp in currentInputs:
			print(inp.connection_number)
			if inp.connection_number == out:
				currentOutputs.append(inp.value)
				print("appended")
		for conn in currentConnections:
			print(conn.connection_number)
			if conn.connection_number == out:
				currentOutputs.append(inp.value)
				print("appended")

	currentOutputs = str(currentOutputs)
	return currentOutputs


@app.route("/", methods=['POST', 'GET'])
def home():
	return 'what you looking at?'

@app.route("/jsonex", methods=['POST'])
def jasonex():
	rquest = request.get_json()

#	lang = rquest['language']
#	pversion = rquest['version_info']['python']
#	frame = rquest['framework']
#	fversion = rquest['version_info']['flask']
#	type3 = rquest['types'][2]
#	boolean = rquest['boolean_test']

#	print(type(rquest))
#	print(rquest)
#	rquest = json.loads(rquest)
	print(rquest)
	print(type(rquest))
	outputs = createCircuit(rquest["gates"], rquest["connections"], rquest["inputs"], rquest["output"]) 
	print(outputs)
	return outputs 
#	return '''The language is {} version {}
#The framework is {} version {}
#The third type is {}
#The boolean was {}'''.format(lang, pversion, frame, fversion, type3, outputs)


if __name__ == "__main__":
	app.run(debug=True, port=5000)
