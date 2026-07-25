import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowRight,
    Bell,
    Camera,
    ChevronDown,
    Heart,
    MapPin,
    RotateCcw,
    Search,
    ShieldCheck,
    ShoppingBag,
    ShoppingCart
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const gadgetCategories = [
    { id: 1, name: 'Phones', icon: '📱', bg: 'bg-blue-50' },
    { id: 2, name: 'Laptops', icon: '💻', bg: 'bg-blue-50' },
    { id: 3, name: 'Accessories', icon: '🎧', bg: 'bg-blue-50' },
    { id: 4, name: 'Tablets', icon: '📲', bg: 'bg-blue-50' },
    { id: 5, name: 'Wearables', icon: '⌚', bg: 'bg-blue-50' },
    { id: 6, name: 'All\nCategories', icon: '🎛️', bg: 'bg-gray-100' },
];

const bestDeals = [
    {
        id: 1,
        name: 'iPhone 15 Pro Max',
        specs: '256GB',
        price: '₦1,450,000',
        oldPrice: '₦1,770,000',
        discount: '-18%',
        image: require('@/assets/images/prod-apple.png'), // Replace with iPhone asset
    },
    {
        id: 2,
        name: 'HP Pavilion 15',
        specs: 'Core i5, 8GB RAM, 512GB SSD',
        price: '₦620,000',
        oldPrice: '₦730,000',
        discount: '-15%',
        image: require('@/assets/images/grocery-bag-small.png'), // Replace with Laptop asset
    },
    {
        id: 3,
        name: 'AirPods Pro (2nd Gen)',
        specs: 'USB-C',
        price: '₦290,000',
        oldPrice: '₦360,000',
        discount: '-20%',
        image: require('@/assets/images/prod-milo.png'), // Replace with AirPods asset
    },
    {
        id: 4,
        name: 'Samsung Galaxy Watch 6',
        specs: '44mm Bluetooth',
        price: '₦180,000',
        oldPrice: '₦200,000',
        discount: '-10%',
        image: require('@/assets/images/prod-rice.png'), // Replace with Smartwatch asset
    },
];

const topBrands = [
    { id: 1, name: 'Apple', logoText: '🍎' },
    { id: 2, name: 'Samsung', logoText: 'SAMSUNG' },
    { id: 3, name: 'HP', logoText: 'hp' },
    { id: 4, name: 'Dell', logoText: 'DELL' },
    { id: 5, name: 'Lenovo', logoText: 'Lenovo' },
    { id: 6, name: 'More', logoText: '🎛️' },
];

