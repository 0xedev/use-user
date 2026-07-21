import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    Award,
    ChevronRight,
    Droplet,
    Heart,
    Leaf,
    Minus,
    Plus,
    Share2,
    ShieldCheck,
    ShoppingBag,
    Trash2
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const weights = ['1kg', '2kg', '3kg', '5kg'];

const features = [
    { icon: <Leaf size={22} color="#0A8A3A" />, title: 'Farm Fresh', desc: 'Carefully\nselected' },
    { icon: <ShieldCheck size={22} color="#0A8A3A" />, title: '100% Natural', desc: 'No artificial\ncolors' },
    { icon: <Droplet size={22} color="#0A8A3A" />, title: 'Hygienically', desc: 'Packed for\nfreshness' },
    { icon: <Award size={22} color="#0A8A3A" />, title: 'Best Quality', desc: 'Handpicked\napples' },
];

const relatedProducts = [
    { id: 1, name: 'Green Apples', qty: '1kg', price: '₦1,100', image: require('@/assets/images/prod-green-apple.png') },
    { id: 2, name: 'Cavendish Banana', qty: '1 bunch', price: '₦650', image: require('@/assets/images/prod-banana.png') },
    { id: 3, name: 'Sweet Oranges', qty: '1kg', price: '₦1,100', image: require('@/assets/images/prod-orange.png') },
    { id: 4, name: 'Red Grapes', qty: '500g', price: '₦1,350', image: require('@/assets/images/prod-grapes.png') },
];

