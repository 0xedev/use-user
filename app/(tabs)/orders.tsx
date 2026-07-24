import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Headphones, 
  MoreVertical, 
  MapPin, 
  MessageSquare, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  Bell, 
  Star, 
  RotateCcw, 
  Check, 
  Search, 
  SlidersHorizontal, 
  Download, 
  Share2,
  Clock,
  Box,
  CheckCircle2,
  
} from 'lucide-react-native';
import tw from '@/lib/tw';

// Unified products mock data
const orderProducts = [
  { id: 1, name: 'Red Apples', qty: '1kg', price: '₦1,200', tag: 'Fresh', checked: true, quantity: 1, image: require('@/assets/images/prod-apple.png') },
  { id: 2, name: 'Cavendish Banana', qty: '1 bunch', price: '₦650', tag: 'Fresh', checked: true, quantity: 1, image: require('@/assets/images/prod-banana.png') },
  { id: 3, name: 'Farm Fresh Milk', qty: '1L', price: '₦1,250', tag: 'Chilled', checked: true, quantity: 1, image: require('@/assets/images/prod-milk.png') },
  { id: 4, name: 'Royal Stallion Parboiled Rice', qty: '5kg', price: '₦6,200', tag: 'Pantry', checked: true, quantity: 1, image: require('@/assets/images/prod-rice.png') },
];

