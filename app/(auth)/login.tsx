import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView 
        contentContainerStyle={tw`px-6 pb-6 flex-1`} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={tw`mt-2 mb-1 w-10 h-10 justify-center`}
        >
          <Text style={tw`text-2xl text-gray-900`}>←</Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-between items-start mb-8`}>
          <View>
            <Text style={tw`text-3xl font-bold text-gray-900 leading-9`}>Welcome back!</Text>
            <Text style={tw`text-sm text-gray-400 mt-1`}>Login to your account</Text>
          </View>
          <Image 
            source={require('@/assets/images/grocery-bag-small.png')} 
            style={tw`w-24 h-20`} 
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <View style={tw`gap-4`}>
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Phone Number or Email</Text>
            <View style={tw`flex-row items-center border-[1.5px] border-gray-200 rounded-xl px-3.5 h-13`}>
              <Text style={tw`text-lg text-market-green mr-2.5`}>👤</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter your phone number or email"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Password</Text>
            <View style={tw`flex-row items-center border-[1.5px] border-gray-200 rounded-xl px-3.5 h-13`}>
              <Text style={tw`text-lg text-market-green mr-2.5`}>🔒</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={tw`text-lg text-gray-400`}>👁️</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={tw`self-end`}>
            <Text style={tw`text-sm text-market-green font-semibold`}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={tw`bg-market-green py-4 rounded-xl items-center mt-5`}>
          <Text style={tw`text-white text-base font-semibold`}>Login</Text>
        </TouchableOpacity>

        <View style={tw`flex-row items-center my-5 gap-3`}>
          <View style={tw`flex-1 h-px bg-gray-200`} />
          <Text style={tw`text-gray-400 text-sm`}>or continue with</Text>
          <View style={tw`flex-1 h-px bg-gray-200`} />
        </View>

        {/* Social */}
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center border-[1.5px] border-gray-200 py-3.5 rounded-xl gap-2`}>
            <Text style={tw`text-lg font-bold text-blue-500`}>G</Text>
            <Text style={tw`text-sm font-medium text-gray-900`}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center border-[1.5px] border-gray-200 py-3.5 rounded-xl gap-2`}>
            <Text style={tw`text-lg`}>🍎</Text>
            <Text style={tw`text-sm font-medium text-gray-900`}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={tw`text-sm text-gray-400 text-center mt-auto pt-4 mb-2`}>
          Don't have an account? <Text 
            style={tw`text-market-green font-semibold`} 
            onPress={() => router.push('/(auth)/signup')}
          >Sign up</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}