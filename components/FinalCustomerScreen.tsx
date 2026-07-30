import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { ReactNode, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const C = {
  green: '#0A8A3A', green2: '#13A451', pale: '#EAF7EF', pale2: '#F4FBF6', ink: '#142019',
  muted: '#68756E', line: '#E5ECE8', white: '#FFFFFF', red: '#E5484D', amber: '#F5A524', bg: '#F7FAF8',
};

type Icon = keyof typeof Ionicons.glyphMap;
type Props = { slug: string };

function Header({ title, action }: { title: string; action?: Icon }) {
  return <View style={s.header}>
    <TouchableOpacity style={s.round} onPress={() => router.back()}><Ionicons name="arrow-back" size={21} color={C.ink}/></TouchableOpacity>
    <Text style={s.headerTitle}>{title}</Text>
    <TouchableOpacity style={s.round} onPress={() => router.push('/(features)')}><Ionicons name={action ?? 'ellipsis-horizontal'} size={20} color={C.green}/></TouchableOpacity>
  </View>;
}

function Screen({ title, children, footer = true }: { title: string; children: ReactNode; footer?: boolean }) {
  return <SafeAreaView style={s.safe}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.page}>
      <Header title={title}/>{children}
    </ScrollView>
    {footer && <BottomNav/>}
  </SafeAreaView>;
}

function BottomNav() {
  return <View style={s.nav}>{[
    ['home-outline','Home'],['grid-outline','Categories'],['receipt-outline','Orders'],['cart-outline','Cart'],['person-outline','Account'],
  ].map(([icon,label],i)=><TouchableOpacity key={label} style={s.navItem}><Ionicons name={icon as Icon} size={22} color={i===0?C.green:'#7A8780'}/><Text style={[s.navLabel,i===0&&s.navActive]}>{label}</Text></TouchableOpacity>)}</View>;
}

function Hero({ icon, title, body, tone='green' }: { icon: Icon; title: string; body: string; tone?: 'green'|'red'|'amber' }) {
  const color = tone==='red'?C.red:tone==='amber'?C.amber:C.green;
  return <View style={[s.hero,{backgroundColor: `${color}12`}]}>
    <View style={[s.heroIcon,{backgroundColor:color}]}><Ionicons name={icon} size={33} color="#fff"/></View>
    <Text style={s.heroTitle}>{title}</Text><Text style={s.heroBody}>{body}</Text>
  </View>;
}

function Button({ label, secondary=false, danger=false, onPress }: { label:string; secondary?:boolean; danger?:boolean; onPress?:()=>void }) {
  return <TouchableOpacity onPress={onPress} style={[s.button, secondary&&s.buttonSecondary, danger&&s.buttonDanger]}>
    <Text style={[s.buttonText,secondary&&s.buttonTextSecondary]}>{label}</Text>
  </TouchableOpacity>;
}

function Card({ children, active=false, danger=false }: { children:ReactNode; active?:boolean; danger?:boolean }) {
  return <View style={[s.card,active&&s.cardActive,danger&&s.cardDanger]}>{children}</View>;
}

function Row({ icon, title, subtitle, right, onPress }: { icon?:Icon; title:string; subtitle?:string; right?:ReactNode; onPress?:()=>void }) {
  return <TouchableOpacity onPress={onPress} style={s.row} activeOpacity={.75}>
    {icon&&<View style={s.rowIcon}><Ionicons name={icon} size={21} color={C.green}/></View>}
    <View style={{flex:1}}><Text style={s.rowTitle}>{title}</Text>{subtitle&&<Text style={s.rowSub}>{subtitle}</Text>}</View>
    {right ?? <Ionicons name="chevron-forward" size={19} color="#97A19C"/>}
  </TouchableOpacity>;
}

function Product({ name, meta, price, selected=false }: {name:string;meta:string;price:string;selected?:boolean}) {
  return <View style={[s.product,selected&&s.cardActive]}>
    <View style={s.productArt}><Ionicons name="basket" size={25} color={C.green}/></View>
    <View style={{flex:1}}><Text style={s.rowTitle}>{name}</Text><Text style={s.rowSub}>{meta}</Text></View>
    <Text style={s.price}>{price}</Text>
  </View>;
}

