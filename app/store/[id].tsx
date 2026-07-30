import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    ChevronDown,
    ChevronRight,
    Clock,
    Heart,
    MapPin,
    MessageSquare,
    Minus,
    Phone,
    Plus,
    Share2,
    ShoppingBag,
    Star,
    Tag,
    ThumbsUp
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Store presets dataset (supports both Supermarket Stores & Fresh Vendors)
const storePresets: Record<string, {
    type: 'store' | 'vendor';
    name: string;
    category: string;
    address: string;
    hours: string;
    phone: string;
    rating: string;
    reviewsCount: string;
    deliveryTime: string;
    minOrder: string;
    ordersCount?: string;
    verified?: boolean;
    avatarText: string;
    avatarBg: string;
    promoOffer: string;
}> = {
    'shoprite': {
        type: 'store',
        name: 'Shoprite Lekki',
        category: 'Supermarket • Lekki Phase 1, Lagos',
        address: 'Plot 16, Admiralty Way, Lekki Phase 1, Lagos',
        hours: 'Open daily • 7:00 AM – 10:00 PM',
        phone: '0812 345 6789',
        rating: '4.8',
        reviewsCount: '2.3k',
        deliveryTime: '20-30 min',
        minOrder: '₦1,500 min order',
        verified: true,
        avatarText: '🔴',
        avatarBg: 'bg-red-50',
        promoOffer: 'Enjoy free delivery on orders over ₦15,000',
    },
    'spar': {
        type: 'store',
        name: 'SPAR Supermarket',
        category: 'Groceries • Home Essentials • Fresh Produce',
        address: 'Admiralty Way, Lekki Phase 1, Lagos',
        hours: 'Open daily • 8:00 AM – 9:30 PM',
        phone: '0812 987 6543',
        rating: '4.5',
        reviewsCount: '1.8k',
        deliveryTime: '25-35 min',
        minOrder: '₦2,000 min order',
        verified: true,
        avatarText: '🌲',
        avatarBg: 'bg-emerald-50',
        promoOffer: 'Enjoy 15% OFF your first order over ₦8,000',
    },
    'freshfarm': {
        type: 'vendor',
        name: 'FreshFarm Market',
        category: 'Groceries • Vegetables • Fruits',
        address: 'Lekki, Ajah, Victoria Island',
        hours: 'Open daily • 6:30 AM – 8:00 PM',
        phone: '0803 111 2233',
        rating: '4.8',
        reviewsCount: '1.2k',
        deliveryTime: '20-30 min',
        minOrder: '₦1,000 min order',
        ordersCount: '2.3k+ orders',
        verified: true,
        avatarText: '🧺',
        avatarBg: 'bg-emerald-50',
        promoOffer: 'Get 20% OFF on all fresh vegetable bowls!',
    },
    'mama-t-kitchen': {
        type: 'vendor',
        name: "Mama T's Kitchen",
        category: 'African Dishes • Local Cuisine',
        address: 'Lekki Phase 1, Lagos',
        hours: 'Open daily • 9:00 AM – 10:00 PM',
        phone: '0802 333 4455',
        rating: '4.9',
        reviewsCount: '512',
        deliveryTime: '20-30 min',
        minOrder: '₦1,000 min order',
        ordersCount: '1.5k+ orders',
        verified: true,
        avatarText: '🍲',
        avatarBg: 'bg-amber-50',
        promoOffer: 'Free delivery on orders over ₦5,000',
    },
};

// Default fallback preset for Shoprite
const defaultStorePreset = storePresets['shoprite'];

// Supermarket Guarantees
const storeGuarantees = [
    { id: 1, title: '100% Authentic', sub: 'Genuine products', icon: '🛡️', bg: 'bg-emerald-50' },
    { id: 2, title: 'Best Prices', sub: 'Everyday low price', icon: '🏷️', bg: 'bg-rose-50' },
    { id: 3, title: 'Quality Assured', sub: 'Trusted by thousands', icon: '⭐', bg: 'bg-purple-50' },
    { id: 4, title: 'Fast Delivery', sub: 'Quick & reliable', icon: '🛵', bg: 'bg-orange-50' },
];

