import React from 'react';
import { useAuth } from  "../../context/AuthContext";

const Cookies = require("js-cookie");

const PartnerInfo = (props) => {
    
    var user = Cookies.get("username");

    let partnerName = "";
    if(props.users !== undefined) {
        for (const currUser of props.users) {
            if(currUser.valueOf() !== user) {
                partnerName = currUser.valueOf();
            }
        }
    }

    return (
        <div>
            <h3 style={{padding:"10px"}}>You are playing with: {partnerName === "" ? user : partnerName}</h3>
        </div>
    )
}

export default PartnerInfo;
