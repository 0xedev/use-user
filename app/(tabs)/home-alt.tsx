import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tw from '@/lib/tw';

const categories = [
  { id: 1, name: 'Market', icon: '🧺' },
  { id: 2, name: 'Food', icon: '🍔' },
  { id: 3, name: 'Pharmacy', icon: '💊' },
  { id: 4, name: 'Meat & Fish', icon: '🥩' },
  { id: 5, name: 'Beverages', icon: '🥤' },
  { id: 6, name: 'Frozen', icon: '❄️' },
  { id: 7, name: 'Beauty', icon: '💄' },
  { id: 8, name: 'Electronics', icon: '📱' },
];

const stores = [
  { id: 1, name: 'Shoprite', rating: '4.8', reviews: '12k+', time: '20-30 min', min: '₦1,000', delivery: 'Free delivery', logo: require('@/assets/images/store-shoprite.png'), verified: true },
  { id: 2, name: 'FreshMart', rating: '4.7', reviews: '8k+', time: '15-25 min', min: '₦800', delivery: 'Free delivery', logo: require('@/assets/images/store-freshmart.png'), verified: true },
  { id: 3, name: 'MedPlus', rating: '4.9', reviews: '6k+', time: '25-35 min', min: '₦1,000', delivery: '₦200 delivery', logo: require('@/assets/images/store-medplus.png'), verified: true },
  { id: 4, name: 'Justrite', rating: '4.6', reviews: '5k+', time: '30-40 min', min: '₦1,000', delivery: 'Free delivery', logo: require('@/assets/images/store-justrite.png'), verified: true },
];

const topPicks = [
  { id: 1, name: 'Cavendish Banana', qty: '1 bunch', price: '₦650', image: require('@/assets/images/prod-banana.png') },
  { id: 2, name: 'Full Cream Milk', qty: '1L', price: '₦1,250', image: require('@/assets/images/prod-milk.png') },
  { id: 3, name: 'Parboiled Rice', qty: '5kg', price: '₦6,200', image: require('@/assets/images/prod-rice.png') },
  { id: 4, name: 'Power Oil', qty: '1L', price: '₦1,600', image: require('@/assets/images/prod-oil.png') },
  { id: 5, name: 'Indomie Chicken', qty: '70g', price: '₦250', image: require('@/assets/images/prod-indomie.png') },
];

const flashDeals = [
  { id: 1, name: 'Fresh Tomatoes', qty: '1kg', price: '₦800', oldPrice: '₦1,000', discount: '20% OFF', image: require('@/assets/images/prod-tomatoes.png') },
  { id: 2, name: 'Avocado', qty: '1kg', price: '₦2,125', oldPrice: '₦2,500', discount: '15% OFF', image: require('@/assets/images/prod-avocado.png') },
  { id: 3, name: 'Big Eggs', qty: '1 tray', price: '₦1,350', oldPrice: '₦1,500', discount: '10% OFF', image: require('@/assets/images/prod-eggs.png') },
  { id: 4, name: 'Golden Penny Oil', qty: '1L', price: '₦1,650', oldPrice: '₦2,200', discount: '25% OFF', image: require('@/assets/images/prod-oil.png') },
];

const buyAgain = [
  { id: 1, name: 'Cornflakes', qty: '500g', price: '₦2,000', image: require('@/assets/images/prod-cornflakes.png') },
  { id: 2, name: 'Indomie Chicken', qty: '70g', price: '₦250', image: require('@/assets/images/prod-indomie.png') },
  { id: 3, name: 'Peak Milk', qty: '170g', price: '₦450', image: require('@/assets/images/prod-peak.png') },
  { id: 4, name: 'Milo', qty: '400g', price: '₦2,400', image: require('@/assets/images/prod-milo.png') },
  { id: 5, name: 'Water Aquafina', qty: '75cl', price: '₦300', image: require('@/assets/images/prod-water.png') },
];

