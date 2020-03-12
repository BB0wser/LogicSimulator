import gates as gates


currentGates = []
currentConnections = []
currentInputs = []

running = True

def printTruth(gates, connections, inputs):
	pass	

while(running):

	print("Avaiable options: And, Or, Not, ExclusiveOr, Connection, Input")

	userInput = input("Command: ").lower()

	if userInput == "and":
		firstInput = input("What is the first input: ")
		secondInput = input("What is the second input: ")
		for conn in currentInputs:
			if conn.connection_number == firstInput:
				firstInput = conn.value
			elif conn.connection_number == secondInput:
				secondInput = conn.value
		
		newAnd = gates.And(firstInput, secondInput, "gate" + str(len(currentGates))) 
		currentGates.append(newAnd)
	if userInput == "or":
		pass
	if userInput == "not":
		pass
	if userInput == "exclusiveor":
		pass
	if userInput == "connection":
		pass
	if userInput == "input": # a connection, but slightly differently created, since it's not a direct
		
		currentInputs.append(gates.Connection("input" + str(len(currentInputs)), False))

	for e in currentInputs:
		print(e.connection_number, end = ":")
		print(e.value)


	for e in currentGates:
		print(e.gate_ident, end = ":")
		print(e.output)

	
