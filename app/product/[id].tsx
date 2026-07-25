import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    CheckCircle2,
    ChevronDown,
    Heart,
    MapPin,
    Minus,
    Plus,
    RotateCcw,
    Search,
    ShieldCheck,
    ShoppingBag,
    ShoppingCart,
    Trash2,
    Truck
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sizeVariants = [
    { size: '50kg', price: '₦68,500' },
    { size: '25kg', price: '₦35,000' },
    { size: '10kg', price: '₦15,000' },
];

const highlights = [
    'Long grain',
    'Natural aroma',
    'Great taste',
    '100% sortexed',
    'High quality',
];

const relatedProducts = [
    { id: 1, name: "Mama's Pride Parboiled Rice 10kg", price: '₦17,800', image: require('@/assets/images/prod-rice.png') },
    { id: 2, name: 'Golden Penny Parboiled Rice 50kg', price: '₦65,000', image: require('@/assets/images/prod-rice.png') },
    { id: 3, name: 'Royal Umbrella Classic Rice 5kg', price: '₦9,200', image: require('@/assets/images/prod-rice.png') },
    { id: 4, name: 'Cap King Parboiled Rice 50kg', price: '₦66,000', image: require('@/assets/images/prod-rice.png') },
];

export default function ProductDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [selectedSize, setSelectedSize] = useState('50kg');
    const [quantity, setQuantity] = useState(1);
    const [liked, setLiked] = useState(false);

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header Navigation */}
            <View style={tw`px-4 pt-2 pb-1 flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`w-9 h-9 items-center justify-center`}>
                        <ArrowLeft size={22} color="#171717" />
                    </TouchableOpacity>
                    <Text style={tw`text-2xl font-bold text-black`}>
                        <Text style={tw`text-market-green`}>use</Text>Market
                    </Text>
                </View>

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
                            <Text style={tw`text-white text-[9px] font-bold`}>3</Text>
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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-28`}>
                {/* Hero Product View (Side-by-Side Card & Details) */}
                <View style={tw`px-4 my-2 flex-row gap-4 items-start`}>
                    {/* Left: Product Image Box */}
                    <View style={tw`w-1/2 bg-white rounded-3xl border border-gray-100 p-3 shadow-xs relative items-center`}>
                        {/* Discount Badge */}
                        <View style={tw`absolute top-3 left-3 bg-red-100 px-2 py-0.5 rounded-md z-10`}>
                            <Text style={tw`text-[10px] font-bold text-red-600`}>-12%</Text>
                        </View>

                        {/* Heart Button */}
                        <TouchableOpacity
                            style={tw`absolute top-3 right-3 z-10`}
                            onPress={() => setLiked(!liked)}
                        >
                            <Heart
                                size={20}
                                color={liked ? '#EF4444' : '#9CA3AF'}
                                fill={liked ? '#EF4444' : 'transparent'}
                            />
                        </TouchableOpacity>

                        {/* Product Image */}
                        <Image
                            source={require('@/assets/images/prod-rice.png')}
                            style={tw`w-36 h-48 my-4`}
                            resizeMode="contain"
                        />

                        {/* Pagination Badge */}
                        <View style={tw`flex-row items-center justify-between w-full px-1 mt-2`}>
                            <View style={tw`flex-row gap-1`}>
                                <View style={tw`w-4 h-1 bg-market-green rounded-full`} />
                                <View style={tw`w-1 h-1 bg-gray-300 rounded-full`} />
                                <View style={tw`w-1 h-1 bg-gray-300 rounded-full`} />
                                <View style={tw`w-1 h-1 bg-gray-300 rounded-full`} />
                            </View>
                            <View style={tw`bg-gray-800 px-2 py-0.5 rounded-md`}>
                                <Text style={tw`text-[9px] font-bold text-white`}>1/4</Text>
                            </View>
                        </View>
                    </View>

                    {/* Right: Product Meta Info */}
                    <View style={tw`w-1/2 justify-between py-1`}>
                        {/* Best Seller Pill */}
                        <View style={tw`bg-emerald-100 self-start px-2.5 py-0.5 rounded-md mb-2`}>
                            <Text style={tw`text-[10px] font-semibold text-market-green`}>Best Seller</Text>
                        </View>

                        <Text style={tw`text-lg font-extrabold text-gray-950 leading-5`}>
                            Stallion Premium Parboiled Rice
                        </Text>
                        <Text style={tw`text-xs text-gray-400 font-semibold mt-1`}>50kg</Text>

                        {/* Rating & Sold */}
                        <View style={tw`flex-row items-center gap-1.5 my-2`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>⭐ 4.6</Text>
                            <Text style={tw`text-[10px] text-gray-400 font-medium`}>(1,245 reviews)</Text>
                            <Text style={tw`text-[10px] text-gray-300`}>|</Text>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold`}>2K+ sold</Text>
                        </View>

                        {/* Pricing */}
                        <Text style={tw`text-2xl font-extrabold text-market-green`}>₦68,500</Text>
                        <View style={tw`flex-row items-center gap-2 mt-0.5`}>
                            <Text style={tw`text-xs text-gray-400 line-through`}>₦78,000</Text>
                            <View style={tw`bg-red-50 px-2 py-0.5 rounded-md`}>
                                <Text style={tw`text-[9px] font-bold text-red-600`}>Save ₦9,500 (12%)</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Trust Guarantees Bar */}
                <View style={tw`mx-4 my-3 bg-[#F0FDF4] rounded-2xl py-3 px-3 border border-market-green/20 flex-row items-center justify-around shadow-xs`}>
                    <View style={tw`flex-row items-center gap-1.5`}>
                        <ShieldCheck size={16} color="#0A8A3A" />
                        <View>
                            <Text style={tw`text-[10px] font-bold text-gray-900`}>100% Original</Text>
                            <Text style={tw`text-[8px] text-gray-500`}>Quality guaranteed</Text>
                        </View>
                    </View>

                    <View style={tw`w-px h-5 bg-emerald-200`} />

                    <View style={tw`flex-row items-center gap-1.5`}>
                        <Truck size={16} color="#0A8A3A" />
                        <View>
                            <Text style={tw`text-[10px] font-bold text-gray-900`}>Fast Delivery</Text>
                            <Text style={tw`text-[8px] text-gray-500`}>Get it as fast as 30 mins</Text>
                        </View>
                    </View>

                    <View style={tw`w-px h-5 bg-emerald-200`} />

                    <View style={tw`flex-row items-center gap-1.5`}>
                        <RotateCcw size={16} color="#0A8A3A" />
                        <View>
                            <Text style={tw`text-[10px] font-bold text-gray-900`}>Easy Returns</Text>
                            <Text style={tw`text-[8px] text-gray-500`}>Return within 7 days</Text>
                        </View>
                    </View>
                </View>

                {/* Select Size Variant Section */}
                <View style={tw`px-4 my-3`}>
                    <Text style={tw`text-sm font-bold text-gray-900 mb-2.5`}>Select Size</Text>
                    <View style={tw`flex-row gap-3`}>
                        {sizeVariants.map((item) => {
                            const isSelected = selectedSize === item.size;
                            return (
                                <TouchableOpacity
                                    key={item.size}
                                    onPress={() => setSelectedSize(item.size)}
                                    style={tw`flex-1 p-3 rounded-2xl border items-center justify-center ${isSelected
                                            ? 'border-market-green bg-[#F0FDF4]'
                                            : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    <Text style={tw`text-sm font-bold ${isSelected ? 'text-market-green' : 'text-gray-900'}`}>
                                        {item.size}
                                    </Text>
                                    <Text style={tw`text-[10px] font-semibold text-gray-500 mt-0.5`}>
                                        {item.price}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Product Highlights */}
                <View style={tw`px-4 my-3`}>
                    <Text style={tw`text-sm font-bold text-gray-900 mb-2`}>Product highlights</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3`}>
                        {highlights.map((item) => (
                            <View key={item} style={tw`flex-row items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full`}>
                                <CheckCircle2 size={14} color="#0A8A3A" />
                                <Text style={tw`text-xs font-semibold text-gray-800`}>{item}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Store Vendor Card */}
                <View style={tw`mx-4 my-3 bg-[#F8FAFC] rounded-2xl p-3.5 border border-gray-100 flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                        <View style={tw`w-12 h-12 rounded-2xl bg-emerald-100 items-center justify-center border border-emerald-200`}>
                            <Text style={tw`text-2xl`}>🏪</Text>
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Sold by</Text>
                            <View style={tw`flex-row items-center gap-1 mt-0.5`}>
                                <Text style={tw`text-sm font-bold text-gray-900`}>Konga Fresh Store</Text>
                                <View style={tw`w-3.5 h-3.5 rounded-full bg-market-green items-center justify-center`}>
                                    <Text style={tw`text-white text-[8px] font-bold`}>✓</Text>
                                </View>
                            </View>
                            <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`}>4.5 ⭐ (1,380 ratings)</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={tw`border border-market-green px-3 py-1.5 rounded-xl bg-white flex-row items-center gap-1`}>
                        <Text style={tw`text-xs font-bold text-market-green`}>View Store</Text>
                        <ArrowRight size={12} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* Recommended / You May Also Like Carousel */}
                <View style={tw`flex-row justify-between items-center px-4 mt-4 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>You may also like</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-2`}>
                    {relatedProducts.map((item) => (
                        <View key={item.id} style={tw`w-38 bg-white rounded-2xl border border-gray-100 p-3 shadow-xs`}>
                            <View style={tw`items-center justify-center h-24 bg-gray-50/50 rounded-xl p-2`}>
                                <Image source={item.image} style={tw`w-16 h-16`} resizeMode="contain" />
                            </View>

                            <Text style={tw`text-xs font-bold text-gray-900 mt-2`} numberOfLines={2}>
                                {item.name}
                            </Text>

                            <View style={tw`flex-row items-center justify-between mt-2`}>
                                <Text style={tw`text-xs font-extrabold text-gray-950`}>{item.price}</Text>
                                <TouchableOpacity style={tw`w-7 h-7 rounded-xl bg-market-green items-center justify-center`}>
                                    <Plus size={14} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>

            {/* Bottom Floating Action Bar */}
            <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex-row items-center justify-between shadow-lg`}>
                {/* Stepper Controls */}
                <View style={tw`flex-row items-center gap-2 border border-gray-200 rounded-2xl p-1 bg-gray-50/50`}>
                    <TouchableOpacity
                        style={tw`w-8 h-8 rounded-xl bg-white items-center justify-center border border-gray-200`}
                        onPress={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                        {quantity === 1 ? (
                            <Trash2 size={16} color="#9CA3AF" />
                        ) : (
                            <Minus size={16} color="#171717" />
                        )}
                    </TouchableOpacity>

                    <Text style={tw`text-sm font-bold text-gray-900 px-2`}>{quantity}</Text>

                    <TouchableOpacity
                        style={tw`w-8 h-8 rounded-xl bg-emerald-100 items-center justify-center`}
                        onPress={() => setQuantity(q => q + 1)}
                    >
                        <Plus size={16} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* Total & Add to Cart Button */}
                <View style={tw`flex-row items-center gap-3 flex-1 justify-end ml-3`}>
                    <View style={tw`items-end`}>
                        <Text style={tw`text-[10px] text-gray-400 font-bold uppercase`}>Total</Text>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>₦68,500</Text>
                    </View>

                    <TouchableOpacity
                        style={tw`bg-market-green px-6 py-3.5 rounded-2xl flex-row items-center gap-2 shadow-sm`}
                        onPress={() => router.push('/cart')}
                        activeOpacity={0.85}
                    >
                        <ShoppingCart size={18} color="white" />
                        <Text style={tw`text-white text-sm font-bold`}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}