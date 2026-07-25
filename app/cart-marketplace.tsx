import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    Headphones,
    Info,
    Lock,
    Minus,
    Plus,
    ShieldCheck,
    ShoppingBag,
    Tag,
    Trash2,
    Truck
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialMarketplaceCart = [
    {
        id: 1,
        store: 'TechWorld Store',
        name: 'Apple iPhone 14 Pro 128GB - Deep Purple',
        variant: '128GB / Deep Purple',
        price: '₦780,000',
        oldPrice: '₦850,000',
        discount: '8% OFF',
        quantity: 1,
        checked: true,
        image: require('@/assets/images/prod-apple.png'),
    },
    {
        id: 2,
        store: 'TechWorld Store',
        name: 'MacBook Air M2 256GB - Midnight',
        variant: '256GB / Midnight',
        price: '₦1,250,000',
        oldPrice: '₦1,350,000',
        discount: '7% OFF',
        quantity: 1,
        checked: true,
        image: require('@/assets/images/grocery-bag-small.png'),
    },
    {
        id: 3,
        store: 'TechWorld Store',
        name: 'Apple AirPods Pro (2nd Gen)',
        variant: 'White',
        price: '₦280,000',
        oldPrice: '₦310,000',
        discount: '10% OFF',
        quantity: 1,
        checked: true,
        image: require('@/assets/images/prod-milo.png'),
    },
];

