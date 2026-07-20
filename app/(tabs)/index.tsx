import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';

const categories = [
  { name: 'Fruits & Vegetables', image: '🥬' },
  { name: 'Dairy, Eggs & Cheese', image: '🥛' },
  { name: 'Beverages', image: '🥤' },
  { name: 'Snacks & Munchies', image: '🍿' },
  { name: 'Home & Kitchen', image: '🏠' },
  { name: 'Personal Care', image: '🧴' },
];

const offers = [
  { id: 1, discount: '20% OFF', title: 'Fresh Fruits Weekend', subtitle: 'All fresh fruits', color: 'bg-green-100' },
  { id: 2, discount: '15% OFF', title: 'Dairy Delights', subtitle: 'On all dairy products', color: 'bg-yellow-100' },
  { id: 3, discount: '10% OFF', title: 'Snack Time', subtitle: 'On selected snacks', color: 'bg-red-100' },
];

const popularProducts = [
  { id: 1, name: 'Cavendish Banana', weight: '1 bunch', price: '₦650', image: '🍌' },
  { id: 2, name: 'Dano Full Cream Milk', weight: '1L', price: '₦1,250', image: '🥛' },
  { id: 3, name: 'Royal Stallion Parboiled Rice', weight: '5kg', price: '₦6,200', image: '🍚' },
  { id: 4, name: 'Power Oil', weight: '1L', price: '₦1,600', image: '🛢️' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between px-4 pt-2`}>
          <TouchableOpacity 
            style={tw`flex-row items-center gap-1`}
            onPress={() => router.push('/(location)')}
          >
            <Text style={tw`text-lg text-market-green`}>📍</Text>
            <View>
              <Text style={tw`text-xs text-gray-500`}>Delivering to</Text>
              <Text style={tw`text-sm font-semibold text-gray-900`}>23 Greenway Street, Lekki Phase 1</Text>
            </View>
            <Text style={tw`text-xs text-gray-400`}>▼</Text>
          </TouchableOpacity>
          <View style={tw`flex-row gap-3`}>
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

        {/* Search */}
        <View style={tw`mx-4 mt-3 flex-row items-center border border-gray-200 rounded-xl px-4 h-12 bg-white`}>
          <Text style={tw`text-lg text-market-green mr-3`}>🔍</Text>
          <TextInput 
            style={tw`flex-1 text-base text-gray-900`}
            placeholder="Search for products, categories or stores"
            placeholderTextColor="#999"
          />
          <Text style={tw`text-lg text-market-green`}>📷</Text>
        </View>

        {/* Hero Banner */}
        <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-5 flex-row items-center`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-xl font-bold text-market-green`}>Fresh groceries,{'\n'}delivered fast</Text>
            <Text style={tw`text-sm text-gray-600 mt-2`}>Get everything you need,{'\n'}delivered to your doorstep.</Text>
            <TouchableOpacity style={tw`bg-market-green px-5 py-2.5 rounded-xl mt-3 self-start`}>
              <Text style={tw`text-white font-semibold text-sm`}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={require('@/assets/images/grocery-hero.png')} 
            style={tw`w-32 h-32`} 
            resizeMode="contain"
          />
        </View>

        {/* Pagination Dots */}
        <View style={tw`flex-row justify-center gap-1.5 mt-3`}>
          <View style={tw`w-6 h-1.5 rounded-full bg-market-green`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
        </View>

        {/* Categories */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Shop by Category</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-4`}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.name} style={tw`items-center gap-2`}>
              <View style={tw`w-16 h-16 rounded-full bg-gray-100 items-center justify-center`}>
                <Text style={tw`text-3xl`}>{cat.image}</Text>
              </View>
              <Text style={tw`text-xs text-gray-900 text-center w-16`}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exclusive Offers */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Exclusive Offers</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
          {offers.map((offer) => (
            <TouchableOpacity key={offer.id} style={tw`w-48 ${offer.color} rounded-2xl p-4`}>
              <View style={tw`bg-market-green px-2 py-1 rounded-md self-start mb-2`}>
                <Text style={tw`text-white text-xs font-bold`}>{offer.discount}</Text>
              </View>
              <Text style={tw`text-base font-bold text-gray-900`}>{offer.title}</Text>
              <Text style={tw`text-sm text-gray-500 mt-1`}>{offer.subtitle}</Text>
              <View style={tw`flex-row items-center mt-3`}>
                <Text style={tw`text-sm text-market-green font-semibold`}>Shop Now</Text>
                <Text style={tw`text-market-green ml-1`}>→</Text>
              </View>
              <Image 
                source={require('@/assets/images/offer-fruits.png')} 
                style={tw`w-20 h-20 absolute right-2 bottom-2`} 
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Products */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Popular Products</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3`}>
          {popularProducts.map((product) => (
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

        {/* Trust Badges */}
        <View style={tw`mx-4 mt-6 flex-row justify-around bg-gray-50 rounded-xl p-4`}>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-xl`}>🛵</Text>
            <Text style={tw`text-xs font-semibold text-gray-900`}>Fast Delivery</Text>
            <Text style={tw`text-[10px] text-gray-500`}>Get your order{'\n'}in no time</Text>
          </View>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-xl`}>💰</Text>
            <Text style={tw`text-xs font-semibold text-gray-900`}>Best Prices</Text>
            <Text style={tw`text-[10px] text-gray-500`}>Enjoy amazing{'\n'}deals daily</Text>
          </View>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-xl`}>🔒</Text>
            <Text style={tw`text-xs font-semibold text-gray-900`}>Secure Payment</Text>
            <Text style={tw`text-[10px] text-gray-500`}>100% secure{'\n'}transactions</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}