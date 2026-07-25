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
    ShoppingCart,
    Truck
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const marketplaceCategories = [
    { id: 1, name: 'Fashion', icon: '🛍️', bg: 'bg-purple-50' },
    { id: 2, name: 'Phones &\nTablets', icon: '📱', bg: 'bg-purple-50' },
    { id: 3, name: 'Electronics', icon: '💻', bg: 'bg-purple-50' },
    { id: 4, name: 'Home &\nLiving', icon: '🛋️', bg: 'bg-purple-50' },
    { id: 5, name: 'Beauty &\nHealth', icon: '🧴', bg: 'bg-purple-50' },
    { id: 6, name: 'Sports &\nOutdoors', icon: '⚽', bg: 'bg-purple-50' },
    { id: 7, name: 'All\nCategories', icon: '🎛️', bg: 'bg-gray-100' },
];

const bestDeals = [
    {
        id: 1,
        name: 'Zeblaze GTR 3 Pro Smart Watch',
        rating: '4.6',
        reviews: '128',
        price: '₦28,500',
        oldPrice: '₦38,000',
        discount: '-25%',
        image: require('@/assets/images/prod-apple.png'), // Replace with watch asset
    },
    {
        id: 2,
        name: "Women's Leather Handbag",
        rating: '4.7',
        reviews: '93',
        price: '₦16,400',
        oldPrice: '₦20,000',
        discount: '-18%',
        image: require('@/assets/images/grocery-bag-small.png'), // Replace with bag asset
    },
    {
        id: 3,
        name: 'Anker Soundcore Life Q30',
        rating: '4.5',
        reviews: '201',
        price: '₦45,900',
        oldPrice: '₦54,000',
        discount: '-15%',
        image: require('@/assets/images/prod-milo.png'), // Replace with headphone asset
    },
    {
        id: 4,
        name: "Men's Casual Shirt",
        rating: '4.4',
        reviews: '76',
        price: '₦8,900',
        oldPrice: '₦11,500',
        discount: '-22%',
        image: require('@/assets/images/prod-rice.png'), // Replace with shirt asset
    },
];

const popularStores = [
    {
        id: 1,
        name: 'Jumia',
        rating: '4.6',
        time: '15-30 min',
        items: '312 items',
        verified: true,
        logo: require('@/assets/images/store-freshmart.png'),
    },
    {
        id: 2,
        name: 'Pointek',
        rating: '4.5',
        time: '20-35 min',
        items: '256 items',
        verified: true,
        logo: require('@/assets/images/store-shoprite.png'),
    },
    {
        id: 3,
        name: 'Konga',
        rating: '4.4',
        time: '25-40 min',
        items: '198 items',
        verified: true,
        logo: require('@/assets/images/store-justrite.png'),
    },
    {
        id: 4,
        name: 'Slot',
        rating: '4.5',
        time: '20-30 min',
        items: '145 items',
        verified: true,
        logo: require('@/assets/images/store-medplus.png'),
    },
];

