import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Info,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
  { id: 1, label: 'Delivery', active: true, completed: true },
  { id: 2, label: 'Time', active: false, completed: false },
  { id: 3, label: 'Payment', active: false, completed: false },
  { id: 4, label: 'Review', active: false, completed: false },
  { id: 5, label: 'Confirm', active: false, completed: false },
];

const savedAddresses = [
  {
    id: 1,
    label: 'Home',
    isDefault: true,
    address: '23 Adekunle Street, Yaba, Lagos',
    landmark: 'Landmark: Near Yaba Bus Stop',
    contact: 'John Doe • 0803 123 4567',
  },
  {
    id: 2,
    label: 'Work',
    isDefault: false,
    address: '45 Marina Street, Victoria Island, Lagos',
    landmark: 'Landmark: Opp. Eko Hotel',
    contact: 'John Doe • 0803 123 4567',
  },
];

const orderItems = [
  {
    id: 1,
    name: 'Stallion Premium Parboiled Rice',
    unit: '50kg',
    price: '₦68,500',
    qty: 1,
    total: '₦68,500',
    image: require('@/assets/images/prod-rice.png'),
  },
  {
    id: 2,
    name: 'Golden Penny Cooking Oil',
    unit: '5L',
    price: '₦12,400',
    qty: 2,
    total: '₦24,800',
    image: require('@/assets/images/prod-oil.png'),
  },
  {
    id: 3,
    name: 'Golden Penny Beans (Brown)',
    unit: '1kg',
    price: '₦2,300',
    qty: 1,
    total: '₦2,300',
    image: require('@/assets/images/prod-tomatoes.png'),
  },
];

