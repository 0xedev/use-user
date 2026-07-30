import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ChevronDown,
    Heart,
    MapPin,
    Search,
    SlidersHorizontal,
    Star,
    Truck
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const filterCategories = [
    { id: 'all', name: 'All Vendors', icon: null },
    { id: 'restaurants', name: 'Restaurants', icon: '🍔' },
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'butcheries', name: 'Butcheries', icon: '🥩' },
    { id: 'bakery', name: 'Bakery', icon: '🥐' },
];

const vendorList = [
    {
        id: 'mama-t-kitchen',
        name: "Mama T's Kitchen",
        badge: 'Featured',
        badgeType: 'featured',
        category: 'African Dishes • Local Cuisine',
        rating: '4.9',
        reviewsCount: '512',
        priceTier: '$$',
        time: '20-30 min',
        freeDeliveryThreshold: '₦5,000+',
        discountOffer: '20% OFF',
        discountSub: 'First order',
        image: require('@/assets/images/grocery-bag-hero.png'),
        logo: '🍲',
        logoBg: 'bg-amber-100',
        type: 'Restaurants',
    },
    {
        id: 'freshmart',
        name: 'FreshMart Superstore',
        badge: null,
        category: 'Groceries • Household • Essentials',
        rating: '4.8',
        reviewsCount: '1.2k',
        priceTier: '$$',
        time: '30-40 min',
        freeDeliveryThreshold: '₦7,000+',
        discountOffer: '15% OFF',
        discountSub: 'Orders ₦10k+',
        image: require('@/assets/images/prod-rice.png'),
        logo: '🛒',
        logoBg: 'bg-emerald-100',
        type: 'Groceries',
    },
    {
        id: 'chicken-republic',
        name: 'Chicken Republic',
        badge: 'Verified',
        badgeType: 'verified',
        category: 'Fast Food • Chicken • Burgers',
        rating: '4.7',
        reviewsCount: '856',
        priceTier: '$$',
        time: '20-30 min',
        freeDeliveryThreshold: '₦4,000+',
        discountOffer: '10% OFF',
        discountSub: 'Today',
        image: require('@/assets/images/prod-tomatoes.png'),
        logo: '🐔',
        logoBg: 'bg-red-100',
        type: 'Restaurants',
    },
    {
        id: 'prime-cuts',
        name: 'Prime Cuts Butchery',
        badge: 'Verified',
        badgeType: 'verified',
        category: 'Meat • Poultry • Seafood',
        rating: '4.9',
        reviewsCount: '632',
        priceTier: '$$$',
        time: '30-45 min',
        freeDeliveryThreshold: '₦8,000+',
        discountOffer: 'Free Gift',
        discountSub: 'Orders ₦15k+',
        image: require('@/assets/images/prod-oil.png'),
        logo: '🥩',
        logoBg: 'bg-rose-100',
        type: 'Butcheries',
    },
    {
        id: 'bakers-hub',
        name: "Baker's Hub",
        badge: null,
        category: 'Bakery • Cakes • Pastries',
        rating: '4.6',
        reviewsCount: '412',
        priceTier: '$$',
        time: '20-30 min',
        freeDeliveryThreshold: '₦4,000+',
        discountOffer: 'Buy 1 Get 1',
        discountSub: 'On selected items',
        image: require('@/assets/images/prod-cornflakes.png'),
        logo: '🥐',
        logoBg: 'bg-amber-100',
        type: 'Bakery',
    },
    {
        id: 'the-salad-bar',
        name: 'The Salad Bar',
        badge: null,
        category: 'Healthy Food • Salads • Smoothies',
        rating: '4.8',
        reviewsCount: '305',
        priceTier: '$$',
        time: '25-35 min',
        freeDeliveryThreshold: '₦5,000+',
        discountOffer: '20% OFF',
        discountSub: 'Healthy bowls',
        image: require('@/assets/images/prod-banana.png'),
        logo: '🥑',
        logoBg: 'bg-emerald-100',
        type: 'Restaurants',
    },
];

