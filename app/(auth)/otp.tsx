import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

export default function OtpScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(25);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) text = text[text.length - 1];
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    
    if (index === 5 && text) {
      const fullCode = [...newCode];
      fullCode[5] = text;
      if (fullCode.every(d => d)) {
        Keyboard.dismiss();
        router.replace('/(tabs)');
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const formatTime = (s: number) => `00:${s.toString().padStart(2, '0')}`;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView 
        contentContainerStyle={tw`px-6 pb-6 flex-1`} 
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={tw`mt-2 mb-2 w-10 h-10 justify-center`}
        >
          <Text style={tw`text-2xl text-gray-900`}>←</Text>
        </TouchableOpacity>

        {/* Logo */}
        <View style={tw`items-center mb-6`}>
          <Text style={tw`text-2xl font-bold text-market-green`}>useMarket</Text>
          <Text style={tw`text-xs text-gray-500 mt-0.5`}>
            Your market, <Text style={tw`text-market-green font-semibold`}>delivered.</Text>
          </Text>
        </View>

        <Text style={tw`text-2xl font-bold text-gray-900 text-center`}>
          Verify your phone number
        </Text>
        <Text style={tw`text-sm text-gray-400 text-center mt-2`}>
          Enter the 6-digit code sent to
        </Text>

        <View style={tw`flex-row justify-center items-center gap-4 mt-3`}>
          <Text style={tw`text-lg font-semibold text-market-green`}>0803 123 4567</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* OTP Inputs */}
        <View style={tw`flex-row justify-center gap-2.5 mt-6`}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={el => inputs.current[i] = el}
              style={tw`w-12 h-14 border-[1.5px] rounded-xl text-center text-2xl font-semibold text-gray-900 ${digit ? 'border-market-green bg-market-green-light' : 'border-gray-200'}`}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Timer */}
        <Text style={tw`text-sm text-gray-400 text-center mt-5`}>
          Resend code in <Text style={tw`text-market-green font-semibold`}>{formatTime(timer)}</Text>
        </Text>

        {/* Security Banner */}
        <View style={tw`flex-row items-center gap-3 bg-market-green-light p-3.5 rounded-xl mt-5`}>
          <Text style={tw`text-xl`}>🔒</Text>
          <View>
            <Text style={tw`text-sm font-semibold text-market-green`}>We never share your number</Text>
            <Text style={tw`text-xs text-gray-500 mt-0.5`}>Your information is safe with us.</Text>
          </View>
        </View>

        {/* Help */}
        <TouchableOpacity style={tw`flex-row items-center justify-center gap-2 mt-5`}>
          <Text style={tw`text-lg text-market-green`}>🎧</Text>
          <Text style={tw`text-sm text-market-green font-semibold`}>Need help?</Text>
        </TouchableOpacity>

        {/* Custom Keypad */}
        <View style={tw`flex-row flex-wrap justify-center gap-2 mt-auto mb-5 pt-4`}>
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <TouchableOpacity 
              key={num} 
              style={tw`w-[30%] aspect-[1.6] items-center justify-center bg-gray-100 rounded-xl`}
              onPress={() => {
                const emptyIndex = code.findIndex(d => !d);
                if (emptyIndex !== -1) handleChange(num.toString(), emptyIndex);
              }}
            >
              <Text style={tw`text-2xl font-semibold text-gray-900`}>{num}</Text>
              <Text style={tw`text-xs text-gray-400 font-medium mt-0.5 tracking-widest`}>
                {num === 1 ? '' : num === 2 ? 'ABC' : num === 3 ? 'DEF' : num === 4 ? 'GHI' : num === 5 ? 'JKL' : num === 6 ? 'MNO' : num === 7 ? 'PQRS' : num === 8 ? 'TUV' : 'WXYZ'}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={tw`w-[30%] aspect-[1.6]`} />
          <TouchableOpacity 
            style={tw`w-[30%] aspect-[1.6] items-center justify-center bg-gray-100 rounded-xl`}
            onPress={() => {
              const emptyIndex = code.findIndex(d => !d);
              if (emptyIndex !== -1) handleChange('0', emptyIndex);
            }}
          >
            <Text style={tw`text-2xl font-semibold text-gray-900`}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`w-[30%] aspect-[1.6] items-center justify-center bg-gray-100 rounded-xl`}
            onPress={() => {
              const lastFilled = code.map((d, i) => d ? i : -1).filter(i => i !== -1).pop();
              if (lastFilled !== undefined && lastFilled >= 0) {
                const newCode = [...code];
                newCode[lastFilled] = '';
                setCode(newCode);
                inputs.current[lastFilled]?.focus();
              }
            }}
          >
            <Text style={tw`text-2xl font-semibold text-gray-900`}>⌫</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}