export default function CheckoutDeliveryScreen() {
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState(1);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Top Navigation Bar */}
      <View style={tw`px-4 pt-2 pb-1 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`w-9 h-9 items-center justify-center`}>
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Checkout Title & Secure Badge */}
        <View style={tw`px-4 my-2 flex-row items-center justify-between`}>
          <Text style={tw`text-2xl font-bold text-gray-950`}>Checkout</Text>
          <View style={tw`flex-row items-center gap-1.5 bg-[#F0FDF4] px-2.5 py-1 rounded-lg border border-market-green/10`}>
            <ShieldCheck size={14} color="#0A8A3A" />
            <Text style={tw`text-[11px] font-bold text-market-green`}>100% Secure Checkout</Text>
          </View>
        </View>

        {/* 5-Step Progress Stepper */}
        <View style={tw`px-4 my-3 flex-row items-center justify-between`}>
          {steps.map((step, idx) => (
            <View key={step.id} style={tw`flex-1 items-center relative`}>
              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <View style={tw`absolute top-3.5 left-1/2 w-full h-0.5 bg-gray-200 -z-10`} />
              )}

              {/* Circle Indicator */}
              <View
                style={tw`w-7 h-7 rounded-full items-center justify-center ${step.active
                    ? 'bg-market-green shadow-xs'
                    : 'bg-white border-2 border-gray-300'
                  }`}
              >
                <Text style={tw`text-xs font-bold ${step.active ? 'text-white' : 'text-gray-500'}`}>
                  {step.id}
                </Text>
              </View>

              <Text style={tw`text-[10px] font-bold mt-1 ${step.active ? 'text-market-green' : 'text-gray-400'}`}>
                {step.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Address Section Card */}
        <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
          <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`flex-row items-center gap-2.5`}>
              <View style={tw`w-10 h-10 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
                <MapPin size={20} color="#0A8A3A" />
              </View>
              <View>
                <Text style={tw`text-sm font-bold text-gray-900`}>Delivery Address</Text>
                <Text style={tw`text-[11px] text-gray-400 font-medium mt-0.5`}>
                  Where should we deliver your order?
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => router.push('/(location)/add')}>
              <Text style={tw`text-xs font-bold text-market-green`}>Add New</Text>
            </TouchableOpacity>
          </View>

          {/* Saved Address Selection List */}
          <View style={tw`gap-3`}>
            {savedAddresses.map((addr) => {
              const isSelected = selectedAddressId === addr.id;

              return (
                <TouchableOpacity
                  key={addr.id}
                  onPress={() => setSelectedAddressId(addr.id)}
                  style={tw`p-3.5 rounded-2xl border flex-row items-start justify-between ${isSelected
                      ? 'border-market-green bg-[#F0FDF4]'
                      : 'border-gray-200 bg-white'
                    }`}
                >
                  <View style={tw`flex-row items-start gap-3 flex-1 pr-2`}>
                    {/* Radio Circle */}
                    <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center mt-0.5 ${isSelected ? 'border-market-green bg-market-green' : 'border-gray-300'
                      }`}>
                      {isSelected && <View style={tw`w-2 h-2 rounded-full bg-white`} />}
                    </View>

                    <View style={tw`flex-1`}>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Text style={tw`text-sm font-bold text-gray-900`}>{addr.label}</Text>
                        {addr.isDefault && (
                          <View style={tw`bg-emerald-100 px-2 py-0.5 rounded-md`}>
                            <Text style={tw`text-[9px] font-bold text-market-green`}>Default</Text>
                          </View>
                        )}
                      </View>

                      <Text style={tw`text-xs font-bold text-gray-800 mt-1 leading-4`}>
                        {addr.address}
                      </Text>
                      <Text style={tw`text-[11px] text-gray-400 font-medium mt-0.5`}>
                        {addr.landmark}
                      </Text>
                      <Text style={tw`text-[11px] text-gray-500 font-semibold mt-1`}>
                        {addr.contact}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => router.push('/(location)/add')}>
                    <Text style={tw`text-xs font-bold text-market-green`}>Edit</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}

            {/* Add New Address Button */}
            <TouchableOpacity
              style={tw`border border-dashed border-gray-300 py-3 rounded-2xl flex-row items-center justify-center gap-2 bg-gray-50/50 mt-1`}
              onPress={() => router.push('/(location)/add')}
            >
              <Plus size={16} color="#0A8A3A" />
              <Text style={tw`text-xs font-bold text-market-green`}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Location Confirmation Banner */}
        <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-3.5 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
          <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
            <Truck size={20} color="#0A8A3A" />
            <Text style={tw`text-xs font-semibold text-gray-800`} numberOfLines={1}>
              Deliver to <Text style={tw`font-bold text-gray-950`}>23 Adekunle Street, Yaba, Lagos</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(location)/index')}>
            <Text style={tw`text-xs font-bold text-market-green`}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Order Items Preview Card */}
        <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
          <View style={tw`flex-row items-center justify-between mb-3`}>
            <Text style={tw`text-sm font-bold text-gray-900`}>
              Order Items <Text style={tw`text-xs font-semibold text-gray-400`}>({orderItems.length} items)</Text>
            </Text>
            <TouchableOpacity onPress={() => router.push('/cart')}>
              <Text style={tw`text-xs font-bold text-market-green`}>Edit Cart</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`gap-3`}>
            {orderItems.map((item) => (
              <View key={item.id} style={tw`flex-row items-center justify-between pb-2.5 border-b border-gray-50 last:border-0 last:pb-0`}>
                <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                  <Image source={item.image} style={tw`w-12 h-12 rounded-xl border border-gray-100 bg-gray-50/50`} resizeMode="contain" />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>{item.name}</Text>
                    <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{item.unit}</Text>
                    <Text style={tw`text-xs font-bold text-market-green mt-0.5`}>{item.price}</Text>
                  </View>
                </View>

                <View style={tw`items-end`}>
                  <Text style={tw`text-[11px] text-gray-400 font-semibold`}>Qty: {item.qty}</Text>
                  <Text style={tw`text-xs font-extrabold text-gray-950 mt-0.5`}>{item.total}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Order Bill Summary Card */}
        <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-2.5`}>
          <Text style={tw`text-sm font-bold text-gray-900 mb-1`}>Order Summary</Text>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-xs text-gray-500 font-medium`}>Subtotal (3 items)</Text>
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
        </View>

        {/* Continue CTA Button */}
        <TouchableOpacity
          style={tw`mx-4 mt-3 bg-market-green py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm`}
          onPress={() => router.push('/checkout/payment')}
          activeOpacity={0.85}
        >
          <Text style={tw`text-white text-sm font-bold`}>Continue to Delivery Time</Text>
          <ArrowRight size={18} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}