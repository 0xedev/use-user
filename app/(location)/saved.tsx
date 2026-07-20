import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const addresses = [
  { id: 1, label: 'Home', address: '23 Greenway Street, Lekki Phase 1, Lagos, Nigeria', phone: '0803 123 4567', icon: '🏠', default: true },
  { id: 2, label: 'Work', address: '15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria', phone: '0803 123 4567', icon: '💼', default: false },
  { id: 3, label: 'My Parents', address: '12 Akure Road, Onitsha, Anambra, Nigeria', phone: '0803 123 4567', icon: '⭐', default: false },
  { id: 4, label: "Sister's Place", address: '8 Allen Avenue, Ikeja, Lagos, Nigeria', phone: '0803 123 4567', icon: '🔒', default: false },
  { id: 5, label: 'Gym', address: '54 Raymond Njoku Street, Ikoyi, Lagos, Nigeria', phone: '0803 123 4567', icon: '🏢', default: false },
];

export default function SavedAddressesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between px-4 pt-2`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => router.back()} style={tw`w-10 h-10 justify-center mr-2`}>
              <Text style={tw`text-2xl text-gray-900`}>←</Text>
            </TouchableOpacity>
            <View>
              <Text style={tw`text-2xl font-bold text-gray-900`}>Saved Addresses</Text>
              <Text style={tw`text-sm text-gray-500 mt-0.5`}>Manage your delivery addresses</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Info Banner */}
        <View style={tw`mx-4 mt-4 flex-row items-center bg-market-green-light rounded-xl p-4`}>
          <Text style={tw`text-lg text-market-green mr-3`}>📍</Text>
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-semibold text-market-green`}>Add, edit or remove addresses</Text>
            <Text style={tw`text-xs text-gray-500 mt-0.5`}>Choose from your saved addresses at checkout</Text>
          </View>
          <TouchableOpacity>
            <Text style={tw`text-gray-400 text-lg`}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Address List */}
        <View style={tw`mx-4 mt-4 gap-3`}>
          {addresses.map((addr) => (
            <View key={addr.id} style={tw`border border-gray-200 rounded-xl p-4`}>
              {addr.default && (
                <View style={tw`flex-row items-center mb-2`}>
                  <View style={tw`w-5 h-5 rounded-full bg-market-green items-center justify-center mr-2`}>
                    <Text style={tw`text-white text-xs`}>✓</Text>
                  </View>
                  <Text style={tw`text-xs text-market-green font-semibold uppercase tracking-wider`}>Default</Text>
                </View>
              )}
              <View style={tw`flex-row items-start`}>
                <View style={tw`w-10 h-10 rounded-full bg-market-green-light items-center justify-center mr-3`}>
                  <Text style={tw`text-lg`}>{addr.icon}</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-base font-semibold text-gray-900`}>{addr.label}</Text>
                  <Text style={tw`text-sm text-gray-500 mt-1 leading-5`}>{addr.address}</Text>
                  <Text style={tw`text-sm text-gray-500 mt-1`}>{addr.phone}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={tw`text-gray-400 text-xl`}>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Add New */}
        <TouchableOpacity 
          style={tw`mx-4 mt-4 flex-row items-center bg-yellow-50 rounded-xl p-4`}
          onPress={() => router.push('/(location)/add')}
        >
          <View style={tw`w-10 h-10 rounded-full bg-yellow-400 items-center justify-center mr-3`}>
            <Text style={tw`text-white text-xl font-bold`}>+</Text>
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-semibold text-gray-900`}>Add New Address</Text>
            <Text style={tw`text-sm text-gray-500 mt-0.5`}>Save a new delivery address</Text>
          </View>
          <Text style={tw`text-gray-400 text-lg`}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}