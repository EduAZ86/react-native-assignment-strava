import { stravaAPI } from "@/utils/fetching/stravaApiAxios";
import { useQuery } from "@tanstack/react-query"

const getAthlete = async (accessToken: string) => {
    const { data } = await stravaAPI.get('/athlete', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data
}
export const useGetAthlete = (accessToken: string) => {
    const query = useQuery({
        queryKey: ['athlete'],
        queryFn: () => getAthlete(accessToken),
        enabled: !!accessToken
    })
    return query
}