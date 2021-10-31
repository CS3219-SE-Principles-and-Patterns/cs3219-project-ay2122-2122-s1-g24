import React, { useState }  from 'react';
import ReactDOM from 'react-dom';   
import Dropdown from 'react-bootstrap/Dropdown'
import DropDownMenu from './dropdown' 
import { AuthProvider, useAuth } from  "../context/AuthContext";

const difficulty = "Pick a difficulty";  

const Homepage = ({login, loggedIn, logout,user,token}) => {
    return (
        <div>
        <DropDownMenu />
        </div>
    )
}

export default Homepage;