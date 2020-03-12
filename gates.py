
## BASIC GATES & CONNECTION ##
class Connection():
	#Should be able to be used for connecting to a gate itself or connecting to another 
	def __init__(self, connection_number, value):
		self.connection_number = connection_number
		self.value = value
		

class And():
	def __init__(self, input_one, input_two, gate_ident):
		#Inputs should be bools
		self.output = (input_one and input_two)
		self.gate_ident = gate_ident
class Or():
	def __init__(self, input_one, input_two, gate_ident):
		#Inputs should be bools
		self.output = (input_one or input_two)
		self.gate_ident = gate_ident		

class Not():
	def __init__(self, input_one, gate_ident):
		#Input should be a bool
		self.output = not input_one
		self.gate_ident = gate_ident

class ExclusiveOr():
	def __init__(self, input_one, input_two, gate_ident):
		if (input_one == False) and (input_two == False):
			self.output = False
		if (input_one == True) and (input_two == False):
			self.output = True
		if (input_one == False) and (input_two == True):
			self.output = True
		if (input_one == True) and (input_two == True):
			self.output = False
		self.gate_ident = gate_ident



## ADVANCED GATES ##



