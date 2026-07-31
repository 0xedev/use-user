import { customerApi } from '@/lib/api/customer';
import { firstFrom, useApiResource } from '@/lib/api/hooks';
import { apiSession } from '@/lib/api/session';
import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import { Bell, ChevronRight, HelpCircle, LogOut, MapPin, Settings, ShoppingBag, Wallet } from 'lucide-react-native';
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const router = useRouter();
  const resource = useApiResource(async () => {
    const [me, orders, wallet, sessions] = await Promise.all([
      customerApi.me(),
      customerApi.orders({ limit: 4 }).catch(() => null),
      customerApi.wallet().catch(() => null),
      customerApi.sessions().catch(() => null),
    ]);
    return { me, orders, wallet, sessions };
  }, []);
  const me: any = firstFrom(resource.data?.me) || {};
  const wallet: any = firstFrom(resource.data?.wallet) || {};
  const name = me.fullName || me.name || [me.firstName, me.lastName].filter(Boolean).join(' ') || 'useMarket customer';
  const initials = name.split(' ').map((part: string) => part[0]).join('').slice(0, 2).toUpperCase();

  async function logout() {
    try {
      const sessions: any[] = Array.isArray(resource.data?.sessions) ? resource.data!.sessions as any[] : (resource.data?.sessions as any)?.items || [];
      await Promise.allSettled(sessions.map((session: any) => customerApi.revokeSession(session.id)));
      await apiSession.clearAll();
      router.replace('/(auth)/welcome');
    } catch (error: any) {
      Alert.alert('Logout failed', error?.message || 'Please try again.');
    }
  }

  return <SafeAreaView style={tw`flex-1 bg-white`}>
    <View style={tw`px-4 py-3 flex-row justify-between items-center border-b border-gray-100`}><View><Text style={tw`text-2xl font-bold`}>Account</Text><Text style={tw`text-xs text-gray-400 mt-0.5`}>Manage your profile and preferences</Text></View><TouchableOpacity onPress={() => router.push('/settings' as any)} style={tw`w-10 h-10 rounded-full bg-emerald-50 items-center justify-center`}><Settings size={18} color="#0A8A3A" /></TouchableOpacity></View>

    <ScrollView refreshControl={<RefreshControl refreshing={resource.loading} onRefresh={resource.reload} />} contentContainerStyle={tw`pb-10`}>
      {resource.error && <TouchableOpacity onPress={resource.reload} style={tw`mx-4 mt-4 p-4 bg-red-50 rounded-2xl`}><Text style={tw`text-red-600 font-bold`}>{resource.error}</Text></TouchableOpacity>}

      <TouchableOpacity onPress={() => router.push('/profile' as any)} style={tw`mx-4 mt-4 border border-gray-100 rounded-3xl p-5 flex-row items-center`}><View style={tw`w-14 h-14 rounded-full bg-emerald-50 border-2 border-market-green items-center justify-center`}><Text style={tw`text-xl font-bold text-market-green`}>{initials}</Text></View><View style={tw`flex-1 ml-4`}><Text style={tw`text-base font-bold`}>{name}</Text><Text style={tw`text-xs text-gray-400 mt-1`}>{me.phone || me.phoneNumber || 'No phone number'}</Text><Text style={tw`text-xs text-gray-400 mt-1`}>{me.email || 'No email address'}</Text></View><ChevronRight size={18} color="#737373" /></TouchableOpacity>

      <View style={tw`mx-4 mt-4 bg-market-green rounded-3xl p-5`}><Text style={tw`text-white/70 text-xs`}>Wallet balance</Text><Text style={tw`text-white text-3xl font-extrabold mt-1`}>{typeof wallet.balance === 'number' ? `₦${wallet.balance.toLocaleString('en-NG')}` : wallet.balance || '₦0'}</Text><TouchableOpacity onPress={() => router.push('/(tabs)/wallet')} style={tw`mt-4 bg-white self-start px-4 py-2 rounded-xl`}><Text style={tw`text-market-green font-bold text-xs`}>Open wallet</Text></TouchableOpacity></View>

      <View style={tw`mx-4 mt-6 gap-3`}>
        <Menu icon={<ShoppingBag size={19} color="#0A8A3A" />} label="My Orders" desc="Track, cancel, reorder and request refunds" onPress={() => router.push('/(tabs)/orders')} />
        <Menu icon={<MapPin size={19} color="#0A8A3A" />} label="Saved Addresses" desc="Manage delivery locations" onPress={() => router.push('/(location)/saved')} />
        <Menu icon={<Wallet size={19} color="#0A8A3A" />} label="Wallet" desc="Balance and transaction history" onPress={() => router.push('/(tabs)/wallet')} />
        <Menu icon={<Bell size={19} color="#0A8A3A" />} label="Notifications" desc="Order and account updates" onPress={() => router.push('/notifications' as any)} />
        <Menu icon={<HelpCircle size={19} color="#0A8A3A" />} label="Help & Support" desc="Create a support request" onPress={() => router.push('/support' as any)} />
      </View>

      <TouchableOpacity onPress={logout} style={tw`mx-4 mt-6 border border-red-200 bg-red-50 py-4 rounded-2xl flex-row justify-center items-center gap-2`}><LogOut size={17} color="#EF4444" /><Text style={tw`text-red-500 font-bold`}>Log out</Text></TouchableOpacity>
    </ScrollView>
  </SafeAreaView>;
}

function Menu({ icon, label, desc, onPress }: { icon: React.ReactNode; label: string; desc: string; onPress: () => void }) {
  return <TouchableOpacity onPress={onPress} style={tw`border border-gray-100 rounded-2xl p-4 flex-row items-center`}><View style={tw`w-10 h-10 rounded-full bg-emerald-50 items-center justify-center`}>{icon}</View><View style={tw`flex-1 ml-3`}><Text style={tw`font-bold`}>{label}</Text><Text style={tw`text-xs text-gray-400 mt-1`}>{desc}</Text></View><ChevronRight size={17} color="#737373" /></TouchableOpacity>;
}
