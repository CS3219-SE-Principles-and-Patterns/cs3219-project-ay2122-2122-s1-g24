import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
//import AuthService from '../service/AuthService'
import { AuthProvider, useAuth } from  "../context/AuthContext";
import { Redirect } from "react-router-dom";

const Header = () => {
  const {login,loggedIn,logout,user,token} =  useAuth();
  var name = user;

    return <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Peer Prep</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Brand href="/login">login</Navbar.Brand>
      <Navbar.Brand href="/" onClick={logout}>logout</Navbar.Brand>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default Header;