import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const paymentMethods = [
  { id: 'wallet', name: 'useMarket Wallet', desc: 'Available balance: ₦2,350', icon: '👛', discount: '-₦2,350', selected: true },
  { id: 'card', name: 'Card', desc: 'Visa, Mastercard, Verve', icon: '💳', cards: ['VISA', 'Mastercard', 'Verve'] },
  { id: 'bank', name: 'Bank Transfer', desc: 'Pay directly from your bank', icon: '🏦' },
  { id: 'ussd', name: 'USSD', desc: '*737# or *402#', icon: '📱' },
  { id: 'paystack', name: 'Pay with Paystack', desc: 'More payment options', icon: '💰' },
  { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive your order', icon: '💵', fee: '₦100', feeLabel: 'Handling fee' },
];

const steps = [
  { id: 1, label: 'Delivery', completed: true },
  { id: 2, label: 'Payment', active: true, completed: false },
  { id: 3, label: 'Review', active: false, completed: false },
  { id: 4, label: 'Confirm', active: false, completed: false },
];

export default function CheckoutPaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const [coupon, setCoupon] = useState('');

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
            <Text style={tw`text-xs text-gray-500`}>Step 2 of 4</Text>
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
            <View>
              <Text style={tw`text-sm text-gray-700`}>Yay! You're saving <Text style={tw`font-bold text-market-green`}>₦1,450</Text> on this order</Text>
              <Text style={tw`text-xs text-gray-500`}>Apply offers & save more</Text>
            </View>
          </View>
          <TouchableOpacity style={tw`flex-row items-center gap-1`}>
            <Text style={tw`text-sm text-market-green font-semibold`}>View offers</Text>
            <Text style={tw`text-market-green`}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Methods */}
        <View style={tw`px-4 mb-4`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Payment Methods</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedMethod(method.id)}
              style={tw`flex-row items-center gap-3 p-3 rounded-xl border mb-2 ${selectedMethod === method.id ? 'border-market-green bg-market-green-light/20' : 'border-gray-200'}`}>
              <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${selectedMethod === method.id ? 'border-market-green' : 'border-gray-300'}`}>
                {selectedMethod === method.id && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
              </View>
              <Text style={tw`text-2xl`}>{method.icon}</Text>
              <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-sm font-semibold text-gray-900`}>{method.name}</Text>
                  {method.discount && <Text style={tw`text-sm font-bold text-market-green`}>{method.discount}</Text>}
                  {method.fee && <Text style={tw`text-sm font-bold text-gray-900`}>{method.fee}</Text>}
                </View>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>{method.desc}</Text>
                {method.feeLabel && <Text style={tw`text-[10px] text-gray-400`}>{method.feeLabel}</Text>}
                {method.cards && (
                  <View style={tw`flex-row gap-1 mt-1`}>
                    {method.cards.map((card) => (
                      <View key={card} style={tw`bg-gray-100 px-2 py-0.5 rounded`}>
                        <Text style={tw`text-[10px] text-gray-600 font-medium`}>{card}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              {selectedMethod === method.id && <Text style={tw`text-market-green text-lg`}>✓</Text>}
              {!method.selected && <Text style={tw`text-gray-400`}>→</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* Secure Payment */}
        <View style={tw`mx-4 bg-market-green-light rounded-xl p-3 flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`text-market-green text-xl`}>🛡️</Text>
            <View>
              <Text style={tw`text-sm font-semibold text-market-green`}>100% Secure Payments</Text>
              <Text style={tw`text-xs text-gray-500`}>Your payment details are safe with us</Text>
            </View>
          </View>
          <View style={tw`flex-row gap-2`}>
            <Text style={tw`text-xs text-gray-400`}>PCI</Text>
            <Text style={tw`text-xs text-gray-400`}>SSL</Text>
            <Text style={tw`text-xs text-gray-400`}>VISA</Text>
          </View>
        </View>

        {/* Apply Offers */}
        <View style={tw`px-4 mb-4`}>
          <Text style={tw`text-base font-bold text-gray-900 mb-3`}>Apply Offers</Text>
          <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-3 py-2`}>
            <Text style={tw`text-gray-400 mr-2`}>🏷️</Text>
            <TextInput
              style={tw`flex-1 text-sm text-gray-900`}
              placeholder="Enter coupon code"
              placeholderTextColor="#999"
              value={coupon}
              onChangeText={setCoupon}
            />
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>Apply</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={tw`flex-row items-center justify-between mt-3 p-3 bg-white border border-gray-200 rounded-xl`}>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`text-xl`}>👛</Text>
              <View>
                <Text style={tw`text-sm font-semibold text-gray-900`}>useMarket Wallet</Text>
                <Text style={tw`text-xs text-gray-500`}>Use your wallet balance & save more</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>Apply Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

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
            <Text style={tw`text-sm text-gray-600`}>Handling Fee</Text>
            <Text style={tw`text-sm text-gray-900`}>₦100</Text>
          </View>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-sm text-market-green font-semibold`}>Discount</Text>
            <Text style={tw`text-sm text-market-green font-semibold`}>-₦1,450</Text>
          </View>
          <View style={tw`h-px bg-gray-200 my-2`} />
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-base font-bold text-gray-900`}>To Pay</Text>
            <Text style={tw`text-xl font-bold text-gray-900`}>₦8,950</Text>
          </View>
          <View style={tw`flex-row items-center gap-1 mt-2 bg-market-green-light self-start px-2 py-1 rounded`}>
            <Text style={tw`text-market-green`}>🛡️</Text>
            <Text style={tw`text-xs text-market-green`}>You are saving ₦1,450</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity 
        style={tw`mx-4 mb-2 bg-market-green py-4 rounded-xl flex-row items-center justify-between px-4`}
        onPress={() => router.push('/checkout/review')}>
        <Text style={tw`text-white text-base font-semibold`}>Continue to Review</Text>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`text-white text-base font-bold`}>₦8,950</Text>
          <Text style={tw`text-white`}>→</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}