import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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

import type { RootState, AppDispatch } from '../../store';

const pages = ['Products', 'Pricing', 'Blog'];
const fillers = ['Filler', 'Something', 'Placehold', 'Stuff'];

const drawerWidth = 150;
const navItems = ['Home', 'About', 'Contact'];

function Navbar() {
  const selectSessionUser = (state: RootState) => state.session.user;
  const sessionUser = useSelector(selectSessionUser);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //sliding sidebar
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {fillers.map((filler) => (
          <ListItem sx={{ justifyContent: 'center' }}>
            <Typography>{filler}</Typography>
          </ListItem>
        ))}
        {/* <ListItem sx={{ justifyContent: 'center' }}>
          <NavLink to="/login">Log In</NavLink>
        </ListItem>
        <ListItem sx={{ justifyContent: 'center' }}>
          <NavLink to="/signup">Sign Up</NavLink>
        </ListItem> */}
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
              <AccessTimeFilledIcon/>
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
                <MenuIcon />
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
              <AccessTimeFilledIcon/>
            </Typography>
            
            {/* Misc buttons for desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleDrawerToggle}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
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

  // return (
  //   <AppBar position='static'>
  //     <Container>
  //       <MenuIcon/>
  //       <NavLink exact to="/">
  //         <FunctionsIcon/>
  //       </NavLink>
  //       <SearchIcon/>
  //     </Container>
  //   </AppBar>
  // );
}

export default Navbar;