
import { useAuthStore } from '@/lib/zustand/useSessionStore';
import { Header } from '@/ui/components/Header/Header';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { HapticTab } from '@/ui/components/common/HapticTab';

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
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0, 
            shadowColor: '#000',
            shadowOpacity: 0.1, 
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 4,
            elevation: 8,
          },
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Statistics',
            tabBarIcon: ({ color }) => <Feather size={28} name="list" color={color} />,
          }}
        />
        <Tabs.Screen
          name="activities"
          options={{
            title: 'Activities',
            tabBarIcon: ({ color }) => <Feather size={28} name="activity" color={color} />,
          }}
        />
          <Tabs.Screen
          name="logout"
          options={{
            title: 'Logout',
            tabBarIcon: ({ color }) => <Feather size={28} name="log-out" color={color} />,
          }}
        />
      </Tabs>    
  );
}
