import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Share2, 
  RefreshCw, 
  FileText, 
  Award, 
  ChevronRight 
} from 'lucide-react-native';
import tw from '@/lib/tw';

const steps = [
  { id: 1, label: 'Delivery', completed: true },
  { id: 2, label: 'Payment', completed: true },
  { id: 3, label: 'Review', completed: true },
  { id: 4, label: 'Confirm', active: true, completed: true },
];

export default function OrderConfirmScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header Block */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-50`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
            <ArrowLeft size={24} color="#171717" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Checkout</Text>
            <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Step 4 of 4</Text>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-1 bg-[#F2FBF6] px-2.5 py-1.5 rounded-lg`}>
          <ShieldCheck size={14} color="#0A8A3A" />
          <Text style={tw`text-[10px] text-market-green font-bold`}>100% Secure</Text>
        </View>
      </View>

      {/* Stepper Status Indicator */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between bg-gray-50/30`}>
        {steps.map((step, i) => (
          <View key={step.id} style={tw`flex-row items-center flex-1`}>
            <View style={tw`items-center`}>
              <View style={tw`w-8 h-8 rounded-full items-center justify-center bg-market-green`}>
                <Text style={tw`text-xs font-bold text-white`}>✓</Text>
              </View>
              <Text style={tw`text-[9px] mt-1 font-bold text-market-green`}>{step.label}</Text>
            </View>
            {i < steps.length - 1 && <View style={tw`flex-1 h-px bg-market-green mx-2 mb-4`} />}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Animated Checkmark and Headers */}
        <View style={tw`items-center py-6 px-4`}>
          <View style={tw`w-20 h-24 rounded-full bg-market-green-light items-center justify-center mb-4`}>
            <Text style={tw`text-4xl`}>💚</Text>
          </View>
          <Text style={tw`text-2xl font-bold text-gray-950 text-center`}>
            Order Placed Successfully!
          </Text>
          <Text style={tw`text-xs text-gray-400 font-bold text-center mt-2 px-6 leading-4`}>
            Thank you for shopping with <Text style={tw`text-market-green`}>useMarket</Text>.{'\n'}
            Your order has been confirmed and is being processed.
          </Text>
        </View>

        {/* Order ID Wrapper Card */}
        <View style={tw`mx-4 bg-gray-50/70 border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-3`}>
            <FileText size={20} color="#737373" />
            <View>
              <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Order ID</Text>
              <Text style={tw`text-sm font-bold text-gray-900 mt-0.5`}>UM-78451236</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={tw`bg-white border border-gray-200 px-3.5 py-2 rounded-xl flex-row items-center gap-1.5`}
            onPress={() => router.replace('/(tabs)/orders')}
          >
            <Text style={tw`text-xs text-market-green font-bold`}>View Order Details</Text>
            <ChevronRight size={14} color="#0A8A3A" />
          </TouchableOpacity>
        </View>

        {/* Estimated Delivery and Progress Tracker */}
        <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm`}>
          <View style={tw`flex-row justify-between items-start mb-4`}>
            <View>
              <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Estimated Delivery</Text>
              <Text style={tw`text-xl font-bold text-market-green mt-0.5`}>20-30 mins</Text>
              <Text style={tw`text-xs text-gray-500 font-semibold mt-1`}>Today, 10:15 AM - 10:25 AM</Text>
            </View>
            <Image 
              source={require('@/assets/images/delivery-illustration.png')} 
              style={tw`w-28 h-20`} 
              resizeMode="contain"
            />
          </View>

          <View style={tw`h-px bg-gray-100 my-2`} />

          {/* Timeline Tracker */}
          <Text style={tw`text-xs font-bold text-market-green mb-3`}>Order is being prepared</Text>
          <View style={tw`gap-4 pl-1 mt-1`}>
            <View style={tw`flex-row gap-3 items-start`}>
              <View style={tw`w-4 h-4 rounded-full bg-market-green items-center justify-center mt-0.5`} />
              <View style={tw`flex-1`}>
                <Text style={tw`text-xs font-bold text-gray-900`}>Order Confirmed</Text>
                <Text style={tw`text-[10px] text-gray-400 mt-0.5`}>Your order has been confirmed</Text>
              </View>
              <Text style={tw`text-[10px] text-gray-400 font-semibold`}>9:45 AM</Text>
            </View>

            <View style={tw`flex-row gap-3 items-start`}>
              <View style={tw`w-4 h-4 rounded-full border-2 border-market-green bg-white items-center justify-center mt-0.5`} />
              <View style={tw`flex-1`}>
                <Text style={tw`text-xs font-bold text-gray-900`}>Preparing Your Order</Text>
                <Text style={tw`text-[10px] text-gray-400 mt-0.5`}>We're carefully picking and packing your items</Text>
              </View>
              <Text style={tw`text-[10px] text-gray-400 font-semibold`}>9:46 AM</Text>
            </View>
          </View>
        </View>

        {/* Order Summary list card */}
        <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-2.5`}>
            <Image source={require('@/assets/images/prod-apple.png')} style={tw`w-10 h-10`} resizeMode="cover" />
            <Image source={require('@/assets/images/prod-banana.png')} style={tw`w-10 h-10`} resizeMode="cover" />
            <Image source={require('@/assets/images/prod-milk.png')} style={tw`w-10 h-10`} resizeMode="cover" />
            <Text style={tw`text-xs text-gray-400 font-bold ml-1`}>+1 more</Text>
          </View>
          <View style={tw`items-end`}>
            <Text style={tw`text-sm font-bold text-gray-950`}>₦8,950</Text>
            <View style={tw`bg-market-green-light px-2 py-0.5 rounded border border-market-green/20 mt-1`}>
              <Text style={tw`text-[9px] text-market-green font-bold`}>You saved ₦1,450</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Row of 4 items */}
        <View style={tw`flex-row justify-between mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4 gap-2 shadow-sm`}>
          <TouchableOpacity 
            style={tw`flex-1 items-center gap-1.5`}
            onPress={() => router.replace('/(tabs)/orders')}
          >
            <MapPin size={20} color="#0A8A3A" />
            <Text style={tw`text-[10px] font-bold text-gray-900`}>Live Tracking</Text>
          </TouchableOpacity>
          <View style={tw`w-px h-8 bg-gray-100 self-center`} />
          <TouchableOpacity style={tw`flex-1 items-center gap-1.5`}>
            <Phone size={18} color="#0A8A3A" />
            <Text style={tw`text-[10px] font-bold text-gray-900`}>Need Help?</Text>
          </TouchableOpacity>
          <View style={tw`w-px h-8 bg-gray-100 self-center`} />
          <TouchableOpacity style={tw`flex-1 items-center gap-1.5`}>
            <Share2 size={18} color="#0A8A3A" />
            <Text style={tw`text-[10px] font-bold text-gray-900`}>Share Order</Text>
          </TouchableOpacity>
          <View style={tw`w-px h-8 bg-gray-100 self-center`} />
          <TouchableOpacity style={tw`flex-1 items-center gap-1.5`}>
            <RefreshCw size={18} color="#0A8A3A" />
            <Text style={tw`text-[10px] font-bold text-gray-900`}>Reorder</Text>
          </TouchableOpacity>
        </View>

        {/* Loyalty Rewards card */}
        <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between mb-8`}>
          <View style={tw`flex-row items-center gap-3`}>
            <Award size={24} color="#0A8A3A" />
            <View>
              <Text style={tw`text-xs font-bold text-market-green`}>Thanks for choosing useMarket!</Text>
              <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>You earned 90 points on this order.</Text>
            </View>
          </View>
          <TouchableOpacity style={tw`bg-market-green px-4 py-2 rounded-xl`}>
            <Text style={tw`text-white text-xs font-bold`}>View Rewards</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}