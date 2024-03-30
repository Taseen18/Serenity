import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        const storedToken = sessionStorage.getItem('token');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    useEffect(() => {
        if (token) {
            sessionStorage.setItem('token', JSON.stringify(token));
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
