import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const GREEN = '#079447';
const INK = '#142019';
const MUTED = '#69776F';
const BG = '#F7FAF8';

type Row = { title: string; subtitle?: string; price?: string; icon?: keyof typeof Ionicons.glyphMap; tone?: 'danger' | 'success' | 'plain' };
type ScreenConfig = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  primary: string;
  secondary?: string;
  kind?: 'calendar' | 'form' | 'choice' | 'success' | 'rating' | 'catalog' | 'voice' | 'whatsapp' | 'tracking' | 'empty';
  rows?: Row[];
};

export const screenOrder = [
  'schedule-delivery','delivery-instructions','substitution-approval','item-out-of-stock','cancel-order',
  'refund-return-request','refund-request-submitted','rate-review-vendor','rate-review-rider','collections',
  'flash-deals','nearby-stores','recommended-for-you','recently-viewed','connect-whatsapp','connect-whatsapp-alt',
  'reconnect-whatsapp','whatsapp-order-tracking','voice-ordering-start','voice-listening','voice-confirm-items','empty-cart',
] as const;

export const configs: Record<string, ScreenConfig> = {
  'schedule-delivery': { title:'Schedule Delivery', subtitle:'Choose a convenient date and time', icon:'calendar-outline', primary:'Confirm Slot', kind:'calendar', rows:[{title:'8:00 AM – 10:00 AM'},{title:'10:00 AM – 12:00 PM',tone:'success'},{title:'12:00 PM – 2:00 PM'},{title:'2:00 PM – 4:00 PM'},{title:'4:00 PM – 6:00 PM'}]},
  'delivery-instructions': { title:'Delivery Instructions', subtitle:'Help us deliver your order better', icon:'document-text-outline', primary:'Save Instructions', kind:'form', rows:[{title:'Leave at door',icon:'home-outline'},{title:'Call on arrival',icon:'call-outline'},{title:'Gate code',icon:'key-outline'},{title:'Leave with security',icon:'shield-checkmark-outline'}]},
  'substitution-approval': { title:'Substitution Approval', subtitle:'Review the suggested replacement', icon:'swap-horizontal-outline', primary:'Accept Substitute', secondary:'Reject', kind:'choice', rows:[{title:'Original item unavailable',subtitle:'Organic red apples (1kg)',tone:'danger'},{title:'Suggested substitute',subtitle:'Fuji apples (1kg)',price:'₦2,800',tone:'success'},{title:'Price difference',price:'+₦300'}]},
  'item-out-of-stock': { title:'Item Out of Stock', subtitle:'This item is currently unavailable', icon:'alert-circle-outline', primary:'Continue', kind:'choice', rows:[{title:'Fresh chicken breast (1kg)',price:'₦6,500'},{title:'Find similar items',subtitle:'View available alternatives',icon:'search-outline'},{title:'Remove item',subtitle:'Remove from cart',icon:'trash-outline'},{title:'Keep in cart',subtitle:'Notify me when available',icon:'notifications-outline'}]},
  'cancel-order': { title:'Cancel Order', subtitle:'Tell us why you want to cancel', icon:'close-circle-outline', primary:'Cancel Order', secondary:'Keep Order', kind:'form', rows:[{title:'Changed my mind'},{title:'Ordered by mistake'},{title:'Found a better price'},{title:'Delivery is taking too long'},{title:'Other reason'}]},
  'refund-return-request': { title:'Request Refund / Return', subtitle:'Tell us what went wrong', icon:'return-down-back-outline', primary:'Submit Request', kind:'form', rows:[{title:'Organic bananas (1kg)',price:'₦2,500',tone:'success'},{title:'Almond milk (1L)',price:'₦3,490',tone:'success'},{title:'Brown bread',price:'₦2,490'}]},
  'refund-request-submitted': { title:'Request Submitted', subtitle:'We received your request and will review it shortly', icon:'checkmark-circle', primary:'View Request Status', secondary:'Continue Shopping', kind:'success', rows:[{title:'Request ID',subtitle:'REF123456789'},{title:'Expected update',subtitle:'Within 24–48 hours'}]},
  'rate-review-vendor': { title:'Rate useMarket Fresh', subtitle:'How was your experience?', icon:'storefront-outline', primary:'Submit Review', kind:'rating', rows:[{title:'Fresh produce and fast delivery',subtitle:'Very happy with my order.'},{title:'Add photos',subtitle:'Optional'}]},
  'rate-review-rider': { title:'Rate Your Rider', subtitle:'How was your delivery experience?', icon:'bicycle-outline', primary:'Submit Review', kind:'rating', rows:[{title:'Friendly'},{title:'On time'},{title:'Good service'}]},
  'collections': { title:'Collections', subtitle:'Shop products grouped for every need', icon:'grid-outline', primary:'Explore All', kind:'catalog', rows:[{title:'Healthy Lifestyle',subtitle:'32 items'},{title:'Quick Meals',subtitle:'18 items'},{title:'Baby Care',subtitle:'24 items'},{title:'Home Essentials',subtitle:'40 items'},{title:'Breakfast Favourites',subtitle:'16 items'}]},
  'flash-deals': { title:'Flash Deals', subtitle:'Limited offers ending soon', icon:'flash-outline', primary:'View Cart', kind:'catalog', rows:[{title:'Red apples (1kg)',subtitle:'20% off',price:'₦2,000'},{title:'Whole milk (1L)',subtitle:'25% off',price:'₦1,700'},{title:'Basmati rice (1kg)',subtitle:'22% off',price:'₦2,900'},{title:'Sunflower oil (1L)',subtitle:'20% off',price:'₦2,200'}]},
  'nearby-stores': { title:'Nearby Stores', subtitle:'Stores delivering to your area', icon:'location-outline', primary:'View All Stores', kind:'catalog', rows:[{title:'useMarket Fresh',subtitle:'25–35 min • 4.6 ★'},{title:'Green Basket',subtitle:'30–40 min • 4.2 ★'},{title:'Daily Needs Mart',subtitle:'25–45 min • 4.1 ★'},{title:'PharmaPlus',subtitle:'30–45 min • 4.3 ★'}]},
  'recommended-for-you': { title:'Recommended For You', subtitle:'Personalised picks based on your shopping', icon:'sparkles-outline', primary:'View Cart', kind:'catalog', rows:[{title:'Avocado (1pc)',price:'₦1,400'},{title:'Greek yoghurt (500g)',price:'₦2,200'},{title:'Quinoa (500g)',price:'₦1,800'},{title:'Honey (250g)',price:'₦2,900'}]},
  'recently-viewed': { title:'Recently Viewed', subtitle:'Pick up where you left off', icon:'time-outline', primary:'View More', kind:'catalog', rows:[{title:'Organic bananas (1kg)',price:'₦2,900'},{title:'Almond milk (1L)',price:'₦3,490'},{title:'Brown rice (1kg)',price:'₦2,490'},{title:'Eggs (12 pcs)',price:'₦2,190'}]},
  'connect-whatsapp': { title:'Connect WhatsApp', subtitle:'Get order updates and support on WhatsApp', icon:'logo-whatsapp', primary:'Connect WhatsApp', secondary:'Not Now', kind:'whatsapp', rows:[{title:'Real-time order updates',icon:'notifications-outline'},{title:'Easy chat with support',icon:'chatbubble-outline'},{title:'Quick order notifications',icon:'flash-outline'}]},
  'connect-whatsapp-alt': { title:'Connect WhatsApp', subtitle:'Link your WhatsApp account to useMarket', icon:'logo-whatsapp', primary:'Connect WhatsApp', secondary:'Not Now', kind:'whatsapp', rows:[{title:'Get order updates',icon:'checkmark-circle-outline'},{title:'Track WhatsApp orders',icon:'navigate-outline'},{title:'Receive support',icon:'headset-outline'}]},
  'reconnect-whatsapp': { title:'Reconnect WhatsApp', subtitle:'We lost connection with your WhatsApp account', icon:'logo-whatsapp', primary:'Reconnect Now', secondary:'Not Now', kind:'whatsapp', rows:[{title:"You won't receive updates",tone:'danger'},{title:'Messages may not be delivered',tone:'danger'},{title:'Reconnect to continue',tone:'success'}]},
  'whatsapp-order-tracking': { title:'WhatsApp Order Tracking', subtitle:'Track orders placed through WhatsApp', icon:'logo-whatsapp', primary:'Track Active Order', kind:'tracking', rows:[{title:'Order #WMA123455',subtitle:'Rider is on the way • arriving in 15 mins',tone:'success'},{title:'Order #WMA123454',subtitle:'Delivered on May 21, 6:20 PM'}]},
  'voice-ordering-start': { title:'Order With Your Voice', subtitle:"Just speak and we'll add items to your cart", icon:'mic-circle', primary:'Tap to Speak', kind:'voice', rows:[{title:'Natural voice recognition',icon:'checkmark-circle-outline'},{title:'Add, remove or update items',icon:'checkmark-circle-outline'},{title:'Fast and hands-free',icon:'checkmark-circle-outline'}]},
  'voice-listening': { title:'Listening…', subtitle:'Speak now', icon:'mic', primary:'Stop Listening', secondary:'Cancel', kind:'voice', rows:[{title:'Try saying',subtitle:'“Add 1kg apples to my cart”'}]},
  'voice-confirm-items': { title:"Here's What I Found", subtitle:'Please confirm your items', icon:'checkmark-done-outline', primary:'Add to Cart', secondary:'Edit Items', kind:'catalog', rows:[{title:'Red apples (1kg)',price:'₦2,500'},{title:'Almond milk (1L)',price:'₦2,490'},{title:'Eggs (6 pcs)',price:'₦1,290'}]},
  'empty-cart': { title:'Your Cart Is Empty', subtitle:"Looks like you haven't added anything yet", icon:'basket-outline', primary:'Start Shopping', kind:'empty', rows:[]},
};

