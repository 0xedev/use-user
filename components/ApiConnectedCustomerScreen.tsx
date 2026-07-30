import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FinalCustomerScreen from './FinalCustomerScreen';
import { ApiError } from '@/lib/api/client';
import { customerApi } from '@/lib/api/customer';

type AnyRecord = Record<string, any>;
const GREEN = '#0A8A3A';
const BG = '#F7FAF8';
const INK = '#142019';
const MUTED = '#68756E';
const LINE = '#E5ECE8';

function firstArray(value: any): any[] {
  if (Array.isArray(value)) return value;
  for (const key of ['items','results','orders','stores','offers','entries','events','lines']) {
    if (Array.isArray(value?.[key])) return value[key];
  }
  return [];
}
function money(value: any, currency = 'NGN') {
  if (value == null) return '';
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  return new Intl.NumberFormat('en-NG',{style:'currency',currency,maximumFractionDigits:0}).format(n / 100);
}
function message(error: unknown) {
  return error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Something went wrong';
}

function Header({title}:{title:string}) {
  return <View style={s.header}><TouchableOpacity onPress={()=>router.back()} style={s.round}><Ionicons name="arrow-back" size={21} color={INK}/></TouchableOpacity><Text style={s.title}>{title}</Text><TouchableOpacity onPress={()=>router.push('/(features)')} style={s.round}><Ionicons name="grid-outline" size={20} color={GREEN}/></TouchableOpacity></View>;
}
function Primary({label,onPress,disabled=false,danger=false}:{label:string;onPress:()=>void;disabled?:boolean;danger?:boolean}) {
  return <TouchableOpacity disabled={disabled} onPress={onPress} style={[s.primary,danger&&{backgroundColor:'#D94343'},disabled&&{opacity:.45}]}><Text style={s.primaryText}>{label}</Text></TouchableOpacity>;
}
function ErrorBox({error,retry}:{error:unknown;retry:()=>void}) {
  return <View style={s.error}><Ionicons name="alert-circle" size={24} color="#D94343"/><Text style={s.errorText}>{message(error)}</Text><TouchableOpacity onPress={retry}><Text style={s.retry}>Retry</Text></TouchableOpacity></View>;
}
function Loading() { return <View style={s.center}><ActivityIndicator size="large" color={GREEN}/><Text style={s.muted}>Loading from useMarket…</Text></View>; }
function Card({children}:{children:React.ReactNode}) { return <View style={s.card}>{children}</View>; }
function DataRow({item}:{item:AnyRecord}) {
  const title = item.name ?? item.title ?? item.canonicalName ?? item.storeName ?? item.vendorName ?? item.orderNumber ?? item.id ?? 'Item';
  const subtitle = item.description ?? item.subtitle ?? item.etaLabel ?? item.status ?? item.categoryName ?? item.vendorLocationName ?? '';
  const price = item.priceMinor ?? item.unitPriceMinor ?? item.totalMinor ?? item.amountMinor;
  return <View style={s.row}><View style={s.art}><Ionicons name="basket-outline" size={22} color={GREEN}/></View><View style={{flex:1}}><Text style={s.rowTitle}>{String(title)}</Text>{subtitle ? <Text style={s.rowSub}>{String(subtitle)}</Text>:null}</View>{price!=null?<Text style={s.price}>{money(price,item.currency??'NGN')}</Text>:<Ionicons name="chevron-forward" size={20} color="#9AA49F"/>}</View>;
}

function useLoad(loader:()=>Promise<any>, deps: React.DependencyList) {
  const [data,setData]=useState<any>(null); const [error,setError]=useState<unknown>(null); const [loading,setLoading]=useState(true); const [version,setVersion]=useState(0);
  const reload=useCallback(()=>setVersion(x=>x+1),[]);
  useEffect(()=>{let live=true; setLoading(true); setError(null); loader().then(x=>{if(live)setData(x)}).catch(e=>{if(live)setError(e)}).finally(()=>{if(live)setLoading(false)}); return()=>{live=false};},[version,...deps]);
  return {data,error,loading,reload,setData};
}

function CatalogueScreen({slug}:{slug:string}) {
  const q = slug==='nearby-stores' ? '' : slug==='flash-deals' ? 'deal' : slug==='collections' ? '' : slug==='recommended-for-you' ? 'popular' : 'recent';
  const titleMap:Record<string,string>={collections:'Collections','flash-deals':'Flash Deals','nearby-stores':'Nearby Stores','recommended-for-you':'Recommended For You','recently-viewed':'Recently Viewed'};
  const api = useLoad(()=>slug==='nearby-stores' ? customerApi.stores({limit:50}) : customerApi.searchCatalogue({q,limit:50}),[slug]);
  if(api.loading)return <Loading/>; if(api.error)return <ErrorBox error={api.error} retry={api.reload}/>;
  const items=firstArray(api.data);
  return <SafeAreaView style={s.safe}><Header title={titleMap[slug]}/><FlatList contentContainerStyle={s.list} data={items} keyExtractor={(x,i)=>String(x.id??x.offerId??x.storeId??i)} ListEmptyComponent={<Text style={s.empty}>No live results are available for this section yet.</Text>} renderItem={({item})=><DataRow item={item}/>}/></SafeAreaView>;
}

