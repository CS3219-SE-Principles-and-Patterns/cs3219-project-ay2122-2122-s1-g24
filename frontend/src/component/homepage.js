import React, { useState }  from 'react';
import ReactDOM from 'react-dom';   
import Dropdown from 'react-bootstrap/Dropdown'
import DropDownMenu from './dropdown' 
import { AuthProvider, useAuth } from  "../context/AuthContext";

const difficulty = "Pick a difficulty";  

const Homepage = () => {
    const {login,loggedIn,logout,user,token} =  useAuth();

    return (
        <div>
            {user}
            {token}
        <DropDownMenu />
        </div>
    )
}

export default Homepage;