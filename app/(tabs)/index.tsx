
import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Heart,
  MapPin,
  Scan,
  Search,
  ShoppingBag,
  ShoppingCart
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BillsScreen from './bills-home';
import FoodsScreen from './food-home';
import GadgetsScreen from './gadgets-home';
import LogisticsScreen from './logistics-home';
import MarketplaceHomeScreen from './marketplace-home';

const categories = [
  { id: 1, name: 'Groceries', icon: '🛒', bg: 'bg-emerald-50' },
  { id: 2, name: 'Fruits &\nVegetables', icon: '🥗', bg: 'bg-emerald-50' },
  { id: 3, name: 'Meat &\nSeafood', icon: '🥩', bg: 'bg-emerald-50' },
  { id: 4, name: 'Drinks &\nSnacks', icon: '🧃', bg: 'bg-emerald-50' },
  { id: 5, name: 'Baby &\nKids', icon: '🍼', bg: 'bg-emerald-50' },
  { id: 6, name: 'All\nCategories', icon: '🎛️', bg: 'bg-gray-100' },
];

const bestDeals = [
  {
    id: 1,
    name: 'Golden Penny Semovita',
    unit: '2kg',
    price: '₦2,400',
    oldPrice: '₦3,000',
    discount: '-20%',
    image: require('@/assets/images/prod-rice.png'),
  },
  {
    id: 2,
    name: 'Indomie Instant Noodles',
    unit: 'Pack (70g x 5)',
    price: '₦1,700',
    oldPrice: '₦2,000',
    discount: '-15%',
    image: require('@/assets/images/prod-indomie.png'),
  },
  {
    id: 3,
    name: 'Power Oil',
    unit: '1L',
    price: '₦1,800',
    oldPrice: '₦2,000',
    discount: '-10%',
    image: require('@/assets/images/prod-oil.png'),
  },
  {
    id: 4,
    name: 'Milo Chocolate Drink',
    unit: '400g',
    price: '₦3,200',
    oldPrice: '₦3,900',
    discount: '-18%',
    image: require('@/assets/images/prod-milo.png'),
  },
];

