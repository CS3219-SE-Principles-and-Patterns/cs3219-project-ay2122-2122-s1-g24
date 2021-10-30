import React, { useState } from 'react';
import axios from "axios";
import GoogleLogin from "react-google-login"
import AuthService from "../service/AuthService"
const SignOut= () => {
    AuthService.logout()

    return (
        <div>
        <a href={`http://localhost:3000/`}>Home</a>
        </div>
        )
    
}

export default SignOut
