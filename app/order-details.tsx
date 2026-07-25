import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
    AlertTriangle,
    ArrowLeft,
    Bell,
    Check,
    ChevronRight,
    Download,
    Headphones,
    Home,
    Info,
    MapPin,
    Package,
    RefreshCw,
    Share2,
    ShieldCheck,
    ShoppingBag,
    Store,
    Tag,
    Truck,
    Wallet
} from 'lucide-react-native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stepperStages = [
    { label: 'Confirmed', time: '9:20 AM', icon: 'wallet' },
    { label: 'Preparing', time: '9:28 AM', icon: 'store' },
    { label: 'Picked Up', time: '9:45 AM', icon: 'box' },
    { label: 'Out for Delivery', time: '10:02 AM', icon: 'truck' },
    { label: 'Delivered', time: '10:32 AM', icon: 'home', active: true },
];

const orderItems = [
    { id: 1, name: 'Stallion Premium Parboiled Rice', unit: '50kg', price: '₦68,500', qty: 1, total: '₦68,500', image: require('@/assets/images/prod-rice.png') },
    { id: 2, name: 'Golden Penny Cooking Oil', unit: '5L', price: '₦12,400', qty: 2, total: '₦24,800', image: require('@/assets/images/prod-oil.png') },
    { id: 3, name: 'Golden Penny Beans (Brown)', unit: '1kg', price: '₦2,300', qty: 1, total: '₦2,300', image: require('@/assets/images/prod-tomatoes.png') },
];

