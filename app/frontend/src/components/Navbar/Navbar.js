import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navbar.css'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import FunctionsIcon from '@mui/icons-material/Functions';
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  const [height, width] = [window.outerHeight, window.outerWidth];

  return (
    <AppBar position='static'>
      <Container>
        <MenuIcon/>
        <NavLink exact to="/">
          <FunctionsIcon/>
        </NavLink>
        <SearchIcon/>
      </Container>
    </AppBar>
  );
}

export default Navbar;