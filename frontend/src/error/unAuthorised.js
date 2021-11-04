import React from 'react'
import logo from '../assets/logo2.png'
import Container from 'react-bootstrap/Container'
const unathorised = () => {
    var link = <a href="http://localhost:8080/login">Google</a>;
    return (
        <Container style={{marginTop: "20px"}}>
            <div>
                <img src={logo} width="200" height="200" className="center"alt="Peer Prep" />
                <h2>Please sign in to access this page</h2>
                <p>Click here to sign in with {link}</p>
            </div>
        </Container>
    )
}

export default unathorised;
