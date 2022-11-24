# import mysql.connector
# from urllib.request import urlopen
  
# # import json
# import json
# # store the URL in url as 
# # parameter for urlopen
# url = "https://www.emoryhealthcare.org/ui/pricing-transparency/json/2022/110076_emory-decatur-hospital_standardcharges.json"
  
# # store the response of URL
# response = urlopen(url)
  
# # storing the JSON response 
# # from url in data
# # jsonData = json.loads(response.read())

# f = open('/Users/celestinhering/Documents/justhealth-webapp/dataParsing/northsideHospitalAtlanta.json', 'rb')
  
 
# # returns JSON object as 
# # a dictionary
# print(f)
# jsonData = json.loads(f.read())

# tableString = ""
# colString = ""

# #establishing the connection
# conn = mysql.connector.connect(
#    user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

# #Creating a cursor object using the cursor() method
# cursor = conn.cursor()

# dict = jsonData[3]
# for key in dict.keys():
#     if key == "Code":
#         key = "Procedure_Code"
#     colString += key.replace(" ", "_").replace("-", "_") + " varchar(255)" + ", "
# colString = colString[:-2]

# table_name = "New_Northside_Hospital_Atlanta_Data"
# sql = "DROP TABLE IF EXISTS " + table_name
# cursor.execute(sql)


# sql = "CREATE TABLE {} ({})".format(table_name, colString)
# cursor.execute(sql)

# colString = ""
# vals = ""

  
#   # Commit your changes in the database
# conn.commit()
# for row in jsonData[:1000]:
#   vals = []
#   for attribute,value in row.items():      
#     if attribute == "code":
#       vals.append(value.replace("�", "").replace(" ", ""))
#       key = "Procedure_Code"
#       colString += key.replace(" ", "_").replace("-", "_") + " varchar(255)" + ", "
#     else:
#       vals.append(value)
#       colString += key.replace(" ", "_").replace("-", "_") + " varchar(255)" + ", "
#   colString = colString[:-2]
#   st_1 = "INSERT INTO {}({})".format(table_name, colString)
#   st_2 = " VALUES (" 
#   for x in range(len(vals)-1):
#     st_2 += "%s, "
#   st_2 += "%s)"

#   # Executing the SQL command
#   insert_stmt = st_1 + st_2
#   cursor.execute(insert_stmt, vals)
  
#   # Commit your changes in the database
#   conn.commit()



# print("Data inserted")

# # Closing the connection
# conn.close()

import mysql.connector
from urllib.request import urlopen
  
# import json
import json
  
# # storing the JSON response 
# # from url in data
# # jsonData = json.loads(response.read())

f = open('/Users/celestinhering/Documents/justhealth-webapp/dataParsing/northsideHospitalGwinnett.json', 'rb')
  
 
# returns JSON object as 
# a dictionary
jsonData = json.loads(f.read())

# Aetna_Coventry varchar(50), Ambetter varchar(50), Amerigroup varchar(50), Anthem_BCBS_HMO_POS varchar(50), BCBS_PPO varchar(50), Caresource varchar(50), Cigna varchar(50), Eon_Health varchar(50), Humana varchar(50), Kaiser varchar(50), Multiplan varchar(50), NaphCare_USP varchar(50), Peachstate varchar(50), Tricare_Veteran_Choice varchar(50), Wellcare_Medicaid varchar(50), Wellcare_Medicare varchar(50)"
columnList = ["Procedure_Code", "Med_Procedure_Description", "Charge", "Cash_Discount"]
colString = "Procedure_Code varchar(10), Med_Procedure_Description varchar(255), Charge varchar(50), Cash_Discount varchar(50)"

