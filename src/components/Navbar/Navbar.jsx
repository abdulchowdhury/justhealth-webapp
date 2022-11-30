import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  alpha,
  InputBase,
  Box,
  Tooltip,
  IconButton,
  MenuItem,
  Avatar,
  Menu,
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState } from 'react';
import logo from '../../Assets/jh-logo.png';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { size } from 'mathjs';

const pages = ['Pricing', 'Patient Input'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Logo = styled('img')(({ theme }) => ({
  width: '5rem',
  minWidth: '4rem',
}));

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static' className='header' style={{ background: '#142233', marginBottom: 20, padding: 0}}>
      <Toolbar className='toolbar'>
        <nav>
        <a href="/">
        <Logo 
        src={logo}
        
        sx={{
          mr: 101,
          ml: -3,
        }}
        />
        </a>
        </nav>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='small'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          > </Menu>
          <Menu className='nav-center'> 
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu} >
                <Button href={`/${page}`} textalign='center'>{page} </Button>
              </MenuItem>
            ))}
         </Menu>
        </Box>
        <Typography
          variant='h5'
          noWrap
          component='a'
          href=''
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          JUSTHEALTH
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              href={`/${page}`}
              // onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                mr: 3,
                color: '#dfe6f0',
                display: 'block',
                textTransform: 'none',
                fontWeight: 900,
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
        {/* <Box sx={{ flexGrow: 1 }}>
          <Tooltip title='Help'>
            <IconButton disableRipple={true} style={{ color: 'white' }}>
              <QuestionMarkIcon />
            </IconButton>
          </Tooltip>
          <IconButton disableRipple={true} style={{ color: 'white' }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton disableRipple={true} style={{ color: 'white' }}>
            <NearMeOutlinedIcon />
          </IconButton>
        </Box> */}

        {/* Profile menu */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
              <PersonIcon  sx={{ color: '#c3cfde', fontSize: 30}}/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textalign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;