import { Stack } from 'expo-router';

export default function LocationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="map" />
      <Stack.Screen name="saved" />
      <Stack.Screen name="add" />
    </Stack>
  );
}