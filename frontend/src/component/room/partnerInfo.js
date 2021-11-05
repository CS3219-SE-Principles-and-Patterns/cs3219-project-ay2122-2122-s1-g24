import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const PartnerInfo = ({users}) => {
  const [partnerName, setPartnerName] = useState();

  useEffect(() => {
    const user = Cookies.get('username');
    console.log(users);
    setPartnerName(users[0] === user ? users[1] : users[0]);
  }, []);

  return (
    <div>
      <h3 style={{ padding: '10px' }}>You are coding with: {partnerName}</h3>
    </div>
  );
};

export default PartnerInfo;
