import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowRight,
    Bell,
    ChevronDown,
    Heart,
    MapPin,
    Scan,
    Search,
    ShieldCheck,
    ShoppingBag,
    ShoppingCart
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const foodCategories = [
    { id: 1, name: 'Rice &\nGrains', icon: '🍚', bg: 'bg-amber-50' },
    { id: 2, name: 'Beans &\nPulses', icon: '🫘', bg: 'bg-red-50' },
    { id: 3, name: 'CookingOil', icon: '🍾', bg: 'bg-amber-50' },
    { id: 4, name: 'Spices &\nSeasoning', icon: '🧂', bg: 'bg-orange-50' },
    { id: 5, name: 'Snacks &\nDrinks', icon: '🥤', bg: 'bg-emerald-50' },
    { id: 6, name: 'Baby &\nKids', icon: '🍼', bg: 'bg-blue-50' },
    { id: 7, name: 'All\nCategories', icon: '🎛️', bg: 'bg-gray-100' },
];

const bestDeals = [
    {
        id: 1,
        name: 'Stallion Premium Parboiled Rice',
        unit: '50kg',
        price: '₦68,500',
        oldPrice: '₦78,000',
        discount: '-12%',
        image: require('@/assets/images/prod-rice.png'),
    },
    {
        id: 2,
        name: 'Golden Penny Cooking Oil',
        unit: '5L',
        price: '₦12,400',
        oldPrice: '₦13,500',
        discount: '-8%',
        image: require('@/assets/images/prod-oil.png'),
    },
    {
        id: 3,
        name: 'Golden Penny Beans (Brown)',
        unit: '1kg',
        price: '₦2,300',
        oldPrice: '₦2,700',
        discount: '-15%',
        image: require('@/assets/images/prod-tomatoes.png'), // Replace with beans asset
    },
    {
        id: 4,
        name: 'Maggi Chicken Flavour',
        unit: '70g (Pack)',
        price: '₦450',
        oldPrice: '₦500',
        discount: '-10%',
        image: require('@/assets/images/prod-indomie.png'), // Replace with Maggi asset
    },
];

const popularStores = [
    {
        id: 1,
        name: 'Gloo Mart',
        rating: '4.6',
        time: '20-30 min',
        items: '1,250+ items',
        verified: true,
        logoBg: 'bg-emerald-600',
        logoText: 'gloo mart',
    },
    {
        id: 2,
        name: 'Konga Fresh',
        rating: '4.5',
        time: '25-35 min',
        items: '980+ items',
        verified: true,
        logoBg: 'bg-pink-600',
        logoText: 'konga FRESH',
    },
    {
        id: 3,
        name: 'More Food Store',
        rating: '4.4',
        time: '15-25 min',
        items: '750+ items',
        verified: true,
        logoBg: 'bg-emerald-100',
        logoText: '🛒',
    },
    {
        id: 4,
        name: 'SuperSaver',
        rating: '4.3',
        time: '30-40 min',
        items: '920+ items',
        verified: true,
        logoBg: 'bg-blue-700',
        logoText: 'Super Saver',
    },
];

