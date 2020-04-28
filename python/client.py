import requests
import json
import sys
url = "http://127.0.0.1:5000/jsonex"

lang = input("what language: ")
lvers = input("and the version: ")
frame = input("what framework: ")
fvers = input("and the version: ")
boolean = input("True or False: ")

#dic = {
#	'language' : lang,
#	'framework' : frame,
#	'website' : 'Scotch',
#	'version_info' : {
#		'python' : lvers,
#		'flask' : fvers
#	},
#	'types' : ['yes', 'no', 'maybe'],
#	'boolean_test' : boolean
#}



#data = json.dumps(dic)

with open(sys.argv[1], 'r') as json_file:
	text = json_file.read()

data = json.loads(text)
#r = requests.post(url, json = dic)
r = requests.post(url, json = data)
if r.status_code != 200:
	print("ERROR", r.status_code)

txt = r.text

print(txt)
