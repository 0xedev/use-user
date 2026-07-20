import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const weights = ['1kg', '2kg', '3kg', '5kg'];

const features = [
  { icon: '🌱', title: 'Farm Fresh', desc: 'Carefully selected' },
  { icon: '🛡️', title: '100% Natural', desc: 'No artificial colors' },
  { icon: '💧', title: 'Hygienically', desc: 'Packed for freshness' },
  { icon: '✅', title: 'Best Quality', desc: 'Handpicked apples' },
];

const relatedProducts = [
  { id: 1, name: 'Green Apples', qty: '1kg', price: '₦1,100', image: require('@/assets/images/prod-green-apple.png') },
  { id: 2, name: 'Cavendish Banana', qty: '1 bunch', price: '₦650', image: require('@/assets/images/prod-banana.png') },
  { id: 3, name: 'Sweet Oranges', qty: '1kg', price: '₦1,100', image: require('@/assets/images/prod-orange.png') },
  { id: 4, name: 'Red Grapes', qty: '500g', price: '₦1,350', image: require('@/assets/images/prod-grapes.png') },
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedWeight, setSelectedWeight] = useState('1kg');
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={tw`text-xl text-gray-900`}>←</Text>
          </TouchableOpacity>
          <View style={tw`flex-row gap-4`}>
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              <Text style={tw`text-xl ${liked ? 'text-red-500' : 'text-gray-400'}`}>{liked ? '♥' : '♡'}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={tw`text-xl text-gray-700`}>⇧</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`relative`}>
              <Text style={tw`text-xl`}>🛒</Text>
              <View style={tw`absolute -top-1 -right-1 bg-market-green rounded-full w-4 h-4 items-center justify-center`}>
                <Text style={tw`text-[10px] text-white font-bold`}>5</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Image */}
        <View style={tw`px-4 items-center`}>
          <Image 
            source={require('@/assets/images/prod-apple-large.png')} 
            style={tw`w-full h-64`}
            resizeMode="contain"
          />
          {/* Pagination Dots */}
          <View style={tw`flex-row gap-1 mt-2`}>
            <View style={tw`w-5 h-1.5 rounded-full bg-market-green`} />
            <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
            <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
            <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          </View>
        </View>

        {/* Product Info */}
        <View style={tw`px-4 mt-4`}>
          <Text style={tw`text-2xl font-bold text-gray-900`}>Red Apples</Text>
          <Text style={tw`text-sm text-gray-500 mt-1`}>Fresh, Juicy & Crunchy</Text>
          
          <View style={tw`flex-row items-center gap-1 mt-2`}>
            <Text style={tw`text-yellow-500`}>⭐</Text>
            <Text style={tw`text-sm font-semibold text-gray-900`}>4.6</Text>
            <Text style={tw`text-sm text-gray-500`}>(2,345 ratings)</Text>
          </View>

          <View style={tw`flex-row items-center gap-3 mt-3`}>
            <Text style={tw`text-2xl font-bold text-gray-900`}>₦1,200</Text>
            <View style={tw`bg-market-green-light px-2 py-1 rounded`}>
              <Text style={tw`text-xs text-market-green font-semibold`}>20% OFF</Text>
            </View>
            <Text style={tw`text-sm text-gray-400 line-through`}>₦1,500</Text>
          </View>

          {/* Weight Selection */}
          <Text style={tw`text-sm font-semibold text-gray-900 mt-4`}>Select Weight</Text>
          <View style={tw`flex-row gap-3 mt-2`}>
            {weights.map((w) => (
              <TouchableOpacity
                key={w}
                onPress={() => setSelectedWeight(w)}
                style={tw`px-4 py-2.5 rounded-xl border ${selectedWeight === w ? 'bg-market-green-light border-market-green' : 'border-gray-200'}`}>
                <Text style={tw`text-sm font-semibold ${selectedWeight === w ? 'text-market-green' : 'text-gray-700'}`}>{w}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Delivery Info */}
          <View style={tw`flex-row items-center gap-3 bg-market-green-light rounded-xl p-3 mt-4`}>
            <Text style={tw`text-2xl`}>🛵</Text>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm font-semibold text-market-green`}>Delivery in 20-30 mins</Text>
              <Text style={tw`text-xs text-gray-500`}>From top stores near you</Text>
            </View>
            <Text style={tw`text-market-green`}>→</Text>
          </View>

          {/* Features */}
          <View style={tw`flex-row justify-between mt-4 py-4 border-t border-b border-gray-100`}>
            {features.map((f, i) => (
              <View key={i} style={tw`items-center gap-1 flex-1`}>
                <Text style={tw`text-2xl`}>{f.icon}</Text>
                <Text style={tw`text-xs font-semibold text-gray-900 text-center`}>{f.title}</Text>
                <Text style={tw`text-[10px] text-gray-500 text-center leading-3`}>{f.desc}</Text>
              </View>
            ))}
          </View>

          {/* Product Details */}
          <Text style={tw`text-lg font-bold text-gray-900 mt-4`}>Product Details</Text>
          <Text style={tw`text-sm text-gray-600 leading-5 mt-2`}>
            Crisp, juicy and naturally sweet, our red apples are packed with essential nutrients and antioxidants. Perfect for a healthy snack or for your favorite recipes.
          </Text>

          <View style={tw`mt-3 gap-3`}>
            <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
              <Text style={tw`text-sm text-gray-700`}>Origin</Text>
              <Text style={tw`text-sm font-semibold text-gray-900`}>South Africa</Text>
            </View>
            <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
              <Text style={tw`text-sm text-gray-700`}>Storage Instructions</Text>
              <Text style={tw`text-sm font-semibold text-gray-900`}>Store in a cool, dry place</Text>
            </View>
            <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
              <Text style={tw`text-sm text-gray-700`}>Shelf Life</Text>
              <Text style={tw`text-sm font-semibold text-gray-900`}>7-10 days</Text>
            </View>
          </View>

          {/* You May Also Like */}
          <View style={tw`flex-row justify-between items-center mt-6 mb-3`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>You May Also Like</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3 pb-4`}>
            {relatedProducts.map((item) => (
              <View key={item.id} style={tw`w-36 bg-white rounded-xl border border-gray-100 p-2 relative`}>
                <TouchableOpacity style={tw`absolute top-2 right-2 z-10`}>
                  <Text style={tw`text-gray-300 text-lg`}>♡</Text>
                </TouchableOpacity>
                <Image source={item.image} style={tw`w-full h-28 rounded-lg`} resizeMode="cover" />
                <Text style={tw`text-sm font-semibold text-gray-900 mt-2 leading-4`}>{item.name}</Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>{item.qty}</Text>
                <View style={tw`flex-row justify-between items-center mt-2`}>
                  <Text style={tw`text-sm font-bold text-gray-900`}>{item.price}</Text>
                  <TouchableOpacity style={tw`bg-market-green w-7 h-7 rounded-full items-center justify-center`}>
                    <Text style={tw`text-white text-lg leading-5`}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={tw`px-4 py-3 border-t border-gray-100 flex-row items-center gap-3 bg-white`}>
        {/* Quantity Control */}
        <View style={tw`flex-row items-center border border-gray-200 rounded-xl`}>
          <TouchableOpacity 
            onPress={() => quantity > 1 && setQuantity(q => q - 1)}
            style={tw`px-3 py-2.5`}>
            <Text style={tw`text-lg text-gray-600`}>🗑️</Text>
          </TouchableOpacity>
          <Text style={tw`text-base font-semibold text-gray-900 px-2`}>{quantity}</Text>
          <TouchableOpacity 
            onPress={() => setQuantity(q => q + 1)}
            style={tw`px-3 py-2.5`}>
            <Text style={tw`text-lg text-market-green font-bold`}>+</Text>
          </TouchableOpacity>
        </View>
        
        {/* Add to Cart */}
        <TouchableOpacity 
          style={tw`flex-1 bg-market-green py-3.5 rounded-xl flex-row items-center justify-center gap-2`}
          onPress={() => router.push('/cart')}>
          <Text style={tw`text-white text-base font-semibold`}>Add to Cart</Text>
          <Text style={tw`text-white text-base font-bold`}>₦1,200</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}