import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    Calendar,
    ChevronDown,
    ChevronRight,
    Clock,
    Info,
    MapPin,
    Search,
    ShieldCheck,
    ShoppingBag,
    Truck,
    Zap
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
    { id: 1, label: 'Delivery', active: false, completed: true },
    { id: 2, label: 'Time', active: true, completed: true },
    { id: 3, label: 'Payment', active: false, completed: false },
    { id: 4, label: 'Review', active: false, completed: false },
    { id: 5, label: 'Confirm', active: false, completed: false },
];

const timeOptions = [
    {
        id: 'asap',
        title: 'ASAP',
        subtitle: 'As soon as possible',
        badge: 'Fastest',
        duration: '30 – 45 mins',
        price: 'FREE',
        icon: 'zap',
    },
    {
        id: 'today',
        title: 'Today',
        subtitle: 'Within today',
        badge: null,
        duration: '1 – 2 hours',
        price: 'FREE',
        icon: 'calendar',
    },
    {
        id: 'schedule',
        title: 'Schedule',
        subtitle: 'Choose a specific time',
        badge: null,
        duration: null,
        price: null,
        icon: 'calendar',
    },
];

const orderItems = [
    { id: 1, name: 'Stallion Premium Parboiled Rice', unit: '50kg', price: '₦68,500', qty: 1, total: '₦68,500', image: require('@/assets/images/prod-rice.png') },
    { id: 2, name: 'Golden Penny Cooking Oil', unit: '5L', price: '₦12,400', qty: 2, total: '₦24,800', image: require('@/assets/images/prod-oil.png') },
    { id: 3, name: 'Golden Penny Beans (Brown)', unit: '1kg', price: '₦2,300', qty: 1, total: '₦2,300', image: require('@/assets/images/prod-tomatoes.png') },
];

