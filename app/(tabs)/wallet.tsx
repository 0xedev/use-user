import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  HelpCircle,
  Landmark,
  Lock,
  Percent,
  Plus,
  Receipt,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletScreen() {
  const router = useRouter();

  // Navigation State Machine: 
  // 'dashboard' (Primary) | 'history' (Log List) | 'filter' (Modal config) | 'add_money' (Input card) | 'add_success' | 'payment_success' | 'details' (Metadata log)
  const [currentView, setCurrentView] = useState<'dashboard' | 'history' | 'filter' | 'add_money' | 'add_success' | 'payment_success' | 'details'>('dashboard');

  // Interactive toggle states
  const [showBalance, setShowBalance] = useState(true);
  const [activeFilterChip, setActiveFilterChip] = useState('All');
  const [addAmount, setAddAmount] = useState('1,000');
  const [selectedFunding, setSelectedFunding] = useState('upi');
  const [filterApplied, setFilterApplied] = useState(false);

  const [dateRange, setDateRange] = useState<'7' | '30' | 'custom'>('30');
  const [fromDate, setFromDate] = useState('01 Apr 2024');
  const [toDate, setToDate] = useState('12 May 2024');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Money In', 'Money Out', 'Payments', 'Offers', 'Refunds']);
  const [minAmount, setMinAmount] = useState('0');
  const [maxAmount, setMaxAmount] = useState('100000');

  // Simulated transaction detail target state
  const [activeTxn, setActiveTxn] = useState({
    id: 'UMW24052509411234',
    title: 'Order Payment',
    desc: 'Order ID: UM-78478932',
    date: '12 May 2024, 11:05 AM',
    amount: '-₦10,400',
    type: 'Payment',
    negative: true,
    bank: 'useMarket Wallet'
  });

  const recentTransactions = [
    { id: 'UM-78478932', title: 'Order Payment', desc: 'Order ID: UM-78478932', date: '12 May 2024, 11:05 AM', amount: '-₦10,400', type: 'Payment', negative: true, bank: 'useMarket Wallet' },
    { id: 'VISA-4242', title: 'Added Money', desc: 'From Visa •••• 4242', date: '08 May 2024, 09:30 AM', amount: '+₦5,000', type: 'Deposit', negative: false, bank: 'Visa Card' },
    { id: 'BILL-1000', title: 'Bill Payment', desc: 'Airtime Purchase', date: '05 May 2024, 04:15 PM', amount: '-₦1,000', type: 'Payment', negative: true, bank: 'MTN Airtime' },
    { id: 'UM-78399871', title: 'Cashback Received', desc: 'Order ID: UM-78399871', date: '03 May 2024, 02:20 PM', amount: '+₦250', type: 'Refund', negative: false, bank: 'useMarket Wallet' },
  ];

  const handleTransactionPress = (txn: any) => {
    setActiveTxn(txn);
    setCurrentView('details');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* ----------------- HEADER AREA ----------------- */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-100`}>
        <View style={tw`flex-row items-center gap-3`}>
          {currentView !== 'dashboard' && (
            <TouchableOpacity onPress={() => {
              if (currentView === 'filter') setCurrentView('history');
              else if (currentView === 'add_success') setCurrentView('dashboard');
              else if (currentView === 'payment_success') setCurrentView('dashboard');
              else if (currentView === 'details') setCurrentView('history');
              else setCurrentView('dashboard');
            }}>
              <ArrowLeft size={24} color="#171717" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={tw`text-2xl font-bold text-gray-900`}>
              {currentView === 'dashboard' && 'Wallet'}
              {currentView === 'history' && 'Transaction History'}
              {currentView === 'filter' && 'Filter Transactions'}
              {currentView === 'add_money' && 'Add Money'}
              {currentView === 'add_success' && 'Success!'}
              {currentView === 'payment_success' && 'Wallet Payment'}
              {currentView === 'details' && 'Transaction Details'}
            </Text>
            <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>
              {currentView === 'dashboard' && 'Manage your payments, balance & offers'}
              {currentView === 'history' && 'Track all your wallet transactions'}
              {currentView === 'filter' && 'Refine your search'}
              {currentView === 'add_money' && 'Add funds to your useMarket wallet'}
              {currentView === 'add_success' && 'Money Added Successfully!'}
              {currentView === 'payment_success' && 'Payment successful'}
              {currentView === 'details' && 'View detailed information about this transaction'}
            </Text>
          </View>
        </View>

        {currentView === 'dashboard' && (
          <TouchableOpacity onPress={() => setCurrentView('history')} style={tw`flex-row items-center gap-1 bg-[#F2FBF6] px-3.5 py-2 rounded-full border border-market-green/10`}>
            <Clock size={14} color="#0A8A3A" />
            <Text style={tw`text-xs text-market-green font-bold`}>History</Text>
          </TouchableOpacity>
        )}

        {currentView === 'history' && (
          <View style={tw`flex-row items-center gap-2.5`}>
            <TouchableOpacity onPress={() => setCurrentView('filter')} style={tw`flex-row items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl`}><SlidersHorizontal size={14} color="#0A8A3A" /><Text style={tw`text-xs text-market-green font-bold`}>Filter</Text></TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl`}><Download size={14} color="#0A8A3A" /><Text style={tw`text-xs text-market-green font-bold`}>Download</Text></TouchableOpacity>
          </View>
        )}
      </View>

      {/* ----------------- 1. WALLET PRIMARY DASHBOARD (Screenshot 1) ----------------- */}
      {currentView === 'dashboard' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
          {/* Balance Card Block */}
          <View style={tw`mx-4 mt-4 bg-market-green rounded-2xl p-4 relative overflow-hidden shadow-md`}>
            {/* Top row */}
            <View style={tw`flex-row justify-between items-start`}>
              <View>
                <Text style={tw`text-white/70 text-[10px] font-semibold uppercase tracking-widest`}>useMarket Wallet</Text>
                <Text style={tw`text-white/50 text-[9px] font-medium`}>Available Balance</Text>
              </View>
              <View style={tw`bg-white/20 rounded-full w-7 h-7 items-center justify-center`}>
                <Wallet size={14} color="white" />
              </View>
            </View>

            {/* Balance */}
            <View style={tw`flex-row items-baseline gap-1.5 mt-1.5`}>
              <Text style={tw`text-white text-[10px] font-semibold opacity-70`}>₦</Text>
              <Text style={tw`text-white text-3xl font-extrabold tracking-tight`}>
                {showBalance ? '4,250.00' : '••••••'}
              </Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)} style={tw`ml-0.5`}>
                {showBalance ? <EyeOff size={16} color="rgba(255,255,255,0.6)" /> : <Eye size={16} color="rgba(255,255,255,0.6)" />}
              </TouchableOpacity>
            </View>

            {/* Card Number-like info */}
            <View style={tw`flex-row items-center gap-3 mt-2.5`}>
              <View>
                <Text style={tw`text-white/40 text-[8px] font-semibold uppercase`}>Wallet ID</Text>
                <Text style={tw`text-white/60 text-[10px] font-bold`}>UMW •••• 4532</Text>
              </View>
              <View style={tw`w-px h-5 bg-white/20`} />
              <View>
                <Text style={tw`text-white/40 text-[8px] font-semibold uppercase`}>Cashback</Text>
                <Text style={tw`text-white/60 text-[10px] font-bold`}>₦340 earned</Text>
              </View>
            </View>

            {/* Actions row */}
            <View style={tw`flex-row gap-2 mt-3`}>
              <TouchableOpacity
                onPress={() => setCurrentView('add_money')}
                style={tw`flex-1 bg-white rounded-lg py-2 items-center flex-row justify-center gap-1`}
              >
                <Plus size={12} color="#0A8A3A" />
                <Text style={tw`text-market-green text-[11px] font-bold`}>Add Money</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`border border-white/30 bg-white/10 rounded-lg px-3 py-2 items-center flex-row justify-center gap-1`}
              >
                <ArrowUpRight size={12} color="white" />
                <Text style={tw`text-white text-[11px] font-bold`}>Send</Text>
              </TouchableOpacity>
            </View>

            {/* Decorative elements */}
            <View style={tw`absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/5`} />
            <View style={tw`absolute -right-2 -bottom-10 w-24 h-24 rounded-full bg-white/5`} />
          </View>

          {/* Quick Action Rows */}
          <View style={tw`flex-row justify-around mx-4 mt-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm`}>
            <TouchableOpacity onPress={() => setCurrentView('add_money')} style={tw`items-center gap-1 flex-1`}><Plus size={20} color="#0A8A3A" /><Text style={tw`text-[11px] font-bold text-gray-700`}>Add Money</Text></TouchableOpacity>
            <View style={tw`w-px h-8 bg-gray-200 self-center`} />
            <TouchableOpacity style={tw`items-center gap-1 flex-1`}><ArrowUpRight size={20} color="#0A8A3A" /><Text style={tw`text-[11px] font-bold text-gray-700`}>Send Money</Text></TouchableOpacity>
            <View style={tw`w-px h-8 bg-gray-200 self-center`} />
            <TouchableOpacity style={tw`items-center gap-1 flex-1`}><Receipt size={18} color="#0A8A3A" /><Text style={tw`text-[11px] font-bold text-gray-700`}>Pay Bills</Text></TouchableOpacity>
            <View style={tw`w-px h-8 bg-gray-200 self-center`} />
            <TouchableOpacity style={tw`items-center gap-1 flex-1`}><Percent size={18} color="#0A8A3A" /><Text style={tw`text-[11px] font-bold text-gray-700`}>My Offers</Text></TouchableOpacity>
          </View>

          {/* Saved Payment Methods Section */}
          <View style={tw`mx-4 mt-6`}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <Text style={tw`text-base font-bold text-gray-900`}>Saved Payment Methods</Text>
              <TouchableOpacity style={tw`flex-row items-center`}><Text style={tw`text-xs text-market-green font-bold`}>Manage</Text><ChevronRight size={14} color="#0A8A3A" /></TouchableOpacity>
            </View>

            {/* Visa */}
            <View style={tw`flex-row items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white mb-3 shadow-sm`}>
              <View style={tw`flex-row items-center gap-3`}>
                <View style={tw`w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100`}><Text style={tw`text-xs font-bold text-blue-900`}>VISA</Text></View>
                <View>
                  <Text style={tw`text-sm font-bold text-gray-900`}>Visa •••• 4242</Text>
                  <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>Expires 04/26</Text>
                </View>
              </View>
              <View style={tw`bg-[#F2FBF6] px-2.5 py-1 rounded-lg border border-market-green/20`}><Text style={tw`text-[10px] text-market-green font-bold`}>Default</Text></View>
            </View>

            {/* MasterCard */}
            <View style={tw`flex-row items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white mb-4 shadow-sm`}>
              <View style={tw`flex-row items-center gap-3`}>
                <View style={tw`w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100`}><Text style={tw`text-xs font-bold text-red-500`}>MC</Text></View>
                <View>
                  <Text style={tw`text-sm font-bold text-gray-900`}>Mastercard •••• 5678</Text>
                  <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>Expires 09/25</Text>
                </View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </View>

            {/* Add New Card Button */}
            <TouchableOpacity style={tw`border border-dashed border-market-green/40 py-3.5 rounded-2xl bg-[#F2FBF6]/30 items-center justify-center flex-row gap-2`}>
              <Plus size={16} color="#0A8A3A" />
              <Text style={tw`text-sm text-market-green font-bold`}>Add New Card</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Transactions List */}
          <View style={tw`mx-4 mt-6`}>
            <View style={tw`flex-row justify-between items-center mb-3.5`}>
              <Text style={tw`text-base font-bold text-gray-900`}>Recent Transactions</Text>
              <TouchableOpacity onPress={() => setCurrentView('history')} style={tw`flex-row items-center`}><Text style={tw`text-xs text-market-green font-bold`}>View All</Text><ChevronRight size={14} color="#0A8A3A" /></TouchableOpacity>
            </View>

            <View style={tw`gap-3`}>
              {recentTransactions.map((txn, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`flex-row items-center justify-between p-3.5 border border-gray-100 rounded-2xl bg-white shadow-sm`}
                  onPress={() => handleTransactionPress(txn)}
                >
                  <View style={tw`flex-row items-center gap-3 flex-1`}>
                    <View style={tw`w-10 h-10 rounded-full bg-gray-100 items-center justify-center`}>
                      {txn.negative ? <TrendingDown size={18} color="#EF4444" /> : <TrendingUp size={18} color="#0A8A3A" />}
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-sm font-bold text-gray-900`} numberOfLines={1}>{txn.title}</Text>
                      <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`} numberOfLines={1}>{txn.desc}  •  {txn.date}</Text>
                    </View>
                  </View>
                  <Text style={tw`text-sm font-bold ml-2 ${txn.negative ? 'text-gray-900' : 'text-market-green'}`}>{txn.amount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Promos / Support card */}
          <View style={tw`mx-4 mt-6 bg-[#F2FBF6] rounded-2xl p-4 flex-row items-center justify-between border border-market-green/20`}>
            <View style={tw`flex-row items-center gap-3`}>
              <Sparkles size={24} color="#0A8A3A" />
              <View>
                <Text style={tw`text-xs font-bold text-market-green`}>Save more with exclusive offers!</Text>
                <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>Check out latest deals & earn rewards.</Text>
              </View>
            </View>
            <TouchableOpacity style={tw`bg-market-green px-4 py-2 rounded-xl`}><Text style={tw`text-white text-xs font-bold`}>Explore Offers</Text></TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* ----------------- 2. TRANSACTION HISTORY LOGS (Screenshots 2 & 4) ----------------- */}
      {currentView === 'history' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
          {/* Active applied filter notice (Screenshot 4) */}
          {filterApplied && (
            <View style={tw`mx-4 mt-4 bg-market-green-light border border-market-green/20 rounded-2xl p-4 flex-row items-center justify-between`}>
              <View style={tw`flex-1 pr-2`}>
                <Text style={tw`text-xs font-bold text-market-green`}>Filter Applied</Text>
                <Text style={tw`text-[10px] text-gray-500 font-semibold mt-1`}>{fromDate} - {toDate}  •  {selectedTypes.length} types  •  ₦{minAmount} - ₦{maxAmount}</Text>
              </View>
              <TouchableOpacity onPress={() => setFilterApplied(false)}>
                <Text style={tw`text-xs text-red-500 font-bold`}>Clear All</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Wallet Balance widget inside history page */}
          <TouchableOpacity
            onPress={() => setCurrentView('details')}
            style={tw`mx-4 mt-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 flex-row justify-between items-center`}
          >
            <View>
              <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Wallet Balance</Text>
              <Text style={tw`text-xl font-bold text-market-green mt-1`}>₦4,250.00</Text>
            </View>
            <ChevronRight size={18} color="#0A8A3A" />
          </TouchableOpacity>

          {/* Horizontal Chips */}
          <View style={tw`px-4 py-3 flex-row gap-2`}>
            {['All', 'Money In', 'Money Out', 'Payments', 'Refunds'].map((chip) => {
              const isSelected = chip === activeFilterChip;
              return (
                <TouchableOpacity
                  key={chip}
                  onPress={() => setActiveFilterChip(chip)}
                  style={tw`px-4 py-2 rounded-full border ${isSelected ? 'bg-market-green border-market-green' : 'bg-white border-gray-200'}`}
                >
                  <Text style={tw`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-500'}`}>{chip}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Month Wise Log List */}
          <View style={tw`px-4`}>
            <Text style={tw`text-xs font-bold text-gray-900 mb-3`}>May 2024</Text>
            <View style={tw`gap-3`}>
              {recentTransactions.map((txn, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`flex-row items-center justify-between p-3.5 border border-gray-100 rounded-2xl bg-white shadow-sm`}
                  onPress={() => handleTransactionPress(txn)}
                >
                  <View style={tw`flex-row items-center gap-3 flex-1`}>
                    <View style={tw`w-10 h-10 rounded-full bg-gray-100 items-center justify-center`}>
                      {txn.negative ? <TrendingDown size={18} color="#EF4444" /> : <TrendingUp size={18} color="#0A8A3A" />}
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-sm font-bold text-gray-900`} numberOfLines={1}>{txn.title}</Text>
                      <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`} numberOfLines={1}>{txn.desc}  •  {txn.date}</Text>
                    </View>
                  </View>
                  <Text style={tw`text-xs font-bold ml-2 ${txn.negative ? 'text-gray-900' : 'text-market-green'}`}>{txn.amount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {/* ----------------- 3. FILTER TRANSACTIONS DRAWER (Screenshot 3) ----------------- */}
      {currentView === 'filter' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 px-4 pt-4`}>
          <Text style={tw`text-sm font-bold text-gray-900 mb-2.5`}>Date Range</Text>
          <View style={tw`flex-row gap-2 mb-4`}>
            {[
              { label: 'Last 7 Days', value: '7' as const },
              { label: 'Last 30 Days', value: '30' as const },
              { label: 'Custom', value: 'custom' as const },
            ].map((dr) => (
              <TouchableOpacity
                key={dr.value}
                onPress={() => setDateRange(dr.value)}
                style={tw`flex-1 py-3 rounded-xl border items-center ${dateRange === dr.value ? 'bg-market-green border-market-green' : 'border-gray-200 bg-white'}`}
              >
                <Text style={tw`text-xs font-bold ${dateRange === dr.value ? 'text-white' : 'text-gray-600'}`}>{dr.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* From / To inputs */}
          <View style={tw`flex-row gap-3 mb-5`}>
            <View style={tw`flex-1 gap-1.5`}>
              <Text style={tw`text-xs text-gray-400 font-bold`}>From Date</Text>
              <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-3.5 h-13`}><Calendar size={16} color="#0A8A3A" style={tw`mr-2`} /><Text style={tw`text-sm text-gray-900 font-semibold`}>01 Apr 2024</Text></View>
            </View>
            <View style={tw`flex-1 gap-1.5`}>
              <Text style={tw`text-xs text-gray-400 font-bold`}>To Date</Text>
              <View style={tw`flex-row items-center border border-gray-200 rounded-xl px-3.5 h-13`}><Calendar size={16} color="#0A8A3A" style={tw`mr-2`} /><Text style={tw`text-sm text-gray-900 font-semibold`}>12 May 2024</Text></View>
            </View>
          </View>

          {/* Transaction checkboxes */}
          <Text style={tw`text-sm font-bold text-gray-900 mb-3`}>Transaction Type</Text>
          {['Money In', 'Money Out', 'Payments', 'Offers', 'Refunds'].map((type) => {
            const isSelected = selectedTypes.includes(type);
            const toggleType = () => {
              setSelectedTypes(prev =>
                isSelected ? prev.filter(t => t !== type) : [...prev, type]
              );
            };
            return (
              <TouchableOpacity
                key={type}
                onPress={toggleType}
                style={tw`flex-row justify-between items-center py-3.5 border-b border-gray-50`}
              >
                <Text style={tw`text-xs font-semibold text-gray-700`}>{type}</Text>
                <View style={tw`w-5 h-5 rounded items-center justify-center ${isSelected ? 'bg-market-green' : 'border border-gray-300'}`}>
                  {isSelected && <Text style={tw`text-white text-[10px] font-bold`}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Range Inputs */}
          <Text style={tw`text-sm font-bold text-gray-900 mt-5 mb-3`}>Amount Range (Optional)</Text>
          <View style={tw`flex-row gap-3 items-center mb-6`}>
            <View style={tw`flex-1 gap-1`}>
              <Text style={tw`text-[10px] text-gray-400 font-bold`}>Min Amount</Text>
              <View style={tw`border border-gray-200 rounded-xl px-4 h-13 justify-center bg-white`}>
                <TextInput
                  style={tw`text-sm text-gray-900 font-bold`}
                  value={minAmount}
                  onChangeText={setMinAmount}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>
            <Text style={tw`text-gray-400 font-bold mt-4`}>—</Text>
            <View style={tw`flex-1 gap-1`}>
              <Text style={tw`text-[10px] text-gray-400 font-bold`}>Max Amount</Text>
              <View style={tw`border border-gray-200 rounded-xl px-4 h-13 justify-center bg-white`}>
                <TextInput
                  style={tw`text-sm text-gray-900 font-bold`}
                  value={maxAmount}
                  onChangeText={setMaxAmount}
                  keyboardType="numeric"
                  placeholder="100000"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>
          </View>

          {/* Action triggers */}
          <TouchableOpacity
            onPress={() => { setFilterApplied(true); setCurrentView('history'); }}
            style={tw`bg-market-green py-4 rounded-xl items-center mb-3 shadow-sm`}
          >
            <Text style={tw`text-white text-base font-semibold`}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentView('history')} style={tw`py-3 items-center`}><Text style={tw`text-sm text-gray-500 font-bold`}>Cancel</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 4. ADD MONEY INPUT CONFIGURATOR (Screenshot 6) ----------------- */}
      {currentView === 'add_money' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 px-4 pt-4`}>
          {/* Current balance block */}
          <View style={tw`bg-[#F2FBF6] rounded-2xl p-4 flex-row items-center gap-3 border border-market-green/20 mb-5`}>
            <View style={tw`w-10 h-10 rounded-full bg-market-green/10 items-center justify-center`}><Wallet size={20} color="#0A8A3A" /></View>
            <View>
              <Text style={tw`text-[10px] text-gray-400 font-semibold`}>Current Balance</Text>
              <Text style={tw`text-base font-bold text-gray-900 mt-0.5`}>₦4,250.00</Text>
            </View>
          </View>

          {/* Amount inputs */}
          <Text style={tw`text-sm font-bold text-gray-900 mb-2.5`}>Enter Amount</Text>
          <View style={tw`border border-market-green rounded-2xl px-4 py-3 bg-[#F2FBF6]/30`}>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`text-2xl font-bold text-gray-900`}>₦</Text>
              <TextInput
                style={tw`flex-1 text-2xl font-bold text-gray-900 h-11`}
                value={addAmount}
                onChangeText={setAddAmount}
                keyboardType="numeric"
              />
            </View>
            <Text style={tw`text-[10px] text-gray-400 font-semibold mt-1`}>Minimum amount: ₦100</Text>
          </View>

          {/* Quick Select pills */}
          <View style={tw`flex-row justify-between mt-4 mb-5`}>
            {['500', '1,000', '2,000', '5,000'].map((amt) => (
              <TouchableOpacity
                key={amt}
                onPress={() => setAddAmount(amt)}
                style={tw`px-4 py-2.5 rounded-xl border border-market-green/20 bg-[#F2FBF6]/40`}
              >
                <Text style={tw`text-xs text-market-green font-bold`}>+₦{amt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Funding Payment Radios */}
          <Text style={tw`text-sm font-bold text-gray-900 mb-3`}>Choose Funding Source</Text>
          <View style={tw`gap-3`}>
            {/* Cards option */}
            <TouchableOpacity
              onPress={() => setSelectedFunding('card')}
              style={tw`flex-row items-center gap-3 p-4 rounded-2xl border ${selectedFunding === 'card' ? 'border-market-green bg-[#F2FBF6]' : 'border-gray-200'}`}
            >
              <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${selectedFunding === 'card' ? 'border-market-green' : 'border-gray-300'}`}>
                {selectedFunding === 'card' && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
              </View>
              <CreditCard size={20} color="#0A8A3A" />
              <View style={tw`flex-1`}><Text style={tw`text-sm font-bold text-gray-900`}>Debit / Credit Card</Text><Text style={tw`text-xs text-gray-400 mt-0.5`}>Visa, Mastercard, Verve</Text></View>
            </TouchableOpacity>

            {/* Bank Option */}
            <TouchableOpacity
              onPress={() => setSelectedFunding('bank')}
              style={tw`flex-row items-center gap-3 p-4 rounded-2xl border ${selectedFunding === 'bank' ? 'border-market-green bg-[#F2FBF6]' : 'border-gray-200'}`}
            >
              <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${selectedFunding === 'bank' ? 'border-market-green' : 'border-gray-300'}`}>
                {selectedFunding === 'bank' && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
              </View>
              <Landmark size={20} color="#0A8A3A" />
              <View style={tw`flex-1`}><Text style={tw`text-sm font-bold text-gray-900`}>Net Banking</Text><Text style={tw`text-xs text-gray-400 mt-0.5`}>All major banks supported</Text></View>
            </TouchableOpacity>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity
            onPress={() => setCurrentView('add_success')}
            style={tw`bg-market-green py-4 rounded-xl items-center mt-6 shadow-sm flex-row justify-center gap-2`}
          >
            <Lock size={16} color="white" />
            <Text style={tw`text-white text-base font-semibold`}>Proceed to Pay ₦{addAmount}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 5. SUCCESS CONFIRMATION SHEETS (Screenshots 5 & 7) ----------------- */}
      {currentView === 'add_success' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-6 items-center`}>
          <View style={tw`w-20 h-24 rounded-full bg-[#F2FBF6] items-center justify-center mt-8 mb-4`}>
            <Text style={tw`text-4xl`}>✓</Text>
          </View>
          <Text style={tw`text-2xl font-bold text-gray-950 text-center`}>Money Added Successfully!</Text>
          <Text style={tw`text-xs text-gray-400 font-semibold text-center mt-1`}>Your wallet has been credited</Text>
          <Text style={tw`text-3xl font-extrabold text-market-green mt-3`}>₦{addAmount}.00</Text>

          {/* Metadata table card */}
          <View style={tw`w-full bg-white rounded-2xl border border-gray-100 p-5 mt-8 gap-3 shadow-sm`}>
            <View style={tw`flex-row justify-between items-center pb-2.5 border-b border-gray-50`}><Text style={tw`text-xs text-gray-400 font-semibold`}>Amount Added</Text><Text style={tw`text-xs font-bold text-gray-900`}>₦{addAmount}.00</Text></View>
            <View style={tw`flex-row justify-between items-center pb-2.5 border-b border-gray-50`}><Text style={tw`text-xs text-gray-400 font-semibold`}>Payment Method</Text><Text style={tw`text-xs font-bold text-gray-900`}>Visa Card</Text></View>
            <View style={tw`flex-row justify-between items-center`}><Text style={tw`text-xs text-gray-400 font-semibold`}>Transaction ID</Text><Text style={tw`text-xs font-bold text-gray-900`}>UMW24052509411234</Text></View>
          </View>

          {/* Action triggers */}
          <TouchableOpacity onPress={() => setCurrentView('dashboard')} style={tw`w-full bg-market-green py-4 rounded-xl items-center mt-8 shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Back to Wallet</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentView('history')} style={tw`w-full border border-gray-200 py-3.5 rounded-xl items-center mt-3 bg-white`}><Text style={tw`text-gray-500 text-sm font-semibold`}>View Transaction History</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 6. POST TRANSACTION LOG DETAILS VIEW (Screenshot 8) ----------------- */}
      {currentView === 'details' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-4 pb-8`}>
          <View style={tw`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm items-center`}>
            <View style={tw`w-14 h-14 rounded-full bg-market-green/10 items-center justify-center mb-3`}><FileText size={24} color="#0A8A3A" /></View>
            <Text style={tw`text-xs text-gray-400 font-bold`}>{activeTxn.title}</Text>
            <Text style={tw`text-2xl font-bold ${activeTxn.negative ? 'text-gray-900' : 'text-market-green'} mt-1`}>{activeTxn.amount}</Text>
            <View style={tw`bg-[#F2FBF6] border border-market-green/20 px-3 py-1 rounded-full mt-2`}><Text style={tw`text-[10px] text-market-green font-bold`}>Success</Text></View>

            <View style={tw`w-full mt-6 gap-3.5 border-t border-gray-100 pt-5`}>
              <View style={tw`flex-row justify-between items-center`}><Text style={tw`text-xs text-gray-400 font-semibold`}>Payment Method</Text><Text style={tw`text-xs font-bold text-gray-900`}>{activeTxn.bank}</Text></View>
              <View style={tw`flex-row justify-between items-center`}><Text style={tw`text-xs text-gray-400 font-semibold`}>Date & Time</Text><Text style={tw`text-xs font-bold text-gray-900`}>{activeTxn.date}</Text></View>
              <View style={tw`flex-row justify-between items-center`}><Text style={tw`text-xs text-gray-400 font-semibold`}>Transaction ID</Text><Text style={tw`text-xs font-bold text-gray-900`}>{activeTxn.id}</Text></View>
              <View style={tw`flex-row justify-between items-center`}><Text style={tw`text-xs text-gray-400 font-semibold`}>Reference ID</Text><Text style={tw`text-xs font-bold text-gray-900`}>412347892156</Text></View>
              <View style={tw`flex-row justify-between items-center`}><Text style={tw`text-xs text-gray-400 font-semibold`}>Note</Text><Text style={tw`text-xs font-bold text-gray-900`}>Money added to useMarket wallet</Text></View>
            </View>
          </View>

          {/* Help trigger */}
          <TouchableOpacity style={tw`bg-[#F2FBF6] rounded-2xl p-4 flex-row items-center justify-between border border-market-green/20 mt-4`}>
            <View style={tw`flex-row items-center gap-3`}>
              <HelpCircle size={22} color="#0A8A3A" />
              <Text style={tw`text-xs font-bold text-market-green`}>Need help with this transaction?</Text>
            </View>
            <ChevronRight size={16} color="#0A8A3A" />
          </TouchableOpacity>

          <View style={tw`flex-row gap-3 mt-5`}>
            <TouchableOpacity onPress={() => setCurrentView('dashboard')} style={tw`flex-1 border border-gray-200 py-3.5 rounded-xl bg-white items-center`}><Text style={tw`text-xs font-bold text-gray-700`}>Back to Wallet</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentView('history')} style={tw`flex-1 bg-market-green py-3.5 rounded-xl items-center shadow-sm`}><Text style={tw`text-xs font-bold text-white`}>View History</Text></TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}