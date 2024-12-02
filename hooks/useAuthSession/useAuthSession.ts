
import { useAuthStore } from '@/lib/zustand/useSessionStore';
import { localUserHandler, setLocalToken } from '@/utils/asyncStorage/asyncStorage';
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
        discovery,

    );
    useEffect(() => {
        if (response?.type === "success") {
            SinInWithStrava(response.params.code);
            exchangeCodeForToken(response.params.code);
            setIsLoggedIn(true);
        }
    }, [response]);

    const exchangeCodeForToken = async (code: string) => {
        try {
            const { data } = await stravaAPI.post('/oauth/token', {
                client_id: process.env.EXPO_PUBLIC_STRAVA_CLIENT_ID,
                client_secret: process.env.EXPO_PUBLIC_STRAVA_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
            });
            const accessToken = data.access_token;
            await setLocalToken(accessToken);       
        } catch (error) {
            console.error('Error exchanging code for token:', error);
        }
    };

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
        setIsLoading(true);
        const localAthlete = await getLocalUser();
        try {
            if (!localAthlete) {
                await getAthleteInfo(token);
            } else {
                setAtleteLoggedInfo(localAthlete);
            }
        } catch (error) {
            console.error("Error fetching access token:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { response, promptAsync, athleteLoggedInfo, isLoading, isLoggedIn };
};


