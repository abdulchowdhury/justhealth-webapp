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
  
  // name, costs, hospital, date, provider