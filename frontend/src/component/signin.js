import React, { useState } from 'react';
import axios from "axios";
import GoogleLogin from "react-google-login"

const SignIn= () => {
    async function login({ setToken }) {
            alert("hi");
        const res = await axios.get("http://localhost:8080/login");

        const token = res.json["accessToken"]
    }  

    return (
        <div>
        <a href={`http://localhost:8080/login`}>Google Login</a>
        </div>
        )
    
}

export default SignIn;