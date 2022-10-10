const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
})

connection.connect(function(err) {
    if(err) {
        console.log("Error: ", err);
    } else {
        console.log("Connection established");
    }
})

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

app.get("/api/get", (req,res)=>{
    db.query("SELECT * FROM {TABLE HERE}", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });