import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    Activity,
    ArrowLeft,
    Banknote,
    ChevronRight,
    CreditCard,
    Landmark,
    Percent,
    ShieldCheck,
    Smartphone,
    Wallet
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
    { id: 1, label: 'Delivery', completed: true },
    { id: 2, label: 'Payment', active: true, completed: false },
    { id: 3, label: 'Review', active: false, completed: false },
    { id: 4, label: 'Confirm', active: false, completed: false },
];

export default function CheckoutPaymentScreen() {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState('wallet');
    const [coupon, setCoupon] = useState('');

    const paymentMethods = [
        { id: 'wallet', name: 'useMarket Wallet', desc: 'Available balance: ₦2,350', icon: <Wallet size={22} color="#0A8A3A" />, discount: '-₦2,350', verified: true },
        { id: 'card', name: 'Card', desc: 'Visa, Mastercard, Verve', icon: <CreditCard size={22} color="#0A8A3A" />, cards: ['VISA', 'Mastercard', 'Verve'] },
        { id: 'bank', name: 'Bank Transfer', desc: 'Pay directly from your bank', icon: <Landmark size={22} color="#0A8A3A" /> },
        { id: 'ussd', name: 'USSD', desc: '*737# or *402#', icon: <Smartphone size={22} color="#0A8A3A" /> },
        { id: 'paystack', name: 'Pay with Paystack', desc: 'More payment options', icon: <Activity size={22} color="#0A8A3A" /> },
        { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive your order', icon: <Banknote size={22} color="#0A8A3A" />, fee: '₦100', feeLabel: 'Handling fee' },
    ];

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header Block */}
            <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-50`}>
                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="#171717" />
                    </TouchableOpacity>
                    <View>
                        <Text style={tw`text-xl font-bold text-gray-900`}>Checkout</Text>
                        <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Step 2 of 4</Text>
                    </View>
                </View>
                <View style={tw`flex-row items-center gap-1 bg-[#F2FBF6] px-2.5 py-1.5 rounded-lg`}>
                    <ShieldCheck size={14} color="#0A8A3A" />
                    <Text style={tw`text-[10px] text-market-green font-bold`}>100% Secure</Text>
                </View>
            </View>

            {/* Stepper Status Indicator */}
            <View style={tw`px-4 py-3 flex-row items-center justify-between bg-gray-50/30`}>
                {steps.map((step, i) => (
                    <View key={step.id} style={tw`flex-row items-center flex-1`}>
                        <View style={tw`items-center`}>
                            <View style={tw`w-8 h-8 rounded-full items-center justify-center ${step.active || step.completed ? 'bg-market-green' : 'bg-gray-200'}`}>
                                <Text style={tw`text-xs font-bold text-white`}>{step.completed ? '✓' : step.id}</Text>
                            </View>
                            <Text style={tw`text-[9px] mt-1 font-semibold ${step.active ? 'text-market-green font-bold' : 'text-gray-400'}`}>{step.label}</Text>
                        </View>
                        {i < steps.length - 1 && <View style={tw`flex-1 h-px bg-gray-200 mx-2 mb-4`} />}
                    </View>
                ))}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Savings Promotion Card */}
                <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between mb-4`}>
                    <View style={tw`flex-row items-center gap-3`}>
                        <Percent size={20} color="#0A8A3A" />
                        <View>
                            <Text style={tw`text-xs text-gray-700 font-medium`}>
                                Yay! You're saving <Text style={tw`font-bold text-market-green`}>₦1,450</Text> on this order
                            </Text>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>Apply offers & save more</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={tw`flex-row items-center`}>
                        <Text style={tw`text-xs text-market-green font-bold`}>View offers</Text>
                        <ChevronRight size={14} color="#0A8A3A" style={tw`ml-0.5`} />
                    </TouchableOpacity>
                </View>

                {/* Payment Methods Section */}
                <View style={tw`px-4 mb-4`}>
                    <Text style={tw`text-sm font-bold text-gray-900 mb-3`}>Payment Methods</Text>

                    {paymentMethods.map((method) => {
                        const isSelected = selectedMethod === method.id;

                        return (
                            <TouchableOpacity
                                key={method.id}
                                onPress={() => setSelectedMethod(method.id)}
                                style={tw`flex-row items-center gap-3.5 p-4 rounded-2xl border mb-3 bg-white ${isSelected ? 'border-market-green bg-[#F2FBF6]' : 'border-gray-200'
                                    }`}
                            >
                                {/* Radio Circle */}
                                <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${isSelected ? 'border-market-green' : 'border-gray-300'}`}>
                                    {isSelected && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
                                </View>

                                {method.icon}

                                <View style={tw`flex-1`}>
                                    <View style={tw`flex-row items-center justify-between`}>
                                        <Text style={tw`text-sm font-bold text-gray-900`}>{method.name}</Text>
                                        {method.discount && <Text style={tw`text-xs font-bold text-market-green`}>{method.discount}</Text>}
                                        {method.fee && <Text style={tw`text-xs font-bold text-gray-900`}>{method.fee}</Text>}
                                    </View>
                                    <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>{method.desc}</Text>
                                    {method.feeLabel && <Text style={tw`text-[9px] text-gray-400 font-medium`}>{method.feeLabel}</Text>}

                                    {/* Inline Cards Badges */}
                                    {method.cards && (
                                        <View style={tw`flex-row gap-1.5 mt-2`}>
                                            {method.cards.map((card) => (
                                                <View key={card} style={tw`bg-gray-50 border border-gray-200 px-2 py-0.5 rounded`}>
                                                    <Text style={tw`text-[9px] text-gray-600 font-bold`}>{card}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>

                                {method.verified && isSelected && <View style={tw`w-4.5 h-4.5 rounded-full bg-market-green items-center justify-center`}><Text style={tw`text-white text-[10px] font-bold`}>✓</Text></View>}
                                {!isSelected && <ChevronRight size={16} color="#737373" />}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Secure Transaction Info Grid */}
                <View style={tw`mx-4 bg-[#F2FBF6] rounded-2xl p-4 flex-row items-center justify-between mb-4 border border-market-green/20`}>
                    <View style={tw`flex-row items-center gap-3 flex-1`}>
                        <ShieldCheck size={22} color="#0A8A3A" />
                        <View>
                            <Text style={tw`text-xs font-bold text-market-green`}>100% Secure Payments</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>Your payment details are safe with us</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row gap-2.5`}>
                        <Text style={tw`text-[10px] text-gray-400 font-bold`}>PCI</Text>
                        <Text style={tw`text-[10px] text-gray-400 font-bold`}>SSL</Text>
                        <Text style={tw`text-[10px] text-gray-400 font-bold`}>VISA</Text>
                    </View>
                </View>

                {/* Apply Offers Block */}
                <View style={tw`px-4 mb-4`}>
                    <Text style={tw`text-sm font-bold text-gray-900 mb-3`}>Apply Offers</Text>
                    <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13 bg-white`}>
                        <Percent size={18} color="#737373" style={tw`mr-3`} />
                        <TextInput
                            style={tw`flex-1 text-sm text-gray-900 h-full`}
                            placeholder="Enter coupon code"
                            placeholderTextColor="#A3A3A3"
                            value={coupon}
                            onChangeText={setCoupon}
                        />
                        <TouchableOpacity>
                            <Text style={tw`text-sm text-market-green font-bold`}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bill Summary Table Card */}
                <View style={tw`mx-4 bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm`}>
                    <View style={tw`flex-row justify-between mb-2.5`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Item Total (4 items)</Text>
                        <Text style={tw`text-xs font-semibold text-gray-900`}>₦9,300</Text>
                    </View>
                    <View style={tw`flex-row justify-between mb-2.5`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery Fee</Text>
                        <Text style={tw`text-xs font-semibold text-gray-900`}>₦1,000</Text>
                    </View>
                    <View style={tw`flex-row justify-between mb-2.5`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Handling Fee</Text>
                        <Text style={tw`text-xs font-semibold text-gray-900`}>₦100</Text>
                    </View>
                    <View style={tw`flex-row justify-between mb-2.5`}>
                        <Text style={tw`text-xs text-market-green font-semibold`}>Discount</Text>
                        <Text style={tw`text-xs text-market-green font-bold`}>-₦1,450</Text>
                    </View>
                    <View style={tw`h-px bg-gray-100 my-2`} />
                    <View style={tw`flex-row justify-between items-center`}>
                        <View>
                            <Text style={tw`text-sm font-bold text-gray-950`}>To Pay</Text>
                            <View style={tw`flex-row items-center mt-1`}>
                                <Text style={tw`text-[10px] text-market-green font-bold`}>✓ You are saving ₦1,450</Text>
                            </View>
                        </View>
                        <Text style={tw`text-lg font-bold text-gray-950`}>₦8,950</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Review CTA Button */}
            <TouchableOpacity
                style={tw`mx-4 mb-4 bg-market-green h-14 rounded-xl flex-row items-center justify-between px-5`}
                onPress={() => router.push('/checkout/review')}>
                <Text style={tw`text-white text-base font-bold`}>Continue to Review</Text>
                <View style={tw`flex-row items-center gap-1`}>
                    <Text style={tw`text-white text-base font-bold`}>₦8,950</Text>
                    <ChevronRight size={18} color="white" />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}