import { useState } from "react";
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

 
export default function Pricing () {
  let navigate = useNavigate()


  const [procedure, setProcedure] = useState("")
  const [zip, setZip] = useState("")
  const [insurance, setInsurance] = useState("")
  const [GradyData, setGradyData] = useState("no data")
  const [NorthsideData, setNorthsideData] = useState("no data")
  const [done, setDone] = useState(false)
  const [rows, setRows] = useState([]);


  function createData(hospital, insurance, data) {
    var cost = data[0].Charge
    return { hospital, insurance, cost };
  }


const handleSubmit = async (event) => {
  console.log(event);
  event.preventDefault();
  await Axios.post("http://localhost:3002/api/Grady", {}, {
      params: {
        pid: procedure
      }
    }).then((data)=>{
    setGradyData(data.data.result)
  })
  await Axios.post("http://localhost:3002/api/Northside", {}, {
      params: {
        pid: procedure
      }
    }).then((data)=>{
    setNorthsideData(data.data.result)
  })
  // if (GradyData === "no data") {
  //   handleSubmit(event)
  // }
  setRows([
    createData("Grady Memorial Hospital", "Athena", GradyData),
    //createData("Northside Hospital", "Distance", NorthsideData)
  ])
  console.log(rows)
  setDone(true);

}
const redirect = (hospital) => {
  let queryString = `?pid=${procedure}&insurance=${insurance}&zip=${zip}`
  if (hospital === "Grady Memorial Hospital") {
    queryString += "&hospital=Grady"
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
                      <TableCell  align="right">Average Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
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