export default function MarketplaceHomeScreen() {
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
            {/* Header Brand Bar */}
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
                            placeholder="Search for products, brands and more..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <Camera size={18} color="#9CA3AF" />
                    </View>
                </View>

                {/* Hero Promotion Banner (Purple Marketplace Theme) */}
                <View style={tw`mx-4 my-2 bg-[#F3E8FF] rounded-3xl p-5 relative overflow-hidden flex-row items-center justify-between border border-purple-200/50`}>
                    <View style={tw`w-3/5 z-10 pr-2`}>
                        <Text style={tw`text-2xl font-extrabold text-gray-950 leading-7`}>
                            Everything you want,{'\n'}
                            <Text style={tw`text-[#7C3AED]`}>from trusted sellers</Text>
                        </Text>
                        <Text style={tw`text-xs text-gray-600 font-medium mt-2 leading-4`}>
                            Shop fashion, electronics, home essentials and more.
                        </Text>

                        {/* CTA Button */}
                        <TouchableOpacity
                            style={tw`bg-[#6D28D9] px-4 py-2.5 rounded-xl flex-row items-center gap-1.5 self-start mt-4 shadow-sm`}
                            onPress={() => router.push('/(tabs)/categories')}
                        >
                            <Text style={tw`text-white text-xs font-bold`}>Shop Now</Text>
                            <ArrowRight size={14} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Banner Hero Graphics & Offer Badge */}
                    <View style={tw`w-2/5 items-center justify-center relative`}>
                        <Image
                            source={require('@/assets/images/grocery-bag-hero.png')}
                            style={tw`w-32 h-32`}
                            resizeMode="contain"
                        />
                        {/* 40% OFF Badge */}
                        <View style={tw`absolute -bottom-1 -right-1 bg-[#6D28D9] w-14 h-14 rounded-full items-center justify-center border-2 border-white shadow-md`}>
                            <Text style={tw`text-[8px] font-bold text-white/80 uppercase`}>Up to</Text>
                            <Text style={tw`text-xs font-extrabold text-white`}>40%</Text>
                            <Text style={tw`text-[8px] font-bold text-white/80 uppercase`}>OFF</Text>
                        </View>
                    </View>
                </View>

                {/* Carousel Pagination Dots */}
                <View style={tw`flex-row justify-center gap-1.5 my-2`}>
                    <View style={tw`w-6 h-1 bg-[#7C3AED] rounded-full`} />
                    <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
                    <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
                    <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
                </View>

                {/* Category Horizontal Scroll Grid */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 my-3`}>
                    {marketplaceCategories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={tw`items-center gap-1.5 w-18`}
                            onPress={() => router.push('/(tabs)/categories')}
                        >
                            <View style={tw`w-16 h-16 rounded-2xl ${cat.bg} items-center justify-center border border-purple-100 shadow-xs`}>
                                <Text style={tw`text-2xl`}>{cat.icon}</Text>
                            </View>
                            <Text style={tw`text-[11px] font-semibold text-gray-800 text-center leading-3.5`}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Trust Badges Strip */}
                <View style={tw`mx-4 my-3 bg-[#FAF5FF] rounded-2xl py-3 px-4 border border-purple-100 flex-row items-center justify-around shadow-xs`}>
                    <View style={tw`flex-row items-center gap-2`}>
                        <ShieldCheck size={18} color="#7C3AED" />
                        <View>
                            <Text style={tw`text-[11px] font-bold text-gray-900`}>Buyer Protection</Text>
                            <Text style={tw`text-[9px] text-gray-500`}>Shop with confidence</Text>
                        </View>
                    </View>

                    <View style={tw`w-px h-6 bg-purple-200`} />

                    <View style={tw`flex-row items-center gap-2`}>
                        <Truck size={18} color="#7C3AED" />
                        <View>
                            <Text style={tw`text-[11px] font-bold text-gray-900`}>Fast & Reliable</Text>
                            <Text style={tw`text-[9px] text-gray-500`}>Nationwide delivery</Text>
                        </View>
                    </View>

                    <View style={tw`w-px h-6 bg-purple-200`} />

                    <View style={tw`flex-row items-center gap-2`}>
                        <RotateCcw size={18} color="#7C3AED" />
                        <View>
                            <Text style={tw`text-[11px] font-bold text-gray-900`}>Easy Returns</Text>
                            <Text style={tw`text-[9px] text-gray-500`}>7-day return policy</Text>
                        </View>
                    </View>
                </View>

                {/* Best Deals For You Section */}
                <View style={tw`flex-row justify-between items-center px-4 mt-4 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Best deals for you</Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/categories')}>
                        <Text style={tw`text-xs font-bold text-[#7C3AED]`}>See all</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Horizontal Scroll List */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-2`}>
                    {bestDeals.map((item) => {
                        const isLiked = wishlist.includes(item.id);

                        return (
                            <View key={item.id} style={tw`w-42 bg-white rounded-2xl border border-gray-100 p-3 shadow-xs relative`}>
                                {/* Discount Pill Badge */}
                                <View style={tw`absolute top-3 left-3 bg-purple-100 px-2 py-0.5 rounded-md z-10`}>
                                    <Text style={tw`text-[10px] font-bold text-[#7C3AED]`}>{item.discount}</Text>
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
                                <Text style={tw`text-xs font-bold text-gray-900 leading-4 mt-1`} numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <Text style={tw`text-[10px] text-gray-500 font-semibold mt-1`}>
                                    ⭐ {item.rating} ({item.reviews})
                                </Text>

                                {/* Pricing & Add Button */}
                                <View style={tw`flex-row items-end justify-between mt-2`}>
                                    <View>
                                        <Text style={tw`text-sm font-extrabold text-gray-900`}>{item.price}</Text>
                                        <Text style={tw`text-[10px] text-gray-400 line-through`}>{item.oldPrice}</Text>
                                    </View>
                                    <TouchableOpacity style={tw`w-8 h-8 rounded-xl bg-[#7C3AED] items-center justify-center shadow-xs`}>
                                        <ShoppingCart size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Popular Stores Near You Section */}
                <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Popular stores near you</Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/categories')}>
                        <Text style={tw`text-xs font-bold text-[#7C3AED]`}>See all</Text>
                    </TouchableOpacity>
                </View>

                {/* Stores Horizontal Scroll List */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-2`}>
                    {popularStores.map((store) => (
                        <TouchableOpacity
                            key={store.id}
                            style={tw`w-48 bg-white rounded-2xl border border-gray-100 p-3.5 shadow-xs`}
                            activeOpacity={0.9}
                        >
                            <View style={tw`items-center my-2`}>
                                <Image source={store.logo} style={tw`w-14 h-14 rounded-full border border-gray-100`} resizeMode="contain" />
                            </View>

                            <View style={tw`flex-row items-center justify-center gap-1 mt-1`}>
                                <Text style={tw`text-sm font-bold text-gray-900`}>{store.name}</Text>
                                {store.verified && (
                                    <View style={tw`w-4 h-4 rounded-full bg-market-green items-center justify-center`}>
                                        <Text style={tw`text-white text-[9px] font-bold`}>✓</Text>
                                    </View>
                                )}
                            </View>

                            <Text style={tw`text-[11px] text-gray-500 font-medium text-center mt-1`}>
                                ⭐ {store.rating}
                            </Text>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold text-center mt-0.5`}>
                                {store.time}
                            </Text>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold text-center mt-0.5`}>
                                {store.items}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}