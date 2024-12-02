import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuthStore } from '@/lib/zustand/useSessionStore';
import { Header } from '@/ui/components/Header/Header';
import { Tabs } from 'expo-router';
import { View } from 'react-native';


export default function ActivitiesLayout() {
  const { athleteLoggedInfo } = useAuthStore()
  return (
     
      <Tabs
        screenOptions={{
          header: ({ navigation, route }) => (
            <Header
              image={athleteLoggedInfo?.profile || ""}
              userName={athleteLoggedInfo?.firstname + ' ' + athleteLoggedInfo?.lastname}
            />
          ),
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Statistics',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="activities"
          options={{
            title: 'Activities',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>    
  );
}
