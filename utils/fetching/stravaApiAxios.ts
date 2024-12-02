import axios from "axios";

export const stravaAPI = axios.create({
    baseURL: 'https://www.strava.com/api/v3',
    headers: {
        "Content-Type": "application/json",
    }
})

