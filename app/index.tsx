import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
    const router = useRouter();
    const rotateValue = useRef(new Animated.Value(0)).current;

    // Custom spinner rotation animation
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    // Automatic navigation timer (adjusted to 400 seconds based on your modification)
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(auth)/welcome');
        }, 4000); 
        return () => clearTimeout(timer);
    }, []);

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView style={tw`flex-1 bg-white items-center justify-between py-8`}>
            {/* Brand Logo & Slogan Group */}
            <View style={tw`items-center`}>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={tw`w-44 h-55`}
                />
                <Text style={tw`text-5xl text-market-green`}>
                    use<Text style={tw`text-black font-semibold`}>Market</Text>
                </Text>
                <Text style={tw`text-xl text-gray-500 mt-2`}>
                    Your market, <Text style={tw`text-market-green font-semibold`}>delivered.</Text>
                </Text>
            </View>

<View style={tw`w-full flex-1 justify-center items-center max-h-[90%] relative`}>
    {/* Background Illustration */}
    <Image
        source={require('@/assets/images/splash-illustration.png')}
        style={tw`w-full h-full`}
        
    />
    
    {/* Styled wrapping View with absolute positioning */}
    <View style={tw`absolute w-80 h-60 justify-center mt-24 mr-5 items-center`}>
        <Image
            source={require('@/assets/images/bag-splash.png')}
            style={tw`w-full h-full`}
            
        />
    </View>
</View>

            {/* Custom Loader Group */}
            <View style={tw`flex-row items-center gap-3 mb-6`}>
                <Animated.View
                    style={[
                        tw`w-6 h-6 rounded-full border-2 border-gray-100`,
                        {
                            borderTopColor: '#0A8A3A',
                            transform: [{ rotate }]
                        }
                    ]}
                />
                <Text style={tw`text-base text-gray-500 font-medium`}>Loading...</Text>
            </View>
        </SafeAreaView>
    );
}