import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView 
        contentContainerStyle={tw`px-6 pb-6`} 
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={tw`items-center mt-4`}>
          <Image 
            source={require('@/assets/images/usemarket-logo-header.png')} 
            style={tw`w-40 h-12`} 
            resizeMode="contain"
          />
          <Text style={tw`text-sm text-gray-500 mt-1`}>
            Your market, <Text style={tw`text-market-green font-semibold`}>delivered.</Text>
          </Text>
        </View>

        {/* Hero Text */}
        <Text style={tw`text-2xl font-bold text-gray-900 text-center mt-6 leading-8`}>
          Groceries, food, pharmacy{'\n'}and more. Delivered fast.
        </Text>
        <Text style={tw`text-base text-gray-500 text-center mt-2 leading-6`}>
          Order from local stores and get{'\n'}it delivered to your door.
        </Text>

        {/* Illustration */}
        <Image 
          source={require('@/assets/images/delivery-illustration.png')} 
          style={tw`w-full h-56 my-4`} 
          resizeMode="contain"
        />

        {/* Buttons */}
        <TouchableOpacity 
          style={tw`flex-row items-center justify-center bg-market-green py-4 rounded-xl gap-2.5`}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={tw`text-lg`}>📞</Text>
          <Text style={tw`text-white text-base font-semibold`}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex-row items-center justify-center bg-white py-4 rounded-xl border-[1.5px] border-market-green mt-3 gap-2.5`}>
          <Text style={tw`text-lg text-market-green`}>✉️</Text>
          <Text style={tw`text-market-green text-base font-semibold`}>Continue with Email</Text>
        </TouchableOpacity>

        <View style={tw`flex-row items-center my-4 gap-3`}>
          <View style={tw`flex-1 h-px bg-gray-200`} />
          <Text style={tw`text-gray-400 text-sm`}>or</Text>
          <View style={tw`flex-1 h-px bg-gray-200`} />
        </View>

        <TouchableOpacity 
          style={tw`items-center justify-center py-4 rounded-xl border-[1.5px] border-market-green`}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={tw`text-market-green text-base font-semibold`}>Login to your account</Text>
        </TouchableOpacity>

        {/* Trust Badges */}
        <View style={tw`flex-row justify-around mt-4 px-2`}>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-lg`}>🛡️</Text>
            <Text style={tw`text-xs text-gray-600 font-medium`}>Safe & Secure</Text>
          </View>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-lg`}>✅</Text>
            <Text style={tw`text-xs text-gray-600 font-medium`}>Verified Stores</Text>
          </View>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-lg`}>🎧</Text>
            <Text style={tw`text-xs text-gray-600 font-medium`}>24/7 Support</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={tw`text-xs text-gray-400 text-center mt-4 leading-5 mb-2`}>
          By continuing, you agree to our{'\n'}
          <Text style={tw`text-market-green font-semibold`}>Terms & Conditions</Text> and <Text style={tw`text-market-green font-semibold`}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}