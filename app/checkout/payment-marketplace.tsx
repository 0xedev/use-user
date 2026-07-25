import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bell,
    Check,
    ChevronDown,
    ChevronRight,
    CreditCard,
    Headphones,
    Info,
    Landmark,
    Lock,
    Search,
    ShieldCheck,
    ShoppingBag,
    Smartphone,
    Wallet
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
    { id: 1, label: 'Cart', completed: true },
    { id: 2, label: 'Shipping Address', completed: true },
    { id: 3, label: 'Payment', active: true, completed: false },
    { id: 4, label: 'Review', active: false, completed: false },
];

const paymentMethods = [
    {
        id: 'wallet',
        title: 'useMarket Wallet',
        badge: 'Recommended',
        subtitle: 'Balance: ₦56,500',
        amount: '-₦2,110,000',
        icon: 'wallet',
        logos: null,
    },
    {
        id: 'card',
        title: 'Debit/Credit Card',
        badge: null,
        subtitle: 'Visa, Mastercard, Verve',
        amount: null,
        icon: 'card',
        logos: ['VISA', 'MC'],
    },
    {
        id: 'bank',
        title: 'Bank Transfer',
        badge: null,
        subtitle: 'Transfer directly from your bank',
        amount: null,
        icon: 'bank',
        logos: null,
    },
    {
        id: 'momo',
        title: 'MTN MoMo',
        badge: null,
        subtitle: 'Pay with MTN Mobile Money',
        amount: null,
        icon: 'momo',
        logos: null,
    },
    {
        id: 'airtel',
        title: 'Airtel Money',
        badge: null,
        subtitle: 'Pay with Airtel Money',
        amount: null,
        icon: 'airtel',
        logos: null,
    },
    {
        id: 'apple',
        title: 'Apple Pay',
        badge: null,
        subtitle: 'Pay securely with Apple Pay',
        amount: null,
        icon: 'apple',
        logos: null,
    },
    {
        id: 'google',
        title: 'Google Pay',
        badge: null,
        subtitle: 'Pay securely with Google Pay',
        amount: null,
        icon: 'google',
        logos: null,
    },
];

