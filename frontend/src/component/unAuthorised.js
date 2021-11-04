import React from 'react'
import logo from '../assets/logo2.png'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
const unathorised = () => {
    var link = <a href="http://localhost:8080/login">Goggle</a>;
    return (
        <Container>
            <div>
                <img src={logo} width="200" height="200" className="center"alt="Peer Prep" />
                <h2>Sorry you need to sign in first</h2>
                <p>Click here sign in with {link}</p>
            </div>
        </Container>
    )
}

export default unathorised;
