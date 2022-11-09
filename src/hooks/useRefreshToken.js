import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth();

    const refresh = async () => {
        // config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth?.accessToken}`
        const response = await axios.get('/refresh', {
            // withCredentials: true
            // headers : {
            //     Authorization : `Bearer ${auth?.accessToken}`
            // }
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.authorisation.token);
            console.log(`roles di refresh : `);
            console.log(response?.data);
            return { 
                ...prev, 
                // roles : response?.data?.user?.roles,
                accessToken:  response.data.authorisation.token }
        });
        return response.data.authorisation.token;
    }
    return refresh;
};

export default useRefreshToken;