// Vendor Metrics
const vendorMetrics = [
    { id: 1, title: '98%', sub: 'Positive Reviews', icon: '🎗️' },
    { id: 2, title: '20–30 min', sub: 'Avg. Delivery', icon: '🛵' },
    { id: 3, title: 'Lekki, Ajah, VI', sub: 'Delivery Area', icon: '📍' },
    { id: 4, title: 'Very Responsive', sub: 'Replies in 5 mins', icon: '💬' },
];

// Products
const bestSellingProducts = [
    { id: 1, name: 'Coca-Cola Original 50cl', price: '₦600', oldPrice: '₦680', discount: '-12%', image: require('@/assets/images/prod-oil.png') },
    { id: 2, name: 'Indomie Chicken 70g', price: '₦350', oldPrice: '₦380', discount: '-8%', image: require('@/assets/images/prod-indomie.png') },
    { id: 3, name: 'Peak Evaporated Milk 170g', price: '₦950', oldPrice: '₦1,050', discount: '-10%', image: require('@/assets/images/prod-milo.png') },
    { id: 4, name: 'Banana 1 Bunch', price: '₦800', oldPrice: null, discount: 'New', isNew: true, image: require('@/assets/images/prod-banana.png') },
];

// Categories
const storeCategories = [
    { id: 'groceries', name: 'Groceries', icon: '🧺', bg: 'bg-amber-50' },
    { id: 'drinks', name: 'Drinks', icon: '🍾', bg: 'bg-sky-50' },
    { id: 'snacks', name: 'Snacks', icon: '🍿', bg: 'bg-orange-50' },
    { id: 'personal', name: 'Personal Care', icon: '🧴', bg: 'bg-purple-50' },
    { id: 'household', name: 'Household', icon: '🧼', bg: 'bg-blue-50' },
    { id: 'baby', name: 'Baby Care', icon: '🍼', bg: 'bg-pink-50' },
];

// Rating Breakdown
const ratingBreakdown = [
    { stars: '5 ★', percent: '85%', width: 'w-[85%]' },
    { stars: '4 ★', percent: '10%', width: 'w-[10%]' },
    { stars: '3 ★', percent: '3%', width: 'w-[3%]' },
    { stars: '2 ★', percent: '1%', width: 'w-[1%]' },
    { stars: '1 ★', percent: '1%', width: 'w-[1%]' },
];

