import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) 
        {
            setToken(token); // Set token in state if found in localStorage
        }
        setLoading(false); // Set loading to false after checking localStorage
    }, []);

    const setLocalToken = (token) => {
        localStorage.setItem("token", token);
        setToken(token); // Set token in state
    };

    const removeToken = () => {
        localStorage.removeItem("token");
        setToken(null); // Clear token from state
    };

    return (
        <AuthContext.Provider
            value={{ token, setLocalToken, removeToken, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);