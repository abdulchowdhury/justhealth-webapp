import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Headline = () => {
  return (
    <Box padding={5} paddingBottom={1} paddingTop={0} marginBottom={-2}>
      <Typography
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'medium',
        }}
        gutterBottom
        color={'textSecondary'}
        align={'center'}
      >
        {/* Hire us */}
      </Typography>
      <Box marginBottom={2} marginTop= {-5}>
        <Typography
          variant="h2"
          align={'center'}
          sx={{
            fontWeight: 700,
            color: '#27292e'
          }}
        >
          Enter your medical costs here!
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" align={'center'} color={'#31343b'} marginBottom={-5}>
          Help us provide more precise pricing on procedures by telling us how much you spent on your last visit!
        </Typography>
      </Box>
    </Box>
  );
};

export default Headline;
