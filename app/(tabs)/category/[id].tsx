import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const filters = ['All', 'Fruits', 'Leafy Greens', 'Vegetables', 'Herbs', 'Exotic Fruits'];

const bestSellers = [
  { id: 1, name: 'Cavendish Banana', weight: '1 bunch', price: '₦650', image: '🍌', fresh: true },
  { id: 2, name: 'Red Apple', weight: '1kg', price: '₦2,000', image: '🍎', fresh: true },
  { id: 3, name: 'Orange', weight: '1kg', price: '₦1,500', image: '🍊', fresh: true },
  { id: 4, name: 'Grapes (Green)', weight: '500g', price: '₦1,800', image: '🍇', fresh: true },
  { id: 5, name: 'Pineapple', weight: '1 piece', price: '₦3,500', image: '🍍', fresh: true },
];

const allProducts = [
  { id: 1, name: 'Tomatoes', weight: '1kg', price: '₦1,200', image: '🍅', fresh: true },
  { id: 2, name: 'Cucumber', weight: '1kg', price: '₦900', image: '🥒', fresh: true },
  { id: 3, name: 'Carrots', weight: '1kg', price: '₦850', image: '🥕', fresh: true },
  { id: 4, name: 'Green Bell Pepper', weight: '500g', price: '₦1,100', image: '🫑', fresh: true },
  { id: 5, name: 'Avocado', weight: '1kg', price: '₦2,500', image: '🥑', fresh: true },
];

export default function CategoryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [cartCount] = useState(3);
  const [cartTotal] = useState('₦4,650');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 pt-2 pb-3`}>
        <View style={tw`flex-row items-center gap-2`}>
          <TouchableOpacity onPress={() => router.back()} style={tw`w-10 h-10 justify-center`}>
            <Text style={tw`text-2xl text-gray-900`}>←</Text>
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-gray-900`}>Fruits & Vegetables</Text>
        </View>
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity>
            <Text style={tw`text-2xl`}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`relative`}>
            <Text style={tw`text-2xl`}>🔔</Text>
            <View style={tw`absolute -top-1 -right-1 w-4 h-4 bg-market-green rounded-full items-center justify-center`}>
              <Text style={tw`text-white text-[10px] font-bold`}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw`relative`}>
            <Text style={tw`text-2xl`}>🛒</Text>
            <View style={tw`absolute -top-1 -right-1 w-4 h-4 bg-market-green rounded-full items-center justify-center`}>
              <Text style={tw`text-white text-[10px] font-bold`}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location */}
      <View style={tw`flex-row items-center px-4 mb-3`}>
        <Text style={tw`text-lg text-market-green mr-2`}>📍</Text>
        <Text style={tw`text-sm text-gray-500`}>Delivering to </Text>
        <Text style={tw`text-sm font-semibold text-gray-900`}>23 Greenway Street, Lekki Phase 1</Text>
        <Text style={tw`text-xs text-gray-400 ml-1`}>▼</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 pb-3`}>
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={tw`px-5 py-2 rounded-full border ${activeFilter === filter ? 'bg-market-green border-market-green' : 'bg-white border-gray-200'}`}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={tw`text-sm font-medium ${activeFilter === filter ? 'text-white' : 'text-gray-700'}`}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Banner */}
        <View style={tw`mx-4 bg-market-green-light rounded-2xl p-5 flex-row items-center`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-xl font-bold text-market-green`}>Fresh & healthy{'\n'}picked for you</Text>
            <Text style={tw`text-sm text-gray-600 mt-2`}>Handpicked quality.{'\n'}Delivered fresh to your door.</Text>
            <TouchableOpacity style={tw`bg-market-green px-5 py-2.5 rounded-xl mt-3 self-start`}>
              <Text style={tw`text-white font-semibold text-sm`}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Text style={tw`text-6xl`}>🥗</Text>
        </View>

        {/* Pagination */}
        <View style={tw`flex-row justify-center gap-1.5 mt-3`}>
          <View style={tw`w-6 h-1.5 rounded-full bg-market-green`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
        </View>

        {/* Best Sellers */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Best Sellers</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
          {bestSellers.map((product) => (
            <TouchableOpacity key={product.id} style={tw`w-36 border border-gray-200 rounded-2xl p-3`}>
              <View style={tw`items-center`}>
                <Text style={tw`text-5xl`}>{product.image}</Text>
              </View>
              <Text style={tw`text-sm font-semibold text-gray-900 mt-2`}>{product.name}</Text>
              <Text style={tw`text-xs text-gray-500 mt-1`}>{product.weight}</Text>
              <View style={tw`flex-row justify-between items-center mt-2`}>
                <Text style={tw`text-base font-bold text-gray-900`}>{product.price}</Text>
                <TouchableOpacity style={tw`w-7 h-7 rounded-full bg-market-green items-center justify-center`}>
                  <Text style={tw`text-white text-lg font-bold`}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* All Products */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>All Products</Text>
          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity style={tw`flex-row items-center border border-gray-200 rounded-lg px-3 py-1.5 gap-1`}>
              <Text style={tw`text-xs text-gray-600`}>☰ Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center border border-gray-200 rounded-lg px-3 py-1.5 gap-1`}>
              <Text style={tw`text-xs text-gray-600`}>⇅ Sort</Text>
              <Text style={tw`text-xs text-gray-400`}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`px-4 gap-3`}>
          {allProducts.map((product) => (
            <TouchableOpacity key={product.id} style={tw`flex-row items-center border border-gray-100 rounded-xl p-3`}>
              <Text style={tw`text-4xl mr-3`}>{product.image}</Text>
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-semibold text-gray-900`}>{product.name}</Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>{product.weight}</Text>
                {product.fresh && (
                  <View style={tw`bg-market-green-light px-2 py-0.5 rounded-md self-start mt-1`}>
                    <Text style={tw`text-xs text-market-green font-medium`}>Fresh</Text>
                  </View>
                )}
              </View>
              <Text style={tw`text-base font-bold text-gray-900 mr-3`}>{product.price}</Text>
              <TouchableOpacity style={tw`w-8 h-8 rounded-full bg-market-green items-center justify-center`}>
                <Text style={tw`text-white text-lg font-bold`}>+</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Padding for Cart Bar */}
        <View style={tw`h-20`} />
      </ScrollView>

      {/* Floating Cart Bar */}
      <View style={tw`absolute bottom-0 left-0 right-0 bg-market-green-light mx-4 mb-4 rounded-xl p-3 flex-row items-center`}>
        <View style={tw`relative mr-3`}>
          <Text style={tw`text-2xl`}>🛒</Text>
          <View style={tw`absolute -top-1 -right-1 w-5 h-5 bg-market-green rounded-full items-center justify-center`}>
            <Text style={tw`text-white text-xs font-bold`}>{cartCount}</Text>
          </View>
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`text-sm font-semibold text-gray-900`}>{cartCount} items in cart</Text>
          <Text style={tw`text-sm font-bold text-gray-900`}>Total: {cartTotal}</Text>
        </View>
        <TouchableOpacity style={tw`bg-market-green px-6 py-2.5 rounded-xl`}>
          <Text style={tw`text-white font-semibold text-sm`}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}