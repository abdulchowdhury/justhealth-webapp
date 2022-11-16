import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Headline = () => {
  return (
    <Box>
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
      <Box marginBottom={2}>
        <Typography
          variant="h2"
          align={'center'}
          sx={{
            fontWeight: 700,
          }}
        >
          Enter your medical costs here!
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" align={'center'} color={'textSecondary'}>
          Help us provide more precise pricing on procedures by telling us how much you spent on your last visit!
        </Typography>
      </Box>
    </Box>
  );
};

export default Headline;
