import tw from '@/lib/tw';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  Filter,
  Heart,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Comprehensive category dataset for food categories
const categoryDataMap: { [key: string]: any } = {
  'rice-grains': {
    title: 'Rice & Grains',
    icon: '🍚',
    subtext: 'Fresh, Quality and Affordable',
    chips: ['All', 'Rice', 'Flour', 'Cereals', 'Semolina', 'Oats', 'Pasta', 'Garri'],
    products: [
      { id: 1, name: 'Stallion Premium Parboiled Rice', unit: '50kg', price: '₦68,500', oldPrice: '₦78,000', discount: '-12%', image: require('@/assets/images/prod-rice.png') },
      { id: 2, name: "Mama's Pride Parboiled Rice", unit: '10kg', price: '₦17,800', oldPrice: '₦19,400', discount: '-8%', image: require('@/assets/images/prod-rice.png') },
      { id: 3, name: 'Golden Penny Parboiled Rice', unit: '50kg', price: '₦65,000', oldPrice: '₦72,500', discount: '-10%', image: require('@/assets/images/prod-rice.png') },
      { id: 4, name: 'Royal Umbrella Classic Rice', unit: '5kg', price: '₦9,200', oldPrice: '₦9,700', discount: '-5%', image: require('@/assets/images/prod-rice.png') },
      { id: 5, name: 'Honeywell Semolina', unit: '2kg', price: '₦2,350', oldPrice: null, discount: null, image: require('@/assets/images/prod-rice.png') },
      { id: 6, name: 'Golden Morn Maize Meal', unit: '2kg', price: '₦1,950', oldPrice: '₦2,100', discount: '-7%', image: require('@/assets/images/prod-cornflakes.png') },
      { id: 7, name: 'AYOOLA Garri Ijebu (White)', unit: '5kg', price: '₦4,100', oldPrice: null, discount: null, image: require('@/assets/images/prod-rice.png') },
      { id: 8, name: 'Beans (Brown) Oloyin', unit: '1kg', price: '₦1,300', oldPrice: null, discount: null, image: require('@/assets/images/prod-tomatoes.png') },
    ]
  },
  'beans-pulses': {
    title: 'Beans & Pulses',
    icon: '🫘',
    subtext: 'High protein grains & pulses',
    chips: ['All', 'Brown Beans', 'White Beans', 'Soybeans', 'Lentils'],
    products: [
      { id: 101, name: 'Golden Penny Beans (Brown)', unit: '1kg', price: '₦2,300', oldPrice: '₦2,700', discount: '-15%', image: require('@/assets/images/prod-tomatoes.png') },
      { id: 102, name: 'Oloyin Honey Beans', unit: '5kg', price: '₦11,500', oldPrice: '₦13,000', discount: '-10%', image: require('@/assets/images/prod-tomatoes.png') },
    ]
  },
  'cooking-oil': {
    title: 'Cooking Oil & Fats',
    icon: '🍾',
    subtext: 'Healthy oils for delicious cooking',
    chips: ['All', 'Vegetable Oil', 'Palm Oil', 'Olive Oil', 'Sunflower Oil'],
    products: [
      { id: 201, name: 'Golden Penny Cooking Oil', unit: '5L', price: '₦12,400', oldPrice: '₦13,500', discount: '-8%', image: require('@/assets/images/prod-oil.png') },
      { id: 202, name: 'Power Oil', unit: '1L', price: '₦1,800', oldPrice: '₦2,000', discount: '-10%', image: require('@/assets/images/prod-oil.png') },
    ]
  },
  'fruits-vegetables': {
    title: 'Fruits & Vegetables',
    icon: '🥗',
    subtext: 'Farm fresh fruits and greens',
    chips: ['All', 'Fruits', 'Leafy Greens', 'Vegetables', 'Herbs', 'Exotic'],
    products: [
      { id: 301, name: 'Fresh Red Apples', unit: '1kg', price: '₦1,200', oldPrice: '₦1,500', discount: '-20%', image: require('@/assets/images/prod-apple.png') },
      { id: 302, name: 'Cavendish Bananas', unit: '1 bunch', price: '₦650', oldPrice: '₦800', discount: '-15%', image: require('@/assets/images/prod-banana.png') },
    ]
  }
};

