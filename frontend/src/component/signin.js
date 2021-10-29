import React, { useState } from 'react';
import axios from "axios";
import GoogleLogin from "react-google-login"

const clientId = process.env.OAUTH_GOOGLE_ID
const SignIn= () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    async function login({ setToken }) {

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