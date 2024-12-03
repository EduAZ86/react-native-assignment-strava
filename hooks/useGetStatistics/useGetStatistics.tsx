import { useState, useEffect } from "react";
import { getLocalToken, localUserHandler } from "@/utils/asyncStorage/asyncStorage";
import { getStatistics } from "@/utils/fetching/getDataActivities";
import { useQuery } from "@tanstack/react-query";
import { IAthlete } from "@/types/athlete.type";

export const useGetStatistics = () => {
    const [token, setToken] = useState<string | null>(null);
    const [localUser, setLocalUser] = useState<IAthlete | null>(null);
    const { getLocalUser } = localUserHandler();
    useEffect(() => {
        const fetchLocalData = async () => {
            const storedToken = await getLocalToken();
            const storedUser = await getLocalUser();
            console.log("storedUser", storedUser);
            
            setToken(storedToken);
            setLocalUser(storedUser);
        };

        fetchLocalData();
    }, []);

    const query = useQuery({
        queryKey: ['statistics', localUser?.id , token as string],
        queryFn: () => getStatistics(localUser?.id as number, token as string),
        enabled: !!token,
    });

    return query;
};
