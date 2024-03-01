import { useContext, useDebugValue, useEffect, useState } from "react";
import AuthContext from "../contex/authProvider";
import axiosInstance from '../api/axios';

const useAuth = () => {
    const { auth, onLogout } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    
    // useEffect(() => {
    //     let isMounted = true;

    //     const verifyToken = async () => {
    //         try {
    //             const response = await axiosInstance.post('/auth/verifyToken', {
    //                 withCredentials: true,
    //             });
                

    //             if (response.data && response.status !== 200 ){
    //                 // log out
    //             }
    //         }
    //         catch (err) {
    //             console.error(err);
    //         }
    //         finally {
    //             isMounted && setIsLoading(false);
    //         }
    //     }

    //     // Avoids unwanted call to verifyToken
    //     !auth?.accessToken ? verifyToken() : setIsLoading(false);

    //     return () => isMounted = false;
    // }, [])
    
    
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")

    return useContext(AuthContext);
}

export default useAuth;