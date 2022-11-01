const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Create-x404",
    database: "JustHealth"
})

//IMPORTANT: RUN THIS FILE BEFORE STARTING REACT SERVER

connection.connect(function(err) {
    if(err) {
        console.log("Error: ", err);
    } else {
        console.log("Connection established");
    }
})

const app = express();
const  PORT = 3002;

app.use(cors())
app.use(express.json())

//test query, disregard
app.post("/api/get", (req,res)=>{
    console.log("in test route")
    //below query does not work
    connection.query("SELECT * FROM [TABLE]", (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "test", result})
        }
    });   
});

//spsh = single procedure at single hospital
app.post("/api/spsh", (req,res)=>{
    connection.query("SELECT * FROM Grady_Data where Procedure_Code = ?", [req.query.pid], (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "single procedure at single hospital", result})
        }
    });   
});


app.listen(PORT, function() {
    console.log(`Listening on ${PORT}...`);
});