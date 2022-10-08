import { Outlet, Link } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useState } from "react";


const Home = () => {

  const [procedure, setProcedure] = useState("");
  const [zip, setZip] = useState("");
  const [insurance, setInsurance] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`query parameters: procedure: ${procedure}, insurance: ${insurance}, zip: ${zip}`)
  }
  
    
  const surgerySamples = [
      { title: "hip surgery", specialty: 'orthopedic' },
      { title: "heart surgery", specialty: 'cardiologist' },
      { title: "fractured arm", specialty: 'orthopedic' },
      { title: "wisdom tooth removal", specialty: 'dentist' },
      { title: "corrective vision", specialty: 'ophthalmologist' },
      { title: "teeth whitening", specialty: 'dentist' }
]

  return (
    <div>

      <div class="Parent">

        <div className="MissionStatment">
          
          <h1> making prices transparent </h1>
          <h2> so you can focus on <h2> justhealth </h2> </h2>

          {/* search bar for procedures ---- dropbpx for insurance provdier
              number input for zipcode
              search button */}
          
         

            <form onSubmit={handleSubmit}>
              <label for="procedure">
              <Box
                sx={{
                width: 400,
                maxWidth: '100%',
              }}>
              <TextField onChange={(e) => setProcedure(e.target.value)} fullWidth label="Procedure" id="procedure" />
              </Box>
              </label>

              <label for="insurance">
              <Box
                sx={{
                width: 400,
                maxWidth: '100%',
              }}>
              <TextField onChange={(e) => setInsurance(e.target.value)} fullWidth label="Insurance Provider" id="insurance" />
              </Box>
              </label>

              <label for="zip">
              <Box
                sx={{
                width: 400,
                maxWidth: '100%',
              }}>
              <TextField onChange={(e) => setZip(e.target.value)} fullWidth label="ZipCode" id="zip" />
              </Box>
                
              </label>

              <button type="submit">Search</button>
          </form>



        </div>

      </div>
      
    </div>
    
  )
  };
  
  export default Home;