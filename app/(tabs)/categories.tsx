import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowRight,
    Bell,
    ChevronDown,
    MapPin,
    Plus,
    Search,
    ShoppingBag,
    SlidersHorizontal,
    Star
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. Service Quick Category Cards Dataset
const mainServices = [
    {
        id: 'food',
        title: 'Order Food',
        sub: 'From restaurants near you',
        icon: '🍔',
        bgColor: 'bg-orange-50/80',
        borderColor: 'border-orange-100',
        btnColor: 'bg-[#EF4444]',
        route: '/(tabs)/category-detail',
    },
    {
        id: 'groceries',
        title: 'Shop Groceries',
        sub: 'Fresh & fast delivery',
        icon: '🛍️',
        bgColor: 'bg-emerald-50/80',
        borderColor: 'border-emerald-100',
        btnColor: 'bg-[#10B981]',
        route: '/(tabs)/category/rice-grains',
    },
    {
        id: 'pharmacy',
        title: 'Pharmacy',
        sub: 'Health essentials delivered',
        icon: '💊',
        bgColor: 'bg-purple-50/80',
        borderColor: 'border-purple-100',
        btnColor: 'bg-[#8B5CF6]',
        route: '/store/medplus',
    },
    {
        id: 'package',
        title: 'Send Package',
        sub: 'Fast & reliable delivery',
        icon: '📦',
        bgColor: 'bg-sky-50/80',
        borderColor: 'border-sky-100',
        btnColor: 'bg-[#3B82F6]',
        route: '/(tabs)?service=logistics',
    },
];

// 2. Popular Stores Dataset
const popularStores = [
    { id: 'shoprite', name: 'Shoprite', rating: '4.6', time: '20-30 min', logo: '🔴', logoBg: 'bg-red-50' },
    { id: 'spar', name: 'Spar', rating: '4.5', time: '25-35 min', logo: '🌲', logoBg: 'bg-emerald-50' },
    { id: 'kfc', name: 'KFC', rating: '4.7', time: '20-30 min', logo: '🍗', logoBg: 'bg-rose-50' },
    { id: 'chicken-republic', name: 'Chicken Republic', rating: '4.6', time: '20-30 min', logo: '🐔', logoBg: 'bg-amber-50' },
    { id: 'dominos', name: "Domino's Pizza", rating: '4.5', time: '20-30 min', logo: '🍕', logoBg: 'bg-blue-50' },
    { id: 'ebeano', name: 'Prince Ebeano', rating: '4.4', time: '30-40 min', logo: '🛒', logoBg: 'bg-green-50' },
];

// 3. Featured Vendors Dataset
const featuredVendors = [
    { id: 1, name: "Mama T's Kitchen", tag: 'African Dishes', rating: '4.9', time: '20-30 min', priceTier: '₦₦', emoji: '🍲', bg: 'bg-amber-100' },
    { id: 2, name: 'Healthy Bites', tag: 'Salads & Smoothies', rating: '4.8', time: '15-25 min', priceTier: '₦₦', emoji: '🥗', bg: 'bg-emerald-100' },
    { id: 3, name: 'Grill Master', tag: 'Grills & Shawarma', rating: '4.7', time: '20-30 min', priceTier: '₦₦', emoji: '🥩', bg: 'bg-orange-100' },
    { id: 4, name: 'The Salad Bar', tag: 'Healthy Food', rating: '4.8', time: '15-25 min', priceTier: '₦₦', emoji: '🥑', bg: 'bg-teal-100' },
];

// 4. Trending Products Dataset
const trendingProducts = [
    { id: 1, name: 'Indomie Chicken', price: '₦350', image: require('@/assets/images/prod-indomie.png') },
    { id: 2, name: 'Coca Cola 50cl', price: '₦600', image: require('@/assets/images/prod-oil.png') },
    { id: 3, name: 'Fresh Tomatoes (1kg)', price: '₦1,200', image: require('@/assets/images/prod-tomatoes.png') },
    { id: 4, name: 'Milo 400g', price: '₦1,800', image: require('@/assets/images/prod-milo.png') },
    { id: 5, name: 'Stallion Rice 50kg', price: '₦68,500', image: require('@/assets/images/prod-rice.png') },
];

