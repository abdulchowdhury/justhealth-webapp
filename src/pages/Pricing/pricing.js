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
import Axios from 'axios';
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';


export default function Pricing () {
  let navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams();
  const [procedure, setProcedure] = useState("")
  const [zip, setZip] = useState("")
  const [insurance, setInsurance] = useState("")
  const [GradyData, setGradyData] = useState([])
  const [NorthsideAtlantaData, setNorthsideAtlantaData] = useState([])
  const [NorthsideDuluthData, setNorthsideDuluthData] = useState([])
  const [done, setDone] = useState(false)
  const [rows, setRows] = useState([{hospital:"", insurance:"", cost:""}]);
  var insurances = [];
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

useEffect(() => {
    let pid = searchParams.get("pid")
    if (!(pid == undefined || pid == "")) {
      setProcedure(`${searchParams.get("pid")}`)
      setZip(`${searchParams.get("zip")}`)
      setInsurance(`${searchParams.get("insurance")}`)
      let insurance = searchParams.get("insurance")
      queryAllHospitals(pid, insurance)
      setDone(true);
    }
  }, []);

const queryAllHospitals = async (pid, ins) => {
  setInsurance(ins)
  let formatting_options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }
  let dollar = Intl.NumberFormat('en-US', formatting_options);
  const newRows = []
  await Axios.post("http://localhost:3002/api/Grady", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      setGradyData(data.data.result);
      insure(data.data.result[0]);
      if (ins === "" || ((insurances.toString()).indexOf(ins.toUpperCase()) !== -1)) {
        newRows.push({hospital:"Grady Memorial Hospital", insurance: (insurances.toString()).replace(/,/g,", ") , cost:dollar.format(data.data.result[0].Charge)})
      }
      insurances = [];
    }
  })
  await Axios.post("http://localhost:3002/api/NorthsideAtlanta", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      setNorthsideAtlantaData(data.data.result)
      insure(data.data.result[0]);
      if (ins === "" || ((insurances.toString()).indexOf(ins.toUpperCase()) !== -1)) {
        newRows.push({hospital:"Northside Atlanta Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: dollar.format(data.data.result[0].Charge)})
      }
      insurances = [];
    }
  })
  await Axios.post("http://localhost:3002/api/NorthsideDuluth", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      setNorthsideDuluthData(data.data.result)
      insure(data.data.result[0]);
      if (ins === "" || ((insurances.toString()).indexOf(ins.toUpperCase()) !== -1)) {
        newRows.push({hospital:"Northside Duluth Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: dollar.format(data.data.result[0].Charge)})
      }
      insurances = [];
    }
  })
  // if (GradyData === "no data") {
  //   handleSubmit(event)
  // }
  setRows(newRows)
}

function isNum(c) { // checks if digit is num
  return c >= '0' && c <= '9';
}

function insure(item) {
  for (const items in item) {
    if (typeof(items) === 'string' && typeof((item[items])) == 'string' && isNum((item[items]).substring(0,1))) {
      if(((item[items]) !== '0') && items !== "Charge" && items !== "Payor_Rate_Max" && items !== "Payor_Rate_Min" && items !== "Procedure_Code" && items !== "Cash_Discount") {
        const name = (items.replace(/_/g," "));
        insurances.push(name.toUpperCase());
      }
    }
  }
}



const handleSubmit = async (event) => {
  event.preventDefault();
  setRows([])
  queryAllHospitals(procedure, insurance);
  setDone(true);

}
const redirect = (hospital) => {
  let queryString = `?pid=${procedure}&insurance=${insurance}&zip=${zip}`
  if (hospital === "Grady Memorial Hospital") {
    queryString += "&hospital=Grady"
  } else if (hospital === "Northside Atlanta Hospital") {
    queryString += "&hospital=NorthsideAtlanta"
  } else if (hospital === "Northside Duluth Hospital") {
    queryString += "&hospital=NorthsideDuluth"
  }
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

  // RIGHT HERE IM GONNA MAKE CHANGES
  for (const val of res) {
    results1.push({label: val.Med_Procedure_Description, value: val.Procedure_Code});
  }

  console.log(results1[0]);
}

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
        
        <ul id="results"> </ul> 
    </div>

        <body> </body>

        <div>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={"Search Procedures Here..."}
          isDisabled={isDisabled} 
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={results1}
      />
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
              {done ? (<Table sx={{ minWidth: 1050 }} aria-label="simple table">
                  <TableHead>
                    <TableRow
                    key={"Labels"}>
                      <TableCell  align="left">Hospital</TableCell>
                      <TableCell  align="center">Insurances Accepted</TableCell>
                      <TableCell  align="right">Ticket Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.hospital}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                        <TableCell align="left"><Button onClick={() => {redirect(row.hospital)}}>{row.hospital}</Button></TableCell>
                        <TableCell align="center"><div><ul>{row.insurance}</ul></div></TableCell>
                        <TableCell align="right">{row.cost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>): ""}
      </TableContainer>
          </table>
          </center>
          </h1>
    </div>
    );
  }
  // get search bar element

  
  // name, costs, hospital, date, provider