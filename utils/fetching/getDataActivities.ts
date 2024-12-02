
import { IActivity } from "@/types/activities.type";
import { IStatistics } from "@/types/statistics.type";
import { stravaAPI } from "@/utils/fetching/stravaApiAxios";

export const getActivities = async (token: string, page: number) => {
    const { data } = await stravaAPI.get(`/athlete/activities`, {
        params: { page, per_page: 10 },
        headers: { Authorization: `Bearer ${token}` }
    }
    );
    return data as IActivity[]
}

export interface statisticsParams {
    id: number
    token: string
}

export const getStatistics = async (id: number, token: string) => {
    const { data } = await stravaAPI.get(`/athletes/${id}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
    }
    );
    return data as IStatistics
}