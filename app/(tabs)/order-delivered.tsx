import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    Check,
    ChevronRight,
    Download,
    Headphones,
    Info,
    MapPin,
    Phone,
    RefreshCw,
    Share2,
    ShoppingBag,
    Star,
    Tag
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderDeliveredScreen() {
    const router = useRouter();
    const [riderRating, setRiderRating] = useState(5);
    const [appRating, setAppRating] = useState(5);

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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-12`}>
                {/* Order Delivered Header & Confetti Circle */}
                <View style={tw`items-center my-4`}>
                    <View style={tw`w-20 h-20 rounded-full bg-emerald-100 items-center justify-center shadow-xs my-2`}>
                        <View style={tw`w-14 h-14 rounded-full bg-market-green items-center justify-center`}>
                            <Check size={32} color="white" strokeWidth={3} />
                        </View>
                    </View>

                    <Text style={tw`text-2xl font-extrabold text-gray-950 text-center mt-2`}>
                        Order Delivered!
                    </Text>
                    <Text style={tw`text-xs text-gray-500 font-medium text-center mt-1 leading-4 px-6`}>
                        Your order has been delivered successfully.{'\n'}Thank you for shopping with useMarket.
                    </Text>
                </View>

                {/* Delivered Location & Timestamp Card */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-3xl p-4 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3.5 flex-1 pr-2`}>
                        <View style={tw`w-12 h-12 rounded-2xl bg-market-green/10 items-center justify-center`}>
                            <Text style={tw`text-2xl`}>🛍️</Text>
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Delivered to</Text>
                            <Text style={tw`text-xs font-bold text-gray-900 mt-0.5`} numberOfLines={1}>
                                23 Adekunle Street, Yaba, Lagos
                            </Text>
                            <Text style={tw`text-[10px] text-gray-500 font-medium mt-0.5`}>
                                Today, 24 May 2025  •  10:32 AM
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={tw`border border-market-green px-3 py-1.5 rounded-xl bg-white flex-row items-center gap-1 shadow-xs`}
                        onPress={() => router.push('/(location)/map')}
                    >
                        <MapPin size={12} color="#0A8A3A" />
                        <Text style={tw`text-market-green text-xs font-bold`}>View on Map</Text>
                    </TouchableOpacity>
                </View>

                {/* Delivery Partner Summary Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
                    <Text style={tw`text-xs font-bold text-gray-900 mb-3`}>Delivery Partner</Text>

                    <View style={tw`flex-row items-center justify-between`}>
                        {/* Rider Info */}
                        <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                            <View style={tw`w-12 h-12 rounded-full bg-market-green items-center justify-center border-2 border-white shadow-xs`}>
                                <Text style={tw`text-2xl`}>👨🏾‍🛵</Text>
                            </View>

                            <View style={tw`flex-1`}>
                                <View style={tw`flex-row items-center gap-1.5`}>
                                    <Text style={tw`text-sm font-bold text-gray-900`}>Tunde A.</Text>
                                    <Text style={tw`text-xs font-bold text-gray-700`}>⭐ 4.8</Text>
                                </View>
                                <Text style={tw`text-xs font-extrabold text-gray-950 mt-0.5`}>BRT 882 QG</Text>

                                <TouchableOpacity style={tw`flex-row items-center gap-1 mt-1.5`}>
                                    <Phone size={12} color="#0A8A3A" />
                                    <Text style={tw`text-xs font-bold text-market-green`}>Call Rider</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={tw`w-px h-16 bg-gray-100 mx-1`} />

                        {/* Scooter Graphic & Subtext */}
                        <View style={tw`items-center flex-1`}>
                            <Text style={tw`text-3xl my-1`}>🛵</Text>
                            <Text style={tw`text-[10px] font-semibold text-gray-400 text-center`}>
                                Thanks for riding with us!
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Order Summary Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-2.5`}>
                    <View style={tw`flex-row items-center justify-between mb-1`}>
                        <Text style={tw`text-sm font-bold text-gray-900`}>
                            Order Summary <Text style={tw`text-xs font-semibold text-gray-400`}>(3 items)</Text>
                        </Text>
                        <TouchableOpacity style={tw`flex-row items-center gap-0.5`} onPress={() => router.push('/(tabs)/orders')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>View Details</Text>
                            <ChevronRight size={14} color="#0A8A3A" />
                        </TouchableOpacity>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Subtotal</Text>
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
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Total Paid</Text>
                        <Text style={tw`text-xl font-extrabold text-market-green`}>₦97,600</Text>
                    </View>

                    {/* Savings Pill */}
                    <View style={tw`bg-[#F0FDF4] border border-market-green/20 rounded-xl p-2.5 flex-row items-center gap-2 mt-1`}>
                        <Tag size={14} color="#0A8A3A" />
                        <Text style={tw`text-xs font-bold text-market-green`}>You saved ₦11,000 on this order</Text>
                    </View>
                </View>

                {/* "Rate Your Experience" Double Cards */}
                <View style={tw`mx-4 my-3`}>
                    <View style={tw`bg-gray-100 self-start px-3 py-1 rounded-t-xl mb-0.5`}>
                        <Text style={tw`text-[10px] font-bold text-gray-700`}>Rate your experience</Text>
                    </View>

                    <View style={tw`flex-row gap-3`}>
                        {/* Rate Rider Card */}
                        <View style={tw`flex-1 bg-[#F8FAFC] border border-gray-100 rounded-2xl p-3.5 items-center shadow-xs`}>
                            <Text style={tw`text-[11px] font-bold text-gray-800`}>Rate Tunde A.</Text>
                            <View style={tw`flex-row items-center gap-1 my-2`}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity key={star} onPress={() => setRiderRating(star)}>
                                        <Star size={16} color="#0A8A3A" fill={star <= riderRating ? '#0A8A3A' : 'transparent'} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={tw`text-[10px] font-bold text-market-green`}>Amazing delivery!</Text>
                        </View>

                        {/* Rate App Card */}
                        <View style={tw`flex-1 bg-[#F8FAFC] border border-gray-100 rounded-2xl p-3.5 items-center shadow-xs`}>
                            <Text style={tw`text-[11px] font-bold text-gray-800`}>Rate useMarket</Text>
                            <View style={tw`flex-row items-center gap-1 my-2`}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity key={star} onPress={() => setAppRating(star)}>
                                        <Star size={16} color="#0A8A3A" fill={star <= appRating ? '#0A8A3A' : 'transparent'} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={tw`text-[10px] font-bold text-market-green`}>Great service!</Text>
                        </View>
                    </View>
                </View>

                {/* 3 Action Buttons Row */}
                <View style={tw`px-4 my-2 flex-row items-center gap-2.5`}>
                    <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3 rounded-2xl flex-row items-center justify-center gap-1.5 bg-white shadow-xs`}>
                        <Download size={14} color="#171717" />
                        <Text style={tw`text-[11px] font-bold text-gray-800`}>Download Receipt</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3 rounded-2xl flex-row items-center justify-center gap-1.5 bg-white shadow-xs`}>
                        <RefreshCw size={14} color="#171717" />
                        <Text style={tw`text-[11px] font-bold text-gray-800`}>Reorder</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3 rounded-2xl flex-row items-center justify-center gap-1.5 bg-white shadow-xs`}>
                        <Share2 size={14} color="#171717" />
                        <Text style={tw`text-[11px] font-bold text-gray-800`}>Share Order</Text>
                    </TouchableOpacity>
                </View>

                {/* Primary CTA: Continue Shopping */}
                <TouchableOpacity
                    style={tw`mx-4 mt-3 bg-market-green py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm`}
                    onPress={() => router.replace('/(tabs)')}
                    activeOpacity={0.85}
                >
                    <Text style={tw`text-white text-sm font-bold`}>Continue Shopping</Text>
                    <ArrowRight size={18} color="white" />
                </TouchableOpacity>

                {/* Need Help Banner */}
                <TouchableOpacity style={tw`mx-4 my-4 bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3.5 flex-1 pr-2`}>
                        <View style={tw`w-10 h-10 rounded-full bg-emerald-100 items-center justify-center`}>
                            <Headphones size={20} color="#0A8A3A" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Need help with your order?</Text>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>
                                Our support team is here to help
                            </Text>
                        </View>
                    </View>

                    <ChevronRight size={18} color="#9CA3AF" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}