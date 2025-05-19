import { Children, createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    console.log("stat authen 0: ",isAuthenticated)

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log("token1: ",token);
        if (token) {
            setIsAuthenticated(true);
            
        }
        setLoading(false);
    },[]);

    const login = (token) => {
        console.log("token: ",token);
        localStorage.setItem('authToken',token);
        setIsAuthenticated(true);
        console.log("stat authen",isAuthenticated)
    };
    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);        
    };
    return(
        <AuthContext.Provider value={{ isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};


// -------------------------------------------------------------------------------cds-----ff
