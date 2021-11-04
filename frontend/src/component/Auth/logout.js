import React from 'react';
import AuthService from "../../service/AuthService"

const SignOut= () => {
    AuthService.logout()

    return (
        <div>
        <a href={`http://localhost:3000/`}>Home</a>
        </div>
        )
    
}

export default SignOut
