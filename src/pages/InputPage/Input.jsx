import Button from '@mui/material/Button'
import { useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

Axios.defaults.baseURL = "https://www.justhealth.fyi/";
const Input = () => {
  const [procedure, setProcedure] = useState("");
  const [insurance, setInsurance] = useState("");
  const [cost, setCost] = useState(0.0);
  const [date, setDate] = useState("");
  const [hospital, setHospital] = useState("");
  const MySwal = withReactContent(Swal)
  let navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    // Axios.post("http://localhost:3002/api/input", {}, {
    //   params: {
    //     procedure: procedure,
    //     insurance: insurance,
    //     cost: cost,
    //     date: date,
    //     hospital: hospital
    //   }
    // }).then(()=>{
      MySwal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      //alert(`inputted ${procedure}, ${insurance}, ${cost}, ${hospital}, ${date}`);
      navigate('/')

  // });
  }

  return (
    
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          component={Grid}
          marginBottom={{ xs: 10, sm: 0 }}
          container
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2, marginTop: -1 }}>
              Please enter the type of procedure *
            </Typography>
            <TextField
              label="Procedure type"
              variant="outlined"
              id="procedure"
              name="procedure"
              fullWidth
              onChange={(e)=>setProcedure(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Please enter the total accured costs *
            </Typography>
            <TextField
              label="Total costs"
              variant="outlined"
              id="costs"
              name="costs"
              fullWidth
              onChange={(e)=>setCost(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Please enter the date of the procedure *
            </Typography>
            <TextField
              // label="Procedure date"
              variant="outlined"
              type="date"
              id="date"
              name="date"
              fullWidth
              onChange={(e)=>setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Please enter the hospital *
            </Typography>
            <TextField
              label="Hospital name"
              variant="outlined"
              id="hospital"
              name="hospital"
              fullWidth
              onChange={(e)=>setHospital(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Please enter your insurance provider *
            </Typography>
            <TextField
              label="Insurance provider"
              variant="outlined"
              id="insurance"
              name="insurance"
              fullWidth
              onChange={(e)=>setInsurance(e.target.value)}
              sx={{ marginBottom: 2 }}
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
            <Button sx={{ height: 54, width: 700, fontWeight: 800, backgroundColor: '#1a2b40', ":hover":{background: '#111A29'}}} size={'large'} variant={'contained'} type={'submit'} >
              Submit
            </Button>
          </Grid>
        </Box>
      </form>
    </Box>
  );
  };
  
  export default Input;