import { customerApi } from '@/lib/api/customer';
import { listFrom, money, useApiResource } from '@/lib/api/hooks';
import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import { Bell, ChevronDown, MapPin, Search, ShoppingBag, SlidersHorizontal, Star } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
  { id: 'food', title: 'Order Food', sub: 'Restaurants near you', icon: '🍔', query: 'food' },
  { id: 'groceries', title: 'Shop Groceries', sub: 'Fresh market essentials', icon: '🛍️', query: 'groceries' },
  { id: 'pharmacy', title: 'Pharmacy', sub: 'Approved health stores', icon: '💊', query: 'pharmacy' },
  { id: 'marketplace', title: 'Marketplace', sub: 'Everything in one place', icon: '🏬', query: '' },
];
const fallbackImage = require('@/assets/images/prod-rice.png');

export default function CategoriesScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const resource = useApiResource(async () => {
    const [stores, products, carts] = await Promise.all([
      customerApi.stores({ q: query || undefined, limit: 30 }),
      customerApi.searchCatalogue({ q: query || undefined, limit: 30 }),
      customerApi.carts({ status: 'active', limit: 1 }).catch(() => null),
    ]);
    return { stores, products, carts };
  }, [query]);
  const stores = useMemo(() => listFrom<any>(resource.data?.stores), [resource.data]);
  const products = useMemo(() => listFrom<any>(resource.data?.products), [resource.data]);
  const cart = useMemo(() => listFrom<any>(resource.data?.carts)[0], [resource.data]);
  const cartCount = cart?.items?.reduce?.((sum: number, item: any) => sum + Number(item.quantity || 1), 0) || 0;

  return <SafeAreaView style={tw`flex-1 bg-white`}>
    <View style={tw`px-4 pt-2 pb-2 flex-row items-center justify-between`}>
      <View style={tw`flex-1`}><Text style={tw`text-xs text-gray-500`}>Explore useMarket</Text><Text style={tw`text-2xl font-bold`}>Categories</Text><TouchableOpacity onPress={() => router.push('/(location)/index')} style={tw`flex-row items-center gap-1 mt-1`}><MapPin size={14} color="#0A8A3A" /><Text style={tw`text-xs font-bold`}>Current delivery location</Text><ChevronDown size={14} /></TouchableOpacity></View>
      <TouchableOpacity style={tw`w-10 h-10 items-center justify-center`}><Bell size={20} /></TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/cart')} style={tw`relative w-10 h-10 items-center justify-center`}><ShoppingBag size={20} />{cartCount > 0 && <View style={tw`absolute top-0 right-0 bg-market-green rounded-full px-1.5`}><Text style={tw`text-white text-[9px] font-bold`}>{cartCount}</Text></View>}</TouchableOpacity>
    </View>

    <ScrollView refreshControl={<RefreshControl refreshing={resource.loading} onRefresh={resource.reload} />} contentContainerStyle={tw`pb-12`}>
      <View style={tw`px-4 mt-3 flex-row gap-2`}><View style={tw`flex-1 h-12 rounded-2xl border border-gray-200 flex-row items-center px-4`}><Search size={18} color="#9CA3AF" /><TextInput value={query} onChangeText={setQuery} placeholder="Search stores, products or dishes" style={tw`flex-1 px-3 text-sm`} /></View><TouchableOpacity style={tw`w-12 h-12 rounded-2xl border border-gray-200 items-center justify-center`}><SlidersHorizontal size={18} color="#0A8A3A" /></TouchableOpacity></View>

      <View style={tw`px-4 mt-6`}><Text style={tw`text-base font-extrabold mb-3`}>What would you like today?</Text><View style={tw`flex-row flex-wrap justify-between gap-y-3`}>{services.map(service => <TouchableOpacity key={service.id} onPress={() => setQuery(service.query)} style={tw`w-[48.5%] h-32 bg-emerald-50 rounded-3xl p-4 border border-emerald-100`}><Text style={tw`text-3xl`}>{service.icon}</Text><Text style={tw`font-bold mt-3`}>{service.title}</Text><Text style={tw`text-[10px] text-gray-500 mt-1`}>{service.sub}</Text></TouchableOpacity>)}</View></View>

      {resource.loading && !resource.data && <ActivityIndicator color="#0A8A3A" style={tw`my-12`} />}
      {resource.error && <TouchableOpacity onPress={resource.reload} style={tw`mx-4 mt-5 p-4 bg-red-50 rounded-2xl`}><Text style={tw`text-red-600 font-bold`}>{resource.error}</Text></TouchableOpacity>}

      <View style={tw`flex-row justify-between px-4 mt-6 mb-3`}><Text style={tw`text-base font-extrabold`}>Stores</Text><Text style={tw`text-xs text-gray-400`}>{stores.length} available</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
        {stores.map((store: any) => <TouchableOpacity key={store.id} onPress={() => router.push(`/store/${store.id}` as any)} style={tw`w-40 border border-gray-100 rounded-2xl p-4`}><View style={tw`w-12 h-12 rounded-xl bg-emerald-50 items-center justify-center`}><Text style={tw`text-2xl`}>🏪</Text></View><Text style={tw`font-bold mt-3`} numberOfLines={1}>{store.name || store.displayName}</Text><View style={tw`flex-row items-center gap-1 mt-2`}><Star size={12} color="#D97706" fill="#D97706" /><Text style={tw`text-xs`}>{store.rating || 'New'}</Text></View></TouchableOpacity>)}
      </ScrollView>

      <View style={tw`flex-row justify-between px-4 mt-6 mb-3`}><Text style={tw`text-base font-extrabold`}>Products</Text><Text style={tw`text-xs text-gray-400`}>{products.length} results</Text></View>
      <View style={tw`px-4 flex-row flex-wrap justify-between gap-y-3`}>
        {products.map((product: any) => <TouchableOpacity key={product.id || product.offerId} onPress={() => router.push(`/product/${product.id || product.offerId}` as any)} style={tw`w-[48%] border border-gray-100 rounded-2xl p-3`}><View style={tw`h-28 bg-gray-50 rounded-xl items-center justify-center`}><Image source={product.imageUrl ? { uri: product.imageUrl } : fallbackImage} style={tw`w-24 h-24`} resizeMode="contain" /></View><Text style={tw`font-bold text-xs mt-2`} numberOfLines={2}>{product.name || product.title}</Text><Text style={tw`font-extrabold mt-1`}>{money(product.price || product.amount)}</Text></TouchableOpacity>)}
      </View>
    </ScrollView>
  </SafeAreaView>;
}
