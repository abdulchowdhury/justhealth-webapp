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

 
export default function Pricing () {
  const [search, setSearch] = useState("")
  const [zip, setZip] = useState("")
  const [insurance, setInsurance] = useState("")


useEffect(() => {
    let pid = searchParams.get("pid")
    setProcedure(`${searchParams.get("pid")}`)
    setZip(`${searchParams.get("zip")}`)
    setInsurance(`${searchParams.get("insurance")}`)
    if (!(pid === "" || pid === undefined)) {
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


const rows = [
  createData(search, 159, 6.0, 24, 4.0),
  createData(search, 237, 9.0, 37, 4.3),
  createData(search, 262, 16.0, 24, 6.0),
  createData(search, 305, 3.7, 67, 4.3),
  createData(search, 356, 16.0, 49, 3.9),
];

const handleSubmit = (event) => {
  event.preventDefault();
  alert(`search: ${search}`);
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
            setSearch(e.target.value);
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
                        <TableCell align="right">{search}</TableCell>
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