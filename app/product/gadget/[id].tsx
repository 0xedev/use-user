import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    Headphones,
    Heart,
    MessageSquare,
    ShoppingBag
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const storageOptions = ['128GB', '256GB', '512GB', '1TB'];
const colorOptions = [
    { name: 'Deep Purple', bg: 'bg-purple-900' },
    { name: 'Gold', bg: 'bg-amber-200' },
    { name: 'Silver', bg: 'bg-gray-200' },
    { name: 'Space Black', bg: 'bg-gray-900' },
];

export default function DedicatedGadgetScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [selectedStorage, setSelectedStorage] = useState('128GB');
    const [selectedColor, setSelectedColor] = useState('Deep Purple');
    const [liked, setLiked] = useState(false);

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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-28`}>
                {/* Breadcrumb Path */}
                <View style={tw`px-4 my-1 flex-row items-center gap-1.5 flex-wrap`}>
                    <Text style={tw`text-[10px] text-gray-500 font-medium`}>Marketplace</Text>
                    <Text style={tw`text-[10px] text-gray-300`}>›</Text>
                    <Text style={tw`text-[10px] text-gray-500 font-medium`}>TechWorld Store</Text>
                    <Text style={tw`text-[10px] text-gray-300`}>›</Text>
                    <Text style={tw`text-[10px] text-gray-500 font-medium`}>Smartphones</Text>
                    <Text style={tw`text-[10px] text-gray-300`}>›</Text>
                    <Text style={tw`text-[10px] font-bold text-gray-900`}>iPhone 14 Pro</Text>
                </View>

                {/* Main Product Section */}
                <View style={tw`px-4 my-2 flex-row gap-4 items-start`}>
                    {/* Image Gallery */}
                    <View style={tw`w-1/2 bg-white rounded-3xl border border-gray-100 p-3 shadow-xs items-center relative`}>
                        <View style={tw`absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded-md z-10`}>
                            <Text style={tw`text-[9px] font-bold text-white`}>Best Seller</Text>
                        </View>

                        <TouchableOpacity
                            style={tw`absolute top-3 right-3 z-10`}
                            onPress={() => setLiked(!liked)}
                        >
                            <Heart size={20} color={liked ? '#EF4444' : '#9CA3AF'} fill={liked ? '#EF4444' : 'transparent'} />
                        </TouchableOpacity>

                        <Image
                            source={require('@/assets/images/prod-apple.png')}
                            style={tw`w-36 h-48 my-4`}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Meta Options */}
                    <View style={tw`w-1/2 justify-between py-1`}>
                        <TouchableOpacity style={tw`flex-row items-center justify-between border-b border-gray-100 pb-2 mb-2`}>
                            <View style={tw`flex-row items-center gap-2`}>
                                <View style={tw`w-7 h-7 rounded-full bg-black items-center justify-center`}>
                                    <Text style={tw`text-[9px] font-bold text-white`}>TF</Text>
                                </View>
                                <Text style={tw`text-xs font-bold text-gray-900`}>TechWorld ✔️</Text>
                            </View>
                            <ChevronRight size={16} color="#9CA3AF" />
                        </TouchableOpacity>

                        <Text style={tw`text-base font-extrabold text-gray-950 leading-5`}>
                            Apple iPhone 14 Pro 128GB - Deep Purple
                        </Text>

                        <Text style={tw`text-2xl font-extrabold text-market-green mt-2`}>₦780,000</Text>

                        {/* Storage Selection */}
                        <Text style={tw`text-xs font-bold text-gray-900 mt-3 mb-1`}>Storage: {selectedStorage}</Text>
                        <View style={tw`flex-row flex-wrap gap-1.5`}>
                            {storageOptions.map((st) => (
                                <TouchableOpacity
                                    key={st}
                                    onPress={() => setSelectedStorage(st)}
                                    style={tw`px-2.5 py-1 rounded-lg border ${selectedStorage === st ? 'border-market-green bg-[#F0FDF4]' : 'border-gray-200'
                                        }`}
                                >
                                    <Text style={tw`text-[10px] font-bold ${selectedStorage === st ? 'text-market-green' : 'text-gray-700'}`}>
                                        {st}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Delivery Info */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-2`}>
                    <Text style={tw`text-xs font-bold text-gray-900`}>Delivery Options</Text>
                    <View style={tw`flex-row justify-between`}>
                        <Text style={tw`text-xs text-gray-500`}>Standard Delivery</Text>
                        <Text style={tw`text-xs font-bold text-market-green`}>FREE</Text>
                    </View>
                    <View style={tw`flex-row justify-between`}>
                        <Text style={tw`text-xs text-gray-500`}>Express Delivery</Text>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦2,500</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex-row items-center gap-2.5 shadow-lg`}>
                <TouchableOpacity style={tw`border border-gray-200 px-3.5 py-3 rounded-2xl flex-row items-center gap-1 bg-white`}>
                    <MessageSquare size={16} color="#171717" />
                    <Text style={tw`text-xs font-bold text-gray-800`}>Chat Store</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex-1 border border-market-green py-3 rounded-2xl items-center bg-white`} onPress={() => router.push('/cart')}>
                    <Text style={tw`text-market-green text-xs font-bold`}>Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex-1 bg-market-green py-3 rounded-2xl items-center`} onPress={() => router.push('/checkout/delivery')}>
                    <Text style={tw`text-white text-xs font-bold`}>⚡ Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}