export default function CheckoutTimeScreen() {
    const router = useRouter();
    const [selectedTimeId, setSelectedTimeId] = useState('asap');
    const [showTotalDetails, setShowTotalDetails] = useState(false);

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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-32`}>
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
                                style={tw`w-7 h-7 rounded-full items-center justify-center ${
                                    step.active
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

                {/* Select Delivery Time Section Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
                    <View style={tw`flex-row items-center justify-between mb-4`}>
                        <View style={tw`flex-row items-center gap-2.5`}>
                            <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
                                <Clock size={20} color="#0A8A3A" />
                            </View>
                            <View>
                                <Text style={tw`text-sm font-bold text-gray-900`}>Select Delivery Time</Text>
                                <Text style={tw`text-[11px] text-gray-400 font-medium mt-0.5`}>
                                    Choose when you want your order
                                </Text>
                            </View>
                        </View>

                        <View style={tw`bg-[#F0FDF4] border border-market-green/20 px-2.5 py-1 rounded-lg flex-row items-center gap-1`}>
                            <Truck size={12} color="#0A8A3A" />
                            <Text style={tw`text-[10px] font-bold text-market-green`}>Fastest delivery in 30 mins</Text>
                        </View>
                    </View>

                    {/* Time Options List */}
                    <View style={tw`gap-3`}>
                        {timeOptions.map((opt) => {
                            const isSelected = selectedTimeId === opt.id;

                            return (
                                <TouchableOpacity
                                    key={opt.id}
                                    onPress={() => setSelectedTimeId(opt.id)}
                                    style={tw`p-3.5 rounded-2xl border flex-row items-center justify-between ${
                                        isSelected
                                            ? 'border-market-green bg-[#F0FDF4]'
                                            : 'border-gray-200 bg-white'
                                    }`}
                                >
                                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                                        {/* Radio Circle */}
                                        <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${
                                            isSelected ? 'border-market-green bg-market-green' : 'border-gray-300'
                                        }`}>
                                            {isSelected && <View style={tw`w-2 h-2 rounded-full bg-white`} />}
                                        </View>

                                        {/* Icon Square */}
                                        <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
                                            {opt.icon === 'zap' ? <Zap size={18} color="#0A8A3A" /> : <Calendar size={18} color="#0A8A3A" />}
                                        </View>

                                        <View style={tw`flex-1`}>
                                            <View style={tw`flex-row items-center gap-2`}>
                                                <Text style={tw`text-sm font-bold text-gray-900`}>{opt.title}</Text>
                                                {opt.badge && (
                                                    <View style={tw`bg-emerald-100 px-2 py-0.5 rounded-md`}>
                                                        <Text style={tw`text-[9px] font-bold text-market-green`}>{opt.badge}</Text>
                                                    </View>
                                                )}
                                            </View>

                                            <Text style={tw`text-[11px] text-gray-400 font-medium mt-0.5`}>
                                                {opt.subtitle}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Right Side Info */}
                                    {opt.duration ? (
                                        <View style={tw`items-end`}>
                                            <Text style={tw`text-xs font-bold text-gray-900`}>{opt.duration}</Text>
                                            <Text style={tw`text-xs font-bold text-market-green mt-0.5`}>{opt.price}</Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity style={tw`flex-row items-center gap-1`}>
                                            <Text style={tw`text-xs font-bold text-market-green`}>Select Time</Text>
                                            <ChevronRight size={14} color="#0A8A3A" />
                                        </TouchableOpacity>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Location & Time Guarantee Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/20 gap-3 shadow-xs`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center gap-2.5 flex-1 pr-2`}>
                            <MapPin size={18} color="#0A8A3A" />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Estimated Delivery to</Text>
                                <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>
                                    23 Adekunle Street, Yaba, Lagos
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => router.push('/(location)/index')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>Change</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Notice Box */}
                    <View style={tw`bg-white/80 p-3 rounded-xl flex-row items-start gap-2.5 border border-emerald-100`}>
                        <Info size={16} color="#0A8A3A" style={tw`mt-0.5`} />
                        <Text style={tw`text-xs font-medium text-gray-700 leading-4 flex-1`}>
                            Your order will be delivered between <Text style={tw`font-bold text-market-green`}>10:15 AM – 10:30 AM</Text>. We'll notify you when your rider is on the way.
                        </Text>
                    </View>
                </View>

                {/* Order Items Preview Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
                    <View style={tw`flex-row items-center justify-between mb-3`}>
                        <Text style={tw`text-sm font-bold text-gray-900`}>
                            Order Items <Text style={tw`text-xs font-semibold text-gray-400`}>({orderItems.length} items)</Text>
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/cart')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>Edit Cart</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`gap-3`}>
                        {orderItems.map((item) => (
                            <View key={item.id} style={tw`flex-row items-center justify-between pb-2.5 border-b border-gray-50 last:border-0 last:pb-0`}>
                                <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                                    <Image source={item.image} style={tw`w-12 h-12 rounded-xl border border-gray-100 bg-gray-50/50`} resizeMode="contain" />
                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>{item.name}</Text>
                                        <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{item.unit}</Text>
                                        <Text style={tw`text-xs font-bold text-market-green mt-0.5`}>{item.price}</Text>
                                    </View>
                                </View>

                                <View style={tw`items-end`}>
                                    <Text style={tw`text-[11px] text-gray-400 font-semibold`}>Qty: {item.qty}</Text>
                                    <Text style={tw`text-xs font-extrabold text-gray-950 mt-0.5`}>{item.total}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

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
                        onPress={() => router.push('/checkout/payment')}
                        activeOpacity={0.85}
                    >
                        <Text style={tw`text-white text-xs font-bold`}>Continue to Payment</Text>
                        <ArrowRight size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Floating Expandable Total Bar */}
            <TouchableOpacity
                style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 flex-row items-center justify-between shadow-lg`}
                onPress={() => setShowTotalDetails(!showTotalDetails)}
            >
                <Text style={tw`text-base font-extrabold text-gray-950`}>Total</Text>
                <View style={tw`flex-row items-center gap-1.5`}>
                    <Text style={tw`text-xl font-extrabold text-market-green`}>₦97,600</Text>
                    <ChevronDown size={18} color="#0A8A3A" />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}