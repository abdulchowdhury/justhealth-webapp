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
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
 
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


useEffect(() => {
    let pid = searchParams.get("pid")
    setProcedure(`${searchParams.get("pid")}`)
    setZip(`${searchParams.get("zip")}`)
    setInsurance(`${searchParams.get("insurance")}`)
    if (!(pid == "" || pid == undefined)) {
      queryAllHospitals(pid)
      setDone(true);
    }
  }, []);

const queryAllHospitals = async (pid) => {
  const newRows = []
  await Axios.post("http://localhost:3002/api/Grady", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
      console.log(data.data.result.length)
    if (data.data.result.length !== 0) {
      setGradyData(data.data.result)
      newRows.push({hospital:"Grady Memorial Hospital", insurance:"a", cost:data.data.result[0].Charge})
    }
  })
  await Axios.post("http://localhost:3002/api/NorthsideAtlanta", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      setNorthsideAtlantaData(data.data.result)
      newRows.push({hospital:"Northside Atlanta Hospital", insurance: "b", cost: data.data.result[0].Charge})
    }
  })
  await Axios.post("http://localhost:3002/api/NorthsideDuluth", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      setNorthsideDuluthData(data.data.result)
      newRows.push({hospital:"Northside Duluth Hospital", insurance: "c", cost: data.data.result[0].Charge})
    }
  })
  // if (GradyData === "no data") {
  //   handleSubmit(event)
  // }
  setRows(newRows)
}

const handleSubmit = async (event) => {
  event.preventDefault();
  setRows([])
  queryAllHospitals(procedure);
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


return (
    <div className="Procedures">
      <br></br>
      <body></body>
      <form onSubmit={handleSubmit}>
      <div className="Searchbar">
        <TextField
          id="input-with-icon-adornment"
          variant="outlined"
          fullWidth
          onChange={(e) => {
            setProcedure(e.target.value);
          }}
          label= "Search Procedures"
        />
        <body> </body>
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
                        <TableCell align="center">{row.insurance}</TableCell>
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
  
  // name, costs, hospital, date, provider