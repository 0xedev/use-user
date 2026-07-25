import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    ChevronRight,
    Info,
    MapPin,
    Minus,
    Percent,
    Plus,
    Search,
    ShoppingBag,
    Tag,
    Trash2,
    Truck
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialCart = [
    {
        id: 1,
        name: 'Stallion Premium Parboiled Rice',
        unit: '50kg',
        price: '₦68,500',
        savings: 'Save ₦9,500 (12%)',
        quantity: 1,
        image: require('@/assets/images/prod-rice.png'),
    },
    {
        id: 2,
        name: 'Golden Penny Cooking Oil',
        unit: '5L',
        price: '₦12,400',
        savings: 'Save ₦1,100 (8%)',
        quantity: 2,
        image: require('@/assets/images/prod-oil.png'),
    },
    {
        id: 3,
        name: 'Golden Penny Beans (Brown)',
        unit: '1kg',
        price: '₦2,300',
        savings: 'Save ₦400 (15%)',
        quantity: 1,
        image: require('@/assets/images/prod-tomatoes.png'),
    },
];

export default function CartScreen() {
    const router = useRouter();
    const [items, setItems] = useState(initialCart);

    const updateQty = (id: number, delta: number) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Top Navigation Bar */}
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

                    <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center`}>
                        <ShoppingBag size={22} color="#171717" />
                        <View style={tw`absolute -top-1 -right-1 w-4.5 h-4.5 bg-market-green rounded-full items-center justify-center border-2 border-white`}>
                            <Text style={tw`text-white text-[9px] font-bold`}>{items.length}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-32`}>
                {/* My Cart Title Row & Clear Cart */}
                <View style={tw`px-4 my-2 flex-row items-center justify-between`}>
                    <Text style={tw`text-xl font-bold text-gray-950`}>
                        My Cart <Text style={tw`text-sm font-semibold text-gray-400`}>({items.length} items)</Text>
                    </Text>

                    {items.length > 0 && (
                        <TouchableOpacity onPress={clearCart} style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs font-bold text-red-500`}>Clear Cart</Text>
                            <Trash2 size={14} color="#EF4444" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Delivery Address & Time Card */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/10 gap-3 shadow-xs`}>
                    {/* Row 1: Address */}
                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center gap-2.5 flex-1 pr-2`}>
                            <MapPin size={18} color="#0A8A3A" />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Deliver to</Text>
                                <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>
                                    23 Adekunle Street, Yaba, Lagos
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => router.push('/(location)/index')}>
                            <Text style={tw`text-xs font-bold text-market-green`}>Change</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`h-px bg-emerald-100/60 w-full`} />

                    {/* Row 2: Estimated Time */}
                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center gap-2.5 flex-1 pr-2`}>
                            <Truck size={18} color="#0A8A3A" />
                            <Text style={tw`text-xs font-semibold text-gray-800`}>
                                Estimated delivery: <Text style={tw`font-bold text-gray-950`}>Today, 10:00 AM – 12:00 PM</Text>
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={tw`text-xs font-bold text-market-green`}>Change time</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Cart Items List */}
                <View style={tw`px-4 my-2 gap-3.5`}>
                    {items.map((item) => (
                        <View key={item.id} style={tw`bg-white rounded-2xl border border-gray-100 p-3.5 shadow-xs flex-row items-center justify-between`}>
                            {/* Left Product Image */}
                            <View style={tw`w-20 h-20 bg-gray-50/50 rounded-xl items-center justify-center p-1 border border-gray-100`}>
                                <Image source={item.image} style={tw`w-16 h-16`} resizeMode="contain" />
                            </View>

                            {/* Center Product Info */}
                            <View style={tw`flex-1 mx-3 justify-between h-20 py-0.5`}>
                                <View>
                                    <Text style={tw`text-xs font-bold text-gray-900 leading-4`} numberOfLines={2}>
                                        {item.name}
                                    </Text>
                                    <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{item.unit}</Text>
                                </View>

                                <View>
                                    <Text style={tw`text-sm font-extrabold text-market-green`}>{item.price}</Text>
                                    <View style={tw`bg-red-50 px-2 py-0.5 rounded-md self-start mt-0.5`}>
                                        <Text style={tw`text-[9px] font-bold text-red-600`}>{item.savings}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Right Stepper & Delete */}
                            <View style={tw`flex-row items-center gap-2`}>
                                <TouchableOpacity
                                    style={tw`w-8 h-8 rounded-xl bg-gray-50 items-center justify-center border border-gray-200`}
                                    onPress={() => removeItem(item.id)}
                                >
                                    <Trash2 size={16} color="#9CA3AF" />
                                </TouchableOpacity>

                                <View style={tw`flex-row items-center gap-2 border border-gray-200 rounded-xl p-1 bg-gray-50/50`}>
                                    <TouchableOpacity
                                        style={tw`w-6 h-6 rounded-lg bg-white items-center justify-center border border-gray-200`}
                                        onPress={() => updateQty(item.id, -1)}
                                    >
                                        <Minus size={12} color="#171717" />
                                    </TouchableOpacity>

                                    <Text style={tw`text-xs font-bold text-gray-900 px-1`}>{item.quantity}</Text>

                                    <TouchableOpacity
                                        style={tw`w-6 h-6 rounded-lg bg-emerald-100 items-center justify-center`}
                                        onPress={() => updateQty(item.id, 1)}
                                    >
                                        <Plus size={12} color="#0A8A3A" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Free Delivery Target Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/20 shadow-xs`}>
                    <View style={tw`flex-row items-center justify-between mb-2`}>
                        <View style={tw`flex-row items-center gap-2 flex-1`}>
                            <Tag size={16} color="#0A8A3A" />
                            <Text style={tw`text-xs font-bold text-gray-900`}>
                                Add items worth <Text style={tw`text-market-green`}>₦17,800</Text> more to enjoy FREE delivery
                            </Text>
                        </View>
                        <Text style={tw`text-xs font-bold text-market-green`}>₦17,800</Text>
                    </View>

                    {/* Progress Bar */}
                    <View style={tw`w-full h-1.5 bg-gray-200 rounded-full overflow-hidden`}>
                        <View style={tw`w-[62%] h-full bg-market-green rounded-full`} />
                    </View>
                </View>

                {/* Promo Code Coupon Card */}
                <TouchableOpacity style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3`}>
                        <View style={tw`w-9 h-9 rounded-xl bg-market-green/10 items-center justify-center`}>
                            <Percent size={18} color="#0A8A3A" />
                        </View>
                        <View>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Have a promo code?</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-medium mt-0.5`}>Add a promo code to get discounts</Text>
                        </View>
                    </View>

                    <View style={tw`flex-row items-center gap-1`}>
                        <Text style={tw`text-xs font-bold text-market-green`}>Apply</Text>
                        <ChevronRight size={16} color="#0A8A3A" />
                    </View>
                </TouchableOpacity>

                {/* Bill Details Summary Card */}
                <View style={tw`mx-4 my-3 bg-white rounded-3xl border border-gray-100 p-5 shadow-xs gap-3`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Subtotal (3 items)</Text>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦95,600</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery fee</Text>
                            <Info size={12} color="#9CA3AF" />
                        </View>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦1,500</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Service fee</Text>
                            <Info size={12} color="#9CA3AF" />
                        </View>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦500</Text>
                    </View>

                    <View style={tw`h-px bg-gray-100 w-full my-1`} />

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Total</Text>
                        <Text style={tw`text-xl font-extrabold text-gray-950`}>₦97,600</Text>
                    </View>

                    {/* Savings Pill */}
                    <View style={tw`bg-[#F0FDF4] border border-market-green/20 rounded-xl p-2.5 flex-row items-center gap-2 mt-1`}>
                        <Tag size={14} color="#0A8A3A" />
                        <Text style={tw`text-xs font-bold text-market-green`}>You're saving ₦11,000 on this order</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Floating Action Bar */}
            <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex-row items-center gap-3 shadow-lg`}>
                {/* Continue Shopping Button */}
                <TouchableOpacity
                    style={tw`flex-1 border border-gray-200 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 bg-white`}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <ArrowLeft size={16} color="#171717" />
                    <Text style={tw`text-gray-800 text-xs font-bold`}>Continue Shopping</Text>
                </TouchableOpacity>

                {/* Proceed to Checkout Button */}
                <TouchableOpacity
                    style={tw`flex-1 bg-market-green py-3.5 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm`}
                    onPress={() => router.push('/checkout/delivery')}
                    activeOpacity={0.85}
                >
                    <Text style={tw`text-white text-xs font-bold`}>Proceed to Checkout</Text>
                    <ArrowRight size={16} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}