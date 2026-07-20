import { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white items-center justify-between py-20`}>
      <View style={tw`items-center mt-16`}>
        <Image 
          source={require('@/assets/images/usemarket-logo.png')} 
          style={tw`w-44 h-36`} 
          resizeMode="contain"
        />
        <Text style={tw`text-base text-gray-500 mt-2`}>
          Your market, <Text style={tw`text-market-green font-semibold`}>delivered.</Text>
        </Text>
      </View>

      <Image 
        source={require('@/assets/images/splash-illustration.png')} 
        style={tw`w-[90%] h-80 absolute bottom-24`} 
        resizeMode="contain"
      />

      <View style={tw`flex-row items-center gap-2.5 mb-5`}>
        <ActivityIndicator size="small" color="#0A8A3A" />
        <Text style={tw`text-base text-gray-500`}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
}