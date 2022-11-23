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
<<<<<<< Updated upstream
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
=======
  let navigate = useNavigate()
  const zipCodeData = require('zipcode-city-distance');
  var zipCodeDistance;


  const [searchParams, setSearchParams] = useSearchParams();
  const [procedure, setProcedure] = useState("")
  const [zip, setZip] = useState("")
  const [insurance, setInsurance] = useState("")
  const [GradyData, setGradyData] = useState([])
  const [dropdownOptions, setDropdownOptions] = useState([])
  const [NorthsideAtlantaData, setNorthsideAtlantaData] = useState([])
  const [NorthsideDuluthData, setNorthsideDuluthData] = useState([])
  const [NorthsideForsythData, setNorthsideForsythData] = useState([])
  const [NorthsideGwinnettData, setNorthsideGwinnettData] = useState([])
  const [done, setDone] = useState(false)
  const [rows, setRows] = useState([{hospital:"", insurance:"", cost:""}]);
  const [validZip , setvalidZip] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  var insurances = [];
  var b = [];
  var numPrice;
  const gradyZip = '30303';
  const northsideatlantaZip = '30342';
  const northsideduluthZip = '30096';
  const northsideforsythZip ='30041';
  const northsidegwinnettZip = '30046'

useEffect(() => {
    let pid = searchParams.get("pid")
    if (!(pid === undefined || pid === "")) {
      setProcedure(`${searchParams.get("pid")}`)
      setZip(`${searchParams.get("zip")}`)
      setInsurance(`${searchParams.get("insurance")}`)
      let insurance = searchParams.get("insurance")
      queryAllHospitals(pid, insurance)
>>>>>>> Stashed changes
      setDone(true);
    }
  }, []);

