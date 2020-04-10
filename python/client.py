import requests
import json
import sys

url = "http://127.0.0.1:5000/jsonex"
if len(sys.argv) != 2:
	print("invalid #args")
	sys.exit()

fil = sys.argv[1]

f = open(fil,"r")

data = json.load(f)

r = requests.post(url, json = data)
if r.status_code != 200:
	print("ERROR", r.status_code)

txt = r.text

print(txt)
