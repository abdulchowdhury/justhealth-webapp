import mysql.connector
from urllib.request import urlopen
  
# import json
import json

  
# storing the JSON response 
# from url in data
# jsonData = json.loads(response.read())

f = open('/Users/celestinhering/Documents/justhealth-webapp/dataParsing/piedmont_medical_center.json', 'rb')
  
 
# returns JSON object as 
# a dictionary
jsonData = json.loads(f.read())

tableString = ""
colString = ""

#establishing the connection
conn = mysql.connector.connect(
   user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

dict = jsonData["data"][3][0]
dict = json.loads(json.dumps(dict))
for key in dict.keys():
    if key.lower() == "code":
      key = "procedure_code"
    if key.lower() == "name":
      key = "procedure_name"
    colString += key.replace(" ", "_").replace("-", "_") + " varchar(255)" + ", "
colString += "charge_code" + " varchar(255)"

print(colString)

table_name = "Piedmont_Medical_Center_Data"
sql = "DROP TABLE IF EXISTS " + table_name
cursor.execute(sql)


sql = "CREATE TABLE {} ({})".format(table_name, colString)
cursor.execute(sql)

  # Commit your changes in the database
count = 0
conn.commit()
for row in jsonData["data"][2:1000]:
  colString = ""
  vals = []
  row = row[0]
  for attribute,value in row.items():      
    if attribute.lower() == "code":
      vals.append(value.replace("�", "").replace(" ", ""))
      attribute = "procedure_code"
    elif attribute.lower() == "name":
      vals.append(value.replace("�", "").replace(" ", ""))
      attribute = "procedure_name"
    else:
      vals.append(value)
    colString += attribute.replace(" ", "_").replace("-", "_") + ", "
  colString = colString[:-2]
  st_1 = "INSERT INTO {}({})".format(table_name, colString)
  st_2 = " VALUES (" 
  for x in range(len(vals)-1):
    st_2 += "%s, "
  st_2 += "%s)"
  count += 1

  # Executing the SQL command
  insert_stmt = st_1 + st_2
  cursor.execute(insert_stmt, vals)
  
  # Commit your changes in the database
  conn.commit()



print("Data inserted")

# Closing the connection
conn.close()



