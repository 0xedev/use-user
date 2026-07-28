
import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ChevronRight,
    CreditCard,
    Headphones,
    ShoppingBag,
    Smartphone,
    Sparkles,
    Store,
    Truck
} from 'lucide-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ServicesHubScreen() {
    const router = useRouter();

    // Uses router.push to preserve Screen 2 (Hub) in navigation history stack
    const handleSelectService = (serviceKey: string) => {
        router.push({
            pathname: '/(tabs)',
            params: { service: serviceKey },
        });
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header Block with Brand Identity */}
            <View style={tw`px-5 py-2 flex-row items-center justify-between border-b border-gray-100`}>
                {/* Brand Logo */}
                <View style={tw`flex-row items-center gap-2`}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={tw`w-15 h-13`}
                    />
                    <View>
                        <Text style={tw`text-xl text-market-green font-medium`}>
                            use<Text style={tw`text-black font-bold`}>Market</Text>
                        </Text>
                    </View>
                </View>

                {/* Right Action Icons */}
                <View style={tw`flex-row items-center gap-2.5`}>
                    <TouchableOpacity style={tw`flex-row items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full`}>
                        <View style={tw`w-2 h-2 rounded-full bg-market-green`} />
                        <Text style={tw`text-xs font-semibold text-gray-700`}>Guest</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`w-10 h-10 rounded-full bg-gray-50 border border-gray-100 items-center justify-center`}>
                        <Headphones size={18} color="#0A8A3A" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`px-5 py-4 pb-8`}>
                {/* Headline Banner */}
                <View style={tw`mb-5`}>
                    <Text style={tw`text-xl font-bold text-gray-950 leading-8`}>
                        What would you like to do today?
                    </Text>
                    <Text style={tw`text-xs text-gray-400 font-semibold mt-1`}>
                        Choose a service to explore useMarket
                    </Text>
                </View>

                {/* Grid Layout of Services */}
                <View style={tw`flex-row gap-3.5 mb-3.5`}>
                    {/* Left Column */}
                    <View style={tw`flex-1 gap-3.5`}>
                        {/* 1. Foods & Groceries */}
                        <TouchableOpacity
                            style={tw`bg-market-green rounded-3xl p-5 h-64 justify-between relative overflow-hidden shadow-sm`}
                            onPress={() => handleSelectService('food')}
                            activeOpacity={0.9}
                        >
                            <View style={tw`bg-white/20 border border-white/30 self-start px-2.5 py-1 rounded-full flex-row items-center gap-1`}>
                                <Sparkles size={11} color="white" />
                                <Text style={tw`text-[10px] text-white font-bold`}>Most Popular</Text>
                            </View>

                            <View style={tw`w-20 h-20 rounded-full bg-white/15 items-center justify-center self-center my-1 border border-white/20`}>
                                <ShoppingBag size={38} color="white" />
                            </View>

                            <View>
                                <Text style={tw`text-xl font-extrabold text-white leading-6`}>
                                    Foods &{'\n'}Groceries
                                </Text>
                                <Text style={tw`text-[11px] text-white/80 font-medium mt-1`}>
                                    Delivered in 30 mins 🛵
                                </Text>
                            </View>

                            <View style={tw`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5`} />
                        </TouchableOpacity>

                        {/* 2. Shop Gadgets */}
                        <TouchableOpacity
                            style={tw`bg-gray-900 rounded-3xl p-4.5 h-44 justify-between relative overflow-hidden shadow-sm`}
                            onPress={() => handleSelectService('gadgets')}
                            activeOpacity={0.9}
                        >
                            <View style={tw`w-14 h-14 rounded-2xl bg-white/10 items-center justify-center border border-white/10`}>
                                <Smartphone size={26} color="#4ADE80" />
                            </View>

                            <View>
                                <Text style={tw`text-base font-bold text-white`}>
                                    Shop Gadgets
                                </Text>
                                <Text style={tw`text-[10px] text-gray-400 font-medium mt-0.5`}>
                                    Phones, tech & accessories
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Right Column */}
                    <View style={tw`flex-1 gap-3.5`}>
                        {/* 3. Pay Bills */}
                        <TouchableOpacity
                            style={tw`bg-market-green-light border border-market-green/20 rounded-3xl p-4.5 h-44 justify-between shadow-sm`}
                            onPress={() => handleSelectService('bills')}
                            activeOpacity={0.9}
                        >
                            <View style={tw`w-14 h-14 rounded-2xl bg-market-green/10 items-center justify-center border border-market-green/20`}>
                                <CreditCard size={26} color="#0A8A3A" />
                            </View>

                            <View>
                                <Text style={tw`text-base font-bold text-gray-950`}>
                                    Pay Bills
                                </Text>
                                <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                    Airtime, utilities & TV
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* 4. useMarketplace */}
                        <TouchableOpacity
                            style={tw`bg-[#1E293B] rounded-3xl p-5 h-64 justify-between relative overflow-hidden shadow-sm`}
                            onPress={() => handleSelectService('marketplace')}
                            activeOpacity={0.9}
                        >
                            <View style={tw`bg-white/10 border border-white/10 self-start px-2.5 py-1 rounded-full`}>
                                <Text style={tw`text-[10px] text-emerald-400 font-bold`}>Verified Stores</Text>
                            </View>

                            <View style={tw`w-20 h-20 rounded-full bg-white/10 items-center justify-center self-center my-1 border border-white/10`}>
                                <Store size={36} color="#22C55E" />
                            </View>

                            <View>
                                <Text style={tw`text-xl font-bold text-white leading-6`}>
                                    useMarket{'\n'}Marketplace
                                </Text>
                                <Text style={tw`text-[11px] text-gray-400 font-medium mt-1`}>
                                    Shop directly from stores
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 5. Logistics & Express */}
                <TouchableOpacity
                    style={tw`bg-white border border-market-green/30 rounded-3xl p-4.5 flex-row items-center justify-between mt-1 shadow-sm`}
                    onPress={() => handleSelectService('logistics')}
                    activeOpacity={0.9}
                >
                    <View style={tw`flex-row items-center gap-3.5 flex-1`}>
                        <View style={tw`w-13 h-13 rounded-2xl bg-market-green items-center justify-center shadow-sm`}>
                            <Truck size={24} color="white" />
                        </View>
                        <View style={tw`flex-1`}>
                            <View style={tw`flex-row items-center gap-1.5`}>
                                <Text style={tw`text-base font-bold text-gray-950`}>Logistics & Express</Text>
                            </View>
                            <Text style={tw`text-xs text-gray-500 font-medium mt-0.5`}>
                                Send parcels & track deliveries anywhere
                            </Text>
                        </View>
                    </View>

                    <View style={tw`w-8 h-8 rounded-full bg-market-green/10 items-center justify-center ml-2`}>
                        <ChevronRight size={18} color="#0A8A3A" />
                    </View>
                </TouchableOpacity>

                {/* Brand Footer */}
                <View style={tw`items-center mt-6`}>
                    <Text style={tw`text-xs text-gray-400 font-medium`}>
                        Your market, <Text style={tw`text-market-green font-bold`}>delivered.</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}