export default function StoreOrVendorDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    // Determine preset or custom
    const currentPreset = (id && storePresets[id]) ? storePresets[id] : {
        ...defaultStorePreset,
        name: id ? `${id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}` : defaultStorePreset.name,
    };

    const [activeTab, setActiveTab] = useState<'info' | 'products' | 'categories' | 'reviews'>('info');
    const [isLiked, setIsLiked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({});
    const [helpfulCount, setHelpfulCount] = useState(23);
    const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);

    const toggleFavoriteProduct = (productId: number) => {
        setFavorites(prev =>
            prev.includes(productId) ? prev.filter(item => item !== productId) : [...prev, productId]
        );
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCartQuantities(prev => {
            const current = prev[productId] || 0;
            const updated = Math.max(0, current + delta);
            return { ...prev, [productId]: updated };
        });
    };

    const isStore = currentPreset.type === 'store';

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-28`}>
                {/* 1. Top Cover Banner */}
                <View style={tw`h-48 bg-gray-900 relative justify-between p-4`}>
                    <Image
                        source={require('@/assets/images/grocery-bag-hero.png')}
                        style={tw`absolute inset-0 w-full h-full opacity-60`}
                        resizeMode="cover"
                    />

                    <View style={tw`flex-row items-center justify-between z-10`}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={tw`w-10 h-10 rounded-full bg-white items-center justify-center shadow-md`}
                        >
                            <ArrowLeft size={20} color="#171717" />
                        </TouchableOpacity>

                        <View style={tw`flex-row items-center gap-2.5`}>
                            <TouchableOpacity style={tw`w-10 h-10 rounded-full bg-white items-center justify-center shadow-md`}>
                                <Share2 size={18} color="#171717" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsLiked(!isLiked)}
                                style={tw`w-10 h-10 rounded-full bg-white items-center justify-center shadow-md`}
                            >
                                <Heart
                                    size={18}
                                    color={isLiked ? '#EF4444' : '#171717'}
                                    fill={isLiked ? '#EF4444' : 'transparent'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* 2. Floating Store / Vendor Profile Card */}
                <View style={tw`px-4 -mt-10 z-20`}>
                    <View style={tw`bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex-row items-start gap-3.5`}>
                        {/* Avatar Logo */}
                        <View style={tw`w-20 h-20 rounded-2xl ${currentPreset.avatarBg} border border-gray-100 items-center justify-center p-2 shadow-2xs`}>
                            <Text style={tw`text-3xl`}>{currentPreset.avatarText}</Text>
                        </View>

                        <View style={tw`flex-1 justify-between`}>
                            {/* Status Pill / Verified Badge */}
                            <View style={tw`flex-row items-center justify-between mb-1`}>
                                <View style={tw`bg-emerald-50 border border-emerald-200 self-start px-2 py-0.5 rounded-full flex-row items-center gap-1`}>
                                    <View style={tw`w-2 h-2 rounded-full bg-market-green`} />
                                    <Text style={tw`text-[10px] font-bold text-market-green`}>
                                        {isStore ? 'Open now' : 'Verified Vendor'}
                                    </Text>
                                </View>

                                {!isStore && (
                                    <TouchableOpacity
                                        onPress={() => setIsFollowing(!isFollowing)}
                                        style={tw`border border-market-green px-3 py-1 rounded-full flex-row items-center gap-1 ${isFollowing ? 'bg-market-green' : 'bg-white'
                                            }`}
                                    >
                                        <Heart size={11} color={isFollowing ? 'white' : '#0A8A3A'} fill={isFollowing ? 'white' : 'transparent'} />
                                        <Text style={tw`text-xs font-bold ${isFollowing ? 'text-white' : 'text-market-green'}`}>
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <Text style={tw`text-lg font-extrabold text-gray-950 leading-5`}>
                                {currentPreset.name}
                            </Text>

                            <Text style={tw`text-[11px] text-gray-500 font-medium mt-0.5`}>
                                {currentPreset.category}
                            </Text>

                            {/* Rating Metadata */}
                            <View style={tw`flex-row items-center gap-1.5 mt-2 flex-wrap`}>
                                <Star size={12} color="#FACC15" fill="#FACC15" />
                                <Text style={tw`text-xs font-bold text-gray-800`}>{currentPreset.rating}</Text>
                                <Text style={tw`text-[10px] text-gray-400 font-medium`}>({currentPreset.reviewsCount} reviews)</Text>
                                <Text style={tw`text-gray-300 text-xs`}>•</Text>
                                <Text style={tw`text-[10px] font-bold text-gray-600`}>🚲 {currentPreset.deliveryTime}</Text>
                                <Text style={tw`text-gray-300 text-xs`}>•</Text>
                                <Text style={tw`text-[10px] font-bold text-gray-600`}>{currentPreset.minOrder}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 3. Guarantees / Metrics Grid */}
                <View style={tw`px-4 my-4 flex-row justify-between gap-2`}>
                    {(isStore ? storeGuarantees : vendorMetrics).map((item) => (
                        <View
                            key={item.id}
                            style={tw`flex-1 bg-white border border-gray-100 rounded-2xl p-2.5 items-center justify-center shadow-2xs`}
                        >
                            <Text style={tw`text-lg mb-1`}>{item.icon}</Text>
                            <Text style={tw`text-[10px] font-bold text-gray-900 text-center leading-3`}>
                                {item.title}
                            </Text>
                            <Text style={tw`text-[8px] text-gray-400 text-center font-medium mt-0.5 leading-2.5`}>
                                {item.sub}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* 4. Offer Banner */}
                <View style={tw`mx-4 my-1 bg-[#F0FDF4] rounded-2xl p-3.5 border border-market-green/20 flex-row items-center justify-between shadow-2xs`}>
                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                        <View style={tw`w-9 h-9 rounded-xl bg-market-green/10 items-center justify-center`}>
                            <Tag size={18} color="#0A8A3A" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>
                                {currentPreset.promoOffer}
                            </Text>
                            <Text style={tw`text-[10px] text-gray-500 font-medium mt-0.5`}>
                                Limited time offer
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={tw`border border-market-green px-3 py-1.5 rounded-xl bg-white flex-row items-center gap-1`}>
                        <Text style={tw`text-xs font-bold text-market-green`}>See offers</Text>
                        <ChevronRight size={14} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* 5. Underline Navigation Tabs */}
                <View style={tw`px-4 mt-5 flex-row border-b border-gray-100 justify-between`}>
                    {[
                        { id: 'info', label: 'Store Info' },
                        { id: 'products', label: 'Products' },
                        { id: 'categories', label: 'Categories' },
                        { id: 'reviews', label: `Reviews (${currentPreset.reviewsCount})` },
                    ].map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <TouchableOpacity
                                key={tab.id}
                                onPress={() => setActiveTab(tab.id as any)}
                                style={tw`pb-3 px-1 border-b-2 ${isActive ? 'border-market-green' : 'border-transparent'
                                    }`}
                            >
                                <Text
                                    style={tw`text-xs font-bold ${isActive ? 'text-market-green' : 'text-gray-500'
                                        }`}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* 6. Store Info Details */}
                {activeTab === 'info' && (
                    <View style={tw`px-4 mt-4 gap-3.5`}>
                        {/* Address */}
                        <View style={tw`flex-row items-center justify-between pb-3 border-b border-gray-50`}>
                            <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                                <MapPin size={18} color="#0A8A3A" />
                                <Text style={tw`text-xs font-bold text-gray-900 flex-1`}>
                                    {currentPreset.address}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => router.push('/(location)/map')}>
                                <Text style={tw`text-xs font-bold text-market-green`}>View on map</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Opening Hours */}
                        <View style={tw`flex-row items-center justify-between pb-3 border-b border-gray-50`}>
                            <View style={tw`flex-row items-center gap-3`}>
                                <Clock size={18} color="#0A8A3A" />
                                <Text style={tw`text-xs font-bold text-gray-900`}>
                                    {currentPreset.hours}
                                </Text>
                            </View>

                            <ChevronDown size={16} color="#9CA3AF" />
                        </View>

                        {/* Phone */}
                        <View style={tw`flex-row items-center justify-between pb-1`}>
                            <View style={tw`flex-row items-center gap-3`}>
                                <Phone size={18} color="#0A8A3A" />
                                <Text style={tw`text-xs font-bold text-gray-900`}>{currentPreset.phone}</Text>
                            </View>

                            <TouchableOpacity>
                                <Text style={tw`text-xs font-bold text-market-green`}>Call store</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* 7. Best Selling Products Section */}
                <View style={tw`mt-6`}>
                    <View style={tw`flex-row justify-between items-center px-4 mb-3`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Best Selling</Text>
                        <TouchableOpacity onPress={() => setActiveTab('products')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
                        {bestSellingProducts.map((prod) => {
                            const isFav = favorites.includes(prod.id);
                            const qty = cartQuantities[prod.id] || 0;

                            return (
                                <View
                                    key={prod.id}
                                    style={tw`w-36 bg-white rounded-3xl border border-gray-100 p-2.5 shadow-2xs justify-between relative`}
                                >
                                    {/* Badge */}
                                    {prod.isNew ? (
                                        <View style={tw`absolute top-3 left-3 bg-emerald-600 px-2 py-0.5 rounded-md z-10`}>
                                            <Text style={tw`text-[9px] font-extrabold text-white`}>New</Text>
                                        </View>
                                    ) : (
                                        <View style={tw`absolute top-3 left-3 bg-[#EF4444] px-2 py-0.5 rounded-md z-10`}>
                                            <Text style={tw`text-[9px] font-extrabold text-white`}>{prod.discount}</Text>
                                        </View>
                                    )}

                                    {/* Wishlist Heart */}
                                    <TouchableOpacity
                                        style={tw`absolute top-3 right-3 z-10`}
                                        onPress={() => toggleFavoriteProduct(prod.id)}
                                    >
                                        <Heart
                                            size={16}
                                            color={isFav ? '#EF4444' : '#9CA3AF'}
                                            fill={isFav ? '#EF4444' : 'transparent'}
                                        />
                                    </TouchableOpacity>

                                    {/* Product Image */}
                                    <TouchableOpacity
                                        style={tw`items-center justify-center h-28 bg-gray-50/50 rounded-2xl p-2 my-2 mt-5`}
                                        onPress={() => router.push(`/product/${prod.id}`)}
                                    >
                                        <Image source={prod.image} style={tw`w-20 h-20`} resizeMode="contain" />
                                    </TouchableOpacity>

                                    <View>
                                        <Text style={tw`text-xs font-extrabold text-gray-950 leading-4`} numberOfLines={2}>
                                            {prod.name}
                                        </Text>

                                        <View style={tw`mt-1.5 mb-2`}>
                                            <Text style={tw`text-xs font-extrabold text-gray-950`}>{prod.price}</Text>
                                            {prod.oldPrice && (
                                                <Text style={tw`text-[9px] text-gray-400 line-through`}>{prod.oldPrice}</Text>
                                            )}
                                        </View>
                                    </View>

                                    {/* Add Button */}
                                    {qty > 0 ? (
                                        <View style={tw`flex-row items-center justify-between border border-market-green rounded-xl p-0.5 bg-emerald-50`}>
                                            <TouchableOpacity
                                                style={tw`w-6 h-6 rounded-lg bg-white items-center justify-center`}
                                                onPress={() => updateQuantity(prod.id, -1)}
                                            >
                                                <Minus size={12} color="#171717" />
                                            </TouchableOpacity>

                                            <Text style={tw`text-xs font-bold text-gray-900`}>{qty}</Text>

                                            <TouchableOpacity
                                                style={tw`w-6 h-6 rounded-lg bg-market-green items-center justify-center`}
                                                onPress={() => updateQuantity(prod.id, 1)}
                                            >
                                                <Plus size={12} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            style={tw`w-full bg-[#DCFCE7] border border-emerald-200 py-1.5 rounded-xl flex-row items-center justify-center gap-1`}
                                            onPress={() => updateQuantity(prod.id, 1)}
                                        >
                                            <Plus size={12} color="#0A8A3A" />
                                            <Text style={tw`text-xs font-bold text-market-green`}>Add</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* 8. Categories in this store Section */}
                <View style={tw`mt-6`}>
                    <View style={tw`flex-row justify-between items-center px-4 mb-3`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Categories in this store</Text>
                        <TouchableOpacity onPress={() => setActiveTab('categories')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5`}>
                        {storeCategories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => router.push(`/(tabs)/category/${cat.id}` as any)}
                                style={tw`items-center gap-1.5 w-20`}
                                activeOpacity={0.8}
                            >
                                <View style={tw`w-18 h-18 rounded-2xl ${cat.bg} items-center justify-center border border-gray-100 shadow-2xs`}>
                                    <Text style={tw`text-3xl`}>{cat.icon}</Text>
                                </View>

                                <Text style={tw`text-xs font-semibold text-gray-800 text-center leading-3.5`}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* 9. Reviews Section with Rating Breakdown */}
                {activeTab === 'reviews' && (
                    <View style={tw`mt-6 px-4`}>
                        <View style={tw`flex-row justify-between items-center mb-3`}>
                            <Text style={tw`text-base font-extrabold text-gray-950`}>
                                Customer Reviews ({currentPreset.reviewsCount})
                            </Text>
                        </View>

                        <View style={tw`flex-row gap-3`}>
                            {/* Rating Summary Box */}
                            <View style={tw`w-1/2 bg-[#F8FAFC] border border-gray-100 rounded-2xl p-3 justify-between shadow-2xs`}>
                                <View style={tw`items-center`}>
                                    <Text style={tw`text-3xl font-extrabold text-gray-950`}>{currentPreset.rating}</Text>
                                    <View style={tw`flex-row items-center gap-0.5 my-1`}>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} size={12} color="#FACC15" fill="#FACC15" />
                                        ))}
                                    </View>
                                    <Text style={tw`text-[9px] text-gray-400 font-medium`}>Based on {currentPreset.reviewsCount} reviews</Text>
                                </View>

                                {/* Progress Bars */}
                                <View style={tw`mt-2 gap-1`}>
                                    {ratingBreakdown.map(bar => (
                                        <View key={bar.stars} style={tw`flex-row items-center gap-1.5`}>
                                            <Text style={tw`text-[8px] font-bold text-gray-600 w-4`}>{bar.stars}</Text>
                                            <View style={tw`flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden`}>
                                                <View style={tw`h-full bg-market-green rounded-full ${bar.width}`} />
                                            </View>
                                            <Text style={tw`text-[8px] font-bold text-gray-400 w-5 text-right`}>{bar.percent}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Sample Review */}
                            <View style={tw`w-1/2 bg-[#F8FAFC] border border-gray-100 rounded-2xl p-3 justify-between shadow-2xs`}>
                                <View>
                                    <View style={tw`flex-row items-center justify-between mb-1`}>
                                        <View style={tw`flex-row items-center gap-2`}>
                                            <View style={tw`w-7 h-7 rounded-full bg-market-green items-center justify-center`}>
                                                <Text style={tw`text-white text-xs font-bold`}>C</Text>
                                            </View>
                                            <Text style={tw`text-xs font-bold text-gray-900`}>Chidinma O.</Text>
                                        </View>
                                        <Text style={tw`text-[9px] text-gray-400 font-medium`}>2d ago</Text>
                                    </View>

                                    <View style={tw`flex-row items-center gap-0.5 my-1`}>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} size={10} color="#FACC15" fill="#FACC15" />
                                        ))}
                                    </View>

                                    <Text style={tw`text-[10px] text-gray-600 font-medium leading-3.5 mt-1`}>
                                        Always fresh produce and excellent items. Delivery is super fast!
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => setIsHelpfulClicked(!isHelpfulClicked)}
                                    style={tw`flex-row items-center gap-1 self-end mt-2 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs`}
                                >
                                    <ThumbsUp size={10} color={isHelpfulClicked ? '#0A8A3A' : '#9CA3AF'} />
                                    <Text style={tw`text-[9px] font-bold ${isHelpfulClicked ? 'text-market-green' : 'text-gray-500'}`}>
                                        Helpful ({helpfulCount})
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* 8. Fixed Bottom Action Bar */}
            <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex-row items-center gap-2.5 shadow-lg`}>
                <TouchableOpacity
                    style={tw`flex-1 border border-market-green py-3.5 rounded-2xl flex-row items-center justify-center gap-2 bg-white shadow-2xs`}
                >
                    <MessageSquare size={16} color="#0A8A3A" />
                    <Text style={tw`text-xs font-bold text-market-green`}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={tw`flex-1 bg-market-green py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm`}
                    onPress={() => router.push('/trending')}
                    activeOpacity={0.85}
                >
                    <ShoppingBag size={16} color="white" />
                    <Text style={tw`text-xs font-bold text-white`}>View Products</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}