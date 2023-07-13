import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import './Navbar.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import MenuIcon from '@mui/icons-material/Menu';
import FunctionsIcon from '@mui/icons-material/Functions';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';

import CssBaseline from '@mui/material/CssBaseline';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useNavigate } from "react-router-dom";

const pages = ['Filler', 'More Filler', 'Filled'];
const fillers = ['Filler', 'Something', 'Placehold', 'Stuff'];

const drawerWidth = 150;
const navItems = ['Home', 'About', 'Contact'];

function Navbar() {
  const sessionUser = useAppSelector(state => state.session.user);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function navToStudents(e){
    e.preventDefault();
    navigate('/students');
  };

  function navToHome(e){
    e.preventDefault();
    navigate('/home');
  };

  //sliding sidebar
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>

        <ListItem sx={{ justifyContent: 'center' }}>
          <Button onClick={navToHome}>Home</Button>
        </ListItem>
        <ListItem sx={{ justifyContent: 'center' }}>
          <Button onClick={navToStudents}>Students</Button>
        </ListItem>

      </List>
    </Box>
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav' position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            
            {/* Logo (desktop) */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <AccessTimeFilledIcon fontSize='large'/>
            </Typography>
            
            {/* Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                id="menu-appbar"
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
                onClose={handleDrawerToggle}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
              </Menu>
            </Box>
            
            {/* Logo (mobile) */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
              sx={sessionUser ? {
                ml: 1,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              } : {
                mr: 5,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <AccessTimeFilledIcon fontSize='large'/>
            </Typography>
            
            {/* Misc buttons for desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleDrawerToggle}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))} */}
            </Box>
            
            {/* Profile */}
            <Box sx={{ flexGrow: 0 }}>
              <Profile user={sessionUser} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;