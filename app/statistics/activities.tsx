import { } from 'expo-router';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

import { PageContainer } from '@/ui/components/common/PageContainer/PageContainer';
import { useGetActivities } from '@/hooks/useGetActivities/useGetActivities';

import { IActivity } from '@/types/activities.type';
import { ActivityCard } from '@/ui/components/Activity/ActivityCard';


export default function ActivitiesScreen() {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetActivities()
      const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };
    return (
        <PageContainer>
            <Text className='justify-center w-full font-bold text-2xl text-center'>Activities</Text>
            <FlatList
                data={data?.pages.flat()}
                keyExtractor={(item: IActivity) => item.id.toString()}
                renderItem={({ item }) => <ActivityCard activity={item} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" /> : null}
                className='flex flex-col p-4 w-full'
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />

        </PageContainer>
    );
}
