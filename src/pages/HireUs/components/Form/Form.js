/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import LoadingSpinner from "../../../../components/LoadingSpinner";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your first and last name')
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your first and last name'),
  lastName: yup
    .string('Enter your last name')
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your last name'),
  email: yup
    .string('Enter your email')
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  phone: yup
    .string()
    .trim()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/,
      'Please enter a valid phone number.',
    ),
  budget: yup.string().required('Please specify your project budget'),
  message: yup
    .string()
    .trim()
    .max(500, 'The message cannot contain more than 500 characters'),
});

const Form = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  };

  const onSubmit = (values) => {
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
//----------------------------------------------------------
  const [name, setName] = useState("");
  const [procedure, setProcedure] = useState("");
  const [insurance, setInsurance] = useState("");
  const [cost, setCost] = useState(0.0);
  const [date, setDate] = useState("");
  const [hospital, setHospital] = useState("");
  const [procedureName, setProcedureName] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownOptionsHospitals, setDropdownOptionsHospitals] = useState([]);

  let navigate = useNavigate()  

  const MySwal = withReactContent(Swal)

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3002/api/input", {}, {
      params: {
        name: name,
        procedure: procedure,
        insurance: insurance,
        cost: cost,
        date: date,
        hospital: hospital
      }
    }).then(()=>{
    MySwal.fire(
      'Thank you!',
      'We appreciate your help in making medical prices more transparent.',
      'success'
    )
      //alert(`inputted ${procedure}, ${insurance}, ${cost}, ${hospital}, ${date}`);
      navigate('/')
  });
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
      setProcedure(dropdownOption.value);
      setDropdownOptions([]);
  }

  function queryHospitalNames(userInput) {
    Axios.post("http://localhost:3002/api/getHospitals", {}, {
        params: {
          userInput: userInput
        }
      }).then((data)=>{
        callBackFunctionHospitalNames(data.data.result);
    })
  
  }
  
  async function searchHospitalNames(userInput) {
    // const { value } = event.target;
    // get user search input converted to lowercase
    if (userInput.length > 1) {
      setIsLoadingHospitals(true);
      const searchQuery = userInput.toLowerCase();
      queryHospitalNames(searchQuery);
    } else {
      setIsLoadingHospitals(false);
      setDropdownOptionsHospitals([])
    }
  }
  
  function callBackFunctionHospitalNames(res) {
    setIsLoadingHospitals(false);
    let results1 = [];
    for (const val of res) {
      results1.push({name: val.name});
    }
    setDropdownOptionsHospitals(results1)
  }
  
  
  const onSuggestHandlerHospitals = (dropdownOption) => {
      setHospital(dropdownOption.name);
      setDropdownOptionsHospitals([]);
  }
  //--------------------------------------------------------------
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          component={Grid}
          marginBottom={{ xs: 10, sm: 0 }}
          container
          spacing={4}
        >
          {/* <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Please enter your full name *
            </Typography>
            <TextField
              label="Full name"
              variant="outlined"
              id="name"
              name="name"
              fullWidth
              onChange={(e)=>setName(e.target.value)}
              //value={formik.values.firstName}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2, marginTop: -1 }}>
              Please enter the procedure code or name *
            </Typography>
            <TextField 
              id="searchInput"
              variant="outlined"
              fullWidth
              value={procedureName}
              onChange={(e) => {
                searchProcedureNames(e.target.value)
                setProcedure(e.target.value)
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
              //value={formik.values.firstName}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
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
              //value={formik.values.firstName}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
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
              value={hospital}
              fullWidth
              onChange={(e)=>{
                setHospital(e.target.value)
                searchHospitalNames(e.target.value)
              }}
              onBlur={() => {
                setDropdownOptionsHospitals([]);
              }}
              //value={formik.values.firstName}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
            />
            {isLoadingHospitals ? <LoadingSpinner /> : 
            <nav>
              <ul className = "no-bullets">
                {dropdownOptionsHospitals && dropdownOptionsHospitals.map((dropdownOption, index) =>
                  <li key = {index} className = "suggestion" onMouseDown={() => {onSuggestHandlerHospitals(dropdownOption)}}>
                    {dropdownOption.name}
                  </li>
                )}
              </ul>
            </nav>
            }
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
              //value={formik.values.firstName}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
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

export default Form;
