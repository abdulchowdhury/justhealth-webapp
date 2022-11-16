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
  let navigate = useNavigate()

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
      alert(`inputted ${name}, ${procedure}, ${insurance}, ${cost}, ${hospital}, ${date}`);
      navigate('/')

  });
  //---------------------------------------------------------------
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
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Please enter the type of procedure *
            </Typography>
            <TextField
              label="Procedure type"
              variant="outlined"
              id="procedure"
              name="procedure"
              fullWidth
              onChange={(e)=>setProcedure(e.target.value)}
              //value={formik.values.firstName}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
              fullWidth
              onChange={(e)=>setHospital(e.target.value)}
              //value={formik.values.firstName}
              // error={
              //   formik.touched.firstName && Boolean(formik.errors.firstName)
              // }
              // helperText={formik.touched.firstName && formik.errors.firstName}
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
            <Button sx={{ height: 54, width: 800}} size={'large'} variant={'contained'} type={'submit'}>
              Send costs
            </Button>
            <Typography
              variant={'subtitle2'}
              color={'textSecondary'}
              sx={{ marginTop: 2 }}
              align={'center'}
            >
              {/* We'll get back to you in 1-2 business days. */}
            </Typography>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
