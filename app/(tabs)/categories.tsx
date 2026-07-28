
import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Bell,
    ChevronDown,
    ChevronRight,
    Filter,
    MapPin,
    Search,
    ShoppingBag,
    Star,
    X
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Category & Vendor Store Datasets
const categoryDatasets: {
    [key: string]: {
        heroTitle: string;
        bannerTitle: string;
        bannerSub: string;
        bannerBadge: string;
        pills: string[];
        stores: { id: string; name: string; rating: string; time: string; verified: boolean; bg: string; logo: string }[];
        items: { id: string; name: string; itemsCount: string; icon: string; bg: string; category: string }[];
    };
} = {
    food: {
        heroTitle: 'Food & Groceries',
        bannerTitle: 'Fresh Groceries',
        bannerSub: 'Delivered to your door in 30 mins 🛵',
        bannerBadge: 'EXPRESS DELIVERY',
        pills: ['All', 'Produce', 'Grains & Staples', 'Oils & Spices', 'Meat & Seafood', 'Dairy & Drinks'],
        stores: [
            { id: 'konga-fresh', name: 'Konga Fresh', rating: '4.7', time: '20-30 min', verified: true, bg: 'bg-emerald-600', logo: '🥦' },
            { id: 'gloo-mart', name: 'Gloo Mart', rating: '4.6', time: '15-25 min', verified: true, bg: 'bg-green-600', logo: '🛒' },
            { id: 'shoprite', name: 'Shoprite', rating: '4.8', time: '25-35 min', verified: true, bg: 'bg-red-600', logo: '🏪' },
            { id: 'spar', name: 'SPAR Supermarket', rating: '4.5', time: '20-30 min', verified: true, bg: 'bg-blue-600', logo: '🛒' },
        ],
        items: [
            { id: 'fruits-vegetables', name: 'Fruits & Vegetables', itemsCount: '2,350+ items', icon: '🥬', bg: 'bg-emerald-50', category: 'Produce' },
            { id: 'rice-grains', name: 'Rice & Grains', itemsCount: '1,850+ items', icon: '🌾', bg: 'bg-amber-50', category: 'Grains & Staples' },
            { id: 'beans-pulses', name: 'Beans & Pulses', itemsCount: '920+ items', icon: '🫘', bg: 'bg-red-50', category: 'Grains & Staples' },
            { id: 'cooking-oil', name: 'Cooking Oils & Fats', itemsCount: '650+ items', icon: '🍾', bg: 'bg-yellow-50', category: 'Oils & Spices' },
            { id: 'spices-seasoning', name: 'Spices & Seasoning', itemsCount: '1,100+ items', icon: '🧂', bg: 'bg-orange-50', category: 'Oils & Spices' },
            { id: 'meat-seafood', name: 'Meat & Fresh Seafood', itemsCount: '850+ items', icon: '🥩', bg: 'bg-rose-50', category: 'Meat & Seafood' },
            { id: 'dairy-eggs', name: 'Dairy & Farm Eggs', itemsCount: '1,250+ items', icon: '🥛', bg: 'bg-blue-50', category: 'Dairy & Drinks' },
            { id: 'drinks-beverages', name: 'Beverages & Juices', itemsCount: '2,100+ items', icon: '🥤', bg: 'bg-indigo-50', category: 'Dairy & Drinks' },
        ],
    },

    gadgets: {
        heroTitle: 'Gadgets & Electronics',
        bannerTitle: 'Tech Mega Sale',
        bannerSub: 'Up to 25% OFF top global brands ⚡',
        bannerBadge: 'TECH MALL',
        pills: ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables', 'Accessories'],
        stores: [
            { id: 'techworld', name: 'TechWorld Store', rating: '4.9', time: 'Same Day', verified: true, bg: 'bg-blue-600', logo: '📱' },
            { id: 'slot', name: 'Slot Electronics', rating: '4.8', time: '1-2 hours', verified: true, bg: 'bg-red-600', logo: '💻' },
            { id: 'pointek', name: 'Pointek Store', rating: '4.7', time: 'Same Day', verified: true, bg: 'bg-indigo-600', logo: '🎧' },
        ],
        items: [
            { id: 'smartphones', name: 'Smartphones & iPhones', itemsCount: '1,450+ items', icon: '📱', bg: 'bg-blue-50', category: 'Smartphones' },
            { id: 'tablets-ipads', name: 'Tablets & iPads', itemsCount: '420+ items', icon: '📲', bg: 'bg-blue-50', category: 'Smartphones' },
            { id: 'laptops-macbooks', name: 'Laptops & MacBooks', itemsCount: '850+ items', icon: '💻', bg: 'bg-sky-50', category: 'Laptops' },
            { id: 'headphones-earbuds', name: 'Headphones & Audio', itemsCount: '2,100+ items', icon: '🎧', bg: 'bg-indigo-50', category: 'Audio' },
            { id: 'smartwatches', name: 'Smartwatches', itemsCount: '620+ items', icon: '⌚', bg: 'bg-purple-50', category: 'Wearables' },
            { id: 'power-cables', name: 'Power Banks & Cables', itemsCount: '3,200+ items', icon: '🔌', bg: 'bg-emerald-50', category: 'Accessories' },
        ],
    },

    marketplace: {
        heroTitle: 'Marketplace Deals',
        bannerTitle: 'Verified Stores',
        bannerSub: 'Shop fashion, home & beauty 🛍️',
        bannerBadge: 'MARKETPLACE',
        pills: ['All', 'Fashion', 'Beauty', 'Home Living', 'Sports'],
        stores: [
            { id: 'jumia-express', name: 'Jumia Official', rating: '4.6', time: '1-2 Days', verified: true, bg: 'bg-amber-600', logo: '🛍️' },
            { id: 'fashion-hub', name: 'Fashion Hub', rating: '4.8', time: 'Same Day', verified: true, bg: 'bg-pink-600', logo: '👗' },
        ],
        items: [
            { id: 'womens-fashion', name: "Women's Fashion & Bags", itemsCount: '4,200+ items', icon: '👜', bg: 'bg-pink-50', category: 'Fashion' },
            { id: 'mens-fashion', name: "Men's Wear & Shoes", itemsCount: '3,800+ items', icon: '👔', bg: 'bg-slate-50', category: 'Fashion' },
            { id: 'beauty-skincare', name: 'Beauty & Skincare', itemsCount: '1,900+ items', icon: '💄', bg: 'bg-rose-50', category: 'Beauty' },
            { id: 'home-kitchen', name: 'Home & Kitchen Decor', itemsCount: '2,400+ items', icon: '🛋️', bg: 'bg-amber-50', category: 'Home Living' },
            { id: 'sports-fitness', name: 'Sports & Fitness Gear', itemsCount: '1,100+ items', icon: '⚽', bg: 'bg-emerald-50', category: 'Sports' },
        ],
    },

    bills: {
        heroTitle: 'Bill Payments',
        bannerTitle: 'Utility Top-Up',
        bannerSub: 'Earn 5% cashback on all bills 💰',
        bannerBadge: 'PAY BILLS',
        pills: ['All', 'Utilities', 'Telecom'],
        stores: [],
        items: [
            { id: 'electricity', name: 'Electricity Tokens', itemsCount: 'AEDC, EKEDC, IKEDC', icon: '💡', bg: 'bg-amber-50', category: 'Utilities' },
            { id: 'water', name: 'Water Utilities', itemsCount: 'Instant Recharge', icon: '💧', bg: 'bg-blue-50', category: 'Utilities' },
            { id: 'cable-tv', name: 'Cable TV Renewal', itemsCount: 'DStv, GOtv, StarTimes', icon: '📺', bg: 'bg-purple-50', category: 'Telecom' },
            { id: 'airtime-data', name: 'Airtime & Data Bundles', itemsCount: 'MTN, Airtel, Glo, 9mobile', icon: '📲', bg: 'bg-emerald-50', category: 'Telecom' },
        ],
    },

    logistics: {
        heroTitle: 'Logistics Services',
        bannerTitle: 'Express Shipping',
        bannerSub: 'Send parcels & track live 🚚',
        bannerBadge: 'LOGISTICS',
        pills: ['All', 'Express', 'Freight'],
        stores: [],
        items: [
            { id: 'parcel-delivery', name: 'City Parcel Delivery', itemsCount: 'Same Day Dispatch', icon: '📦', bg: 'bg-emerald-50', category: 'Express' },
            { id: 'bike-courier', name: 'Bike Dispatch Rider', itemsCount: 'Express 2-Hour Courier', icon: '🛵', bg: 'bg-amber-50', category: 'Express' },
            { id: 'truck-shipping', name: 'Heavy Truck Movers', itemsCount: 'Interstate Haulage', icon: '🚚', bg: 'bg-blue-50', category: 'Freight' },
            { id: 'air-freight', name: 'Air Freight Cargo', itemsCount: 'Global Express', icon: '✈️', bg: 'bg-indigo-50', category: 'Freight' },
        ],
    },
};

