import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import tw from '@/lib/tw';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0A8A3A',
        tabBarInactiveTintColor: '#999',
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: tw`bg-white border-t border-gray-200 h-16 pb-2`,
        tabBarLabelStyle: tw`text-xs font-medium mt-1`,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={[tw`text-2xl`, { color }]}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <Text style={[tw`text-2xl`, { color }]}>⊞</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <Text style={[tw`text-2xl`, { color }]}>🛍️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <Text style={[tw`text-2xl`, { color }]}>💳</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <Text style={[tw`text-2xl`, { color }]}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}