function SectionTitle({ children, action }: { children:ReactNode; action?:string }) {
  return <View style={s.sectionHead}><Text style={s.sectionTitle}>{children}</Text>{action&&<Text style={s.sectionAction}>{action}</Text>}</View>;
}

function ScheduleDelivery() {
  const [day,setDay]=useState(1); const [slot,setSlot]=useState(1);
  return <Screen title="Schedule Delivery">
    <Hero icon="calendar" title="Choose a delivery time" body="Select the day and time that works best for you."/>
    <SectionTitle action="May 2026">Select date</SectionTitle>
    <Card><View style={s.days}>{['Mon 19','Tue 20','Wed 21','Thu 22','Fri 23'].map((x,i)=><TouchableOpacity key={x} onPress={()=>setDay(i)} style={[s.day,day===i&&s.dayOn]}><Text style={[s.dayTxt,day===i&&s.dayTxtOn]}>{x.split(' ')[0]}</Text><Text style={[s.dayNum,day===i&&s.dayTxtOn]}>{x.split(' ')[1]}</Text></TouchableOpacity>)}</View></Card>
    <SectionTitle>Available time slots</SectionTitle>
    <Card>{['8:00 AM – 10:00 AM','10:00 AM – 12:00 PM','12:00 PM – 2:00 PM','2:00 PM – 4:00 PM'].map((x,i)=><Row key={x} title={x} subtitle={i===1?'Most popular':''} right={<Ionicons name={slot===i?'radio-button-on':'radio-button-off'} size={22} color={C.green}/>} onPress={()=>setSlot(i)}/>)}</Card>
    <Button label="Confirm delivery slot"/>
  </Screen>;
}

function DeliveryInstructions() {
  const [choice,setChoice]=useState(0);
  return <Screen title="Delivery Instructions">
    <Hero icon="document-text" title="Help your rider find you" body="Choose an instruction and add any useful details."/>
    <Card>{[['home-outline','Leave at my door'],['call-outline','Call when you arrive'],['shield-checkmark-outline','Leave with security'],['walk-outline','Meet me outside']].map(([ic,t],i)=><Row key={t} icon={ic as Icon} title={t} right={<Ionicons name={choice===i?'checkmark-circle':'ellipse-outline'} size={23} color={C.green}/>} onPress={()=>setChoice(i)}/>)}</Card>
    <TextInput style={s.textarea} multiline placeholder="House colour, gate code, landmark or other note" placeholderTextColor="#97A19C"/>
    <View style={s.info}><Ionicons name="information-circle" size={20} color={C.green}/><Text style={s.infoText}>Your instruction is shown only to the assigned rider.</Text></View>
    <Button label="Save instructions"/>
  </Screen>;
}

function SubstitutionApproval() {
  return <Screen title="Substitution Approval">
    <Hero icon="swap-horizontal" title="A replacement is available" body="The original item is unavailable. Review the suggested substitute."/>
    <SectionTitle>Unavailable item</SectionTitle><Product name="Organic red apples" meta="1 kg • unavailable" price="₦2,500"/>
    <View style={s.swapLine}><Ionicons name="arrow-down-circle" size={30} color={C.green}/></View>
    <SectionTitle>Suggested replacement</SectionTitle><Product name="Fuji apples" meta="1 kg • closest match" price="₦2,800" selected/>
    <Card><Row icon="cash-outline" title="Price difference" subtitle="Your total will increase by ₦300" right={<Text style={s.price}>+₦300</Text>}/></Card>
    <Button label="Accept substitute"/><Button label="Reject and remove item" secondary/>
  </Screen>;
}

function OutOfStock() {
  const [choice,setChoice]=useState(0);
  return <Screen title="Item Out of Stock">
    <Hero icon="alert-circle" title="This item is unavailable" body="Choose what should happen before checkout." tone="amber"/>
    <Product name="Fresh chicken breast" meta="1 kg • Market Fresh" price="₦6,500"/>
    <SectionTitle>What would you like to do?</SectionTitle>
    <Card>{[['search','Choose a similar item','See available alternatives'],['trash','Remove from cart','Continue without this item'],['notifications','Notify me later','Get an alert when it returns']].map(([ic,t,sub],i)=><Row key={t} icon={ic as Icon} title={t} subtitle={sub} right={<Ionicons name={choice===i?'radio-button-on':'radio-button-off'} size={22} color={C.green}/>} onPress={()=>setChoice(i)}/>)}</Card>
    <Button label="Continue"/>
  </Screen>;
}

