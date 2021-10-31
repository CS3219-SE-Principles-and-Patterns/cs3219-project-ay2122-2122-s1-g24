import React, { useState } from 'react';
import axios from "axios";
import GoogleLogin from "react-google-login"

const SignIn= (props) => {
    return (
        <div>
        <a href={`http://localhost:8080/login`}>Google Login</a>
        </div>
        )
}

export default SignIn;