export default function MarketplaceCartScreen() {
    const router = useRouter();
    const [items, setItems] = useState(initialMarketplaceCart);
    const [couponCode, setCouponCode] = useState('');
    const [selectAll, setSelectAll] = useState(true);

    const toggleItemCheck = (id: number) => {
        setItems(prev =>
            prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
        );
    };

    const toggleSelectAll = () => {
        const nextState = !selectAll;
        setSelectAll(nextState);
        setItems(prev => prev.map(item => ({ ...item, checked: nextState })));
    };

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

    const removeSelected = () => {
        setItems(prev => prev.filter(item => !item.checked));
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
                        <Headphones size={22} color="#171717" />
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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-12`}>
                {/* Title & Subtitle Header */}
                <View style={tw`px-4 my-2`}>
                    <Text style={tw`text-2xl font-extrabold text-gray-950`}>
                        Marketplace Cart <Text style={tw`text-sm font-semibold text-gray-400`}>({items.length})</Text>
                    </Text>
                    <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>
                        Review your items and proceed to checkout
                    </Text>
                </View>

                {/* Free Delivery Target Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-3.5 border border-market-green/20 shadow-xs`}>
                    <View style={tw`flex-row items-center justify-between mb-2`}>
                        <View style={tw`flex-row items-center gap-2 flex-1 pr-2`}>
                            <Truck size={16} color="#0A8A3A" />
                            <Text style={tw`text-xs font-bold text-gray-900`}>
                                You are <Text style={tw`text-market-green`}>₦25,000</Text> away from FREE delivery
                            </Text>
                        </View>
                        <Text style={tw`text-xs font-bold text-market-green`}>₦25,000</Text>
                    </View>

                    <View style={tw`w-full h-1.5 bg-gray-200 rounded-full overflow-hidden`}>
                        <View style={tw`w-[50%] h-full bg-market-green rounded-full`} />
                    </View>
                </View>

                {/* Cart Items List */}
                <View style={tw`px-4 my-2 gap-3.5`}>
                    {items.map((item) => (
                        <View key={item.id} style={tw`bg-white rounded-3xl border border-gray-100 p-3.5 shadow-xs flex-row items-start gap-3`}>
                            {/* Left Checkbox */}
                            <TouchableOpacity onPress={() => toggleItemCheck(item.id)} style={tw`mt-8`}>
                                {item.checked ? (
                                    <View style={tw`w-5 h-5 rounded-md bg-market-green items-center justify-center`}>
                                        <Text style={tw`text-white text-[10px] font-bold`}>✓</Text>
                                    </View>
                                ) : (
                                    <View style={tw`w-5 h-5 rounded-md border-2 border-gray-300 bg-white`} />
                                )}
                            </TouchableOpacity>

                            {/* Product Image */}
                            <View style={tw`w-20 h-24 bg-gray-50/50 rounded-2xl items-center justify-center p-1 border border-gray-100`}>
                                <Image source={item.image} style={tw`w-16 h-16`} resizeMode="contain" />
                            </View>

                            {/* Center Product Details */}
                            <View style={tw`flex-1 justify-between h-24 py-0.5`}>
                                <View>
                                    <View style={tw`flex-row items-center gap-1 mb-0.5`}>
                                        <Text style={tw`text-[10px]`}>🏪</Text>
                                        <Text style={tw`text-[10px] font-bold text-market-green`}>{item.store}</Text>
                                        <View style={tw`w-3 h-3 rounded-full bg-blue-500 items-center justify-center`}>
                                            <Text style={tw`text-white text-[7px] font-bold`}>✓</Text>
                                        </View>
                                    </View>

                                    <Text style={tw`text-xs font-bold text-gray-900 leading-4`} numberOfLines={1}>
                                        {item.name}
                                    </Text>

                                    <View style={tw`bg-gray-100 self-start px-2 py-0.5 rounded-md mt-1`}>
                                        <Text style={tw`text-[9px] font-semibold text-gray-600`}>{item.variant}</Text>
                                    </View>
                                </View>

                                <View style={tw`flex-row items-center gap-2`}>
                                    <Text style={tw`text-sm font-extrabold text-market-green`}>{item.price}</Text>
                                    <Text style={tw`text-[10px] text-gray-400 line-through`}>{item.oldPrice}</Text>
                                    <View style={tw`bg-emerald-100 px-1.5 py-0.5 rounded-md`}>
                                        <Text style={tw`text-[9px] font-bold text-market-green`}>{item.discount}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Right Actions (Trash Top, Stepper Bottom) */}
                            <View style={tw`justify-between items-end h-24 py-0.5`}>
                                <TouchableOpacity onPress={() => removeItem(item.id)}>
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

                {/* Buyer Protection Banner */}
                <TouchableOpacity style={tw`mx-4 my-2 bg-[#F8FAFC] rounded-2xl p-3.5 border border-gray-100 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                        <View style={tw`w-9 h-9 rounded-full bg-emerald-100 items-center justify-center`}>
                            <ShieldCheck size={18} color="#0A8A3A" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Buyer Protection</Text>
                            <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>
                                Get your money back if your order isn't delivered or as described.
                            </Text>
                        </View>
                    </View>

                    <ChevronRight size={18} color="#9CA3AF" />
                </TouchableOpacity>

                {/* Coupon Code Box */}
                <View style={tw`mx-4 my-2 flex-row items-center gap-2`}>
                    <View style={tw`flex-1 flex-row items-center border border-gray-200 rounded-2xl px-3.5 h-12 bg-white shadow-xs`}>
                        <Tag size={16} color="#9CA3AF" style={tw`mr-2.5`} />
                        <TextInput
                            style={tw`flex-1 text-xs text-gray-900 h-full font-medium`}
                            placeholder="Enter coupon code"
                            placeholderTextColor="#9CA3AF"
                            value={couponCode}
                            onChangeText={setCouponCode}
                        />
                    </View>

                    <TouchableOpacity style={tw`border border-market-green px-5 h-12 rounded-2xl items-center justify-center bg-white shadow-xs`}>
                        <Text style={tw`text-market-green text-xs font-bold`}>Apply</Text>
                    </TouchableOpacity>
                </View>

                {/* Bill Breakdown & Checkout Card (Side-by-Side Grid) */}
                <View style={tw`mx-4 my-3 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs flex-row gap-4`}>
                    {/* Left: Financial Totals */}
                    <View style={tw`w-1/2 justify-between py-1 border-r border-gray-100 pr-3`}>
                        <View style={tw`gap-2`}>
                            <View style={tw`flex-row justify-between items-center`}>
                                <Text style={tw`text-[11px] text-gray-500 font-medium`}>Subtotal (3 items)</Text>
                                <Text style={tw`text-[11px] font-bold text-gray-900`}>₦2,310,000</Text>
                            </View>

                            <View style={tw`flex-row justify-between items-center`}>
                                <Text style={tw`text-[11px] text-gray-500 font-medium`}>Store Discount</Text>
                                <Text style={tw`text-[11px] font-bold text-market-green`}>-₦200,000</Text>
                            </View>

                            <View style={tw`flex-row justify-between items-center`}>
                                <View style={tw`flex-row items-center gap-0.5`}>
                                    <Text style={tw`text-[11px] text-gray-500 font-medium`}>Delivery Fee</Text>
                                    <Info size={10} color="#9CA3AF" />
                                </View>
                                <Text style={tw`text-[11px] font-bold text-market-green`}>FREE</Text>
                            </View>
                        </View>

                        <View style={tw`border-t border-gray-100 pt-2 mt-2`}>
                            <Text style={tw`text-[10px] text-gray-400 font-bold uppercase`}>Total</Text>
                            <Text style={tw`text-lg font-extrabold text-market-green mt-0.5`}>₦2,110,000</Text>
                        </View>
                    </View>

                    {/* Right: Free Delivery Banner & Proceed CTA */}
                    <View style={tw`w-1/2 justify-between py-1`}>
                        <View style={tw`bg-[#F0FDF4] p-2.5 rounded-2xl border border-market-green/20 mb-2`}>
                            <View style={tw`flex-row items-center gap-1.5 mb-1`}>
                                <Truck size={14} color="#0A8A3A" />
                                <Text style={tw`text-[10px] font-bold text-market-green`}>FREE Delivery</Text>
                            </View>
                            <Text style={tw`text-[9px] text-gray-500 font-medium leading-3`}>
                                Your order qualifies for free standard delivery.
                            </Text>
                            <View style={tw`w-full h-1 bg-market-green rounded-full mt-2`} />
                        </View>

                        <TouchableOpacity
                            style={tw`bg-market-green py-3 px-3 rounded-2xl items-center justify-center shadow-sm`}
                            onPress={() => router.push('/checkout/delivery')}
                            activeOpacity={0.85}
                        >
                            <Text style={tw`text-white text-xs font-bold text-center`}>Proceed to Checkout</Text>
                            <View style={tw`flex-row items-center gap-1 mt-0.5`}>
                                <Lock size={10} color="white" />
                                <Text style={tw`text-[8px] text-white/80 font-semibold`}>Fast & Secure Checkout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bottom Bar: Select All & Remove Selected */}
                <View style={tw`mx-4 my-2 border border-gray-100 rounded-2xl p-3 bg-white flex-row items-center justify-between shadow-xs`}>
                    <TouchableOpacity onPress={toggleSelectAll} style={tw`flex-row items-center gap-2`}>
                        <View style={tw`w-5 h-5 rounded-md border-2 border-market-green bg-[#F0FDF4] items-center justify-center`}>
                            {selectAll && <Text style={tw`text-market-green text-[10px] font-bold`}>✓</Text>}
                        </View>
                        <Text style={tw`text-xs font-bold text-market-green`}>Select All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={removeSelected} style={tw`flex-row items-center gap-1`}>
                        <Trash2 size={14} color="#EF4444" />
                        <Text style={tw`text-xs font-bold text-red-500`}>Remove Selected</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}