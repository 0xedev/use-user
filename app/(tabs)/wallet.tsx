import { customerApi } from '@/lib/api/customer';
import { firstFrom, listFrom, money, useApiResource } from '@/lib/api/hooks';
import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, Eye, EyeOff, RefreshCw, Wallet } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletScreen() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [history, setHistory] = useState(false);
  const resource = useApiResource(async () => {
    const [wallet, entries] = await Promise.all([customerApi.wallet(), customerApi.walletEntries({ limit: 100 })]);
    return { wallet, entries };
  }, []);
  const wallet: any = firstFrom(resource.data?.wallet) || {};
  const entries = useMemo(() => listFrom<any>(resource.data?.entries), [resource.data]);

  return <SafeAreaView style={tw`flex-1 bg-white`}>
    <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-100`}>
      <View style={tw`flex-row items-center gap-3`}>{history && <TouchableOpacity onPress={() => setHistory(false)}><ArrowLeft size={22} /></TouchableOpacity>}<View><Text style={tw`text-2xl font-bold`}>{history ? 'Transaction History' : 'Wallet'}</Text><Text style={tw`text-xs text-gray-400 mt-0.5`}>{history ? 'All wallet movements' : 'Balance and transactions'}</Text></View></View>
      {!history && <TouchableOpacity onPress={() => setHistory(true)} style={tw`flex-row items-center gap-1 bg-emerald-50 px-3 py-2 rounded-full`}><Clock size={14} color="#0A8A3A" /><Text style={tw`text-xs font-bold text-market-green`}>History</Text></TouchableOpacity>}
    </View>

    {resource.loading && !resource.data ? <ActivityIndicator color="#0A8A3A" style={tw`mt-20`} /> : <ScrollView refreshControl={<RefreshControl refreshing={resource.loading} onRefresh={resource.reload} />} contentContainerStyle={tw`pb-10`}>
      {resource.error && <TouchableOpacity onPress={resource.reload} style={tw`mx-4 mt-4 p-4 bg-red-50 rounded-2xl flex-row gap-2`}><RefreshCw size={16} color="#DC2626" /><Text style={tw`text-red-600 font-bold flex-1`}>{resource.error}</Text></TouchableOpacity>}

      {!history && <>
        <View style={tw`mx-4 mt-4 bg-market-green rounded-3xl p-5`}><View style={tw`flex-row justify-between`}><View><Text style={tw`text-white/70 text-xs`}>Available balance</Text><View style={tw`flex-row items-center gap-2 mt-2`}><Text style={tw`text-white text-3xl font-extrabold`}>{showBalance ? money(wallet.availableBalance ?? wallet.balance) : '••••••'}</Text><TouchableOpacity onPress={() => setShowBalance(v => !v)}>{showBalance ? <EyeOff size={17} color="white" /> : <Eye size={17} color="white" />}</TouchableOpacity></View></View><View style={tw`w-10 h-10 bg-white/20 rounded-full items-center justify-center`}><Wallet size={18} color="white" /></View></View><Text style={tw`text-white/60 text-xs mt-4`}>Wallet ID: {wallet.id || wallet.reference || '—'}</Text></View>
        <View style={tw`px-4 mt-6`}><Text style={tw`text-base font-bold mb-3`}>Recent transactions</Text>{entries.slice(0, 5).map((entry: any) => <Txn key={entry.id} entry={entry} />)}{entries.length === 0 && <Text style={tw`text-gray-400 text-center py-10`}>No wallet activity yet.</Text>}<TouchableOpacity onPress={() => setHistory(true)} style={tw`mt-4 border border-market-green py-3 rounded-xl items-center`}><Text style={tw`text-market-green font-bold`}>View all transactions</Text></TouchableOpacity></View>
      </>}

      {history && <View style={tw`px-4 mt-4 gap-3`}>{entries.map((entry: any) => <Txn key={entry.id} entry={entry} />)}{entries.length === 0 && <Text style={tw`text-gray-400 text-center py-20`}>No transactions found.</Text>}</View>}
    </ScrollView>}
  </SafeAreaView>;
}

function Txn({ entry }: { entry: any }) {
  const amount = Number(entry.amount || 0);
  const positive = amount >= 0 || ['credit', 'refund', 'cashback'].includes(String(entry.type || '').toLowerCase());
  return <View style={tw`border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between mb-3`}><View style={tw`flex-row items-center gap-3 flex-1`}><View style={tw`w-10 h-10 rounded-full ${positive ? 'bg-emerald-50' : 'bg-red-50'} items-center justify-center`}><Text>{positive ? '↓' : '↑'}</Text></View><View style={tw`flex-1`}><Text style={tw`font-bold text-sm`}>{entry.title || entry.description || String(entry.type || 'Wallet transaction')}</Text><Text style={tw`text-[10px] text-gray-400 mt-1`}>{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : ''}</Text></View></View><Text style={tw`font-extrabold ${positive ? 'text-market-green' : 'text-red-500'}`}>{money(entry.amount)}</Text></View>;
}
