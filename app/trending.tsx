import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ChevronDown,
    Heart,
    LayoutGrid,
    List,
    MapPin,
    Minus,
    Plus,
    Search,
    SlidersHorizontal,
    Star
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. Category Filter Chips (Row 1)
const categoryChips = [
    { id: 'all', name: 'All', icon: null },
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'produce', name: 'Fresh Produce', icon: '🌱' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' },
    { id: 'snacks', name: 'Snacks', icon: '🍿' },
    { id: 'household', name: 'Household', icon: '🏠' },
];

// 2. Sort / Quick Filters (Row 2)
const sortFilters = [
    { id: 'trending', name: 'Trending', icon: '🔥' },
    { id: 'bestselling', name: 'Best Selling', icon: null },
    { id: 'low-high', name: 'Price: Low to High', icon: null },
    { id: 'high-low', name: 'Price: High to Low', icon: null },
    { id: 'new', name: 'New Arrivals', icon: null },
];

// 3. Products List Dataset
const trendingProducts = [
    {
        id: 1,
        name: 'Coca-Cola 50cl',
        discount: '20% OFF',
        vendor: 'Shoprite Supermarket',
        vendorLogo: '🔴',
        rating: '4.8',
        deliveryTime: '20-30 min',
        price: '₦600',
        oldPrice: '₦750',
        image: require('@/assets/images/prod-oil.png'),
        category: 'drinks',
    },
    {
        id: 2,
        name: 'Indomie (1 Carton)',
        discount: '15% OFF',
        vendor: 'SPAR Supermarket',
        vendorLogo: '🌲',
        rating: '4.9',
        deliveryTime: '25-35 min',
        price: '₦8,500',
        oldPrice: '₦10,000',
        image: require('@/assets/images/prod-indomie.png'),
        category: 'groceries',
    },
    {
        id: 3,
        name: 'Fresh Tomatoes (1kg)',
        discount: '10% OFF',
        vendor: 'FreshMart',
        vendorLogo: '🛒',
        rating: '4.8',
        deliveryTime: '20-30 min',
        price: '₦1,200',
        oldPrice: '₦1,350',
        image: require('@/assets/images/prod-tomatoes.png'),
        category: 'produce',
    },
    {
        id: 4,
        name: 'Mama Gold Rice (10kg)',
        discount: '8% OFF',
        vendor: 'Prince Ebeano',
        vendorLogo: '🛒',
        rating: '4.7',
        deliveryTime: '20-40 min',
        price: '₦12,500',
        oldPrice: '₦13,500',
        image: require('@/assets/images/prod-rice.png'),
        category: 'groceries',
    },
    {
        id: 5,
        name: 'Peak Milk Powder 900g',
        discount: '12% OFF',
        vendor: 'Shoprite Supermarket',
        vendorLogo: '🔴',
        rating: '4.9',
        deliveryTime: '25-35 min',
        price: '₦9,800',
        oldPrice: '₦11,200',
        image: require('@/assets/images/prod-milo.png'),
        category: 'groceries',
    },
    {
        id: 6,
        name: 'Golden Penny Spaghetti 500g',
        discount: '10% OFF',
        vendor: 'SPAR Supermarket',
        vendorLogo: '🌲',
        rating: '4.8',
        deliveryTime: '20-30 min',
        price: '₦750',
        oldPrice: '₦830',
        image: require('@/assets/images/prod-cornflakes.png'),
        category: 'groceries',
    },
    {
        id: 7,
        name: 'Fresh Eggs (30pcs)',
        discount: '7% OFF',
        vendor: 'FreshMart',
        vendorLogo: '🛒',
        rating: '4.7',
        deliveryTime: '20-30 min',
        price: '₦2,500',
        oldPrice: '₦2,700',
        image: require('@/assets/images/prod-banana.png'),
        category: 'produce',
    },
];

