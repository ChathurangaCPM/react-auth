import { createContext, useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(localStorage.getItem("accessToken") || false);

    const logout = useLogout();
    // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const onLogin = (data) => {
        setAuth(data);
    }
    const onLogout = () => {
        logout()
    }
   
    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;