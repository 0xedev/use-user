import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Check,
    ChevronRight,
    Headphones,
    Home,
    MapPin,
    Package,
    Phone,
    Store,
    Truck,
    Wallet
} from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const timelineSteps = [
    { label: 'Confirmed', date: '24 May 2025 • 9:20 AM', sub: 'Your order has been confirmed', icon: 'wallet', active: true },
    { label: 'Preparing Order', date: '24 May 2025 • 9:28 AM', sub: 'We are preparing your order', icon: 'store', active: true },
    { label: 'Picked Up', date: '24 May 2025 • 9:45 AM', sub: 'Your order has been picked up by the rider', icon: 'box', active: true },
    { label: 'Out for Delivery', date: '24 May 2025 • 10:02 AM', sub: 'Rider is on the way', icon: 'truck', active: true },
    { label: 'Delivered', date: '24 May 2025 • 10:32 AM', sub: 'Your order has been delivered', icon: 'home', active: true, isDelivered: true },
];

export default function OrderTimelineScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Top Navigation Bar */}
            <View style={tw`px-4 pt-2 pb-3 flex-row items-center gap-3 border-b border-gray-100`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`w-9 h-9 items-center justify-center`}>
                    <ArrowLeft size={22} color="#171717" />
                </TouchableOpacity>
                <Text style={tw`text-xl font-extrabold text-gray-950`}>Order Timeline</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* Vertical Stepper Timeline */}
                <View style={tw`px-6 py-4 gap-6 relative`}>
                    {timelineSteps.map((step, index) => (
                        <View key={step.label} style={tw`flex-row items-start gap-4 relative`}>
                            {/* Vertical Connecting Line */}
                            {index < timelineSteps.length - 1 && (
                                <View style={tw`absolute top-10 left-5 w-0.5 h-12 bg-market-green -z-10`} />
                            )}

                            {/* Circle Icon Badge */}
                            <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-200 relative`}>
                                {step.icon === 'wallet' && <Wallet size={18} color="#0A8A3A" />}
                                {step.icon === 'store' && <Store size={18} color="#0A8A3A" />}
                                {step.icon === 'box' && <Package size={18} color="#0A8A3A" />}
                                {step.icon === 'truck' && <Truck size={18} color="#0A8A3A" />}
                                {step.icon === 'home' && <Home size={18} color="#0A8A3A" />}

                                <View style={tw`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-market-green items-center justify-center border border-white`}>
                                    <Check size={10} color="white" strokeWidth={3} />
                                </View>
                            </View>

                            {/* Content */}
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-sm font-extrabold ${step.isDelivered ? 'text-market-green' : 'text-gray-950'}`}>
                                    {step.label}
                                </Text>
                                <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>
                                    {step.date}
                                </Text>
                                <Text style={tw`text-xs text-gray-500 font-medium mt-1`}>
                                    {step.sub}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Delivery Information Section Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-4`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>Delivery Information</Text>

                    {/* Delivery Address */}
                    <View style={tw`flex-row items-start justify-between`}>
                        <View style={tw`flex-row items-start gap-3 flex-1 pr-2`}>
                            <MapPin size={18} color="#0A8A3A" style={tw`mt-0.5`} />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-xs font-bold text-gray-400 uppercase`}>Delivery Address</Text>
                                <Text style={tw`text-xs font-bold text-gray-900 mt-1 leading-4`}>
                                    23 Adekunle Street, Yaba, Lagos
                                </Text>
                                <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`}>Near Yaba Bus Stop</Text>
                                <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                    John Doe • 0803 123 4567
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => router.push('/(location)/map')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>View on Map</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Rider Info Card */}
                    <View style={tw`flex-row items-center justify-between bg-[#F8FAFC] p-3 rounded-2xl border border-gray-100`}>
                        <View style={tw`flex-row items-center gap-3`}>
                            <View style={tw`w-11 h-11 rounded-full bg-market-green items-center justify-center border-2 border-white shadow-xs`}>
                                <Text style={tw`text-xl`}>👨🏾‍🛵</Text>
                            </View>
                            <View>
                                <View style={tw`flex-row items-center gap-1.5`}>
                                    <Text style={tw`text-xs font-bold text-gray-900`}>Tunde A.</Text>
                                    <Text style={tw`text-[10px] font-bold text-gray-700`}>⭐ 4.8</Text>
                                </View>
                                <Text style={tw`text-[11px] font-extrabold text-gray-950 mt-0.5`}>BRT 882 QG</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={tw`border border-market-green px-3 py-1.5 rounded-xl bg-white flex-row items-center gap-1 shadow-xs`}>
                            <Phone size={12} color="#0A8A3A" />
                            <Text style={tw`text-market-green text-xs font-bold`}>Call Rider</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Payment Method */}
                    <View style={tw`flex-row items-center justify-between pt-1`}>
                        <View style={tw`flex-row items-center gap-2.5`}>
                            <Wallet size={18} color="#0A8A3A" />
                            <View>
                                <Text style={tw`text-[10px] text-gray-400 font-bold uppercase`}>Payment Method</Text>
                                <Text style={tw`text-xs font-bold text-gray-900 mt-0.5`}>useMarket Wallet</Text>
                            </View>
                        </View>

                        <Text style={tw`text-sm font-extrabold text-market-green`}>₦97,600</Text>
                    </View>
                </View>

                {/* Need Help Banner */}
                <TouchableOpacity style={tw`mx-4 my-3 bg-[#F8FAFC] rounded-2xl p-3.5 border border-gray-100 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                        <View style={tw`w-10 h-10 rounded-full bg-emerald-100 items-center justify-center`}>
                            <Headphones size={20} color="#0A8A3A" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Need help with your order?</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                Our support team is here to help you.
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={tw`border border-market-green px-3 py-1.5 rounded-xl bg-white shadow-xs flex-row items-center gap-1`}>
                        <Headphones size={12} color="#0A8A3A" />
                        <Text style={tw`text-market-green text-xs font-bold`}>Contact Support</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}