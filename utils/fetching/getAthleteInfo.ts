
import { IAthlete } from "@/types/athlete.type";
import { stravaAPI } from "./stravaApiAxios";

export const getAthleteInfo = async (accessToken: string) => {
    if (!accessToken) return null;
    try {
        const response = await stravaAPI.get('/oauth/athlete', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data as IAthlete;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}