export function titleForSlug(slug: string) { return configs[slug]?.title ?? 'useMarket'; }

export default function StaticCustomerScreen({ slug }: { slug: string }) {
  const config = configs[slug] ?? configs['empty-cart'];
  const [selected, setSelected] = useState(1);
  const [rating, setRating] = useState(4);
  const next = useMemo(() => screenOrder[(screenOrder.indexOf(slug as any) + 1) % screenOrder.length], [slug]);

  return <SafeAreaView style={styles.safe}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}><Ionicons name="arrow-back" size={22} color={INK}/></TouchableOpacity>
        <Text style={styles.brand}>useMarket</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(features)')}><Ionicons name="grid-outline" size={20} color={GREEN}/></TouchableOpacity>
      </View>

      <View style={[styles.hero, (config.kind === 'success' || config.kind === 'empty') && styles.heroCentred]}>
        <View style={styles.heroIcon}><Ionicons name={config.icon} size={36} color="#fff"/></View>
        <Text style={styles.title}>{config.title}</Text>
        <Text style={styles.subtitle}>{config.subtitle}</Text>
      </View>

      {config.kind === 'calendar' && <View style={styles.panel}>
        <View style={styles.month}><Text style={styles.panelTitle}>May 2026</Text><Ionicons name="calendar-outline" size={20} color={GREEN}/></View>
        <View style={styles.days}>{['19','20','21','22','23','24','25'].map((d,i)=><TouchableOpacity key={d} onPress={()=>setSelected(i)} style={[styles.day,selected===i&&styles.dayActive]}><Text style={[styles.dayText,selected===i&&styles.dayTextActive]}>{d}</Text></TouchableOpacity>)}</View>
      </View>}

      {config.kind === 'rating' && <View style={styles.ratingBox}>
        <Text style={styles.ratingNumber}>{rating}.0</Text>
        <View style={styles.stars}>{[1,2,3,4,5].map(n=><TouchableOpacity key={n} onPress={()=>setRating(n)}><Ionicons name={n<=rating?'star':'star-outline'} size={34} color="#F6B800"/></TouchableOpacity>)}</View>
        <Text style={styles.ratingLabel}>Great!</Text>
      </View>}

      {config.kind === 'voice' && <View style={styles.voiceWrap}><View style={styles.voiceRing}><View style={styles.voiceCircle}><Ionicons name="mic" size={42} color="#fff"/></View></View></View>}

      {config.kind === 'whatsapp' && <View style={styles.whatsappWrap}><View style={styles.whatsappCircle}><Ionicons name="logo-whatsapp" size={58} color="#fff"/></View></View>}

      {config.kind === 'form' && <TextInput multiline placeholder="Add details (optional)" placeholderTextColor="#8A958F" style={styles.input}/>} 

      <View style={styles.list}>
        {(config.rows ?? []).map((row,index)=><TouchableOpacity key={`${row.title}-${index}`} onPress={()=>setSelected(index)} style={[styles.row,row.tone==='danger'&&styles.dangerRow,row.tone==='success'&&styles.successRow]}>
          {row.icon ? <View style={styles.rowIcon}><Ionicons name={row.icon} size={21} color={row.tone==='danger'?'#E24949':GREEN}/></View> : <View style={[styles.radio,selected===index&&styles.radioActive]}>{selected===index&&<View style={styles.radioDot}/>}</View>}
          <View style={styles.rowCopy}><Text style={styles.rowTitle}>{row.title}</Text>{row.subtitle&&<Text style={styles.rowSubtitle}>{row.subtitle}</Text>}</View>
          {row.price&&<Text style={styles.price}>{row.price}</Text>}
          {(config.kind==='catalog'||config.kind==='tracking')&&<Ionicons name={config.kind==='catalog'?'add-circle':'chevron-forward'} size={23} color={GREEN}/>} 
        </TouchableOpacity>)}
      </View>

      {(config.kind === 'rating' || config.kind === 'form') && <TextInput multiline placeholder={config.kind==='rating'?'Write a review (optional)':'Tell us more (optional)'} placeholderTextColor="#8A958F" style={styles.input}/>} 

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primary} onPress={()=>router.push({pathname:'/(features)/[slug]',params:{slug:next}})}><Text style={styles.primaryText}>{config.primary}</Text></TouchableOpacity>
        {config.secondary&&<TouchableOpacity style={styles.secondary} onPress={()=>router.back()}><Text style={styles.secondaryText}>{config.secondary}</Text></TouchableOpacity>}
      </View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:BG},content:{padding:20,paddingBottom:40},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:24},iconButton:{width:42,height:42,borderRadius:21,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#E5ECE8'},brand:{fontSize:20,fontWeight:'800',color:GREEN},hero:{backgroundColor:'#EAF8F0',borderRadius:28,padding:22,marginBottom:18},heroCentred:{alignItems:'center',paddingVertical:34},heroIcon:{width:66,height:66,borderRadius:22,backgroundColor:GREEN,alignItems:'center',justifyContent:'center',marginBottom:16},title:{fontSize:29,lineHeight:35,fontWeight:'800',color:INK,marginBottom:8},subtitle:{fontSize:16,lineHeight:23,color:MUTED},panel:{backgroundColor:'#fff',borderRadius:22,padding:18,marginBottom:16,borderWidth:1,borderColor:'#E6ECE8'},month:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:16},panelTitle:{fontSize:18,fontWeight:'800',color:INK},days:{flexDirection:'row',justifyContent:'space-between'},day:{width:39,height:39,borderRadius:20,alignItems:'center',justifyContent:'center'},dayActive:{backgroundColor:GREEN},dayText:{fontWeight:'700',color:INK},dayTextActive:{color:'#fff'},list:{gap:10},row:{minHeight:70,backgroundColor:'#fff',borderRadius:18,padding:14,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#E6ECE8'},dangerRow:{backgroundColor:'#FFF2F2',borderColor:'#FFDADA'},successRow:{backgroundColor:'#EFFBF4',borderColor:'#D6F2E1'},rowIcon:{width:42,height:42,borderRadius:14,backgroundColor:'#EDF8F1',alignItems:'center',justifyContent:'center',marginRight:12},radio:{width:22,height:22,borderRadius:11,borderWidth:2,borderColor:'#C9D3CD',marginRight:13,alignItems:'center',justifyContent:'center'},radioActive:{borderColor:GREEN},radioDot:{width:10,height:10,borderRadius:5,backgroundColor:GREEN},rowCopy:{flex:1},rowTitle:{fontSize:15,fontWeight:'750',color:INK},rowSubtitle:{fontSize:13,lineHeight:18,color:MUTED,marginTop:4},price:{fontSize:14,fontWeight:'800',color:GREEN,marginRight:8},input:{minHeight:110,backgroundColor:'#fff',borderRadius:18,padding:16,marginTop:14,borderWidth:1,borderColor:'#E0E8E3',fontSize:15,color:INK,textAlignVertical:'top'},actions:{marginTop:22,gap:11},primary:{minHeight:56,borderRadius:18,backgroundColor:GREEN,alignItems:'center',justifyContent:'center'},primaryText:{color:'#fff',fontSize:16,fontWeight:'800'},secondary:{minHeight:50,borderRadius:18,borderWidth:1,borderColor:GREEN,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'},secondaryText:{color:GREEN,fontSize:15,fontWeight:'800'},ratingBox:{alignItems:'center',backgroundColor:'#fff',borderRadius:22,padding:20,marginBottom:16,borderWidth:1,borderColor:'#E6ECE8'},ratingNumber:{fontSize:42,fontWeight:'800',color:INK},stars:{flexDirection:'row',gap:6,marginVertical:10},ratingLabel:{fontSize:15,fontWeight:'700',color:MUTED},voiceWrap:{alignItems:'center',paddingVertical:26},voiceRing:{width:150,height:150,borderRadius:75,backgroundColor:'#DDF6E8',alignItems:'center',justifyContent:'center'},voiceCircle:{width:92,height:92,borderRadius:46,backgroundColor:GREEN,alignItems:'center',justifyContent:'center'},whatsappWrap:{alignItems:'center',paddingVertical:22},whatsappCircle:{width:110,height:110,borderRadius:55,backgroundColor:'#20BD5A',alignItems:'center',justifyContent:'center',shadowColor:'#20BD5A',shadowOpacity:.2,shadowRadius:18},whatsappCircleText:{color:'#fff'},ratingLabelText:{color:MUTED}
});
