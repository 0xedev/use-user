import tw from '@/lib/tw';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Lock, User } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView
                contentContainerStyle={tw`px-6 pb-8 flex-grow`}
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
                <View style={tw`flex-row justify-between items-start mb-8`}>
                    <View style={tw`flex-1 pr-4`}>
                        <Text style={tw`text-3xl font-bold text-gray-900 leading-9`}>Welcome back!</Text>
                        <Text style={tw`text-sm text-gray-400 mt-1`}>Login to your account</Text>
                    </View>
                    <Image
                        source={require('@/assets/images/grocery-bag-small.png')}
                        style={tw`w-36 h-28 -mt-2`}
                        resizeMode="contain"
                    />
                </View>

                {/* Form Inputs */}
                <View style={tw`gap-4`}>
                    {/* Phone Number or Email */}
                    <View style={tw`gap-2`}>
                        <Text style={tw`text-sm font-semibold text-gray-900`}>Phone Number or Email</Text>
                        <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-14 bg-white`}>
                            <User size={20} color="#0A8A3A" style={tw`mr-3`} />
                            <TextInput
                                style={tw`flex-1 text-base text-gray-900 h-full`}
                                placeholder="Enter your phone number or email"
                                placeholderTextColor="#A3A3A3"
                                autoCapitalize="none"
                                value={identifier}
                                onChangeText={setIdentifier}
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
                                placeholder="Enter your password"
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

                    {/* Forgot Password */}
                    <TouchableOpacity style={tw`self-end`}>
                        <Text style={tw`text-sm text-market-green font-semibold`}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    style={tw`bg-market-green py-4 rounded-xl items-center mt-6 shadow-sm`}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={tw`text-white text-base font-semibold`}>Login</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={tw`flex-row items-center my-6 gap-3`}>
                    <View style={tw`flex-1 h-px bg-gray-200`} />
                    <Text style={tw`text-gray-400 text-sm`}>or continue with</Text>
                    <View style={tw`flex-1 h-px bg-gray-200`} />
                </View>

                {/* Social Authentication Row */}
                <View style={tw`flex-row gap-3 mb-6`}>
                    {/* Google */}
                    <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center border border-gray-200 py-3.5 rounded-xl gap-2.5 bg-white`}>
                        <FontAwesome name="google" size={18} color="#EA4335" />
                        <Text style={tw`text-sm font-semibold text-gray-900`}>Google</Text>
                    </TouchableOpacity>

                    {/* Apple */}
                    <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center border border-gray-200 py-3.5 rounded-xl gap-2.5 bg-white`}>
                        <FontAwesome name="apple" size={20} color="#000" />
                        <Text style={tw`text-sm font-semibold text-gray-900`}>Apple</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Link */}
                <Text style={tw`text-sm text-gray-400 text-center mt-auto pt-4`}>
                    Don’t have an account? <Text
                        style={tw`text-market-green font-semibold`}
                        onPress={() => router.push('/(auth)/signup')}
                    >Sign up</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}