function CancelOrder() {
  const [r,setR]=useState(0);
  return <Screen title="Cancel Order" footer={false}>
    <Hero icon="close-circle" title="Cancel order #UM249810" body="Cancellation may not be possible once preparation has started." tone="red"/>
    <View style={s.warning}><Ionicons name="warning" size={21} color={C.red}/><Text style={s.warningText}>Your order is being prepared. A cancellation fee may apply.</Text></View>
    <SectionTitle>Why are you cancelling?</SectionTitle><Card>{['Changed my mind','Ordered by mistake','Found a better price','Delivery is taking too long','Other reason'].map((x,i)=><Row key={x} title={x} right={<Ionicons name={r===i?'radio-button-on':'radio-button-off'} size={22} color={C.red}/>} onPress={()=>setR(i)}/>)}</Card>
    <Button label="Cancel order" danger/><Button label="Keep my order" secondary onPress={()=>router.back()}/>
  </Screen>;
}

function RefundRequest() {
  const [a,setA]=useState(true); const [b,setB]=useState(false);
  return <Screen title="Refund / Return" footer={false}>
    <Hero icon="return-down-back" title="Tell us what went wrong" body="Select the affected items and explain the issue."/>
    <TouchableOpacity onPress={()=>setA(!a)}><Product name="Organic bananas" meta="1 kg" price={a?'✓':'₦2,500'} selected={a}/></TouchableOpacity>
    <TouchableOpacity onPress={()=>setB(!b)}><Product name="Almond milk" meta="1 litre" price={b?'✓':'₦3,490'} selected={b}/></TouchableOpacity>
    <SectionTitle>Reason</SectionTitle><Card><Row icon="cube-outline" title="Damaged item"/><Row icon="close-circle-outline" title="Wrong item delivered"/><Row icon="time-outline" title="Expired or poor quality"/></Card>
    <TextInput style={s.textarea} multiline placeholder="Describe the issue" placeholderTextColor="#97A19C"/>
    <Button label="Submit request"/>
  </Screen>;
}

