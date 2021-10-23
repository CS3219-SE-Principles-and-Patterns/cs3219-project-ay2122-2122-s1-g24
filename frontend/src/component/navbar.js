import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
const Header = () => {
    return <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Peer Prep</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">Rishabh Paliwal Prince of Darkness</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default Header;