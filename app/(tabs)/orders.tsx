import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bell,
    ChevronDown,
    ChevronRight,
    Clock,
    Filter,
    Headphones,
    RefreshCw,
    Search,
    ShoppingBag,
    SlidersHorizontal,
    Truck,
    X
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const orderTabs = ['All Orders', 'To Pay', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const ordersList = [
    {
        id: 'UM98374621',
        date: '24 May 2025 • 10:32 AM',
        items: [
            require('@/assets/images/prod-rice.png'),
            require('@/assets/images/prod-oil.png'),
            require('@/assets/images/prod-tomatoes.png'),
        ],
        extraCount: '+1 item',
        total: '₦97,600',
        paymentMethod: 'Paid with useMarket Wallet',
        status: 'Delivered',
        statusSub: 'Delivered on 24 May 2025',
        statusColor: 'text-market-green',
        icon: 'check-bag',
        actions: ['details', 'reorder'],
    },
    {
        id: 'UM98234109',
        date: '23 May 2025 • 4:15 PM',
        items: [
            require('@/assets/images/prod-milk.png'),
            require('@/assets/images/prod-cornflakes.png'),
            require('@/assets/images/prod-indomie.png'),
        ],
        extraCount: '+2 items',
        total: '₦43,200',
        paymentMethod: 'Paid with Debit Card',
        status: 'Processing',
        statusSub: 'Preparing your order',
        statusColor: 'text-amber-600',
        icon: 'box',
        actions: ['details', 'cancel'],
    },
    {
        id: 'UM98123456',
        date: '22 May 2025 • 7:08 PM',
        items: [
            require('@/assets/images/prod-rice.png'),
            require('@/assets/images/prod-oil.png'),
            require('@/assets/images/prod-indomie.png'),
        ],
        extraCount: '+3 items',
        total: '₦18,750',
        paymentMethod: 'Paid with useMarket Wallet',
        status: 'Out for Delivery',
        statusSub: 'Rider is on the way',
        statusColor: 'text-market-green',
        icon: 'scooter',
        actions: ['track', 'details'],
    },
    {
        id: 'UM97987654',
        date: '20 May 2025 • 11:20 AM',
        items: [
            require('@/assets/images/prod-cornflakes.png'),
            require('@/assets/images/prod-milo.png'),
            require('@/assets/images/prod-milk.png'),
        ],
        extraCount: '+4 items',
        total: '₦31,400',
        paymentMethod: 'Paid with Bank Transfer',
        status: 'Delivered',
        statusSub: 'Delivered on 20 May 2025',
        statusColor: 'text-blue-600',
        icon: 'doc',
        actions: ['details', 'reorder'],
    },
    {
        id: 'UM97876543',
        date: '18 May 2025 • 2:33 PM',
        items: [
            require('@/assets/images/prod-oil.png'),
            require('@/assets/images/prod-milo.png'),
        ],
        extraCount: '+1 item',
        total: '₦12,900',
        paymentMethod: 'Paid with useMarket Wallet',
        status: 'Cancelled',
        statusSub: 'Cancelled on 18 May 2025',
        statusColor: 'text-red-600',
        icon: 'cancel',
        actions: ['details'],
    },
];

export default function MyOrdersScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('All Orders');

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

                    <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center`} onPress={() => router.push('/cart')}>
                        <ShoppingBag size={22} color="#171717" />
                        <View style={tw`absolute -top-1 -right-1 w-4.5 h-4.5 bg-market-green rounded-full items-center justify-center border-2 border-white`}>
                            <Text style={tw`text-white text-[9px] font-bold`}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* Title & Filter Header */}
                <View style={tw`px-4 my-2 flex-row items-center justify-between`}>
                    <View>
                        <Text style={tw`text-2xl font-extrabold text-gray-950`}>My Orders</Text>
                        <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>View and manage all your orders</Text>
                    </View>

                    <View style={tw`flex-row items-center gap-3`}>
                        <TouchableOpacity style={tw`w-9 h-9 items-center justify-center`}>
                            <Search size={20} color="#171717" />
                        </TouchableOpacity>

                        <TouchableOpacity style={tw`flex-row items-center gap-1.5`}>
                            <Filter size={18} color="#0A8A3A" />
                            <Text style={tw`text-xs font-bold text-market-green`}>Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Filter Tabs Horizontal Scroll Bar */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-6 my-2 border-b border-gray-100 pb-2`}>
                    {orderTabs.map((tab) => {
                        const isSelected = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={tw`pb-1 relative ${isSelected ? 'border-b-2 border-market-green' : ''}`}
                            >
                                <Text style={tw`text-xs font-bold ${isSelected ? 'text-market-green' : 'text-gray-500'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Sort Dropdown Section */}
                <View style={tw`px-4 my-2 flex-row items-center justify-between`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>Recent Orders</Text>
                    <TouchableOpacity style={tw`flex-row items-center gap-1`}>
                        <Text style={tw`text-xs font-semibold text-gray-500`}>Sort by:</Text>
                        <Text style={tw`text-xs font-bold text-gray-900`}>Newest</Text>
                        <ChevronDown size={14} color="#171717" />
                    </TouchableOpacity>
                </View>

                {/* Orders Cards List */}
                <View style={tw`px-4 gap-3.5 my-2`}>
                    {ordersList.map((order) => (
                        <View key={order.id} style={tw`bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-3`}>
                            {/* Card Top Row */}
                            <View style={tw`flex-row items-start justify-between`}>
                                <View style={tw`flex-row items-start gap-3 flex-1 pr-2`}>
                                    {/* Icon Badge */}
                                    <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100 mt-0.5`}>
                                        {order.icon === 'check-bag' && <Text style={tw`text-lg`}>🛍️</Text>}
                                        {order.icon === 'box' && <Text style={tw`text-lg`}>📦</Text>}
                                        {order.icon === 'scooter' && <Text style={tw`text-lg`}>🛵</Text>}
                                        {order.icon === 'doc' && <Text style={tw`text-lg`}>📑</Text>}
                                        {order.icon === 'cancel' && <X size={20} color="#DC2626" />}
                                    </View>

                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-xs font-extrabold text-gray-950`}>
                                            Order ID: {order.id}
                                        </Text>
                                        <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>
                                            {order.date}
                                        </Text>

                                        {/* Product Thumbnails */}
                                        <View style={tw`flex-row items-center gap-1.5 my-2.5`}>
                                            {order.items.map((img, idx) => (
                                                <Image key={idx} source={img} style={tw`w-9 h-9 rounded-xl border border-gray-100 bg-gray-50/50`} resizeMode="contain" />
                                            ))}
                                            <View style={tw`bg-gray-100 px-2 py-1 rounded-lg`}>
                                                <Text style={tw`text-[9px] font-bold text-gray-600`}>{order.extraCount}</Text>
                                            </View>
                                        </View>

                                        <Text style={tw`text-xs font-extrabold text-gray-950`}>
                                            Total: {order.total}
                                        </Text>
                                        <Text style={tw`text-[10px] font-semibold text-market-green mt-0.5`}>
                                            {order.paymentMethod}
                                        </Text>
                                    </View>
                                </View>

                                {/* Right Status & Chevron */}
                                <View style={tw`items-end justify-between h-full`}>
                                    <View style={tw`flex-row items-center gap-1`}>
                                        <Text style={tw`text-xs font-bold ${order.statusColor}`}>
                                            {order.status}
                                        </Text>
                                        <ChevronRight size={16} color="#9CA3AF" />
                                    </View>
                                    <Text style={tw`text-[9px] text-gray-400 font-medium mt-1`}>
                                        {order.statusSub}
                                    </Text>
                                </View>
                            </View>

                            {/* Card Action Buttons Row */}
                            <View style={tw`flex-row items-center justify-end gap-2 pt-2 border-t border-gray-50`}>
                                {order.actions.includes('track') && (
                                    <TouchableOpacity
                                        style={tw`border border-market-green px-3.5 py-1.5 rounded-xl bg-white`}
                                        onPress={() => router.push('/(tabs)/orders')}
                                    >
                                        <Text style={tw`text-market-green text-xs font-bold`}>Track Order</Text>
                                    </TouchableOpacity>
                                )}

                                {order.actions.includes('details') && (
                                    <TouchableOpacity
                                        style={tw`border border-market-green px-3.5 py-1.5 rounded-xl bg-white`}
                                        onPress={() => router.push('/order-details')}
                                    >
                                        <Text style={tw`text-market-green text-xs font-bold`}>Order Details</Text>
                                    </TouchableOpacity>
                                )}

                                {order.actions.includes('reorder') && (
                                    <TouchableOpacity
                                        style={tw`bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-xl flex-row items-center gap-1`}
                                        onPress={() => router.push('/cart')}
                                    >
                                        <RefreshCw size={12} color="#0A8A3A" />
                                        <Text style={tw`text-market-green text-xs font-bold`}>Reorder</Text>
                                    </TouchableOpacity>
                                )}

                                {order.actions.includes('cancel') && (
                                    <TouchableOpacity style={tw`border border-gray-200 px-3.5 py-1.5 rounded-xl bg-white`}>
                                        <Text style={tw`text-gray-700 text-xs font-bold`}>Cancel Order</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Need Help Banner */}
                <TouchableOpacity style={tw`mx-4 my-3 bg-[#F0FDF4] rounded-2xl p-3.5 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                        <View style={tw`w-10 h-10 rounded-full bg-market-green/10 items-center justify-center`}>
                            <Headphones size={20} color="#0A8A3A" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>Need help with your order?</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                Our support team is here to help you.
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={tw`border border-market-green px-3 py-1.5 rounded-xl bg-white shadow-xs flex-row items-center gap-1`}>
                        <Headphones size={12} color="#0A8A3A" />
                        <Text style={tw`text-market-green text-xs font-bold`}>Contact Support</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}