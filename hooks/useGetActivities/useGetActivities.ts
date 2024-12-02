import { getActivities } from "@/utils/fetching/getDataActivities"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useActivities = (token: string) => {

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['activities', token],
        queryFn: ({ pageParam = 1 }) => getActivities(token, pageParam),
        getNextPageParam: (lastPage, allPages) =>
        lastPage.length > 0 ? allPages.length + 1 : undefined,
        initialPageParam: 1,
    });
    return infiniteQuery
};