function OrderActionScreen({slug}:{slug:string}) {
  const params=useLocalSearchParams<AnyRecord>(); const orderId=String(params.orderId??params.id??'');
  const order=useLoad(()=>orderId?customerApi.order(orderId):Promise.reject(new Error('Open this screen with an orderId.')),[orderId]);
  const [busy,setBusy]=useState(false); const [reason,setReason]=useState('Changed my mind'); const [note,setNote]=useState('');
  const submit=async()=>{try{setBusy(true); if(slug==='cancel-order') await customerApi.cancelOrder(orderId,{reasonCode:reason,note:note||undefined}); else await customerApi.requestRefund(orderId,{reasonCode:reason,note:note||undefined,items:[]}); Alert.alert('Submitted','The backend accepted your request.'); order.reload();}catch(e){Alert.alert('Could not submit',message(e));}finally{setBusy(false)}};
  if(order.loading)return <Loading/>; if(order.error)return <ErrorBox error={order.error} retry={order.reload}/>;
  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page}><Header title={slug==='cancel-order'?'Cancel Order':'Refund / Return'}/><Card><DataRow item={order.data}/></Card><Text style={s.section}>Reason</Text>{['Changed my mind','Ordered by mistake','Item damaged','Wrong item','Poor quality'].map(x=><TouchableOpacity key={x} onPress={()=>setReason(x)} style={[s.choice,reason===x&&s.choiceOn]}><Ionicons name={reason===x?'radio-button-on':'radio-button-off'} size={22} color={GREEN}/><Text style={s.choiceText}>{x}</Text></TouchableOpacity>)}<TextInput value={note} onChangeText={setNote} multiline placeholder="Add details" style={s.input}/><Primary label={busy?'Submitting…':slug==='cancel-order'?'Cancel order':'Submit refund request'} onPress={submit} disabled={busy} danger={slug==='cancel-order'}/></ScrollView></SafeAreaView>;
}

function SubstitutionScreen() {
  const p=useLocalSearchParams<AnyRecord>(); const proposalId=String(p.proposalId??p.id??''); const [busy,setBusy]=useState(false);
  const decide=async(decision:'accept'|'reject')=>{try{setBusy(true);await customerApi.decideSubstitution(proposalId,decision,{});Alert.alert('Updated',decision==='accept'?'Substitute accepted.':'Substitute rejected.');router.back();}catch(e){Alert.alert('Could not update',message(e));}finally{setBusy(false)}};
  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page}><Header title="Substitution Approval"/><Card><Text style={s.rowTitle}>Replacement proposal</Text><Text style={s.rowSub}>Proposal ID: {proposalId||'Missing proposalId'}</Text></Card><Primary label={busy?'Saving…':'Accept substitute'} disabled={busy||!proposalId} onPress={()=>decide('accept')}/><Primary label="Reject substitute" disabled={busy||!proposalId} danger onPress={()=>decide('reject')}/></ScrollView></SafeAreaView>;
}

function TrackingScreen() {
  const p=useLocalSearchParams<AnyRecord>(); const orderId=String(p.orderId??p.id??'');
  const status=useLoad(async()=>{const [order,events]=await Promise.all([customerApi.order(orderId),customerApi.fulfilmentEvents(orderId,{limit:100})]);return {order,events};},[orderId]);
  if(status.loading)return <Loading/>; if(status.error)return <ErrorBox error={status.error} retry={status.reload}/>;
  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page}><Header title="Order Tracking"/><Card><DataRow item={status.data.order}/></Card><Text style={s.section}>Live fulfilment timeline</Text>{firstArray(status.data.events).map((e,i)=><View key={String(e.id??i)} style={s.event}><View style={s.dot}/><View><Text style={s.rowTitle}>{String(e.type??e.status??'Order update')}</Text><Text style={s.rowSub}>{String(e.occurredAt??e.createdAt??'')}</Text></View></View>)}</ScrollView></SafeAreaView>;
}

function CartScreen() {
  const carts=useLoad(()=>customerApi.carts({limit:20}),[]);
  if(carts.loading)return <Loading/>; if(carts.error)return <ErrorBox error={carts.error} retry={carts.reload}/>;
  const items=firstArray(carts.data);
  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page}><Header title="Your Cart"/>{items.length?items.map((x,i)=><Card key={String(x.id??i)}><DataRow item={x}/></Card>):<View style={s.center}><Ionicons name="basket-outline" size={74} color={GREEN}/><Text style={s.big}>Your cart is empty</Text><Text style={s.muted}>Add products from a nearby store to begin.</Text></View>}<Primary label="Start shopping" onPress={()=>router.replace('/(tabs)')}/></ScrollView></SafeAreaView>;
}

