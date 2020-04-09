import gates as gates


currentGates = []
currentConnections = []
currentInputs = []
currentOutputs = []

running = True


while(running):

	print("Avaiable options: And, Or, Not, ExclusiveOr, Connection, Input, Output, Truth Table, Update Input")

	userInput = input("Command: ").lower()


	if userInput == "and":
		firstInput = input("What is the first input: ")
		secondInput = input("What is the second input: ")
		for conn in currentInputs:
			if conn.connection_number == firstInput:
				firstInput = conn
			elif conn.connection_number == secondInput:
				secondInput = conn
		
		
		newAnd = gates.And(firstInput, secondInput, "gate" + str(len(currentGates))) 
		currentGates.append(newAnd)


	if userInput == "or":
		firstInput = input("What is the first input: ")
		secondInput = input("What is the second input: ")
		for conn in currentInputs:
			if conn.connection_number == firstInput:
				firstInput = conn
			elif conn.connection_number == secondInput:
				secondInput = conn
		for conn in currentConnections:
			if conn.connection_number == firstInput:		
				firstInput = conn
			elif conn.connection_number == secondInput:
				secondInput = conn

		newOr = gates.Or(firstInput, secondInput, "gate" + str(len(currentGates))) 
		currentGates.append(newOr)

		
	if userInput == "not":
		pass

	if userInput == "exclusiveor":
		pass

	if userInput == "connection":
		connectionInfo = input("Where should it connect: ")
		for gate in currentGates:
			if gate.gate_ident == connectionInfo:
				connectionInfo = gate

		currentConnections.append(gates.Connection("connect"+str(len(currentConnections)), connectionInfo))


	if userInput == "output":
		connectionInfo = input("Which gate should this connect to: ")
		for gate in currentGates:
			if gate.gate_ident == connectionInfo:
				connectionInfo = gate
			#	break
				print("found gate")
				print(type(connectionInfo))
		currentOutputs.append(gates.Connection("output" + str(len(currentOutputs)), connectionInfo))


	if userInput == "input": # a connection, but slightly differently created, since it's not a direct
		currentInputs.append(gates.Input("input" + str(len(currentInputs)), False))


	if userInput == "truth table":
		gates.printTruth(currentInputs, currentOutputs)


	if userInput == "update input":
		inputToEdit = input("Which input: ")
		for e in currentInputs:
			if e.connection_number == inputToEdit:
				print("found it")
				inputToEdit = e

		newValue = input("What is the new value: ")
		print(newValue)
		if newValue.lower() in ['true', 't']:
			inputToEdit.value = True
		elif newValue.lower() in ['false', 'f']:
			inputToEdit.value = False

	for i in range( len(currentGates) + len(currentConnections) + len(currentOutputs) ):
		for gate in currentGates:
			gate.update()

		for conn in currentConnections:
			conn.update()

		for out in currentOutputs:
			out.update()

	for e in currentInputs:
		print(e.connection_number, end = ":")
		print(e.value)

	for e in currentConnections:
		print(e.connection_number, end = ":")
		print(e.value)

	for e in currentGates:
		print(e.gate_ident, end = ":")
		print(e.output)

	for e in currentOutputs:
		print(e.connection_number, end = ";")
		print(e.output)	
