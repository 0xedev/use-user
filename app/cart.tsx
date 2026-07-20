import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const cartItems = [
  { id: 1, name: 'Red Apples', qty: '1kg', price: '₦1,200', oldPrice: '₦1,500', discount: '20% OFF', quantity: 1, image: require('@/assets/images/prod-apple.png') },
  { id: 2, name: 'Cavendish Banana', qty: '1 bunch', price: '₦650', quantity: 1, image: require('@/assets/images/prod-banana.png') },
  { id: 3, name: 'Farm Fresh Milk', qty: '1L', price: '₦1,250', quantity: 1, image: require('@/assets/images/prod-milk.png') },
  { id: 4, name: 'Royal Stallion Parboiled Rice', qty: '5kg', price: '₦6,200', quantity: 1, image: require('@/assets/images/prod-rice.png') },
];

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState(cartItems);

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const itemTotal = '₦9,300';
  const deliveryFee = '₦1,000';
  const discount = '₦1,450';
  const toPay = '₦8,850';
  const savings = '₦1,450';

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={tw`text-xl text-gray-900`}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>My Cart (4)</Text>
            <View style={tw`flex-row items-center gap-1 mt-0.5`}>
              <Text style={tw`text-xs text-gray-500`}>Delivering to</Text>
              <Text style={tw`text-market-green text-xs`}>📍</Text>
              <Text style={tw`text-xs text-gray-700`}>23 Greenway Street, Lekki Phase 1, Lagos</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={tw`text-sm text-market-green font-semibold`}>Change</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Savings Banner */}
        <View style={tw`mx-4 bg-market-green-light rounded-xl p-3 flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`text-xl`}>🛡️</Text>
            <Text style={tw`text-sm text-gray-700`}>Yay! You're saving <Text style={tw`font-bold text-market-green`}>₦{savings}</Text> on this order</Text>
          </View>
          <TouchableOpacity style={tw`flex-row items-center gap-1`}>
            <Text style={tw`text-sm text-market-green font-semibold`}>View details</Text>
            <Text style={tw`text-market-green`}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        <View style={tw`px-4 gap-4`}>
          {items.map((item) => (
            <View key={item.id} style={tw`flex-row gap-3 pb-4 border-b border-gray-100`}>
              <Image source={item.image} style={tw`w-20 h-20 rounded-lg`} resizeMode="cover" />
              <View style={tw`flex-1`}>
                <View style={tw`flex-row justify-between items-start`}>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-sm font-semibold text-gray-900`}>{item.name}</Text>
                    <Text style={tw`text-xs text-gray-500 mt-0.5`}>{item.qty}</Text>
                    {item.discount && (
                      <View style={tw`bg-market-green-light self-start px-2 py-0.5 rounded mt-1`}>
                        <Text style={tw`text-[10px] text-market-green font-medium`}>{item.discount}</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity>
                    <Text style={tw`text-gray-400 text-lg`}>🗑️</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={tw`flex-row justify-between items-center mt-2`}>
                  <View style={tw`flex-row items-center border border-gray-200 rounded-lg`}>
                    <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={tw`px-3 py-1.5`}>
                      <Text style={tw`text-market-green font-bold`}>−</Text>
                    </TouchableOpacity>
                    <Text style={tw`text-sm font-semibold text-gray-900 px-2`}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={tw`px-3 py-1.5`}>
                      <Text style={tw`text-market-green font-bold`}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={tw`items-end`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>{item.price}</Text>
                    {item.oldPrice && <Text style={tw`text-xs text-gray-400 line-through`}>{item.oldPrice}</Text>}
                  </View>
                </View>
                <TouchableOpacity style={tw`self-end mt-1`}>
                  <Text style={tw`text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded`}>Save for later</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Free Delivery Progress */}
        <View style={tw`mx-4 mt-4 bg-market-green-light rounded-xl p-3`}>
          <View style={tw`flex-row items-center gap-2 mb-2`}>
            <Text style={tw`text-xl`}>🌿</Text>
            <Text style={tw`text-sm text-market-green font-semibold`}>Add ₦2,800 more to get FREE delivery</Text>
          </View>
          <View style={tw`h-2 bg-gray-200 rounded-full overflow-hidden`}>
            <View style={tw`h-full bg-market-green rounded-full w-[72%]`} />
          </View>
          <View style={tw`flex-row justify-between mt-1`}>
            <Text style={tw`text-xs text-gray-500`}>₦0</Text>
            <Text style={tw`text-xs text-gray-500`}>₦10,000</Text>
          </View>
        </View>

        {/* Apply Coupon */}
        <TouchableOpacity style={tw`mx-4 mt-4 flex-row items-center justify-between bg-white border border-gray-200 rounded-xl p-3`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`text-xl text-market-green`}>🏷️</Text>
            <Text style={tw`text-sm font-semibold text-gray-900`}>Apply Coupon</Text>
          </View>
          <View style={tw`flex-row items-center gap-1`}>
            <Text style={tw`text-sm text-market-green font-semibold`}>View all</Text>
            <Text style={tw`text-market-green`}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Bill Details */}
        <View style={tw`mx-4 mt-4 bg-white rounded-xl border border-gray-100 p-4`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Bill Details</Text>
          <View style={tw`gap-2`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-sm text-gray-600`}>Item Total (4 items)</Text>
              <Text style={tw`text-sm text-gray-900`}>{itemTotal}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-sm text-gray-600`}>Delivery Fee</Text>
              <Text style={tw`text-sm text-gray-900`}>{deliveryFee}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-sm text-market-green font-semibold`}>Discount</Text>
              <Text style={tw`text-sm text-market-green font-semibold`}>-{discount}</Text>
            </View>
            <View style={tw`h-px bg-gray-200 my-1`} />
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base font-bold text-gray-900`}>To Pay</Text>
              <Text style={tw`text-xl font-bold text-gray-900`}>{toPay}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Checkout */}
      <View style={tw`px-4 py-3 border-t border-gray-100 flex-row items-center gap-3 bg-white`}>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center gap-1`}>
            <Text style={tw`text-xl`}>🛡️</Text>
            <Text style={tw`text-xs text-gray-600`}>Safe & Secure Payments</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={tw`flex-1 bg-market-green py-3.5 rounded-xl flex-row items-center justify-center gap-2`}
          onPress={() => router.push('/checkout/delivery')}>
          <Text style={tw`text-white text-base font-semibold`}>₦{toPay}</Text>
          <Text style={tw`text-white text-base font-semibold`}>Proceed to Checkout</Text>
          <Text style={tw`text-white`}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}