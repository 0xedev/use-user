import tw from '@/lib/tw';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Lock, Smartphone } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView
                contentContainerStyle={tw`px-6 pt-2 pb-8 flex-grow justify-between`}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={tw`w-10 h-10 justify-center mb-4`}
                    >
                        <ArrowLeft size={24} color="#171717" />
                    </TouchableOpacity>

                    {/* Brand Logo & Name */}
                    <View style={tw`flex-row items-center gap-2 mb-6`}>
                        <Image
                            source={require('@/assets/images/logo.png')}
                            style={tw`w-10 h-10`}
                            resizeMode="contain"
                        />
                        <Text style={tw`text-2xl font-bold text-black`}>
                            <Text style={tw`text-market-green`}>use</Text>Market
                        </Text>
                    </View>

                    {/* Heading & Subtitle */}
                    <Text style={tw`text-3xl font-bold text-black tracking-tight mb-2`}>
                        Welcome back!
                    </Text>
                    <Text style={tw`text-base text-gray-500 mb-8 leading-6`}>
                        Log in to continue and enjoy{'\n'}
                        the best of <Text style={tw`text-market-green font-semibold`}>useMarket</Text>.
                    </Text>

                    {/* Form Inputs */}
                    <View style={tw`gap-4`}>
                        {/* Email or Phone Number */}
                        <View style={tw`flex-row items-center border border-gray-200 rounded-2xl px-4 h-14 bg-white`}>
                            <Smartphone size={20} color="#737373" style={tw`mr-3`} />
                            <TextInput
                                style={tw`flex-1 text-base text-gray-900 h-full`}
                                placeholder="Email or phone number"
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="none"
                                value={identifier}
                                onChangeText={setIdentifier}
                            />
                        </View>

                        {/* Password */}
                        <View style={tw`flex-row items-center border border-gray-200 rounded-2xl px-4 h-14 bg-white`}>
                            <Lock size={20} color="#737373" style={tw`mr-3`} />
                            <TextInput
                                style={tw`flex-1 text-base text-gray-900 h-full`}
                                placeholder="Password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <Eye size={20} color="#737373" />
                                ) : (
                                    <EyeOff size={20} color="#737373" />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Forgot Password Link */}
                        <TouchableOpacity style={tw`self-end mt-1`}>
                            <Text style={tw`text-sm text-market-green font-semibold`}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Log In Button */}
                    <TouchableOpacity
                        style={tw`bg-market-green py-4 rounded-2xl items-center mt-6 shadow-sm`}
                        onPress={handleLogin}
                        activeOpacity={0.85}
                    >
                        <Text style={tw`text-white text-lg font-bold`}>Log In</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={tw`flex-row items-center my-8`}>
                        <View style={tw`flex-1 h-px bg-gray-200`} />
                        <Text style={tw`px-4 text-sm text-gray-400 font-medium`}>or continue with</Text>
                        <View style={tw`flex-1 h-px bg-gray-200`} />
                    </View>

                    {/* Social Authentication Grid (Google, Apple, Facebook) */}
                    <View style={tw`flex-row justify-between gap-3 mb-6`}>
                        {/* Google */}
                        <TouchableOpacity style={tw`flex-1 items-center justify-center border border-gray-200 rounded-2xl py-4 bg-white shadow-xs`}>
                            <FontAwesome name="google" size={24} color="#EA4335" />
                            <Text style={tw`text-xs font-semibold text-gray-800 mt-2`}>Google</Text>
                        </TouchableOpacity>

                        {/* Apple */}
                        <TouchableOpacity style={tw`flex-1 items-center justify-center border border-gray-200 rounded-2xl py-4 bg-white shadow-xs`}>
                            <FontAwesome name="apple" size={26} color="#000000" />
                            <Text style={tw`text-xs font-semibold text-gray-800 mt-2`}>Apple</Text>
                        </TouchableOpacity>

                        {/* Facebook */}
                        <TouchableOpacity style={tw`flex-1 items-center justify-center border border-gray-200 rounded-2xl py-4 bg-white shadow-xs`}>
                            <FontAwesome name="facebook" size={24} color="#1877F2" />
                            <Text style={tw`text-xs font-semibold text-gray-800 mt-2`}>Facebook</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer Sign Up Link */}
                <View style={tw`pt-4 pb-2 items-center`}>
                    <Text style={tw`text-sm text-gray-500`}>
                        Don’t have an account?{' '}
                        <Text
                            style={tw`text-market-green font-bold`}
                            onPress={() => router.push('/(auth)/signup')}
                        >
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}