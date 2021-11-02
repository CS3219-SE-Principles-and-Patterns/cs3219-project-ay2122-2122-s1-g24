import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from  "../context/AuthContext";
import {Link} from "react-router-dom";

const Cookies = require("js-cookie");

const Header = () => {
  const {logout} =  useAuth();
  var user = Cookies.get("username");
  var loggedIn = Cookies.get("isLoggedIn");
  if (loggedIn == "true") {

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">Prep Prep</Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Brand >{user}</Navbar.Brand>
          <Navbar.Brand href="/" onClick={()=> {
            logout();
            user = Cookies.get("username");
            loggedIn = Cookies.get("isLoggedIn"); }}>logout</Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Link to="/">Prep Prep</Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Brand href="http://localhost:8080/login" >login</Navbar.Brand>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header;