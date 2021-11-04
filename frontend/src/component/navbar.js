import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png'

const Header = () => {
  const { logout } = useAuth();
  const loggedIn = Cookies.get('isLoggedIn');
  const authButton = loggedIn == 'true'
    ? ( 
      <Navbar.Brand href="/" onClick={logout}>logout</Navbar.Brand>
    ) : (
      <Navbar.Brand href="http://localhost:8080/login">login</Navbar.Brand>
    );

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Peer Prep" /></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {authButton}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;