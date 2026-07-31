import { customerApi } from '@/lib/api/customer';
import { listFrom, money, useApiResource } from '@/lib/api/hooks';
import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Bell, ChevronDown, Heart, MapPin, Search, ShoppingBag, ShoppingCart } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BillsScreen from './bills-home';
import FoodsScreen from './food-home';
import GadgetsScreen from './gadgets-home';
import LogisticsScreen from './logistics-home';
import MarketplaceHomeScreen from './marketplace-home';

const fallbackImage = require('@/assets/images/prod-rice.png');

export default function HomeScreen() {
  const router = useRouter();
  const { service } = useLocalSearchParams<{ service?: string }>();
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);

  if (service === 'food') return <FoodsScreen />;
  if (service === 'gadgets') return <GadgetsScreen />;
  if (service === 'bills') return <BillsScreen />;
  if (service === 'marketplace') return <MarketplaceHomeScreen />;
  if (service === 'logistics') return <LogisticsScreen />;

  const discovery = useApiResource(async () => {
    const [stores, catalogue, carts] = await Promise.all([
      customerApi.stores({ limit: 10 }),
      customerApi.searchCatalogue({ q: search || undefined, limit: 20 }),
      customerApi.carts({ status: 'active', limit: 1 }).catch(() => null),
    ]);
    return { stores, catalogue, carts };
  }, [search]);

  const stores = useMemo(() => listFrom<any>(discovery.data?.stores), [discovery.data]);
  const products = useMemo(() => listFrom<any>(discovery.data?.catalogue), [discovery.data]);
  const cart = useMemo(() => listFrom<any>(discovery.data?.carts)[0], [discovery.data]);
  const cartCount = cart?.items?.reduce?.((sum: number, item: any) => sum + Number(item.quantity || 1), 0) || 0;

  async function addToCart(product: any) {
    try {
      const active = cart || await customerApi.createCart({ items: [] });
      const current = active.items || [];
      await customerApi.replaceCart(active.id, {
        ...active,
        items: [...current, { offerId: product.offerId || product.id, quantity: 1 }],
      }, active.version || active.etag);
      await discovery.reload();
    } catch (error: any) {
      console.warn(error?.message || error);
    }
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-4 pt-2 pb-2 flex-row items-center justify-between`}>
        <TouchableOpacity style={tw`flex-1 flex-row items-center gap-2`} onPress={() => router.push('/(location)/index')}>
          <MapPin size={20} color="#0A8A3A" />
          <View style={tw`flex-1`}>
            <Text style={tw`text-[10px] text-gray-500 font-semibold uppercase`}>Deliver to</Text>
            <View style={tw`flex-row items-center gap-1`}><Text style={tw`text-xs font-bold text-gray-900`}>Current address</Text><ChevronDown size={14} /></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-10 h-10 items-center justify-center`}><Bell size={21} /></TouchableOpacity>
        <TouchableOpacity style={tw`relative w-10 h-10 items-center justify-center`} onPress={() => router.push('/cart')}>
          <ShoppingBag size={22} />
          {cartCount > 0 && <View style={tw`absolute top-0 right-0 bg-market-green rounded-full px-1.5 py-0.5`}><Text style={tw`text-white text-[9px] font-bold`}>{cartCount}</Text></View>}
        </TouchableOpacity>
      </View>

      <ScrollView refreshControl={<RefreshControl refreshing={discovery.loading} onRefresh={discovery.reload} />} contentContainerStyle={tw`pb-10`}>
        <View style={tw`px-4 my-2`}>
          <View style={tw`flex-row items-center border border-gray-200 rounded-2xl px-4 h-13 bg-white`}>
            <Search size={18} color="#9CA3AF" />
            <TextInput style={tw`flex-1 px-3 text-sm`} value={search} onChangeText={setSearch} placeholder="Search products and stores" returnKeyType="search" />
          </View>
        </View>

        <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-3xl p-5 border border-market-green/10`}>
          <Text style={tw`text-2xl font-extrabold text-gray-900`}>Shop local. Delivered fast.</Text>
          <Text style={tw`text-xs text-gray-500 mt-2`}>Live products and stores available around you.</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/categories')} style={tw`mt-4 bg-market-green self-start px-5 py-3 rounded-xl`}><Text style={tw`text-white font-bold`}>Browse marketplace</Text></TouchableOpacity>
        </View>

        {discovery.error && <TouchableOpacity onPress={discovery.reload} style={tw`mx-4 my-3 p-4 bg-red-50 rounded-2xl`}><Text style={tw`text-red-600 font-bold`}>{discovery.error}</Text><Text style={tw`text-red-500 text-xs mt-1`}>Tap to retry</Text></TouchableOpacity>}
        {discovery.loading && !discovery.data && <ActivityIndicator color="#0A8A3A" style={tw`my-10`} />}

        <View style={tw`flex-row justify-between px-4 mt-5 mb-3`}><Text style={tw`text-lg font-bold`}>Popular stores</Text><TouchableOpacity onPress={() => router.push('/stores')}><Text style={tw`text-market-green font-bold text-xs`}>See all</Text></TouchableOpacity></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
          {stores.map((store: any) => <TouchableOpacity key={store.id} onPress={() => router.push(`/store/${store.id}` as any)} style={tw`w-40 border border-gray-100 rounded-2xl p-4`}><View style={tw`w-12 h-12 bg-emerald-50 rounded-xl items-center justify-center`}><Text style={tw`text-2xl`}>🏪</Text></View><Text style={tw`font-bold mt-3`} numberOfLines={1}>{store.name || store.displayName}</Text><Text style={tw`text-xs text-gray-400 mt-1`}>{store.deliveryEta || store.eta || 'Available now'}</Text></TouchableOpacity>)}
        </ScrollView>

        <View style={tw`flex-row justify-between px-4 mt-6 mb-3`}><Text style={tw`text-lg font-bold`}>{search ? 'Search results' : 'Products for you'}</Text><TouchableOpacity onPress={() => router.push('/(tabs)/categories')}><Text style={tw`text-market-green font-bold text-xs`}>See all</Text></TouchableOpacity></View>
        <View style={tw`px-4 flex-row flex-wrap justify-between gap-y-3`}>
          {products.map((product: any) => {
            const id = String(product.id || product.offerId);
            const source = product.imageUrl ? { uri: product.imageUrl } : fallbackImage;
            return <TouchableOpacity key={id} onPress={() => router.push(`/product/${id}` as any)} style={tw`w-[48%] border border-gray-100 rounded-2xl p-3`}>
              <View style={tw`h-28 bg-gray-50 rounded-xl items-center justify-center`}><Image source={source} style={tw`w-24 h-24`} resizeMode="contain" /></View>
              <Text style={tw`text-xs font-bold mt-2`} numberOfLines={2}>{product.name || product.title}</Text>
              <Text style={tw`text-sm font-extrabold mt-1`}>{money(product.price || product.amount)}</Text>
              <View style={tw`flex-row justify-between mt-3`}>
                <TouchableOpacity onPress={() => setWishlist(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])}><Heart size={18} color={wishlist.includes(id) ? '#EF4444' : '#9CA3AF'} fill={wishlist.includes(id) ? '#EF4444' : 'transparent'} /></TouchableOpacity>
                <TouchableOpacity onPress={() => addToCart(product)} style={tw`bg-market-green w-8 h-8 rounded-xl items-center justify-center`}><ShoppingCart size={15} color="white" /></TouchableOpacity>
              </View>
            </TouchableOpacity>;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
