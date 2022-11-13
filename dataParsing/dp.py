# import mysql.connector
# import pandas as pd
# import json
# df = pd.read_csv("grady.csv", low_memory=False)
# jsonData = df.to_json(orient ='records')

# #build string
# tableString = ""
# colString = ""


# #establishing the connection
# conn = mysql.connector.connect(
#    user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

# #Creating a cursor object using the cursor() method
# cursor = conn.cursor()

# # creating column list for insertion
# cols = ",".join([str(i) for i in df.columns.tolist()])
# cols = cols.replace(" ", "_")
# cols = cols.replace("'", "")

# table_name = "Grady_Data"
# sql = "DROP TABLE IF EXISTS " + table_name
# cursor.execute(sql)

# for col in df.columns:
#   if col == "Code":
#       col = "Procedure_Code"
#   colString += col.replace(" ", "_") + " varchar(255)" + ", "
# colString = colString[:-2]


# sql = "CREATE TABLE {} ({})".format(table_name, colString)
# cursor.execute(sql)

# jsonData = json.loads(jsonData)
# colString = ""
# vals = ""

  
#   # Commit your changes in the database
# conn.commit()
# for row in jsonData[:1000]:
#   colString = ""
#   vals = []
#   for attribute, value in row.items():
#     if attribute == "Code":
#       colString += "Procedure_Code, "
#       vals.append(value.replace("�", "").replace(" ", ""))
#     else:
#       colString += attribute.replace(" ", "_") + ", "
#       vals.append(value)
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
import pandas as pd
import json
df = pd.read_csv("/Users/celestinhering/Documents/justhealth-webapp/dataParsing/grady.csv", low_memory=False)
jsonData = df.to_json(orient ='records')

#build string
tableString = ""
colString = ""


#establishing the connection
conn = mysql.connector.connect(
   user='admin', password='Create-x404', host='just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com', database='JustHealth')

#Creating a cursor object using the cursor() method
cursor = conn.cursor()


table_name = "Grady_Data_New"
sql = "DROP TABLE IF EXISTS " + table_name
cursor.execute(sql)

colString = "Procedure_Code varchar(10), Med_Procedure_Description varchar(255), Charge varchar(50), Cash_Discount varchar(50), Aetna_Coventry varchar(50), Ambetter varchar(50), Amerigroup varchar(50), Anthem_BCBS_HMO_POS varchar(50), BCBS_PPO varchar(50), Caresource varchar(50), Cigna varchar(50), Eon_Health varchar(50), Humana varchar(50), Kaiser varchar(50), Multiplan varchar(50), NaphCare_USP varchar(50), Peachstate varchar(50), Tricare_Veteran_Choice varchar(50), Wellcare_Medicaid varchar(50), Wellcare_Medicare varchar(50)"
columnList = ["Procedure_Code", "Med_Procedure_Description", "Charge", "Cash_Discount"]
insuranceList = ["Aetna_Coventry_Exp_Reimbursement", "Ambetter__Exp_Reimbursement", "Amerigroup_Exp_Reimbursement", "Anthem_BCBS_HMO_POS_Exp_Reimbursement", "BCBS_PPO_Exp_Reimbursement", "Caresource_Exp_Reimbursement", "Cigna_Exp_Reimbursement", "Eon_Health_Exp_Reimbursement", "Humana_Exp_Reimbursement", "Kaiser_Exp_Reimbursement", "Multiplan_Exp_Reimbursement", "NaphCare_USP_Exp_Reimbursement", "Peachstate_Exp_Reimbursement", "Tricare_Veteran_Choice_Exp_Reimbursement", "Wellcare_Medicaid_Exp_Reimbursement", "Wellcare_Medicare_Exp_Reimbursement"]

sql = "CREATE TABLE {} ({})".format(table_name, colString)
cursor.execute(sql)

jsonData = json.loads(jsonData)
colString = ""
vals = ""

  
  # Commit your changes in the database
conn.commit()
for row in jsonData[:10000]:
  colString = ""
  vals = []
  for attribute, value in row.items():
    attribute = attribute.replace(" ", "_")
    if attribute == "Code":
      colString += "Procedure_Code, "
      if (value is not None):
        value = ''.join(i for i in value if i.isdigit())
        vals.append(value)
      else:
        vals.append(value)
    elif (attribute in insuranceList):
      if (attribute == "Ambetter__Exp_Reimbursement"):
        colString += attribute[:-len("__Exp_Reimbursement")] + ", "
      else:
        colString += attribute[:-len("_Exp_Reimbursement")] + ", "
      vals.append(value)
    elif (attribute in columnList):
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
