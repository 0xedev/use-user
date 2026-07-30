import { Stack } from 'expo-router';

export default function FeatureLayout() {
  return <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />;
}
