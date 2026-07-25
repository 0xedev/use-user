import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    Briefcase,
    ChevronRight,
    Crosshair,
    Heart,
    Home,
    MapPin,
    MoreVertical
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialAddresses = [
    { id: 1, label: 'Home', address: '23 Adekunle Street, Yaba, Lagos, Nigeria.', icon: 'home', isDefault: true },
    { id: 2, label: 'Work', address: '12 Marina Road, Victoria Island, Lagos, Nigeria.', icon: 'work', isDefault: false },
    { id: 3, label: "Mom's House", address: '7 Joy Avenue, Ikeja, Lagos, Nigeria.', icon: 'heart', isDefault: false },
];

export default function ChooseLocationScreen() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Top Bar with Progress */}
            <View style={tw`px-6 pt-2 pb-3 flex-row items-center justify-between`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`w-10 h-10 justify-center`}>
                    <ArrowLeft size={24} color="#171717" />
                </TouchableOpacity>

                {/* Progress Bar (Step 3 active) */}
                <View style={tw`flex-row gap-1.5 items-center`}>
                    <View style={tw`w-8 h-1 bg-market-green rounded-full`} />
                    <View style={tw`w-8 h-1 bg-market-green rounded-full`} />
                    <View style={tw`w-8 h-1 bg-market-green rounded-full`} />
                    <View style={tw`w-8 h-1 bg-gray-200 rounded-full`} />
                </View>

                <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                    <Text style={tw`text-sm font-bold text-market-green`}>Skip</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`px-6 pb-8`}>
                {/* Title */}
                <Text style={tw`text-3xl font-extrabold text-black leading-9 mb-1`}>
                    Where should we{'\n'}<Text style={tw`text-market-green`}>deliver to?</Text>
                </Text>
                <Text style={tw`text-xs text-gray-500 font-medium mb-5 leading-4`}>
                    Set your delivery address to see nearby stores and accurate delivery options.
                </Text>

                {/* Search Box */}
                <View style={tw`flex-row items-center border border-gray-200 rounded-2xl px-4 h-14 bg-white mb-5 shadow-xs`}>
                    <MapPin size={20} color="#0A8A3A" style={tw`mr-3`} />
                    <TextInput
                        style={tw`flex-1 text-sm text-gray-900 h-full font-medium`}
                        placeholder="Search address, area or landmark"
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Crosshair size={20} color="#0A8A3A" />
                </View>

                {/* Mini Vector Map Card with "Use my location" Badge */}
                <View style={tw`w-full h-44 rounded-3xl bg-emerald-50 border border-gray-100 overflow-hidden relative mb-6 shadow-xs`}>
                    {/* Simulated Map Graphic Grid */}
                    <View style={tw`absolute top-1/3 left-0 right-0 h-1 bg-emerald-100 rotate-6`} />
                    <View style={tw`absolute top-2/3 left-0 right-0 h-1 bg-emerald-100 -rotate-3`} />
                    
                    {/* Center Pin */}
                    <View style={tw`absolute inset-0 items-center justify-center`}>
                        <View style={tw`w-10 h-10 rounded-full bg-market-green/20 items-center justify-center`}>
                            <View style={tw`w-4 h-4 rounded-full bg-market-green border-2 border-white`} />
                        </View>
                    </View>

                    {/* Use My Location Floating Badge */}
                    <TouchableOpacity 
                        style={tw`absolute bottom-3 right-3 bg-white px-3.5 py-2 rounded-xl flex-row items-center gap-2 border border-gray-100 shadow-sm`}
                        onPress={() => router.push('/(location)/map')}
                    >
                        <Crosshair size={16} color="#0A8A3A" />
                        <Text style={tw`text-xs font-bold text-gray-800`}>Use my location</Text>
                    </TouchableOpacity>
                </View>

                {/* Saved Addresses Section */}
                <View style={tw`flex-row justify-between items-center mb-3`}>
                    <Text style={tw`text-base font-bold text-gray-900`}>Saved addresses</Text>
                    <TouchableOpacity onPress={() => router.push('/(location)/saved')}>
                        <Text style={tw`text-xs font-bold text-market-green`}>See all</Text>
                    </TouchableOpacity>
                </View>

                {/* Address Cards List */}
                <View style={tw`gap-3 mb-4`}>
                    {initialAddresses.map((item) => {
                        const isSelected = selectedId === item.id;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => setSelectedId(item.id)}
                                style={tw`p-4 rounded-2xl border flex-row items-center justify-between bg-white ${
                                    isSelected ? 'border-market-green/40 bg-market-green-light/20' : 'border-gray-200'
                                }`}
                            >
                                <View style={tw`flex-row items-start gap-3.5 flex-1 pr-2`}>
                                    <View style={tw`w-11 h-11 rounded-2xl bg-market-green-light items-center justify-center border border-market-green/10 mt-0.5`}>
                                        {item.icon === 'home' && <Home size={20} color="#0A8A3A" />}
                                        {item.icon === 'work' && <Briefcase size={20} color="#0A8A3A" />}
                                        {item.icon === 'heart' && <Heart size={20} color="#0A8A3A" />}
                                    </View>

                                    <View style={tw`flex-1`}>
                                        <View style={tw`flex-row items-center gap-2`}>
                                            <Text style={tw`text-base font-bold text-gray-900`}>{item.label}</Text>
                                            {item.isDefault && (
                                                <View style={tw`bg-market-green-light px-2 py-0.5 rounded-md border border-market-green/20`}>
                                                    <Text style={tw`text-[10px] font-bold text-market-green`}>Default</Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text style={tw`text-xs text-gray-500 font-medium mt-1 leading-4`}>
                                            {item.address}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={tw`p-1`}>
                                    <MoreVertical size={18} color="#9CA3AF" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Add New Address Card */}
                <TouchableOpacity
                    style={tw`p-4 rounded-2xl bg-market-green-light/40 border border-market-green/20 flex-row items-center justify-between mb-8`}
                    onPress={() => router.push('/(location)/add')}
                >
                    <View style={tw`flex-row items-center gap-3.5`}>
                        <View style={tw`w-10 h-10 rounded-2xl bg-market-green/10 items-center justify-center`}>
                            <MapPin size={20} color="#0A8A3A" />
                        </View>
                        <View>
                            <Text style={tw`text-sm font-bold text-market-green`}>Add new address</Text>
                            <Text style={tw`text-xs text-gray-500 font-medium mt-0.5`}>Add a new delivery address</Text>
                        </View>
                    </View>
                    <ChevronRight size={18} color="#0A8A3A" />
                </TouchableOpacity>

                {/* Confirm Address CTA */}
                <TouchableOpacity
                    style={tw`w-full bg-market-green py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-sm`}
                    onPress={() => router.replace('/(tabs)')}
                    activeOpacity={0.85}
                >
                    <Text style={tw`text-white text-base font-bold`}>Confirm Address</Text>
                    <ArrowRight size={20} color="white" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}