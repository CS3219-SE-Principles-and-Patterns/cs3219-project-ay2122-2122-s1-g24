import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthService from '../service/AuthService'

  //console.log(JSON.parse(AuthService.getUser()))
  var name = AuthService.getName()
  if (name == null) {
     name = "login"
  }
const Header = () => {
    return <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Peer Prep</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Brand href="/login">{name}</Navbar.Brand>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default Header;