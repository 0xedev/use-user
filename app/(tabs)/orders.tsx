import { customerApi } from '@/lib/api/customer';
import { listFrom, money, useApiResource } from '@/lib/api/hooks';
import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, RefreshCw } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = ['All Orders', 'To Pay', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function statusFor(tab: string) {
  const map: Record<string, string | undefined> = { 'To Pay': 'pending_payment', Processing: 'processing', Shipped: 'out_for_delivery', Delivered: 'delivered', Cancelled: 'cancelled' };
  return map[tab];
}

export default function MyOrdersScreen() {
  const router = useRouter();
  const { service } = useLocalSearchParams<{ service?: string }>();
  const [activeTab, setActiveTab] = useState('All Orders');
  const resource = useApiResource(() => customerApi.orders({ status: statusFor(activeTab), serviceType: service, limit: 50 }), [activeTab, service]);
  const orders = useMemo(() => listFrom<any>(resource.data), [resource.data]);

  return <SafeAreaView style={tw`flex-1 bg-white`}>
    <View style={tw`px-4 py-3 flex-row items-center gap-3 border-b border-gray-100`}><TouchableOpacity onPress={() => router.back()}><ArrowLeft size={22} /></TouchableOpacity><Text style={tw`text-2xl font-bold`}><Text style={tw`text-market-green`}>use</Text>Market</Text></View>
    <ScrollView refreshControl={<RefreshControl refreshing={resource.loading} onRefresh={resource.reload} />} contentContainerStyle={tw`pb-10`}>
      <View style={tw`px-4 mt-4`}><Text style={tw`text-2xl font-extrabold`}>{service ? `${service} orders` : 'My Orders'}</Text><Text style={tw`text-xs text-gray-400 mt-1`}>{orders.length} order(s)</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-5 mt-5 pb-2`}>
        {tabs.map(tab => <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={tw`pb-2 ${activeTab === tab ? 'border-b-2 border-market-green' : ''}`}><Text style={tw`text-xs font-bold ${activeTab === tab ? 'text-market-green' : 'text-gray-500'}`}>{tab}</Text></TouchableOpacity>)}
      </ScrollView>
      {resource.loading && !resource.data && <ActivityIndicator color="#0A8A3A" style={tw`mt-20`} />}
      {resource.error && <TouchableOpacity onPress={resource.reload} style={tw`mx-4 mt-5 p-4 bg-red-50 rounded-2xl flex-row items-center gap-2`}><RefreshCw size={16} color="#DC2626" /><Text style={tw`text-red-600 font-bold flex-1`}>{resource.error}</Text></TouchableOpacity>}
      <View style={tw`px-4 mt-4 gap-3`}>
        {orders.map((order: any) => <TouchableOpacity key={order.id} onPress={() => router.push(`/orders/${order.id}` as any)} style={tw`border border-gray-100 rounded-3xl p-4`}>
          <View style={tw`flex-row justify-between items-start`}><View style={tw`flex-row gap-3 flex-1`}><View style={tw`w-11 h-11 rounded-2xl bg-emerald-50 items-center justify-center`}><Text style={tw`text-xl`}>🛍️</Text></View><View style={tw`flex-1`}><Text style={tw`font-extrabold text-xs`}>Order {order.reference || order.orderNumber || order.id}</Text><Text style={tw`text-[10px] text-gray-400 mt-1`}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</Text><Text style={tw`font-extrabold mt-3`}>{money(order.total || order.amount)}</Text></View></View><View style={tw`bg-emerald-50 px-3 py-1 rounded-full`}><Text style={tw`text-[10px] font-bold text-market-green`}>{String(order.status || 'processing').replaceAll('_', ' ')}</Text></View></View>
          <View style={tw`flex-row gap-2 mt-4`}>
            {['delivered', 'cancelled'].includes(String(order.status)) && <TouchableOpacity onPress={() => customerApi.reorder(order.id).then(() => router.push('/cart'))} style={tw`flex-1 border border-market-green py-2.5 rounded-xl items-center`}><Text style={tw`text-market-green font-bold text-xs`}>Reorder</Text></TouchableOpacity>}
            {!['delivered', 'cancelled'].includes(String(order.status)) && <TouchableOpacity onPress={() => router.push({ pathname: '/(features)/whatsapp-order-tracking', params: { orderId: order.id } } as any)} style={tw`flex-1 bg-market-green py-2.5 rounded-xl items-center`}><Text style={tw`text-white font-bold text-xs`}>Track order</Text></TouchableOpacity>}
          </View>
        </TouchableOpacity>)}
        {!resource.loading && orders.length === 0 && <View style={tw`items-center py-24`}><Text style={tw`text-5xl`}>📦</Text><Text style={tw`text-xl font-bold mt-4`}>No orders here yet</Text><TouchableOpacity onPress={() => router.replace('/(tabs)')} style={tw`mt-5 bg-market-green px-6 py-3 rounded-xl`}><Text style={tw`text-white font-bold`}>Start shopping</Text></TouchableOpacity></View>}
      </View>
    </ScrollView>
  </SafeAreaView>;
}