<<<<<<< Updated upstream
const queryAllHospitals = async (pid) => {
=======
const queryAllHospitals = async (pid, ins) => {
  setInsurance(ins)
  let formatting_options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }



  let dollar = Intl.NumberFormat('en-US', formatting_options);
>>>>>>> Stashed changes
  const newRows = []
  await Axios.post("http://localhost:3002/api/Grady", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
      console.log(data.data.result.length)
    if (data.data.result.length !== 0) {
<<<<<<< Updated upstream
      setGradyData(data.data.result)
      newRows.push({hospital:"Grady Memorial Hospital", insurance:"a", cost:data.data.result[0].Charge})
=======
      setGradyData(data.data.result);
      insure(data.data.result[0]);
      set(data.data.result[0]);
      if (zip === "") {
        zipCodeDistance = 0 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zip, gradyZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = 0 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      
      if ((ins === "" || ((insurances.toString()).indexOf(ins.toUpperCase()) !== -1))) {
        newRows.push({hospital:"Grady Memorial Hospital", insurance: (insurances.toString()).replace(/,/g,", ") , cost:dollar.format(avgCost), distance: zipCodeDistance})
      }
      insurances = [];
      b = [];
>>>>>>> Stashed changes
    }
  })
  await Axios.post("http://localhost:3002/api/NorthsideAtlanta", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      
      setNorthsideAtlantaData(data.data.result)
<<<<<<< Updated upstream
      newRows.push({hospital:"Northside Atlanta Hospital", insurance: "b", cost: data.data.result[0].Charge})
=======
      insure(data.data.result[0]);
      set(data.data.result[0]);
      if (zip === "") {
        zipCodeDistance = 0 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zip, northsideatlantaZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = 0 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      
      if (ins === "" || ((insurances.toString()).indexOf(ins.toUpperCase()) !== -1)) {
        newRows.push({hospital:"Northside Atlanta Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: dollar.format(avgCost), distance: zipCodeDistance})
      }
      insurances = [];
      b = [];
>>>>>>> Stashed changes
    }
  })
  await Axios.post("http://localhost:3002/api/NorthsideDuluth", {}, {
      params: {
        pid: pid
      }
    }).then(async (data)=>{
    if (data.data.result.length !== 0) {
      
      setNorthsideDuluthData(data.data.result)
<<<<<<< Updated upstream
      newRows.push({hospital:"Northside Duluth Hospital", insurance: "c", cost: data.data.result[0].Charge})
=======
      insure(data.data.result[0]);
      set(data.data.result[0]);
      if (zip === "") {
        zipCodeDistance = 0 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zip, northsideduluthZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = 0 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      
      if (ins === "" || ((insurances.toString()).indexOf(ins.toUpperCase()) !== -1)) {
        newRows.push({hospital:"Northside Duluth Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: dollar.format(avgCost), distance: zipCodeDistance})
      }
      insurances = [];
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
      if (zip === "") {
        zipCodeDistance = 0 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zip, northsideforsythZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = 0 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      
      if (ins === "" || ((insurances.toString()).indexOf(ins.toUpperCase()) !== -1)) {
        newRows.push({hospital:"Northside Forsyth Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: dollar.format(avgCost), distance: zipCodeDistance})
      }
      insurances = [];
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
      if (zip === "") {
        zipCodeDistance = 0 + " Miles";
        setvalidZip(false);
      } else {
        getDist(zip, northsidegwinnettZip);
        if (typeof(zipCodeDistance) !== 'number') {
          zipCodeDistance = 0 + " Miles";
          setvalidZip(false);
        } else {
          zipCodeDistance= (Math.round(zipCodeDistance* 10) / 10) + " Miles";
          setvalidZip(true);
        }
      }
      
      if (ins === "" || ((insurances.toString()).indexOf(ins.toUpperCase()) !== -1)) {
        newRows.push({hospital:"Northside Gwinnett Hospital", insurance: (insurances.toString()).replace(/,/g,", "), cost: dollar.format(avgCost), distance: zipCodeDistance})
      }
      insurances = [];
      b = [];
>>>>>>> Stashed changes
    }
  })
  // if (GradyData === "no data") {
  //   handleSubmit(event)
  // }

  if (sortPrice !== true) {
    setRows(newRows.sort((a,b) => (parseFloat(a.distance) - parseFloat(b.distance))));
  }
  // else {
  //   setRows(newRows.sort((a,b) => (parseFloat(a.cost) - parseFloat(b.cost))));
  // }
}


const rows = [
  createData(search, 159, 6.0, 24, 4.0),
  createData(search, 237, 9.0, 37, 4.3),
  createData(search, 262, 16.0, 24, 6.0),
  createData(search, 305, 3.7, 67, 4.3),
  createData(search, 356, 16.0, 49, 3.9),
];

<<<<<<< Updated upstream
const handleSubmit = (event) => {
=======
function set(arr) { // takes data and only finds prices and takes out $ and takes out the prices that are $0
  for (const i in arr) {
    if (typeof(i) === 'string' && typeof((arr[i])) == 'string' && isNum((arr[i]).substring(0,1))) {
      if(((arr[i]) !== '0') && i !== "Charge" && i !== "Payor_Rate_Max" && i !== "Payor_Rate_Min" && i !== "Procedure_Code") {
         b.push(parseFloat(arr[i]));
      } else if (i === "Charge") {
          numPrice = arr[i];
      }
    }
  }
  calc(b);
}
var avgCost;
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
  avgCost = sum/count;
}

function getDist(zipcode1, zipcode2) {
  zipCodeDistance = zipCodeData.zipCodeDistance(zipcode1, zipcode2,'M');
}

const handleSubmit = async (event) => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
          <div>
            <Select 
            options={ dropdownOptions } 
            onChange={ (choice) => {
              setProcedure(choice[0].value)
              
            } }
            placeholder="Suggested Procedures"/>
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


          <button type="submit">Search</button>

          
          </center>

        </div>
>>>>>>> Stashed changes
      </form>
      
      <h1>
      <center>
          <table>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1050 }} aria-label="simple table">
                  <TableHead>
<<<<<<< Updated upstream
                    <TableRow>
                      <TableCell align="right">Procedures</TableCell>
                      <TableCell align="right">Costs</TableCell>
                      <TableCell align="right">Hospital&nbsp;</TableCell>
                      <TableCell align="right">Date&nbsp;</TableCell>
                      <TableCell align="right">Providers&nbsp;</TableCell>
=======
                    <TableRow
                    key={"Labels"}>
                      <TableCell  align="left">Hospital</TableCell>
                      <TableCell  align="center">Insurances Accepted</TableCell>
                      {validZip === true ? (<TableCell  align="center">Distance </TableCell>) : ""}
                      <TableCell  align="right">Average Cost</TableCell>
>>>>>>> Stashed changes
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
<<<<<<< Updated upstream
                        <TableCell align="right">{search}</TableCell>
                        <TableCell align="right">{row.costs}</TableCell>
                        <TableCell align="right">{row.hospital}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.provider}</TableCell>
=======
                        <TableCell align="left"><Button onClick={() => {redirect(row.hospital)}}>{row.hospital}</Button></TableCell>
                        <TableCell align="center"><div><ul>{row.insurance}</ul></div></TableCell>
                        {row.distance !== "0 Miles" ? (<TableCell align="center">{row.distance}</TableCell>) : ""}
                        <TableCell align="right">{(row.cost)}</TableCell>
>>>>>>> Stashed changes
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