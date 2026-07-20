import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tw from '@/lib/tw';

const filters = ['All', 'Fruits', 'Leafy Greens', 'Vegetables', 'Herbs', 'Exotic Fruits'];

const bestSellers = [
  { id: 1, name: 'Cavendish Banana', qty: '1 bunch', price: '₦650', image: require('@/assets/images/prod-banana.png') },
  { id: 2, name: 'Red Apple', qty: '1kg', price: '₦2,000', image: require('@/assets/images/prod-apple.png') },
  { id: 3, name: 'Orange', qty: '1kg', price: '₦1,500', image: require('@/assets/images/prod-orange.png') },
  { id: 4, name: 'Grapes (Green)', qty: '500g', price: '₦1,800', image: require('@/assets/images/prod-grapes.png') },
  { id: 5, name: 'Pineapple', qty: '1 piece', price: '₦3,500', image: require('@/assets/images/prod-pineapple.png') },
];

const allProducts = [
  { id: 1, name: 'Tomatoes', qty: '1kg', price: '₦1,200', tag: 'Fresh', image: require('@/assets/images/prod-tomatoes.png') },
  { id: 2, name: 'Cucumber', qty: '1kg', price: '₦900', tag: 'Fresh', image: require('@/assets/images/prod-cucumber.png') },
  { id: 3, name: 'Carrots', qty: '1kg', price: '₦850', tag: 'Fresh', image: require('@/assets/images/prod-carrots.png') },
  { id: 4, name: 'Green Bell Pepper', qty: '500g', price: '₦1,100', tag: 'Fresh', image: require('@/assets/images/prod-pepper.png') },
  { id: 5, name: 'Avocado', qty: '1kg', price: '₦2,500', tag: 'Fresh', image: require('@/assets/images/prod-avocado.png') },
];

export default function CategoryDetailScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');
  const [cartCount] = useState(3);
  const [cartTotal] = useState('₦4,650');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center gap-2`}>
          <Text style={tw`text-xl text-gray-900`}>←</Text>
          <Text style={tw`text-lg font-bold text-gray-900`}>Fruits & Vegetables</Text>
        </TouchableOpacity>
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity>
            <Text style={tw`text-xl text-gray-600`}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`relative`}>
            <Text style={tw`text-xl text-gray-600`}>🔔</Text>
            <View style={tw`absolute -top-1 -right-1 bg-market-green rounded-full w-4 h-4 items-center justify-center`}>
              <Text style={tw`text-[10px] text-white font-bold`}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw`relative`}>
            <Text style={tw`text-xl text-gray-600`}>🛒</Text>
            <View style={tw`absolute -top-1 -right-1 bg-market-green rounded-full w-4 h-4 items-center justify-center`}>
              <Text style={tw`text-[10px] text-white font-bold`}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location */}
      <View style={tw`px-4 pb-2 flex-row items-center gap-1`}>
        <Text style={tw`text-market-green`}>📍</Text>
        <Text style={tw`text-xs text-gray-500`}>Delivering to</Text>
        <Text style={tw`text-xs font-semibold text-gray-900`}>23 Greenway Street, Lekki Phase 1</Text>
        <Text style={tw`text-xs text-gray-400`}>▼</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={tw`px-4 py-3`}
          contentContainerStyle={tw`gap-2`}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={tw`px-4 py-2 rounded-full border ${activeFilter === filter ? 'bg-market-green border-market-green' : 'bg-white border-gray-200'}`}>
              <Text style={tw`text-sm font-medium ${activeFilter === filter ? 'text-white' : 'text-gray-700'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Banner */}
        <View style={tw`mx-4 bg-market-green-light rounded-2xl p-4 mb-4 flex-row items-center`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-market-green text-xl font-bold leading-6`}>Fresh & healthy{'\n'}picked for you</Text>
            <Text style={tw`text-gray-600 text-xs mt-1 leading-4`}>Handpicked quality.{'\n'}Delivered fresh to your door.</Text>
            <TouchableOpacity style={tw`bg-market-green rounded-lg px-4 py-2 mt-3 self-start`}>
              <Text style={tw`text-white text-sm font-semibold`}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={require('@/assets/images/fruits-hero.png')} 
            style={tw`w-36 h-28`}
            resizeMode="contain"
          />
        </View>

        {/* Pagination Dots */}
        <View style={tw`flex-row justify-center gap-1 mb-4`}>
          <View style={tw`w-6 h-1.5 rounded-full bg-market-green`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
        </View>

        {/* Best Sellers */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>Best Sellers</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3`}>
            {bestSellers.map((item) => (
              <View key={item.id} style={tw`w-36 bg-white rounded-xl border border-gray-100 p-2`}>
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

        {/* All Products */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>All Products</Text>
            <View style={tw`flex-row gap-2`}>
              <TouchableOpacity style={tw`flex-row items-center gap-1 bg-gray-50 rounded-lg px-3 py-1.5`}>
                <Text style={tw`text-xs text-gray-600`}>☰ Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`flex-row items-center gap-1 bg-gray-50 rounded-lg px-3 py-1.5`}>
                <Text style={tw`text-xs text-gray-600`}>⇅ Sort ▼</Text>
              </TouchableOpacity>
            </View>
          </View>
          {allProducts.map((product) => (
            <View key={product.id} style={tw`flex-row items-center bg-white rounded-xl border border-gray-100 p-3 mb-2`}>
              <Image source={product.image} style={tw`w-20 h-20 rounded-lg`} resizeMode="cover" />
              <View style={tw`flex-1 ml-3`}>
                <Text style={tw`text-sm font-semibold text-gray-900`}>{product.name}</Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>{product.qty}</Text>
                <View style={tw`bg-market-green-light self-start px-2 py-0.5 rounded mt-1`}>
                  <Text style={tw`text-[10px] text-market-green font-medium`}>{product.tag}</Text>
                </View>
              </View>
              <View style={tw`items-end gap-2`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>{product.price}</Text>
                <TouchableOpacity style={tw`bg-market-green w-8 h-8 rounded-full items-center justify-center`}>
                  <Text style={tw`text-white text-xl leading-5`}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Cart Bar */}
      <View style={tw`mx-4 mb-2 bg-market-green-light rounded-xl p-3 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <View style={tw`relative`}>
            <Text style={tw`text-2xl`}>🛒</Text>
            <View style={tw`absolute -top-1 -right-1 bg-market-green rounded-full w-5 h-5 items-center justify-center border-2 border-market-green-light`}>
              <Text style={tw`text-[10px] text-white font-bold`}>{cartCount}</Text>
            </View>
          </View>
          <View>
            <Text style={tw`text-sm text-gray-900 font-medium`}>{cartCount} items in cart</Text>
            <Text style={tw`text-sm font-bold text-gray-900`}>Total: {cartTotal}</Text>
          </View>
        </View>
        <TouchableOpacity style={tw`bg-market-green rounded-lg px-5 py-2.5`}>
          <Text style={tw`text-white text-sm font-semibold`}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}