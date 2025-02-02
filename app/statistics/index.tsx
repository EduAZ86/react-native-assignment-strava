import React, { useEffect, useState } from 'react';
import { useGetStatistics } from '@/hooks/useGetStatistics/useGetStatistics';
import { useAuthStore } from '@/lib/zustand/useSessionStore';
import { PageContainer } from '@/ui/components/common/PageContainer/PageContainer';
import { ActivityIndicator, Text, View } from 'react-native';
import { StatisticsData } from '@/ui/components/StatisticData/StatisticsData';

export default function StatisticsScreen() {
  const { athleteLoggedInfo } = useAuthStore();

  const { data } = useGetStatistics();
  return (
    <PageContainer>
      {data ?
        <View className='flex flex-col gap-2 p-4 w-full'>
          <Text className='justify-center w-full font-bold text-2xl text-center'>Statistics</Text>
          <StatisticsData key={"distance"} label="Distance" value={`${data.recent_ride_totals.distance} km`} />
          <StatisticsData key={"time"} label="Elapsed_time" value={`${data.recent_ride_totals.elapsed_time} `} />
          <StatisticsData key={"elevation"} label="Elevation gain" value={`${data.recent_ride_totals.elevation_gain} m`} />
          <StatisticsData key={"rides"} label="Rides" value={`${data.recent_ride_totals.count} `} />
          <StatisticsData key={"achievements"} label="Achievements" value={`${data.recent_ride_totals.achievement_count} `} />
        </View>
        :
        <View className="flex flex-row justify-center items-center w-full h-screen">
          <ActivityIndicator size="large" />
        </View>
      }
    </PageContainer>
  );
}
