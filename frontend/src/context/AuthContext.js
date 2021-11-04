import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie'

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const login = (newUser, newToken) => {
    const newUserName = JSON.parse(newUser)['name'];
    setUser(newUserName);
    setToken(newToken);
    setLoggedIn(true);
    Cookies.set('username', newUserName);
    Cookies.set('token', newToken);
    Cookies.set('isLoggedIn', true);
  };

  const logout = () => {
    setUser('');
    setToken('');
    setLoggedIn(false);
    Cookies.remove('userame')
    Cookies.remove('token');
    Cookies.set('isLoggedIn', false);
  };

  const authContextValue = {
    login, loggedIn, logout, user, token
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
