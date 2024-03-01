import axios from '../api/axios';
import useAuth from './useAuth';
const REFRESH_URL = '/auth/refresh';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        
        const response = await axios.get(REFRESH_URL, {
            withCredentials: true,
        });

        console.log('refresh token===', response);
        
        setAuth(prev => {
            return { 
                ...prev, 
                roles: response.userRoles,
                accessToken: response.accessToken,
             }
        });
        return response.accessToken;
    }
    return refresh;
};

export default useRefreshToken;