import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const orderItems = [
  { id: 1, name: 'Red Apples', qty: '1kg', quantity: 1, price: '₦1,200', oldPrice: '₦1,500', image: require('@/assets/images/prod-apple.png') },
  { id: 2, name: 'Cavendish Banana', qty: '1 bunch', quantity: 1, price: '₦650', image: require('@/assets/images/prod-banana.png') },
  { id: 3, name: 'Farm Fresh Milk', qty: '1L', quantity: 1, price: '₦1,250', image: require('@/assets/images/prod-milk.png') },
  { id: 4, name: 'Royal Stallion Parboiled Rice', qty: '5kg', quantity: 1, price: '₦6,200', image: require('@/assets/images/prod-rice.png') },
];

const steps = [
  { id: 1, label: 'Delivery', completed: true },
  { id: 2, label: 'Payment', completed: true },
  { id: 3, label: 'Review', active: true, completed: false },
  { id: 4, label: 'Confirm', active: false, completed: false },
];

export default function CheckoutReviewScreen() {
  const router = useRouter();
  const [showPriceDetails, setShowPriceDetails] = useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={tw`text-xl text-gray-900`}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Checkout</Text>
            <Text style={tw`text-xs text-gray-500`}>Step 3 of 4</Text>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-1`}>
          <Text style={tw`text-market-green`}>🛡️</Text>
          <Text style={tw`text-xs text-market-green font-semibold`}>100% Secure</Text>
        </View>
      </View>

      {/* Stepper */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
        {steps.map((step, i) => (
          <View key={step.id} style={tw`flex-row items-center flex-1`}>
            <View style={tw`items-center`}>
              <View style={tw`w-8 h-8 rounded-full items-center justify-center ${step.active ? 'bg-market-green' : step.completed ? 'bg-market-green' : 'bg-gray-200'}`}>
                <Text style={tw`text-sm font-bold ${step.active || step.completed ? 'text-white' : 'text-gray-500'}`}>
                  {step.completed ? '✓' : step.id}
                </Text>
              </View>
              <Text style={tw`text-[10px] mt-1 ${step.active ? 'text-market-green font-semibold' : step.completed ? 'text-market-green' : 'text-gray-500'}`}>{step.label}</Text>
            </View>
            {i < steps.length - 1 && <View style={tw`flex-1 h-px bg-gray-200 mx-2 mb-4`} />}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Savings Banner */}
        <View style={tw`mx-4 bg-market-green-light rounded-xl p-3 flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`text-xl`}>🏷️</Text>
            <Text style={tw`text-sm text-gray-700`}>You're saving <Text style={tw`font-bold text-market-green`}>₦1,450</Text> on this order</Text>
          </View>
          <TouchableOpacity style={tw`flex-row items-center gap-1`}>
            <Text style={tw`text-sm text-market-green font-semibold`}>View offers</Text>
            <Text style={tw`text-market-green`}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Delivering To */}
        <View style={tw`mx-4 bg-white rounded-xl border border-gray-100 p-4 mb-4`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Delivering to</Text>
          <View style={tw`flex-row items-start gap-3`}>
            <Text style={tw`text-market-green text-xl mt-0.5`}>📍</Text>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm font-semibold text-gray-900`}>23 Greenway Street,{'\n'}Lekki Phase 1, Lagos</Text>
              <View style={tw`flex-row items-center gap-2 mt-2`}>
                <View style={tw`bg-market-green-light px-2 py-1 rounded`}>
                  <Text style={tw`text-xs text-market-green font-medium`}>Home</Text>
                </View>
                <Text style={tw`text-xs text-market-green`}>• Add delivery note</Text>
              </View>
            </View>
            <TouchableOpacity style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-sm text-market-green font-semibold`}>Change</Text>
              <Text style={tw`text-market-green`}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Delivery Option */}
          <View style={tw`flex-row items-center gap-3 mt-3 pt-3 border-t border-gray-100`}>
            <Text style={tw`text-2xl`}>🛵</Text>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm font-semibold text-gray-900`}>Delivery Option</Text>
              <Text style={tw`text-xs text-gray-500`}>Standard Delivery</Text>
              <Text style={tw`text-xs text-gray-500`}>20-30 mins</Text>
            </View>
            <View style={tw`items-end`}>
              <Text style={tw`text-sm text-gray-900`}>₦1,000</Text>
              <Text style={tw`text-xs text-market-green`}>FREE on orders above ₦10,000</Text>
              <TouchableOpacity>
                <Text style={tw`text-xs text-market-green font-semibold`}>Change →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Items */}
        <View style={tw`mx-4 bg-white rounded-xl border border-gray-100 p-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-base font-bold text-gray-900`}>Items (4)</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>Edit Cart</Text>
            </TouchableOpacity>
          </View>
          {orderItems.map((item) => (
            <View key={item.id} style={tw`flex-row items-center gap-3 py-3 border-b border-gray-100 last:border-0`}>
              <Image source={item.image} style={tw`w-16 h-16 rounded-lg`} resizeMode="cover" />
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-semibold text-gray-900`}>{item.name}</Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>{item.qty}</Text>
              </View>
              <View style={tw`bg-gray-100 px-3 py-1 rounded-lg`}>
                <Text style={tw`text-sm text-gray-700`}>{item.quantity}</Text>
              </View>
              <View style={tw`items-end`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>{item.price}</Text>
                {item.oldPrice && <Text style={tw`text-xs text-gray-400 line-through`}>{item.oldPrice}</Text>}
              </View>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <View style={tw`mx-4 bg-white rounded-xl border border-gray-100 p-4 mb-4 flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-3`}>
            <Text style={tw`text-2xl`}>👛</Text>
            <View>
              <Text style={tw`text-sm text-gray-500`}>Payment Method</Text>
              <Text style={tw`text-sm font-semibold text-gray-900`}>useMarket Wallet</Text>
            </View>
          </View>
          <View style={tw`items-end`}>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>Change →</Text>
            </TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-bold`}>-₦2,350</Text>
          </View>
        </View>

        {/* Bill Summary */}
        <View style={tw`mx-4 bg-white rounded-xl border border-gray-100 p-4 mb-4`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Bill Summary</Text>
          <View style={tw`gap-2`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-sm text-gray-600`}>Item Total (4 items)</Text>
              <Text style={tw`text-sm text-gray-900`}>₦9,300</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`text-sm text-gray-600`}>Delivery Fee</Text>
                <Text style={tw`text-gray-400`}>ⓘ</Text>
              </View>
              <Text style={tw`text-sm text-gray-900`}>₦1,000</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`text-sm text-gray-600`}>Handling Fee</Text>
                <Text style={tw`text-gray-400`}>ⓘ</Text>
              </View>
              <Text style={tw`text-sm text-gray-900`}>₦100</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-sm text-market-green font-semibold`}>Discount</Text>
              <Text style={tw`text-sm text-market-green font-semibold`}>- ₦1,450</Text>
            </View>
            <View style={tw`h-px bg-gray-200 my-1`} />
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-base font-bold text-gray-900`}>To Pay</Text>
              <Text style={tw`text-xl font-bold text-gray-900`}>₦8,950</Text>
            </View>
            <View style={tw`flex-row items-center gap-1 mt-1 bg-market-green-light self-start px-2 py-1 rounded`}>
              <Text style={tw`text-market-green`}>🛡️</Text>
              <Text style={tw`text-xs text-market-green`}>Yay! You are saving ₦1,450 on this order</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Place Order */}
      <View style={tw`px-4 py-3 border-t border-gray-100 flex-row items-center gap-3 bg-white`}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-xs text-gray-500`}>Total Payable</Text>
          <Text style={tw`text-xl font-bold text-gray-900`}>₦8,950</Text>
          <TouchableOpacity onPress={() => setShowPriceDetails(!showPriceDetails)}>
            <Text style={tw`text-xs text-market-green font-semibold`}>View price details ▼</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={tw`flex-1 bg-market-green py-3.5 rounded-xl flex-row items-center justify-center gap-2`}
          onPress={() => router.push('/checkout/confirm')}>
          <Text style={tw`text-white text-base font-semibold`}>Place Order</Text>
          <Text style={tw`text-white`}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}