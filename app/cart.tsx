import { customerApi } from '@/lib/api/customer';
import { firstFrom, listFrom, money, useApiResource } from '@/lib/api/hooks';
import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, MapPin, Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react-native';
import { ActivityIndicator, Alert, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const fallbackImage = require('@/assets/images/prod-rice.png');

export default function CartScreen() {
  const router = useRouter();
  const resource = useApiResource(async () => {
    let carts = await customerApi.carts({ status: 'active', limit: 1 });
    let cart = listFrom<any>(carts)[0];
    if (!cart) cart = firstFrom<any>(await customerApi.createCart({ items: [] }));
    return cart;
  }, []);

  const cart: any = resource.data || {};
  const items: any[] = cart.items || [];

  async function replace(itemsNext: any[]) {
    if (!cart.id) return;
    try {
      const updated = await customerApi.replaceCart(cart.id, { ...cart, items: itemsNext }, cart.version || cart.etag);
      resource.setData(firstFrom<any>(updated));
    } catch (error: any) {
      Alert.alert('Cart update failed', error?.message || 'Please try again.');
      await resource.reload();
    }
  }

  const updateQty = (index: number, delta: number) => replace(items.map((item, i) => i === index ? { ...item, quantity: Math.max(1, Number(item.quantity || 1) + delta) } : item));
  const removeItem = (index: number) => replace(items.filter((_, i) => i !== index));
  const clearCart = async () => {
    if (!cart.id) return;
    await customerApi.abandonCart(cart.id);
    resource.setData({ ...cart, items: [] } as any);
  };

  async function checkout() {
    if (!cart.id || items.length === 0) return;
    try {
      const prepared = firstFrom<any>(await customerApi.prepareCheckout(cart.id));
      router.push({ pathname: '/checkout/delivery', params: { cartId: cart.id, checkoutPreparationId: prepared?.id || '' } } as any);
    } catch (error: any) {
      Alert.alert('Checkout unavailable', error?.message || 'Please review your cart and try again.');
    }
  }

  const subtotal = cart.subtotal || items.reduce((sum, item) => sum + Number(item.unitPrice || item.price || 0) * Number(item.quantity || 1), 0);
  const total = cart.total || subtotal;

  return <SafeAreaView style={tw`flex-1 bg-white`}>
    <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-100`}>
      <View style={tw`flex-row items-center gap-3`}><TouchableOpacity onPress={() => router.back()}><ArrowLeft size={22} /></TouchableOpacity><Text style={tw`text-xl font-bold`}><Text style={tw`text-market-green`}>use</Text>Market</Text></View>
      <View style={tw`flex-row items-center gap-2`}><ShoppingBag size={20} /><Text style={tw`font-bold`}>{items.length}</Text></View>
    </View>

    {resource.loading && !resource.data ? <ActivityIndicator color="#0A8A3A" style={tw`mt-20`} /> : <ScrollView refreshControl={<RefreshControl refreshing={resource.loading} onRefresh={resource.reload} />} contentContainerStyle={tw`pb-32`}>
      <View style={tw`px-4 mt-4 flex-row justify-between`}><Text style={tw`text-2xl font-extrabold`}>My Cart</Text>{items.length > 0 && <TouchableOpacity onPress={clearCart}><Text style={tw`text-red-500 font-bold text-xs`}>Clear cart</Text></TouchableOpacity>}</View>
      <View style={tw`mx-4 mt-4 bg-emerald-50 rounded-2xl p-4`}><View style={tw`flex-row items-center gap-2`}><MapPin size={18} color="#0A8A3A" /><Text style={tw`font-bold text-xs flex-1`}>Selected delivery address</Text><TouchableOpacity onPress={() => router.push('/(location)/index')}><Text style={tw`text-market-green font-bold text-xs`}>Change</Text></TouchableOpacity></View><View style={tw`flex-row items-center gap-2 mt-3`}><Truck size={18} color="#0A8A3A" /><Text style={tw`text-xs`}>Delivery estimate will be confirmed at checkout</Text></View></View>

      {resource.error && <TouchableOpacity onPress={resource.reload} style={tw`mx-4 mt-4 p-4 bg-red-50 rounded-2xl`}><Text style={tw`text-red-600 font-bold`}>{resource.error}</Text></TouchableOpacity>}
      {items.length === 0 ? <View style={tw`items-center px-8 py-24`}><Text style={tw`text-5xl`}>🛒</Text><Text style={tw`text-xl font-bold mt-4`}>Your cart is empty</Text><TouchableOpacity onPress={() => router.replace('/(tabs)')} style={tw`mt-6 bg-market-green px-6 py-3 rounded-xl`}><Text style={tw`text-white font-bold`}>Start shopping</Text></TouchableOpacity></View> : <View style={tw`px-4 mt-4 gap-3`}>
        {items.map((item, index) => <View key={item.id || item.offerId || index} style={tw`border border-gray-100 rounded-2xl p-3 flex-row items-center`}>
          <Image source={item.imageUrl ? { uri: item.imageUrl } : fallbackImage} style={tw`w-20 h-20`} resizeMode="contain" />
          <View style={tw`flex-1 px-3`}><Text style={tw`font-bold text-xs`} numberOfLines={2}>{item.name || item.title || 'Cart item'}</Text><Text style={tw`text-market-green font-extrabold mt-2`}>{money(item.unitPrice || item.price)}</Text></View>
          <View style={tw`items-end gap-2`}><TouchableOpacity onPress={() => removeItem(index)}><Trash2 size={16} color="#EF4444" /></TouchableOpacity><View style={tw`flex-row items-center gap-2`}><TouchableOpacity onPress={() => updateQty(index, -1)} style={tw`w-7 h-7 border border-gray-200 rounded-lg items-center justify-center`}><Minus size={12} /></TouchableOpacity><Text style={tw`font-bold`}>{item.quantity || 1}</Text><TouchableOpacity onPress={() => updateQty(index, 1)} style={tw`w-7 h-7 bg-market-green rounded-lg items-center justify-center`}><Plus size={12} color="white" /></TouchableOpacity></View></View>
        </View>)}
      </View>}

      {items.length > 0 && <View style={tw`mx-4 mt-5 border border-gray-100 rounded-3xl p-5 gap-3`}><View style={tw`flex-row justify-between`}><Text style={tw`text-gray-500`}>Subtotal</Text><Text style={tw`font-bold`}>{money(subtotal)}</Text></View><View style={tw`h-px bg-gray-100`} /><View style={tw`flex-row justify-between`}><Text style={tw`text-lg font-extrabold`}>Total</Text><Text style={tw`text-xl font-extrabold`}>{money(total)}</Text></View></View>}
    </ScrollView>}

    {items.length > 0 && <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex-row gap-3`}><TouchableOpacity onPress={() => router.replace('/(tabs)')} style={tw`flex-1 border border-gray-200 py-4 rounded-2xl items-center`}><Text style={tw`font-bold`}>Keep shopping</Text></TouchableOpacity><TouchableOpacity onPress={checkout} style={tw`flex-1 bg-market-green py-4 rounded-2xl flex-row justify-center items-center gap-2`}><Text style={tw`text-white font-bold`}>Checkout</Text><ArrowRight size={16} color="white" /></TouchableOpacity></View>}
  </SafeAreaView>;
}
