import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from  "../context/AuthContext";
import logo from '../assets/logo.png'
const Cookies = require("js-cookie");



const Header = () => {
  const {logout} =  useAuth();
  var user = Cookies.get("username");
  var loggedIn = Cookies.get("isLoggedIn");


  if (loggedIn == "true") {

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img src={logo} width="50" height="50" className="d-inline-block align-top"alt="Peer Prep" /> </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Brand >{user}</Navbar.Brand>
          <Navbar.Brand href="/" onClick={logout}>logout</Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/"><img src={logo} width="50" height="50" className="d-inline-block align-top"alt="Peer Prep" /></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Brand href="http://localhost:8080/login" >login</Navbar.Brand>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header;