function CountdownTimer() {
  const [time, setTime] = useState({ h: 2, m: 45, s: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 2; m = 45; s = 30; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <Text style={tw`text-red-500 text-sm font-semibold`}>
      Ends in {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </Text>
  );
}

export default function HomeAltScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={tw`px-4 pt-2 pb-2`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-market-green`}>📍</Text>
              <View>
                <Text style={tw`text-xs text-gray-500`}>Deliver to</Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <Text style={tw`text-sm font-semibold text-gray-900`}>23 Greenway Street, Lekki Phase 1, Lagos</Text>
                  <Text style={tw`text-xs text-gray-400`}>▼</Text>
                </View>
              </View>
            </View>
            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity style={tw`relative`}>
                <Text style={tw`text-xl`}>🔔</Text>
                <View style={tw`absolute -top-1 -right-1 bg-market-green rounded-full w-4 h-4 items-center justify-center`}>
                  <Text style={tw`text-[10px] text-white font-bold`}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={tw`relative`}>
                <Text style={tw`text-xl`}>🛒</Text>
                <View style={tw`absolute -top-1 -right-1 bg-market-green rounded-full w-4 h-4 items-center justify-center`}>
                  <Text style={tw`text-[10px] text-white font-bold`}>4</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search */}
          <View style={tw`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 gap-2`}>
            <Text style={tw`text-gray-400 text-lg`}>🔍</Text>
            <Text style={tw`flex-1 text-gray-400 text-sm`}>Search for products, stores and categories</Text>
            <Text style={tw`text-gray-400 text-lg`}>📷</Text>
            <Text style={tw`text-gray-400 text-lg`}>🎤</Text>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={tw`mx-4 bg-market-green rounded-2xl p-4 mb-4 relative overflow-hidden`}>
          <View style={tw`w-3/5`}>
            <Text style={tw`text-white text-xl font-bold leading-6`}>Groceries delivered{'\n'}in <Text style={tw`text-yellow-300`}>30 minutes</Text></Text>
            <Text style={tw`text-white/80 text-xs mt-1 leading-4`}>Fresh food, everyday essentials{'\n'}delivered to your doorstep.</Text>
            <TouchableOpacity style={tw`bg-white rounded-lg px-4 py-2 mt-3 self-start flex-row items-center gap-1`}>
              <Text style={tw`text-market-green text-sm font-semibold`}>Shop Now</Text>
              <Text style={tw`text-market-green`}>→</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={require('@/assets/images/grocery-bag-hero.png')} 
            style={tw`absolute right-0 bottom-0 w-36 h-32`}
            resizeMode="contain"
          />
        </View>

        {/* Pagination Dots */}
        <View style={tw`flex-row justify-center gap-1 mb-4`}>
          <View style={tw`w-6 h-1.5 rounded-full bg-market-green`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
        </View>

        {/* Categories */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>Shop by Category</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3`}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={tw`items-center gap-1`}>
                <View style={tw`w-16 h-16 bg-gray-50 rounded-full items-center justify-center`}>
                  <Text style={tw`text-2xl`}>{cat.icon}</Text>
                </View>
                <Text style={tw`text-xs text-gray-700 text-center w-16`}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Stores */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>Popular Stores</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3`}>
            {stores.map((store) => (
              <View key={store.id} style={tw`w-48 bg-white rounded-xl border border-gray-100 p-3`}>
                <View style={tw`flex-row items-center gap-2 mb-2`}>
                  <Image source={store.logo} style={tw`w-10 h-10 rounded-lg`} resizeMode="cover" />
                  <View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text style={tw`text-sm font-bold text-gray-900`}>{store.name}</Text>
                      {store.verified && <Text style={tw`text-market-green text-xs`}>✓</Text>}
                    </View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Text style={tw`text-yellow-500 text-xs`}>⭐</Text>
                      <Text style={tw`text-xs text-gray-700 font-medium`}>{store.rating}</Text>
                      <Text style={tw`text-xs text-gray-500`}>({store.reviews})</Text>
                    </View>
                  </View>
                </View>
                <Text style={tw`text-xs text-gray-500`}>{store.time}</Text>
                <View style={tw`flex-row items-center gap-1 mt-1`}>
                  <Text style={tw`text-xs text-gray-700`}>{store.min} min</Text>
                  <Text style={tw`text-gray-300`}>•</Text>
                  <Text style={tw`text-xs text-market-green font-medium`}>{store.delivery}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Top Picks */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>Top Picks For You</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3`}>
            {topPicks.map((item) => (
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

        {/* Flash Deals */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`text-lg font-bold text-gray-900`}>Flash Deals</Text>
              <CountdownTimer />
            </View>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3`}>
            {flashDeals.map((deal) => (
              <View key={deal.id} style={tw`w-36 bg-white rounded-xl border border-gray-100 p-2 relative`}>
                <View style={tw`absolute top-2 left-2 z-10 bg-red-500 px-2 py-0.5 rounded`}>
                  <Text style={tw`text-white text-[10px] font-bold`}>{deal.discount}</Text>
                </View>
                <Image source={deal.image} style={tw`w-full h-28 rounded-lg`} resizeMode="cover" />
                <Text style={tw`text-sm font-semibold text-gray-900 mt-2 leading-4`}>{deal.name}</Text>
                <Text style={tw`text-xs text-gray-500 mt-0.5`}>{deal.qty}</Text>
                <View style={tw`flex-row items-center gap-2 mt-1`}>
                  <Text style={tw`text-sm font-bold text-gray-900`}>{deal.price}</Text>
                  <Text style={tw`text-xs text-gray-400 line-through`}>{deal.oldPrice}</Text>
                </View>
                <TouchableOpacity style={tw`bg-market-green w-7 h-7 rounded-full items-center justify-center absolute bottom-2 right-2`}>
                  <Text style={tw`text-white text-lg leading-5`}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Buy Again */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>Buy Again</Text>
            <TouchableOpacity>
              <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-3`}>
            {buyAgain.map((item) => (
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

        {/* Trust Badges */}
        <View style={tw`mx-4 flex-row justify-between bg-gray-50 rounded-xl p-3 mb-4`}>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-xl`}>🛵</Text>
            <Text style={tw`text-[10px] font-semibold text-gray-900`}>Fast Delivery</Text>
            <Text style={tw`text-[9px] text-gray-500 text-center`}>Get your order{'\n'}in no time</Text>
          </View>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-xl`}>🏷️</Text>
            <Text style={tw`text-[10px] font-semibold text-gray-900`}>Best Prices</Text>
            <Text style={tw`text-[9px] text-gray-500 text-center`}>Enjoy amazing{'\n'}deals daily</Text>
          </View>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-xl`}>🔒</Text>
            <Text style={tw`text-[10px] font-semibold text-gray-900`}>Secure Payment</Text>
            <Text style={tw`text-[9px] text-gray-500 text-center`}>100% secure{'\n'}transactions</Text>
          </View>
          <View style={tw`items-center gap-1`}>
            <Text style={tw`text-xl`}>🎧</Text>
            <Text style={tw`text-[10px] font-semibold text-gray-900`}>Live Support</Text>
            <Text style={tw`text-[9px] text-gray-500 text-center`}>We're here to{'\n'}help you</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}