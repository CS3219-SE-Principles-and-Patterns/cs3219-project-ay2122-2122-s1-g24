import React, { useState } from 'react';
import AuthService from '../service/AuthService'

import { useParams, Redirect } from "react-router-dom";

const queryString = require('query-string');
const  SetToken = ()=>{
    const query = queryString.parse( window.location.search);
    const user = query["user"]
    const token = query["accessToken"]
    console.log(query)
    AuthService.login(user, token);

    return (
        Redirect("/")
    )
}
export default SetToken
