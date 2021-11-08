import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png'

const Header = ({ history }) => {
  const { logout: removeAuthInformation } = useAuth();
  const loggedIn = Cookies.get('isLoggedIn');
  const username = Cookies.get('username');
  const isAuthenticated = loggedIn === 'true';

  const logout = () => {
    removeAuthInformation();
    history.push('/');
  };

  const authButton = isAuthenticated ? ( 
    <Navbar.Brand style={{ cursor: 'pointer' }} onClick={logout}>logout</Navbar.Brand>
  ) : (
    <Navbar.Brand href="/login">login</Navbar.Brand>
  );
  const profilePage = isAuthenticated && (
    <Navbar.Brand href="/profile">{username}</Navbar.Brand>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="Peer Prep" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <div>
          {profilePage}
          {authButton}
        </div>
      </Container>
    </Navbar>
  );
};

export default withRouter(Header);