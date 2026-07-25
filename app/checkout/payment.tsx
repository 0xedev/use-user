import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    Banknote,
    Bell,
    ChevronRight,
    CreditCard,
    Hash,
    Info,
    Landmark,
    Percent,
    Search,
    ShieldCheck,
    ShoppingBag,
    Wallet
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
    { id: 1, label: 'Delivery', active: false, completed: true },
    { id: 2, label: 'Time', active: false, completed: true },
    { id: 3, label: 'Payment', active: true, completed: true },
    { id: 4, label: 'Review', active: false, completed: false },
    { id: 5, label: 'Confirm', active: false, completed: false },
];

const paymentMethods = [
    {
        id: 'wallet',
        title: 'useMarket Wallet',
        subtitle: 'Available Balance: ₦25,600.00',
        icon: 'wallet',
        badge: null,
        cards: null,
    },
    {
        id: 'card',
        title: 'Add Card',
        subtitle: 'Visa, Mastercard, Verve',
        icon: 'card',
        badge: null,
        cards: ['VISA', 'MC', 'Verve'],
    },
    {
        id: 'ussd',
        title: 'USSD',
        subtitle: 'Pay with *737#',
        icon: 'ussd',
        badge: null,
        cards: null,
    },
    {
        id: 'bank',
        title: 'Bank Transfer',
        subtitle: 'Transfer from your bank',
        icon: 'bank',
        badge: null,
        cards: null,
    },
    {
        id: 'pod',
        title: 'Pay on Delivery',
        subtitle: 'Pay cash to your rider',
        icon: 'cash',
        badge: '₦200 fee',
        cards: null,
    },
];

