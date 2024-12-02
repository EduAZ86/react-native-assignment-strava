import { useState, useEffect } from "react";
import { getLocalToken } from "@/utils/asyncStorage/asyncStorage";
import { getStatistics } from "@/utils/fetching/getDataActivities";
import { useQuery } from "@tanstack/react-query";

export const useGetStatistics = (id: number) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getLocalToken();
            setToken(storedToken);
        };

        fetchToken();
    }, []);

    const query = useQuery({
        queryKey: ['statistics', id, token],
        queryFn: () => getStatistics(id, token as string),
        enabled: !!token,
    });

    return query;
};
