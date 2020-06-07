import json 
  
# Opening JSON file 
with open('states_hash.json', 'r') as openfile: 
  
    # Reading from json file 
    json_object = json.load(openfile) 

def swap(obj):
  ret = {}
  for key in obj:
    ret[obj[key]] = key
  return ret

json_object = swap(json_object)
  
# Serializing json  
json_object = json.dumps(json_object, indent = 4) 
  
# Writing to sample.json 
with open("sample.json", "w") as outfile: 
  outfile.write(json_object) 