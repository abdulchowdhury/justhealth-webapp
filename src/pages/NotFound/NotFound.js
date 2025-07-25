import React from 'react';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '../../common/Container';
import NotFoundIllustration from '../../Assets/NotFound';

const NotFound = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box
      minHeight={'calc(100vh - 64px - 183px)'}
      height={'100%'}
      display={'flex'}
      alignItems={'center'}
    >
      <Container>
        <Grid container spacing={6}>
          <Grid item container justifyContent={'center'} xs={12} md={6}>
            <Box
              height={'100%'}
              width={'100%'}
              maxWidth={{ xs: 500, md: '100%' }}
            >
              <NotFoundIllustration width={'100%'} height={'100%'} />
            </Box>
          </Grid>
          <Grid
            item
            container
            alignItems={'center'}
            justifyContent={'center'}
            xs={12}
            md={6}
          >
            <Box>
              <Typography
                variant="h1"
                component={'h1'}
                align={isMd ? 'left' : 'center'}
                sx={{ fontWeight: 700, color: '#1a2b40' }}
              >
                404
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="textSecondary"
                align={isMd ? 'left' : 'center'}
              >
                Oops! Looks like you followed a bad link.
                <br />
                If you think this is a problem with us, please{' '}
                <Link href={''} underline="none" sx={{color: '#1a2b40'}}>
                  tell us
                </Link>
              </Typography>
              <Box
                marginTop={4}
                display={'flex'}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                sx={{ marginTop: 5, marginBottom: 5, height: 54, fontWeight: 800, backgroundColor: '#1a2b40', ":hover":{background: '#111A29'}}}
                  component={Link}
                  variant="contained"
                  size="large"
                  href={'/'}
                >
                  Back home
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
