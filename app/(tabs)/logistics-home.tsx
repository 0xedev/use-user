import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowRight,
    Bell,
    ChevronDown,
    Heart,
    MapPin,
    Search,
    ShoppingBag,
    ShoppingCart,
    SlidersHorizontal
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const logisticsCategories = [
    { id: 1, name: 'Parcel\nDelivery', icon: '📦', bg: 'bg-emerald-50' },
    { id: 2, name: 'Bike\nDelivery', icon: '🛵', bg: 'bg-emerald-50' },
    { id: 3, name: 'Truck\nLogistics', icon: '🚚', bg: 'bg-emerald-50' },
    { id: 4, name: 'Air Freight', icon: '✈️', bg: 'bg-emerald-50' },
    { id: 5, name: 'Sea Freight', icon: '🚢', bg: 'bg-emerald-50' },
    { id: 6, name: 'All\nCategories', icon: '🎛️', bg: 'bg-gray-100' },
];

const bestDeals = [
    {
        id: 1,
        name: 'City Parcel Delivery',
        subtitle: 'Same day delivery',
        price: '₦2,000',
        oldPrice: '₦2,500',
        discount: '-20%',
        image: require('@/assets/images/delivery-illustration.png'),
    },
    {
        id: 2,
        name: 'Bike Delivery',
        subtitle: 'Within Lagos',
        price: '₦1,500',
        oldPrice: '₦1,800',
        discount: '-15%',
        image: require('@/assets/images/grocery-bag-hero.png'),
    },
    {
        id: 3,
        name: 'Truck Logistics',
        subtitle: 'Interstate',
        price: '₦50,000',
        oldPrice: '₦55,000',
        discount: '-10%',
        image: require('@/assets/images/location-store.png'),
    },
    {
        id: 4,
        name: 'Air Freight',
        subtitle: 'International',
        price: '₦120,000',
        oldPrice: '₦136,000',
        discount: '-12%',
        image: require('@/assets/images/splash-illustration.png'),
    },
];

const popularServices = [
    { id: 1, name: 'Parcel Delivery', sub: 'Fast & reliable', icon: '📦' },
    { id: 2, name: 'Bike Delivery', sub: 'Within city', icon: '🛵' },
    { id: 3, name: 'Truck Logistics', sub: 'Interstate', icon: '🚚' },
    { id: 4, name: 'Air Freight', sub: 'Global shipping', icon: '✈️' },
];

export default function LogisticsScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState<number[]>([]);

    const toggleWishlist = (id: number) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* Search Bar Input */}
                <View style={tw`px-4 my-2`}>
                    <View style={tw`flex-row items-center border border-gray-200 rounded-2xl px-4 h-13 bg-white shadow-xs`}>
                        <Search size={18} color="#9CA3AF" style={tw`mr-3`} />
                        <TextInput
                            style={tw`flex-1 text-sm text-gray-900 h-full font-medium`}
                            placeholder="Search for logistics, couriers, shipments..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <SlidersHorizontal size={18} color="#171717" />
                    </View>
                </View>

                {/* Hero Promotion Banner (Green Logistics Theme) */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-3xl p-5 relative overflow-hidden flex-row items-center justify-between border border-market-green/10`}>
                    <View style={tw`w-3/5 z-10 pr-2`}>
                        <Text style={tw`text-2xl font-extrabold text-gray-950 leading-7`}>
                            Fast & Reliable{'\n'}
                            <Text style={tw`text-market-green`}>Logistics Services</Text>
                        </Text>
                        <Text style={tw`text-xs text-gray-600 font-medium mt-2 leading-4`}>
                            Move what matters, where it matters.
                        </Text>

                        {/* CTA Button */}
                        <TouchableOpacity
                            style={tw`bg-market-green px-4 py-2.5 rounded-xl flex-row items-center gap-1.5 self-start mt-4 shadow-sm`}
                            onPress={() => router.push('/(tabs)/orders')}
                        >
                            <Text style={tw`text-white text-xs font-bold`}>Book a Delivery</Text>
                            <ArrowRight size={14} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Banner Hero Truck Graphic */}
                    <View style={tw`w-2/5 items-center justify-center relative`}>
                        <Image
                            source={require('@/assets/images/delivery-illustration.png')} // Replace with Truck asset
                            style={tw`w-32 h-32`}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Category Horizontal Scroll Grid */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 my-3`}>
                    {logisticsCategories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={tw`items-center gap-1.5 w-18`}
                        >
                            <View style={tw`w-16 h-16 rounded-2xl ${cat.bg} items-center justify-center border border-emerald-100 shadow-xs`}>
                                <Text style={tw`text-2xl`}>{cat.icon}</Text>
                            </View>
                            <Text style={tw`text-[11px] font-semibold text-gray-800 text-center leading-3.5`}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Best Deals For You Section */}
                <View style={tw`flex-row justify-between items-center px-4 mt-4 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Best deals for you</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Horizontal Scroll List */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-2`}>
                    {bestDeals.map((item) => {
                        const isLiked = wishlist.includes(item.id);

                        return (
                            <View key={item.id} style={tw`w-38 bg-white rounded-2xl border border-gray-100 p-3 shadow-xs relative`}>
                                {/* Discount Pill Badge */}
                                <View style={tw`absolute top-3 left-3 bg-emerald-100 px-2 py-0.5 rounded-md z-10`}>
                                    <Text style={tw`text-[10px] font-bold text-market-green`}>{item.discount}</Text>
                                </View>

                                {/* Like Heart Button */}
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

                                {/* Image Preview */}
                                <TouchableOpacity
                                    style={tw`items-center justify-center my-2 h-28 bg-gray-50/50 rounded-xl p-2`}
                                >
                                    <Image source={item.image} style={tw`w-20 h-20`} resizeMode="contain" />
                                </TouchableOpacity>

                                {/* Product Info */}
                                <Text style={tw`text-xs font-bold text-gray-900 leading-4 mt-1`} numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`} numberOfLines={1}>
                                    {item.subtitle}
                                </Text>

                                {/* Pricing & Add Button */}
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

                {/* Popular Logistics Services Header */}
                <View style={tw`flex-row justify-between items-center px-4 mt-6 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Popular logistics services</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                    </TouchableOpacity>
                </View>

                {/* Popular Services Grid */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-3.5 pb-2`}>
                    {popularServices.map((service) => (
                        <TouchableOpacity
                            key={service.id}
                            style={tw`w-38 bg-white rounded-2xl border border-gray-100 p-4 shadow-xs items-center justify-center`}
                        >
                            <Text style={tw`text-3xl my-1`}>{service.icon}</Text>
                            <Text style={tw`text-xs font-bold text-gray-900 text-center mt-1`}>
                                {service.name}
                            </Text>
                            <Text style={tw`text-[10px] font-semibold text-gray-400 text-center mt-0.5`}>
                                {service.sub}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>




            </ScrollView>
        </SafeAreaView>
    );
}