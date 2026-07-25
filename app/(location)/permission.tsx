import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Clock,
    Crosshair,
    Map,
    MapPin,
    ShieldCheck,
    Truck
} from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LocationPermissionScreen() {
    const router = useRouter();

    const handleAllowLocation = () => {
        router.push('/(location)/index');
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header with Progress Bar */}
            <View style={tw`px-6 pt-2 pb-4 flex-row items-center justify-between`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`w-10 h-10 justify-center`}>
                    <ArrowLeft size={24} color="#171717" />
                </TouchableOpacity>

                {/* Stepper Dots/Bars (Step 1 active) */}
                <View style={tw`flex-row gap-1.5 items-center`}>
                    <View style={tw`w-8 h-1 bg-market-green rounded-full`} />
                    <View style={tw`w-8 h-1 bg-gray-200 rounded-full`} />
                    <View style={tw`w-8 h-1 bg-gray-200 rounded-full`} />
                    <View style={tw`w-8 h-1 bg-gray-200 rounded-full`} />
                </View>

                <View style={tw`w-10`} />
            </View>

            <ScrollView contentContainerStyle={tw`px-6 pb-8 items-center justify-between flex-grow`} showsVerticalScrollIndicator={false}>
                <View style={tw`w-full items-center`}>
                    {/* Map Vector Illustration Graphic */}
                    <View style={tw`w-full h-56 items-center justify-center relative my-2`}>
                        {/* Soft green background shapes */}
                        <View style={tw`w-64 h-48 bg-market-green-light rounded-full absolute opacity-70`} />

                        {/* Badges around pin */}
                        <View style={tw`absolute top-8 left-8 w-11 h-11 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 z-10`}>
                            <Crosshair size={20} color="#0A8A3A" />
                        </View>
                        <View style={tw`absolute top-12 right-8 w-11 h-11 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100 z-10`}>
                            <ShieldCheck size={20} color="#0A8A3A" />
                        </View>

                        {/* Large Central Pin */}
                        <View style={tw`items-center justify-center z-20`}>
                            <View style={tw`w-20 h-24 bg-market-green rounded-t-full rounded-b-lg items-center justify-center shadow-md`}>
                                <View style={tw`w-8 h-8 rounded-full bg-white`} />
                            </View>
                        </View>
                    </View>

                    {/* Headline */}
                    <Text style={tw`text-3xl font-extrabold text-black text-center mb-2`}>
                        Allow <Text style={tw`text-market-green`}>Location</Text> Access
                    </Text>
                    <Text style={tw`text-sm text-gray-500 text-center px-4 leading-5 mb-8`}>
                        We need access to your location to show nearby stores, delivery options and accurate services.
                    </Text>

                    {/* Benefits List */}
                    <View style={tw`w-full gap-5 mb-8`}>
                        {/* Benefit 1 */}
                        <View style={tw`flex-row items-center gap-4`}>
                            <View style={tw`w-12 h-12 rounded-2xl bg-market-green-light items-center justify-center border border-market-green/10`}>
                                <MapPin size={22} color="#0A8A3A" />
                            </View>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-base font-bold text-gray-900`}>Find nearby stores & services</Text>
                                <Text style={tw`text-xs text-gray-500 font-medium mt-0.5`}>Discover the best options near you.</Text>
                            </View>
                        </View>

                        <View style={tw`h-px bg-gray-100 w-full`} />

                        {/* Benefit 2 */}
                        <View style={tw`flex-row items-center gap-4`}>
                            <View style={tw`w-12 h-12 rounded-2xl bg-market-green-light items-center justify-center border border-market-green/10`}>
                                <Truck size={22} color="#0A8A3A" />
                            </View>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-base font-bold text-gray-900`}>Faster & accurate delivery</Text>
                                <Text style={tw`text-xs text-gray-500 font-medium mt-0.5`}>Help us deliver to the right address.</Text>
                            </View>
                        </View>

                        <View style={tw`h-px bg-gray-100 w-full`} />

                        {/* Benefit 3 */}
                        <View style={tw`flex-row items-center gap-4`}>
                            <View style={tw`w-12 h-12 rounded-2xl bg-market-green-light items-center justify-center border border-market-green/10`}>
                                <Clock size={22} color="#0A8A3A" />
                            </View>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-base font-bold text-gray-900`}>Real-time order tracking</Text>
                                <Text style={tw`text-xs text-gray-500 font-medium mt-0.5`}>Track your orders in real-time.</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Bottom Action Group */}
                <View style={tw`w-full gap-3 pt-2`}>
                    {/* Primary CTA */}
                    <TouchableOpacity
                        style={tw`w-full bg-market-green py-4 rounded-2xl flex-row items-center justify-center gap-2.5 shadow-sm`}
                        onPress={handleAllowLocation}
                    >
                        <MapPin size={20} color="white" />
                        <Text style={tw`text-white text-base font-bold`}>Allow Location Access</Text>
                    </TouchableOpacity>

                    {/* Secondary CTA */}
                    <TouchableOpacity
                        style={tw`w-full border border-market-green/40 py-4 rounded-2xl flex-row items-center justify-center gap-2.5 bg-white`}
                        onPress={() => router.push('/(location)/index')}
                    >
                        <Map size={20} color="#0A8A3A" />
                        <Text style={tw`text-market-green text-base font-bold`}>Enter Location Manually</Text>
                    </TouchableOpacity>

                    {/* Not Now Link */}
                    <TouchableOpacity
                        style={tw`py-2 items-center`}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={tw`text-sm font-semibold text-gray-500`}>Not now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}