#establishing the connection
conn = mysql.connector.connect(
   user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

table_name = "Northside_Hospital_Gwinnett_Data"
sql = "DROP TABLE IF EXISTS " + table_name
cursor.execute(sql)


sql = "CREATE TABLE {} ({})".format(table_name, colString)
cursor.execute(sql)


  
  # Commit your changes in the database
insuranceList = []
conn.commit()
for row in jsonData:
  colString = ""
  colStringProcedure = ""
  vals = []
  valsProcedure = []
  code = ""
  insurance = ""
  price = ""
  procedure = ""
  for attribute,value in row.items(): 
    attribute = attribute.replace(" ", "_").replace("-", "_")
    if attribute == "code":
      value.replace("�", "").replace(" ", "")
      value = ''.join(i for i in value if i.isdigit())
      vals.append(value)
      valsProcedure.append(value)
      colString += "Procedure_Code, "
      colStringProcedure += "Procedure_Code, "
      code = value
    elif attribute == "code_description":
      if value is not None:
        value = value.replace(",", "").replace("'","").lower()
        procedure = value
      vals.append(value)
      valsProcedure.append(value)
      colString += "Med_Procedure_Description, "
      colStringProcedure += "Med_Procedure_Description, "
    elif attribute == "gross_charge":
      vals.append(value)
      colString += "Charge, "
      price = value
    elif attribute == "discounted_cash_price":
      vals.append(value)
      colString += "Cash_Discount, "
    elif attribute == "payer":
      value = value.replace(" ", "_").replace("-", "_")
      insurance = value
      if (value not in insuranceList):
        cursor.execute("ALTER TABLE " + table_name + " ADD " + insurance + " varchar(50)")
        insuranceList.append(value)
    elif attribute == "payer_specific_negotiated_charge":
      price = value
    
  colString += insurance
  colStringProcedure = colStringProcedure[:-2]
  vals.append(price)
  cursor.execute("SELECT COUNT(*) FROM " + table_name + " WHERE Procedure_Code = '" + code + "'")

  result = cursor.fetchone()
  if result[0] > 0:
    cursor.execute("UPDATE " + table_name + " SET " + insurance + " = " + price + " WHERE Procedure_Code = " + code )
    conn.commit()
  else:
    st_1 = "INSERT INTO {}({})".format(table_name, colString)
    st_2 = " VALUES (" 
    for x in range(len(vals)-1):
      st_2 += "%s, "
    st_2 += "%s)"
    # Executing the SQL command
    insert_stmt = st_1 + st_2
    cursor.execute(insert_stmt, vals)
    conn.commit()
  if procedure is not None:
    cursor.execute("SELECT COUNT(*) FROM Procedure_Names WHERE Med_Procedure_Description = '" + procedure + "'")
    result = cursor.fetchone()
    if result[0] == 0:
      st_1 = "INSERT INTO {}({})".format("Procedure_Names", colStringProcedure)
      st_2 = " VALUES (" 
      for x in range(len(valsProcedure)-1):
        st_2 += "%s, "
      st_2 += "%s)"
      # Executing the SQL command
      insert_stmt = st_1 + st_2
      cursor.execute(insert_stmt, valsProcedure)
      # Commit your changes in the database
      conn.commit()




# # print("Data inserted")

# # # Closing the connection
# # conn.close()

# import mysql.connector
# import pandas as pd
# import json


# #build string
# tableString = ""
# colString = ""


# #establishing the connection
# conn = mysql.connector.connect(
# user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

# #Creating a cursor object using the cursor() method
# cursor = conn.cursor()


# table_name = "Procedure_Names"
# f = open('/Users/celestinhering/Documents/justhealth-webapp/dataParsing/northsideHospitalDuluth.json', 'rb')
  
 
# # returns JSON object as 
# # a dictionary
# jsonData = json.loads(f.read())


# conn.commit()
# for row in jsonData:
#   colString = ""
#   vals = []
#   procedure = ""
#   for attribute, value in row.items():
#     if attribute == "code":
#       colString += "Procedure_Code, "
#       if value is not None:
#         value = ''.join(i for i in value if i.isdigit())
#         vals.append(value)
#       else:
#         vals.append(value)
#     elif attribute == "code description":
#       colString += "Med_Procedure_Description, "
#       if value is not None:
#         value = value.replace(",", "").replace("'","").lower()
#       procedure = value
#       vals.append(value)
#   colString = colString[:-2]
#   if procedure is not None:
#     cursor.execute("SELECT COUNT(*) FROM " + table_name + " WHERE Med_Procedure_Description = '" + procedure + "'")
#     result = cursor.fetchone()
#     if result[0] == 0:
#       st_1 = "INSERT INTO {}({})".format(table_name, colString)
#       st_2 = " VALUES (" 
#       for x in range(len(vals)-1):
#         st_2 += "%s, "
#       st_2 += "%s)"
#       # Executing the SQL command
#       insert_stmt = st_1 + st_2
#       cursor.execute(insert_stmt, vals)
#       # Commit your changes in the database
#       conn.commit()



# print("Data inserted")
# # Closing the connection
# conn.close()