export default function CategoriesScreen() {
    const router = useRouter();
    const { service } = useLocalSearchParams<{ service?: string }>();

    // Resolve dataset
    const activeServiceKey = (service as string) in categoryDatasets ? (service as string) : 'food';
    const currentDataset = categoryDatasets[activeServiceKey];

    const [activePill, setActivePill] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter category items
    const filteredCategories = currentDataset.items.filter((item) => {
        const matchesPill = activePill === 'All' || item.category === activePill;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesPill && matchesSearch;
    });

    const handleCategoryPress = (categoryId: string) => {
        router.push({
            pathname: `/(tabs)/category/${categoryId}` as any,
            params: { service: activeServiceKey },
        });
    };

    const handleStorePress = (storeId: string) => {
        router.push(`/store/${storeId}` as any);
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* 1. Standard Header Bar */}
            <View style={tw`px-4 pt-2 pb-2 flex-row items-center justify-between border-b border-gray-100`}>
                <TouchableOpacity
                    style={tw`flex-row items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full flex-1 mr-3`}
                    onPress={() => router.push('/(location)/index')}
                    activeOpacity={0.8}
                >
                    <MapPin size={16} color="#0A8A3A" />
                    <Text style={tw`text-xs font-bold text-gray-900 flex-1`} numberOfLines={1}>
                        23 Adekunle Street, Yaba, Lagos
                    </Text>
                    <ChevronDown size={14} color="#171717" />
                </TouchableOpacity>

                <View style={tw`flex-row items-center gap-2.5`}>
                    <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center bg-gray-50 rounded-full`}>
                        <Bell size={18} color="#171717" />
                        <View style={tw`absolute top-1.5 right-1.5 w-2 h-2 bg-market-green rounded-full`} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`relative w-9 h-9 items-center justify-center bg-gray-50 rounded-full`}
                        onPress={() => router.push('/cart')}
                    >
                        <ShoppingBag size={18} color="#171717" />
                        <View style={tw`absolute -top-1 -right-1 w-4.5 h-4.5 bg-market-green rounded-full items-center justify-center border-2 border-white`}>
                            <Text style={tw`text-white text-[9px] font-bold`}>2</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* 2. Search Input */}
                <View style={tw`px-4 mt-3 mb-2 flex-row items-center gap-2`}>
                    <View style={tw`flex-1 flex-row items-center border border-gray-200 rounded-2xl px-3.5 h-11.5 bg-gray-50/50 shadow-2xs`}>
                        <Search size={18} color="#0A8A3A" style={tw`mr-2.5`} />
                        <TextInput
                            style={tw`flex-1 text-xs text-gray-900 h-full font-medium`}
                            placeholder={`Search in ${currentDataset.heroTitle}...`}
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <X size={16} color="#9CA3AF" />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity style={tw`w-11.5 h-11.5 rounded-2xl bg-emerald-50 border border-emerald-100 items-center justify-center`}>
                        <Filter size={18} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* 3. Featured Vendor Stores Section (NEW!) */}
                {currentDataset.stores.length > 0 && (
                    <View style={tw`mt-2 mb-3`}>
                        <View style={tw`flex-row justify-between items-center px-4 mb-2.5`}>
                            <Text style={tw`text-sm font-extrabold text-gray-950`}>Featured Stores Near You</Text>
                            <TouchableOpacity>
                                <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
                            {currentDataset.stores.map((store) => (
                                <TouchableOpacity
                                    key={store.id}
                                    onPress={() => handleStorePress(store.id)}
                                    style={tw`w-40 bg-white rounded-2xl border border-gray-100 p-3 shadow-2xs`}
                                    activeOpacity={0.85}
                                >
                                    <View style={tw`items-center my-1.5`}>
                                        <View style={tw`w-12 h-12 rounded-full ${store.bg} items-center justify-center border-2 border-white shadow-xs`}>
                                            <Text style={tw`text-xl`}>{store.logo}</Text>
                                        </View>
                                    </View>

                                    <View style={tw`flex-row items-center justify-center gap-1 mt-1`}>
                                        <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>{store.name}</Text>
                                        {store.verified && (
                                            <View style={tw`w-3.5 h-3.5 rounded-full bg-market-green items-center justify-center`}>
                                                <Text style={tw`text-white text-[8px] font-bold`}>✓</Text>
                                            </View>
                                        )}
                                    </View>

                                    <View style={tw`flex-row items-center justify-center gap-1 mt-1`}>
                                        <Star size={10} color="#D97706" fill="#D97706" />
                                        <Text style={tw`text-[10px] font-bold text-gray-700`}>{store.rating}</Text>
                                        <Text style={tw`text-gray-300`}>•</Text>
                                        <Text style={tw`text-[10px] text-gray-400 font-semibold`}>{store.time}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* 4. Horizontal Category Filter Pills */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 my-2`}>
                    {currentDataset.pills.map((pill) => {
                        const isSelected = activePill === pill;

                        return (
                            <TouchableOpacity
                                key={pill}
                                onPress={() => setActivePill(pill)}
                                style={tw`px-4 py-2 rounded-xl border ${isSelected
                                        ? 'bg-market-green border-market-green shadow-xs'
                                        : 'bg-gray-50 border-gray-200'
                                    }`}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={tw`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-700'
                                        }`}
                                >
                                    {pill}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* 5. Title Row & Count Badge */}
                <View style={tw`px-4 mt-2 mb-2 flex-row items-center justify-between`}>
                    <Text style={tw`text-base font-extrabold text-gray-950`}>
                        {activePill === 'All' ? currentDataset.heroTitle : activePill}
                    </Text>
                    <View style={tw`bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100`}>
                        <Text style={tw`text-[10px] font-bold text-market-green`}>
                            {filteredCategories.length} Categories
                        </Text>
                    </View>
                </View>

                {/* 6. Standard 2-Column Responsive Cards Grid */}
                <View style={tw`px-4 flex-row flex-wrap justify-between gap-y-3.5 my-1`}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => handleCategoryPress(cat.id)}
                                style={tw`w-[48.5%] bg-white border border-gray-100 rounded-3xl p-3.5 shadow-2xs justify-between`}
                                activeOpacity={0.85}
                            >
                                <View style={tw`w-12 h-12 rounded-2xl ${cat.bg} items-center justify-center mb-3 border border-gray-100/80`}>
                                    <Text style={tw`text-2xl`}>{cat.icon}</Text>
                                </View>

                                <View style={tw`mb-3`}>
                                    <Text style={tw`text-sm font-bold text-gray-900 leading-4`} numberOfLines={2}>
                                        {cat.name}
                                    </Text>
                                    <Text style={tw`text-[10px] text-gray-400 font-semibold mt-1`} numberOfLines={1}>
                                        {cat.itemsCount}
                                    </Text>
                                </View>

                                <View style={tw`flex-row items-center justify-between pt-2 border-t border-gray-50`}>
                                    <Text style={tw`text-[10px] font-bold text-market-green`}>Explore</Text>
                                    <ChevronRight size={14} color="#0A8A3A" />
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={tw`w-full py-12 items-center justify-center`}>
                            <Text style={tw`text-3xl mb-2`}>🔍</Text>
                            <Text style={tw`text-sm font-bold text-gray-800`}>No categories found</Text>
                            <Text style={tw`text-xs text-gray-400 font-medium mt-0.5`}>Try searching for another keyword</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}