const defaultCategory = categoryDataMap['rice-grains'];

export default function FoodCategoryProductsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Fetch current category based on route parameter
  const currentCategory = categoryDataMap[id as string] || defaultCategory;

  const [activeChip, setActiveChip] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartQuantities, setCartQuantities] = useState<{ [key: number]: number }>({ 1: 1 });
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(item => item !== productId) : [...prev, productId]
    );
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCartQuantities(prev => {
      const current = prev[productId] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [productId]: updated };
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header Navigation */}
      <View style={tw`px-4 pt-2 pb-1 flex-row items-center justify-between`}>
        <Text style={tw`text-2xl font-bold text-black`}>
          <Text style={tw`text-market-green`}>use</Text>Market
        </Text>

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
              <Text style={tw`text-white text-[9px] font-bold`}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delivery Location Sub-Header */}
      <TouchableOpacity
        style={tw`px-4 pb-2 flex-row items-center gap-1.5`}
        onPress={() => router.push('/(location)/index')}
      >
        <MapPin size={18} color="#0A8A3A" />
        <Text style={tw`text-[11px] text-gray-500 font-medium`}>Deliver to</Text>
        <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>
          23 Adekunle Street, Yaba, Lagos
        </Text>
        <ChevronDown size={14} color="#171717" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
        {/* Back Button, Search Input & Filter Button */}
        <View style={tw`px-4 my-2 flex-row items-center gap-2`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`w-11 h-11 border border-gray-200 rounded-2xl items-center justify-center bg-white`}
          >
            <ChevronLeft size={22} color="#171717" />
          </TouchableOpacity>

          <View style={tw`flex-1 flex-row items-center border border-gray-200 rounded-2xl px-3.5 h-11 bg-white shadow-xs`}>
            <TextInput
              style={tw`flex-1 text-xs text-gray-900 h-full font-medium`}
              placeholder={`Search in ${currentCategory.title}...`}
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity style={tw`flex-row items-center gap-1.5 border border-gray-200 rounded-2xl px-3 h-11 bg-white shadow-xs`}>
            <Filter size={16} color="#171717" />
            <Text style={tw`text-xs font-bold text-gray-900`}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Category Header & Sort Selector */}
        <View style={tw`px-4 my-3 flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-3`}>
            <View style={tw`w-12 h-12 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100`}>
              <Text style={tw`text-2xl`}>{currentCategory.icon}</Text>
            </View>
            <View>
              <Text style={tw`text-xl font-extrabold text-gray-950`}>{currentCategory.title}</Text>
              <Text style={tw`text-xs text-gray-500 font-medium mt-0.5`}>{currentCategory.subtext}</Text>
            </View>
          </View>

          {/* Sort Dropdown */}
          <TouchableOpacity style={tw`flex-row items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl`}>
            <Text style={tw`text-[11px] font-semibold text-gray-500`}>Sort by</Text>
            <Text style={tw`text-xs font-bold text-gray-900`}>Popular</Text>
            <ChevronDown size={14} color="#171717" />
          </TouchableOpacity>
        </View>

        {/* Filter Chips Horizontal Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 my-2`}>
          {currentCategory.chips.map((chip: string) => {
            const isSelected = chip === activeChip;
            return (
              <TouchableOpacity
                key={chip}
                onPress={() => setActiveChip(chip)}
                style={tw`px-4 py-2 rounded-xl border ${isSelected
                    ? 'bg-market-green border-market-green'
                    : 'bg-white border-gray-200'
                  }`}
              >
                <Text style={tw`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {chip}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Promo Banner */}
        <View style={tw`mx-4 my-3 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
          <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
            <View style={tw`w-10 h-10 rounded-full bg-market-green items-center justify-center`}>
              <Text style={tw`text-xl`}>🏷️</Text>
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm font-bold text-gray-950`}>Enjoy the best prices</Text>
              <Text style={tw`text-[11px] text-gray-500 font-medium mt-0.5`}>
                Quality products at unbeatable prices
              </Text>
            </View>
          </View>

          <TouchableOpacity style={tw`bg-market-green px-3.5 py-2 rounded-xl flex-row items-center gap-1 shadow-xs`}>
            <Text style={tw`text-white text-xs font-bold`}>Shop Deals</Text>
            <ArrowRight size={12} color="white" />
          </TouchableOpacity>
        </View>

        {/* Product 2-Column Grid */}
        <View style={tw`px-4 flex-row flex-wrap justify-between gap-y-3.5 my-2`}>
          {currentCategory.products.map((item: any) => {
            const isLiked = wishlist.includes(item.id);
            const quantity = cartQuantities[item.id] || 0;

            return (
              <View key={item.id} style={tw`w-[48.5%] bg-white rounded-2xl border border-gray-100 p-3 shadow-xs relative`}>
                {item.discount && (
                  <View style={tw`absolute top-3 left-3 bg-red-100 px-2 py-0.5 rounded-md z-10`}>
                    <Text style={tw`text-[10px] font-bold text-red-600`}>{item.discount}</Text>
                  </View>
                )}

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
                  style={tw`items-center justify-center my-2 h-32 bg-gray-50/50 rounded-xl p-2`}
                  onPress={() => router.push(`/product/${item.id}`)}
                >
                  <Image source={item.image} style={tw`w-24 h-24`} resizeMode="contain" />
                </TouchableOpacity>

                <Text style={tw`text-xs font-bold text-gray-900 leading-4 mt-1`} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{item.unit}</Text>

                <View style={tw`mt-2 mb-3`}>
                  <Text style={tw`text-sm font-extrabold text-gray-950`}>{item.price}</Text>
                  {item.oldPrice && (
                    <Text style={tw`text-[10px] text-gray-400 line-through mt-0.5`}>{item.oldPrice}</Text>
                  )}
                </View>

                {quantity > 0 ? (
                  <View style={tw`flex-row items-center justify-between border border-market-green rounded-xl p-1 bg-emerald-50/30`}>
                    <TouchableOpacity
                      style={tw`w-7 h-7 rounded-lg bg-white items-center justify-center border border-gray-200`}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Minus size={14} color="#171717" />
                    </TouchableOpacity>

                    <Text style={tw`text-xs font-bold text-gray-900`}>{quantity}</Text>

                    <TouchableOpacity
                      style={tw`w-7 h-7 rounded-lg bg-market-green items-center justify-center`}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={14} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={tw`w-full border border-gray-200 py-2 rounded-xl flex-row items-center justify-center gap-1.5 bg-white`}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Text style={tw`text-xs font-bold text-market-green`}>Add</Text>
                    <ShoppingCart size={14} color="#0A8A3A" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Trust Guarantees Bar */}
        <View style={tw`mx-4 my-4 bg-[#F8FAFC] rounded-2xl py-3 px-3 border border-gray-100 flex-row items-center justify-around shadow-xs`}>
          <View style={tw`flex-row items-center gap-1.5`}>
            <ShieldCheck size={16} color="#0A8A3A" />
            <View>
              <Text style={tw`text-[10px] font-bold text-gray-900`}>100% Quality</Text>
              <Text style={tw`text-[8px] text-gray-400`}>Quality you trust</Text>
            </View>
          </View>

          <View style={tw`w-px h-5 bg-gray-200`} />

          <View style={tw`flex-row items-center gap-1.5`}>
            <Truck size={16} color="#0A8A3A" />
            <View>
              <Text style={tw`text-[10px] font-bold text-gray-900`}>Fast Delivery</Text>
              <Text style={tw`text-[8px] text-gray-400`}>Delivered fast</Text>
            </View>
          </View>

          <View style={tw`w-px h-5 bg-gray-200`} />

          <View style={tw`flex-row items-center gap-1.5`}>
            <RotateCcw size={16} color="#0A8A3A" />
            <View>
              <Text style={tw`text-[10px] font-bold text-gray-900`}>Easy Returns</Text>
              <Text style={tw`text-[8px] text-gray-400`}>Within 7 days</Text>
            </View>
          </View>

          <View style={tw`w-px h-5 bg-gray-200`} />

          <View style={tw`flex-row items-center gap-1.5`}>
            <CreditCard size={16} color="#0A8A3A" />
            <View>
              <Text style={tw`text-[10px] font-bold text-gray-900`}>Secure Payment</Text>
              <Text style={tw`text-[8px] text-gray-400`}>100% safe</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}