export default function OrderDetailsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Top Navigation Bar */}
            <View style={tw`px-4 pt-2 pb-1 flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`w-9 h-9 items-center justify-center`}>
                        <ArrowLeft size={22} color="#171717" />
                    </TouchableOpacity>
                    <Text style={tw`text-2xl font-bold text-black`}>
                        <Text style={tw`text-market-green`}>use</Text>Market
                    </Text>
                </View>

                <View style={tw`flex-row items-center gap-3`}>
                    <TouchableOpacity style={tw`w-9 h-9 items-center justify-center`}>
                        <Headphones size={22} color="#171717" />
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center`}>
                        <Bell size={22} color="#171717" />
                        <View style={tw`absolute top-1 right-1 w-2 h-2 bg-market-green rounded-full`} />
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`relative w-9 h-9 items-center justify-center`} onPress={() => router.push('/cart')}>
                        <ShoppingBag size={22} color="#171717" />
                        <View style={tw`absolute -top-1 -right-1 w-4.5 h-4.5 bg-market-green rounded-full items-center justify-center border-2 border-white`}>
                            <Text style={tw`text-white text-[9px] font-bold`}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
                {/* Title & Download Receipt Header */}
                <View style={tw`px-4 my-2 flex-row items-center justify-between`}>
                    <View>
                        <Text style={tw`text-2xl font-extrabold text-gray-950`}>Order Details</Text>
                        <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Order ID: UM98374621</Text>
                    </View>

                    <TouchableOpacity style={tw`border border-market-green px-3.5 py-2 rounded-xl bg-white flex-row items-center gap-1.5 shadow-xs`}>
                        <Download size={14} color="#0A8A3A" />
                        <Text style={tw`text-market-green text-xs font-bold`}>Download Receipt</Text>
                    </TouchableOpacity>
                </View>

                {/* Delivered Status Banner */}
                <View style={tw`mx-4 my-2 bg-[#F0FDF4] rounded-2xl p-3.5 border border-market-green/20 flex-row items-center gap-3 shadow-xs`}>
                    <View style={tw`w-7 h-7 rounded-full bg-market-green items-center justify-center`}>
                        <Check size={16} color="white" strokeWidth={3} />
                    </View>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-xs font-bold text-market-green`}>Delivered</Text>
                        <Text style={tw`text-[10px] text-gray-500 font-medium mt-0.5`}>
                            Your order was delivered on 24 May 2025 at 10:32 AM
                        </Text>
                    </View>
                </View>

                {/* 5-Stage Stepper Progress Tracker */}
                <View style={tw`mx-4 my-3 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
                    <View style={tw`flex-row items-start justify-between`}>
                        {stepperStages.map((stage, idx) => (
                            <View key={stage.label} style={tw`items-center flex-1 relative`}>
                                {/* Checkmark Badge */}
                                <View style={tw`w-10 h-10 rounded-2xl bg-emerald-100 items-center justify-center border border-emerald-200 relative`}>
                                    {stage.icon === 'wallet' && <Wallet size={18} color="#0A8A3A" />}
                                    {stage.icon === 'store' && <Store size={18} color="#0A8A3A" />}
                                    {stage.icon === 'box' && <Package size={18} color="#0A8A3A" />}
                                    {stage.icon === 'truck' && <Truck size={18} color="#0A8A3A" />}
                                    {stage.icon === 'home' && <Home size={18} color="#0A8A3A" />}

                                    <View style={tw`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-market-green items-center justify-center border border-white`}>
                                        <Check size={10} color="white" strokeWidth={3} />
                                    </View>
                                </View>

                                <Text style={tw`text-[10px] font-bold mt-2 text-center ${stage.active ? 'text-market-green' : 'text-gray-900'}`}>
                                    {stage.label}
                                </Text>
                                <Text style={tw`text-[8px] text-gray-400 font-semibold mt-0.5 text-center`}>
                                    {stage.time}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Delivery Address & Payment Method Summary Cards (Side-by-Side) */}
                <View style={tw`mx-4 my-2 flex-row gap-3`}>
                    {/* Left: Delivery Address */}
                    <View style={tw`flex-1 bg-white rounded-3xl border border-gray-100 p-3.5 shadow-xs justify-between`}>
                        <View>
                            <View style={tw`flex-row items-center gap-1.5 mb-2`}>
                                <MapPin size={16} color="#0A8A3A" />
                                <Text style={tw`text-xs font-bold text-gray-900`}>Delivery Address</Text>
                            </View>

                            <Text style={tw`text-[11px] font-bold text-gray-800 leading-4`}>
                                23 Adekunle Street, Yaba, Lagos
                            </Text>
                            <Text style={tw`text-[9px] text-gray-400 font-medium mt-0.5`}>Near Yaba Bus Stop</Text>
                            <Text style={tw`text-[9px] text-gray-500 font-semibold mt-1`}>
                                John Doe • 0803 123 4567
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => router.push('/(location)/map')} style={tw`mt-3`}>
                            <Text style={tw`text-xs font-bold text-market-green`}>View on Map</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Right: Payment Method & Total Paid */}
                    <View style={tw`flex-1 bg-white rounded-3xl border border-gray-100 p-3.5 shadow-xs justify-between`}>
                        <View>
                            <View style={tw`flex-row items-center gap-1.5 mb-2`}>
                                <Wallet size={16} color="#0A8A3A" />
                                <Text style={tw`text-xs font-bold text-gray-900`}>Payment Method</Text>
                            </View>

                            <Text style={tw`text-[11px] font-bold text-gray-800`}>useMarket Wallet</Text>
                            <Text style={tw`text-[9px] text-gray-400 font-medium mt-0.5`}>
                                Paid with Wallet Balance
                            </Text>
                        </View>

                        <View style={tw`mt-3`}>
                            <Text style={tw`text-[9px] text-gray-400 font-bold uppercase`}>Total Paid</Text>
                            <Text style={tw`text-base font-extrabold text-market-green mt-0.5`}>₦97,600</Text>
                        </View>
                    </View>
                </View>

                {/* Order Items List Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs`}>
                    <View style={tw`flex-row items-center justify-between mb-3`}>
                        <Text style={tw`text-sm font-bold text-gray-900`}>
                            Order Items <Text style={tw`text-xs font-semibold text-gray-400`}>({orderItems.length} items)</Text>
                        </Text>
                        <TouchableOpacity style={tw`flex-row items-center gap-0.5`}>
                            <Text style={tw`text-xs font-bold text-market-green`}>View Store</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`gap-3`}>
                        {orderItems.map((item) => (
                            <View key={item.id} style={tw`flex-row items-center justify-between pb-2.5 border-b border-gray-50 last:border-0 last:pb-0`}>
                                <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                                    <Image source={item.image} style={tw`w-12 h-12 rounded-xl border border-gray-100 bg-gray-50/50`} resizeMode="contain" />
                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-xs font-bold text-gray-900`} numberOfLines={1}>{item.name}</Text>
                                        <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{item.unit}</Text>
                                        <Text style={tw`text-xs font-bold text-market-green mt-0.5`}>{item.price}</Text>
                                    </View>
                                </View>

                                <View style={tw`items-end`}>
                                    <Text style={tw`text-[11px] text-gray-400 font-semibold`}>Qty: {item.qty}</Text>
                                    <Text style={tw`text-xs font-extrabold text-gray-950 mt-0.5`}>{item.total}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Order Summary Card */}
                <View style={tw`mx-4 my-2 bg-white rounded-3xl border border-gray-100 p-4 shadow-xs gap-2.5`}>
                    <Text style={tw`text-sm font-bold text-gray-900 mb-1`}>Order Summary</Text>

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-xs text-gray-500 font-medium`}>Subtotal (3 items)</Text>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦95,600</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Delivery Fee</Text>
                            <Info size={12} color="#9CA3AF" />
                        </View>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦1,500</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-xs text-gray-500 font-medium`}>Service Fee</Text>
                            <Info size={12} color="#9CA3AF" />
                        </View>
                        <Text style={tw`text-xs font-bold text-gray-900`}>₦500</Text>
                    </View>

                    <View style={tw`h-px bg-gray-100 w-full my-1`} />

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-base font-extrabold text-gray-950`}>Total Paid</Text>
                        <Text style={tw`text-xl font-extrabold text-market-green`}>₦97,600</Text>
                    </View>

                    {/* Savings Pill */}
                    <View style={tw`bg-[#F0FDF4] border border-market-green/20 rounded-xl p-2.5 flex-row items-center gap-2 mt-1`}>
                        <Tag size={14} color="#0A8A3A" />
                        <Text style={tw`text-xs font-bold text-market-green`}>You saved ₦11,000 on this order</Text>
                    </View>
                </View>

                {/* Quick Action Grid (4 Buttons Row) */}
                <View style={tw`px-4 my-2 flex-row items-center gap-2`}>
                    <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3 rounded-2xl flex-row items-center justify-center gap-1 bg-white shadow-xs`}>
                        <RefreshCw size={13} color="#171717" />
                        <Text style={tw`text-[10px] font-bold text-gray-800`}>Reorder</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3 rounded-2xl flex-row items-center justify-center gap-1 bg-white shadow-xs`}>
                        <Share2 size={13} color="#171717" />
                        <Text style={tw`text-[10px] font-bold text-gray-800`}>Share Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3 rounded-2xl flex-row items-center justify-center gap-1 bg-white shadow-xs`}>
                        <Headphones size={13} color="#171717" />
                        <Text style={tw`text-[10px] font-bold text-gray-800`}>Contact Support</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`flex-1 border border-gray-200 py-3 rounded-2xl flex-row items-center justify-center gap-1 bg-white shadow-xs`}>
                        <AlertTriangle size={13} color="#171717" />
                        <Text style={tw`text-[10px] font-bold text-gray-800`}>Report Issue</Text>
                    </TouchableOpacity>
                </View>

                {/* 100% Secure Shopping Banner */}
                <TouchableOpacity style={tw`mx-4 my-3 bg-[#F0FDF4] rounded-2xl p-4 border border-market-green/20 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center gap-3.5 flex-1 pr-2`}>
                        <View style={tw`w-10 h-10 rounded-full bg-market-green items-center justify-center`}>
                            <ShieldCheck size={20} color="white" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-xs font-bold text-gray-900`}>100% Secure Shopping</Text>
                            <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>
                                All your transactions are safe and protected
                            </Text>
                        </View>
                    </View>

                    <ChevronRight size={18} color="#9CA3AF" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}