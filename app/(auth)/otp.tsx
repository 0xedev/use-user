import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpScreen() {
    const router = useRouter();
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(25);

    // References to the native TextInput boxes for auto-focusing
    const inputs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Handle value change inside text input boxes
    const handleChange = (text: string, index: number) => {
        const cleanedText = text.replace(/[^0-9]/g, ''); // Allow digits only
        const newCode = [...code];
        newCode[index] = cleanedText;
        setCode(newCode);

        // Auto-focus next input field
        if (cleanedText && index < 5) {
            inputs.current[index + 1]?.focus();
        }

        // Submit when the last digit is entered
        if (index === 5 && cleanedText) {
            if (newCode.every(d => d)) {
                Keyboard.dismiss();
                router.replace('/(tabs)');
            }
        }
    };

    // Move cursor back when Backspace is pressed on empty input
    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (!code[index] && index > 0) {
                const newCode = [...code];
                newCode[index - 1] = '';
                setCode(newCode);
                inputs.current[index - 1]?.focus();
            }
        }
    };

    const formatTime = (s: number) => `00:${s.toString().padStart(2, '0')}`;

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

                {/* Horizontal Logo Header */}
                <View style={tw`flex-row items-center justify-center `}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={tw`w-24 h-24`}

                    />
                    <View>
                        <Text style={tw`text-2xl text-market-green font-medium`}>
                            use<Text style={tw`text-black font-semibold`}>Market</Text>
                        </Text>
                        <Text style={tw`text-[10px] text-gray-500`}>
                            Your market, <Text style={tw`text-market-green font-semibold`}>delivered.</Text>
                        </Text>
                    </View>
                </View>

                {/* Screen Titles */}
                <Text style={tw`text-2xl font-bold text-gray-900 text-center`}>
                    Verify your phone number
                </Text>
                <Text style={tw`text-sm text-gray-400 text-center mt-2`}>
                    Enter the 6-digit code sent to
                </Text>

                {/* Number & Change Row */}
                <View style={tw`flex-row justify-center items-center gap-4 mt-3`}>
                    <Text style={tw`text-lg font-semibold text-market-green`}>0803 123 4567</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-sm text-market-green font-semibold`}>Change</Text>
                    </TouchableOpacity>
                </View>

                {/* Standard System Keyboard inputs */}
                <View style={tw`flex-row justify-center gap-2.5 mt-7`}>
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                        const digit = code[i];

                        return (
                            <TextInput
                                key={i}
                                ref={el => { inputs.current[i] = el; }}
                                style={tw`w-12 h-14 border rounded-xl text-center text-2xl font-semibold text-gray-900 bg-white ${digit ? 'border-market-green' : 'border-gray-200'
                                    }`}
                                maxLength={1}
                                keyboardType="number-pad"
                                value={digit}
                                onChangeText={(text) => handleChange(text, i)}
                                onKeyPress={(e) => handleKeyPress(e, i)}
                                selectTextOnFocus
                            />
                        );
                    })}
                </View>

                {/* Countdown Timer */}
                <Text style={tw`text-sm text-gray-400 text-center mt-6`}>
                    Resend code in <Text style={tw`text-market-green font-semibold`}>{formatTime(timer)}</Text>
                </Text>

                {/* Security Info Card */}


                {/* Need Help Link */}

            </ScrollView>
        </SafeAreaView>
    );
}