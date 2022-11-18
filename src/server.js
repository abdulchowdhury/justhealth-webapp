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

//Grady data
app.post("/api/Grady", (req,res)=>{
    connection.query("SELECT * FROM Grady_Memorial_Hospital_Data where Procedure_Code = ?", [req.query.pid], (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "single procedure at Grady", result})
        }
    });   
});

//Northside Atlanta data
app.post("/api/NorthsideAtlanta", (req,res)=>{
    connection.query("SELECT * FROM Northside_Hospital_Atlanta_Data where Procedure_Code = ?", [req.query.pid], (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "single procedure at Northside Atlanta", result})
        }
    });   
});

//Northside Duluth data
app.post("/api/NorthsideDuluth", (req,res)=>{
    connection.query("SELECT * FROM Northside_Hospital_Duluth_Data where Procedure_Code = ?", [req.query.pid], (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "single procedure at Northside Duluth", result})
        }
    });   
});

//Northside Forsyth data
app.post("/api/NorthsideForsyth", (req,res)=>{
    connection.query("SELECT * FROM Northside_Hospital_Forsyth_Data where Procedure_Code = ?", [req.query.pid], (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "single procedure at Northside Forsyth", result})
        }
    });   
});

//Northside Gwinnett data
app.post("/api/NorthsideGwinnett", (req,res)=>{
    connection.query("SELECT * FROM Northside_Hospital_Gwinnett_Data where Procedure_Code = ?", [req.query.pid], (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "single procedure at Northside Gwinnett", result})
        }
    });   
});




//input 
app.post("/api/input", (req,res)=>{
    query = "insert into Crowdsourced values (?, ?, ?, ?, ?)"
    connection.query(query, [req.query.procedure, req.query.insurance, req.query.cost, req.query.hospital, req.query.date], (err, rows)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "single procedure at single hospital", rows})
        }
    });
});

app.post("/api/getCrowdsourced", (req,res)=>{
    connection.query("SELECT * FROM Crowdsourced where p_id = ?", [req.query.pid], (err,result)=>{
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "Crowdsourced data", result})
        }
    });   
});

app.post("/api/getProcedures", (req, res) => {
    console.log("you're in procedures server.js")
    // var searchProcedures = 
    //searchValues = [search,search,search,search]
    
    connection.query("SELECT * FROM Procedure_Names WHERE Med_Procedure_Description LIKE ?", ["%" + req.query.userInput + "%"], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.json({success: true, message: "Procedures data", result})
        }
    })
});

app.listen(PORT, function() {
    console.log(`Listening on ${PORT}...`);
});
