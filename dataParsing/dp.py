import mysql.connector
import pandas as pd
import json
df = pd.read_csv("grady.csv", low_memory=False)
jsonData = df.to_json(orient ='records')

#build string
tableString = ""
colString = ""


#establishing the connection
conn = mysql.connector.connect(
   user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

# creating column list for insertion
cols = ",".join([str(i) for i in df.columns.tolist()])
cols = cols.replace(" ", "_")
cols = cols.replace("'", "")

table_name = "Grady_Data"
sql = "DROP TABLE IF EXISTS " + table_name
cursor.execute(sql)

for col in df.columns:
  if col == "Code":
      col = "Procedure_Code"
  colString += col.replace(" ", "_") + " varchar(255)" + ", "
colString = colString[:-2]


sql = "CREATE TABLE {} ({})".format(table_name, colString)
cursor.execute(sql)

jsonData = json.loads(jsonData)
colString = ""
vals = ""

  
  # Commit your changes in the database
conn.commit()
for row in jsonData[:1000]:
  colString = ""
  vals = []
  for attribute, value in row.items():
    if attribute == "Code":
      colString += "Procedure_Code, "
      vals.append(value.replace("�", "").replace(" ", ""))
    else:
      colString += attribute.replace(" ", "_") + ", "
      vals.append(value)
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