export default function OrdersScreen() {
  const router = useRouter();

  // Screen level view: 'history' (Default Dashboard) | 'tracker' (Live Tracker) | 'details' (Past Details) | 'reorder' (Reorder Screen)
  const [currentView, setCurrentView] = useState<'history' | 'tracker' | 'details' | 'reorder'>('history');

  // Live Tracking state inside 'tracker' view
  const [trackingState, setTrackingState] = useState<'preparing' | 'on_the_way' | 'delivered'>('preparing');

  // Reorder items selection state
  const [reorderItems, setReorderItems] = useState(orderProducts);

  // Rating stars for delivery feedback
  const [rating, setRating] = useState(0);

  const toggleReorderCheck = (id: number) => {
    setReorderItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const updateReorderQty = (id: number, delta: number) => {
    setReorderItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header Navigation Bar */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-100`}>
        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity 
            onPress={() => {
              if (currentView === 'details') setCurrentView('history');
              else if (currentView === 'reorder') setCurrentView('details');
              else if (currentView === 'tracker') setCurrentView('history');
              else router.replace('/(tabs)');
            }}
          >
            <ArrowLeft size={24} color="#171717" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-base font-bold text-gray-900`}>
              {currentView === 'tracker' && 'Order Tracking'}
              {currentView === 'history' && 'My Orders'}
              {currentView === 'details' && 'Order Details'}
              {currentView === 'reorder' && 'Reorder Items'}
            </Text>
            <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Order ID: UM-78451236</Text>
          </View>
        </View>
        
        <View style={tw`flex-row gap-4`}>
          <TouchableOpacity style={tw`flex-row items-center gap-1`}>
            <Headphones size={18} color="#737373" />
            <Text style={tw`text-xs text-gray-500 font-semibold`}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MoreVertical size={20} color="#737373" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sub-Tabs Selector (Only shown on primary list and tracker states) */}
      {(currentView === 'tracker' || currentView === 'history') && (
        <View style={tw`flex-row px-4 py-3 gap-2 bg-gray-50/50 border-b border-gray-100`}>
          <TouchableOpacity 
            onPress={() => setCurrentView('tracker')}
            style={tw`flex-1 py-2.5 rounded-xl items-center ${currentView === 'tracker' ? 'bg-market-green shadow-sm' : 'bg-gray-100/60'}`}
          >
            <Text style={tw`text-xs font-bold ${currentView === 'tracker' ? 'text-white' : 'text-gray-500'}`}>Active Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setCurrentView('history')}
            style={tw`flex-1 py-2.5 rounded-xl items-center ${currentView === 'history' ? 'bg-market-green shadow-sm' : 'bg-gray-100/60'}`}
          >
            <Text style={tw`text-xs font-bold ${currentView === 'history' ? 'text-white' : 'text-gray-500'}`}>Past History</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ----------------- 1. ACTIVE LIVE TRACKER VIEW ----------------- */}
      {currentView === 'tracker' && (
        <View style={tw`flex-1`}>
          {/* Progress Stage Selector */}
          <View style={tw`flex-row bg-gray-100 px-4 py-1.5 gap-1.5 border-b border-gray-200/50`}>
            <TouchableOpacity onPress={() => setTrackingState('preparing')} style={tw`flex-1 py-1 rounded bg-white items-center border border-gray-200`}><Text style={tw`text-[9px] font-bold ${trackingState === 'preparing' ? 'text-market-green' : 'text-gray-400'}`}>1. Preparing</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setTrackingState('on_the_way')} style={tw`flex-1 py-1 rounded bg-white items-center border border-gray-200`}><Text style={tw`text-[9px] font-bold ${trackingState === 'on_the_way' ? 'text-market-green' : 'text-gray-400'}`}>2. On the way</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setTrackingState('delivered')} style={tw`flex-1 py-1 rounded bg-white items-center border border-gray-200`}><Text style={tw`text-[9px] font-bold ${trackingState === 'delivered' ? 'text-market-green' : 'text-gray-400'}`}>3. Delivered</Text></TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
            {/* Dynamic Status Banner */}
            {trackingState === 'preparing' && (
              <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between border border-market-green/20`}>
                <View style={tw`flex-1 pr-2`}><Text style={tw`text-sm font-bold text-market-green`}>Your order is being prepared</Text><Text style={tw`text-xs text-gray-500 mt-1 font-semibold`}>We're carefully picking and packing your items.</Text></View>
                <View style={tw`bg-market-green px-3 py-1 rounded-full`}><Text style={tw`text-[10px] text-white font-bold`}>Preparing</Text></View>
              </View>
            )}
            {trackingState === 'on_the_way' && (
              <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between border border-market-green/20`}>
                <View style={tw`flex-1 pr-2`}><Text style={tw`text-sm font-bold text-market-green`}>Out for Delivery!</Text><Text style={tw`text-xs text-gray-500 mt-1 font-semibold`}>Your order is on the way and will reach you soon.</Text></View>
                <View style={tw`bg-[#22C55E] px-3 py-1 rounded-full`}><Text style={tw`text-[10px] text-white font-bold`}>On the way</Text></View>
              </View>
            )}
            {trackingState === 'delivered' && (
              <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between border border-market-green/10`}>
                <View style={tw`flex-1 pr-2`}><Text style={tw`text-sm font-bold text-market-green`}>Delivered Successfully!</Text><Text style={tw`text-xs text-gray-500 mt-1 font-semibold`}>Your order has been delivered. We hope you enjoy it!</Text></View>
                <TouchableOpacity onPress={() => setCurrentView('details')} style={tw`bg-white border border-gray-200 px-3 py-1.5 rounded-xl flex-row items-center gap-1`}><Text style={tw`text-[10px] text-market-green font-bold`}>View details</Text><ChevronRight size={10} color="#0A8A3A" /></TouchableOpacity>
              </View>
            )}

            {/* Live Vector Tracking Map */}
            <View style={tw`mx-4 mt-4 h-56 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden relative shadow-sm`}>
              <View style={tw`absolute top-1/4 left-1/4 w-full h-0.5 bg-gray-200 rotate-12`} />
              <View style={tw`absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -rotate-6`} />

              <View style={tw`absolute left-8 top-12 items-center`}>
                <View style={tw`bg-white border border-gray-100 px-2 py-0.5 rounded shadow-sm`}><Text style={tw`text-[9px] font-bold text-gray-500`}>useMarket Store</Text></View>
                <View style={tw`w-7 h-7 rounded-full bg-market-green items-center justify-center border border-white mt-1`}><Text style={tw`text-white text-xs`}>🏢</Text></View>
              </View>

              <View style={tw`absolute right-12 bottom-12 items-center`}>
                <View style={tw`bg-white border border-gray-100 px-2 py-0.5 rounded shadow-sm`}><Text style={tw`text-[9px] font-bold text-gray-500`}>Your Location</Text></View>
                <View style={tw`w-7 h-7 rounded-full bg-[#22C55E] items-center justify-center border border-white mt-1`}><Text style={tw`text-white text-xs`}>🏠</Text></View>
              </View>

              {trackingState === 'preparing' && <View style={tw`absolute left-24 top-24 w-7 h-7 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md`}><Text style={tw`text-sm`}>🛵</Text></View>}
              {trackingState === 'on_the_way' && <View style={tw`absolute right-28 bottom-20 w-7 h-7 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md`}><Text style={tw`text-sm`}>🛵</Text></View>}
              {trackingState === 'delivered' && <View style={tw`absolute right-12 bottom-12 w-7 h-7 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md`}><Text style={tw`text-sm`}>🛵</Text></View>}

              <View style={tw`absolute bottom-3 left-3 bg-white border border-gray-100 rounded-xl p-2 shadow-sm`}>
                <Text style={tw`text-[9px] text-gray-400 font-semibold`}>Est. delivery time</Text>
                <Text style={tw`text-xs font-bold text-gray-900 mt-0.5`}>
                  {trackingState === 'preparing' && '20-30 mins'}
                  {trackingState === 'on_the_way' && '8 mins away'}
                  {trackingState === 'delivered' && 'Delivered (10:25 AM)'}
                </Text>
              </View>
            </View>

            {/* Stepper Timeline */}
            <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm`}>
              <Text style={tw`text-sm font-bold text-gray-900 mb-4`}>Order Progress</Text>
              <View style={tw`gap-4 pl-1`}>
                <View style={tw`flex-row gap-3 items-start`}>
                  <View style={tw`w-4.5 h-4.5 rounded-full bg-market-green items-center justify-center mt-0.5`}><Text style={tw`text-white text-[9px] font-bold`}>✓</Text></View>
                  <View style={tw`flex-1`}><Text style={tw`text-xs font-bold text-gray-900`}>Order Confirmed</Text><Text style={tw`text-[10px] text-gray-400 mt-0.5`}>Your order has been confirmed</Text></View>
                  <Text style={tw`text-[10px] text-gray-400 font-semibold`}>9:45 AM</Text>
                </View>

                <View style={tw`flex-row gap-3 items-start`}>
                  <View style={tw`w-4.5 h-4.5 rounded-full bg-market-green items-center justify-center mt-0.5`}><Text style={tw`text-white text-[9px] font-bold`}>✓</Text></View>
                  <View style={tw`flex-1`}><Text style={tw`text-xs font-bold text-gray-900`}>Preparing Your Order</Text><Text style={tw`text-[10px] text-gray-400 mt-0.5`}>We're carefully picking and packing your items</Text></View>
                  <Text style={tw`text-[10px] text-gray-400 font-semibold`}>9:46 AM</Text>
                </View>

                <View style={tw`flex-row gap-3 items-start`}>
                  <View style={tw`w-4.5 h-4.5 rounded-full ${trackingState === 'preparing' ? 'border-2 border-market-green bg-white' : 'bg-market-green'} items-center justify-center mt-0.5`}>
                    {trackingState !== 'preparing' && <Text style={tw`text-white text-[9px] font-bold`}>✓</Text>}
                  </View>
                  <View style={tw`flex-1`}><Text style={tw`text-xs font-bold ${trackingState !== 'preparing' ? 'text-gray-900' : 'text-gray-400'}`}>Out for Delivery</Text><Text style={tw`text-[10px] text-gray-400 mt-0.5`}>Your order is on the way</Text></View>
                  {trackingState !== 'preparing' && <Text style={tw`text-[10px] text-gray-400 font-semibold`}>10:05 AM</Text>}
                </View>

                <View style={tw`flex-row gap-3 items-start`}>
                  <View style={tw`w-4.5 h-4.5 rounded-full ${trackingState === 'delivered' ? 'bg-market-green' : 'bg-gray-100'} items-center justify-center mt-0.5`}>
                    {trackingState === 'delivered' && <Text style={tw`text-white text-[9px] font-bold`}>✓</Text>}
                  </View>
                  <View style={tw`flex-1`}><Text style={tw`text-xs font-bold ${trackingState === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>Delivered</Text><Text style={tw`text-[10px] text-gray-400 mt-0.5`}>Enjoy your order!</Text></View>
                  {trackingState === 'delivered' && <Text style={tw`text-[10px] text-market-green font-semibold`}>10:25 AM</Text>}
                </View>
              </View>
            </View>

            {/* 5-Star Feedback Row (delievered state) */}
            {trackingState === 'delivered' && (
              <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-3 flex-1`}>
                  <Image source={require('@/assets/images/grocery-bag-small.png')} style={tw`w-10 h-10`} resizeMode="contain" />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-xs font-bold text-gray-950`}>How was your delivery experience?</Text>
                    <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>Your feedback helps us improve.</Text>
                  </View>
                </View>
                <View style={tw`flex-row gap-0.5 ml-2`}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <TouchableOpacity key={s} onPress={() => setRating(s)}>
                      <Star size={16} color={s <= rating ? '#EAB308' : '#D4D4D4'} fill={s <= rating ? '#EAB308' : 'transparent'} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Delivery Partner */}
            <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center gap-3`}>
                <Image source={require('@/assets/images/grocery-bag-small.png')} style={tw`w-11 h-11 rounded-full border border-gray-100 bg-gray-50`} resizeMode="cover" />
                <View>
                  <Text style={tw`text-xs text-gray-400 font-semibold`}>Your Delivery Partner</Text>
                  <Text style={tw`text-sm font-bold text-gray-900 mt-0.5`}>Daniel E.</Text>
                  <Text style={tw`text-xs text-gray-500 font-semibold mt-0.5`}>⭐ 4.9 (512)</Text>
                </View>
              </View>
              
              {trackingState !== 'delivered' ? (
                <View style={tw`flex-row gap-2`}>
                  <TouchableOpacity style={tw`flex-row items-center gap-1 border border-market-green px-3 py-1.5 rounded-xl`}><MessageSquare size={13} color="#0A8A3A" /><Text style={tw`text-xs text-market-green font-bold`}>Chat</Text></TouchableOpacity>
                  <TouchableOpacity style={tw`flex-row items-center gap-1 border border-market-green px-3 py-1.5 rounded-xl`}><Phone size={13} color="#0A8A3A" /><Text style={tw`text-xs text-market-green font-bold`}>Call</Text></TouchableOpacity>
                </View>
              ) : (
                <View style={tw`items-end gap-1`}>
                  <Text style={tw`text-[10px] text-gray-400 font-bold`}>Thank you for tipping!</Text>
                  <View style={tw`bg-market-green-light border border-market-green/20 px-3 py-1 rounded-lg mt-1`}><Text style={tw`text-xs text-market-green font-bold`}>₦500</Text></View>
                </View>
              )}
            </View>

            {/* Order Items Accordion */}
            <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-4`}>
              <View style={tw`flex-row justify-between items-center mb-3`}>
                <Text style={tw`text-xs font-bold text-gray-900`}>Order Details</Text>
                <TouchableOpacity onPress={() => setCurrentView('details')} style={tw`flex-row items-center gap-0.5`}><Text style={tw`text-xs text-gray-400 font-bold`}>4 items</Text><ChevronRight size={14} color="#737373" /></TouchableOpacity>
              </View>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row items-center gap-2 flex-1`}>
                  <Image source={require('@/assets/images/prod-apple.png')} style={tw`w-10 h-10 rounded-lg`} resizeMode="cover" />
                  <Image source={require('@/assets/images/prod-banana.png')} style={tw`w-10 h-10 rounded-lg`} resizeMode="cover" />
                  <Image source={require('@/assets/images/prod-milk.png')} style={tw`w-10 h-10 rounded-lg`} resizeMode="cover" />
                  <Text style={tw`text-xs text-gray-400 font-bold ml-1`}>+1 more</Text>
                </View>
                <View style={tw`items-end ml-2`}>
                  <Text style={tw`text-sm font-bold text-gray-950`}>Total Paid: ₦8,950</Text>
                  <TouchableOpacity onPress={() => setCurrentView('details')} style={tw`flex-row items-center mt-1`}><Text style={tw`text-[10px] text-market-green font-bold`}>View Details</Text><ChevronRight size={12} color="#0A8A3A" style={tw`ml-0.5`} /></TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Continue Shopping Footer */}
            {trackingState === 'delivered' && (
              <TouchableOpacity 
                style={tw`mx-4 mt-2 bg-market-green h-13 rounded-xl items-center justify-center`}
                onPress={() => router.replace('/(tabs)')}
              >
                <Text style={tw`text-white text-base font-bold`}>Continue Shopping</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      )}

      {/* ----------------- 2. PAST ORDERS HISTORY LIST VIEW ----------------- */}
      {currentView === 'history' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4 gap-3`}>
          <TouchableOpacity 
            style={tw`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm`}
            onPress={() => setCurrentView('details')}
          >
            <View style={tw`flex-row justify-between items-center pb-3 border-b border-gray-100`}>
              <View>
                <Text style={tw`text-sm font-bold text-gray-950`}>Order UM-78451236</Text>
                <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>12 May 2024, 10:25 AM</Text>
              </View>
              <View style={tw`bg-[#F2FBF6] px-3 py-1 rounded-full`}><Text style={tw`text-[10px] text-market-green font-bold`}>Delivered</Text></View>
            </View>
            <View style={tw`flex-row justify-between items-center pt-3`}>
              <View style={tw`flex-row items-center gap-1.5`}>
                <Image source={require('@/assets/images/prod-apple.png')} style={tw`w-8 h-8 rounded-lg`} />
                <Image source={require('@/assets/images/prod-banana.png')} style={tw`w-8 h-8 rounded-lg`} />
                <Image source={require('@/assets/images/prod-milk.png')} style={tw`w-8 h-8 rounded-lg`} />
              </View>
              <TouchableOpacity onPress={() => setCurrentView('reorder')} style={tw`border border-market-green px-4 py-2 rounded-xl`}><Text style={tw`text-xs text-market-green font-bold`}>Reorder Items</Text></TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 3. HISTORICAL DETAILS VIEW (Screenshot 2) ----------------- */}
      {currentView === 'details' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
          <View style={tw`m-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between border border-market-green/20`}>
            <View>
              <Text style={tw`text-sm font-bold text-market-green`}>Delivered Successfully!</Text>
              <Text style={tw`text-xs text-gray-500 mt-1 font-semibold`}>Delivered on 12 May 2024, 11:05 AM</Text>
            </View>
            <TouchableOpacity onPress={() => setCurrentView('reorder')} style={tw`bg-white border border-gray-200 px-3 py-1.5 rounded-xl`}><Text style={tw`text-xs text-market-green font-bold`}>Reorder</Text></TouchableOpacity>
          </View>

          {/* Stepper checked timeline */}
          <View style={tw`mx-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex-row justify-between items-center`}>
            {['Confirmed', 'Preparing', 'On the way', 'Delivered'].map((label, idx) => (
              <View key={idx} style={tw`items-center flex-1`}>
                <View style={tw`w-5 h-5 rounded-full bg-market-green items-center justify-center`}><Text style={tw`text-white text-[10px] font-bold`}>✓</Text></View>
                <Text style={tw`text-[9px] font-bold text-market-green mt-1`}>{label}</Text>
              </View>
            ))}
          </View>

          {/* Delivery Address */}
          <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm`}>
            <Text style={tw`text-xs text-gray-400 font-bold mb-2`}>Delivery Address</Text>
            <View style={tw`flex-row gap-3`}>
              <MapPin size={18} color="#0A8A3A" style={tw`mt-0.5`} />
              <Text style={tw`text-xs text-gray-700 font-semibold leading-4`}>23 Greenway Street, Lekki Phase 1, Lagos</Text>
            </View>
          </View>

          {/* Items breakdown list */}
          <View style={tw`mx-4 mt-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm`}>
            <Text style={tw`text-xs font-bold text-gray-900 mb-2`}>Items (4)</Text>
            {orderProducts.map((p) => (
              <View key={p.id} style={tw`flex-row justify-between items-center py-2.5 border-b border-gray-100 last:border-0`}>
                <View style={tw`flex-row items-center gap-3 flex-1`}>
                  <Image source={p.image} style={tw`w-10 h-10 rounded-lg`} />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-xs font-bold text-gray-900`}>{p.name}</Text>
                    <Text style={tw`text-[10px] text-gray-400 mt-0.5`}>{p.qty}</Text>
                  </View>
                </View>
                <View style={tw`items-end ml-2`}>
                  <Text style={tw`text-xs text-gray-400 font-semibold`}>Qty: 1</Text>
                  <Text style={tw`text-xs font-bold text-gray-950 mt-1`}>{p.price}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Action buttons (Screenshot 6) */}
          <View style={tw`flex-row justify-between mx-4 mt-5 gap-2.5`}>
            <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center border border-gray-200 py-3 rounded-xl gap-2`}><Download size={14} color="#737373" /><Text style={tw`text-xs font-bold text-gray-700`}>Download Invoice</Text></TouchableOpacity>
            <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center border border-gray-200 py-3 rounded-xl gap-2`}><Headphones size={14} color="#737373" /><Text style={tw`text-xs font-bold text-gray-700`}>Need Help?</Text></TouchableOpacity>
            <TouchableOpacity style={tw`flex-1 flex-row items-center justify-center border border-gray-200 py-3 rounded-xl gap-2`}><Share2 size={14} color="#737373" /><Text style={tw`text-xs font-bold text-gray-700`}>Share Order</Text></TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* ----------------- 4. REORDER CONFIGURATOR VIEW ----------------- */}
      {currentView === 'reorder' && (
        <View style={tw`flex-1`}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-20`}>
            <View style={tw`m-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between border border-market-green/20`}>
              <View style={tw`flex-row items-center gap-3 flex-1 pr-2`}>
                <Text style={tw`text-2xl`}>🛍️</Text>
                <View>
                  <Text style={tw`text-xs font-bold text-market-green`}>Reorder from your last order</Text>
                  <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>Add items to cart and place order in a few taps.</Text>
                </View>
              </View>
              <TouchableOpacity style={tw`bg-market-green px-3.5 py-2 rounded-xl`}><Text style={tw`text-white text-xs font-bold`}>Select All</Text></TouchableOpacity>
            </View>

            <View style={tw`px-4 gap-4`}>
              {reorderItems.map((item) => (
                <View key={item.id} style={tw`flex-row gap-4 pb-4 border-b border-gray-100`}>
                  <Image source={item.image} style={tw`w-20 h-20 rounded-2xl`} resizeMode="cover" />
                  <View style={tw`flex-1 justify-between`}>
                    <View style={tw`flex-row justify-between items-start`}>
                      <View style={tw`flex-1 mr-2`}>
                        <Text style={tw`text-sm font-bold text-gray-900`}>{item.name}</Text>
                        <Text style={tw`text-xs text-gray-400 font-medium mt-0.5`}>{item.qty}</Text>
                        <View style={tw`bg-market-green-light self-start px-2 py-0.5 rounded mt-1 border border-market-green/20`}><Text style={tw`text-[10px] text-market-green font-bold`}>{item.tag}</Text></View>
                      </View>
                      
                      <TouchableOpacity 
                        onPress={() => toggleReorderCheck(item.id)}
                        style={tw`w-5 h-5 rounded border-2 items-center justify-center mt-1 ${item.checked ? 'border-market-green bg-market-green' : 'border-gray-300'}`}
                      >
                        {item.checked && <Check size={12} color="white" strokeWidth={4} />}
                      </TouchableOpacity>
                    </View>

                    <View style={tw`flex-row justify-between items-center mt-3`}>
                      <Text style={tw`text-sm font-bold text-gray-950`}>{item.price}</Text>
                      {item.checked && (
                        <View style={tw`flex-row items-center border border-gray-200 rounded-xl bg-gray-50/50`}>
                          <TouchableOpacity onPress={() => updateReorderQty(item.id, -1)} style={tw`px-3 py-1.5`}><Text style={tw`text-xs font-bold text-gray-600`}>-</Text></TouchableOpacity>
                          <Text style={tw`text-sm font-bold text-gray-950 px-2`}>{item.quantity}</Text>
                          <TouchableOpacity onPress={() => updateReorderQty(item.id, 1)} style={tw`px-3 py-1.5`}><Text style={tw`text-xs font-bold text-market-green`}>+</Text></TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Bottom fixed configuration checkout bar */}
          <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex-row items-center justify-between`}>
            <View>
              <Text style={tw`text-[10px] text-gray-400 font-semibold`}>4 items selected</Text>
              <Text style={tw`text-lg font-bold text-gray-950 mt-0.5`}>₦9,300</Text>
            </View>
            <TouchableOpacity 
              style={tw`bg-market-green px-6 h-12 rounded-xl flex-row items-center gap-1.5`}
              onPress={() => router.push('/cart')}
            >
              <Text style={tw`text-white text-sm font-bold`}>Add to Cart</Text>
              <ChevronRight size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}