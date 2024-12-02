import { ITokenResponse } from "@/types/tokenResponse.type";
import { stravaAPI } from "./stravaApiAxios"

export const getAccessToken = async () => {
    try {
        const response = await stravaAPI.post('/oauth/token', {
            client_id: process.env.EXPO_PUBLIC_STRAVA_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_STRAVA_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: process.env.EXPO_PUBLIC_STRAVA_CODE,
            redirect_uri: 'https://www.strava.com/api/v3/oauth/authorize'
        })
        return response.data as ITokenResponse
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null
    }
}