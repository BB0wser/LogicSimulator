
## BASIC GATES & CONNECTION ##
class Input():
	#Should be able to be used for connecting to a gate itself or connecting to another 
	def __init__(self, connection_number, value):
		self.connection_number = connection_number
		self.value = value
class Input2():
	#Should be able to be used for connecting to a gate itself or connecting to another 
	def __init__(self, connection_number, value):
		self.connection_number = connection_number
	
class Connection():
	#Should be able to be used for connecting to a gate itself or connecting to another 
	def __init__(self, connection_number, connectedTo):
		self.connectedTo = connectedTo
		self.connection_number = connection_number
		self.value = self.connectedTo.output
	def update(self):
		self.value = self.conenctedTo.output


class Connection2():
	def __init__(self, connection_number, connectedTo):
		self.connection_number = connection_number
		self.connectedTo = connectedTo
		self.value = True
	def update(self, newValue):
		self.value = newValue

class And():
	def __init__(self, input_one, input_two, gate_ident):
		self.inputOne = input_one
		self.inputTwo = input_two
		self.output = (self.inputOne.value and self.inputTwo.value)
		self.gate_ident = gate_ident
	
	def update(self):
		self.output = (self.inputOne.value and self.inputTwo.value)
		
class And2():
	def __init__(self, input_one, input_two, gate_ident, value = True):
		self.inputOne = input_one
		self.inputTwo = input_two
		self.output = value
		self.connection_number = gate_ident
	
	def update(self, inputOne, inputTwo):
		self.output = (inputOne.value and inputTwo.value)
		
class Or():
	def __init__(self, input_one, input_two, gate_ident):
		self.inputOne = input_one
		self.inputTwo = input_two
		self.output = (self.inputOne.value or self.inputTwo.value)
		self.gate_ident = gate_ident

	def update(self):
		self.output = (self.inputOne.value or self.inputTwo.value)
		
class Or2():
	def __init__(self, input_one, input_two, gate_ident, value = True):
		self.inputOne = input_one
		self.inputTwo = input_two
		self.output = value
		self.connection_number = gate_ident

	def update(self, newValue):
		self.output = newValue

class Not():
	def __init__(self, input_one, gate_ident):
		self.output = not input_one
		self.gate_ident = gate_ident

class Not2():
	def __init__(self, input_one, gate_ident, value = True):
		self.inputOne = input_one
		self.output = not value
		self.connection_number = gate_ident
	def update(self, newValue):
		self.output = not newValue

class ExclusiveOr():
	def __init__(self, input_one, input_two, gate_ident):
		self.input_one = input_one
		self.input_two = input_two
		if (input_one == False) and (input_two == False):
			self.output = False
		if (input_one == True) and (input_two == False):
			self.output = True
		if (input_one == False) and (input_two == True):
			self.output = True
		if (input_one == True) and (input_two == True):
			self.output = False
		self.gate_ident = gate_ident


class ExclusiveOr2():
	def __init__(self, input_one, input_two, gate_ident, value = True):
		self.input_one = input_one
		self.input_two = input_two
		self.value = value
		self.connection_number = gate_ident

#def printTruth(gates, connections, inputs):
def printTruth(inputs, outputs):
	pass	

## ADVANCED GATES ##