const popularStores = [
  {
    id: 1,
    name: 'QuickMart',
    time: '15-30 min',
    rating: '4.6',
    minOrder: '₦1,000 min',
    verified: true,
    logo: require('@/assets/images/store-freshmart.png'),
  },
  {
    id: 2,
    name: 'SPAR Yaba',
    time: '20-35 min',
    rating: '4.5',
    minOrder: '₦1,500 min',
    verified: true,
    logo: require('@/assets/images/store-shoprite.png'),
  },
  {
    id: 3,
    name: 'Prince Ebeano',
    time: '25-40 min',
    rating: '4.4',
    minOrder: '₦1,000 min',
    verified: true,
    logo: require('@/assets/images/store-justrite.png'),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { service } = useLocalSearchParams<{ service?: string }>();

  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Dynamically render chosen service layout while preserving "Home" tab active state
  if (service === 'food') return <FoodsScreen />;
  if (service === 'gadgets') return <GadgetsScreen />;
  if (service === 'bills') return <BillsScreen />;
  if (service === 'marketplace') return <MarketplaceHomeScreen />;
  if (service === 'logistics') return <LogisticsScreen />;

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Top Navigation Bar */}
      <View style={tw`px-4 pt-2 pb-2 flex-row items-center justify-between`}>
        {/* Location Delivery Selector */}
        <TouchableOpacity
          style={tw`px-4 pb-2 flex-row items-center gap-2`}
          onPress={() => router.push('/(location)/index')}
        >
          <MapPin size={20} color="#0A8A3A" />
          <View style={tw`flex-1`}>
            <Text style={tw`text-[10px] text-gray-500 font-semibold uppercase tracking-wider`}>
              Deliver to
            </Text>
            <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>
                23 Adekunle Street, Yaba, Lagos
              </Text>
              <ChevronDown size={14} color="#171717" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Header Action Icons */}
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity style={tw`w-9 h-9 items-center justify-center`}>
            <Search size={22} color="#171717" />
          </TouchableOpacity>

          <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center`}>
            <Bell size={22} color="#171717" />
            <View style={tw`absolute top-1 right-1 w-2 h-2 bg-market-green rounded-full`} />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`relative w-9 h-9 items-center justify-center`}
            onPress={() => router.push('/cart')}
          >
            <ShoppingBag size={22} color="#171717" />
            <View style={tw`absolute -top-1 -right-1 w-4.5 h-4.5 bg-market-green rounded-full items-center justify-center border-2 border-white`}>
              <Text style={tw`text-white text-[9px] font-bold`}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Search Bar Input */}
        <View style={tw`px-4 my-2`}>
          <View style={tw`flex-row items-center border border-gray-200 rounded-2xl px-4 h-13 bg-white shadow-xs`}>
            <Search size={18} color="#9CA3AF" style={tw`mr-3`} />
            <TextInput
              style={tw`flex-1 text-sm text-gray-900 h-full font-medium`}
              placeholder="Search for products, stores and more..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Scan size={18} color="#9CA3AF" />
          </View>
        </View>

        {/* Hero Promotion Banner */}
        <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-3xl p-5 relative overflow-hidden flex-row items-center justify-between border border-market-green/10`}>
          <View style={tw`w-3/5 z-10 pr-2`}>
            <Text style={tw`text-2xl font-extrabold text-gray-900 leading-7`}>
              Fresh groceries{'\n'}
              <Text style={tw`text-market-green`}>delivered fast</Text>
            </Text>
            <Text style={tw`text-xs text-gray-500 font-medium mt-2 leading-4`}>
              Get everything you need at your doorstep.
            </Text>

            <TouchableOpacity
              style={tw`bg-market-green px-4 py-2.5 rounded-xl flex-row items-center gap-1.5 self-start mt-4 shadow-sm`}
              onPress={() => router.push('/(tabs)/categories')}
            >
              <Text style={tw`text-white text-xs font-bold`}>Shop Now</Text>
              <ArrowRight size={14} color="white" />
            </TouchableOpacity>
          </View>

          <View style={tw`w-2/5 items-center justify-center relative`}>
            <Image
              source={require('@/assets/images/grocery-bag-hero.png')}
              style={tw`w-32 h-32`}
              resizeMode="contain"
            />
            <View style={tw`absolute -bottom-1 -right-1 bg-[#FACC15] w-14 h-14 rounded-full items-center justify-center border-2 border-white shadow-md`}>
              <Text style={tw`text-[8px] font-bold text-gray-900 text-center uppercase`}>Up to</Text>
              <Text style={tw`text-xs font-extrabold text-gray-950`}>30%</Text>
              <Text style={tw`text-[8px] font-bold text-gray-900 uppercase`}>OFF</Text>
            </View>
          </View>
        </View>

        {/* Carousel Pagination Dots */}
        <View style={tw`flex-row justify-center gap-1.5 my-2`}>
          <View style={tw`w-6 h-1 bg-market-green rounded-full`} />
          <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
          <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
          <View style={tw`w-2 h-1 bg-gray-200 rounded-full`} />
        </View>

        {/* Category Selector Grid */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 my-3`}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={tw`items-center gap-1.5 w-18`}
              onPress={() => router.push('/(tabs)/categories')}
            >
              <View style={tw`w-16 h-16 rounded-2xl ${cat.bg} items-center justify-center border border-emerald-100/50 shadow-xs`}>
                <Text style={tw`text-2xl`}>{cat.icon}</Text>
              </View>
              <Text style={tw`text-[11px] font-semibold text-gray-800 text-center leading-3.5`}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Best Deals Section */}
        <View style={tw`flex-row justify-between items-center px-4 mt-4 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Best deals for you</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/categories')}>
            <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-2`}>
          {bestDeals.map((item) => {
            const isLiked = wishlist.includes(item.id);

            return (
              <View key={item.id} style={tw`w-40 bg-white rounded-2xl border border-gray-100 p-3 shadow-xs relative`}>
                <View style={tw`absolute top-3 left-3 bg-emerald-100 px-2 py-0.5 rounded-md z-10`}>
                  <Text style={tw`text-[10px] font-bold text-market-green`}>{item.discount}</Text>
                </View>

                <TouchableOpacity
                  style={tw`absolute top-3 right-3 z-10`}
                  onPress={() => toggleWishlist(item.id)}
                >
                  <Heart
                    size={18}
                    color={isLiked ? '#EF4444' : '#9CA3AF'}
                    fill={isLiked ? '#EF4444' : 'transparent'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`items-center justify-center my-2 h-28 bg-gray-50/50 rounded-xl p-2`}
                  onPress={() => router.push(`/product/${item.id}`)}
                >
                  <Image source={item.image} style={tw`w-20 h-20`} resizeMode="contain" />
                </TouchableOpacity>

                <Text style={tw`text-xs font-bold text-gray-900 leading-4 mt-1`} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{item.unit}</Text>

                <View style={tw`flex-row items-end justify-between mt-2`}>
                  <View>
                    <Text style={tw`text-sm font-extrabold text-gray-900`}>{item.price}</Text>
                    <Text style={tw`text-[10px] text-gray-400 line-through`}>{item.oldPrice}</Text>
                  </View>
                  <TouchableOpacity style={tw`w-8 h-8 rounded-xl bg-market-green items-center justify-center shadow-xs`}>
                    <ShoppingCart size={14} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}