export default function AllVendorsScreen() {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (id: string) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const filteredVendors = vendorList.filter(vendor => {
        const matchesCategory =
            selectedFilter === 'all' ||
            vendor.type.toLowerCase() === selectedFilter.toLowerCase();
        const matchesSearch =
            vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* 1. Header Bar */}
            <View style={tw`px-4 pt-2 pb-2 flex-row items-center justify-between border-b border-gray-100`}>
                <View style={tw`flex-row items-center gap-3 flex-1`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`w-9 h-9 items-center justify-center`}>
                        <ArrowLeft size={22} color="#171717" />
                    </TouchableOpacity>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-xl font-extrabold text-gray-950`}>All Vendors</Text>
                        <Text style={tw`text-xs text-gray-400 font-medium`}>Discover trusted vendors near you</Text>
                    </View>
                </View>

                {/* Location Dropdown Selector */}
                <TouchableOpacity
                    style={tw`flex-row items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full`}
                    onPress={() => router.push('/(location)/index')}
                >
                    <MapPin size={13} color="#0A8A3A" />
                    <Text style={tw`text-xs font-bold text-gray-800`}>Lekki Phase 1</Text>
                    <ChevronDown size={13} color="#171717" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* 2. Search & Filter Input Bar */}
                <View style={tw`px-4 my-3 flex-row items-center gap-2.5`}>
                    <View style={tw`flex-1 flex-row items-center border border-gray-200 rounded-2xl px-3.5 h-12 bg-gray-50/50`}>
                        <Search size={18} color="#9CA3AF" style={tw`mr-2.5`} />
                        <TextInput
                            style={tw`flex-1 text-xs text-gray-900 h-full font-medium`}
                            placeholder="Search vendors, stores or products..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <TouchableOpacity style={tw`w-12 h-12 rounded-2xl border border-gray-200 items-center justify-center bg-white shadow-2xs`}>
                        <SlidersHorizontal size={18} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* 3. Filter Category Pills Scroll */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 my-1`}>
                    {filterCategories.map((cat) => {
                        const isSelected = selectedFilter === cat.id;

                        return (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setSelectedFilter(cat.id)}
                                style={tw`flex-row items-center gap-1.5 px-4 py-2 rounded-2xl border ${isSelected
                                    ? 'border-market-green bg-[#F0FDF4]'
                                    : 'border-gray-200 bg-white'
                                    }`}
                                activeOpacity={0.8}
                            >
                                {cat.icon && <Text style={tw`text-xs`}>{cat.icon}</Text>}
                                <Text
                                    style={tw`text-xs font-bold ${isSelected ? 'text-market-green' : 'text-gray-700'
                                        }`}
                                >
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* 4. Sort Dropdown & Vendors Count */}
                <View style={tw`px-4 mt-3 mb-2 flex-row items-center justify-between`}>
                    <TouchableOpacity style={tw`flex-row items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Sort by:</Text>
                        <Text style={tw`text-xs font-bold text-gray-900`}>Popular</Text>
                        <ChevronDown size={14} color="#171717" />
                    </TouchableOpacity>

                    <Text style={tw`text-xs font-semibold text-gray-400`}>
                        {filteredVendors.length} Vendors found
                    </Text>
                </View>

                {/* 5. Vendors Vertical Cards List */}
                <View style={tw`px-4 gap-3.5 my-2`}>
                    {filteredVendors.map((vendor) => {
                        const isFav = favorites.includes(vendor.id);

                        return (
                            <TouchableOpacity
                                key={vendor.id}
                                onPress={() => router.push(`/store/${vendor.id}` as any)}
                                style={tw`bg-white rounded-3xl border border-gray-100 p-3.5 shadow-2xs flex-row gap-3.5 relative`}
                                activeOpacity={0.9}
                            >
                                {/* Left Vendor Image & Logo Badge Overlay */}
                                <View style={tw`w-28 h-28 rounded-2xl ${vendor.logoBg} items-center justify-center relative overflow-hidden`}>
                                    <Text style={tw`text-5xl`}>{vendor.logo}</Text>

                                    <View style={tw`absolute bottom-1.5 left-1.5 w-8 h-8 rounded-xl bg-white items-center justify-center border border-gray-100 shadow-xs`}>
                                        <Text style={tw`text-base`}>{vendor.logo}</Text>
                                    </View>
                                </View>

                                {/* Center Vendor Info */}
                                <View style={tw`flex-1 justify-between py-0.5 pr-6`}>
                                    <View>
                                        <View style={tw`flex-row items-center gap-1.5 flex-wrap`}>
                                            <Text style={tw`text-sm font-extrabold text-gray-950`} numberOfLines={1}>
                                                {vendor.name}
                                            </Text>

                                            {vendor.badge === 'Featured' && (
                                                <View style={tw`bg-emerald-100 px-1.5 py-0.5 rounded-md flex-row items-center gap-0.5`}>
                                                    <Text style={tw`text-[9px] font-bold text-market-green`}>✪ Featured</Text>
                                                </View>
                                            )}

                                            {vendor.badge === 'Verified' && (
                                                <View style={tw`bg-blue-100 px-1.5 py-0.5 rounded-md flex-row items-center gap-0.5`}>
                                                    <Text style={tw`text-[9px] font-bold text-blue-600`}>✔ Verified</Text>
                                                </View>
                                            )}
                                        </View>

                                        <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`} numberOfLines={1}>
                                            {vendor.category}
                                        </Text>

                                        <View style={tw`flex-row items-center gap-1.5 mt-1.5`}>
                                            <Star size={12} color="#FACC15" fill="#FACC15" />
                                            <Text style={tw`text-xs font-bold text-gray-800`}>{vendor.rating}</Text>
                                            <Text style={tw`text-[10px] text-gray-400 font-medium`}>({vendor.reviewsCount})</Text>
                                            <Text style={tw`text-gray-300 text-xs`}>•</Text>
                                            <Text style={tw`text-[10px] text-gray-500 font-bold`}>{vendor.priceTier}</Text>
                                            <Text style={tw`text-gray-300 text-xs`}>•</Text>
                                            <Text style={tw`text-[10px] text-gray-500 font-bold`}>{vendor.time}</Text>
                                        </View>
                                    </View>

                                    {/* Free Delivery Footer Strip */}
                                    <View style={tw`flex-row items-center gap-1 mt-2`}>
                                        <Truck size={12} color="#0A8A3A" />
                                        <Text style={tw`text-[10px] font-bold text-market-green`}>
                                            Free delivery on orders {vendor.freeDeliveryThreshold}
                                        </Text>
                                    </View>
                                </View>

                                {/* Right Top Heart & Right Bottom Discount Box */}
                                <TouchableOpacity
                                    style={tw`absolute top-3.5 right-3.5 z-10`}
                                    onPress={() => toggleFavorite(vendor.id)}
                                >
                                    <Heart
                                        size={18}
                                        color={isFav ? '#EF4444' : '#9CA3AF'}
                                        fill={isFav ? '#EF4444' : 'transparent'}
                                    />
                                </TouchableOpacity>

                                {vendor.discountOffer && (
                                    <View style={tw`absolute bottom-3.5 right-3.5 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-xl items-end`}>
                                        <Text style={tw`text-xs font-extrabold text-market-green`}>{vendor.discountOffer}</Text>
                                        <Text style={tw`text-[8px] text-gray-500 font-semibold`}>{vendor.discountSub}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}