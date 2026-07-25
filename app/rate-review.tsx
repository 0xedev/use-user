import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bell,
    Check,
    Gift,
    Headphones,
    Package,
    Plus,
    ShoppingBag,
    Smile,
    Star
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RateAndReviewScreen() {
    const router = useRouter();

    const [riderRating, setRiderRating] = useState(5);
    const [appRating, setAppRating] = useState(5);
    const [selectedChips, setSelectedChips] = useState<string[]>(['On time']);
    const [riderFeedback, setRiderFeedback] = useState('');
    const [appFeedback, setAppFeedback] = useState('');

    const toggleChip = (chip: string) => {
        setSelectedChips(prev =>
            prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
        );
    };

    const handleSubmit = () => {
        router.replace('/(tabs)');
    };

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
                {/* Title & Subtitle Header */}
                <View style={tw`px-4 my-2`}>
                    <Text style={tw`text-2xl font-extrabold text-gray-950`}>Rate & Review</Text>
                    <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>
                        We value your feedback! Please rate your experience.
                    </Text>
                </View>

                {/* Order Delivered Status Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-3.5 border border-market-green/20 flex-row items-center gap-3 shadow-xs`}>
                    <View style={tw`w-7 h-7 rounded-full bg-market-green items-center justify-center`}>
                        <Check size={16} color="white" strokeWidth={3} />
                    </View>
                    <View>
                        <Text style={tw`text-xs font-bold text-market-green`}>Order Delivered</Text>
                        <Text style={tw`text-[10px] text-gray-500 font-medium mt-0.5`}>24 May 2025  •  10:32 AM</Text>
                    </View>
                </View>

                {/* Card 1: Rate Delivery Partner */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-4`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>Rate your delivery partner</Text>

                    {/* Rider Info Header */}
                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center gap-3`}>
                            <View style={tw`w-12 h-12 rounded-full bg-market-green items-center justify-center border-2 border-white shadow-xs`}>
                                <Text style={tw`text-2xl`}>👨🏾‍🛵</Text>
                            </View>
                            <View>
                                <Text style={tw`text-sm font-bold text-gray-900`}>Tunde A.</Text>
                                <Text style={tw`text-[11px] text-gray-400 font-medium mt-0.5`}>⭐ 4.8  •  128 deliveries</Text>
                                <Text style={tw`text-xs font-extrabold text-gray-950 mt-0.5`}>BRT 882 QG</Text>
                            </View>
                        </View>

                        <Text style={tw`text-3xl`}>🛵</Text>
                    </View>

                    {/* Star Rating Section */}
                    <View style={tw`items-center my-1`}>
                        <Text style={tw`text-xs font-bold text-gray-800 mb-2`}>
                            How would you rate your delivery experience?
                        </Text>

                        <View style={tw`flex-row items-center gap-2 mb-1`}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRiderRating(star)}>
                                    <Star size={32} color="#0A8A3A" fill={star <= riderRating ? '#0A8A3A' : 'transparent'} />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={tw`text-xs font-bold text-market-green`}>Excellent</Text>
                    </View>

                    {/* Feedback Tags Chips */}
                    <View>
                        <Text style={tw`text-[11px] font-bold text-gray-700 mb-2`}>
                            Tell us more about your delivery (optional)
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-2`}>
                            {[
                                { label: 'On time', icon: <Smile size={14} color="#0A8A3A" /> },
                                { label: 'Friendly rider', icon: <Smile size={14} color="#0A8A3A" /> },
                                { label: 'Good packaging', icon: <Package size={14} color="#0A8A3A" /> },
                                { label: 'Other', icon: <Plus size={14} color="#0A8A3A" /> },
                            ].map((chip) => {
                                const isSelected = selectedChips.includes(chip.label);

                                return (
                                    <TouchableOpacity
                                        key={chip.label}
                                        onPress={() => toggleChip(chip.label)}
                                        style={tw`flex-row items-center gap-1.5 px-3 py-2 rounded-xl border ${
                                            isSelected
                                                ? 'border-market-green bg-[#F0FDF4]'
                                                : 'border-gray-200 bg-white'
                                        }`}
                                    >
                                        {chip.icon}
                                        <Text style={tw`text-xs font-bold ${isSelected ? 'text-market-green' : 'text-gray-700'}`}>
                                            {chip.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* Rider Feedback Input Box */}
                    <View style={tw`border border-gray-200 rounded-2xl p-3 bg-white`}>
                        <TextInput
                            style={tw`text-xs text-gray-900 min-h-16 font-medium`}
                            placeholder="Share more details about your delivery..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            maxLength={200}
                            value={riderFeedback}
                            onChangeText={setRiderFeedback}
                            textAlignVertical="top"
                        />
                        <Text style={tw`text-[10px] text-gray-400 font-medium text-right mt-1`}>
                            {riderFeedback.length}/200
                        </Text>
                    </View>
                </View>

                {/* Card 2: Rate useMarket */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-3`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>Rate useMarket</Text>

                    <View style={tw`items-center my-1`}>
                        <Text style={tw`text-xs font-bold text-gray-800 mb-2`}>
                            How would you rate your overall experience?
                        </Text>

                        <View style={tw`flex-row items-center gap-2 mb-1`}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setAppRating(star)}>
                                    <Star size={32} color="#0A8A3A" fill={star <= appRating ? '#0A8A3A' : 'transparent'} />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={tw`text-xs font-bold text-market-green`}>Excellent</Text>
                    </View>

                    {/* App Feedback Input Box */}
                    <View>
                        <Text style={tw`text-[11px] font-bold text-gray-700 mb-2`}>
                            What did you love about useMarket? (optional)
                        </Text>

                        <View style={tw`border border-gray-200 rounded-2xl p-3 bg-white`}>
                            <TextInput
                                style={tw`text-xs text-gray-900 min-h-16 font-medium`}
                                placeholder="Share your experience with our service..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                maxLength={200}
                                value={appFeedback}
                                onChangeText={setAppFeedback}
                                textAlignVertical="top"
                            />
                            <Text style={tw`text-[10px] text-gray-400 font-medium text-right mt-1`}>
                                {appFeedback.length}/200
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Reward Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3.5 flex-1 pr-2`}>
                        <View style={tw`w-12 h-12 rounded-2xl bg-market-green/10 items-center justify-center`}>
                            <Gift size={22} color="#0A8A3A" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Thank You!</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                You'll earn <Text style={tw`text-market-green font-bold`}>50 points</Text> for your review.
                            </Text>
                            <View style={tw`flex-row items-center gap-1 mt-1`}>
                                <Text style={tw`text-xs`}>🪙</Text>
                                <Text style={tw`text-[10px] font-bold text-gray-600`}>useMarket Points</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={tw`text-2xl font-extrabold text-market-green`}>+50</Text>
                </View>

                {/* Skip & Submit Buttons */}
                <View style={tw`px-4 my-3 flex-row items-center gap-3`}>
                    <TouchableOpacity
                        style={tw`w-28 border border-gray-200 py-3.5 rounded-2xl flex-row items-center justify-center bg-white`}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={tw`text-gray-800 text-xs font-bold`}>Skip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`flex-1 bg-market-green py-3.5 rounded-2xl flex-row items-center justify-center shadow-sm`}
                        onPress={handleSubmit}
                        activeOpacity={0.85}
                    >
                        <Text style={tw`text-white text-sm font-bold`}>Submit Review</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}