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
import React from "react";
import "./Navbar.css";
import navbarItems from "../NavbarItems";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from '../../../Assets/jh-logo.png';
import PersonIcon from '@mui/icons-material/Person';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Logo = styled('img')(({ theme }) => ({
  width: '5rem',
  minWidth: '4rem',
}));



const Navbar = ({ toggle }) => {
const [anchorElNav, setAnchorElNav] = React.useState(null);
const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <nav id = "specialnav">
      <Link to="/" className="link">
      <Logo 
        src={logo}
        sx={{
          mr: -2,
          ml: -6,
        }}
        />
        {/* JUSTHEALTH */}
      </Link>
      <div className="menu-items">
        {navbarItems.map((item, index) => (
          <Link className="link" to={item.link} key={index}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="icons">
        {/* Profile */}
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
        <PersonIcon  className = "github-icon icon-tabler icon-tabler-brand-github"
        sx={{ color: '#c3cfde', fontSize: 40}}/>
      </IconButton>
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
        <div className="mobile-menu-icon">
          <FaBars onClick={toggle} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
