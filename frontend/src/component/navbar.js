import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthService from '../service/AuthService'
import useAuth from '../context/AuthContext'
const logout = () => {
  AuthService.logout()
}

const Header = () => {
  const {login, loggedIn, logout,user,token}= useAuth();
  var name = user;
    return <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Peer Prep</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Brand href="/login">{name == "null" ? "login" : name}</Navbar.Brand>
      <Navbar.Brand href="/home" onClick={logout}>logout</Navbar.Brand>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default Header;