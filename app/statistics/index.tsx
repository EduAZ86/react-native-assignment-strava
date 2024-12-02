import React, { useEffect, useState } from 'react';
import { useGetStatistics } from '@/hooks/useGetStatistics/useGetStatistics';
import { useAuthStore } from '@/lib/zustand/useSessionStore';
import { PageContainer } from '@/ui/components/common/PageContainer/PageContainer';
import { Text } from 'react-native';

export default function StatisticsScreen() {
  const { athleteLoggedInfo } = useAuthStore();

  const { data } = useGetStatistics(athleteLoggedInfo?.id as number);
  console.log("data", data)
  return (
    <PageContainer>
      <Text>Statistics</Text>
      {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading data...</Text>}
    </PageContainer>
  );
}
