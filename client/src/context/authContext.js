import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )

    const login = async (inputs) => {
        const res = await axios.post(`${BASE_URL}/auth/login`, inputs);
        setCurrentUser(res.data);
    }

    const logout = async (inputs) => {
        await axios.post(`${BASE_URL}/auth/logout`);
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}