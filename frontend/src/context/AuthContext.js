import React, { createContext, useState } from "react";


const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState()


 const login = (newUser, newToken) => {
    const newUserName = JSON.parse(newUser)["name"];
    setUser(newUserName);
    setToken(newToken);
    setLoggedIn(true);
  };

  const logout = () => {

    setUser("");
    setToken("");
    setLoggedIn(false);
  };

  const authContextValue = {
   login, loggedIn, logout,user,token
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export  {useAuth, AuthProvider};