function VoiceConfirmScreen() {
  const p=useLocalSearchParams<AnyRecord>(); const conversationId=String(p.conversationId??''); const basketId=String(p.basketId??''); const [busy,setBusy]=useState(false);
  const confirm=async()=>{try{setBusy(true);if(basketId)await customerApi.confirmConversationBasket(basketId,{});else if(conversationId)await customerApi.proposeConversationBasket(conversationId,{items:[]});else throw new Error('Missing conversationId or basketId.');Alert.alert('Confirmed','The conversation basket was sent to the backend.');}catch(e){Alert.alert('Could not confirm',message(e));}finally{setBusy(false)}};
  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.page}><Header title="Confirm Voice Order"/><Card><Text style={s.rowTitle}>Voice basket</Text><Text style={s.rowSub}>{basketId||conversationId||'No active conversation'}</Text></Card><Primary label={busy?'Confirming…':'Confirm items'} disabled={busy} onPress={confirm}/></ScrollView></SafeAreaView>;
}

const connectedCatalog = new Set(['collections','flash-deals','nearby-stores','recommended-for-you','recently-viewed']);
export default function ApiConnectedCustomerScreen({slug}:{slug:string}) {
  if(connectedCatalog.has(slug)) return <CatalogueScreen slug={slug}/>;
  if(slug==='cancel-order'||slug==='refund-return-request'||slug==='refund-request-submitted') return <OrderActionScreen slug={slug==='refund-request-submitted'?'refund-return-request':slug}/>;
  if(slug==='substitution-approval') return <SubstitutionScreen/>;
  if(slug==='whatsapp-order-tracking') return <TrackingScreen/>;
  if(slug==='empty-cart') return <CartScreen/>;
  if(slug==='voice-confirm-items') return <VoiceConfirmScreen/>;
  return <FinalCustomerScreen slug={slug}/>;
}

const s=StyleSheet.create({safe:{flex:1,backgroundColor:BG},header:{height:64,paddingHorizontal:18,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:LINE},round:{width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'#F3F7F4'},title:{fontSize:18,fontWeight:'800',color:INK},page:{padding:18,paddingBottom:50},list:{padding:18,gap:10},center:{flex:1,minHeight:420,alignItems:'center',justifyContent:'center',gap:14,padding:28},muted:{color:MUTED,textAlign:'center'},big:{fontSize:25,fontWeight:'800',color:INK},card:{backgroundColor:'#fff',borderRadius:20,padding:14,borderWidth:1,borderColor:LINE,marginBottom:12},row:{minHeight:68,flexDirection:'row',alignItems:'center',gap:12,backgroundColor:'#fff',borderRadius:18,padding:13,borderWidth:1,borderColor:LINE},art:{width:44,height:44,borderRadius:14,backgroundColor:'#EAF7EF',alignItems:'center',justifyContent:'center'},rowTitle:{fontSize:15,fontWeight:'800',color:INK},rowSub:{fontSize:13,color:MUTED,marginTop:4},price:{fontSize:14,fontWeight:'800',color:GREEN},empty:{padding:30,textAlign:'center',color:MUTED},primary:{height:54,borderRadius:17,backgroundColor:GREEN,alignItems:'center',justifyContent:'center',marginTop:14},primaryText:{color:'#fff',fontWeight:'800',fontSize:16},error:{margin:24,padding:18,borderRadius:18,backgroundColor:'#FFF0F0',alignItems:'center',gap:10},errorText:{color:'#8F2D2D',textAlign:'center'},retry:{fontWeight:'800',color:GREEN},section:{fontSize:16,fontWeight:'800',color:INK,marginTop:10,marginBottom:10},choice:{minHeight:52,flexDirection:'row',alignItems:'center',gap:10,paddingHorizontal:14,backgroundColor:'#fff',borderWidth:1,borderColor:LINE,borderRadius:15,marginBottom:8},choiceOn:{borderColor:GREEN,backgroundColor:'#F1FBF5'},choiceText:{color:INK,fontWeight:'700'},input:{minHeight:100,textAlignVertical:'top',padding:14,borderWidth:1,borderColor:LINE,borderRadius:16,backgroundColor:'#fff',marginTop:10,color:INK},event:{flexDirection:'row',gap:12,paddingVertical:12,borderBottomWidth:1,borderBottomColor:LINE},dot:{width:12,height:12,borderRadius:6,backgroundColor:GREEN,marginTop:4}});
