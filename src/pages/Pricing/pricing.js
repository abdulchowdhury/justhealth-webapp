import { useState } from "react";
import { Component } from 'react';
import TextField from "@mui/material/TextField";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom"
import 'react-dropdown/style.css';
import Axios from 'axios';
import Select from "react-dropdown-select";


export default function Pricing () {
  let navigate = useNavigate()

  const [procedure, setProcedure] = useState("")
  const [zip, setZip] = useState("")
  const [insurance, setInsurance] = useState("")

function createData(name, costs, hospital, date, provider) {
  return { name, costs, hospital, date, provider };
}


const rows = [
  createData(procedure, 159, 6.0, 24, 4.0),
  createData(procedure, 237, 9.0, 37, 4.3),
  createData(procedure, 262, 16.0, 24, 6.0),
  createData(procedure, 305, 3.7, 67, 4.3),
  createData(procedure, 356, 16.0, 49, 3.9),
];

const handleSubmit = (event) => {
  event.preventDefault();
  let queryString = `?pid=${procedure}&insurance=${insurance}&zip=${zip}`
  let path = "/Procedure/" + queryString
  navigate(`${path}`)
}

const searchInput = document.getElementById("searchInput");
console.log("This is search input:" + searchInput);

// store name elements in array-like object
const namesFromDOM = document.getElementsByClassName("name");

// listen for user events
const [dick, setDick] = useState("")


function queryProcedures(userInput) {
  console.log("hi, you're about to query procedures");
  console.log(userInput);
  Axios.post("http://localhost:3002/api/getProcedures", {}, {
      params: {
        userInput: userInput
      }
    }).then((data)=>{
      console.log(data.data.result);
      console.log("checkpoint");
      // console.log(procedureNames);
      callBackFunction(data.data.result);
  })

}

async function searchProcedureNames(userInput) {
  // const { value } = event.target;
  console.log(userInput);
  // get user search input converted to lowercase
  if (userInput.length > 3) {
    console.log("hello you're about to query");
    const searchQuery = userInput.toLowerCase();
    queryProcedures(searchQuery);
  }
}

let resList;
let results1 = [];
function callBackFunction(res) {
  // resList = document.getElementById("results");
  // for (const procedures of res) {
  //   resList.innerHTML += `<li class="name" Procedure_Code=${procedures.Procedure_Code}>${procedures.Med_Procedure_Description}</li>`;
  // }

  for (const val of res) {
    results1.push({label: val.Med_Procedure_Description, value: val.Procedure_Code});
  }

  console.log(results1[0]);
}

const Countries = [
  { label: "Albania", value: 355 },
  { label: "Argentina", value: 54 },
  { label: "Austria", value: 43 },
  { label: "Cocos Islands", value: 61 },
  { label: "Kuwait", value: 965 },
  { label: "Sweden", value: 46 },
  { label: "Venezuela", value: 58 }
];

return (
    <div className="Procedures">
      <br></br>
      <body></body>
      <form onSubmit={handleSubmit}>

      <div className="Searchbar">
      <div id="container">
        <TextField 
          id="searchInput"
          variant="outlined"
          fullWidth
          onChange={(e) => {
            searchProcedureNames(e.target.value)
          }}
          label= "Procedure name"
        />
        
        {/* <ul id="results"> </ul>  */}
    </div>

        <body> </body>

        <div>
          <Select 
          options={ results1 } 
          onChange={(values) => this.setValues(values)}/>
        </div>

        <center>
        <TextField
          id="input-with-icon-adornment"
          variant="outlined"
          
          onChange={(e) => {
            setZip(e.target.value);
          }}
          label= "Zip Code"
        />
        
        <TextField
          id="input-with-icon-adornment"
          variant="outlined"
          
          onChange={(e) => {
            setInsurance(e.target.value);
          }}
          label= "Insurance Provider"
        />

        <button type="submit">Search</button>
        </center>

      </div>
      </form>
      
      <h1>
      <center>
          <table>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Procedures</TableCell>
                      <TableCell align="right">Costs</TableCell>
                      <TableCell align="right">Hospital&nbsp;</TableCell>
                      <TableCell align="right">Date&nbsp;</TableCell>
                      <TableCell align="right">Providers&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                        <TableCell align="right">{procedure}</TableCell>
                        <TableCell align="right">{row.costs}</TableCell>
                        <TableCell align="right">{row.hospital}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.provider}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
      </TableContainer>
          </table>
          </center>
          </h1>
    </div>
    );
  }
  // get search bar element

  
  // name, costs, hospital, date, provider