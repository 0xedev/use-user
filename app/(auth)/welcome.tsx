import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView
                contentContainerStyle={tw`px-6 pb-8`}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Logo Row */}
                <View style={tw`flex-row items-center justify-center `}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={tw`w-25 h-25`}

                    />
                    <View>
                        <Text style={tw`text-3xl text-market-green font-medium`}>
                            use<Text style={tw`text-black font-semibold`}>Market</Text>
                        </Text>
                        <Text style={tw`text-xs text-gray-500 mt-0.5`}>
                            Your market, <Text style={tw`text-market-green font-semibold`}>delivered.</Text>
                        </Text>
                    </View>
                </View>

                {/* Hero Headlines */}
                <Text style={tw`text-[20px] font-bold text-gray-900 text-center leading-1.5`}>
                    Groceries, food, pharmacy{'\n'}and more. Delivered fast.
                </Text>
                <Text style={tw`text-base text-gray-500 text-center mt-1 leading-6 px-4`}>
                    Order from local stores and get{'\n'}it delivered to your door.
                </Text>

                {/* Layered Delivery Illustration Container */}
                <View style={tw`w-full h-72 my-5 relative justify-center items-center`}>
                    {/* Background City Silhouette Layer */}
                    <Image
                        source={require('@/assets/images/location-store.png')}
                        style={tw`w-full h-full`}

                    />
                    {/* Styled wrapping View with absolute positioning */}
                    <View style={tw`absolute w-80 h-full justify-center mt-15 items-center`}>
                        <Image
                            source={require('@/assets/images/delivery-illustration.png')}
                            style={tw`w-full h-full`}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={tw`gap-3.5`}>
                    {/* Continue with Phone */}
                    <TouchableOpacity
                        style={tw`flex-row items-center justify-center bg-market-green py-4 rounded-xl gap-2.5 shadow-sm`}
                        onPress={() => router.push('/(auth)/signup')}
                    >
                        <Text style={tw`text-white text-lg`}>📞</Text>
                        <Text style={tw`text-white text-base font-semibold`}>Continue with Phone</Text>
                    </TouchableOpacity>

                    {/* Continue with Email */}
                    <TouchableOpacity
                        style={tw`flex-row items-center justify-center bg-white py-4 rounded-xl border border-gray-200 gap-2.5`}
                        onPress={() => router.push('/(auth)/signup')}
                    >
                        <Text style={tw`text-market-green text-lg`}>✉️</Text>
                        <Text style={tw`text-market-green text-base font-semibold`}>Continue with Email</Text>
                    </TouchableOpacity>

                    {/* "or" Divider */}
                    <View style={tw`flex-row items-center my-1.5 gap-3`}>
                        <View style={tw`flex-1 h-px bg-gray-200`} />
                        <Text style={tw`text-gray-400 text-sm`}>or</Text>
                        <View style={tw`flex-1 h-px bg-gray-200`} />
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={tw`items-center justify-center py-4 rounded-xl border-[1.5px] border-market-green bg-white`}
                        onPress={() => router.push('/(auth)/login')}
                    >
                        <Text style={tw`text-market-green text-base font-semibold`}>Login to your account</Text>
                    </TouchableOpacity>
                </View>



                {/* Footer/Policy Text */}
                <Text style={tw`text-xs text-gray-400 text-center mt-6 leading-5 mb-2`}>
                    By continuing, you agree to our{'\n'}
                    <Text style={tw`text-market-green font-semibold`}>Terms & Conditions</Text> and <Text style={tw`text-market-green font-semibold`}>Privacy Policy</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}