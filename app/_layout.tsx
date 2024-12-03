import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "./global.css";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from '@/providers/Provider';
import { useAuthSession } from '@/hooks/useAuthSession/useAuthSession';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { isLoggedIn, athleteLoggedInfo, } = useAuthSession();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (isLoggedIn && loaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoggedIn, loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {athleteLoggedInfo ? (
            <Stack.Screen
              key={"statistics"}
              name="statistics"
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              key={"login"}
              name="login"
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
