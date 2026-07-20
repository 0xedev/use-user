import { Stack } from 'expo-router';

export default function CheckoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="delivery" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="review" />
      <Stack.Screen name="confirm" />
    </Stack>
  );
}