const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "just-health-database-1.csj6ltd2rbyn.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Create-x404",
    database: "JustHealth"
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

app.use(cors())
app.use(express.json())


app.post("/api/get", (req,res)=>{
    console.log("in test route")
    connection.query("SELECT * FROM balls", (err,result)=>{
        console.log("balls");
        if(err) {
            console.log(err)
        } else {
            res.json({success: true, message: "test", result})
        }
    });   
});


app.listen(PORT, function() {
    console.log(`Listening on ${PORT}...`);
});