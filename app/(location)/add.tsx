import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

export default function AddAddressScreen() {
  const router = useRouter();
  const [isDefault, setIsDefault] = useState(true);
  const [address, setAddress] = useState('');
  const maxChars = 120;

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
              <Text style={tw`text-2xl font-bold text-gray-900`}>Add New Address</Text>
              <Text style={tw`text-sm text-gray-500 mt-0.5`}>Add a new delivery address</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/(location)/map')}>
            <Text style={tw`text-sm text-market-green font-semibold`}>📍 Pick on map</Text>
          </TouchableOpacity>
        </View>

        {/* Info Banner */}
        <View style={tw`mx-4 mt-4 flex-row items-center bg-market-green-light rounded-xl p-4`}>
          <Text style={tw`text-lg text-market-green mr-3`}>📍</Text>
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-semibold text-market-green`}>Accurate address helps us deliver faster</Text>
            <Text style={tw`text-xs text-gray-500 mt-0.5`}>Please provide detailed address for smooth delivery.</Text>
          </View>
          <TouchableOpacity>
            <Text style={tw`text-gray-400 text-lg`}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={tw`mx-4 mt-4 gap-4`}>
          {/* Label */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Address Label (Optional)</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13`}>
              <Text style={tw`text-lg text-market-green mr-3`}>🏷️</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="e.g. Home, Work, Parents"
                placeholderTextColor="#999"
              />
              <Text style={tw`text-gray-400`}>▼</Text>
            </View>
          </View>

          {/* Full Name */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Full Name</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13`}>
              <Text style={tw`text-lg text-market-green mr-3`}>👤</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter full name"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Phone Number</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13`}>
              <Text style={tw`text-lg text-market-green mr-3`}>📞</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Address */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Address</Text>
            <View style={tw`border border-gray-200 rounded-xl px-4 pt-3 pb-2`}>
              <View style={tw`flex-row`}>
                <Text style={tw`text-lg text-market-green mr-3 mt-1`}>📍</Text>
                <TextInput 
                  style={tw`flex-1 text-base text-gray-900 h-20`}
                  placeholder="House number, street name, apartment, landmark"
                  placeholderTextColor="#999"
                  multiline
                  textAlignVertical="top"
                  value={address}
                  onChangeText={setAddress}
                  maxLength={maxChars}
                />
              </View>
              <Text style={tw`text-xs text-gray-400 text-right mt-1`}>{address.length}/{maxChars}</Text>
            </View>
          </View>

          {/* State & City */}
          <View style={tw`flex-row gap-3`}>
            <View style={tw`flex-1 gap-2`}>
              <Text style={tw`text-sm font-semibold text-gray-900`}>State</Text>
              <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13`}>
                <Text style={tw`text-lg text-market-green mr-3`}>🏢</Text>
                <Text style={tw`flex-1 text-base text-gray-500`}>Select state</Text>
                <Text style={tw`text-gray-400`}>▼</Text>
              </View>
            </View>
            <View style={tw`flex-1 gap-2`}>
              <Text style={tw`text-sm font-semibold text-gray-900`}>City / Local Government</Text>
              <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13`}>
                <Text style={tw`text-lg text-market-green mr-3`}>🏢</Text>
                <Text style={tw`flex-1 text-base text-gray-500`}>Select city</Text>
                <Text style={tw`text-gray-400`}>▼</Text>
              </View>
            </View>
          </View>

          {/* Area */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Area / Neighborhood</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13`}>
              <Text style={tw`text-lg text-market-green mr-3`}>📍</Text>
              <Text style={tw`flex-1 text-base text-gray-500`}>Select area</Text>
              <Text style={tw`text-gray-400`}>▼</Text>
            </View>
          </View>

          {/* Postal Code */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Postal Code (Optional)</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13`}>
              <Text style={tw`text-lg text-market-green mr-3`}>📮</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter postal code"
                placeholderTextColor="#999"
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Default Toggle */}
          <View style={tw`flex-row items-center justify-between mt-2`}>
            <View>
              <Text style={tw`text-base font-semibold text-gray-900`}>Set as default address</Text>
              <Text style={tw`text-sm text-gray-500 mt-0.5`}>This will be used as your default delivery address</Text>
            </View>
            <Switch
              value={isDefault}
              onValueChange={setIsDefault}
              trackColor={{ false: '#E5E5E5', true: '#0A8A3A' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={tw`mx-4 mt-6 bg-market-green py-4 rounded-xl items-center flex-row justify-center gap-2`}
          onPress={() => router.back()}
        >
          <Text style={tw`text-white text-lg`}>💾</Text>
          <Text style={tw`text-white text-base font-semibold`}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}