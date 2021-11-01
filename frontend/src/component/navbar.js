import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useAuth } from  "../context/AuthContext";
import {Link} from "react-router-dom";

const Header = () => {
  const {logout,user} =  useAuth();
  var name = user;

    return <Navbar bg="dark" variant="dark">
    <Container>
      <Link to="/">Prep Prep</Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Brand href="/login">{name}</Navbar.Brand>
      <Navbar.Brand href="/login">login</Navbar.Brand>
      <Navbar.Brand href="/" onClick={logout}>logout</Navbar.Brand>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default Header;