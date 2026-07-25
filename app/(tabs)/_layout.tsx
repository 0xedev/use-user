import { useColorScheme } from '@/components/useColorScheme';
import tw from '@/lib/tw';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0A8A3A',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: tw`bg-white border-t border-gray-200 h-16 pb-2`,
        tabBarLabelStyle: tw`text-xs font-medium mt-1`,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="home-alt" options={{ href: null }} />
      <Tabs.Screen name="category-detail" options={{ href: null }} />
      <Tabs.Screen name="two" options={{ href: null }} />
      <Tabs.Screen name="category/[id]" options={{ href: null }} />
      <Tabs.Screen name="food-home" options={{ href: null }} />
      <Tabs.Screen name="gadgets-home" options={{ href: null }} />
      <Tabs.Screen name="marketplace-home" options={{ href: null }} />
      <Tabs.Screen name="logistics-home" options={{ href: null }} />
      <Tabs.Screen name="bills-home" options={{ href: null }} />
    </Tabs>
  );
}