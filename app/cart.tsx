import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Award,
    ChevronRight,
    MapPin,
    Minus,
    Percent,
    Plus,
    ShieldCheck,
    Trash2
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialCart = [
    { id: 1, name: 'Red Apples', qty: '1kg', price: '₦1,200', oldPrice: '₦1,500', discount: '20% OFF', quantity: 1, image: require('@/assets/images/prod-apple.png') },
    { id: 2, name: 'Cavendish Banana', qty: '1 bunch', price: '₦650', quantity: 1, image: require('@/assets/images/prod-banana.png') },
    { id: 3, name: 'Farm Fresh Milk', qty: '1L', price: '₦1,250', quantity: 1, image: require('@/assets/images/prod-milk.png') },
    { id: 4, name: 'Royal Stallion Parboiled Rice', qty: '5kg', price: '₦6,200', quantity: 1, image: require('@/assets/images/prod-rice.png') },
];

export default function CartScreen() {
    const router = useRouter();
    const [items, setItems] = useState(initialCart);

    const updateQty = (id: number, delta: number) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header and Address Row */}
            <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="#171717" />
                    </TouchableOpacity>
                    <View>
                        <Text style={tw`text-xl font-bold text-gray-900`}>My Cart (4)</Text>
                        <View style={tw`flex-row items-center gap-1 mt-0.5`}>
                            <Text style={tw`text-xs text-gray-400 font-medium`}>Delivering to</Text>
                            <MapPin size={12} color="#0A8A3A" />
                        </View>
                        <Text style={tw`text-xs text-gray-700 font-semibold mt-0.5`}>23 Greenway Street,</Text>
                        <Text style={tw`text-xs text-gray-700 font-semibold`}>Lekki Phase 1, Lagos</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={tw`text-sm text-market-green font-bold`}>Change</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Savings Card */}
                <View style={tw`mx-4 mt-2 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between border border-market-green/20 mb-4`}>
                    <View style={tw`flex-row items-center gap-2.5 flex-1`}>
                        <ShieldCheck size={22} color="#0A8A3A" />
                        <Text style={tw`text-sm text-gray-700 font-medium`}>
                            Yay! You're saving <Text style={tw`font-bold text-market-green`}>₦1,450</Text> on this order
                        </Text>
                    </View>
                    <TouchableOpacity style={tw`flex-row items-center ml-2`}>
                        <Text style={tw`text-xs text-market-green font-bold`}>Details</Text>
                        <ChevronRight size={14} color="#0A8A3A" style={tw`ml-0.5`} />
                    </TouchableOpacity>
                </View>

                {/* Cart Item Cards List */}
                <View style={tw`px-4 gap-4`}>
                    {items.map((item) => (
                        <View key={item.id} style={tw`flex-row gap-4 pb-4 border-b border-gray-100`}>
                            <Image source={item.image} style={tw`w-20 h-20 rounded-2xl`} resizeMode="cover" />
                            <View style={tw`flex-1 justify-between`}>
                                <View style={tw`flex-row justify-between items-start`}>
                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-sm font-bold text-gray-900`}>{item.name}</Text>
                                        <Text style={tw`text-xs text-gray-400 font-medium mt-0.5`}>{item.qty}</Text>
                                        {item.discount && (
                                            <View style={tw`bg-market-green-light self-start px-2 py-0.5 rounded mt-1 border border-market-green/20`}>
                                                <Text style={tw`text-[10px] text-market-green font-bold`}>{item.discount}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <TouchableOpacity>
                                        <Trash2 size={18} color="#737373" />
                                    </TouchableOpacity>
                                </View>

                                <View style={tw`flex-row justify-between items-center mt-3`}>
                                    <View style={tw`flex-row items-center border border-gray-200 rounded-xl bg-gray-50/50`}>
                                        <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={tw`px-3 py-1.5`}>
                                            <Minus size={14} color="#737373" />
                                        </TouchableOpacity>
                                        <Text style={tw`text-sm font-bold text-gray-950 px-2`}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={tw`px-3 py-1.5`}>
                                            <Plus size={14} color="#0A8A3A" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={tw`items-end`}>
                                        <Text style={tw`text-sm font-bold text-gray-900`}>{item.price}</Text>
                                        {item.oldPrice && <Text style={tw`text-[10px] text-gray-400 line-through`}>{item.oldPrice}</Text>}
                                    </View>
                                </View>

                                <TouchableOpacity style={tw`self-end mt-2 border border-gray-200 px-3 py-1.5 rounded-lg bg-white`}>
                                    <Text style={tw`text-xs text-gray-500 font-semibold`}>Save for later</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Circular Free Delivery Progress Card */}
                <View style={tw`mx-4 mt-5 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between`}>
                    <View style={tw`flex-1 pr-3`}>
                        <Text style={tw`text-xs font-bold text-market-green`}>Add ₦2,800 more to get FREE delivery</Text>
                        {/* Progress track */}
                        <View style={tw`h-1.5 bg-gray-200 rounded-full mt-2.5 overflow-hidden`}>
                            <View style={tw`h-full bg-market-green rounded-full w-[72%]`} />
                        </View>
                        <View style={tw`flex-row justify-between mt-1.5`}>
                            <Text style={tw`text-[9px] text-gray-400 font-semibold`}>₦0</Text>
                            <Text style={tw`text-[9px] text-gray-400 font-semibold`}>₦10,000</Text>
                        </View>
                    </View>
                    <View style={tw`w-12 h-12 bg-white rounded-full items-center justify-center border border-market-green/20`}>
                        <Text style={tw`text-xl`}>🛵</Text>
                    </View>
                </View>

                {/* Apply Coupon Card */}
                <TouchableOpacity style={tw`mx-4 mt-4 flex-row items-center justify-between bg-white border border-gray-200 rounded-2xl p-4`}>
                    <View style={tw`flex-row items-center gap-3`}>
                        <Percent size={20} color="#0A8A3A" />
                        <Text style={tw`text-sm font-bold text-gray-900`}>Apply Coupon</Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                        <Text style={tw`text-xs text-market-green font-bold`}>View all</Text>
                        <ChevronRight size={14} color="#0A8A3A" style={tw`ml-0.5`} />
                    </View>
                </TouchableOpacity>

                {/* Bill Summary Table */}
                <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm`}>
                    <Text style={tw`text-base font-bold text-gray-900 mb-4`}>Bill Details</Text>
                    <View style={tw`gap-2.5`}>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Item Total (4 items)</Text>
                            <Text style={tw`text-xs font-semibold text-gray-900`}>₦9,300</Text>
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery Fee</Text>
                            <Text style={tw`text-xs font-semibold text-gray-900`}>₦1,000</Text>
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-xs text-market-green font-semibold`}>Discount</Text>
                            <Text style={tw`text-xs text-market-green font-bold`}>-₦1,450</Text>
                        </View>
                        <View style={tw`h-px bg-gray-100 my-1`} />
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-sm font-bold text-gray-950`}>To Pay</Text>
                            <Text style={tw`text-lg font-bold text-gray-950`}>₦8,850</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Checkout CTA Bar */}
            <View style={tw`px-4 py-3 border-t border-gray-100 flex-row items-center gap-3 bg-white`}>
                <View style={tw`flex-row items-center gap-1.5 bg-[#F2FBF6] px-2.5 py-3 rounded-xl border border-market-green/20`}>
                    <Award size={16} color="#0A8A3A" />
                    <Text style={tw`text-[9px] text-market-green font-bold`}>Safe &{'\n'}Secure</Text>
                </View>
                <TouchableOpacity
                    style={tw`flex-1 bg-market-green h-13 rounded-xl flex-row items-center justify-between px-5`}
                    onPress={() => router.push('/checkout/delivery')}>
                    <View>
                        <Text style={tw`text-white text-base font-bold`}>₦8,850</Text>
                        <Text style={tw`text-[9px] text-white/80 font-medium`}>View Details</Text>
                    </View>
                    <View style={tw`flex-row items-center gap-1`}>
                        <Text style={tw`text-white text-sm font-bold`}>Checkout</Text>
                        <ChevronRight size={16} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}