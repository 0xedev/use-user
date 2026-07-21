import tw from '@/lib/tw';
import { useRouter } from 'expo-router';
import {
  Activity,
  ArrowLeft,
  Award,
  Bell,
  Box,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  CreditCard,
  Eye,
  EyeOff,
  FileDown,
  Globe,
  HelpCircle,
  Key,
  Layers,
  List,
  Lock,
  LogOut,
  MapPin,
  Settings as SettingsIcon,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  User,
  Users,
  Wallet
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const router = useRouter();

  // Root Navigation State:
  // 'account' (Dashboard) | 'settings' | 'profile_info' | 'security' | 'change_password' | 'password_success' 
  // 'privacy' | 'visibility' | 'activity_status' | 'analytics' | 'data_download' | 'delete_account' | 'cookies' | 'blocked' | 'account_activity'
  const [currentView, setCurrentView] = useState<'account' | 'settings' | 'profile_info' | 'security' | 'change_password' | 'password_success' | 'privacy' | 'visibility' | 'activity_status' | 'analytics' | 'data_download' | 'delete_account' | 'cookies' | 'blocked' | 'account_activity'>('account');

  // Interactive toggle states
  const [dataSaver, setDataSaver] = useState(false);
  const [marketingComms, setMarketingComms] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [visibilityRadio, setVisibilityRadio] = useState('registered');
  const [activityStatusRadio, setActivityStatusRadio] = useState('registered');

  // Input states
  const [fullName, setFullName] = useState('Adewale Ogunleye');
  const [phone, setPhone] = useState('+234 801 234 5678');
  const [email, setEmail] = useState('adewale.o@example.com');
  const [password, setPassword] = useState('');

  // Checklist states for Delete Account
  const [deleteCheck1, setDeleteCheck1] = useState(false);
  const [deleteCheck2, setDeleteCheck2] = useState(false);
  const [deleteCheck3, setDeleteCheck3] = useState(false);
  const [deleteCheck4, setDeleteCheck4] = useState(false);

  // Blocked users local state
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, name: 'Rohit Kumar', desc: 'Spam  •  May 12, 2024 at 10:30 AM' },
    { id: 2, name: 'Sneha Patel', desc: 'Inappropriate behavior  •  Apr 28, 2024' },
    { id: 3, name: 'Aman Verma', desc: 'Spam  •  Apr 15, 2024 at 02:45 PM' },
    { id: 4, name: 'Priya Singh', desc: 'Harassment  •  Mar 21, 2024 at 11:20 AM' },
    { id: 5, name: 'Vikram Joshi', desc: 'Fraudulent activity  •  Feb 10, 2024' },
  ]);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  const handleUnblock = (id: number) => {
    setBlockedUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <SafeAreaView style={tw`flex-grow bg-white`}>
      {/* Header bar */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between border-b border-gray-100`}>
        <View style={tw`flex-row items-center gap-3`}>
          {currentView !== 'account' && (
            <TouchableOpacity onPress={() => {
              if (currentView === 'settings') setCurrentView('account');
              else if (currentView === 'profile_info') setCurrentView('settings');
              else if (currentView === 'security') setCurrentView('settings');
              else if (currentView === 'account_activity') setCurrentView('security');
              else if (currentView === 'change_password') setCurrentView('security');
              else if (currentView === 'password_success') setCurrentView('security');
              else if (currentView === 'privacy') setCurrentView('settings');
              else if (currentView === 'visibility') setCurrentView('privacy');
              else if (currentView === 'activity_status') setCurrentView('privacy');
              else if (currentView === 'analytics') setCurrentView('privacy');
              else if (currentView === 'data_download') setCurrentView('privacy');
              else if (currentView === 'delete_account') setCurrentView('privacy');
              else if (currentView === 'cookies') setCurrentView('privacy');
              else if (currentView === 'blocked') setCurrentView('privacy');
            }}>
              <ArrowLeft size={24} color="#171717" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={tw`text-2xl font-bold text-gray-900`}>
              {currentView === 'account' && 'Account'}
              {currentView === 'settings' && 'Settings'}
              {currentView === 'profile_info' && 'Profile Information'}
              {currentView === 'security' && 'Security'}
              {currentView === 'change_password' && 'Change Password'}
              {currentView === 'password_success' && 'Change Password'}
              {currentView === 'privacy' && 'Privacy'}
              {currentView === 'visibility' && 'Profile Visibility'}
              {currentView === 'activity_status' && 'Activity Status'}
              {currentView === 'analytics' && 'Analytics & Personalization'}
              {currentView === 'data_download' && 'Data Download'}
              {currentView === 'delete_account' && 'Delete Account'}
              {currentView === 'cookies' && 'Cookies & Tracking'}
              {currentView === 'blocked' && 'Blocked Users'}
              {currentView === 'account_activity' && 'Account Activity'}
            </Text>
            <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>
              {currentView === 'account' && 'Manage your profile and preferences'}
              {currentView === 'settings' && 'Manage your app preferences and security'}
              {currentView === 'profile_info' && 'Update your personal details'}
              {currentView === 'security' && 'Manage password and security options'}
              {currentView === 'change_password' && 'Update your password to keep your account secure'}
              {currentView === 'password_success' && 'Password changed successfully'}
              {currentView === 'privacy' && 'Manage your privacy preferences'}
              {currentView === 'visibility' && 'Choose who can see your profile details'}
              {currentView === 'activity_status' && 'Show or hide your activity status'}
              {currentView === 'analytics' && 'Manage how we use your data to improve experience'}
              {currentView === 'data_download' && 'Download a copy of your personal data'}
              {currentView === 'delete_account' && 'Permanently delete your account and data'}
              {currentView === 'cookies' && 'Manage how cookies and tracking are used'}
              {currentView === 'blocked' && "Manage the users you've blocked on useMarket"}
              {currentView === 'account_activity' && 'Review recent activity on your account'}
            </Text>
          </View>
        </View>

        {currentView === 'account' && (
          <TouchableOpacity onPress={() => setCurrentView('settings')} style={tw`flex-row items-center gap-1.5 bg-[#F2FBF6] px-3.5 py-2 rounded-full border border-market-green/10`}>
            <SettingsIcon size={15} color="#0A8A3A" />
            <Text style={tw`text-xs text-market-green font-bold`}>Settings</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ----------------- 1. PRIMARY ACCOUNT DASHBOARD (Screenshot 1) ----------------- */}
      {currentView === 'account' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
          <TouchableOpacity
            onPress={() => { setCurrentView('settings'); setTimeout(() => setCurrentView('profile_info'), 100); }}
            style={tw`mx-4 mt-4 bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex-row items-center justify-between`}
          >
            <View style={tw`flex-row items-center gap-4`}>
              <View style={tw`w-14 h-14 rounded-full bg-market-green-light items-center justify-center border-2 border-market-green`}><Text style={tw`text-xl font-bold text-market-green`}>AO</Text></View>
              <View>
                <Text style={tw`text-base font-bold text-gray-900`}>{fullName}</Text>
                <Text style={tw`text-xs text-gray-400 font-medium mt-0.5`}>{phone}</Text>
                <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>{email}</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#737373" />
          </TouchableOpacity>

          <View style={tw`mx-4 mt-4 bg-market-green-light rounded-2xl p-4 flex-row items-center justify-between border border-market-green/10`}>
            <View style={tw`flex-row items-center gap-3`}>
              <Text style={tw`text-2xl`}>👑</Text>
              <View>
                <Text style={tw`text-xs font-bold text-market-green`}>useMarket Plus Member</Text>
                <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>You're saving more with free delivery.</Text>
              </View>
            </View>
            <TouchableOpacity style={tw`bg-market-green px-3.5 py-1.5 rounded-xl`}><Text style={tw`text-white text-xs font-bold`}>View Benefits</Text></TouchableOpacity>
          </View>

          <View style={tw`mx-4 mt-6`}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <Text style={tw`text-base font-bold text-gray-900`}>My Orders</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/orders')} style={tw`flex-row items-center`}><Text style={tw`text-xs text-market-green font-bold`}>View All Orders</Text><ChevronRight size={14} color="#0A8A3A" /></TouchableOpacity>
            </View>
            <View style={tw`flex-row justify-around py-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm`}>
              <TouchableOpacity onPress={() => router.push('/(tabs)/orders')} style={tw`items-center gap-1.5 flex-1`}><ShoppingBag size={18} color="#0A8A3A" /><Text style={tw`text-[10px] font-bold text-gray-700`}>All Orders</Text></TouchableOpacity>
              <View style={tw`w-px h-8 bg-gray-200 self-center`} />
              <TouchableOpacity onPress={() => router.push('/(tabs)/orders')} style={tw`items-center gap-1.5 flex-1`}><Box size={18} color="#0A8A3A" /><Text style={tw`text-[10px] font-bold text-gray-700`}>Processing</Text></TouchableOpacity>
              <View style={tw`w-px h-8 bg-gray-200 self-center`} />
              <TouchableOpacity onPress={() => router.push('/(tabs)/orders')} style={tw`items-center gap-1.5 flex-1`}><Truck size={18} color="#0A8A3A" /><Text style={tw`text-[10px] font-bold text-gray-700`}>Out for Delivery</Text></TouchableOpacity>
              <View style={tw`w-px h-8 bg-gray-200 self-center`} />
              <TouchableOpacity onPress={() => router.push('/(tabs)/orders')} style={tw`items-center gap-1.5 flex-1`}><CheckCircle2 size={18} color="#0A8A3A" /><Text style={tw`text-[10px] font-bold text-gray-700`}>Delivered</Text></TouchableOpacity>
            </View>
          </View>

          <View style={tw`mx-4 mt-6 gap-3`}>
            {[
              { id: 'addresses', label: 'Saved Addresses', desc: 'Manage your delivery addresses', icon: <MapPin size={20} color="#0A8A3A" />, route: '/(location)/saved' },
              { id: 'payment', label: 'Payment Methods', desc: 'Cards, wallets and more', icon: <CreditCard size={20} color="#0A8A3A" /> },
              { id: 'wallet', label: 'Wallet', desc: 'Balance, transactions and offers', icon: <Wallet size={20} color="#0A8A3A" />, route: '/(tabs)/wallet' },
              { id: 'lists', label: 'My Lists', desc: 'Your saved items and lists', icon: <List size={20} color="#0A8A3A" /> },
              { id: 'rewards', label: 'Rewards', desc: 'Points, badges and offers', icon: <Award size={20} color="#0A8A3A" />, badge: '90 points' },
              { id: 'coupons', label: 'Coupons', desc: 'Available coupons and deals', icon: <Tag size={18} color="#0A8A3A" />, badge: '5 available' },
              { id: 'notifications', label: 'Notifications', desc: 'Manage your notification preferences', icon: <Bell size={18} color="#0A8A3A" /> },
              { id: 'support', label: 'Help & Support', desc: 'FAQs, contact us and more', icon: <HelpCircle size={18} color="#0A8A3A" /> },
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  if (item.route) router.push(item.route as any);
                  else if (item.id === 'wallet') setCurrentView('settings');
                }}
                style={tw`flex-row items-center gap-3.5 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm`}
              >
                <View style={tw`w-10 h-10 rounded-full bg-market-green-light items-center justify-center`}>{item.icon}</View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-sm font-bold text-gray-900`}>{item.label}</Text>
                  <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>{item.desc}</Text>
                </View>
                {item.badge && <View style={tw`bg-market-green-light px-2.5 py-1 rounded-lg border border-market-green/20 mr-1`}><Text style={tw`text-[10px] text-market-green font-bold`}>{item.badge}</Text></View>}
                <ChevronRight size={16} color="#737373" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={() => router.replace('/(auth)/welcome')} style={tw`mx-4 mt-6 border border-red-200 bg-red-50/20 py-4 rounded-2xl items-center justify-center flex-row gap-2`}>
            <LogOut size={16} color="#EF4444" />
            <Text style={tw`text-red-500 text-sm font-bold`}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 2. SETTINGS PANEL VIEW (Screenshot 2) ----------------- */}
      {currentView === 'settings' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Account Settings</Text>
          <View style={tw`gap-3 mb-6`}>
            {[
              { label: 'Profile Information', desc: 'Update your personal details', icon: <User size={18} color="#0A8A3A" />, action: () => setCurrentView('profile_info') },
              { label: 'Security', desc: 'Manage password and security options', icon: <Lock size={18} color="#0A8A3A" />, action: () => setCurrentView('security') },
              { label: 'Privacy', desc: 'Manage your privacy preferences', icon: <ShieldCheck size={18} color="#0A8A3A" />, action: () => setCurrentView('privacy') },
            ].map((item, idx) => (
              <TouchableOpacity key={idx} onPress={item.action} style={tw`flex-row items-center gap-3.5 p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
                {item.icon}
                <View style={tw`flex-1`}>
                  <Text style={tw`text-sm font-bold text-gray-900`}>{item.label}</Text>
                  <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>{item.desc}</Text>
                </View>
                <ChevronRight size={16} color="#737373" />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Preferences</Text>
          <View style={tw`gap-3 mb-6`}>
            <View style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Globe size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Language</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Choose your preferred language</Text></View>
              </View>
              <View style={tw`bg-market-green-light border border-market-green/20 px-2 py-0.5 rounded`}><Text style={tw`text-[10px] text-market-green font-bold`}>English</Text></View>
            </View>

            <View style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Coins size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Data Saver</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Reduce data usage</Text></View>
              </View>
              <Switch value={dataSaver} onValueChange={setDataSaver} trackColor={{ false: '#E5E5E5', true: '#0A8A3A' }} thumbColor="#fff" />
            </View>
          </View>
        </ScrollView>
      )}

      {/* ----------------- 3. PROFILE EDITOR (Screenshot 3) ----------------- */}
      {currentView === 'profile_info' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Profile Picture</Text>
          <View style={tw`flex-row items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-5 shadow-sm`}>
            <View style={tw`w-14 h-14 rounded-full bg-market-green-light items-center justify-center border border-market-green/20`}><User size={24} color="#0A8A3A" /></View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm font-bold text-gray-900`}>{fullName}</Text>
              <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>{email}</Text>
            </View>
            <TouchableOpacity style={tw`bg-white border border-market-green/40 px-4 py-2 rounded-xl`}><Text style={tw`text-market-green text-xs font-bold`}>Change</Text></TouchableOpacity>
          </View>

          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Personal Details</Text>
          <View style={tw`gap-4`}>
            <View style={tw`gap-1.5`}><Text style={tw`text-xs text-gray-500 font-semibold`}>Full Name</Text><View style={tw`border border-gray-200 rounded-xl px-4 h-13 justify-center bg-gray-50/50`}><TextInput style={tw`text-sm text-gray-900 font-bold h-full`} value={fullName} onChangeText={setFullName} /></View></View>
            <View style={tw`gap-1.5`}><Text style={tw`text-xs text-gray-500 font-semibold`}>Phone Number</Text><View style={tw`border border-gray-200 rounded-xl px-4 h-13 justify-center bg-gray-50/50`}><TextInput style={tw`text-sm text-gray-900 font-bold h-full`} value={phone} onChangeText={setPhone} keyboardType="phone-pad" /></View></View>
            <View style={tw`gap-1.5`}><Text style={tw`text-xs text-gray-500 font-semibold`}>Email Address</Text><View style={tw`border border-gray-200 rounded-xl px-4 h-13 justify-center bg-gray-50/50`}><TextInput style={tw`text-sm text-gray-900 font-bold h-full`} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" /></View></View>
          </View>

          <TouchableOpacity onPress={() => setCurrentView('settings')} style={tw`bg-market-green py-4 rounded-xl items-center mt-6 shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Save Changes</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 4. SECURITY (Screenshot 4) ----------------- */}
      {currentView === 'security' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Security Overview</Text>
          <View style={tw`bg-market-green-light border border-market-green/20 rounded-2xl p-4 flex-row items-center gap-3.5 mb-6`}>
            <ShieldCheck size={24} color="#0A8A3A" />
            <View>
              <Text style={tw`text-sm font-bold text-market-green`}>Your account is secure</Text>
              <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>Last security check: Today, 09:30 AM</Text>
            </View>
          </View>

          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Login & Password</Text>
          <View style={tw`gap-3 mb-6`}>
            <TouchableOpacity onPress={() => setCurrentView('change_password')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Key size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Change Password</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Update your account password</Text></View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView('account_activity')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Clock size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Account Activity</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Review recent activity on your account</Text></View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* ----------------- 5. CHANGE PASSWORD (Screenshot 5) ----------------- */}
      {currentView === 'change_password' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <View style={tw`gap-4`}>
            <View style={tw`gap-1.5`}><Text style={tw`text-xs text-gray-500 font-semibold`}>Current Password</Text><View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13 bg-white`}><TextInput style={tw`flex-1 text-sm text-gray-900 h-full`} secureTextEntry={!showPassword} placeholder="Enter your current password" placeholderTextColor="#A3A3A3" /><TouchableOpacity onPress={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} color="#A3A3A3" /> : <Eye size={18} color="#A3A3A3" />}</TouchableOpacity></View></View>
            <View style={tw`gap-1.5`}><Text style={tw`text-xs text-gray-500 font-semibold`}>New Password</Text><View style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 h-13 bg-white`}><TextInput style={tw`flex-1 text-sm text-gray-900 h-full`} secureTextEntry={!showPassword} placeholder="Enter your new password" placeholderTextColor="#A3A3A3" value={password} onChangeText={setPassword} /><TouchableOpacity onPress={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} color="#A3A3A3" /> : <Eye size={18} color="#A3A3A3" />}</TouchableOpacity></View></View>
          </View>

          <TouchableOpacity onPress={() => setCurrentView('password_success')} style={tw`bg-market-green py-4 rounded-xl items-center mt-8 shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Update Password</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 6. PASSWORD UPDATED SUCCESS (Screenshot 6) ----------------- */}
      {currentView === 'password_success' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-6 items-center`}>
          <View style={tw`w-20 h-24 rounded-full bg-[#F2FBF6] items-center justify-center mt-12 mb-4`}><Text style={tw`text-4xl`}>✓</Text></View>
          <Text style={tw`text-2xl font-bold text-gray-950 text-center`}>Password Updated!</Text>
          <Text style={tw`text-xs text-gray-400 font-semibold text-center mt-2 px-6 leading-4`}>Your password has been changed successfully.</Text>

          <TouchableOpacity onPress={() => setCurrentView('security')} style={tw`w-full bg-market-green py-4 rounded-xl items-center mt-8 shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Continue</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 7. PRIVACY PANEL (Screenshot 7) ----------------- */}
      {currentView === 'privacy' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <View style={tw`bg-market-green-light border border-market-green/20 rounded-2xl p-4 flex-row items-center gap-3.5 mb-6`}>
            <ShieldCheck size={24} color="#0A8A3A" />
            <View style={tw`flex-grow`}><Text style={tw`text-xs font-bold text-market-green`}>Your privacy matters</Text><Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>We are committed to protecting your personal data.</Text></View>
          </View>

          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Privacy Controls</Text>
          <View style={tw`gap-3`}>
            <TouchableOpacity onPress={() => setCurrentView('visibility')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <User size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Profile Visibility</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Choose who can see your profile details</Text></View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView('activity_status')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Clock size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Activity Status</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Show or hide your activity status</Text></View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView('analytics')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Activity size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Analytics & Personalization</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Allow us to analyze usage metrics</Text></View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView('data_download')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <FileDown size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Data Download</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Download a copy of your personal data</Text></View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView('cookies')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Layers size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Cookies & Tracking</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Manage how tracking technologies are used</Text></View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView('blocked')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Users size={18} color="#0A8A3A" />
                <View><Text style={tw`text-sm font-bold text-gray-900`}>Blocked Users</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Manage users you've blocked</Text></View>
              </View>
              <ChevronRight size={16} color="#737373" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCurrentView('delete_account')} style={tw`flex-row items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl shadow-sm`}>
              <View style={tw`flex-row items-center gap-3.5`}>
                <Trash2 size={18} color="#EF4444" />
                <View><Text style={tw`text-sm font-bold text-red-500`}>Delete Account</Text><Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>Permanently delete account and data</Text></View>
              </View>
              <ChevronRight size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* ----------------- 8. PROFILE VISIBILITY RADIOS (Screenshot 8) ----------------- */}
      {currentView === 'visibility' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Who can see your profile</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm gap-4 mb-6`}>
            {[
              { id: 'everyone', name: 'Everyone', desc: 'Anyone on useMarket can view your profile.' },
              { id: 'registered', name: 'Registered Users', desc: 'Only signed-in users on useMarket can view.' },
              { id: 'friends', name: 'Friends Only', desc: 'Only your approved connections can view.' },
              { id: 'me', name: 'Only Me', desc: 'Your profile will be private and not visible.' },
            ].map((option) => {
              const isSelected = visibilityRadio === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setVisibilityRadio(option.id)}
                  style={tw`flex-row items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0`}
                >
                  <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${isSelected ? 'border-market-green' : 'border-gray-300'}`}>
                    {isSelected && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>{option.name}</Text>
                    <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>{option.desc}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity onPress={() => setCurrentView('privacy')} style={tw`bg-market-green py-4 rounded-xl items-center mt-6 shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Save Changes</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 9. ACTIVITY STATUS (New Screenshot 2) ----------------- */}
      {currentView === 'activity_status' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <View style={tw`bg-market-green-light border border-market-green/20 rounded-2xl p-4 flex-row items-center gap-3.5 mb-5`}>
            <View style={tw`w-10 h-10 rounded-full bg-market-green/10 items-center justify-center`}><Clock size={20} color="#0A8A3A" /></View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-xs font-bold text-market-green`}>Control your activity visibility</Text>
              <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>Choose whether others can see when you are active on useMarket.</Text>
            </View>
          </View>

          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Who can see your status</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm gap-4 mb-6`}>
            {[
              { id: 'everyone', name: 'Everyone', desc: 'Anyone can see your activity status.' },
              { id: 'registered', name: 'Registered Users', desc: 'Only signed-in users can see.' },
              { id: 'friends', name: 'Friends Only', desc: 'Only approved connections can see.' },
              { id: 'me', name: 'No One', desc: 'Your status will be hidden from everyone.' },
            ].map((option) => {
              const isSelected = activityStatusRadio === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setActivityStatusRadio(option.id)}
                  style={tw`flex-row items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0`}
                >
                  <View style={tw`w-5 h-5 rounded-full border-2 items-center justify-center ${isSelected ? 'border-market-green' : 'border-gray-300'}`}>
                    {isSelected && <View style={tw`w-2.5 h-2.5 rounded-full bg-market-green`} />}
                  </View>
                  <View style={tw`flex-grow`}>
                    <Text style={tw`text-sm font-bold text-gray-900`}>{option.name}</Text>
                    <Text style={tw`text-xs text-gray-400 font-semibold mt-0.5`}>{option.desc}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity onPress={() => setCurrentView('privacy')} style={tw`bg-market-green py-4 rounded-xl items-center mt-6 shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Save Changes</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 10. ANALYTICS & PERSONALIZATION (New Screenshot 3) ----------------- */}
      {currentView === 'analytics' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Analytics Settings</Text>
          <View style={tw`gap-3 mb-6 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm`}>
            {['Usage Analytics', 'Feature Improvement', 'Crash Reports'].map((item) => (
              <View key={item} style={tw`flex-row justify-between items-center py-3 border-b border-gray-50 last:border-0`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>{item}</Text>
                <Switch value={true} trackColor={{ false: '#E5E5E5', true: '#0A8A3A' }} thumbColor="#fff" />
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => setCurrentView('privacy')} style={tw`bg-market-green py-4 rounded-xl items-center shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Save Changes</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 11. DATA DOWNLOAD (New Screenshot 4) ----------------- */}
      {currentView === 'data_download' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <View style={tw`bg-market-green-light border border-market-green/20 rounded-2xl p-4 flex-row items-center gap-3.5 mb-5`}>
            <View style={tw`w-10 h-10 rounded-full bg-market-green/10 items-center justify-center`}><FileDown size={20} color="#0A8A3A" /></View>
            <View style={tw`flex-grow`}><Text style={tw`text-xs font-bold text-market-green`}>Your data, your control</Text><Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>You can request a copy of the personal information we have collected.</Text></View>
          </View>

          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Information Included</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl p-4 gap-3.5 mb-6`}>
            {['Account Info', 'Order History', 'Saved Addresses', 'Payment Logs'].map((info) => (
              <View key={info} style={tw`flex-row items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0`}>
                <Check size={14} color="#0A8A3A" />
                <Text style={tw`text-xs font-semibold text-gray-700`}>{info}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={() => setCurrentView('privacy')} style={tw`bg-market-green py-4 rounded-xl items-center shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Request Data Download</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 12. DELETE ACCOUNT WARNING (New Screenshot 5) ----------------- */}
      {currentView === 'delete_account' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <View style={tw`bg-red-50 border border-red-200 rounded-2xl p-4 flex-row items-center gap-3.5 mb-5`}>
            <Trash2 size={24} color="#EF4444" />
            <View style={tw`flex-1`}>
              <Text style={tw`text-xs font-bold text-red-500`}>This action is permanent</Text>
              <Text style={tw`text-[10px] text-gray-500 font-semibold mt-0.5`}>Once you delete your account, there is no way to recover your data or points.</Text>
            </View>
          </View>

          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Confirm before you continue</Text>
          <View style={tw`gap-3 mb-6 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm`}>
            {[
              { text: 'I understand this cannot be undone', value: deleteCheck1, setter: setDeleteCheck1 },
              { text: 'Permanently erase all my data', value: deleteCheck2, setter: setDeleteCheck2 },
              { text: 'Erase order history & records', value: deleteCheck3, setter: setDeleteCheck3 },
              { text: 'I forfeit active points & rewards', value: deleteCheck4, setter: setDeleteCheck4 },
            ].map((check, idx) => (
              <TouchableOpacity key={idx} onPress={() => check.setter(!check.value)} style={tw`flex-row items-center gap-3 py-1.5`}>
                <View style={tw`w-5 h-5 rounded border border-gray-300 items-center justify-center ${check.value ? 'bg-red-500 border-red-500' : 'bg-white'}`}>
                  {check.value && <Check size={12} color="white" strokeWidth={3} />}
                </View>
                <Text style={tw`text-xs font-semibold text-gray-700`}>{check.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={() => router.replace('/(auth)/welcome')} style={tw`bg-red-500 py-4 rounded-xl items-center shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Delete My Account</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 13. COOKIES & TRACKING PREFERENCES (New Screenshot 6) ----------------- */}
      {currentView === 'cookies' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Tracking Preferences</Text>
          <View style={tw`gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm`}>
            {['Essential Cookies (Always Active)', 'Performance Cookies', 'Marketing Cookies', 'Location Tracking'].map((cookie) => (
              <View key={cookie} style={tw`flex-row justify-between items-center py-3 border-b border-gray-50 last:border-0`}>
                <Text style={tw`text-sm font-bold text-gray-900`}>{cookie}</Text>
                <Switch value={true} trackColor={{ false: '#E5E5E5', true: '#0A8A3A' }} thumbColor="#fff" />
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => setCurrentView('privacy')} style={tw`bg-market-green py-4 rounded-xl items-center mt-6 shadow-sm`}><Text style={tw`text-white text-base font-semibold`}>Save Preferences</Text></TouchableOpacity>
        </ScrollView>
      )}

      {/* ----------------- 14. BLOCKED USERS LIST (New Screenshot 7) ----------------- */}
      {currentView === 'blocked' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4 gap-3`}>
          {blockedUsers.length === 0 ? (
            <View style={tw`items-center py-12`}>
              <Users size={40} color="#D4D4D4" style={tw`mb-3`} />
              <Text style={tw`text-sm font-bold text-gray-900`}>No Blocked Users</Text>
              <Text style={tw`text-xs text-gray-400 text-center mt-1`}>Users you block will be listed here.</Text>
            </View>
          ) : (
            blockedUsers.map((user) => (
              <View key={user.id} style={tw`flex-row items-center justify-between p-4 border border-gray-100 rounded-2xl bg-white shadow-sm`}>
                <View style={tw`flex-row items-center gap-3`}>
                  <View style={tw`w-10 h-10 rounded-full bg-gray-100 items-center justify-center`}><User size={20} color="#737373" /></View>
                  <View>
                    <Text style={tw`text-sm font-bold text-gray-900`}>{user.name}</Text>
                    <Text style={tw`text-[10px] text-gray-400 font-semibold mt-0.5`}>{user.desc}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleUnblock(user.id)} style={tw`border border-market-green px-4 py-1.5 rounded-xl`}><Text style={tw`text-xs text-market-green font-bold`}>Unblock</Text></TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {/* ----------------- 15. ACCOUNT ACTIVITY METRICS (New Screenshot 8) ----------------- */}
      {currentView === 'account_activity' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6 p-4`}>
          {/* Metric Indicators Row */}
          <View style={tw`flex-row justify-between mb-6 gap-3`}>
            {[
              { count: '18', label: 'Logins', bg: 'bg-[#F2FBF6]' },
              { count: '12', label: 'Orders', bg: 'bg-indigo-50/40' },
              { count: '6', label: 'Changes', bg: 'bg-yellow-50/40' },
              { count: '3', label: 'Events', bg: 'bg-red-50/40' },
            ].map((metric, idx) => (
              <View key={idx} style={tw`flex-1 ${metric.bg} border border-gray-100 rounded-2xl p-3.5 items-center shadow-sm`}>
                <Text style={tw`text-xl font-bold text-gray-900`}>{metric.count}</Text>
                <Text style={tw`text-[10px] text-gray-400 font-semibold mt-1`}>{metric.label}</Text>
              </View>
            ))}
          </View>

          {/* Activity Logs timeline */}
          <Text style={tw`text-xs font-bold text-gray-400 uppercase mb-3`}>Recent Activity Feed</Text>
          <View style={tw`bg-white border border-gray-100 rounded-2xl p-4 gap-4 shadow-sm`}>
            {[
              { title: 'Logged in (Current session)', desc: 'iPhone 14  •  Mumbai, India  •  09:15 AM', success: true },
              { title: 'Password changed successfully', desc: '12 May 2024 at 10:25 AM', success: true },
              { title: 'Profile Updated', desc: 'Email address updated  •  11 May 2024', success: true },
              { title: 'Logged in', desc: 'Android device  •  Lagos, Nigeria  •  10 May 2024', success: false },
            ].map((activity, idx) => (
              <View key={idx} style={tw`flex-row items-start gap-3.5`}>
                <View style={tw`w-2 h-2 rounded-full ${activity.success ? 'bg-market-green' : 'bg-red-500'} mt-1.5`} />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-xs font-bold text-gray-900`}>{activity.title}</Text>
                  <Text style={tw`text-[10px] text-gray-400 font-semibold mt-1`}>{activity.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}