import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import tw from '@/lib/tw';

export default function MapPickerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 pt-2 pb-3`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`w-10 h-10 justify-center`}>
          <Text style={tw`text-2xl text-gray-900`}>←</Text>
        </TouchableOpacity>
        <View style={tw`flex-1`}>
          <Text style={tw`text-xl font-bold text-gray-900`}>Select on map</Text>
          <Text style={tw`text-sm text-gray-500`}>Move the pin to set your exact location</Text>
        </View>
        <TouchableOpacity style={tw`flex-row items-center border border-gray-200 rounded-full px-3 py-2 gap-1`}>
          <Text style={tw`text-sm text-market-green`}>📍</Text>
          <Text style={tw`text-sm text-gray-900`}>My location</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={tw`mx-4 mb-3 flex-row items-center border border-gray-200 rounded-xl px-4 h-12 bg-white`}>
        <Text style={tw`text-lg text-market-green mr-3`}>🔍</Text>
        <TextInput 
          style={tw`flex-1 text-base text-gray-900`}
          placeholder="Search area, street name or landmark"
          placeholderTextColor="#999"
        />
      </View>

      {/* Map */}
      <View style={tw`flex-1`}>
        <MapView
          style={tw`flex-1`}
          initialRegion={{
            latitude: 6.4541,
            longitude: 3.3947,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: 6.4541, longitude: 3.3947 }}
            pinColor="#0A8A3A"
          />
        </MapView>

        {/* Zoom Controls */}
        <View style={tw`absolute right-4 top-20 bg-white rounded-xl overflow-hidden shadow-sm`}>
          <TouchableOpacity style={tw`w-10 h-10 items-center justify-center border-b border-gray-100`}>
            <Text style={tw`text-xl text-gray-900`}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`w-10 h-10 items-center justify-center`}>
            <Text style={tw`text-xl text-gray-900`}>−</Text>
          </TouchableOpacity>
        </View>

        {/* My Location Button */}
        <TouchableOpacity style={tw`absolute right-4 bottom-40 w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm`}>
          <Text style={tw`text-xl text-market-green`}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View style={tw`bg-white rounded-t-3xl -mt-6 px-4 pt-4 pb-6 shadow-lg`}>
        <View style={tw`w-12 h-1 bg-gray-300 rounded-full self-center mb-4`} />
        
        <View style={tw`flex-row items-center mb-4`}>
          <View style={tw`w-10 h-10 rounded-full bg-market-green-light items-center justify-center mr-3`}>
            <Text style={tw`text-lg text-market-green`}>📍</Text>
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-base font-semibold text-gray-900`}>23 Greenway Street, Lekki Phase 1</Text>
            <Text style={tw`text-sm text-gray-500 mt-0.5`}>Lagos, Nigeria</Text>
          </View>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row items-center bg-market-green-light rounded-xl p-3 mb-4`}>
          <Text style={tw`text-lg text-market-green mr-3`}>📍</Text>
          <View>
            <Text style={tw`text-sm font-semibold text-market-green`}>Pin is set to your location</Text>
            <Text style={tw`text-xs text-gray-500 mt-0.5`}>You can move the pin to adjust the location</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={tw`bg-market-green py-4 rounded-xl items-center`}
          onPress={() => router.back()}
        >
          <Text style={tw`text-white text-base font-semibold`}>Confirm this location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}