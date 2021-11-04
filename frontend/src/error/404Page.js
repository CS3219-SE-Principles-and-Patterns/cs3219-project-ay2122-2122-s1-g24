import React from 'react'
import logo from '../assets/logo2.png'
import Container from 'react-bootstrap/Container'
const PageNotFound = () => {
    var link = <a href="/">home</a>;
    return (
        <Container>
            <div>
                <img src={logo} width="200" height="200" className="center"alt="Peer Prep" />
                <h2>This page could not be found</h2>
                <p>Click here to go back {link}</p>

            </div>
        </Container>
    )
}

export default PageNotFound