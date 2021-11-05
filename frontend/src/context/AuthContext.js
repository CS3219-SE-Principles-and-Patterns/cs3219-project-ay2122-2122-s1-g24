import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie'

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [picture, setPicture] = useState('')

  const login = (newUser, newToken) => {
    const user = JSON.parse(newUser);
    setUser(user.name);
    setToken(newToken);
    setPicture(user.picture);
    setLoggedIn(true);
    Cookies.set('username', user.name);
    Cookies.set('token', newToken);
    Cookies.set('isLoggedIn', true);
    Cookies.set('picture', user.picture);
  };

  const logout = () => {
    setUser('');
    setToken('');
    setPicture('');
    setLoggedIn(false);
    Cookies.remove('username')
    Cookies.remove('token');
    Cookies.remove('picture');
    Cookies.set('isLoggedIn', false);
  };

  const authContextValue = {
    login,
    loggedIn,
    logout,
    user,
    token,
    picture
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