export default function CheckoutPaymentScreen() {
    const router = useRouter();
    const [selectedPaymentId, setSelectedPaymentId] = useState('wallet');

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
                        <Search size={22} color="#171717" />
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
                {/* Checkout Title & Secure Badge */}
                <View style={tw`px-4 my-2 flex-row items-center justify-between`}>
                    <Text style={tw`text-2xl font-bold text-gray-950`}>Checkout</Text>
                    <View style={tw`flex-row items-center gap-1.5 bg-[#F0FDF4] px-2.5 py-1 rounded-lg border border-market-green/10`}>
                        <ShieldCheck size={14} color="#0A8A3A" />
                        <Text style={tw`text-[11px] font-bold text-market-green`}>100% Secure Checkout</Text>
                    </View>
                </View>

                {/* 5-Step Progress Stepper */}
                <View style={tw`px-4 my-3 flex-row items-center justify-between`}>
                    {steps.map((step, idx) => (
                        <View key={step.id} style={tw`flex-1 items-center relative`}>
                            {idx < steps.length - 1 && (
                                <View style={tw`absolute top-3.5 left-1/2 w-full h-0.5 bg-gray-200 -z-10`} />
                            )}

                            <View
                                style={tw`w-7 h-7 rounded-full items-center justify-center ${step.active
                                        ? 'bg-market-green shadow-xs'
                                        : step.completed
                                            ? 'bg-market-green'
                                            : 'bg-white border-2 border-gray-300'
                                    }`}
                            >
                                <Text style={tw`text-xs font-bold text-white`}>
                                    {step.completed && !step.active ? '✓' : step.id}
                                </Text>
                            </View>

                            <Text style={tw`text-[10px] font-bold mt-1 ${step.active ? 'text-market-green' : 'text-gray-400'}`}>
                                {step.label}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Select Payment Method Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>Select Payment Method</Text>
                    <Text style={tw`text-[11px] text-gray-400 font-medium mb-4 mt-0.5`}>
                        Choose how you want to pay
                    </Text>

                    {/* Payment Options List */}
                    <View style={tw`gap-3`}>
                        {paymentMethods.map((method) => {
                            const isSelected = selectedPaymentId === method.id;

                            return (
                                <TouchableOpacity
                                    key={method.id}
                                    onPress={() => setSelectedPaymentId(method.id)}
                                    style={tw`p-3.5 rounded-2xl border flex-row items-center justify-between ${isSelected
                                            ? 'border-market-green bg-[#F0FDF4]'
                                            : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                                        {/* Icon Square */}
                                        <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
                                            {method.icon === 'wallet' && <Wallet size={18} color="#0A8A3A" />}
                                            {method.icon === 'card' && <CreditCard size={18} color="#0A8A3A" />}
                                            {method.icon === 'ussd' && <Hash size={18} color="#0A8A3A" />}
                                            {method.icon === 'bank' && <Landmark size={18} color="#0A8A3A" />}
                                            {method.icon === 'cash' && <Banknote size={18} color="#0A8A3A" />}
                                        </View>

                                        <View style={tw`flex-1`}>
                                            <Text style={tw`text-sm font-bold text-gray-900`}>{method.title}</Text>
                                            <Text style={tw`text-[11px] text-gray-400 font-medium mt-0.5`}>
                                                {method.subtitle}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Right Side Badges or Radio */}
                                    <View style={tw`flex-row items-center gap-2`}>
                                        {method.cards && (
                                            <View style={tw`flex-row items-center gap-1 mr-1`}>
                                                <Text style={tw`text-[9px] font-extrabold text-blue-900`}>VISA</Text>
                                                <Text style={tw`text-[9px] font-extrabold text-red-500`}>MC</Text>
                                                <Text style={tw`text-[9px] font-extrabold text-emerald-600`}>Verve</Text>
                                            </View>
                                        )}

                                        {method.badge && (
                                            <View style={tw`bg-emerald-100 px-2 py-0.5 rounded-md mr-1`}>
                                                <Text style={tw`text-[9px] font-bold text-market-green`}>{method.badge}</Text>
                                            </View>
                                        )}

                                        {/* Radio Circle */}
                                        <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${isSelected ? 'border-market-green bg-market-green' : 'border-gray-300'
                                            }`}>
                                            {isSelected && <View style={tw`w-2 h-2 rounded-full bg-white`} />}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Wallet Balance Banner & Top Up */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                        <View style={tw`w-10 h-10 rounded-2xl bg-market-green/10 items-center justify-center`}>
                            <Wallet size={20} color="#0A8A3A" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold`}>useMarket Wallet Balance</Text>
                            <Text style={tw`text-base font-extrabold text-market-green mt-0.5`}>₦25,600.00</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={tw`border border-market-green px-3.5 py-2 rounded-xl bg-white flex-row items-center gap-1 shadow-xs`}
                        onPress={() => router.push('/(tabs)/wallet')}
                    >
                        <Text style={tw`text-market-green text-xs font-bold`}>Top Up Wallet</Text>
                        <ArrowRight size={12} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* Order Summary Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-2.5`}>
                    <Text style={tw`text-sm font-bold text-gray-900 mb-1`}>Order Summary</Text>

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Subtotal (3 items)</Text>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦95,600</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery Fee</Text>
                            <Info size={12} color="#9CA3AF" />
                        </View>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦1,500</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Service Fee</Text>
                            <Info size={12} color="#9CA3AF" />
                        </View>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦500</Text>
                    </View>

                    <View style={tw`h-px bg-gray-100 w-full my-1`} />

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Total</Text>
                        <Text style={tw`text-xl font-extrabold text-market-green`}>₦97,600</Text>
                    </View>

                    {/* Savings Pill */}
                    <View style={tw`bg-[#F0FDF4] border border-market-green/20 rounded-xl p-2.5 flex-row items-center gap-2 mt-1`}>
                        <ShieldCheck size={14} color="#0A8A3A" />
                        <Text style={tw`text-xs font-bold text-market-green`}>You're saving ₦11,000 on this order</Text>
                    </View>
                </View>

                {/* Promo Code Coupon Card */}
                <TouchableOpacity style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-3.5 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3`}>
                        <View style={tw`w-9 h-9 rounded-xl bg-market-green/10 items-center justify-center`}>
                            <Percent size={18} color="#0A8A3A" />
                        </View>
                        <View>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Have a promo code?</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-medium mt-0.5`}>Add a code to get discounts</Text>
                        </View>
                    </View>

                    <View style={tw`flex-row items-center gap-1`}>
                        <Text style={tw`text-xs font-bold text-market-green`}>Apply</Text>
                        <ChevronRight size={16} color="#0A8A3A" />
                    </View>
                </TouchableOpacity>

                {/* Back & Continue Buttons */}
                <View style={tw`px-4 my-3 flex-row items-center gap-3`}>
                    <TouchableOpacity
                        style={tw`w-28 border border-gray-200 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 bg-white`}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={16} color="#171717" />
                        <Text style={tw`text-gray-800 text-xs font-bold`}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`flex-1 bg-market-green py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm`}
                        onPress={() => router.push('/checkout/review')}
                        activeOpacity={0.85}
                    >
                        <Text style={tw`text-white text-xs font-bold`}>Continue to Review</Text>
                        <ArrowRight size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}