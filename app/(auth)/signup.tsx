import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  Check 
} from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from '@/lib/tw';

export default function SignupScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView 
        contentContainerStyle={tw`px-6 pb-8`} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={tw`mt-2 mb-4 w-10 h-10 justify-center`}
        >
          <ArrowLeft size={24} color="#171717" />
        </TouchableOpacity>

        {/* Header Section */}
        <View style={tw`flex-row justify-between items-start mb-6`}>
          <View style={tw`flex-1 pr-4`}>
            <Text style={tw`text-2xl font-bold text-gray-900 leading-9`}>
              Create your{'\n'}account
            </Text>
            <Text style={tw`text-sm text-gray-400 mt-1`}>Let's get you started</Text>
          </View>
          <Image 
            source={require('@/assets/images/bag-splash.png')} 
            style={tw`w-36 h-28 -mt-2`} 
            resizeMode="contain"
          />
        </View>

        {/* Input Form */}
        <View style={tw`gap-4`}>
          {/* First Name & Last Name */}
          <View style={tw`flex-row gap-3`}>
            <View style={tw`flex-1 gap-2`}>
              <Text style={tw`text-sm font-semibold text-gray-900`}>First Name</Text>
              <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-14 bg-white`}>
                <User size={20} color="#0A8A3A" style={tw`mr-3`} />
                <TextInput 
                  style={tw`flex-1 text-base text-gray-900 h-full`}
                  placeholder="First name"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>
            <View style={tw`flex-1 gap-2`}>
              <Text style={tw`text-sm font-semibold text-gray-900`}>Last Name</Text>
              <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-14 bg-white`}>
                <User size={20} color="#0A8A3A" style={tw`mr-3`} />
                <TextInput 
                  style={tw`flex-1 text-base text-gray-900 h-full`}
                  placeholder="Last name"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>
          </View>

          {/* Phone Number */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Phone Number</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-14 bg-white`}>
              <Phone size={20} color="#0A8A3A" style={tw`mr-2.5`} />
              
              {/* Flag & Country Selection */}
              <TouchableOpacity style={tw`flex-row items-center gap-1 mr-2`}>
                <Text style={tw`text-base`}>🇳🇬</Text>
                <Text style={tw`text-sm font-semibold text-gray-900 ml-1`}>+234</Text>
                <ChevronDown size={14} color="#737373" style={tw`ml-0.5`} />
              </TouchableOpacity>
              
              <View style={tw`w-px h-6 bg-gray-200 mr-3`} />
              
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter your phone number"
                placeholderTextColor="#A3A3A3"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Email */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Email (optional)</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-14 bg-white`}>
              <Mail size={20} color="#0A8A3A" style={tw`mr-3`} />
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Enter your email address"
                placeholderTextColor="#A3A3A3"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Password</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-14 bg-white`}>
              <Lock size={20} color="#0A8A3A" style={tw`mr-3`} />
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Create a password"
                placeholderTextColor="#A3A3A3"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#A3A3A3" />
                ) : (
                  <Eye size={20} color="#A3A3A3" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={tw`gap-2`}>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Confirm Password</Text>
            <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-14 bg-white`}>
              <Lock size={20} color="#0A8A3A" style={tw`mr-3`} />
              <TextInput 
                style={tw`flex-1 text-base text-gray-900 h-full`}
                placeholder="Re-enter your password"
                placeholderTextColor="#A3A3A3"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#A3A3A3" />
                ) : (
                  <Eye size={20} color="#A3A3A3" />
                )}
              </TouchableOpacity>
            </View>
          </View>

        
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={tw`bg-market-green py-4 rounded-xl items-center mt-6 shadow-sm`}
          onPress={() => router.push('/(auth)/otp')}
        >
          <Text style={tw`text-white text-base font-semibold`}>Create Account</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={tw`flex-row items-center my-5 gap-3`}>
          <View style={tw`flex-1 h-px bg-gray-200`} />
          <Text style={tw`text-gray-400 text-sm`}>or</Text>
          <View style={tw`flex-1 h-px bg-gray-200`} />
        </View>

        {/* Social Auth */}
        <View style={tw`flex-row justify-center gap-4 mb-4`}>
          <TouchableOpacity style={tw`w-12 h-12 items-center justify-center border border-gray-200 rounded-xl bg-white`}>
            <FontAwesome name="google" size={20} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={tw`w-12 h-12 items-center justify-center border border-gray-200 rounded-xl bg-white`}>
            <FontAwesome name="apple" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Login Footer */}
        <Text style={tw`text-sm text-gray-400 text-center mt-2`}>
          Already have an account? <Text 
            style={tw`text-market-green font-semibold`} 
            onPress={() => router.push('/(auth)/login')}
          >Login</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}