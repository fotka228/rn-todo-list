import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ConvexProvider client={convex}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
      </ConvexProvider>
    </SafeAreaProvider>
  );
}