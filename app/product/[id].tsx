import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    ChevronDown,
    Clock,
    Flame,
    Heart,
    Minus,
    Plus,
    Share2,
    ShieldCheck,
    ShoppingBag,
    Star,
    Truck
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Weight options dataset
const weightOptions = [
    { id: 1, name: '1 Bunch', price: '₦800', discount: null },
    { id: 2, name: '2 Bunches', price: '₦1,550', discount: 'Save 3%' },
    { id: 3, name: '3 Bunches', price: '₦2,250', discount: 'Save 6%' },
    { id: 5, name: '5 Bunches', price: '₦3,600', discount: 'Save 10%' },
];

// Product Guarantees dataset
const productGuarantees = [
    { id: 1, title: '100% Fresh', sub: 'Handpicked quality', icon: '🌱' },
    { id: 2, title: 'Easy Returns', sub: 'Hassle-free returns', icon: '📦' },
    { id: 3, title: 'Secure Payment', sub: 'Pay safely on app', icon: '🛡️' },
    { id: 4, title: '24/7 Support', sub: "We're here to help", icon: '🎧' },
];

// Recommended / You may also like dataset
const recommendedProducts = [
    { id: 101, name: 'Fresh Red Apples', price: '₦1,200', discount: '-8%', image: require('@/assets/images/prod-apple.png') },
    { id: 102, name: 'Juicy Oranges', price: '₦950', discount: '-10%', image: require('@/assets/images/prod-orange.png') },
    { id: 103, name: 'Fresh Purple Grapes', price: '₦1,800', discount: '-12%', image: require('@/assets/images/prod-grapes.png') },
    { id: 104, name: 'Fresh Avocado', price: '₦1,400', discount: '-7%', image: require('@/assets/images/prod-avocado.png') },
];

