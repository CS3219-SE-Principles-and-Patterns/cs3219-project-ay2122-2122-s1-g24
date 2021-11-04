import React from 'react';
import DropDownMenu from './dropdown' 
import pic from '../assets/homePagePic.jpg'
import Container from 'react-bootstrap/Container';
const Homepage = () => {
    return (
        <div>
            <span>
                <Container>
                    <img src={pic} className="d-inline-block align-top"alt="Peer Prep" />
                </Container>
            </span>
            <span><DropDownMenu /></span>

        </div>
    )
}

export default Homepage;