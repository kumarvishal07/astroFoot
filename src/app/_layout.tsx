import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1C0B2B', // Deep mystical background
          },
          headerTintColor: '#E0C097', // Gold text
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'serif',
          },
          contentStyle: {
            backgroundColor: '#1C0B2B',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'AstroSole' }} />
        <Stack.Screen name="scan" options={{ title: 'Scan Foot', presentation: 'modal' }} />
        <Stack.Screen name="result" options={{ title: 'Your Reading', presentation: 'modal' }} />
      </Stack>
    </>
  );
}
