import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Copy,
  Headphones,
  Home,
  Info,
  MapPin,
  Search,
  Share2,
  ShoppingBag,
  Store,
  Tag,
  Truck,
  Wallet
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderConfirmScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Top Navigation Bar */}
      <View style={tw`px-4 pt-2 pb-1 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={tw`w-9 h-9 items-center justify-center`}>
            <ArrowLeft size={22} color="#171717" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold text-black`}>
            <Text style={tw`text-market-green`}>use</Text>Market
          </Text>
        </View>

        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity style={tw`w-9 h-9 items-center justify-center`}>
            <Search size={22} color="#171717" />
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-12`}>
        {/* Confetti & Green Check Circle Graphic */}
        <View style={tw`items-center my-4`}>
          <View style={tw`w-20 h-20 rounded-full bg-market-green items-center justify-center shadow-md my-2`}>
            <Check size={40} color="white" strokeWidth={3} />
          </View>

          <Text style={tw`text-2xl font-extrabold text-gray-950 text-center mt-2`}>
            Order Placed Successfully!
          </Text>
          <Text style={tw`text-xs text-gray-500 font-medium text-center mt-1 leading-4 px-6`}>
            Thank you! Your order has been received{'\n'}and is being processed.
          </Text>

          {/* Order ID Copy Badge */}
          <View style={tw`mt-4 bg-[#F0FDF4] border border-market-green/20 rounded-2xl px-5 py-3 flex-row items-center justify-between w-[85%]`}>
            <Text style={tw`text-xs font-semibold text-gray-500`}>Order ID</Text>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`text-sm font-extrabold text-market-green`}>UM98374621</Text>
              <TouchableOpacity onPress={handleCopy}>
                <Copy size={16} color="#0A8A3A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Estimated Delivery Section */}
        <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-3.5 flex-1 pr-2`}>
            <View style={tw`w-12 h-12 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
              <Truck size={22} color="#0A8A3A" />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Estimated Delivery</Text>
              <Text style={tw`text-sm font-extrabold text-market-green mt-0.5`}>10:15 AM – 10:30 AM</Text>
              <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`}>Today, 24 May 2025</Text>
            </View>
          </View>

          <TouchableOpacity
            style={tw`border border-market-green px-3.5 py-2 rounded-xl bg-white shadow-xs`}
            onPress={() => router.push('/(tabs)/orders')}
          >
            <Text style={tw`text-market-green text-xs font-bold`}>Track Order</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary Card */}
        <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-2.5`}>
          <View style={tw`flex-row items-center justify-between mb-1`}>
            <Text style={tw`text-sm font-bold text-gray-900`}>
              Order Summary <Text style={tw`text-xs font-semibold text-gray-400`}>(3 items)</Text>
            </Text>
            <TouchableOpacity style={tw`flex-row items-center gap-0.5`} onPress={() => router.push('/(tabs)/orders')}>
              <Text style={tw`text-xs font-bold text-market-green`}>View Details</Text>
              <ChevronRight size={14} color="#0A8A3A" />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-xs text-gray-500 font-medium`}>Subtotal</Text>
            <Text style={tw`text-xs font-bold text-gray-900`}>₦95,600</Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery Fee</Text>
              <Info size={12} color="#9CA3AF" />
            </View>
            <Text style={tw`text-xs font-bold text-gray-900`}>₦1,500</Text>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-xs text-gray-500 font-medium`}>Service Fee</Text>
              <Info size={12} color="#9CA3AF" />
            </View>
            <Text style={tw`text-xs font-bold text-gray-900`}>₦500</Text>
          </View>

          <View style={tw`h-px bg-gray-100 w-full my-1`} />

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-base font-extrabold text-gray-950`}>Total</Text>
            <Text style={tw`text-xl font-extrabold text-market-green`}>₦97,600</Text>
          </View>

          {/* Savings Pill */}
          <View style={tw`bg-[#F0FDF4] border border-market-green/20 rounded-xl p-2.5 flex-row items-center gap-2 mt-1`}>
            <Tag size={14} color="#0A8A3A" />
            <Text style={tw`text-xs font-bold text-market-green`}>You're saving ₦11,000 on this order</Text>
          </View>
        </View>

        {/* Delivery Address Review Card */}
        <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <View style={tw`flex-row items-center gap-2.5`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
                <MapPin size={20} color="#0A8A3A" />
              </View>
              <Text style={tw`text-sm font-bold text-gray-900`}>Delivery Address</Text>
            </View>

            <TouchableOpacity onPress={() => router.push('/(location)/index')}>
              <Text style={tw`text-xs font-bold text-market-green`}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`ml-12`}>
            <Text style={tw`text-xs font-bold text-gray-900 leading-4`}>
              23 Adekunle Street, Yaba, Lagos
            </Text>
            <Text style={tw`text-[11px] text-gray-400 font-medium mt-0.5`}>
              Near Yaba Bus Stop
            </Text>
            <Text style={tw`text-[11px] text-gray-500 font-semibold mt-1`}>
              John Doe • 0803 123 4567
            </Text>
          </View>
        </View>

        {/* Payment Method Card */}
        <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <View style={tw`flex-row items-center gap-2.5`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
                <Wallet size={20} color="#0A8A3A" />
              </View>
              <Text style={tw`text-sm font-bold text-gray-900`}>Payment Method</Text>
            </View>

            <TouchableOpacity onPress={() => router.push('/(tabs)/wallet')}>
              <Text style={tw`text-xs font-bold text-market-green`}>View Receipt</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`ml-12`}>
            <Text style={tw`text-xs font-bold text-gray-900`}>useMarket Wallet</Text>
            <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`}>
              Paid with Wallet Balance
            </Text>
          </View>
        </View>

        {/* "What's Next?" Timeline Stepper */}
        <View style={tw`mx-4 my-3 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
          <Text style={tw`text-sm font-bold text-gray-900 mb-4`}>What's Next?</Text>

          <View style={tw`flex-row items-start justify-between`}>
            {/* Step 1: Order Confirmed */}
            <View style={tw`items-center flex-1`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-emerald-100 items-center justify-center border border-emerald-200`}>
                <Wallet size={18} color="#0A8A3A" />
              </View>
              <Text style={tw`text-[10px] font-bold text-market-green mt-2 text-center`}>Order Confirmed</Text>
              <Text style={tw`text-[8px] text-gray-400 text-center leading-3 mt-0.5 px-1`}>
                We've received your order
              </Text>
            </View>

            {/* Step 2: Preparing Order */}
            <View style={tw`items-center flex-1`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-gray-100 items-center justify-center border border-gray-200`}>
                <Store size={18} color="#9CA3AF" />
              </View>
              <Text style={tw`text-[10px] font-bold text-gray-800 mt-2 text-center`}>Preparing Order</Text>
              <Text style={tw`text-[8px] text-gray-400 text-center leading-3 mt-0.5 px-1`}>
                We're getting your items ready
              </Text>
            </View>

            {/* Step 3: Out for Delivery */}
            <View style={tw`items-center flex-1`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-gray-100 items-center justify-center border border-gray-200`}>
                <Truck size={18} color="#9CA3AF" />
              </View>
              <Text style={tw`text-[10px] font-bold text-gray-800 mt-2 text-center`}>Out for Delivery</Text>
              <Text style={tw`text-[8px] text-gray-400 text-center leading-3 mt-0.5 px-1`}>
                Your rider is on the way
              </Text>
            </View>

            {/* Step 4: Delivered */}
            <View style={tw`items-center flex-1`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-gray-100 items-center justify-center border border-gray-200`}>
                <Home size={18} color="#9CA3AF" />
              </View>
              <Text style={tw`text-[10px] font-bold text-gray-800 mt-2 text-center`}>Delivered</Text>
              <Text style={tw`text-[8px] text-gray-400 text-center leading-3 mt-0.5 px-1`}>
                Enjoy your order!
              </Text>
            </View>
          </View>
        </View>

        {/* Share Order & Contact Support Buttons */}
        <View style={tw`px-4 my-2 flex-row items-center gap-3`}>
          <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 bg-white shadow-xs`}>
            <Share2 size={16} color="#171717" />
            <Text style={tw`text-xs font-bold text-gray-800`}>Share Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3.5 rounded-2xl flex-row items-center justify-center gap-2 bg-white shadow-xs`}>
            <Headphones size={16} color="#171717" />
            <Text style={tw`text-xs font-bold text-gray-800`}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Primary CTA: Continue Shopping */}
        <TouchableOpacity
          style={tw`mx-4 mt-3 bg-market-green py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm`}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.85}
        >
          <Text style={tw`text-white text-sm font-bold`}>Continue Shopping</Text>
          <ArrowRight size={18} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}