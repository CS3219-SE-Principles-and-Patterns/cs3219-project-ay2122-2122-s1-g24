import React from 'react';
import DropDownMenu from './dropdown' 
import pic from '../assets/homePagePic.jpg'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

const Homepage = () => {
    return (
        <Container>
            <Row>
                <Col xs={5}>
                    <DropDownMenu />
                </Col>
                <Col xs={7}>
                    <Image src={pic} fluid className="d-inline-block align-top"alt="Peer Prep" />
                </Col>
            </Row>
        </Container>
    )
}

export default Homepage;