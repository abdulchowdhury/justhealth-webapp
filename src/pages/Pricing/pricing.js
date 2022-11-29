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
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import infoBubble from "./infoBubble"
import LoadingSpinner from "../../components/LoadingSpinner";
import "../../App.css";
import { ImportContactsOutlined } from '@mui/icons-material';



export default function Pricing () {
  let navigate = useNavigate()
  const zipCodeData = require('zipcode-city-distance');
  var zipCodeDistance;

  const [searchParams, setSearchParams] = useSearchParams();
  const [procedureID, setProcedureID] = useState("")
  const [procedureName, setProcedureName] = useState("")
  const [zip, setZip] = useState("")
  const [insurance, setInsurance] = useState("")
  const [GradyData, setGradyData] = useState([])
  const [dropdownOptions, setDropdownOptions] = useState([])
  const [NorthsideAtlantaData, setNorthsideAtlantaData] = useState([])
  const [NorthsideDuluthData, setNorthsideDuluthData] = useState([])
  const [NorthsideForsythData, setNorthsideForsythData] = useState([])
  const [NorthsideGwinnettData, setNorthsideGwinnettData] = useState([])
  const [done, setDone] = useState(false)
  const [rows, setRows] = useState([{hospital:"", insurance:"", cost:"", avgPrice: ""}]);
  const [validZip , setvalidZip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waited, setWaited] = useState(false);
  //const [sortPrice, setSortPrice] = useState(false);
  var insurances = [];
  var vals = [];
  var b = [];
  var avgCost;
  var ac;
  var fullName = '';
  var numPrice;
  const gradyZip = '30303';
  const northsideatlantaZip = '30342';
  const northsideduluthZip = '30096';
  const northsideforsythZip ='30041';
  const northsidegwinnettZip = '30046'

useEffect(() => {
    let pid = searchParams.get("pid")
    if (!pid) {
      pid = "";
    }
    if (!(pid === undefined || pid === "")) {
      setProcedureID(`${searchParams.get("pid")}`)
      setZip(`${searchParams.get("zip")}`)
      setInsurance(`${searchParams.get("insurance")}`)
      let insurance = searchParams.get("insurance")
      let zip = searchParams.get("zip")
      queryAllHospitals(pid, insurance, zip)
      setDone(true);
    }
  }, []);

const queryAllHospitals = async (pid, ins, zipc) => {
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
      set(data.data.result[0]);
      if (zipc === "") {
        zipCodeDistance = -1 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zipc, gradyZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = -1 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      
      if ((ins === "" || ins === null || ((insurances.toString()).indexOf(ins.toUpperCase()) === -1))) {
        avgCost = data.data.result[0]["Charge"];
        avgCost = dollar.format(avgCost) + "*";
      } else {
        fullName = findName(insurances,ins.toUpperCase());
        if ((data.data.result[0]["Charge"] - vals[insurances.indexOf(fullName)]) <= 0) {
          avgCost = 0;
          avgCost = dollar.format(avgCost);
        } else {
          avgCost = (parseFloat(data.data.result[0]["Charge"]) - parseFloat(vals[insurances.indexOf(fullName)]));
          avgCost = dollar.format(avgCost);
        }
      }
      newRows.push({hospital:"Grady Memorial Hospital", insurance: (insurances.toString()).replace(/,/g,", ") , cost: (avgCost), distance: zipCodeDistance, avg: dollar.format(ac)})
      insurances = [];
      vals = [];
      b = [];
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
      set(data.data.result[0]);
      if (zipc === "") {
        zipCodeDistance = -1 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zipc, northsideatlantaZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = -1 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }

      if ((ins === "" || ins === null || ((insurances.toString()).indexOf(ins.toUpperCase()) === -1))) {
        avgCost = data.data.result[0]["Charge"];
        avgCost = dollar.format(avgCost) + "*";
      } else {
        fullName = findName(insurances,ins.toUpperCase());
        if ((data.data.result[0]["Charge"] - vals[insurances.indexOf(fullName)]) <= 0) {
          avgCost = 0;
          avgCost = dollar.format(avgCost);
        } else {
          avgCost = (parseFloat(data.data.result[0]["Charge"]) - parseFloat(vals[insurances.indexOf(fullName)]));
          avgCost = dollar.format(avgCost);
        }
      }
      newRows.push({hospital:"Northside Atlanta Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: (avgCost), distance: zipCodeDistance, avg: dollar.format(ac)})
      insurances = [];
      vals = [];
      b = [];
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
      set(data.data.result[0]);
      if (zipc === "") {
        zipCodeDistance = -1 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zipc, northsideduluthZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = -1 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      if ((ins === "" || ins === null || ((insurances.toString()).indexOf(ins.toUpperCase()) === -1))) {
        avgCost = data.data.result[0]["Charge"];
        avgCost = dollar.format(avgCost) + "*";
      } else {
        fullName = findName(insurances,ins.toUpperCase());
        if ((data.data.result[0]["Charge"] - vals[insurances.indexOf(fullName)]) <= 0) {
          avgCost = 0;
          avgCost = dollar.format(avgCost);
        } else {
          avgCost = (parseFloat(data.data.result[0]["Charge"]) - parseFloat(vals[insurances.indexOf(fullName)]));
          avgCost = dollar.format(avgCost);
        }
      }
      newRows.push({hospital:"Northside Duluth Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: (avgCost), distance: zipCodeDistance, avg: dollar.format(ac)})
      insurances = [];
      vals = [];
      b = [];
    }
  })
  await Axios.post("http://localhost:3002/api/NorthsideForsyth", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      setNorthsideForsythData(data.data.result)
      insure(data.data.result[0]);
      set(data.data.result[0]);
      if (zipc === "") {
        zipCodeDistance = -1 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zipc, northsideforsythZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = -1 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      if ((ins === "" || ins === null || ((insurances.toString()).indexOf(ins.toUpperCase()) === -1))) {
        avgCost = data.data.result[0]["Charge"];
        avgCost = dollar.format(avgCost) + "*";
      } else {
        fullName = findName(insurances,ins.toUpperCase());
        if ((data.data.result[0]["Charge"] - vals[insurances.indexOf(fullName)]) <= 0) {
          avgCost = 0;
          avgCost = dollar.format(avgCost);
        } else {
          avgCost = (parseFloat(data.data.result[0]["Charge"]) - parseFloat(vals[insurances.indexOf(fullName)]));
          avgCost = dollar.format(avgCost);
        }
      }
      newRows.push({hospital:"Northside Forsyth Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: (avgCost), distance: zipCodeDistance, avg: dollar.format(ac)})
      insurances = [];
      vals = [];
      b = [];
    }
  })
  await Axios.post("http://localhost:3002/api/NorthsideGwinnett", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      setNorthsideGwinnettData(data.data.result)
      insure(data.data.result[0]);
      set(data.data.result[0]);
      if (zipc === "") {
        zipCodeDistance = -1 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zipc, northsidegwinnettZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = -1 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      if ((ins === "" || ins === null || ((insurances.toString()).indexOf(ins.toUpperCase()) === -1))) {
        avgCost = data.data.result[0]["Charge"];
        avgCost = dollar.format(avgCost) + "*";
      } else {
        fullName = findName(insurances,ins.toUpperCase());
        if ((data.data.result[0]["Charge"] - vals[insurances.indexOf(fullName)]) <= 0) {
          avgCost = 0;
          avgCost = dollar.format(avgCost);
        } else {
          avgCost = (parseFloat(data.data.result[0]["Charge"]) - parseFloat(vals[insurances.indexOf(fullName)]));
          avgCost = dollar.format(avgCost);
        }
      }
      newRows.push({hospital:"Northside Gwinnett Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: (avgCost), distance: zipCodeDistance, avg: dollar.format(ac)})
      insurances = [];
      vals = [];
      b = [];
    }
  })
  // if (GradyData === "no data") {
  //   handleSubmit(event)
  // }
  //if (sortPrice !== true) {
    setRows(newRows.sort((a,b) => (parseFloat(a.distance) - parseFloat(b.distance))));
  //}
  // } else {
  //   setRows(newRows.sort((a,b) => (parseFloat(a.cost) - parseFloat(b.cost))));
  // }
}

function isNum(c) { // checks if digit is num
  return c >= '0' && c <= '9';
}

function insure(item) {
  for (const items in item) {
    if (typeof(items) === 'string' && typeof((item[items])) == 'string' && isNum((item[items]).substring(0,1))) {
      if(((item[items]) !== '0') && items !== "Charge" && items !== "Payor_Rate_Max" && items !== "Payor_Rate_Min" && items !== "Procedure_Code" && items !== "Cash_Discount"  && items !== "Med_Procedure_Description") {
        const name = (items.replace(/_/g," "));
        insurances.push(name.toUpperCase());
        vals.push(item[items]);
      }
    }
  }
}

function set(arr) { // takes data and only finds prices and takes out $ and takes out the prices that are $0
  for (const i in arr) {
    if (typeof(i) === 'string' && typeof((arr[i])) == 'string' && isNum((arr[i]).substring(0,1))) {
      if(((arr[i]) !== '0') && i !== "Charge" && i !== "Payor_Rate_Max" && i !== "Payor_Rate_Min" && i !== "Procedure_Code" && i !== "Med_Procedure_Description") {
         b.push(parseFloat(arr[i]));
      } else if (i === "Charge") {
          numPrice = arr[i];
      }
    }
  }
  calc(b);
}
function calc(arr) {
  var count = 0;
  var sum = 0.0;
  var temp;
  for (const i in arr) {
    if (numPrice - arr[i] <= 0) {
      temp = 0;
    } else {
      temp = numPrice - arr[i];
    }
    sum = sum + temp;
    count++;
  }
  ac = sum/count;
}

function findName(arr, str) {
  for (const i in arr) {
    if (arr[i].includes(str)) {
      return arr[i];
    }
  }
  return null;
}

function getDist(zipcode1, zipcode2) {
  zipCodeDistance = zipCodeData.zipCodeDistance(zipcode1, zipcode2,'M');
}

const handleSubmit = async (event) => {
  let queryString = `?pid=${procedureID}&insurance=${insurance}&zip=${zip}`
  let path = "/Pricing/" + queryString
  navigate(`${path}`)
  event.preventDefault();
  setWaited(false)
  setRows([])
  queryAllHospitals(procedureID, insurance, zip);
  setDone(true);
  delay(1500).then(() => setWaited(true))

}
const redirect = (hospital) => {
  let queryString = `?pid=${procedureID}&insurance=${insurance}&zip=${zip}`
  if (hospital === "Grady Memorial Hospital") {
    queryString += "&hospital=Grady"
  } else if (hospital === "Northside Atlanta Hospital") {
    queryString += "&hospital=NorthsideAtlanta"
  } else if (hospital === "Northside Duluth Hospital") {
    queryString += "&hospital=NorthsideDuluth"
  } else if (hospital === "Northside Forsyth Hospital") {
    queryString += "&hospital=NorthsideForsyth"
  } else if (hospital === "Northside Gwinnett Hospital") {
    queryString += "&hospital=NorthsideGwinnett"
  }
  let path = "/Procedure/" + queryString
  navigate(`${path}`)
}


function queryProcedures(userInput) {
  Axios.post("http://localhost:3002/api/getProcedures", {}, {
      params: {
        userInput: userInput
      }
    }).then((data)=>{
      callBackFunction(data.data.result);
  })

}

async function searchProcedureNames(userInput) {
  // const { value } = event.target;
  // get user search input converted to lowercase
  setProcedureName(userInput);
  if (userInput.length > 3) {
    setIsLoading(true);
    const searchQuery = userInput.toLowerCase();
    queryProcedures(searchQuery);
  } else {
    setIsLoading(false);
    setDropdownOptions([])
  }
}

function callBackFunction(res) {
  setIsLoading(false);
  let results1 = [];
  for (const val of res) {
    results1.push({label: val.Med_Procedure_Description, value: val.Procedure_Code});
  }
  setDropdownOptions(results1)
}


const onSuggestHandler = (dropdownOption) => {
    setProcedureName(dropdownOption.label);
    setProcedureID(dropdownOption.value);
    setDropdownOptions([]);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

return (
    <div style = {{marginTop:0, marginRight:20, marginLeft:20}}className="Procedures">
       <form onSubmit={handleSubmit}>
       <div className="Searchbar">
       <Grid 
            container
            spacing={0.5}
            sx ={{backgroundColor:"#fff", borderRadius: 2, padding: 0.5}}
          >
        <Grid item xs ={6}>
          <div id="container">
            <TextField 
              id="searchInput"
              variant="outlined"
              fullWidth
              sx={{backgroundColor: '#f2efe6', borderRadius: 2}}
              value={procedureID}
              onChange={(e) => {
                searchProcedureNames(e.target.value)
                setProcedureID(e.target.value)
              }}
              onBlur={() => {
                setDropdownOptions([]);
              }}
              label= "Procedure name or code"
            />
            {isLoading ? <LoadingSpinner /> : 
            <nav>
              <ul className = "no-bullets">
                {dropdownOptions && dropdownOptions.map((dropdownOption, index) =>
                  <li key = {dropdownOption.label} value = {dropdownOption.value} className = "suggestion" onMouseDown={() => {onSuggestHandler(dropdownOption)}}>
                    {dropdownOption.label}
                  </li>
                )}
              </ul>
            </nav>
            }
          </div>
        </Grid>

        <Grid item xs = {2}>
          <TextField
            id="input-with-icon-adornment"
            variant="outlined"
            value = {zip}
            sx={{backgroundColor: '#f2efe6', borderRadius: 2}}
            fullWidth
            onChange={(e) => {
              setZip(e.target.value);
            }}
            label= "Zip Code"
          />
        </Grid>

        <Grid item xs = {2}>
          <TextField
            id="input-with-icon-adornment"
            variant="outlined"
            value = {insurance}
            sx={{backgroundColor: '#f2efe6', borderRadius: 2, padding: 0}}
            onChange={(e) => {
              setInsurance(e.target.value);
            }}
            fullWidth
            label= "Insurance Provider"
          />
        </Grid>

        {/* <div>
          <label>
            <input
              type="checkbox"
              checked={(sortPrice === true)}
              onChange={(event) =>{
                setSortPrice(!sortPrice);
              }
              }
            />
           Sort by Price
          </label>
          </div> */}
          <Grid item xs = {2}>
            <Button sx={{ height: 54, width:"100%", fontWeight: 800, backgroundColor: '#22C55E', ":hover":{background: '#6437E7'}}} variant={'contained'} type={"submit"}>Search</Button>
          </Grid>

        </Grid>
        </div>
      </form>
      
      <h1>
      <center>
              <TableContainer component={Paper}>
              {done && rows.length > 0 ? (<Table sx={{ minWidth: 1050 }} aria-label="simple table">
              <TableHead>
                    <TableRow
                    key={"Labels"}>
                      <TableCell  align="left">Hospital</TableCell>
                      <TableCell  align="center">Insurances Accepted</TableCell>
                      {validZip === true ? (<TableCell  align="center">Distance </TableCell>) : ""}
                      <TableCell  align="right">Price You Pay {infoBubble("How was this calculated?","If your insurance is accepted, this price will reflect their given price. Otherwise, if your insurance is not accepted or you didn't input one, the price will be the cash discount price, marked with a *")}</TableCell>
                      <TableCell  align="right">Average Cost {infoBubble("How was this calculated?","We calculate the average cost using only the prices from insurances that actually cover this procedure and the cash price.")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.hospital}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                        <TableCell align="left"><Button onClick={() => {redirect(row.hospital)}}>{row.hospital}</Button></TableCell>
                        <TableCell align="center"><ul>{row.insurance}</ul></TableCell>
                        {row.distance !== "-1 Miles" ? (<TableCell align="center">{row.distance}</TableCell>) : ""}
                        <TableCell align="right">{(row.cost)}</TableCell>
                        <TableCell align="right">{(row.avg)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>): ""}
                </TableContainer>
                {rows.length === 0 && done && waited ? (<h3>Sorry, no results found.</h3>):""}
          </center>
          </h1>
    </div>
    );
  }