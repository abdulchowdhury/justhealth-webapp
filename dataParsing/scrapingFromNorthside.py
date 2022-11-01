import mysql.connector
from urllib.request import urlopen
  
# import json
import json
# store the URL in url as 
# parameter for urlopen
url = "https://www.emoryhealthcare.org/ui/pricing-transparency/json/2022/110076_emory-decatur-hospital_standardcharges.json"
  
# store the response of URL
response = urlopen(url)
  
# storing the JSON response 
# from url in data
# jsonData = json.loads(response.read())

f = open('/Users/celestinhering/Documents/justhealth-webapp/dataParsing/northsideHospitalAtlanta.json', 'rb')
  
 
# returns JSON object as 
# a dictionary
print(f)
jsonData = json.loads(f.read())

tableString = ""
colString = ""

#establishing the connection
conn = mysql.connector.connect(
   user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

dict = jsonData[3]
for key in dict.keys():
    if key == "Code":
        key = "Procedure_Code"
    colString += key.replace(" ", "_").replace("-", "_") + " varchar(255)" + ", "
colString = colString[:-2]

table_name = "Northside_Hospital_Atlanta_Data"
sql = "DROP TABLE IF EXISTS " + table_name
cursor.execute(sql)


sql = "CREATE TABLE {} ({})".format(table_name, colString)
cursor.execute(sql)

colString = ""
vals = ""

  
  # Commit your changes in the database
conn.commit()
for row in jsonData[:1000]:
  vals = []
  for attribute,value in row.items():      
    if attribute == "Code":
      vals.append(value.replace("�", "").replace(" ", ""))
      key = "Procedure_Code"
      colString += key.replace(" ", "_").replace("-", "_") + " varchar(255)" + ", "
    else:
      vals.append(value)
      colString += key.replace(" ", "_").replace("-", "_") + " varchar(255)" + ", "
  colString = colString[:-2]
  st_1 = "INSERT INTO {}({})".format(table_name, colString)
  st_2 = " VALUES (" 
  for x in range(len(vals)-1):
    st_2 += "%s, "
  st_2 += "%s)"

  # Executing the SQL command
  insert_stmt = st_1 + st_2
  cursor.execute(insert_stmt, vals)
  
  # Commit your changes in the database
  conn.commit()



print("Data inserted")

# Closing the connection
conn.close()



