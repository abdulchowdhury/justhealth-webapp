import React from 'react';
import PropTypes from 'prop-types';
//import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '../../common/Container.js';
import { Headline, Form, Partners } from './components';

const HireUs = () => {
  //const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          //backgroundColor: theme.palette.alternate.main,
          //backgroundImage: `linear-gradient(120deg, ${theme.palette.background.paper} 0%, ${theme.palette.alternate.main} 100%)`,
        }}
      >
        <Container>
          <Headline />
        </Container>
      </Box>
      <Container maxWidth={800} paddingBottom={'0 !important'}>
        <Form />
      </Container>
      <Container>
      </Container>
      <Container paddingTop={'0 !important'}>
        {/* <Partners themeMode={themeMode} /> */}
      </Container>
    </Box>
  );
};

// HireUs.propTypes = {
//   themeMode: PropTypes.string.isRequired,
// };

export default HireUs;
