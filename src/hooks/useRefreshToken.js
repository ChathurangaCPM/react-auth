import axios from '../api/axios';
import useAuth from './useAuth';
const REFRESH_URL = '/auth/refresh';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    
    const refresh = async () => {

        const response = await axios.get(REFRESH_URL, {
            withCredentials: true,
        });

        const { data } = response;

        // console.log('refresh token===', data);
        localStorage.setItem("accessToken", data.accessToken);
        // localStorage.setItem("refreshToken", data.accessToken);

        setAuth(prev => {
            return {
                ...prev,
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.accessToken
            }
        });
        
        return response.accessToken;
    }
    return refresh;
};

export default useRefreshToken;