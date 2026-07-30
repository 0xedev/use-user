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

const storeFilterCategories = [
    { id: 'all', name: 'All Stores', icon: null },
    { id: 'supermarkets', name: 'Supermarkets', icon: '🛒' },
    { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
    { id: 'restaurants', name: 'Restaurants', icon: '👨‍🍳' },
    { id: 'meat', name: 'Meat & Seafood', icon: '🥩' },
];

const popularStoresList = [
    {
        id: 'shoprite',
        name: 'Shoprite',
        tag: 'Supermarket',
        tagType: 'supermarket',
        category: 'Supermarket • Groceries • Essentials',
        rating: '4.6',
        reviews: '2.3k',
        priceTier: '$$',
        time: '20-30 min',
        freeDeliveryThreshold: '₦10,000+',
        discount: '20% OFF',
        discountSub: 'First order',
        distance: '1.2 km',
        logo: '🔴',
        logoBg: 'bg-red-50',
        type: 'supermarkets',
    },
    {
        id: 'spar',
        name: 'SPAR',
        tag: 'Supermarket',
        tagType: 'supermarket',
        category: 'Groceries • Home Essentials • Fresh Produce',
        rating: '4.5',
        reviews: '1.8k',
        priceTier: '$$',
        time: '25-35 min',
        freeDeliveryThreshold: '₦8,000+',
        discount: '15% OFF',
        discountSub: 'First order',
        distance: '1.6 km',
        logo: '🌲',
        logoBg: 'bg-emerald-50',
        type: 'supermarkets',
    },
    {
        id: 'kfc',
        name: 'KFC',
        tag: 'Fast Food',
        tagType: 'fastfood',
        category: 'Fast Food • Chicken • Burgers',
        rating: '4.7',
        reviews: '3.1k',
        priceTier: '$$',
        time: '20-30 min',
        freeDeliveryThreshold: '₦6,000+',
        discount: '10% OFF',
        discountSub: 'Today only',
        distance: '0.8 km',
        logo: '🍗',
        logoBg: 'bg-rose-50',
        type: 'fast-food',
    },
    {
        id: 'chicken-republic',
        name: 'Chicken Republic',
        tag: 'Fast Food',
        tagType: 'fastfood',
        category: 'Fast Food • Chicken • Local Flavours',
        rating: '4.6',
        reviews: '2.0k',
        priceTier: '$$',
        time: '20-30 min',
        freeDeliveryThreshold: '₦6,000+',
        discount: '10% OFF',
        discountSub: 'First order',
        distance: '1.0 km',
        logo: '🐔',
        logoBg: 'bg-amber-50',
        type: 'fast-food',
    },
    {
        id: 'dominos',
        name: "Domino's Pizza",
        tag: 'Fast Food',
        tagType: 'fastfood',
        category: 'Pizza • Fast Food • Sides',
        rating: '4.5',
        reviews: '1.6k',
        priceTier: '$$',
        time: '25-35 min',
        freeDeliveryThreshold: '₦7,000+',
        discount: '15% OFF',
        discountSub: 'First order',
        distance: '1.4 km',
        logo: '🍕',
        logoBg: 'bg-blue-50',
        type: 'fast-food',
    },
    {
        id: 'ebeano',
        name: 'Prince Ebeano Supermarket',
        tag: 'Supermarket',
        tagType: 'supermarket',
        category: 'Groceries • Beverages • Household',
        rating: '4.4',
        reviews: '1.2k',
        priceTier: '$$',
        time: '30-40 min',
        freeDeliveryThreshold: '₦8,000+',
        discount: '5% OFF',
        discountSub: 'First order',
        distance: '2.1 km',
        logo: '🛒',
        logoBg: 'bg-green-50',
        type: 'supermarkets',
    },
];

export default function PopularStoresScreen() {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (id: string) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const filteredStores = popularStoresList.filter(store => {
        const matchesCategory =
            selectedFilter === 'all' || store.type === selectedFilter;
        const matchesSearch =
            store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.category.toLowerCase().includes(searchQuery.toLowerCase());
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
                        <Text style={tw`text-xl font-extrabold text-gray-950`}>Popular Stores</Text>
                        <Text style={tw`text-xs text-gray-400 font-medium`}>Top-rated stores near you</Text>
                    </View>
                </View>

                {/* Location Dropdown */}
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
                {/* 2. Search & Filter Bar */}
                <View style={tw`px-4 my-3 flex-row items-center gap-2.5`}>
                    <View style={tw`flex-1 flex-row items-center border border-gray-200 rounded-2xl px-3.5 h-12 bg-gray-50/50`}>
                        <Search size={18} color="#9CA3AF" style={tw`mr-2.5`} />
                        <TextInput
                            style={tw`flex-1 text-xs text-gray-900 h-full font-medium`}
                            placeholder="Search stores, products or categories..."
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
                    {storeFilterCategories.map((cat) => {
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

                {/* 4. Sort Dropdown & Count Row */}
                <View style={tw`px-4 mt-3 mb-2 flex-row items-center justify-between`}>
                    <TouchableOpacity style={tw`flex-row items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Sort by:</Text>
                        <Text style={tw`text-xs font-bold text-gray-900`}>Popular</Text>
                        <ChevronDown size={14} color="#171717" />
                    </TouchableOpacity>

                    <Text style={tw`text-xs font-semibold text-gray-400`}>
                        {filteredStores.length} Stores found
                    </Text>
                </View>

                {/* 5. Stores Vertical List */}
                <View style={tw`px-4 gap-3.5 my-2`}>
                    {filteredStores.map((store) => {
                        const isFav = favorites.includes(store.id);

                        return (
                            <TouchableOpacity
                                key={store.id}
                                onPress={() => router.push(`/store/${store.id}` as any)}
                                style={tw`bg-white rounded-3xl border border-gray-100 p-3.5 shadow-2xs flex-row gap-3.5 relative`}
                                activeOpacity={0.9}
                            >
                                {/* Left Logo Container */}
                                <View style={tw`w-28 h-28 rounded-2xl ${store.logoBg} items-center justify-center border border-gray-100`}>
                                    <Text style={tw`text-5xl`}>{store.logo}</Text>
                                </View>

                                {/* Center Store Details */}
                                <View style={tw`flex-1 justify-between py-0.5 pr-6`}>
                                    <View>
                                        <View style={tw`flex-row items-center gap-1.5 flex-wrap`}>
                                            <Text style={tw`text-sm font-extrabold text-gray-950`} numberOfLines={1}>
                                                {store.name}
                                            </Text>

                                            {store.tagType === 'supermarket' && (
                                                <View style={tw`bg-emerald-100 px-1.5 py-0.5 rounded-md`}>
                                                    <Text style={tw`text-[9px] font-bold text-market-green`}>• Supermarket</Text>
                                                </View>
                                            )}

                                            {store.tagType === 'fastfood' && (
                                                <View style={tw`bg-orange-100 px-1.5 py-0.5 rounded-md`}>
                                                    <Text style={tw`text-[9px] font-bold text-orange-600`}>Fast Food</Text>
                                                </View>
                                            )}
                                        </View>

                                        <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`} numberOfLines={1}>
                                            {store.category}
                                        </Text>

                                        <View style={tw`flex-row items-center gap-1.5 mt-1.5`}>
                                            <Star size={12} color="#FACC15" fill="#FACC15" />
                                            <Text style={tw`text-xs font-bold text-gray-800`}>{store.rating}</Text>
                                            <Text style={tw`text-[10px] text-gray-400 font-medium`}>({store.reviews})</Text>
                                            <Text style={tw`text-gray-300 text-xs`}>•</Text>
                                            <Text style={tw`text-[10px] text-gray-500 font-bold`}>{store.priceTier}</Text>
                                            <Text style={tw`text-gray-300 text-xs`}>•</Text>
                                            <Text style={tw`text-[10px] text-gray-500 font-bold`}>{store.time}</Text>
                                        </View>
                                    </View>

                                    {/* Free Delivery Footer Strip */}
                                    <View style={tw`flex-row items-center gap-1 mt-2`}>
                                        <Truck size={12} color="#0A8A3A" />
                                        <Text style={tw`text-[10px] font-bold text-market-green`}>
                                            Free delivery on orders {store.freeDeliveryThreshold}
                                        </Text>
                                    </View>
                                </View>

                                {/* Right Side: Heart, Discount & Distance */}
                                <TouchableOpacity
                                    style={tw`absolute top-3.5 right-3.5 z-10`}
                                    onPress={() => toggleFavorite(store.id)}
                                >
                                    <Heart
                                        size={18}
                                        color={isFav ? '#EF4444' : '#9CA3AF'}
                                        fill={isFav ? '#EF4444' : 'transparent'}
                                    />
                                </TouchableOpacity>

                                <View style={tw`absolute bottom-3.5 right-3.5 items-end gap-1`}>
                                    <View style={tw`bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-xl items-end`}>
                                        <Text style={tw`text-xs font-extrabold text-market-green`}>{store.discount}</Text>
                                        <Text style={tw`text-[8px] text-gray-500 font-semibold`}>{store.discountSub}</Text>
                                    </View>

                                    <View style={tw`flex-row items-center gap-0.5 mt-0.5`}>
                                        <MapPin size={10} color="#9CA3AF" />
                                        <Text style={tw`text-[10px] text-gray-400 font-semibold`}>{store.distance}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}