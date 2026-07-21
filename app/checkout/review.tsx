import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  ChevronDown, 
  Edit2, 
  Wallet 
} from 'lucide-react-native';
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
      {/* Header Block */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-50`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#171717" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Checkout</Text>
            <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Step 3 of 4</Text>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-1 bg-[#F2FBF6] px-2.5 py-1.5 rounded-lg`}>
          <ShieldCheck size={14} color="#0A8A3A" />
          <Text style={tw`text-[10px] text-market-green font-bold`}>100% Secure</Text>
        </View>
      </View>

      {/* Stepper Progress */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between bg-gray-50/30`}>
        {steps.map((step, i) => (
          <View key={step.id} style={tw`flex-row items-center flex-1`}>
            <View style={tw`items-center`}>
              <View style={tw`w-8 h-8 rounded-full items-center justify-center ${step.active || step.completed ? 'bg-market-green' : 'bg-gray-200'}`}>
                <Text style={tw`text-xs font-bold text-white`}>{step.completed ? '✓' : step.id}</Text>
              </View>
              <Text style={tw`text-[9px] mt-1 font-semibold ${step.active ? 'text-market-green font-bold' : 'text-gray-400'}`}>{step.label}</Text>
            </View>
            {i < steps.length - 1 && <View style={tw`flex-1 h-px bg-gray-200 mx-2 mb-4`} />}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Savings Promotion Banner */}
        <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center gap-2.5`}>
            <Text style={tw`text-xl`}>🏷️</Text>
            <Text style={tw`text-xs text-gray-700 font-medium`}>
              You're saving <Text style={tw`font-bold text-market-green`}>₦1,450</Text> on this order
            </Text>
          </View>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <Text style={tw`text-xs text-market-green font-bold`}>View offers</Text>
            <ChevronRight size={14} color="#0A8A3A" style={tw`ml-0.5`} />
          </TouchableOpacity>
        </View>

        {/* Delivering To Block */}
        <View style={tw`mx-4 bg-white rounded-2xl border border-gray-100 p-4 mb-4 shadow-sm`}>
          <Text style={tw`text-sm font-bold text-gray-900 mb-3`}>Delivering to</Text>
          <View style={tw`flex-row items-start gap-3`}>
            <MapPin size={22} color="#0A8A3A" style={tw`mt-0.5`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm font-bold text-gray-900 leading-5`}>23 Greenway Street,{'\n'}Lekki Phase 1, Lagos</Text>
              <View style={tw`flex-row items-center gap-2 mt-2`}>
                <View style={tw`bg-market-green-light px-2 py-0.5 rounded border border-market-green/20`}>
                  <Text style={tw`text-[10px] text-market-green font-bold`}>Home</Text>
                </View>
                <Text style={tw`text-xs text-market-green font-semibold`}>• Add delivery note</Text>
              </View>
            </View>
            <TouchableOpacity style={tw`flex-row items-center`}>
              <Text style={tw`text-xs text-market-green font-bold`}>Change</Text>
              <ChevronRight size={14} color="#0A8A3A" style={tw`ml-0.5`} />
            </TouchableOpacity>
          </View>

          {/* Delivery Option Details Inline */}
          <View style={tw`flex-row items-center gap-3.5 mt-4 pt-4 border-t border-gray-100`}>
            <View style={tw`w-10 h-10 bg-[#F2FBF6] rounded-full items-center justify-center`}>
              <Text style={tw`text-xl`}>🛵</Text>
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-xs text-gray-400 font-semibold`}>Delivery Option</Text>
              <Text style={tw`text-sm font-bold text-gray-900 mt-0.5`}>Standard Delivery</Text>
              <Text style={tw`text-xs text-gray-500 font-medium`}>20-30 mins</Text>
            </View>
            <View style={tw`items-end`}>
              <Text style={tw`text-sm font-bold text-gray-900`}>₦1,000</Text>
              <Text style={tw`text-[9px] text-market-green font-bold mt-0.5`}>FREE on orders above ₦10,000</Text>
              <TouchableOpacity style={tw`flex-row items-center mt-1`}>
                <Text style={tw`text-[10px] text-market-green font-bold`}>Change</Text>
                <ChevronRight size={12} color="#0A8A3A" style={tw`ml-0.5`} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Items List */}
        <View style={tw`mx-4 bg-white rounded-2xl border border-gray-100 p-4 mb-4 shadow-sm`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-sm font-bold text-gray-900`}>Items (4)</Text>
            <TouchableOpacity style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-xs text-market-green font-bold`}>Edit Cart</Text>
            </TouchableOpacity>
          </View>
          {orderItems.map((item) => (
            <View key={item.id} style={tw`flex-row items-center gap-3 py-3 border-b border-gray-100 last:border-0`}>
              <Image source={item.image} style={tw`w-14 h-14 rounded-xl`} resizeMode="cover" />
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>{item.name}</Text>
                <Text style={tw`text-xs text-gray-400 font-medium mt-0.5`}>{item.qty}</Text>
              </View>
              {/* Quantity Marker Box */}
              <View style={tw`bg-[#F2FBF6] border border-market-green/20 w-8 h-8 rounded-lg items-center justify-center mr-3`}>
                <Text style={tw`text-xs font-bold text-market-green`}>{item.quantity}</Text>
              </View>
              <View style={tw`items-end`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>{item.price}</Text>
                {item.oldPrice && <Text style={tw`text-[10px] text-gray-400 line-through`}>{item.oldPrice}</Text>}
              </View>
            </View>
          ))}
        </View>

        {/* Payment Method Block */}
        <View style={tw`mx-4 bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex-row items-center justify-between shadow-sm`}>
          <View style={tw`flex-row items-center gap-3.5`}>
            <View style={tw`w-10 h-10 bg-[#F2FBF6] rounded-full items-center justify-center`}>
              <Wallet size={20} color="#0A8A3A" />
            </View>
            <View>
              <Text style={tw`text-xs text-gray-400 font-semibold`}>Payment Method</Text>
              <Text style={tw`text-sm font-bold text-gray-900 mt-0.5`}>useMarket Wallet</Text>
            </View>
          </View>
          <View style={tw`items-end`}>
            <TouchableOpacity style={tw`flex-row items-center`}>
              <Text style={tw`text-xs text-market-green font-bold`}>Change</Text>
              <ChevronRight size={14} color="#0A8A3A" style={tw`ml-0.5`} />
            </TouchableOpacity>
            <Text style={tw`text-xs text-market-green font-bold mt-1`}>-₦2,350</Text>
          </View>
        </View>

        {/* Bill Summary Table */}
        <View style={tw`mx-4 bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm`}>
          <Text style={tw`text-sm font-bold text-gray-900 mb-3`}>Bill Summary</Text>
          <View style={tw`gap-2.5`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-xs text-gray-500 font-medium`}>Item Total (4 items)</Text>
              <Text style={tw`text-xs font-semibold text-gray-900`}>₦9,300</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery Fee</Text>
              <Text style={tw`text-xs font-semibold text-gray-900`}>₦1,000</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-xs text-gray-500 font-medium`}>Handling Fee</Text>
              <Text style={tw`text-xs font-semibold text-gray-900`}>₦100</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-xs text-market-green font-semibold`}>Discount</Text>
              <Text style={tw`text-xs text-market-green font-bold`}>- ₦1,450</Text>
            </View>
            <View style={tw`h-px bg-gray-100 my-1.5`} />
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-sm font-bold text-gray-950`}>To Pay</Text>
              <Text style={tw`text-lg font-bold text-gray-950`}>₦8,950</Text>
            </View>
            <View style={tw`flex-row items-center gap-1.5 mt-2 bg-[#F2FBF6] self-start px-3 py-1.5 rounded-lg border border-market-green/20`}>
              <Text style={tw`text-[10px] text-market-green font-bold`}>✓ Yay! You are saving ₦1,450 on this order</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order CTA Bottom Bar */}
      <View style={tw`px-4 py-3 border-t border-gray-100 flex-row items-center gap-3 bg-white`}>
        <View style={tw`flex-1 pr-1`}>
          <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Total Payable</Text>
          <Text style={tw`text-xl font-bold text-gray-950 mt-0.5`}>₦8,950</Text>
          <TouchableOpacity onPress={() => setShowPriceDetails(!showPriceDetails)} style={tw`flex-row items-center mt-1`}>
            <Text style={tw`text-[10px] text-market-green font-bold`}>View price details</Text>
            <ChevronDown size={12} color="#0A8A3A" style={tw`ml-0.5`} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={tw`flex-1 bg-market-green h-13 rounded-xl flex-row items-center justify-between px-5`}
          onPress={() => router.push('/checkout/confirm')}>
          <Text style={tw`text-white text-base font-bold`}>Place Order</Text>
          <ChevronRight size={18} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}