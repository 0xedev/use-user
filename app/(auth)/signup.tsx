import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

export default function SignupScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView 
        contentContainerStyle={tw`px-6 pb-6`} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back + Header */}
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={tw`mt-2 mb-1 w-10 h-10 justify-center`}
        >
          <Text style={tw`text-2xl text-gray-900`}>←</Text>
        </TouchableOpacity>

        <View style={tw`flex-row justify-between items-start mb-6`}>
          <View>
            <Text style={tw`text-3xl font-bold text-gray-900 leading-9`}>
              Create your{'\n'}account
            </Text>
            <Text style={tw`text-sm text-gray-400 mt-1`}>Let's get you started</Text>
          </View>
          <Image 
            source={require('@/assets/images/grocery-bag-small.png')} 
            style={tw`w-24 h-20`} 
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <View style={tw`gap-4`}>
          {/* Full Name */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Full Name</Text>
            <View style={tw`flex-row items-center border-[1.5px] border-gray-200 rounded-xl px-3.5 h-13`}>
              <Text style={tw`text-lg text-market-green mr-2.5`}>👤</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Phone Number</Text>
            <View style={tw`flex-row items-center border-[1.5px] border-gray-200 rounded-xl px-3.5 h-13`}>
              <Text style={tw`text-lg text-market-green mr-2.5`}>📞</Text>
              <View style={tw`flex-row items-center gap-1.5 mr-2`}>
                <Text style={tw`text-base`}>🇳🇬</Text>
                <Text style={tw`text-sm font-semibold text-gray-900`}>+234</Text>
                <Text style={tw`text-xs text-gray-400 ml-0.5`}>▼</Text>
              </View>
              <View style={tw`w-px h-6 bg-gray-200 mr-3`} />
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Email */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Email (optional)</Text>
            <View style={tw`flex-row items-center border-[1.5px] border-gray-200 rounded-xl px-3.5 h-13`}>
              <Text style={tw`text-lg text-market-green mr-2.5`}>✉️</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Password</Text>
            <View style={tw`flex-row items-center border-[1.5px] border-gray-200 rounded-xl px-3.5 h-13`}>
              <Text style={tw`text-lg text-market-green mr-2.5`}>🔒</Text>
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Create a password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={tw`text-lg text-gray-400`}>👁️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Requirements */}
          <View style={tw`flex-row gap-4 mt-1`}>
            <View style={tw`flex-row items-center gap-1.5`}>
              <View style={tw`w-3.5 h-3.5 rounded-full border-[1.5px] ${hasMinLength ? 'bg-market-green border-market-green' : 'border-gray-300'}`} />
              <Text style={tw`text-xs ${hasMinLength ? 'text-market-green font-medium' : 'text-gray-400'}`}>
                At least 8 characters
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-1.5`}>
              <View style={tw`w-3.5 h-3.5 rounded-full border-[1.5px] ${hasNumber ? 'bg-market-green border-market-green' : 'border-gray-300'}`} />
              <Text style={tw`text-xs ${hasNumber ? 'text-market-green font-medium' : 'text-gray-400'}`}>
                One number
              </Text>
            </View>
            <View style={tw`flex-row items-center gap-1.5`}>
              <View style={tw`w-3.5 h-3.5 rounded-full border-[1.5px] ${hasUppercase ? 'bg-market-green border-market-green' : 'border-gray-300'}`} />
              <Text style={tw`text-xs ${hasUppercase ? 'text-market-green font-medium' : 'text-gray-400'}`}>
                One uppercase
              </Text>
            </View>
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity 
          style={tw`bg-market-green py-4 rounded-xl items-center mt-5`}
          onPress={() => router.push('/(auth)/otp')}
        >
          <Text style={tw`text-white text-base font-semibold`}>Create Account</Text>
        </TouchableOpacity>

        <View style={tw`flex-row items-center my-4 gap-3`}>
          <View style={tw`flex-1 h-px bg-gray-200`} />
          <Text style={tw`text-gray-400 text-sm`}>or</Text>
          <View style={tw`flex-1 h-px bg-gray-200`} />
        </View>

        {/* Social */}
        <TouchableOpacity style={tw`flex-row items-center justify-center border-[1.5px] border-gray-200 py-3.5 rounded-xl mb-2.5 gap-2.5`}>
          <Text style={tw`text-lg font-bold text-blue-500`}>G</Text>
          <Text style={tw`text-sm font-medium text-gray-900`}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex-row items-center justify-center border-[1.5px] border-gray-200 py-3.5 rounded-xl mb-2.5 gap-2.5`}>
          <Text style={tw`text-lg`}>🍎</Text>
          <Text style={tw`text-sm font-medium text-gray-900`}>Continue with Apple</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={tw`text-sm text-gray-400 text-center mt-3 mb-2`}>
          Already have an account? <Text 
            style={tw`text-market-green font-semibold`} 
            onPress={() => router.push('/(auth)/login')}
          >Login</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}