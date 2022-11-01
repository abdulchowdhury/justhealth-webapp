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
jsonData = json.loads(response.read())
  


tableString = ""
colString = ""

#establishing the connection
conn = mysql.connector.connect(
   user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

dict = jsonData["Gross Charges"]
dict = json.loads(json.dumps(dict[100]))
columns = []
for key in dict.keys():
    if key == "Code":
        key = "Procedure_Code"
    key = key.replace(" ", "_").replace("-", "_") 
    colString += key + " varchar(255)" + ", "
    columns.append(key)
# colString += "CDM_Revenue_Code varchar(255), "
# colString += "CDM_HCPCS varchar(255)"
colString = colString[:-2]

table_name = "Emory_Decatur_Data"
sql = "DROP TABLE IF EXISTS " + table_name
cursor.execute(sql)


sql = "CREATE TABLE {} ({})".format(table_name, colString)
cursor.execute(sql)

  # Commit your changes in the database
conn.commit()
for row in jsonData["Gross Charges"][:1000]:
  row = json.loads(json.dumps(row))
  colString = ""
  vals = []
  for attribute,value in row.items():  
    attribute = attribute.replace(" ", "_").replace("-", "_")
    if attribute == "Code":
      vals.append(value.replace("�", "").replace(" ", ""))
      attribute = "Procedure_Code"
      colString += attribute + ", "
    else:
      vals.append(value)
      colString += attribute + ", "
    if attribute not in columns:
      sql = "ALTER TABLE Emory_Decatur_Data ADD COLUMN " + attribute + " VARCHAR(255) AFTER " + columns[-1]
      cursor.execute(sql)
      columns.append(attribute)
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



