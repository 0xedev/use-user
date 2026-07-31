import { customerApi } from '@/lib/api/customer';
import { firstFrom, listFrom, money, useApiResource } from '@/lib/api/hooks';
import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Minus, Plus, Share2, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, RefreshControl, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const fallbackImage = require('@/assets/images/prod-banana.png');

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const resource = useApiResource(async () => {
    const [offer, carts, recommendations] = await Promise.all([
      customerApi.revalidateOffer(String(id)),
      customerApi.carts({ status: 'active', limit: 1 }).catch(() => null),
      customerApi.searchCatalogue({ relatedTo: id, limit: 8 }).catch(() => null),
    ]);
    return { offer, carts, recommendations };
  }, [id]);

  const product: any = firstFrom(resource.data?.offer) || {};
  const cart: any = useMemo(() => listFrom<any>(resource.data?.carts)[0], [resource.data]);
  const recommendations = useMemo(() => listFrom<any>(resource.data?.recommendations), [resource.data]);
  const cartCount = cart?.items?.reduce?.((sum: number, item: any) => sum + Number(item.quantity || 1), 0) || 0;

  async function addToCart() {
    try {
      const active = cart || firstFrom<any>(await customerApi.createCart({ items: [] }));
      const current = active?.items || [];
      const offerId = product.offerId || product.id || id;
      const existingIndex = current.findIndex((item: any) => String(item.offerId || item.id) === String(offerId));
      const next = existingIndex >= 0
        ? current.map((item: any, index: number) => index === existingIndex ? { ...item, quantity: Number(item.quantity || 0) + quantity } : item)
        : [...current, { offerId, quantity }];
      await customerApi.replaceCart(active.id, { ...active, items: next }, active.version || active.etag);
      Alert.alert('Added to cart', `${quantity} item${quantity === 1 ? '' : 's'} added successfully.`);
      await resource.reload();
    } catch (error: any) {
      Alert.alert('Could not add item', error?.message || 'Please try again.');
    }
  }

  if (resource.loading && !resource.data) return <SafeAreaView style={tw`flex-1 bg-white items-center justify-center`}><ActivityIndicator color="#0A8A3A" /></SafeAreaView>;

  const image = product.imageUrl || product.images?.[0]?.url;
  return <SafeAreaView style={tw`flex-1 bg-white`}>
    <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-100`}><TouchableOpacity onPress={() => router.back()} style={tw`w-10 h-10 rounded-full bg-gray-50 items-center justify-center`}><ArrowLeft size={20} /></TouchableOpacity><View style={tw`flex-row gap-2`}><TouchableOpacity onPress={() => Share.share({ message: product.shareUrl || `${product.name || 'Product'} on useMarket` })} style={tw`w-10 h-10 rounded-full bg-gray-50 items-center justify-center`}><Share2 size={18} /></TouchableOpacity><TouchableOpacity onPress={() => setLiked(v => !v)} style={tw`w-10 h-10 rounded-full bg-gray-50 items-center justify-center`}><Heart size={18} color={liked ? '#EF4444' : '#171717'} fill={liked ? '#EF4444' : 'transparent'} /></TouchableOpacity><TouchableOpacity onPress={() => router.push('/cart')} style={tw`relative w-10 h-10 rounded-full bg-gray-50 items-center justify-center`}><ShoppingBag size={18} />{cartCount > 0 && <View style={tw`absolute -top-1 -right-1 bg-market-green rounded-full px-1.5`}><Text style={tw`text-white text-[9px] font-bold`}>{cartCount}</Text></View>}</TouchableOpacity></View></View>

    <ScrollView refreshControl={<RefreshControl refreshing={resource.loading} onRefresh={resource.reload} />} contentContainerStyle={tw`pb-28`}>
      {resource.error && <TouchableOpacity onPress={resource.reload} style={tw`mx-4 mt-4 p-4 bg-red-50 rounded-2xl`}><Text style={tw`text-red-600 font-bold`}>{resource.error}</Text></TouchableOpacity>}
      <View style={tw`mx-4 mt-4 h-72 rounded-3xl bg-gray-50 items-center justify-center`}><Image source={image ? { uri: image } : fallbackImage} style={tw`w-64 h-64`} resizeMode="contain" /></View>
      <View style={tw`px-4 mt-5`}><Text style={tw`text-2xl font-extrabold`}>{product.name || product.title || 'Product'}</Text><TouchableOpacity onPress={() => product.storeId && router.push(`/store/${product.storeId}` as any)}><Text style={tw`text-market-green font-bold text-xs mt-2`}>{product.storeName || product.vendorName || 'View store'}</Text></TouchableOpacity><View style={tw`flex-row items-center gap-1 mt-3`}><Star size={13} color="#FACC15" fill="#FACC15" /><Text style={tw`font-bold text-xs`}>{product.rating || 'New'}</Text><Text style={tw`text-xs text-gray-400`}>{product.reviewCount ? `(${product.reviewCount})` : ''}</Text></View><Text style={tw`text-3xl font-extrabold mt-4`}>{money(product.price || product.amount)}</Text>{product.compareAtPrice && <Text style={tw`text-gray-400 line-through mt-1`}>{money(product.compareAtPrice)}</Text>}<Text style={tw`text-sm text-gray-500 leading-5 mt-4`}>{product.description || 'Fresh and available from a verified useMarket vendor.'}</Text></View>

      <View style={tw`mx-4 mt-5 bg-emerald-50 rounded-2xl p-4 flex-row justify-around`}><View style={tw`items-center`}><Truck size={18} color="#0A8A3A" /><Text style={tw`font-bold text-xs mt-2`}>{product.deliveryEta || 'Fast delivery'}</Text></View><View style={tw`items-center`}><ShieldCheck size={18} color="#0A8A3A" /><Text style={tw`font-bold text-xs mt-2`}>{product.available === false ? 'Unavailable' : 'In stock'}</Text></View></View>

      <View style={tw`px-4 mt-6 flex-row justify-between items-center`}><View><Text style={tw`font-extrabold`}>Quantity</Text><Text style={tw`text-xs text-gray-400 mt-1`}>{product.stockQuantity ? `${product.stockQuantity} available` : 'Subject to store confirmation'}</Text></View><View style={tw`flex-row items-center gap-3`}><TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={tw`w-9 h-9 border border-gray-200 rounded-xl items-center justify-center`}><Minus size={14} /></TouchableOpacity><Text style={tw`font-extrabold`}>{quantity}</Text><TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={tw`w-9 h-9 bg-market-green rounded-xl items-center justify-center`}><Plus size={14} color="white" /></TouchableOpacity></View></View>

      {recommendations.length > 0 && <><View style={tw`px-4 mt-8 mb-3`}><Text style={tw`text-lg font-extrabold`}>You may also like</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>{recommendations.map((item: any) => <TouchableOpacity key={item.id || item.offerId} onPress={() => router.push(`/product/${item.id || item.offerId}` as any)} style={tw`w-36 border border-gray-100 rounded-2xl p-3`}><Image source={item.imageUrl ? { uri: item.imageUrl } : fallbackImage} style={tw`w-28 h-24`} resizeMode="contain" /><Text style={tw`font-bold text-xs mt-2`} numberOfLines={2}>{item.name || item.title}</Text><Text style={tw`font-extrabold mt-1`}>{money(item.price || item.amount)}</Text></TouchableOpacity>)}</ScrollView></>}
    </ScrollView>

    <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex-row gap-3`}><TouchableOpacity onPress={() => router.push('/cart')} style={tw`w-14 h-14 border border-gray-200 rounded-2xl items-center justify-center`}><ShoppingBag size={20} /></TouchableOpacity><TouchableOpacity disabled={product.available === false} onPress={addToCart} style={tw`flex-1 ${product.available === false ? 'bg-gray-300' : 'bg-market-green'} rounded-2xl items-center justify-center`}><Text style={tw`text-white font-bold`}>{product.available === false ? 'Unavailable' : `Add ${quantity} to cart`}</Text></TouchableOpacity></View>
  </SafeAreaView>;
}