export default function TrendingProductsScreen() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSort, setActiveSort] = useState('trending');
    const [isGridView, setIsGridView] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<number[]>([]);
    const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({});

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCartQuantities(prev => {
            const current = prev[productId] || 0;
            const updated = Math.max(0, current + delta);
            return { ...prev, [productId]: updated };
        });
    };

    const filteredProducts = trendingProducts.filter(prod => {
        const matchesCat =
            activeCategory === 'all' || prod.category === activeCategory;
        const matchesSearch =
            prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prod.vendor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
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
                        <Text style={tw`text-xl font-extrabold text-gray-950`}>Trending Products</Text>
                        <Text style={tw`text-xs text-gray-400 font-medium`}>Most popular products near you</Text>
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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-12`}>
                {/* 2. Search & Filter Input Bar */}
                <View style={tw`px-4 my-3 flex-row items-center gap-2.5`}>
                    <View style={tw`flex-1 flex-row items-center border border-gray-200 rounded-2xl px-3.5 h-12 bg-gray-50/50`}>
                        <Search size={18} color="#9CA3AF" style={tw`mr-2.5`} />
                        <TextInput
                            style={tw`flex-1 text-xs text-gray-900 h-full font-medium`}
                            placeholder="Search products, brands or categories..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <TouchableOpacity style={tw`w-12 h-12 rounded-2xl border border-gray-200 items-center justify-center bg-white shadow-2xs`}>
                        <SlidersHorizontal size={18} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* 3. Category Filter Chips (Row 1) */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 mb-2`}>
                    {categoryChips.map((cat) => {
                        const isSelected = activeCategory === cat.id;

                        return (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setActiveCategory(cat.id)}
                                style={tw`flex-row items-center gap-1.5 px-4 py-2 rounded-2xl border ${isSelected
                                        ? 'border-market-green bg-[#F0FDF4]'
                                        : 'border-gray-200 bg-white'
                                    }`}
                                activeOpacity={0.8}
                            >
                                {cat.icon && <Text style={tw`text-xs`}>{cat.icon}</Text>}
                                <Text style={tw`text-xs font-bold ${isSelected ? 'text-market-green' : 'text-gray-700'}`}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* 4. Sort / Quick Filters (Row 2) */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 mb-3`}>
                    {sortFilters.map((sort) => {
                        const isSelected = activeSort === sort.id;

                        return (
                            <TouchableOpacity
                                key={sort.id}
                                onPress={() => setActiveSort(sort.id)}
                                style={tw`flex-row items-center gap-1 px-3.5 py-1.5 rounded-xl border ${isSelected
                                        ? 'border-market-green bg-[#F0FDF4]'
                                        : 'border-gray-200 bg-white'
                                    }`}
                                activeOpacity={0.8}
                            >
                                {sort.icon && <Text style={tw`text-xs`}>{sort.icon}</Text>}
                                <Text style={tw`text-xs font-bold ${isSelected ? 'text-market-green' : 'text-gray-600'}`}>
                                    {sort.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* 5. Found Products Count & View Toggle Row */}
                <View style={tw`px-4 mb-3 flex-row items-center justify-between`}>
                    <Text style={tw`text-xs font-bold text-gray-900`}>
                        248 products found
                    </Text>

                    {/* View Toggle Buttons */}
                    <View style={tw`flex-row items-center gap-1 bg-gray-100 p-1 rounded-xl`}>
                        <TouchableOpacity
                            onPress={() => setIsGridView(true)}
                            style={tw`p-1.5 rounded-lg ${isGridView ? 'bg-white shadow-2xs' : ''}`}
                        >
                            <LayoutGrid size={16} color={isGridView ? '#0A8A3A' : '#9CA3AF'} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsGridView(false)}
                            style={tw`p-1.5 rounded-lg ${!isGridView ? 'bg-white shadow-2xs' : ''}`}
                        >
                            <List size={16} color={!isGridView ? '#0A8A3A' : '#9CA3AF'} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 6. Products 2-Column Grid */}
                <View style={tw`px-4 flex-row flex-wrap justify-between gap-y-3.5`}>
                    {filteredProducts.map((prod) => {
                        const isFav = favorites.includes(prod.id);
                        const qty = cartQuantities[prod.id] || 0;

                        return (
                            <View
                                key={prod.id}
                                style={tw`w-[48.5%] bg-white rounded-3xl border border-gray-100 p-3 shadow-2xs relative justify-between`}
                            >
                                {/* Discount Tag (Top Left) */}
                                <View style={tw`absolute top-3 left-3 bg-[#EF4444] px-2 py-0.5 rounded-md z-10`}>
                                    <Text style={tw`text-[10px] font-extrabold text-white`}>{prod.discount}</Text>
                                </View>

                                {/* Heart Wishlist Button (Top Right) */}
                                <TouchableOpacity
                                    style={tw`absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 items-center justify-center shadow-2xs`}
                                    onPress={() => toggleFavorite(prod.id)}
                                >
                                    <Heart
                                        size={16}
                                        color={isFav ? '#EF4444' : '#9CA3AF'}
                                        fill={isFav ? '#EF4444' : 'transparent'}
                                    />
                                </TouchableOpacity>

                                {/* Product Image */}
                                <TouchableOpacity
                                    style={tw`items-center justify-center h-32 bg-gray-50/50 rounded-2xl p-2 my-2 mt-5`}
                                    onPress={() => router.push(`/product/${prod.id}`)}
                                >
                                    <Image source={prod.image} style={tw`w-24 h-24`} resizeMode="contain" />
                                </TouchableOpacity>

                                {/* Product Info */}
                                <View>
                                    <Text style={tw`text-xs font-extrabold text-gray-950 leading-4`} numberOfLines={1}>
                                        {prod.name}
                                    </Text>

                                    {/* Vendor Name */}
                                    <View style={tw`flex-row items-center gap-1 mt-1`}>
                                        <Text style={tw`text-[10px]`}>{prod.vendorLogo}</Text>
                                        <Text style={tw`text-[10px] font-bold text-gray-600`} numberOfLines={1}>
                                            {prod.vendor}
                                        </Text>
                                    </View>

                                    {/* Rating & Delivery Time */}
                                    <View style={tw`flex-row items-center gap-1 mt-1`}>
                                        <Star size={10} color="#FACC15" fill="#FACC15" />
                                        <Text style={tw`text-[10px] font-bold text-gray-800`}>{prod.rating}</Text>
                                        <Text style={tw`text-[9px] text-gray-400 font-medium`}>• {prod.deliveryTime}</Text>
                                    </View>

                                    {/* Price & Add Button Row */}
                                    <View style={tw`flex-row items-center justify-between mt-2 pt-1`}>
                                        <View>
                                            <Text style={tw`text-sm font-extrabold text-gray-950`}>{prod.price}</Text>
                                            <Text style={tw`text-[10px] text-gray-400 line-through`}>{prod.oldPrice}</Text>
                                        </View>

                                        {qty > 0 ? (
                                            <View style={tw`flex-row items-center gap-1 border border-market-green rounded-xl p-0.5 bg-emerald-50`}>
                                                <TouchableOpacity
                                                    style={tw`w-6 h-6 rounded-lg bg-white items-center justify-center`}
                                                    onPress={() => updateQuantity(prod.id, -1)}
                                                >
                                                    <Minus size={12} color="#171717" />
                                                </TouchableOpacity>

                                                <Text style={tw`text-xs font-bold text-gray-900 px-1`}>{qty}</Text>

                                                <TouchableOpacity
                                                    style={tw`w-6 h-6 rounded-lg bg-market-green items-center justify-center`}
                                                    onPress={() => updateQuantity(prod.id, 1)}
                                                >
                                                    <Plus size={12} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                style={tw`bg-[#DCFCE7] border border-emerald-200 px-3 py-1.5 rounded-xl flex-row items-center gap-1`}
                                                onPress={() => updateQuantity(prod.id, 1)}
                                            >
                                                <Plus size={12} color="#0A8A3A" />
                                                <Text style={tw`text-xs font-bold text-market-green`}>Add</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}