export default function MarketplacePaymentScreen() {
    const router = useRouter();
    const [selectedMethodId, setSelectedMethodId] = useState('wallet');

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Top Navigation Bar */}
            <View style={tw`px-4 pt-2 pb-1 flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`w-9 h-9 items-center justify-center`}>
                        <ArrowLeft size={22} color="#171717" />
                    </TouchableOpacity>
                    <Text style={tw`text-2xl font-bold text-black`}>
                        <Text style={tw`text-market-green`}>use</Text>Market
                    </Text>
                </View>

                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity style={tw`w-9 h-9 items-center justify-center`}>
                        <Headphones size={22} color="#171717" />
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center`}>
                        <Bell size={22} color="#171717" />
                        <View style={tw`absolute top-1 right-1 w-2 h-2 bg-market-green rounded-full`} />
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center`} onPress={() => router.push('/cart')}>
                        <ShoppingBag size={22} color="#171717" />
                        <View style={tw`absolute -top-1 -right-1 w-4.5 h-4.5 bg-market-green rounded-full items-center justify-center border-2 border-white`}>
                            <Text style={tw`text-white text-[9px] font-bold`}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* 4-Step Progress Stepper */}
                <View style={tw`px-6 my-3 flex-row items-center justify-between`}>
                    {steps.map((step, idx) => (
                        <View key={step.id} style={tw`items-center flex-1 relative`}>
                            {idx < steps.length - 1 && (
                                <View style={tw`absolute top-3.5 left-1/2 w-full h-0.5 bg-gray-200 -z-10`} />
                            )}

                            <View
                                style={tw`w-7 h-7 rounded-full items-center justify-center ${
                                    step.completed
                                        ? 'bg-market-green'
                                        : step.active
                                        ? 'bg-market-green shadow-xs'
                                        : 'bg-white border-2 border-gray-300'
                                }`}
                            >
                                {step.completed ? (
                                    <Check size={14} color="white" strokeWidth={3} />
                                ) : (
                                    <Text style={tw`text-xs font-bold ${step.active ? 'text-white' : 'text-gray-500'}`}>
                                        {step.id}
                                    </Text>
                                )}
                            </View>

                            <Text style={tw`text-[10px] font-bold mt-1 ${step.active || step.completed ? 'text-market-green' : 'text-gray-400'}`}>
                                {step.label}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Title & Subtitle Header */}
                <View style={tw`px-4 my-2`}>
                    <Text style={tw`text-2xl font-extrabold text-gray-950`}>Checkout – Payment</Text>
                    <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>
                        Choose a payment method and complete your order
                    </Text>
                </View>

                {/* 100% Secure Payments Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-3.5 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                        <ShieldCheck size={20} color="#0A8A3A" />
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-market-green`}>100% Secure Payments</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                Your payment information is safe with us
                            </Text>
                        </View>
                    </View>
                    <ChevronDown size={18} color="#0A8A3A" />
                </View>

                {/* Payment Methods Section */}
                <View style={tw`px-4 my-2`}>
                    <Text style={tw`text-xs font-bold text-gray-900 mb-2.5`}>Recommended</Text>

                    <View style={tw`bg-white rounded-3xl border border-gray-100 p-2 shadow-xs gap-2`}>
                        {paymentMethods.map((method) => {
                            const isSelected = selectedMethodId === method.id;

                            return (
                                <TouchableOpacity
                                    key={method.id}
                                    onPress={() => setSelectedMethodId(method.id)}
                                    style={tw`p-3 rounded-2xl border flex-row items-center justify-between ${
                                        isSelected
                                            ? 'border-market-green bg-[#F0FDF4]'
                                            : 'border-transparent bg-white'
                                    }`}
                                >
                                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                                        {/* Radio Circle */}
                                        <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${
                                            isSelected ? 'border-market-green bg-market-green' : 'border-gray-300'
                                        }`}>
                                            {isSelected && <View style={tw`w-2 h-2 rounded-full bg-white`} />}
                                        </View>

                                        {/* Method Icon */}
                                        <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
                                            {method.icon === 'wallet' && <Wallet size={18} color="#0A8A3A" />}
                                            {method.icon === 'card' && <CreditCard size={18} color="#0A8A3A" />}
                                            {method.icon === 'bank' && <Landmark size={18} color="#0A8A3A" />}
                                            {method.icon === 'momo' && <Text style={tw`text-xs font-bold text-amber-500`}>MTN</Text>}
                                            {method.icon === 'airtel' && <Text style={tw`text-xs font-bold text-red-600`}>airtel</Text>}
                                            {method.icon === 'apple' && <Text style={tw`text-xs font-bold text-black`}></Text>}
                                            {method.icon === 'google' && <Text style={tw`text-xs font-bold text-blue-600`}>G</Text>}
                                        </View>

                                        <View style={tw`flex-1`}>
                                            <View style={tw`flex-row items-center gap-2`}>
                                                <Text style={tw`text-xs font-bold text-gray-900`}>{method.title}</Text>
                                                {method.badge && (
                                                    <View style={tw`bg-emerald-100 px-2 py-0.5 rounded-md`}>
                                                        <Text style={tw`text-[9px] font-bold text-market-green`}>{method.badge}</Text>
                                                    </View>
                                                )}
                                            </View>
                                            <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`}>
                                                {method.subtitle}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Right Amount / Logos */}
                                    <View style={tw`flex-row items-center gap-2`}>
                                        {method.amount && (
                                            <Text style={tw`text-xs font-extrabold text-market-green`}>{method.amount}</Text>
                                        )}

                                        {method.logos && (
                                            <View style={tw`flex-row items-center gap-1`}>
                                                <Text style={tw`text-[9px] font-extrabold text-blue-900`}>VISA</Text>
                                                <Text style={tw`text-[9px] font-extrabold text-red-500`}>MC</Text>
                                            </View>
                                        )}

                                        <ChevronRight size={16} color="#9CA3AF" />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Order Summary Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-2.5`}>
                    <Text style={tw`text-sm font-bold text-gray-900 mb-1`}>Order Summary</Text>

                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-1.5`}>
                            <Text style={tw`text-xs`}>🛍️</Text>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>3 items from TechWorld Store</Text>
                        </View>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦2,310,000</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Store Discount</Text>
                        <Text style={tw`text-xs font-bold text-market-green`}>-₦200,000</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery Fee</Text>
                            <Info size={12} color="#9CA3AF" />
                        </View>
                        <Text style={tw`text-xs font-bold text-market-green`}>FREE</Text>
                    </View>

                    <View style={tw`h-px bg-gray-100 w-full my-1`} />

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Total Amount</Text>
                        <Text style={tw`text-xl font-extrabold text-market-green`}>₦2,110,000</Text>
                    </View>
                </View>

                {/* Points Earned Banner */}
                <View style={tw`mx-4 my-2 bg-amber-50/80 rounded-2xl p-3 border border-amber-200/60 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-2.5`}>
                        <Text style={tw`text-base`}>🪙</Text>
                        <Text style={tw`text-xs font-bold text-gray-800`}>
                            You will earn <Text style={tw`text-market-green`}>210 useMarket Points</Text> on this order
                        </Text>
                    </View>
                    <ChevronRight size={16} color="#9CA3AF" />
                </View>

                {/* Back & Continue to Review CTA */}
                <View style={tw`px-4 my-3 flex-row items-center gap-3`}>
                    <TouchableOpacity
                        style={tw`w-28 border border-gray-200 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 bg-white`}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={16} color="#171717" />
                        <Text style={tw`text-gray-800 text-xs font-bold`}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`flex-1 bg-market-green py-3 rounded-2xl items-center justify-center shadow-sm`}
                        onPress={() => router.push('/checkout/review')}
                        activeOpacity={0.85}
                    >
                        <View style={tw`flex-row items-center gap-1.5`}>
                            <Lock size={14} color="white" />
                            <Text style={tw`text-white text-xs font-bold`}>Continue to Review</Text>
                        </View>
                        <Text style={tw`text-[9px] text-white/80 font-medium mt-0.5`}>
                            Review your order before placing
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}