export default function CategoriesScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount] = useState(2);

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* 1. Header Bar with User Greeting & Badges */}
            <View style={tw`px-4 pt-2 pb-2 flex-row items-center justify-between`}>
                <View style={tw`flex-1`}>
                    <Text style={tw`text-xs text-gray-500 font-medium`}>Good Afternoon,</Text>
                    <Text style={tw`text-2xl font-bold text-gray-950 tracking-tight`}>
                        George 👋
                    </Text>

                    {/* Location Delivery Dropdown */}
                    <TouchableOpacity
                        style={tw`flex-row items-center gap-1 mt-1`}
                        onPress={() => router.push('/(location)/index')}
                        activeOpacity={0.8}
                    >
                        <MapPin size={14} color="#0A8A3A" />
                        <Text style={tw`text-xs font-bold text-gray-800`}>Lekki Phase 1, Lagos</Text>
                        <ChevronDown size={14} color="#171717" />
                    </TouchableOpacity>
                </View>

                {/* Right Action Icons (Notifications & Cart) */}
                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity style={tw`relative w-10 h-10 items-center justify-center bg-gray-50 rounded-full`}>
                        <Bell size={20} color="#171717" />
                        <View style={tw`absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full items-center justify-center border border-white`}>
                            <Text style={tw`text-white text-[9px] font-bold`}>3</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`relative w-10 h-10 items-center justify-center bg-gray-50 rounded-full`}
                        onPress={() => router.push('/cart')}
                    >
                        <ShoppingBag size={20} color="#171717" />
                        <View style={tw`absolute top-1 right-1 w-4 h-4 bg-market-green rounded-full items-center justify-center border border-white`}>
                            <Text style={tw`text-white text-[9px] font-bold`}>{cartCount}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-12`}>
                {/* 2. Search & Filter Input Bar */}
                <View style={tw`px-4 my-3 flex-row items-center gap-2.5`}>
                    <View style={tw`flex-1 flex-row items-center border border-gray-200 rounded-2xl px-3.5 h-12 bg-gray-50/50`}>
                        <Search size={18} color="#9CA3AF" style={tw`mr-2.5`} />
                        <TextInput
                            style={tw`flex-1 text-xs text-gray-900 h-full font-medium`}
                            placeholder="Search stores, vendors, products or dishes..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <TouchableOpacity style={tw`w-12 h-12 rounded-2xl border border-gray-200 items-center justify-center bg-white shadow-2xs`}>
                        <SlidersHorizontal size={18} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* 3. Hero Promo Banner ("DEALS NEAR YOU") */}
                <View style={tw`mx-4 my-2 bg-[#064E3B] rounded-3xl p-5 relative overflow-hidden flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`w-3/5 z-10 pr-2`}>
                        <View style={tw`flex-row items-center gap-1 mb-1`}>
                            <Text style={tw`text-xs`}>🔥</Text>
                            <Text style={tw`text-[10px] font-bold text-amber-300 uppercase tracking-wider`}>Deals Near You</Text>
                        </View>

                        <Text style={tw`text-2xl font-extrabold text-white leading-7`}>
                            Up to <Text style={tw`text-amber-300`}>40% OFF</Text>
                        </Text>
                        <Text style={tw`text-xs text-white/80 font-medium mt-0.5 leading-4`}>
                            on groceries & more
                        </Text>

                        <TouchableOpacity
                            style={tw`bg-white px-4 py-2 rounded-full flex-row items-center gap-1 self-start mt-3.5 shadow-xs`}
                            onPress={() => router.push('/(tabs)/category-detail')}
                            activeOpacity={0.9}
                        >
                            <Text style={tw`text-gray-950 text-xs font-bold`}>Shop Deals</Text>
                            <ChevronDown size={14} color="#171717" style={{ transform: [{ rotate: '-90deg' }] }} />
                        </TouchableOpacity>
                    </View>

                    {/* Banner Hero Image */}
                    <View style={tw`w-2/5 items-center justify-center relative`}>
                        <Image
                            source={require('@/assets/images/grocery-bag-hero.png')}
                            style={tw`w-32 h-32`}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Carousel Pagination Dots */}
                    <View style={tw`absolute bottom-2.5 left-1/2 -ml-4 flex-row items-center gap-1`}>
                        <View style={tw`w-2 h-2 rounded-full bg-white`} />
                        <View style={tw`w-1.5 h-1.5 rounded-full bg-white/40`} />
                        <View style={tw`w-1.5 h-1.5 rounded-full bg-white/40`} />
                    </View>
                </View>

                {/* 4. "What would you like today?" Service Categories Grid */}
                <View style={tw`px-4 mt-5 mb-3`}>
                    <Text style={tw`text-base font-extrabold text-gray-950 mb-3`}>
                        What would you like today?
                    </Text>

                    <View style={tw`flex-row flex-wrap justify-between gap-y-3`}>
                        {mainServices.map((service) => (
                            <TouchableOpacity
                                key={service.id}
                                onPress={() => router.push(service.route as any)}
                                style={tw`w-[48.5%] ${service.bgColor} border ${service.borderColor} rounded-3xl p-3.5 justify-between h-36 relative overflow-hidden shadow-2xs`}
                                activeOpacity={0.88}
                            >
                                <View style={tw`w-12 h-12 rounded-2xl bg-white/80 items-center justify-center shadow-2xs`}>
                                    <Text style={tw`text-2xl`}>{service.icon}</Text>
                                </View>

                                <View style={tw`pr-6`}>
                                    <Text style={tw`text-sm font-bold text-gray-900 leading-4`}>
                                        {service.title}
                                    </Text>
                                    <Text style={tw`text-[10px] text-gray-500 font-medium mt-1 leading-3`} numberOfLines={2}>
                                        {service.sub}
                                    </Text>
                                </View>

                                {/* Circular Action Arrow Button */}
                                <View style={tw`absolute bottom-3 right-3 w-7 h-7 rounded-full ${service.btnColor} items-center justify-center shadow-xs`}>
                                    <ArrowRight size={14} color="white" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 5. Popular Stores Section */}
                <View style={tw`mt-5 mb-2`}>
                    <View style={tw`flex-row justify-between items-center px-4 mb-3`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Popular Stores</Text>
                        <TouchableOpacity onPress={() => router.push('/stores')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
                        {popularStores.map((store) => (
                            <TouchableOpacity
                                key={store.id}
                                onPress={() => router.push(`/store/${store.id}` as any)}
                                style={tw`w-28 bg-white rounded-2xl border border-gray-100 p-3 items-center justify-between shadow-2xs`}
                                activeOpacity={0.85}
                            >
                                <View style={tw`w-12 h-12 rounded-2xl ${store.logoBg} items-center justify-center border border-gray-100 shadow-2xs my-1`}>
                                    <Text style={tw`text-2xl`}>{store.logo}</Text>
                                </View>

                                <Text style={tw`text-xs font-bold text-gray-900 text-center mt-1`} numberOfLines={1}>
                                    {store.name}
                                </Text>

                                <View style={tw`flex-row items-center gap-1 mt-1`}>
                                    <Text style={tw`text-[10px] font-bold text-gray-700`}>{store.rating}</Text>
                                    <Star size={10} color="#D97706" fill="#D97706" />
                                </View>

                                <Text style={tw`text-[9px] text-gray-400 font-semibold mt-0.5`}>
                                    {store.time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                {/* 6. Featured Vendors Section */}
                <View style={tw`mt-5 mb-2`}>
                    <View style={tw`flex-row justify-between items-center px-4 mb-3`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Featured Vendors</Text>
                        <TouchableOpacity onPress={() => router.push('/vendors')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    {/* ... */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5`}>
                        {featuredVendors.map((vendor) => (
                            <TouchableOpacity
                                key={vendor.id}
                                style={tw`w-48 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-2xs`}
                                activeOpacity={0.88}
                            >
                                {/* Hero Vendor Banner Image */}
                                <View style={tw`h-28 ${vendor.bg} items-center justify-center relative`}>
                                    <Text style={tw`text-5xl`}>{vendor.emoji}</Text>

                                    {/* Rating Badge */}
                                    <View style={tw`absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded-full flex-row items-center gap-1`}>
                                        <Star size={10} color="#FACC15" fill="#FACC15" />
                                        <Text style={tw`text-[10px] font-bold text-white`}>{vendor.rating}</Text>
                                    </View>
                                </View>

                                <View style={tw`p-3`}>
                                    <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>
                                        {vendor.name}
                                    </Text>
                                    <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`}>
                                        {vendor.tag}
                                    </Text>
                                    <Text style={tw`text-[10px] font-bold text-gray-600 mt-1`}>
                                        {vendor.time} • <Text style={tw`text-market-green`}>{vendor.priceTier}</Text>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                {/* 7. Trending Products Section */}
                <View style={tw`mt-5 mb-2`}>
                    <View style={tw`flex-row justify-between items-center px-4 mb-3`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Trending Products</Text>
                        <TouchableOpacity onPress={() => router.push('/trending')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
                        {trendingProducts.map((prod) => (
                            <View
                                key={prod.id}
                                style={tw`w-32 bg-white rounded-2xl border border-gray-100 p-2.5 shadow-2xs justify-between`}
                            >
                                <TouchableOpacity
                                    style={tw`items-center justify-center h-24 bg-gray-50/50 rounded-xl p-1 mb-2`}
                                    onPress={() => router.push(`/product/${prod.id}`)}
                                >
                                    <Image source={prod.image} style={tw`w-16 h-16`} resizeMode="contain" />
                                </TouchableOpacity>

                                <View>
                                    <Text style={tw`text-xs font-bold text-gray-900 leading-4`} numberOfLines={2}>
                                        {prod.name}
                                    </Text>

                                    <View style={tw`flex-row items-center justify-between mt-2`}>
                                        <Text style={tw`text-xs font-extrabold text-gray-950`}>{prod.price}</Text>

                                        <TouchableOpacity style={tw`w-6.5 h-6.5 rounded-full bg-market-green items-center justify-center shadow-2xs`}>
                                            <Plus size={14} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}