import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Background from '../../Assets/home-background.svg'
import "./HomeNew.css"
import Container from '../../common/Container.js';

const HomeNew = () => {
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
//   const theme = useTheme();

//   const GridItemHeadlineBlock = () => (
//     <Box>
//       {/* <img src={Background} marginBottom={40}/> */}
//       <Typography 
//         variant="h2"
//         align="left"
//         gutterBottom
//         data-aos={'fade-right'}
//         sx={{
//           fontWeight: 900,
//           ml: 3
//         }}
//       >
//         {/* <div> we make prices transparent, </div>
//         <div> so you can focus on <div> justhealth </div> </div> */}

//       </Typography>
//       <Box marginBottom={4}>
//         {/* <Typography
//           variant="h6"
//           component="p"
//           color="textPrimary"
//           data-aos={'fade-right'}
//           sx={{
//             fontWeight: 900,
//             ml: 3
//           }}
//         >
//           Let us focus on getting you the best care at the best price possible.
//         </Typography> */}
//         {/* <Typography
//           variant="h6"
//           component="p"
//           color="textPrimary"
//           data-aos={'fade-right'}
//           sx={{
//             fontWeight: 900,
//             ml: 3
//           }}
//         >
//           So you just focus on getting better!
//         </Typography> */}
//       </Box>
//       {/* <Box
//         display={'flex'}
//         flexDirection={'column'}
//         alignItems={'flex-start'}
//         data-aos={'fade-right'}
//       >
//         <Box>
//           {[1, 2, 3, 4, 5].map((item) => (
//             <Box
//               key={item}
//               color={theme.palette.secondary.main}
//               display={'inline'}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 width={24}
//                 height={24}
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             </Box>
//           ))}
//         </Box>
//         <Typography>Average score: 4.9/5</Typography>
//       </Box> */}
//     </Box>
//   );

//   const GridItemFormBlock = () => (
//     <Box
//       padding={{ xs: 3, sm: 6 }}
//       width={'100%'}
//       component={Card}
//       borderRadius={2}
//       boxShadow={1}
//       data-aos={'fade-left'}
//     >
      
//       <form noValidate autoComplete="off" onSubmit={handleSubmit} >
//         <Box display="flex" flexDirection={'column'}>
//           <Box marginBottom={2}>
//             <TextField
//               sx={{ height: 54 }}
//               label="Procedure"
//               onChange={(e) => setProcedure(e.target.value)}
//               id="procedure"
//               variant="outlined"
//               color="primary"
//               size="medium"
//               fullWidth
//             />
//           </Box>
//           <Box marginBottom={2}>
//           <TextField
//               sx={{ height: 54 }}
//               label="Insurance Provider"
//               onChange={(e) => setInsurance(e.target.value)}
//               id="insurance"
//               variant="outlined"
//               color="primary"
//               size="medium"
//               fullWidth
//             />
//           </Box>
//           <Box marginBottom={2}>
//           <TextField
//               sx={{ height: 54 }}
//               label="ZipCode"
//               onChange={(e) => setZip(e.target.value)}
//               id="zip"
//               variant="outlined"
//               color="primary"
//               size="medium"
//               fullWidth
//             />
//           </Box>
//           <Box>
            // <Button
            //   sx={{ height: 54, fontWeight: 700, backgroundColor: '#1a2b40'}}
            //   variant="contained"
            //   color="primary"
            //   size="medium"
            //   fullWidth
            // >
            //   Search
            // </Button>
//           </Box>
//           <Box marginY={2} marginX={{ xs: -3, sm: -6 }}>
//             {/* <Divider /> */}
//           </Box>
//           <Box>
//             {/* <Typography component="p" variant="body2" align="left">
//               By creating you account you agree to our{' '}
//               <Box
//                 component="a"
//                 href=""
//                 color={theme.palette.text.primary}
//                 fontWeight={'700'}
//               >
//                 Privacy Policy
//               </Box>
//               ,{' '}
//               <Box
//                 component="a"
//                 href=""
//                 color={theme.palette.text.primary}
//                 fontWeight={'700'}
//               >
//                 Data Policy
//               </Box>{' '}
//               and{' '}
//               <Box
//                 component="a"
//                 href=""
//                 color={theme.palette.text.primary}
//                 fontWeight={'700'}
//               >
//                 Cookie Policy
//               </Box>
//               .
//             </Typography> */}
//           </Box>
//         </Box>
//       </form>
//     </Box>
//   );

//   //-------------------------------------------
//   let navigate = useNavigate()
//   const [procedure, setProcedure] = useState("");
//   const [zip, setZip] = useState("");
//   const [insurance, setInsurance] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
    
//     let queryString = `?pid=${procedure}&insurance=${insurance}&zip=${zip}`
//     let path = "/Procedure/" + queryString
//     navigate(`${path}`)
//   }
//   //------------------------------------------

  return (
    
//     <Box>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <Box width={1} height="100%" display="flex" alignItems="center">
//             <GridItemHeadlineBlock />
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box width={1} height="100%" display="flex" alignItems="center">
//             <GridItemFormBlock />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
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

export default HomeNew;
