import { getLocalToken } from "@/utils/asyncStorage/asyncStorage";
import { getActivities } from "@/utils/fetching/getDataActivities"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";

export const useGetActivities = () => {

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getLocalToken();
            setToken(storedToken);
        };

        fetchToken();
    }, []);

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['activities', token],
        queryFn: ({ pageParam = 1 }) => getActivities(token || "", pageParam), 
        //como la consulta solo se ejecuta si hay token debido al enabled no causa problemas el ""
        getNextPageParam: (lastPage, allPages) =>
        lastPage.length > 0 ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token
    });
    return infiniteQuery
};