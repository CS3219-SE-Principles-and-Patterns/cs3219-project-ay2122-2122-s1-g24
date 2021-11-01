import React from 'react';

const PartnerInfo = (props) => {
    return (
        <div>
            <h3>You are playing with: {props.partnerName}</h3>
        </div>
    )
}

export default PartnerInfo;