export default function ProductDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [selectedWeight, setSelectedWeight] = useState('1kg');
    const [quantity, setQuantity] = useState(1);
    const [liked, setLiked] = useState(false);

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Navigation */}
                <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="#171717" />
                    </TouchableOpacity>
                    <View style={tw`flex-row items-center gap-4`}>
                        <TouchableOpacity onPress={() => setLiked(!liked)}>
                            <Heart size={22} color={liked ? '#EF4444' : '#171717'} fill={liked ? '#EF4444' : 'transparent'} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Share2 size={22} color="#171717" />
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center bg-gray-50 rounded-full`} onPress={() => router.push('/cart')}>
                            <ShoppingBag size={20} color="#0A8A3A" />
                            <View style={tw`absolute -top-1 -right-1 bg-market-green rounded-full w-4.5 h-4.5 items-center justify-center border border-white`}>
                                <Text style={tw`text-[10px] text-white font-bold`}>5</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Hero Product Image */}
                <View style={tw`px-4 items-center`}>
                    <Image
                        source={require('@/assets/images/prod-apple-large.png')}
                        style={tw`w-full h-64`}
                        resizeMode="contain"
                    />
                    {/* Pagination Indicators */}
                    <View style={tw`flex-row gap-1.5 mt-4`}>
                        <View style={tw`w-5 h-1.5 rounded-full bg-market-green`} />
                        <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
                        <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
                        <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
                    </View>
                </View>

                {/* Product Information */}
                <View style={tw`px-4 mt-6`}>
                    <Text style={tw`text-2xl font-bold text-gray-900`}>Red Apples</Text>
                    <Text style={tw`text-sm text-gray-400 mt-1 font-medium`}>Fresh, Juicy & Crunchy</Text>

                    <View style={tw`flex-row items-center gap-1 mt-2`}>
                        <Text style={tw`text-yellow-500 text-sm`}>⭐</Text>
                        <Text style={tw`text-sm font-semibold text-gray-900`}>4.6</Text>
                        <Text style={tw`text-sm text-gray-400 font-medium`}>(2,345 ratings)</Text>
                    </View>

                    <View style={tw`flex-row items-center gap-3 mt-3`}>
                        <Text style={tw`text-2xl font-bold text-gray-950`}>₦1,200</Text>
                        <View style={tw`bg-market-green-light px-2 py-0.5 rounded border border-market-green/20`}>
                            <Text style={tw`text-xs text-market-green font-bold`}>20% OFF</Text>
                        </View>
                        <Text style={tw`text-sm text-gray-400 line-through`}>₦1,500</Text>
                    </View>

                    {/* Select Weight Section */}
                    <Text style={tw`text-sm font-semibold text-gray-900 mt-5`}>Select Weight</Text>
                    <View style={tw`flex-row gap-3 mt-2.5`}>
                        {weights.map((w) => (
                            <TouchableOpacity
                                key={w}
                                onPress={() => setSelectedWeight(w)}
                                style={tw`px-4.5 py-2.5 rounded-xl border ${selectedWeight === w ? 'bg-market-green-light border-market-green' : 'border-gray-200'}`}>
                                <Text style={tw`text-sm font-bold ${selectedWeight === w ? 'text-market-green' : 'text-gray-700'}`}>{w}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Delivery Card */}
                    <TouchableOpacity style={tw`flex-row items-center justify-between bg-market-green-light rounded-2xl p-4 mt-5`}>
                        <View style={tw`flex-row items-center gap-3 flex-1`}>
                            <Text style={tw`text-2xl`}>🛵</Text>
                            <View>
                                <Text style={tw`text-sm font-bold text-market-green`}>Delivery in 20-30 mins</Text>
                                <Text style={tw`text-xs text-gray-500 mt-0.5`}>From top stores near you</Text>
                            </View>
                        </View>
                        <ChevronRight size={18} color="#0A8A3A" />
                    </TouchableOpacity>

                    {/* Core Feature Badges Grid */}
                    <View style={tw`flex-row justify-between mt-5 py-4 border-t border-b border-gray-100`}>
                        {features.map((f, i) => (
                            <View key={i} style={tw`items-center gap-1.5 flex-1`}>
                                {f.icon}
                                <Text style={tw`text-[10px] font-bold text-gray-950 text-center`}>{f.title}</Text>
                                <Text style={tw`text-[9px] text-gray-400 text-center leading-3`}>{f.desc}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Detailed Specifications */}
                    <Text style={tw`text-base font-bold text-gray-900 mt-5`}>Product Details</Text>
                    <Text style={tw`text-sm text-gray-500 leading-5 mt-2`}>
                        Crisp, juicy and naturally sweet, our red apples are packed with essential nutrients and antioxidants. Perfect for a healthy snack or for your favorite recipes.
                    </Text>

                    <View style={tw`mt-4 gap-1`}>
                        <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
                            <Text style={tw`text-xs text-gray-500 font-semibold`}>Origin</Text>
                            <Text style={tw`text-xs font-bold text-gray-900`}>South Africa</Text>
                        </View>
                        <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
                            <Text style={tw`text-xs text-gray-500 font-semibold`}>Storage Instructions</Text>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Store in a cool, dry place</Text>
                        </View>
                        <View style={tw`flex-row justify-between py-2`}>
                            <Text style={tw`text-xs text-gray-500 font-semibold`}>Shelf Life</Text>
                            <Text style={tw`text-xs font-bold text-gray-900`}>7-10 days</Text>
                        </View>
                    </View>

                    {/* You May Also Like Carousel */}
                    <View style={tw`flex-row justify-between items-center mt-6 mb-3`}>
                        <Text style={tw`text-base font-bold text-gray-900`}>You May Also Like</Text>
                        <TouchableOpacity>
                            <Text style={tw`text-xs text-market-green font-bold`}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3 pb-6`}>
                        {relatedProducts.map((item) => (
                            <View key={item.id} style={tw`w-36 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm relative`}>
                                <TouchableOpacity style={tw`absolute top-3 right-3 z-10`}>
                                    <Heart size={14} color="#D4D4D4" />
                                </TouchableOpacity>
                                <View style={tw`items-center bg-gray-50/50 rounded-xl p-2`}>
                                    <Image source={item.image} style={tw`w-20 h-20`} resizeMode="contain" />
                                </View>
                                <Text style={tw`text-xs font-bold text-gray-900 mt-2`} numberOfLines={1}>{item.name}</Text>
                                <Text style={tw`text-[10px] text-gray-400 mt-0.5`}>{item.qty}</Text>
                                <View style={tw`flex-row justify-between items-center mt-2.5`}>
                                    <Text style={tw`text-xs font-bold text-gray-950`}>{item.price}</Text>
                                    <TouchableOpacity style={tw`bg-market-green w-6 h-6 rounded-full items-center justify-center`}>
                                        <Plus size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Bottom Floating Bar */}
            <View style={tw`px-5 py-3 border-t border-gray-100 flex-row items-center gap-4 bg-white`}>
                {/* Quantity Adjuster */}
                <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-2 bg-gray-50/50 h-13`}>
                    <TouchableOpacity
                        onPress={() => quantity > 1 && setQuantity(q => q - 1)}
                        style={tw`p-2`}
                    >
                        {quantity === 1 ? (
                            <Trash2 size={18} color="#737373" />
                        ) : (
                            <Minus size={18} color="#737373" />
                        )}
                    </TouchableOpacity>
                    <Text style={tw`text-base font-bold text-gray-900 px-3`}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => setQuantity(q => q + 1)}
                        style={tw`p-2`}
                    >
                        <Plus size={18} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>

                {/* Add to Cart CTA */}
                <TouchableOpacity
                    style={tw`flex-1 bg-market-green h-13 rounded-xl flex-row items-center justify-between px-5`}
                    onPress={() => router.push('/cart')}
                >
                    <Text style={tw`text-white text-base font-bold`}>Add to Cart</Text>
                    <Text style={tw`text-white text-base font-bold`}>₦1,200</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}