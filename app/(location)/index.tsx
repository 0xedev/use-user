import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const savedLocations = [
  { id: 1, label: 'Home', address: '23 Greenway Street, Lekki Phase 1, Lagos, Nigeria', icon: '🏠' },
  { id: 2, label: 'Work', address: '15 Adeola Odeku Street, Victoria Island, Lagos, Nigeria', icon: '💼' },
  { id: 3, label: 'My Parents', address: '12 Akure Road, Onitsha, Anambra, Nigeria', icon: '⭐' },
];

const popularAreas = [
  { name: 'Lekki', icon: '🏢' },
  { name: 'Victoria Island', icon: '🌳' },
  { name: 'Ikeja', icon: '🏢' },
  { name: 'Yaba', icon: '🌳' },
  { name: 'Surulere', icon: '🏢' },
  { name: 'Ajah', icon: '🌳' },
];

export default function ChooseLocationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
        {/* Header */}
        <View style={tw`flex-row items-center px-4 pt-2`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`w-10 h-10 justify-center`}>
            <Text style={tw`text-2xl text-gray-900`}>←</Text>
          </TouchableOpacity>
          <View style={tw`flex-1`}>
            <Text style={tw`text-2xl font-bold text-gray-900`}>Choose your location</Text>
            <Text style={tw`text-sm text-gray-500 mt-1`}>
              Select your delivery location to see{'\n'}stores and products near you.
            </Text>
          </View>
          <Image 
            source={require('@/assets/images/location-store.png')} 
            style={tw`w-20 h-20`} 
            resizeMode="contain"
          />
        </View>

        {/* Search */}
        <View style={tw`mx-4 mt-4 flex-row items-center border border-gray-200 rounded-xl px-4 h-12 bg-white`}>
          <Text style={tw`text-lg text-market-green mr-3`}>🔍</Text>
          <TextInput 
            style={tw`flex-1 text-base text-gray-900`}
            placeholder="Search area, street name or landmark"
            placeholderTextColor="#999"
          />
          <Text style={tw`text-lg text-market-green`}>📍</Text>
        </View>

        {/* Current Location */}
        <View style={tw`mx-4 mt-4 flex-row items-center bg-market-green-light rounded-xl p-4`}>
          <View style={tw`w-10 h-10 rounded-full bg-market-green items-center justify-center mr-3`}>
            <Text style={tw`text-white text-lg`}>📍</Text>
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-semibold text-gray-900`}>Use my current location</Text>
            <Text style={tw`text-sm text-gray-500 mt-0.5`}>Detecting your location...</Text>
          </View>
          <TouchableOpacity style={tw`bg-market-green px-5 py-2 rounded-full`}>
            <Text style={tw`text-white font-semibold text-sm`}>USE</Text>
          </TouchableOpacity>
        </View>

        {/* Saved Locations */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Saved locations</Text>
          <TouchableOpacity onPress={() => router.push('/(location)/saved')}>
            <Text style={tw`text-sm text-market-green font-semibold`}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mx-4 border border-gray-200 rounded-xl overflow-hidden`}>
          {savedLocations.map((loc, i) => (
            <TouchableOpacity 
              key={loc.id} 
              style={tw`flex-row items-center p-4 ${i !== savedLocations.length - 1 ? 'border-b border-gray-100' : ''}`}
              onPress={() => router.replace('/(tabs)')}
            >
              <View style={tw`w-10 h-10 rounded-full bg-market-green-light items-center justify-center mr-3`}>
                <Text style={tw`text-lg`}>{loc.icon}</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-base font-semibold text-gray-900`}>{loc.label}</Text>
                <Text style={tw`text-sm text-gray-500 mt-0.5 leading-5`}>{loc.address}</Text>
              </View>
              <Text style={tw`text-gray-400 text-xl mr-2`}>⋮</Text>
              <View style={tw`w-5 h-5 rounded-full border-2 border-market-green`} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Address */}
        <TouchableOpacity 
          style={tw`mx-4 mt-4 flex-row items-center bg-yellow-50 rounded-xl p-4`}
          onPress={() => router.push('/(location)/add')}
        >
          <View style={tw`w-10 h-10 rounded-full bg-yellow-400 items-center justify-center mr-3`}>
            <Text style={tw`text-white text-xl font-bold`}>+</Text>
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-semibold text-gray-900`}>Add new address</Text>
            <Text style={tw`text-sm text-gray-500 mt-0.5`}>Add a new delivery address</Text>
          </View>
          <Text style={tw`text-gray-400 text-lg`}>›</Text>
        </TouchableOpacity>

        {/* Popular Areas */}
        <Text style={tw`text-lg font-bold text-gray-900 px-4 mt-6 mb-3`}>Popular areas</Text>
        <View style={tw`flex-row flex-wrap px-4 gap-3`}>
          {popularAreas.map((area) => (
            <TouchableOpacity key={area.name} style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 py-3 gap-2 bg-white`}>
              <Text style={tw`text-lg`}>{area.icon}</Text>
              <Text style={tw`text-sm font-medium text-gray-900`}>{area.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Confirm Button */}
        <TouchableOpacity 
          style={tw`mx-4 mt-6 bg-market-green py-4 rounded-xl items-center flex-row justify-center gap-2`}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={tw`text-white text-lg`}>📍</Text>
          <Text style={tw`text-white text-base font-semibold`}>Confirm Location</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}