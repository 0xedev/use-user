import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  MessageSquare, 
  Box, 
  ChevronRightSquare 
} from 'lucide-react-native';
import tw from '@/lib/tw';

const steps = [
  { id: 1, label: 'Delivery', active: true, completed: false },
  { id: 2, label: 'Payment', active: false, completed: false },
  { id: 3, label: 'Review', active: false, completed: false },
  { id: 4, label: 'Confirm', active: false, completed: false },
];

export default function CheckoutDeliveryScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('standard');
  const [deliveryNote, setDeliveryNote] = useState('');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header Layout */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-50`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#171717" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Checkout</Text>
            <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Step 1 of 4</Text>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-1 bg-[#F2FBF6] px-2.5 py-1.5 rounded-lg`}>
          <ShieldCheck size={14} color="#0A8A3A" />
          <Text style={tw`text-[10px] text-market-green font-bold`}>100% Secure</Text>
        </View>
      </View>

      {/* Progress Stepper Bar */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between bg-gray-50/30`}>
        {steps.map((step, i) => (
          <View key={step.id} style={tw`flex-row items-center flex-1`}>
            <View style={tw`items-center`}>
              <View style={tw`w-8 h-8 rounded-full items-center justify-center ${step.active ? 'bg-market-green' : 'bg-gray-200'}`}>
                <Text style={tw`text-xs font-bold ${step.active ? 'text-white' : 'text-gray-500'}`}>{step.id}</Text>
              </View>
              <Text style={tw`text-[9px] mt-1 font-semibold ${step.active ? 'text-market-green font-bold' : 'text-gray-400'}`}>{step.label}</Text>
            </View>
            {i < steps.length - 1 && <View style={tw`flex-1 h-px bg-gray-200 mx-2 mb-4`} />}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Tracker Card */}
        <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between`}>
          <View style={tw`flex-1 pr-3`}>
            <Text style={tw`text-xs font-bold text-market-green`}>Add items worth ₦2,800 more to get FREE delivery</Text>
            <View style={tw`h-1.5 bg-gray-200 rounded-full mt-2.5 overflow-hidden`}>
              <View style={tw`h-full bg-market-green rounded-full w-[72%]`} />
            </View>
            <View style={tw`flex-row justify-between mt-1.5`}>
              <Text style={tw`text-[9px] text-gray-400 font-semibold`}>₦0</Text>
              <Text style={tw`text-[9px] text-gray-400 font-semibold`}>₦10,000</Text>
            </View>
          </View>
          <View style={tw`w-12 h-12 bg-white rounded-full items-center justify-center border border-market-green/20`}>
            <Text style={tw`text-xl`}>🛵</Text>
          </View>
        </View>

        {/* Delivery Address Card */}
        <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm`}>
          <Text style={tw`text-sm font-bold text-gray-900 mb-3`}>Delivery Address</Text>
          <View style={tw`flex-row items-start gap-3`}>
            <MapPin size={22} color="#0A8A3A" style={tw`mt-0.5`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm font-bold text-gray-900 leading-5`}>23 Greenway Street,{'\n'}Lekki Phase 1, Lagos</Text>
              <View style={tw`flex-row items-center gap-2 mt-2.5`}>
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
        </View>

        {/* Delivery Options Grid */}
        <View style={tw`mx-4 mt-4`}>
          <Text style={tw`text-sm font-bold text-gray-900 mb-3`}>Delivery Options</Text>
          
          {/* Standard Delivery */}
          <TouchableOpacity
            onPress={() => setSelectedOption('standard')}
            style={tw`flex-row items-center gap-3.5 p-4 rounded-2xl border mb-3 bg-white ${selectedOption === 'standard' ? 'border-market-green bg-[#F2FBF6]' : 'border-gray-200'}`}
          >
            <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${selectedOption === 'standard' ? 'border-market-green' : 'border-gray-300'}`}>
              {selectedOption === 'standard' && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
            </View>
            <Text style={tw`text-2xl`}>🛵</Text>
            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>Standard Delivery</Text>
                <Text style={tw`text-sm font-bold text-gray-950`}>₦1,000</Text>
              </View>
              <Text style={tw`text-xs text-gray-500 mt-0.5 font-medium`}>20-30 mins</Text>
              <Text style={tw`text-xs text-gray-400 mt-0.5 font-semibold`}>Get your order in 20-30 mins</Text>
              <View style={tw`bg-market-green-light self-start px-2 py-0.5 rounded mt-2 border border-market-green/20`}>
                <Text style={tw`text-[9px] text-market-green font-bold`}>Recommended</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Express Delivery */}
          <TouchableOpacity
            onPress={() => setSelectedOption('express')}
            style={tw`flex-row items-center gap-3.5 p-4 rounded-2xl border mb-3 bg-white ${selectedOption === 'express' ? 'border-market-green bg-[#F2FBF6]' : 'border-gray-200'}`}
          >
            <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${selectedOption === 'express' ? 'border-market-green' : 'border-gray-300'}`}>
              {selectedOption === 'express' && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
            </View>
            <Text style={tw`text-2xl`}>🚀</Text>
            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>Express Delivery</Text>
                <Text style={tw`text-sm font-bold text-gray-950`}>₦1,800</Text>
              </View>
              <Text style={tw`text-xs text-gray-500 mt-0.5 font-medium`}>10-15 mins</Text>
              <Text style={tw`text-xs text-gray-400 mt-0.5 font-semibold`}>Faster delivery in 10-15 mins</Text>
            </View>
          </TouchableOpacity>

          {/* Scheduled Delivery */}
          <TouchableOpacity
            onPress={() => setSelectedOption('schedule')}
            style={tw`flex-row items-center gap-3.5 p-4 rounded-2xl border mb-4 bg-white ${selectedOption === 'schedule' ? 'border-market-green bg-[#F2FBF6]' : 'border-gray-200'}`}
          >
            <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${selectedOption === 'schedule' ? 'border-market-green' : 'border-gray-300'}`}>
              {selectedOption === 'schedule' && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
            </View>
            <Text style={tw`text-2xl`}>📅</Text>
            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>Schedule Order</Text>
                <ChevronRightSquare size={16} color="#737373" />
              </View>
              <Text style={tw`text-xs text-gray-500 mt-0.5 font-medium`}>Choose a convenient time</Text>
              <Text style={tw`text-xs text-gray-400 mt-0.5 font-semibold`}>Schedule for later</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Optional Delivery Instructions */}
        <View style={tw`mx-4 mt-2`}>
          <Text style={tw`text-sm font-bold text-gray-900 mb-2`}>Delivery Instructions (Optional)</Text>
          <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13 bg-white`}>
            <MessageSquare size={18} color="#737373" style={tw`mr-3`} />
            <TextInput
              style={tw`flex-1 text-sm text-gray-900 h-full`}
              placeholder="E.g. Please call when you arrive"
              placeholderTextColor="#A3A3A3"
              value={deliveryNote}
              onChangeText={setDeliveryNote}
              maxLength={100}
            />
            <Text style={tw`text-xs text-gray-400 font-medium`}>{deliveryNote.length}/100</Text>
          </View>
        </View>

        {/* Careful Packing Block */}
        <TouchableOpacity style={tw`mx-4 mt-4 flex-row items-center gap-3.5 bg-gray-50/50 rounded-2xl p-4 border border-gray-100 mb-4`}>
          <Box size={24} color="#0A8A3A" />
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-bold text-gray-900`}>Careful packing</Text>
            <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>We pack your items with care to ensure quality</Text>
          </View>
          <ChevronRight size={18} color="#737373" />
        </TouchableOpacity>

        {/* Bill Summary Table Card */}
        <View style={tw`mx-4 bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm`}>
          <View style={tw`flex-row justify-between mb-2.5`}>
            <Text style={tw`text-xs text-gray-500 font-medium`}>Item Total (4 items)</Text>
            <Text style={tw`text-xs font-semibold text-gray-900`}>₦9,300</Text>
          </View>
          <View style={tw`flex-row justify-between mb-2.5`}>
            <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery Fee</Text>
            <Text style={tw`text-xs font-semibold text-gray-900`}>₦1,000</Text>
          </View>
          <View style={tw`flex-row justify-between mb-2.5`}>
            <Text style={tw`text-xs text-market-green font-semibold`}>Discount</Text>
            <Text style={tw`text-xs text-market-green font-bold`}>-₦1,450</Text>
          </View>
          <View style={tw`h-px bg-gray-100 my-2`} />
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-sm font-bold text-gray-950`}>To Pay</Text>
              <View style={tw`flex-row items-center mt-1`}>
                <Text style={tw`text-[10px] text-market-green font-bold`}>✓ You are saving ₦1,450</Text>
              </View>
            </View>
            <Text style={tw`text-lg font-bold text-gray-950`}>₦8,850</Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Action Button */}
      <TouchableOpacity 
        style={tw`mx-4 mb-4 bg-market-green h-14 rounded-xl flex-row items-center justify-between px-5`}
        onPress={() => router.push('/checkout/payment')}>
        <Text style={tw`text-white text-base font-bold`}>Continue to Payment</Text>
        <View style={tw`flex-row items-center gap-1`}>
          <Text style={tw`text-white text-base font-bold`}>₦8,850</Text>
          <ChevronRight size={18} color="white" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}