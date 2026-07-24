import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
  Bell,
  ChevronDown,
  Heart,
  MapPin,
  Mic,
  Plus,
  Scan,
  Search,
  ShoppingBag
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: 1, name: 'Market', image: require('@/assets/images/prod-apple.png'), bgColor: 'bg-green-50' },
  { id: 2, name: 'Food', image: require('@/assets/images/prod-banana.png'), bgColor: 'bg-yellow-50' },
  { id: 3, name: 'Pharmacy', image: require('@/assets/images/store-medplus.png'), bgColor: 'bg-blue-50' },
  { id: 4, name: 'Meat & Fish', image: require('@/assets/images/prod-rice.png'), bgColor: 'bg-red-50' },
  { id: 5, name: 'Beverages', image: require('@/assets/images/prod-orange.png'), bgColor: 'bg-indigo-50' },
  { id: 6, name: 'Frozen', image: require('@/assets/images/prod-grapes.png'), bgColor: 'bg-cyan-50' },
  { id: 7, name: 'Beauty', image: require('@/assets/images/grocery-bag-small.png'), bgColor: 'bg-pink-50' },
];

const stores = [
  { id: 1, name: 'Shoprite', rating: '4.8', reviews: '12k+', time: '20-30 min', min: '₦1,000 min', delivery: '• Free delivery', logo: require('@/assets/images/store-shoprite.png'), verified: true },
  { id: 2, name: 'FreshMart', rating: '4.7', reviews: '8k+', time: '15-25 min', min: '₦800 min', delivery: '• Free delivery', logo: require('@/assets/images/store-freshmart.png'), verified: true },
  { id: 3, name: 'MedPlus', rating: '4.9', reviews: '6k+', time: '25-35 min', min: '₦1,000 min', delivery: '• ₦200 delivery', logo: require('@/assets/images/store-medplus.png'), verified: true },
  { id: 4, name: 'Justrite', rating: '4.6', reviews: '5k+', time: '30-40 min', min: '₦1,000 min', delivery: '• Free delivery', logo: require('@/assets/images/store-justrite.png'), verified: true },
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
    <Text style={tw`text-red-500 text-xs font-semibold ml-2`}>
      Ends in {pad(time.h)} : {pad(time.m)} : {pad(time.s)}
    </Text>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header Block */}
        <View style={tw`px-4 pt-2 pb-2`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            {/* 1. Wrap the left side in flex-1 to allow icons to stay on the right */}
            <TouchableOpacity style={tw`flex-row items-start gap-1.5 flex-1`}>
              {/* Changed items-center to items-start to align the pin with the top text */}
              <MapPin size={22} color="#0A8A3A" style={tw`mt-1`} />

              <View style={tw`flex-1`}>
                {/* Line 1 */}
                <Text style={tw`text-[11px] text-gray-500`}>Deliver to</Text>

                {/* Line 2 - Street Name */}
                <Text style={tw`text-base font-bold text-gray-950`}>23 Greenway Street,</Text>

                {/* Line 3 - Area and Chevron */}
                <View style={tw`flex-row items-center gap-1`}>
                  <Text style={tw`text-xs text-gray-500 font-medium`}>
                    Lekki Phase 1, Lagos
                  </Text>
                  <ChevronDown size={12} color="#0A8A3A" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={tw`flex-row gap-3`}>
              {/* Notification Bell */}
              <TouchableOpacity style={tw`relative w-10 h-10 items-center justify-center bg-gray-50 rounded-full`}>
                <Bell size={20} color="#0A8A3A" />
                <View style={tw`absolute top-1.5 right-1.5 w-4 h-4 bg-[#0A8A3A] rounded-full items-center justify-center border border-white`}>
                  <Text style={tw`text-white text-[9px] font-bold`}>3</Text>
                </View>
              </TouchableOpacity>

              {/* Shopping Cart */}
              <TouchableOpacity
                style={tw`relative w-10 h-10 items-center justify-center bg-gray-50 rounded-full`}
                onPress={() => router.push('/cart')}
              >
                <ShoppingBag size={20} color="#0A8A3A" />
                <View style={tw`absolute top-1.5 right-1.5 w-4 h-4 bg-[#0A8A3A] rounded-full items-center justify-center border border-white`}>
                  <Text style={tw`text-white text-[9px] font-bold`}>4</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Box */}
          <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13 bg-white`}>
            <Search size={20} color="#737373" style={tw`mr-3`} />
            <TextInput
              style={tw`flex-1 text-base text-gray-900`}
              placeholder="Search for products, stores "
              placeholderTextColor="#A3A3A3"
            />
            <Scan size={20} color="#0A8A3A" style={tw`mr-3`} />
            <Mic size={20} color="#0A8A3A" />
          </View>
        </View>

        {/* Hero Scooter Banner */}
        <View style={tw`mx-4 bg-market-green-light rounded-3xl p-5 mb-4 flex-row items-center justify-between relative overflow-hidden`}>
          <View style={tw`w-3/5 z-10`}>
            <Text style={tw`text-gray-950 text-xl font-bold leading-6`}>
              Groceries delivered{'\n'}in <Text style={tw`text-market-green`}>30 minutes 🛵</Text>
            </Text>
            <Text style={tw`text-gray-500 text-xs mt-2 leading-4`}>
              Fresh food, everyday essentials delivered to your doorstep.
            </Text>
            <TouchableOpacity style={tw`bg-market-green rounded-xl px-5 py-2.5 mt-4 self-start`}>
              <Text style={tw`text-white text-xs font-semibold`}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('@/assets/images/bag-splash.png')}
            style={tw`w-36 h-32`}
            resizeMode="contain"
          />
        </View>

        {/* Pagination Dots */}
        <View style={tw`flex-row justify-center gap-1.5 mb-4`}>
          <View style={tw`w-6 h-1.5 rounded-full bg-market-green`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
          <View style={tw`w-1.5 h-1.5 rounded-full bg-gray-300`} />
        </View>

        {/* Shop by Category Section */}
        <View style={tw`flex-row justify-between items-center px-4 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Shop by Category</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/categories')}>
            <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-4 pb-1`}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={tw`items-center gap-2`}>
              <View style={tw`w-18 h-18 rounded-full ${cat.bgColor} items-center justify-center border border-gray-50 shadow-sm`}>
                <Image source={cat.image} style={tw`w-10 h-10`} resizeMode="contain" />
              </View>
              <Text style={tw`text-[11px] text-gray-900 font-semibold text-center leading-3.5 w-18`}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Stores Section */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Popular Stores</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-1`}>
          {stores.map((store) => (
            <View key={store.id} style={tw`w-52 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm`}>
              <View style={tw`flex-row items-center gap-3 mb-3`}>
                <Image source={store.logo} style={tw`w-10 h-10 rounded-xl`} resizeMode="cover" />
                <View>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>{store.name}</Text>
                    {store.verified && <Text style={tw`text-market-green text-xs`}>✓</Text>}
                  </View>
                  <View style={tw`flex-row items-center gap-1 mt-0.5`}>
                    <Text style={tw`text-yellow-500 text-xs`}>⭐</Text>
                    <Text style={tw`text-xs text-gray-700 font-semibold`}>{store.rating}</Text>
                    <Text style={tw`text-xs text-gray-400`}>({store.reviews})</Text>
                  </View>
                </View>
              </View>
              <Text style={tw`text-xs text-gray-500`}>{store.time}</Text>
              <View style={tw`flex-row items-center gap-1 mt-1`}>
                <Text style={tw`text-xs text-gray-700 font-medium`}>{store.min}</Text>
                <Text style={tw`text-gray-300`}>•</Text>
                <Text style={tw`text-xs text-market-green font-semibold`}>{store.delivery}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Top Picks For You Section */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Top Picks For You</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3 pb-1`}>
          {topPicks.map((item) => (
            <View key={item.id} style={tw`w-36 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm relative`}>
              <TouchableOpacity style={tw`absolute top-3 right-3 z-10`}>
                <Heart size={16} color="#D4D4D4" />
              </TouchableOpacity>
              <View style={tw`items-center bg-gray-50/50 rounded-xl p-2`}>
                <Image source={item.image} style={tw`w-20 h-20`} resizeMode="contain" />
              </View>
              <Text style={tw`text-xs font-bold text-gray-900 mt-2`} numberOfLines={1}>{item.name}</Text>
              <Text style={tw`text-[10px] text-gray-500 mt-0.5`}>{item.qty}</Text>
              <View style={tw`flex-row justify-between items-center mt-2`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>{item.price}</Text>
                <TouchableOpacity style={tw`bg-market-green w-7 h-7 rounded-full items-center justify-center`}>
                  <Plus size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Flash Deals with Countdown */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>Flash Deals</Text>
            <CountdownTimer />
          </View>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3 pb-1`}>
          {flashDeals.map((deal) => (
            <View key={deal.id} style={tw`w-36 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm relative`}>
              <View style={tw`absolute top-3 left-3 z-10 bg-red-500 px-1.5 py-0.5 rounded`}>
                <Text style={tw`text-white text-[9px] font-bold`}>{deal.discount}</Text>
              </View>
              <View style={tw`items-center bg-gray-50/50 rounded-xl p-2`}>
                <Image source={deal.image} style={tw`w-20 h-20`} resizeMode="contain" />
              </View>
              <Text style={tw`text-xs font-bold text-gray-900 mt-2`} numberOfLines={1}>{deal.name}</Text>
              <Text style={tw`text-[10px] text-gray-500 mt-0.5`}>{deal.qty}</Text>
              <View style={tw`flex-row items-center gap-1.5 mt-2`}>
                <Text style={tw`text-sm font-bold text-gray-950`}>{deal.price}</Text>
                <Text style={tw`text-[10px] text-gray-400 line-through`}>{deal.oldPrice}</Text>
              </View>
              <TouchableOpacity style={tw`bg-market-green w-7 h-7 rounded-full items-center justify-center absolute bottom-3 right-3`}>
                <Plus size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Buy Again Section */}
        <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
          <Text style={tw`text-lg font-bold text-gray-900`}>Buy Again</Text>
          <TouchableOpacity>
            <Text style={tw`text-sm text-market-green font-semibold`}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3 pb-1`}>
          {buyAgain.map((item) => (
            <View key={item.id} style={tw`w-36 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm relative`}>
              <TouchableOpacity style={tw`absolute top-3 right-3 z-10`}>
                <Heart size={16} color="#D4D4D4" />
              </TouchableOpacity>
              <View style={tw`items-center bg-gray-50/50 rounded-xl p-2`}>
                <Image source={item.image} style={tw`w-20 h-20`} resizeMode="contain" />
              </View>
              <Text style={tw`text-xs font-bold text-gray-900 mt-2`} numberOfLines={1}>{item.name}</Text>
              <Text style={tw`text-[10px] text-gray-500 mt-0.5`}>{item.qty}</Text>
              <View style={tw`flex-row justify-between items-center mt-2`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>{item.price}</Text>
                <TouchableOpacity style={tw`bg-market-green w-7 h-7 rounded-full items-center justify-center`}>
                  <Plus size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>


      </ScrollView>
    </SafeAreaView>
  );
}