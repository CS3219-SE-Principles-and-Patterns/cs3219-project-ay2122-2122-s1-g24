import React from "react";
import {createContext, useEffect, useState} from "react";

const Context = createContext({});

const AuthProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const values = {};

    const login = (newUser, newToken) => {
        setUser(newUser);
        setLoggedIn(true);
        setToken(newToken);
    };
    
      const logout = () => {
        setLoggedIn(false);
        setUser();
        setToken();
      };
      const authValues = {
        login,
        loggedIn,
        logout,
        user,
        token
      };
    return <Context.Provider value= { authValues} {...props} />
}
const useAuth = () => React.useContext(Context);
export default { AuthProvider, useAuth };