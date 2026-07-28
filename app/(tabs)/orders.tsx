
import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const orderTabs = ['All Orders', 'To Pay', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const allOrdersDataset = [
    {
        id: 'UM98374621',
        serviceType: 'food',
        date: '24 May 2025 • 10:32 AM',
        items: [require('@/assets/images/prod-rice.png'), require('@/assets/images/prod-oil.png')],
        extraCount: '+1 item',
        total: '₦97,600',
        paymentMethod: 'Paid with useMarket Wallet',
        status: 'Delivered',
        statusSub: 'Delivered on 24 May 2025',
        statusColor: 'text-market-green',
        icon: 'check-bag',
    },
    {
        id: 'UM98234109',
        serviceType: 'gadgets',
        date: '23 May 2025 • 4:15 PM',
        items: [require('@/assets/images/prod-apple.png')],
        extraCount: '+1 item',
        total: '₦780,000',
        paymentMethod: 'Paid with Debit Card',
        status: 'Processing',
        statusSub: 'Preparing your gadget order',
        statusColor: 'text-amber-600',
        icon: 'box',
    },
    {
        id: 'UM98123456',
        serviceType: 'marketplace',
        date: '22 May 2025 • 7:08 PM',
        items: [require('@/assets/images/prod-milo.png')],
        extraCount: '+2 items',
        total: '₦18,750',
        paymentMethod: 'Paid with useMarket Wallet',
        status: 'Out for Delivery',
        statusSub: 'Rider is on the way',
        statusColor: 'text-market-green',
        icon: 'scooter',
    },
];

export default function MyOrdersScreen() {
    const router = useRouter();
    const { service } = useLocalSearchParams<{ service?: string }>();
    const [activeTab, setActiveTab] = useState('All Orders');

    // Filter orders dynamically based on current service choice
    const displayedOrders = service
        ? allOrdersDataset.filter(o => o.serviceType === service)
        : allOrdersDataset;

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`px-4 pt-2 pb-1 flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`w-9 h-9 items-center justify-center`}>
                        <ArrowLeft size={22} color="#171717" />
                    </TouchableOpacity>
                    <Text style={tw`text-2xl font-bold text-black`}>
                        <Text style={tw`text-market-green`}>use</Text>Market
                    </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* Title */}
                <View style={tw`px-4 my-2 flex-row items-center justify-between`}>
                    <View>
                        <Text style={tw`text-2xl font-extrabold text-gray-950`}>
                            {service ? `${service.toUpperCase()} Orders` : 'My Orders'}
                        </Text>
                        <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>
                            Showing {displayedOrders.length} order(s)
                        </Text>
                    </View>
                </View>

                {/* Filter Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-6 my-2 border-b border-gray-100 pb-2`}>
                    {orderTabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={tw`pb-1 relative ${activeTab === tab ? 'border-b-2 border-market-green' : ''}`}
                        >
                            <Text style={tw`text-xs font-bold ${activeTab === tab ? 'text-market-green' : 'text-gray-500'}`}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Orders List */}
                <View style={tw`px-4 gap-3.5 my-2`}>
                    {displayedOrders.map((order) => (
                        <View key={order.id} style={tw`bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-3`}>
                            <View style={tw`flex-row items-start justify-between`}>
                                <View style={tw`flex-row items-start gap-3 flex-1 pr-2`}>
                                    <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100 mt-0.5`}>
                                        <Text style={tw`text-lg`}>🛍️</Text>
                                    </View>

                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-xs font-extrabold text-gray-950`}>Order ID: {order.id}</Text>
                                        <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{order.date}</Text>
                                        <Text style={tw`text-xs font-extrabold text-gray-950 mt-2`}>Total: {order.total}</Text>
                                    </View>
                                </View>

                                <Text style={tw`text-xs font-bold ${order.statusColor}`}>{order.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}