import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    Bell,
    ChevronDown,
    ChevronRight,
    Clock,
    MapPin,
    Search,
    ShoppingBag
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const billCategories = [
    { id: 1, name: 'Electricity', icon: '💡', bg: 'bg-amber-50' },
    { id: 2, name: 'Water', icon: '💧', bg: 'bg-blue-50' },
    { id: 3, name: 'TV Subscription', icon: '📺', bg: 'bg-purple-50' },
    { id: 4, name: 'Internet', icon: '📶', bg: 'bg-emerald-50' },
    { id: 5, name: 'Airtime', icon: '📲', bg: 'bg-pink-50' },
    { id: 6, name: 'Data', icon: '📊', bg: 'bg-emerald-50' },
    { id: 7, name: 'Education', icon: '🎓', bg: 'bg-indigo-50' },
    { id: 8, name: 'Insurance', icon: '🛡️', bg: 'bg-blue-50' },
    { id: 9, name: 'Road &\nToll Fees', icon: '🚧', bg: 'bg-orange-50' },
    { id: 10, name: 'More\nCategories', icon: '🎛️', bg: 'bg-gray-100' },
];

const recentPayments = [
    {
        id: 1,
        title: 'AEDC Electricity',
        subtitle: 'Customer ID: 0123456789',
        amount: '₦12,450.00',
        status: 'Paid',
        logoText: 'AEDC',
        logoBg: 'bg-yellow-400',
        textColor: 'text-black',
    },
    {
        id: 2,
        title: 'DStv Premium',
        subtitle: 'Smart Card: 1234 5678 9012',
        amount: '₦8,900.00',
        status: 'Paid',
        logoText: 'DStv',
        logoBg: 'bg-sky-500',
        textColor: 'text-white',
    },
    {
        id: 3,
        title: 'Airtel Data Bundle',
        subtitle: '0812 345 6789',
        amount: '₦2,500.00',
        status: 'Paid',
        logoText: 'airtel',
        logoBg: 'bg-red-600',
        textColor: 'text-white',
    },
];

export default function BillsScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

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
                {/* Hero Promotion Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-3xl p-5 relative overflow-hidden flex-row items-center justify-between border border-market-green/10`}>
                    <View style={tw`w-3/5 z-10 pr-2`}>
                        <Text style={tw`text-2xl font-extrabold text-gray-900 leading-7`}>
                            Pay your bills easily
                        </Text>
                        <Text style={tw`text-xs text-gray-500 font-medium mt-2 leading-4`}>
                            Fast, secure and convenient payments all in one place.
                        </Text>
                    </View>

                    {/* Banner Phone Graphic */}
                    <View style={tw`w-2/5 items-center justify-center relative`}>
                        <Image
                            source={require('@/assets/image-bill/bill-home.png')} // Replace with bill payment phone graphic asset
                            style={tw`w-33 h-28`}
                        
                        />
                    </View>
                </View>

                {/* Search & History Bar */}
                <View style={tw`px-4 my-2`}>
                    <View style={tw`flex-row items-center border border-gray-200 rounded-2xl p-1.5 bg-white shadow-xs`}>
                        <View style={tw`flex-row items-center flex-1 px-3`}>
                            <Search size={18} color="#9CA3AF" style={tw`mr-2.5`} />
                            <TextInput
                                style={tw`flex-1 text-sm text-gray-900 h-10 font-medium`}
                                placeholder="Search for a biller or category"
                                placeholderTextColor="#9CA3AF"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        {/* History Pill Button */}
                        <TouchableOpacity
                            style={tw`bg-market-green px-4 py-2.5 rounded-xl flex-row items-center gap-1.5`}
                            onPress={() => router.push('/(tabs)/wallet')}
                        >
                            <Clock size={14} color="white" />
                            <Text style={tw`text-white text-xs font-bold`}>History</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bill Categories Header */}
                <View style={tw`flex-row justify-between items-center px-4 mt-1 mb-1`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Bill Categories</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-xs font-bold text-market-green`}>View all</Text>
                    </TouchableOpacity>
                </View>

                {/* 5-Column Grid Categories */}
                <View style={tw`px-4 flex-row flex-wrap justify-between gap-y-3 mb-2`}>
                    {billCategories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={tw`items-center gap-1.5 w-[18%]`}
                        >
                            <View style={tw`w-14 h-14 rounded-2xl ${cat.bg} items-center justify-center border border-gray-100 shadow-xs`}>
                                <Text style={tw`text-2xl`}>{cat.icon}</Text>
                            </View>
                            <Text style={tw`text-[10px] font-semibold text-gray-800 text-center leading-3`}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recent Payments Section */}
                <View style={tw`flex-row justify-between items-center px-4 mb-3`}>
                    <Text style={tw`text-lg font-bold text-gray-900`}>Recent Payments</Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/wallet')}>
                        <Text style={tw`text-xs font-bold text-market-green`}>View all</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Transactions List Card */}
                <View style={tw`mx-3 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs mb-4`}>
                    {recentPayments.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={tw`flex-row items-center justify-between p-4 ${index !== recentPayments.length - 1 ? 'border-b border-gray-100' : ''
                                }`}
                        >
                            <View style={tw`flex-row items-center gap-3.5 flex-1 pr-2`}>
                                <View style={tw`w-11 h-11 rounded-full ${item.logoBg} items-center justify-center`}>
                                    <Text style={tw`text-[10px] font-extrabold ${item.textColor} tracking-tight`}>
                                        {item.logoText}
                                    </Text>
                                </View>

                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-sm font-bold text-gray-900`}>{item.title}</Text>
                                    <Text style={tw`text-[11px] text-gray-400 font-medium mt-0.5`}>
                                        {item.subtitle}
                                    </Text>
                                </View>
                            </View>

                            <View style={tw`flex-row items-center gap-2`}>
                                <View style={tw`items-end`}>
                                    <Text style={tw`text-sm font-bold text-gray-900`}>{item.amount}</Text>
                                    <Text style={tw`text-[10px] font-bold text-market-green mt-0.5`}>
                                        {item.status}
                                    </Text>
                                </View>
                                <ChevronRight size={16} color="#9CA3AF" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

              
            </ScrollView>
        </SafeAreaView>
    );
}