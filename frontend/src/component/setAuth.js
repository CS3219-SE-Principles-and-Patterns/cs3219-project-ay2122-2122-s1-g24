import React, { useState } from 'react';
import AuthService from '../service/AuthService'
import {useAuth} from '../context/AuthContext'
import { useParams, Redirect } from "react-router-dom";

const queryString = require('query-string');

const  SetToken = ()=>{
    const {login, loggedIn, logout,user,token}= useAuth()
    console.log(login);
    const query = queryString.parse( window.location.search);
    const newUser = query["user"]
    const userName = JSON.parse(newUser)["name"]
    const newToken = query["accessToken"]
    login(newUser, newToken)
    return (
        <Redirect to="/" />
    )
}
export default SetToken