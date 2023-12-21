import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { signout,isLoggedIn } from '../actions/authAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  const authenticated = useSelector(state => state.auth.authenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout())
}

  const renderLoggedIn = () => {
    return (
      <Nav>
       
        <NavLink className="nav-link"  style={{  fontSize: "20px", color:"white", fontWeight:"600"}}>{user.RegisterdAdmin.Full_Name}</NavLink>
        <AccountCircleIcon  sx={{  fontSize: "40px", color:"gray" ,marginLeft:"10px"}} />
        <NavLink className="nav-link" onClick={logout}>Sign out</NavLink>
      </Nav>
    );
  }
  const renderNonLoggedIn = () => {
    return (
        <Nav>
            <NavLink to="/login" className="nav-link" >Sign In</NavLink>
            <NavLink to="/signup" className="nav-link" >Sign Up</NavLink>

        </Nav>
    );
}
    useEffect(() => {
      if (!authenticated) {
          dispatch(isLoggedIn());
      }
  }, []);


  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" style={{ color: "Yellow", fontSize: "32px", fontWeight: "700" }}>Serendip</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            {authenticated ? renderLoggedIn() : renderNonLoggedIn()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header