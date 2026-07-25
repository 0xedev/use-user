import tw from '@/lib/tw';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    ArrowRight,
    ChevronRight,
    Phone,
    User
} from 'lucide-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView
                contentContainerStyle={tw`px-6 pt-4 pb-8 flex-grow justify-between items-center`}
                showsVerticalScrollIndicator={false}
            >
                <View style={tw`w-full items-center`}>
                    {/* Brand Logo & Name */}
                    <View style={tw`items-center`}>
                        <Image
                            source={require('@/assets/images/logo.png')}
                            style={tw`w-14 h-14 mb-1`}
                            resizeMode="contain"
                        />
                        <Text style={tw`text-2xl font-bold text-black`}>
                            <Text style={tw`text-market-green`}>use</Text>Market
                        </Text>
                        <Text style={tw`text-xs text-gray-500 font-medium mt-0.5`}>
                            Your market, <Text style={tw`text-market-green font-semibold`}>delivered.</Text>
                        </Text>
                    </View>

                    {/* Hero Delivery Illustration */}
                    <View style={tw`w-full h-56 my-4 justify-center items-center`}>
                        <Image
                            source={require('@/assets/images/delivery-illustration.png')}
                            style={tw`w-full h-full`}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Headline & Description */}
                    <Text style={tw`text-2xl font-bold text-black text-center mb-2`}>
                        Welcome to <Text style={tw`text-market-green`}>useMarket!</Text>
                    </Text>
                    <Text style={tw`text-sm text-gray-500 text-center px-4 leading-5 mb-6`}>
                        Explore top products, trusted stores and amazing services — all in one app.
                    </Text>

                    {/* Primary Button: Continue as Guest */}
                    <TouchableOpacity
                        style={tw`w-full bg-market-green py-4 px-5 rounded-2xl flex-row items-center justify-between shadow-sm mb-6`}
                        onPress={() => router.replace('/(tabs)')}
                        activeOpacity={0.85}
                    >
                        <User size={20} color="white" />
                        <Text style={tw`text-white text-base font-bold flex-1 text-center`}>
                            Continue as Guest
                        </Text>
                        <ArrowRight size={20} color="white" />
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={tw`flex-row items-center w-full mb-6`}>
                        <View style={tw`flex-1 h-px bg-gray-200`} />
                        <Text style={tw`px-3 text-xs text-gray-400 font-medium`}>or continue with</Text>
                        <View style={tw`flex-1 h-px bg-gray-200`} />
                    </View>

                    {/* Alternative Sign In Options */}
                    <View style={tw`w-full gap-3 mb-6`}>
                        {/* Continue with Google */}
                        <TouchableOpacity
                            style={tw`w-full flex-row items-center justify-between border border-gray-200 rounded-2xl px-4 py-3.5 bg-white`}
                            onPress={() => router.push('/(auth)/signup')}
                        >
                            <View style={tw`flex-row items-center gap-3`}>
                                <FontAwesome name="google" size={20} color="#EA4335" />
                                <Text style={tw`text-sm font-semibold text-gray-900`}>
                                    Continue with Google
                                </Text>
                            </View>
                            <ChevronRight size={18} color="#9CA3AF" />
                        </TouchableOpacity>

                        {/* Continue with Apple */}
                        <TouchableOpacity
                            style={tw`w-full flex-row items-center justify-between border border-gray-200 rounded-2xl px-4 py-3.5 bg-white`}
                            onPress={() => router.push('/(auth)/signup')}
                        >
                            <View style={tw`flex-row items-center gap-3`}>
                                <FontAwesome name="apple" size={22} color="#000000" />
                                <Text style={tw`text-sm font-semibold text-gray-900`}>
                                    Continue with Apple
                                </Text>
                            </View>
                            <ChevronRight size={18} color="#9CA3AF" />
                        </TouchableOpacity>

                        {/* Continue with Phone Number */}
                        <TouchableOpacity
                            style={tw`w-full flex-row items-center justify-between border border-gray-200 rounded-2xl px-4 py-3.5 bg-white`}
                            onPress={() => router.push('/(auth)/signup')}
                        >
                            <View style={tw`flex-row items-center gap-3`}>
                                <View style={tw`w-8 h-8 rounded-full bg-market-green-light items-center justify-center`}>
                                    <Phone size={16} color="#0A8A3A" />
                                </View>
                                <Text style={tw`text-sm font-semibold text-gray-900`}>
                                    Continue with Phone Number
                                </Text>
                            </View>
                            <ChevronRight size={18} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>


                </View>

                {/* Footer Link */}
                <View style={tw`pt-6 items-center`}>
                    <Text style={tw`text-sm text-gray-500`}>
                        Already have an account?{' '}
                        <Text
                            style={tw`text-market-green font-bold`}
                            onPress={() => router.push('/(auth)/login')}
                        >
                            Log In
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}