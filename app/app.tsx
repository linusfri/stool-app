import useAuth from 'lib/hooks/auth/use-auth';
import { Stack } from 'expo-router';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { user } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  );
}
