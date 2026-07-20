import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', time: '20-30 mins', desc: 'Get your order in 20-30 mins', price: '₦1,000', icon: '🛵', recommended: true },
  { id: 'express', name: 'Express Delivery', time: '10-15 mins', desc: 'Faster delivery in 10-15 mins', price: '₦1,800', icon: '🚀' },
  { id: 'schedule', name: 'Schedule Order', time: 'Choose a convenient time', desc: 'Schedule for later', price: 'From ₦1,000', icon: '📅' },
];

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
      {/* Header */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={tw`text-xl text-gray-900`}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Checkout</Text>
            <Text style={tw`text-xs text-gray-500`}>Step 1 of 4</Text>
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
          <View key={step.id} style={tw`flex-row items-center flex-1 ${i < steps.length - 1 ? '' : ''}`}>
            <View style={tw`items-center`}>
              <View style={tw`w-8 h-8 rounded-full items-center justify-center ${step.active ? 'bg-market-green' : step.completed ? 'bg-market-green' : 'bg-gray-200'}`}>
                <Text style={tw`text-sm font-bold ${step.active || step.completed ? 'text-white' : 'text-gray-500'}`}>
                  {step.completed ? '✓' : step.id}
                </Text>
              </View>
              <Text style={tw`text-[10px] mt-1 ${step.active ? 'text-market-green font-semibold' : 'text-gray-500'}`}>{step.label}</Text>
            </View>
            {i < steps.length - 1 && (
              <View style={tw`flex-1 h-px bg-gray-200 mx-2 mb-4`} />
            )}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Free Delivery Progress */}
        <View style={tw`mx-4 bg-market-green-light rounded-xl p-3 mb-4`}>
          <View style={tw`flex-row items-center gap-2 mb-2`}>
            <Text style={tw`text-xl`}>🛵</Text>
            <Text style={tw`text-sm text-gray-700`}>Add items worth <Text style={tw`font-bold text-market-green`}>₦2,800</Text> more to get <Text style={tw`font-bold text-market-green`}>FREE delivery</Text></Text>
          </View>
          <View style={tw`h-2 bg-gray-200 rounded-full overflow-hidden`}>
            <View style={tw`h-full bg-market-green rounded-full w-[72%]`} />
          </View>
          <View style={tw`flex-row justify-between mt-1`}>
            <Text style={tw`text-xs text-gray-500`}>₦0</Text>
            <Text style={tw`text-xs text-gray-500`}>₦10,000</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={tw`mx-4 bg-white rounded-xl border border-gray-100 p-4 mb-4`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Delivery Address</Text>
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
        </View>

        {/* Delivery Options */}
        <View style={tw`mx-4 mb-4`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Delivery Options</Text>
          {deliveryOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedOption(option.id)}
              style={tw`flex-row items-center gap-3 p-3 rounded-xl border mb-2 ${selectedOption === option.id ? 'border-market-green bg-market-green-light/30' : 'border-gray-200'}`}>
              <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${selectedOption === option.id ? 'border-market-green' : 'border-gray-300'}`}>
                {selectedOption === option.id && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
              </View>
              <Text style={tw`text-2xl`}>{option.icon}</Text>
              <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-sm font-semibold text-gray-900`}>{option.name}</Text>
                  <Text style={tw`text-sm font-bold text-gray-900`}>{option.price}</Text>
                </View>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>{option.time}</Text>
                <Text style={tw`text-xs text-gray-500`}>{option.desc}</Text>
                {option.recommended && (
                  <View style={tw`bg-market-green-light self-start px-2 py-0.5 rounded mt-1 border border-market-green`}>
                    <Text style={tw`text-[10px] text-market-green font-medium`}>Recommended</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Delivery Instructions */}
        <View style={tw`mx-4 mb-4`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-2`}>Delivery Instructions (Optional)</Text>
          <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-3 py-2`}>
            <Text style={tw`text-gray-400 mr-2`}>💬</Text>
            <TextInput
              style={tw`flex-1 text-sm text-gray-900`}
              placeholder="E.g. Please call when you arrive"
              placeholderTextColor="#999"
              value={deliveryNote}
              onChangeText={setDeliveryNote}
              maxLength={100}
            />
            <Text style={tw`text-xs text-gray-400`}>{deliveryNote.length}/100</Text>
          </View>
        </View>

        {/* Careful Packing */}
        <TouchableOpacity style={tw`mx-4 flex-row items-center gap-3 bg-market-green-light rounded-xl p-3 mb-4`}>
          <Text style={tw`text-2xl`}>📦</Text>
          <View style={tw`flex-1`}>
            <Text style={tw`text-sm font-semibold text-market-green`}>Careful packing</Text>
            <Text style={tw`text-xs text-gray-500`}>We pack your items with care to ensure quality</Text>
          </View>
          <Text style={tw`text-market-green`}>→</Text>
        </TouchableOpacity>

        {/* Bill Summary */}
        <View style={tw`mx-4 bg-white rounded-xl border border-gray-100 p-4 mb-4`}>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-sm text-gray-600`}>Item Total (4 items)</Text>
            <Text style={tw`text-sm text-gray-900`}>₦9,300</Text>
          </View>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-sm text-gray-600`}>Delivery Fee</Text>
            <Text style={tw`text-sm text-gray-900`}>₦1,000</Text>
          </View>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-sm text-market-green font-semibold`}>Discount</Text>
            <Text style={tw`text-sm text-market-green font-semibold`}>-₦1,450</Text>
          </View>
          <View style={tw`h-px bg-gray-200 my-2`} />
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-base font-bold text-gray-900`}>To Pay</Text>
              <View style={tw`flex-row items-center gap-1 mt-1`}>
                <Text style={tw`text-market-green`}>🛡️</Text>
                <Text style={tw`text-xs text-market-green`}>You are saving ₦1,450</Text>
              </View>
            </View>
            <Text style={tw`text-xl font-bold text-gray-900`}>₦8,850</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity 
        style={tw`mx-4 mb-2 bg-market-green py-4 rounded-xl flex-row items-center justify-between px-4`}
        onPress={() => router.push('/checkout/payment')}>
        <Text style={tw`text-white text-base font-semibold`}>Continue to Payment</Text>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`text-white text-base font-bold`}>₦8,850</Text>
          <Text style={tw`text-white`}>→</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}