import React, { useState }  from 'react';
import ReactDOM from 'react-dom';   
import Dropdown from 'react-bootstrap/Dropdown'
import AuthService from '../service/AuthService'
import DropDownMenu from './dropdown' 
const difficulty = "Pick a difficulty";  
const Homepage = () => {
    var name = AuthService.getToken()
    console.log(name);
    return (
        <div>
        <DropDownMenu />
        </div>
    )
}

export default Homepage;