function RefundSubmitted() {
  return <Screen title="Refund Status" footer={false}>
    <View style={s.successWrap}><View style={s.successIcon}><Ionicons name="checkmark" size={52} color="#fff"/></View><Text style={s.successTitle}>Request submitted</Text><Text style={s.heroBody}>We’ll review your request and update you within 24–48 hours.</Text></View>
    <Card><Row title="Request ID" right={<Text style={s.mono}>REF123456789</Text>}/><Row title="Order" right={<Text style={s.mono}>#UM249810</Text>}/><Row title="Refund amount" right={<Text style={s.price}>₦5,990</Text>}/></Card>
    <View style={s.timeline}><View style={s.timelineDot}/><View><Text style={s.rowTitle}>Request received</Text><Text style={s.rowSub}>Today, 11:42 PM</Text></View></View>
    <Button label="View request details"/><Button label="Continue shopping" secondary/>
  </Screen>;
}

function Rating({ rider=false }: { rider?:boolean }) {
  const [rating,setRating]=useState(5);
  return <Screen title={rider?'Rate Your Rider':'Rate Store'} footer={false}>
    <Hero icon={rider?'bicycle':'storefront'} title={rider?'How was your delivery?':'How was your shopping experience?'} body={rider?'Your feedback helps us reward great riders.':'Your review helps other customers shop confidently.'}/>
    <View style={s.profile}><View style={s.avatar}><Ionicons name={rider?'person':'storefront'} size={35} color={C.green}/></View><Text style={s.profileName}>{rider?'Samuel A.':'useMarket Fresh'}</Text><Text style={s.rowSub}>{rider?'Delivered your order':'Order #UM249810'}</Text></View>
    <View style={s.stars}>{[1,2,3,4,5].map(x=><TouchableOpacity key={x} onPress={()=>setRating(x)}><Ionicons name={x<=rating?'star':'star-outline'} size={38} color="#F5B301"/></TouchableOpacity>)}</View>
    <View style={s.chips}>{(rider?['Friendly','On time','Careful handling']:['Fresh products','Good packaging','Fast preparation']).map(x=><View key={x} style={s.chip}><Text style={s.chipText}>{x}</Text></View>)}</View>
    <TextInput style={s.textarea} multiline placeholder="Write a review (optional)" placeholderTextColor="#97A19C"/>
    <Button label="Submit review"/>
  </Screen>;
}

const catalogData: Record<string,{title:string;subtitle:string;icon:Icon;items:[string,string,string][]}> = {
  collections:{title:'Collections',subtitle:'Curated picks for every moment',icon:'grid',items:[['Healthy Lifestyle','32 items','leaf'],['Quick Meals','18 items','fast-food'],['Baby Care','24 items','happy'],['Home Essentials','40 items','home']]},
  'flash-deals':{title:'Flash Deals',subtitle:'Limited offers ending soon',icon:'flash',items:[['Red apples','20% off','nutrition'],['Whole milk','25% off','water'],['Basmati rice','22% off','restaurant'],['Sunflower oil','20% off','flask']]},
  'nearby-stores':{title:'Nearby Stores',subtitle:'Stores delivering to your area',icon:'location',items:[['useMarket Fresh','25–35 min • 4.6 ★','storefront'],['Green Basket','30–40 min • 4.2 ★','leaf'],['Daily Needs Mart','25–45 min • 4.1 ★','basket'],['PharmaPlus','30–45 min • 4.3 ★','medkit']]},
  'recommended-for-you':{title:'Recommended For You',subtitle:'Picked from your shopping habits',icon:'sparkles',items:[['Avocado','₦1,400','nutrition'],['Greek yoghurt','₦2,200','ice-cream'],['Quinoa','₦1,800','restaurant'],['Honey','₦2,900','flower']]},
  'recently-viewed':{title:'Recently Viewed',subtitle:'Pick up where you left off',icon:'time',items:[['Organic bananas','₦2,900','nutrition'],['Almond milk','₦3,490','water'],['Brown rice','₦2,490','restaurant'],['Eggs (12 pcs)','₦2,190','egg']]},
};

function Catalog({slug}:{slug:string}) {
  const d=catalogData[slug]; return <Screen title={d.title}><Hero icon={d.icon} title={d.title} body={d.subtitle}/>
    {slug==='flash-deals'&&<View style={s.dealTimer}><Ionicons name="time" size={20} color="#fff"/><Text style={s.dealTxt}>Ends in 02:18:45</Text></View>}
    <View style={s.grid}>{d.items.map(([name,sub,ic])=><View key={name} style={s.gridCard}><View style={s.gridArt}><Ionicons name={ic as Icon} size={38} color={C.green}/></View><Text style={s.gridTitle}>{name}</Text><Text style={s.gridSub}>{sub}</Text><TouchableOpacity style={s.add}><Ionicons name="add" size={20} color="#fff"/></TouchableOpacity></View>)}</View>
  </Screen>;
}

function WhatsApp({mode}:{mode:'connect'|'alt'|'reconnect'}) {
  const reconnect=mode==='reconnect'; return <Screen title={reconnect?'Reconnect WhatsApp':'Connect WhatsApp'} footer={false}>
    <View style={s.waHero}><View style={s.waCircle}><Ionicons name="logo-whatsapp" size={62} color="#fff"/></View><Text style={s.successTitle}>{reconnect?'Reconnect your account':'Stay updated on WhatsApp'}</Text><Text style={s.heroBody}>{reconnect?'We lost connection. Reconnect to continue receiving updates.':'Get order alerts, support and tracking without opening the app.'}</Text></View>
    <Card>{(reconnect?['Order updates are paused','Messages may not be delivered','Reconnect securely in seconds']:['Real-time order updates','Easy chat with support','Track WhatsApp orders']).map((x,i)=><Row key={x} icon={reconnect&&i<2?'alert-circle':'checkmark-circle'} title={x}/>)}</Card>
    <View style={s.phone}><Text style={s.phoneCode}>+234</Text><TextInput style={s.phoneInput} placeholder="Phone number" keyboardType="phone-pad"/></View>
    <Button label={reconnect?'Reconnect now':'Connect WhatsApp'}/><Button label="Not now" secondary/>
  </Screen>;
}

function WhatsAppTracking() {
  return <Screen title="WhatsApp Tracking">
    <Hero icon="logo-whatsapp" title="Track WhatsApp orders" body="Orders placed through WhatsApp appear here automatically."/>
    <Card active><Row icon="bicycle" title="Order #WMA123455" subtitle="Rider is on the way • 15 mins" right={<View style={s.live}><Text style={s.liveTxt}>LIVE</Text></View>}/><View style={s.progress}><View style={[s.progressFill,{width:'72%'}]}/></View><View style={s.trackMeta}><Text style={s.rowSub}>Picked up</Text><Text style={s.rowSub}>Arriving soon</Text></View></Card>
    <SectionTitle>Previous orders</SectionTitle><Card><Row icon="checkmark-circle" title="Order #WMA123454" subtitle="Delivered May 21, 6:20 PM"/><Row icon="checkmark-circle" title="Order #WMA123449" subtitle="Delivered May 18, 1:10 PM"/></Card>
    <Button label="Track active order"/>
  </Screen>;
}

function Voice({mode}:{mode:'start'|'listening'|'confirm'}) {
  if(mode==='confirm') return <Screen title="Voice Order"><Hero icon="checkmark-done" title="Here’s what I found" body="Review the items before adding them to your cart."/><Product name="Red apples" meta="1 kg" price="₦2,500"/><Product name="Almond milk" meta="1 litre" price="₦2,490"/><Product name="Eggs" meta="6 pieces" price="₦1,290"/><Card><Row title="Estimated total" right={<Text style={s.total}>₦6,280</Text>}/></Card><Button label="Add all to cart"/><Button label="Edit items" secondary/></Screen>;
  return <Screen title="Voice Ordering" footer={false}><View style={s.voiceHero}><Text style={s.successTitle}>{mode==='listening'?'Listening…':'Order with your voice'}</Text><Text style={s.heroBody}>{mode==='listening'?'Speak naturally. I’ll turn your request into a cart.':'Tap the microphone and tell us what you need.'}</Text><View style={[s.voiceRing,mode==='listening'&&s.voiceRingLive]}><View style={s.voiceButton}><Ionicons name="mic" size={48} color="#fff"/></View></View>{mode==='listening'&&<View style={s.wave}>{[18,34,25,45,28,38,20].map((h,i)=><View key={i} style={[s.waveBar,{height:h}]}/>)}</View>}</View><Card><Row icon="chatbubble-ellipses" title="Try saying" subtitle='“Add 1kg apples and two bottles of milk”'/></Card><Button label={mode==='listening'?'Stop listening':'Tap to speak'}/><Button label="Cancel" secondary/></Screen>;
}

function EmptyCart() {
  return <Screen title="Cart"><View style={s.emptyWrap}><View style={s.emptyCircle}><Ionicons name="basket-outline" size={72} color={C.green}/></View><Text style={s.successTitle}>Your cart is empty</Text><Text style={s.heroBody}>Looks like you haven’t added anything yet. Discover fresh groceries and everyday essentials.</Text></View><Button label="Start shopping"/><SectionTitle>Popular right now</SectionTitle><View style={s.grid}>{[['Fresh fruits','nutrition'],['Breakfast','cafe'],['Drinks','water'],['Household','home']].map(([x,ic])=><View key={x} style={s.miniCat}><Ionicons name={ic as Icon} size={28} color={C.green}/><Text style={s.miniTxt}>{x}</Text></View>)}</View></Screen>;
}

export default function FinalCustomerScreen({slug}:Props) {
  switch(slug){
    case 'schedule-delivery': return <ScheduleDelivery/>;
    case 'delivery-instructions': return <DeliveryInstructions/>;
    case 'substitution-approval': return <SubstitutionApproval/>;
    case 'item-out-of-stock': return <OutOfStock/>;
    case 'cancel-order': return <CancelOrder/>;
    case 'refund-return-request': return <RefundRequest/>;
    case 'refund-request-submitted': return <RefundSubmitted/>;
    case 'rate-review-vendor': return <Rating/>;
    case 'rate-review-rider': return <Rating rider/>;
    case 'collections': case 'flash-deals': case 'nearby-stores': case 'recommended-for-you': case 'recently-viewed': return <Catalog slug={slug}/>;
    case 'connect-whatsapp': return <WhatsApp mode="connect"/>;
    case 'connect-whatsapp-alt': return <WhatsApp mode="alt"/>;
    case 'reconnect-whatsapp': return <WhatsApp mode="reconnect"/>;
    case 'whatsapp-order-tracking': return <WhatsAppTracking/>;
    case 'voice-ordering-start': return <Voice mode="start"/>;
    case 'voice-listening': return <Voice mode="listening"/>;
    case 'voice-confirm-items': return <Voice mode="confirm"/>;
    default: return <EmptyCart/>;
  }
}

const s=StyleSheet.create({
  safe:{flex:1,backgroundColor:C.bg},page:{padding:20,paddingBottom:34},header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:20},round:{width:42,height:42,borderRadius:21,backgroundColor:'#fff',borderWidth:1,borderColor:C.line,alignItems:'center',justifyContent:'center'},headerTitle:{fontSize:18,fontWeight:'800',color:C.ink},hero:{borderRadius:26,padding:22,backgroundColor:C.pale,marginBottom:20},heroIcon:{width:62,height:62,borderRadius:20,alignItems:'center',justifyContent:'center',marginBottom:15},heroTitle:{fontSize:27,lineHeight:33,fontWeight:'900',color:C.ink,marginBottom:8},heroBody:{fontSize:15.5,lineHeight:23,color:C.muted,textAlign:'center'},button:{height:56,borderRadius:18,backgroundColor:C.green,alignItems:'center',justifyContent:'center',marginTop:14},buttonSecondary:{backgroundColor:'transparent',borderWidth:1,borderColor:C.green},buttonDanger:{backgroundColor:C.red},buttonText:{fontSize:16,fontWeight:'800',color:'#fff'},buttonTextSecondary:{color:C.green},card:{backgroundColor:'#fff',borderRadius:22,borderWidth:1,borderColor:C.line,padding:14,marginBottom:16},cardActive:{borderColor:C.green,backgroundColor:C.pale2},cardDanger:{borderColor:'#FFD5D8'},row:{minHeight:62,flexDirection:'row',alignItems:'center',gap:12,borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:C.line,paddingVertical:10},rowIcon:{width:42,height:42,borderRadius:14,backgroundColor:C.pale,alignItems:'center',justifyContent:'center'},rowTitle:{fontSize:15.5,fontWeight:'750',color:C.ink},rowSub:{fontSize:13,lineHeight:18,color:C.muted,marginTop:3},price:{fontSize:15,fontWeight:'900',color:C.ink},sectionHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:3,marginBottom:10},sectionTitle:{fontSize:17,fontWeight:'850',color:C.ink},sectionAction:{fontSize:13,fontWeight:'750',color:C.green},nav:{height:78,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:C.line,flexDirection:'row',paddingHorizontal:8,paddingBottom:8},navItem:{flex:1,alignItems:'center',justifyContent:'center',gap:3},navLabel:{fontSize:10.5,color:'#7A8780'},navActive:{color:C.green,fontWeight:'800'},days:{flexDirection:'row',justifyContent:'space-between'},day:{width:54,height:68,borderRadius:17,alignItems:'center',justifyContent:'center',backgroundColor:'#F4F7F5'},dayOn:{backgroundColor:C.green},dayTxt:{fontSize:11,color:C.muted},dayNum:{fontSize:18,fontWeight:'850',color:C.ink,marginTop:4},dayTxtOn:{color:'#fff'},textarea:{minHeight:105,borderRadius:20,backgroundColor:'#fff',borderWidth:1,borderColor:C.line,padding:16,textAlignVertical:'top',fontSize:15,color:C.ink,marginBottom:10},info:{flexDirection:'row',gap:9,backgroundColor:C.pale,padding:14,borderRadius:16},infoText:{flex:1,fontSize:13,lineHeight:18,color:C.muted},product:{minHeight:82,borderRadius:19,backgroundColor:'#fff',borderWidth:1,borderColor:C.line,padding:13,flexDirection:'row',alignItems:'center',gap:12,marginBottom:10},productArt:{width:54,height:54,borderRadius:16,backgroundColor:C.pale,alignItems:'center',justifyContent:'center'},swapLine:{alignItems:'center',marginVertical:2},warning:{flexDirection:'row',gap:10,backgroundColor:'#FFF0F1',borderRadius:16,padding:14,marginBottom:16},warningText:{flex:1,color:'#9D3035',fontSize:13.5,lineHeight:19},successWrap:{alignItems:'center',paddingVertical:22},successIcon:{width:96,height:96,borderRadius:48,backgroundColor:C.green,alignItems:'center',justifyContent:'center',marginBottom:18},successTitle:{fontSize:27,fontWeight:'900',color:C.ink,textAlign:'center',marginBottom:10},mono:{fontSize:13,fontWeight:'700',color:C.muted},timeline:{flexDirection:'row',gap:12,alignItems:'center',padding:16},timelineDot:{width:14,height:14,borderRadius:7,backgroundColor:C.green},profile:{alignItems:'center',marginBottom:15},avatar:{width:82,height:82,borderRadius:41,backgroundColor:C.pale,alignItems:'center',justifyContent:'center',marginBottom:10},profileName:{fontSize:19,fontWeight:'850',color:C.ink},stars:{flexDirection:'row',justifyContent:'center',gap:8,marginVertical:18},chips:{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',gap:8,marginBottom:16},chip:{backgroundColor:C.pale,borderRadius:20,paddingHorizontal:14,paddingVertical:9},chipText:{fontSize:13,fontWeight:'700',color:C.green},dealTimer:{height:45,borderRadius:15,backgroundColor:C.ink,flexDirection:'row',gap:8,alignItems:'center',justifyContent:'center',marginBottom:16},dealTxt:{color:'#fff',fontWeight:'800'},grid:{flexDirection:'row',flexWrap:'wrap',gap:12},gridCard:{width:'48%',backgroundColor:'#fff',borderRadius:21,borderWidth:1,borderColor:C.line,padding:13,position:'relative'},gridArt:{height:105,borderRadius:16,backgroundColor:C.pale,alignItems:'center',justifyContent:'center',marginBottom:11},gridTitle:{fontSize:15,fontWeight:'850',color:C.ink},gridSub:{fontSize:12.5,color:C.muted,marginTop:4},add:{position:'absolute',right:10,bottom:10,width:31,height:31,borderRadius:16,backgroundColor:C.green,alignItems:'center',justifyContent:'center'},waHero:{alignItems:'center',paddingVertical:18},waCircle:{width:112,height:112,borderRadius:56,backgroundColor:'#25D366',alignItems:'center',justifyContent:'center',marginBottom:20},phone:{height:56,borderRadius:17,borderWidth:1,borderColor:C.line,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',paddingHorizontal:14,marginTop:6},phoneCode:{fontWeight:'800',color:C.ink,borderRightWidth:1,borderRightColor:C.line,paddingRight:12},phoneInput:{flex:1,paddingLeft:12,fontSize:15},progress:{height:8,backgroundColor:'#DDE6E0',borderRadius:6,overflow:'hidden',marginTop:14},progressFill:{height:'100%',backgroundColor:C.green},trackMeta:{flexDirection:'row',justifyContent:'space-between',marginTop:8},live:{paddingHorizontal:9,paddingVertical:5,borderRadius:12,backgroundColor:'#E6F8EC'},liveTxt:{fontSize:10,fontWeight:'900',color:C.green},voiceHero:{alignItems:'center',paddingVertical:18},voiceRing:{width:168,height:168,borderRadius:84,backgroundColor:'#DDF4E6',alignItems:'center',justifyContent:'center',marginVertical:28},voiceRingLive:{borderWidth:10,borderColor:'#C5EDD4'},voiceButton:{width:112,height:112,borderRadius:56,backgroundColor:C.green,alignItems:'center',justifyContent:'center'},wave:{height:54,flexDirection:'row',alignItems:'center',gap:6,marginBottom:14},waveBar:{width:6,borderRadius:4,backgroundColor:C.green},total:{fontSize:21,fontWeight:'900',color:C.green},emptyWrap:{alignItems:'center',paddingVertical:38},emptyCircle:{width:150,height:150,borderRadius:75,backgroundColor:C.pale,alignItems:'center',justifyContent:'center',marginBottom:22},miniCat:{width:'48%',height:110,borderRadius:18,backgroundColor:'#fff',borderWidth:1,borderColor:C.line,alignItems:'center',justifyContent:'center',gap:8},miniTxt:{fontSize:13.5,fontWeight:'750',color:C.ink},
});
