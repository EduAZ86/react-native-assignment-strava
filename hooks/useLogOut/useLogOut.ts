import { useMutation } from '@tanstack/react-query';
import { getLocalToken, removeLocalToken } from '@/utils/asyncStorage/asyncStorage';
import { stravaAPI } from '@/utils/fetching/stravaApiAxios';
import { useAuthStore } from '@/lib/zustand/useSessionStore';
import { useRouter } from 'expo-router';

export const useLogout = () => {
    const { setAtleteLoggedInfo } = useAuthStore();
    const router = useRouter();
    const logoutFn = async () => {
        const token = await getLocalToken();      
            await stravaAPI.post('/oauth/deauthorize', {
                client_id: process.env.EXPO_PUBLIC_STRAVA_CLIENT_ID,
                client_secret: process.env.EXPO_PUBLIC_STRAVA_CLIENT_SECRET,
                access_token: token,
            });    
    }

    const removeLocalData = async () => {
        await removeLocalToken();
        setAtleteLoggedInfo(null);

    }
    const logoutMutation = useMutation({
        mutationFn: logoutFn,
        onSuccess: () => {
            removeLocalData();
            router.push('/');
        },
        onError: (error) => {
            console.error('Logout error:', error);
        }
    });

    return logoutMutation;
};
