
import { useAuthStore } from '@/lib/zustand/useSessionStore';
import { localUserHandler } from '@/utils/asyncStorage/asyncStorage';
import { stravaAPI } from '@/utils/fetching/stravaApiAxios';
import { useAuthRequest, makeRedirectUri, } from 'expo-auth-session';
import { useEffect, useState } from 'react';

const discovery = {
    authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
};

const redirectUri = makeRedirectUri({
    scheme: 'react-native-assignment-strava',
    path: 'statistics',
    preferLocalhost: true,
    isTripleSlashed: true,

});

export const useAuthSession = () => {

    const { athleteLoggedInfo, setAtleteLoggedInfo } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { getLocalUser, setLocalUser, removeLocalUser } = localUserHandler()

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_STRAVA_CLIENT_ID as string,
            scopes: ['activity:read_all'],
            clientSecret: process.env.EXPO_PUBLIC_STRAVA_CLIENT_SECRET as string,
            redirectUri: redirectUri,
            responseType: "code",
        },
        discovery
    );
    useEffect(() => {
        if (response?.type === "success") {
            SinInWithStrava(response.params.code);
            setIsLoggedIn(true);
        }

    }, [response]);

    const getAthleteInfo = async (accessToken: string) => {
        if (!accessToken) return null;
        try {
            const { data } = await stravaAPI.get('/athlete', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setAtleteLoggedInfo(data);
            setLocalUser(data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }
    const SinInWithStrava = async (token: string) => {
        setIsLoading(true); // Comienza la carga
        try {
            const localAthlete = await getLocalUser();
            if (!localAthlete) {
                const { data } = await stravaAPI.post('/oauth/token', {
                    client_id: process.env.EXPO_PUBLIC_STRAVA_CLIENT_ID as string,
                    client_secret: process.env.EXPO_PUBLIC_STRAVA_CLIENT_SECRET as string,
                    code: token,
                    grant_type: "authorization_code",
                });
                const { access_token } = data;
                await getAthleteInfo(access_token);
            } else {
                setAtleteLoggedInfo(localAthlete); // Actualiza directamente si ya existe
            }
        } catch (error) {
            console.error("Error fetching access token:", error);
        } finally {
            setIsLoading(false); // Finaliza la carga
        }
    };

    return { response, promptAsync, athleteLoggedInfo, isLoading, isLoggedIn };
};


