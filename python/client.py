import requests
import json
import sys

url = "http://127.0.0.1:5000/"
if len(sys.argv) != 3:
	print("invalid #args")
	sys.exit()


fil = sys.argv[1]
path = sys.argv[2]
if path != 'circuit' and path != 'save' and path != 'load' and path != 'truth':
	print("not a valid path")
	sys.exit()

url += path

try:
	f = open(fil,"r")
	data = json.load(f)
	f.close()
except:
	print("file does not exist")
	sys.exit()

r = requests.post(url, json = data)
if r.status_code != 200:
	print("ERROR", r.status_code)

txt = r.text

print(txt)
