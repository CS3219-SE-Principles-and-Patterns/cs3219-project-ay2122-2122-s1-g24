import React from 'react';
import { useAuth } from '../../context/AuthContext'
import { Redirect } from 'react-router-dom';

const queryString = require('query-string');

const SetToken = () => {
  const { login } = useAuth();
  const query = queryString.parse(window.location.search);
  const newUser = query['user'];
  const newToken = query['accessToken'];
  login(newUser, newToken);

  return (
    <Redirect to="/" />
  );
};

export default SetToken;
