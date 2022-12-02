import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios'
import React from 'react';
import Grid from '@mui/material/Grid';
import Background from '../../Assets/homee.svg'
import text from '../../Assets/helalthtext.svg'
import "./Home.css"
import Button from '@mui/material/Button';
import Container from '../../common/Container.js';
import LoadingSpinner from "../../components/LoadingSpinner";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  return size;
}

const Home = () => {

  const [height, width] = useWindowSize();

  let navigate = useNavigate()
  const [procedureID, setProcedureID] = useState("")
  const [procedureName, setProcedureName] = useState("")
  const [zip, setZip] = useState("");
  const [insurance, setInsurance] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let queryString = `?pid=${procedureID}&insurance=${insurance}&zip=${zip}&name=${procedureName}`
    let path = "/Pricing/" + queryString
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

return (
    
  <div>
  {/* <div  style={{ backgroundImage: `url(${Background})`, backgroundRepeat: "no-repeat", alignItems: "center" }}> */}
  <br></br>
    <br></br>
    {/* <h3>width: {width} height: {height}</h3> */}
  <div>
    <Box className='cards'>
      <br></br>
    <Box className='car'>
      <img src={text} width={width} className="svg"/>
    </Box>
  <Box className='card' width={width/2}>
        <form onSubmit={handleSubmit}>
          <Box
            component={Grid}
            marginBottom={{ xs: 10, sm: 0 }}
            container
            spacing={1}
          >

          <Grid item xs={12}>
            <TextField
              sx={{backgroundColor: '#f2efe6', borderRadius: 2}}
              id="searchInput"
              variant="filled"
              fullWidth
              value={procedureName}
              
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
              <ul className = "no-bullets-home">
                {dropdownOptions && dropdownOptions.map((dropdownOption, index) =>
                  <li key = {dropdownOption.label} value = {dropdownOption.value} className = "suggestion" onMouseDown={() => {onSuggestHandler(dropdownOption)}}>
                    {dropdownOption.label}
                  </li>
                )}
              </ul>
            </nav>
            }
          </Grid>
            
            <Grid item xs={6}>
              <TextField
              sx={{backgroundColor: '#f2efe6', borderRadius: 2}}
                label="Insurance provider"
                variant="filled"
                id="insurance"
                fullWidth
                
                onChange={(e) => setInsurance(e.target.value)}
                //value={formik.values.firstName}
                // error={
                //   formik.touched.firstName && Boolean(formik.errors.firstName)
                // }
                // helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{backgroundColor: '#f2efe6', marginBottom: -5, borderRadius: 2}}
                label="ZipCode"
                variant="filled"
                id="zip"
                fullWidth
                
                onChange={(e) => setZip(e.target.value)}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Button sx={{ marginBottom: 5, height: 54, width: width/4, fontWeight: 800, backgroundColor: '#22C55E', ":hover":{background: '#6437E7'}}} size={'large'} variant={'contained'} type={'submit'} >
                Search
              </Button>
            </Grid>
          </Box>
        </form>
      </Box>
      </Box>
      </div>
  </div>
    );
  };
  
  export default Home;