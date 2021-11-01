import React from 'react';
import { useAuth } from  "../context/AuthContext";

const PartnerInfo = (props) => {
    const { user } =  useAuth();
    const partnerName;
    for(const currUser of props.user) {
        if(currUser.valueOf() != user) {
            partnerName = currUser.valueOf();
        }
    }
    return (
        <div>
            <h3>You are playing with: {partnerName === undefined ? "Yourself" : partnerName}</h3>
        </div>
    )
}

export default PartnerInfo;