export default function GadgetsScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState<number[]>([]);

    const toggleWishlist = (id: number) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header Bar */}
            <View style={tw`px-4 pt-2 pb-1 flex-row items-center justify-between`}>
                <Text style={tw`text-2xl font-bold text-black`}>
                    <Text style={tw`text-market-green`}>use</Text>Market
                </Text>

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
                            <Text style={tw`text-white text-[9px] font-bold`}>2</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Delivery Location Sub-Header */}
            <TouchableOpacity
                style={tw`px-4 pb-2 flex-row items-center gap-1.5`}
                onPress={() => router.push('/(location)/index')}
            >
                <MapPin size={18} color="#0A8A3A" />
                <Text style={tw`text-[11px] text-gray-500 font-medium`}>Deliver to</Text>
                <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>
                    23 Adekunle Street, Yaba, Lagos
                </Text>
                <ChevronDown size={14} color="#171717" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* Search Bar Input */}
                <View style={tw`px-4 my-2`}>
                    <View style={tw`flex-row items-center border border-gray-200 rounded-2xl px-4 h-13 bg-white shadow-xs`}>
                        <Search size={18} color="#9CA3AF" style={tw`mr-3`} />
                        <TextInput
                            style={tw`flex-1 text-sm text-gray-900 h-full font-medium`}
                            placeholder="Search for phones, laptops, accessories..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <Camera size={18} color="#9CA3AF" />
                    </View>
                </View>

                {/* Hero Promotion Banner (Blue Tech Theme) */}
                <View style={tw`mx-4 my-2 bg-[#EFF6FF] rounded-3xl p-5 relative overflow-hidden flex-row items-center justify-between border border-blue-100`}>
                    <View style={tw`w-3/5 z-10 pr-2`}>
                        <Text style={tw`text-2xl font-extrabold text-gray-950 leading-7`}>
                            Your favorite{'\n'}
                            <Text style={tw`text-[#1D4ED8]`}>gadgets & more</Text>
                        </Text>
                        <Text style={tw`text-xs text-gray-600 font-medium mt-2 leading-4`}>
                            Top brands, best prices and fast delivery.
                        </Text>

                        {/* CTA Button */}
                        <TouchableOpacity
                            style={tw`bg-[#1D4ED8] px-4 py-2.5 rounded-xl flex-row items-center gap-1.5 self-start mt-4 shadow-sm`}
                            onPress={() => router.push('/(tabs)/categories')}
                        >
                            <Text style={tw`text-white text-xs font-bold`}>Shop Now</Text>
                            <ArrowRight size={14} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Banner Hero Tech Graphic & Offer Badge */}
                    <View style={tw`w-2/5 items-center justify-center relative`}>
                        <Image
                            source={require('@/assets/images/grocery-bag-hero.png')} // Replace with Laptop / Gadget asset
                            style={tw`w-32 h-32`}
                            resizeMode="contain"
                        />
                        {/* 25% OFF Badge */}
                        <View style={tw`absolute -bottom-1 -right-1 bg-[#1D4ED8] w-14 h-14 rounded-full items-center justify-center border-2 border-white shadow-md`}>
                            <Text style={tw`text-[8px] font-bold text-white/80 uppercase`}>Up to</Text>
                            <Text style={tw`text-xs font-extrabold text-white`}>25%</Text>
                            <Text style={tw`text-[8px] font-bold text-white/80 uppercase`}>OFF</Text>
                        </View>
                    </View>
                </View>

                {/* Carousel Pagination Dots */}
                <View style={tw`flex-row justify-center gap-1.5 my-2`}>
                    <View style={tw`w-6 h-1 bg-[#1D4ED8] rounded-full`} />
                    <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
                    <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
                </View>

                {/* Category Horizontal Scroll Grid */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 my-3`}>
                    {gadgetCategories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={tw`items-center gap-1.5 w-18`}
                            onPress={() => router.push('/(tabs)/categories')}
                        >
                            <View style={tw`w-16 h-16 rounded-2xl ${cat.bg} items-center justify-center border border-blue-100 shadow-xs`}>
                                <Text style={tw`text-2xl`}>{cat.icon}</Text>
                            </View>
                            <Text style={tw`text-[11px] font-semibold text-gray-800 text-center leading-3.5`}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Trust Guarantees Strip */}
                <View style={tw`mx-4 my-3 bg-[#F8FAFC] rounded-2xl py-3 px-3 border border-gray-100 flex-row items-center justify-around shadow-xs`}>
                    <View style={tw`flex-row items-center gap-1.5`}>
                        <ShieldCheck size={16} color="#1D4ED8" />
                        <View>
                            <Text style={tw`text-[10px] font-bold text-gray-900`}>100% Original</Text>
                            <Text style={tw`text-[8px] text-gray-400`}>Genuine products</Text>
                        </View>
                    </View>

                    <View style={tw`w-px h-5 bg-gray-200`} />

                    <View style={tw`flex-row items-center gap-1.5`}>
                        <ShieldCheck size={16} color="#1D4ED8" />
                        <View>
                            <Text style={tw`text-[10px] font-bold text-gray-900`}>1 Year Warranty</Text>
                            <Text style={tw`text-[8px] text-gray-400`}>On most products</Text>
                        </View>
                    </View>

                    <View style={tw`w-px h-5 bg-gray-200`} />

                    <View style={tw`flex-row items-center gap-1.5`}>
                        <RotateCcw size={16} color="#1D4ED8" />
                        <View>
                            <Text style={tw`text-[10px] font-bold text-gray-900`}>Easy Returns</Text>
                            <Text style={tw`text-[8px] text-gray-400`}>7-day return policy</Text>
                        </View>
                    </View>
                </View>

                {/* Best Deals For You Section */}
                <View style={tw`flex-row justify-between items-center px-4 mt-4 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Best deals for you</Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/categories')}>
                        <Text style={tw`text-xs font-bold text-[#1D4ED8]`}>See all</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Horizontal Scroll List */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-2`}>
                    {bestDeals.map((item) => {
                        const isLiked = wishlist.includes(item.id);

                        return (
                            <View key={item.id} style={tw`w-42 bg-white rounded-2xl border border-gray-100 p-3 shadow-xs relative`}>
                                {/* Discount Pill Badge */}
                                <View style={tw`absolute top-3 left-3 bg-blue-100 px-2 py-0.5 rounded-md z-10`}>
                                    <Text style={tw`text-[10px] font-bold text-[#1D4ED8]`}>{item.discount}</Text>
                                </View>

                                {/* Like Heart Button */}
                                <TouchableOpacity
                                    style={tw`absolute top-3 right-3 z-10`}
                                    onPress={() => toggleWishlist(item.id)}
                                >
                                    <Heart
                                        size={18}
                                        color={isLiked ? '#EF4444' : '#9CA3AF'}
                                        fill={isLiked ? '#EF4444' : 'transparent'}
                                    />
                                </TouchableOpacity>

                                {/* Image Preview */}
                                <TouchableOpacity
                                    style={tw`items-center justify-center my-2 h-28 bg-gray-50/50 rounded-xl p-2`}
                                    onPress={() => router.push(`/product/${item.id}`)}
                                >
                                    <Image source={item.image} style={tw`w-20 h-20`} resizeMode="contain" />
                                </TouchableOpacity>

                                {/* Product Info */}
                                <Text style={tw`text-xs font-bold text-gray-900 leading-4 mt-1`} numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`} numberOfLines={1}>
                                    {item.specs}
                                </Text>

                                {/* Pricing & Add Button */}
                                <View style={tw`flex-row items-end justify-between mt-2`}>
                                    <View>
                                        <Text style={tw`text-sm font-extrabold text-gray-900`}>{item.price}</Text>
                                        <Text style={tw`text-[10px] text-gray-400 line-through`}>{item.oldPrice}</Text>
                                    </View>
                                    <TouchableOpacity style={tw`w-8 h-8 rounded-xl bg-[#1D4ED8] items-center justify-center shadow-xs`}>
                                        <ShoppingCart size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Exclusive Deals & Early Access Card */}
                <View style={tw`mx-4 my-4 bg-[#EFF6FF] rounded-2xl p-4 border border-blue-100 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                        <Text style={tw`text-3xl`}>🎁</Text>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Get exclusive deals & early access</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                Sign in to unlock personalized offers just for you.
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={tw`border border-[#1D4ED8] px-3 py-2 rounded-xl bg-white shadow-xs`}
                        onPress={() => router.push('/(auth)/login')}
                    >
                        <Text style={tw`text-[#1D4ED8] text-xs font-bold`}>Sign In / Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Top Brands Section */}
                <View style={tw`flex-row justify-between items-center px-4 mt-2 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Top brands</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-xs font-bold text-[#1D4ED8]`}>View all</Text>
                    </TouchableOpacity>
                </View>

                {/* Brands Horizontal Scroll */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3 pb-2`}>
                    {topBrands.map((brand) => (
                        <TouchableOpacity
                            key={brand.id}
                            style={tw`w-24 h-20 bg-white rounded-2xl border border-gray-100 items-center justify-center p-2 shadow-xs`}
                        >
                            <Text style={tw`text-sm font-extrabold text-gray-900 text-center`}>
                                {brand.logoText}
                            </Text>
                            <Text style={tw`text-[10px] font-semibold text-gray-500 mt-1`}>
                                {brand.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}