export default function FoodsScreen() {
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
                            placeholder="Search for rice, beans, oil, vegetables..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <Scan size={18} color="#9CA3AF" />
                    </View>
                </View>

                {/* Hero Promotion Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-3xl p-5 relative overflow-hidden flex-row items-center justify-between border border-market-green/10`}>
                    <View style={tw`w-3/5 z-10 pr-2`}>
                        <Text style={tw`text-2xl font-extrabold text-gray-900 leading-7`}>
                            Fresh groceries,{'\n'}
                            <Text style={tw`text-market-green`}>delivered fast</Text>
                        </Text>
                        <Text style={tw`text-xs text-gray-500 font-medium mt-2 leading-4`}>
                            Quality food items from trusted sellers near you.
                        </Text>

                        {/* CTA Button */}
                        <TouchableOpacity
                            style={tw`bg-market-green px-4 py-2.5 rounded-xl flex-row items-center gap-1.5 self-start mt-4 shadow-sm`}
                            onPress={() => router.push('/(tabs)/category-detail')}
                        >
                            <Text style={tw`text-white text-xs font-bold`}>Shop Groceries</Text>
                            <ArrowRight size={14} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Banner Hero Image & Checklist */}
                    <View style={tw`w-2/5 items-center justify-center relative`}>
                        <Image
                            source={require('@/assets/images/grocery-bag-hero.png')}
                            style={tw`w-32 h-32`}
                            resizeMode="contain"
                        />
                        {/* Highlights List */}
                        <View style={tw`absolute top-1 right-0 bg-white/90 px-2 py-1 rounded-lg border border-emerald-100 shadow-xs gap-0.5`}>
                            <Text style={tw`text-[9px] font-bold text-market-green`}>✓ Fresh</Text>
                            <Text style={tw`text-[9px] font-bold text-market-green`}>✓ Quality</Text>
                            <Text style={tw`text-[9px] font-bold text-market-green`}>✓ Affordable</Text>
                        </View>
                    </View>
                </View>

                {/* Carousel Pagination Dots */}
                <View style={tw`flex-row justify-center gap-1.5 my-2`}>
                    <View style={tw`w-6 h-1 bg-market-green rounded-full`} />
                    <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
                    <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
                </View>

                {/* Food Categories Horizontal Scroll Grid */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 my-3`}>
                    {foodCategories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={tw`items-center gap-1.5 w-18`}
                        >
                            <View style={tw`w-16 h-16 rounded-2xl ${cat.bg} items-center justify-center border border-emerald-100 shadow-xs`}>
                                <Text style={tw`text-2xl`}>{cat.icon}</Text>
                            </View>
                            <Text style={tw`text-[11px] font-semibold text-gray-800 text-center leading-3.5`}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Best Deals For You Section */}
                <View style={tw`flex-row justify-between items-center px-4 mt-4 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Best deals for you</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Horizontal Scroll List */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-2`}>
                    {bestDeals.map((item) => {
                        const isLiked = wishlist.includes(item.id);

                        return (
                            <View key={item.id} style={tw`w-40 bg-white rounded-2xl border border-gray-100 p-3 shadow-xs relative`}>
                                {/* Discount Pill Badge */}
                                <View style={tw`absolute top-3 left-3 bg-emerald-100 px-2 py-0.5 rounded-md z-10`}>
                                    <Text style={tw`text-[10px] font-bold text-market-green`}>{item.discount}</Text>
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
                                <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{item.unit}</Text>

                                {/* Pricing & Add Button */}
                                <View style={tw`flex-row items-end justify-between mt-2`}>
                                    <View>
                                        <Text style={tw`text-sm font-extrabold text-gray-900`}>{item.price}</Text>
                                        <Text style={tw`text-[10px] text-gray-400 line-through`}>{item.oldPrice}</Text>
                                    </View>
                                    <TouchableOpacity style={tw`w-8 h-8 rounded-xl bg-market-green items-center justify-center shadow-xs`}>
                                        <ShoppingCart size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Popular Stores Near You Header */}
                <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Popular stores near you</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
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
                                <View style={tw`w-14 h-14 rounded-full ${store.logoBg} items-center justify-center border border-gray-100`}>
                                    <Text style={tw`text-[10px] font-extrabold text-white text-center px-1`}>
                                        {store.logoText}
                                    </Text>
                                </View>
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
                                {store.rating} ⭐
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

                {/* Trust Quality Banner */}
                <View style={tw`mx-4 my-4 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3.5 flex-1 pr-2`}>
                        <View style={tw`w-10 h-10 rounded-full bg-market-green items-center justify-center`}>
                            <ShieldCheck size={20} color="white" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>100% Quality Assurance</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                Get fresh and genuine products or your money back.
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={tw`border border-market-green px-3.5 py-2 rounded-xl bg-white shadow-xs`}>
                        <Text style={tw`text-market-green text-xs font-bold`}>Learn More</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}