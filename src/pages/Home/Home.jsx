import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios'
import React from 'react';
import Grid from '@mui/material/Grid';
import Background from '../../Assets/home-background.svg'
import "./Home.css"
import Button from '@mui/material/Button';
import Container from '../../common/Container.js';

import { useState } from "react";
import { useNavigate } from "react-router-dom"



const Home = () => {

  let navigate = useNavigate()
  const [procedure, setProcedure] = useState("");
  const [zip, setZip] = useState("");
  const [insurance, setInsurance] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let queryString = `?pid=${procedure}&insurance=${insurance}&zip=${zip}`
    let path = "/Pricing/" + queryString
    navigate(`${path}`)
  }

return (
    
  <div>
  {/* <div  style={{ backgroundImage: `url(${Background})`, backgroundRepeat: "no-repeat", alignItems: "center" }}> */}
  
  <img src={Background} width={1200} className="svg" marginBottom={-100}/>
  <Container maxWidth={800} paddingBottom={'0 !important'} 
  sx={{marginTop: -47}}
  >
  <Box>
        <form onSubmit={handleSubmit}>
          <Box
            component={Grid}
            marginBottom={{ xs: 10, sm: 0 }}
            container
            spacing={4}
          >

            <Grid item xs={12}>
              <TextField
                sx={{backgroundColor: '#f2efe6', borderRadius: 2}}
                label="Procedure name"
                variant="filled"
                id="procedure"
                fullWidth
                onChange={(e) => setProcedure(e.target.value)}
                //value={formik.values.firstName}
                // error={
                //   formik.touched.firstName && Boolean(formik.errors.firstName)
                // }
                // helperText={formik.touched.firstName && formik.errors.firstName}
              />
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
              <Button sx={{ height: 54, width: 500, fontWeight: 800, backgroundColor: '#22C55E', ":hover":{background: '#6437E7'}}} size={'large'} variant={'contained'} type={'submit'} >
                Search
              </Button>
            </Grid>
          </Box>
        </form>
      </Box>
      </Container>
  
  
  </div>
    );
  };
  
  export default Home;