export default function ProductDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [selectedWeight, setSelectedWeight] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [cartCount, setCartCount] = useState(2);

    const productImages = [
        require('@/assets/images/prod-banana.png'),
        require('@/assets/images/prod-banana.png'),
        require('@/assets/images/prod-banana.png'),
    ];

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* 1. Header Navigation */}
            <View style={tw`px-4 pt-2 pb-2 flex-row items-center justify-between border-b border-gray-100 z-10`}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={tw`w-10 h-10 rounded-full bg-gray-50 items-center justify-center`}
                >
                    <ArrowLeft size={20} color="#171717" />
                </TouchableOpacity>

                <View style={tw`flex-row items-center gap-2.5`}>
                    <TouchableOpacity style={tw`w-10 h-10 rounded-full bg-gray-50 items-center justify-center`}>
                        <Share2 size={18} color="#171717" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setIsLiked(!isLiked)}
                        style={tw`w-10 h-10 rounded-full bg-gray-50 items-center justify-center`}
                    >
                        <Heart
                            size={18}
                            color={isLiked ? '#EF4444' : '#171717'}
                            fill={isLiked ? '#EF4444' : 'transparent'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-28`}>
                {/* 2. Hero Image Gallery & Floating Badges */}
                <View style={tw`relative px-4 pt-4 pb-2 items-center`}>
                    <View style={tw`w-full h-72 flex-row items-center justify-center relative`}>
                        {/* Main Image */}
                        <Image
                            source={productImages[selectedImage]}
                            style={tw`w-64 h-64`}
                            resizeMode="contain"
                        />

                        {/* Left Vertical Thumbnails */}
                        <View style={tw`absolute left-0 top-2 gap-2`}>
                            {productImages.map((img, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => setSelectedImage(idx)}
                                    style={tw`w-12 h-12 rounded-xl border p-1 bg-white shadow-2xs ${selectedImage === idx ? 'border-market-green' : 'border-gray-200'
                                        }`}
                                >
                                    <Image source={img} style={tw`w-full h-full`} resizeMode="contain" />
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Right Side Badges */}
                        <View style={tw`absolute right-0 bottom-4 items-end gap-1.5`}>
                            <View style={tw`bg-[#DCFCE7] px-2.5 py-1 rounded-xl flex-row items-center gap-1 border border-emerald-200 shadow-2xs`}>
                                <ShieldCheck size={12} color="#0A8A3A" />
                                <Text style={tw`text-[10px] font-bold text-market-green`}>Fresh Guarantee</Text>
                            </View>

                            <View style={tw`bg-white px-2.5 py-1 rounded-xl flex-row items-center gap-1 border border-gray-100 shadow-xs`}>
                                <Flame size={12} color="#EF4444" fill="#EF4444" />
                                <Text style={tw`text-[10px] font-bold text-gray-800`}>125+ bought in last 24h</Text>
                            </View>
                        </View>
                    </View>

                    {/* Pagination Dots */}
                    <View style={tw`flex-row items-center gap-1.5 mt-2`}>
                        <View style={tw`w-6 h-1.5 rounded-full bg-market-green`} />
                        <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
                        <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
                        <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
                    </View>
                </View>

                {/* 3. Product Meta Info Header */}
                <View style={tw`px-4 mt-2`}>
                    <Text style={tw`text-2xl font-extrabold text-gray-950`}>
                        Banana (1 Bunch)
                    </Text>

                    <View style={tw`flex-row items-center justify-between mt-1`}>
                        {/* Store Link */}
                        <TouchableOpacity
                            onPress={() => router.push('/store/shoprite')}
                            style={tw`flex-row items-center gap-1`}
                        >
                            <Text style={tw`text-xs font-bold text-market-green`}>🏪 Shoprite Lekki</Text>
                            <Text style={tw`text-xs text-market-green font-bold`}>›</Text>
                        </TouchableOpacity>

                        {/* Rating */}
                        <View style={tw`flex-row items-center gap-1`}>
                            <Star size={12} color="#FACC15" fill="#FACC15" />
                            <Text style={tw`text-xs font-extrabold text-gray-900`}>4.6</Text>
                            <Text style={tw`text-[10px] text-gray-400 font-medium`}>(1.2k reviews)</Text>
                        </View>
                    </View>

                    {/* Price & Savings Tag */}
                    <View style={tw`flex-row items-baseline gap-2.5 mt-3`}>
                        <Text style={tw`text-2xl font-extrabold text-gray-950`}>₦800</Text>
                        <View style={tw`bg-[#EF4444] px-1.5 py-0.5 rounded-md`}>
                            <Text style={tw`text-[10px] font-extrabold text-white`}>-11%</Text>
                        </View>
                        <Text style={tw`text-xs text-gray-400 line-through`}>₦900</Text>
                    </View>

                    {/* Description */}
                    <Text style={tw`text-xs text-gray-500 font-medium mt-2 leading-4`}>
                        Fresh, ripe and naturally sweet bananas. Rich in potassium, vitamins and fiber. Perfect for smoothies, snacks or meals.
                    </Text>

                    <TouchableOpacity
                        onPress={() => setIsExpanded(!isExpanded)}
                        style={tw`flex-row items-center gap-1 mt-1`}
                    >
                        <Text style={tw`text-xs font-bold text-market-green`}>
                            {isExpanded ? 'Read less' : 'Read more'}
                        </Text>
                        <ChevronDown size={14} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* 4. Delivery & Stock Highlight Banner */}
                <View style={tw`mx-4 my-4 bg-[#F8FAFC] rounded-2xl p-3.5 border border-gray-100 flex-row items-center justify-around shadow-2xs`}>
                    <View style={tw`flex-row items-center gap-2`}>
                        <Clock size={16} color="#0A8A3A" />
                        <View>
                            <Text style={tw`text-xs font-bold text-gray-900`}>20–30 min</Text>
                            <Text style={tw`text-[9px] text-gray-400 font-medium`}>Delivery time</Text>
                        </View>
                    </View>

                    <View style={tw`w-px h-6 bg-gray-200`} />

                    <View style={tw`flex-row items-center gap-2`}>
                        <Truck size={16} color="#0A8A3A" />
                        <View>
                            <Text style={tw`text-xs font-bold text-gray-900`}>₦1,500+</Text>
                            <Text style={tw`text-[9px] text-gray-400 font-medium`}>Free delivery</Text>
                        </View>
                    </View>

                    <View style={tw`w-px h-6 bg-gray-200`} />

                    <View style={tw`flex-row items-center gap-2`}>
                        <ShieldCheck size={16} color="#0A8A3A" />
                        <View>
                            <Text style={tw`text-xs font-bold text-gray-900`}>In stock</Text>
                            <Text style={tw`text-[9px] text-gray-400 font-medium`}>Ready to deliver</Text>
                        </View>
                    </View>
                </View>

                {/* 5. Select Weight / Variation Options */}
                <View style={tw`px-4 my-2`}>
                    <View style={tw`flex-row items-center justify-between mb-2.5`}>
                        <Text style={tw`text-sm font-extrabold text-gray-950`}>Select Weight</Text>
                        <TouchableOpacity style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs font-bold text-market-green`}>📏 Size guide</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`flex-row flex-wrap justify-between gap-y-2.5`}>
                        {weightOptions.map((opt) => {
                            const isSelected = selectedWeight === opt.id;
                            return (
                                <TouchableOpacity
                                    key={opt.id}
                                    onPress={() => setSelectedWeight(opt.id)}
                                    style={tw`w-[48.5%] p-3 rounded-2xl border flex-row items-center justify-between ${isSelected
                                            ? 'border-market-green bg-[#F0FDF4]'
                                            : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    <View>
                                        <Text style={tw`text-xs font-bold ${isSelected ? 'text-market-green' : 'text-gray-900'}`}>
                                            {opt.name}
                                        </Text>
                                        <Text style={tw`text-[10px] font-bold text-gray-500 mt-0.5`}>
                                            {opt.price}
                                        </Text>
                                    </View>

                                    {opt.discount && (
                                        <View style={tw`bg-emerald-100 px-1.5 py-0.5 rounded-md`}>
                                            <Text style={tw`text-[8px] font-bold text-market-green`}>{opt.discount}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* 6. Quantity Stepper Section */}
                <View style={tw`px-4 my-4 flex-row items-center justify-between`}>
                    <View>
                        <Text style={tw`text-sm font-extrabold text-gray-950`}>Quantity</Text>
                        <Text style={tw`text-[10px] text-amber-600 font-bold mt-0.5`}>
                            ⚠️ Only 12 left in stock
                        </Text>
                    </View>

                    <View style={tw`flex-row items-center gap-3 border border-gray-200 rounded-2xl p-1 bg-gray-50/50`}>
                        <TouchableOpacity
                            style={tw`w-8 h-8 rounded-xl bg-white items-center justify-center border border-gray-200 shadow-2xs`}
                            onPress={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                            <Minus size={14} color="#171717" />
                        </TouchableOpacity>

                        <Text style={tw`text-sm font-extrabold text-gray-950 px-2`}>{quantity}</Text>

                        <TouchableOpacity
                            style={tw`w-8 h-8 rounded-xl bg-market-green items-center justify-center shadow-2xs`}
                            onPress={() => setQuantity(q => q + 1)}
                        >
                            <Plus size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 7. Product Guarantees Grid */}
                <View style={tw`mx-4 my-3 bg-white border border-gray-100 rounded-2xl p-3 flex-row justify-between shadow-2xs`}>
                    {productGuarantees.map((item) => (
                        <View key={item.id} style={tw`flex-1 items-center justify-center p-1`}>
                            <Text style={tw`text-xl mb-1`}>{item.icon}</Text>
                            <Text style={tw`text-[10px] font-bold text-gray-900 text-center leading-3`}>{item.title}</Text>
                            <Text style={tw`text-[8px] text-gray-400 font-medium text-center mt-0.5`}>{item.sub}</Text>
                        </View>
                    ))}
                </View>

                {/* 8. "You may also like" Carousel */}
                <View style={tw`mt-5`}>
                    <View style={tw`flex-row justify-between items-center px-4 mb-3`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>You may also like</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/category-detail')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
                        {recommendedProducts.map((prod) => (
                            <View
                                key={prod.id}
                                style={tw`w-36 bg-white rounded-3xl border border-gray-100 p-2.5 shadow-2xs justify-between relative`}
                            >
                                <View style={tw`absolute top-3 left-3 bg-[#EF4444] px-2 py-0.5 rounded-md z-10`}>
                                    <Text style={tw`text-[9px] font-extrabold text-white`}>{prod.discount}</Text>
                                </View>

                                <TouchableOpacity
                                    style={tw`items-center justify-center h-28 bg-gray-50/50 rounded-2xl p-2 my-2 mt-5`}
                                    onPress={() => router.push(`/product/${prod.id}`)}
                                >
                                    <Image source={prod.image} style={tw`w-20 h-20`} resizeMode="contain" />
                                </TouchableOpacity>

                                <Text style={tw`text-xs font-bold text-gray-900 leading-4`} numberOfLines={1}>
                                    {prod.name}
                                </Text>

                                <Text style={tw`text-xs font-extrabold text-gray-950 mt-1`}>{prod.price}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* 9. Fixed Bottom Floating Action Bar */}
            <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex-row items-center gap-2.5 shadow-lg`}>
                {/* Cart Icon Button */}
                <TouchableOpacity
                    onPress={() => router.push('/cart')}
                    style={tw`w-12 h-12 rounded-2xl border border-gray-200 bg-white items-center justify-center relative shadow-2xs`}
                >
                    <ShoppingBag size={20} color="#171717" />
                    {cartCount > 0 && (
                        <View style={tw`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-market-green items-center justify-center border-2 border-white`}>
                            <Text style={tw`text-white text-[9px] font-bold`}>{cartCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Buy Now Button */}
                <TouchableOpacity
                    onPress={() => router.push('/checkout/delivery')}
                    style={tw`flex-1 border border-gray-200 py-3.5 rounded-2xl items-center justify-center bg-white shadow-2xs`}
                >
                    <Text style={tw`text-xs font-extrabold text-gray-950`}>Buy Now</Text>
                    <Text style={tw`text-[9px] font-bold text-gray-500`}>₦800</Text>
                </TouchableOpacity>

                {/* Add to Cart Button */}
                <TouchableOpacity
                    onPress={() => {
                        setCartCount(c => c + quantity);
                        router.push('/cart');
                    }}
                    style={tw`flex-1 bg-market-green py-3.5 rounded-2xl items-center justify-center shadow-sm`}
                    activeOpacity={0.85}
                >
                    <Text style={tw`text-xs font-extrabold text-white`}>Add to Cart</Text>
                    <Text style={tw`text-[9px] font-bold text-white/80`}>₦800</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}