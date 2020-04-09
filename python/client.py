import requests
import json

url = "http://127.0.0.1:5000/jsonex"

lang = input("what language: ")
lvers = input("and the version: ")
frame = input("what framework: ")
fvers = input("and the version: ")
boolean = input("True or False: ")

dic = {
	'language' : lang,
	'framework' : frame,
	'website' : 'Scotch',
	'version_info' : {
		'python' : lvers,
		'flask' : fvers
	},
	'types' : ['yes', 'no', 'maybe'],
	'boolean_test' : boolean
}



#data = json.dumps(dic)

r = requests.post(url, json = dic)
if r.status_code != 200:
	print("ERROR", r.status_code)

txt = r.text

print(txt)
