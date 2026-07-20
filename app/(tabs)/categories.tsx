import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const sidebarCategories = [
  { name: 'All', icon: '🛒', active: false },
  { name: 'Market', icon: '🥬', active: false },
  { name: 'Supermarket', icon: '🛒', active: false },
  { name: 'Food', icon: '🍔', active: false },
  { name: 'Pharmacy', icon: '💊', active: true },
  { name: 'Meat & Fish', icon: '🥩', active: false },
  { name: 'Beverages', icon: '🥤', active: false },
  { name: 'Frozen', icon: '❄️', active: false },
  { name: 'Beauty', icon: '💄', active: false },
  { name: 'Baby Care', icon: '👶', active: false },
  { name: 'Electronics', icon: '💻', active: false },
  { name: 'Home & Kitchen', icon: '🍳', active: false },
  { name: 'Pet Care', icon: '🐾', active: false },
  { name: 'Office Supplies', icon: '✏️', active: false },
  { name: 'Flowers & Gifts', icon: '💐', active: false },
];

const topCategories = [
  { name: 'Fruits & Vegetables', items: '2,350+ items', icon: '🥬' },
  { name: 'Staples & Grains', items: '1,850+ items', icon: '🌾' },
  { name: 'Dairy & Eggs', items: '1,250+ items', icon: '🥛' },
  { name: 'Snacks & Chocolates', items: '2,100+ items', icon: '🍫' },
  { name: 'Beverages', items: '1,500+ items', icon: '🥤' },
  { name: 'Meat & Fish', items: '850+ items', icon: '🥩' },
  { name: 'Frozen Foods', items: '750+ items', icon: '❄️' },
  { name: 'Bread & Bakery', items: '950+ items', icon: '🍞' },
  { name: 'Personal Care', items: '1,200+ items', icon: '🧴' },
  { name: 'Baby Care', items: '850+ items', icon: '👶' },
  { name: 'Home & Kitchen', items: '1,100+ items', icon: '🍳' },
  { name: 'Cleaning Essentials', items: '900+ items', icon: '🧹' },
];

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 pt-2 pb-3`}>
        <View style={tw`flex-row items-center gap-1`}>
          <Text style={tw`text-lg text-market-green`}>📍</Text>
          <View>
            <Text style={tw`text-xs text-gray-500`}>Deliver to</Text>
            <Text style={tw`text-sm font-semibold text-gray-900`}>23 Greenway Street, Lekki Phase 1, Lagos</Text>
          </View>
          <Text style={tw`text-xs text-gray-400`}>▼</Text>
        </View>
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity>
            <Text style={tw`text-2xl`}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-2xl`}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={tw`mx-4 mb-3 flex-row items-center border border-gray-200 rounded-xl px-4 h-12`}>
        <Text style={tw`text-lg text-market-green mr-3`}>🔍</Text>
        <TextInput 
          style={tw`flex-1 text-base text-gray-900`}
          placeholder="Search for products, stores and categories"
          placeholderTextColor="#999"
        />
        <Text style={tw`text-lg text-market-green mr-2`}>📷</Text>
        <Text style={tw`text-lg text-market-green`}>🎤</Text>
      </View>

      <View style={tw`flex-1 flex-row`}>
        {/* Sidebar */}
        <ScrollView style={tw`w-28 bg-gray-50`} showsVerticalScrollIndicator={false}>
          {sidebarCategories.map((cat) => (
            <TouchableOpacity 
              key={cat.name} 
              style={tw`items-center py-4 px-2 ${cat.active ? 'bg-white border-l-4 border-market-green' : ''}`}
            >
              <Text style={tw`text-2xl mb-1`}>{cat.icon}</Text>
              <Text style={tw`text-xs text-center ${cat.active ? 'text-market-green font-semibold' : 'text-gray-600'}`}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Main Content */}
        <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
          {/* Hero Banner */}
          <View style={tw`mx-3 mt-3 bg-market-green rounded-2xl p-4 relative overflow-hidden`}>
            <Text style={tw`text-xl font-bold text-white`}>Groceries{'\n'}delivered in</Text>
            <Text style={tw`text-2xl font-bold text-yellow-300`}>30 minutes</Text>
            <Text style={tw`text-sm text-white/80 mt-2`}>Fresh food, everyday{'\n'}essentials to your doorstep.</Text>
            <TouchableOpacity style={tw`bg-white px-4 py-2 rounded-xl mt-3 self-start flex-row items-center gap-1`}>
              <Text style={tw`text-sm font-semibold text-market-green`}>Shop Now</Text>
              <Text style={tw`text-market-green`}>→</Text>
            </TouchableOpacity>
            <Image 
              source={require('@/assets/images/grocery-bag-hero.png')} 
              style={tw`w-28 h-28 absolute right-0 bottom-0`} 
              resizeMode="contain"
            />
          </View>

          {/* Pagination */}
          <View style={tw`flex-row justify-center gap-1.5 mt-2`}>
            <View style={tw`w-6 h-1.5 rounded-full bg-market-green`} />
            <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
            <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
            <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          </View>

          {/* Top Categories */}
          <Text style={tw`text-lg font-bold text-gray-900 px-3 mt-4 mb-3`}>Shop by Top Categories</Text>

          <View style={tw`px-3 gap-3`}>
            {topCategories.map((cat, i) => (
              <TouchableOpacity 
                key={cat.name} 
                style={tw`flex-row items-center bg-white border border-gray-100 rounded-xl p-3 ${i % 2 === 0 ? '' : ''}`}
                onPress={() => router.push('/(tabs)/category/fruits')}
              >
                <View style={tw`w-14 h-14 rounded-full bg-gray-100 items-center justify-center mr-3`}>
                  <Text style={tw`text-2xl`}>{cat.icon}</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-sm font-semibold text-gray-900`}>{cat.name}</Text>
                  <Text style={tw`text-xs text-gray-500 mt-0.5`}>{cat.items}</Text>
                </View>
                <Text style={tw`text-market-green text-lg`}>→</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Promo Banners */}
          <View style={tw`px-3 mt-4 gap-3`}>
            <View style={tw`bg-gray-100 rounded-xl p-4 flex-row items-center`}>
              <View>
                <Text style={tw`text-sm font-semibold text-gray-900`}>Free delivery</Text>
                <Text style={tw`text-xs text-gray-500`}>on orders over</Text>
                <Text style={tw`text-lg font-bold text-market-green`}>₦15,000</Text>
              </View>
              <Text style={tw`text-3xl ml-auto`}>🛵</Text>
            </View>
            
            <View style={tw`bg-yellow-50 rounded-xl p-4 flex-row items-center`}>
              <View style={tw`w-10 h-10 rounded-full bg-yellow-400 items-center justify-center mr-3`}>
                <Text style={tw`text-xl`}>%</Text>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-sm font-semibold text-gray-900`}>Save more with</Text>
                <Text style={tw`text-base font-bold text-market-green`}>Best Deals</Text>
                <Text style={tw`text-xs text-gray-500`}>Check out our offers & discounts</Text>
              </View>
              <TouchableOpacity style={tw`bg-yellow-400 px-4 py-2 rounded-lg flex-row items-center gap-1`}>
                <Text style={tw`text-sm font-semibold text-gray-900`}>View Deals</Text>
                <Text>→</Text>
              </TouchableOpacity>
              <Text style={tw`text-3xl ml-2`}>🎁</Text>
            </View>
          </View>

          {/* Trust Badges */}
          <View style={tw`flex-row justify-around bg-gray-50 rounded-xl p-4 mx-3 mt-4 mb-4`}>
            <View style={tw`items-center gap-1`}>
              <Text style={tw`text-xl`}>🛵</Text>
              <Text style={tw`text-xs font-semibold text-gray-900`}>Fast Delivery</Text>
              <Text style={tw`text-[10px] text-gray-500 text-center`}>Get your order{'\n'}in no time</Text>
            </View>
            <View style={tw`items-center gap-1`}>
              <Text style={tw`text-xl`}>💰</Text>
              <Text style={tw`text-xs font-semibold text-gray-900`}>Best Prices</Text>
              <Text style={tw`text-[10px] text-gray-500 text-center`}>Enjoy amazing{'\n'}deals daily</Text>
            </View>
            <View style={tw`items-center gap-1`}>
              <Text style={tw`text-xl`}>🔒</Text>
              <Text style={tw`text-xs font-semibold text-gray-900`}>Secure Payment</Text>
              <Text style={tw`text-[10px] text-gray-500 text-center`}>100% secure{'\n'}transactions</Text>
            </View>
            <View style={tw`items-center gap-1`}>
              <Text style={tw`text-xl`}>🎧</Text>
              <Text style={tw`text-xs font-semibold text-gray-900`}>Live Support</Text>
              <Text style={tw`text-[10px] text-gray-500 text-center`}>We're here to{'\n'}help you</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}