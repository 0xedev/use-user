import { configs, screenOrder } from '@/components/StaticCustomerScreen';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GREEN = '#079447';

export default function FeatureCatalog() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={22} color="#142019" />
          </TouchableOpacity>
          <View>
            <Text style={styles.eyebrow}>useMarket customer app</Text>
            <Text style={styles.title}>Complete Frontend Screens</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>22 static customer journeys ready for backend API integration.</Text>
        <View style={styles.grid}>
          {screenOrder.map((slug, index) => {
            const item = configs[slug];
            return (
              <TouchableOpacity
                key={slug}
                style={styles.card}
                onPress={() => router.push({ pathname: '/(features)/[slug]', params: { slug } })}
              >
                <View style={styles.number}><Text style={styles.numberText}>{String(index + 1).padStart(2, '0')}</Text></View>
                <View style={styles.icon}><Ionicons name={item.icon} size={24} color={GREEN} /></View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={2}>{item.subtitle}</Text>
                <View style={styles.open}><Text style={styles.openText}>Open screen</Text><Ionicons name="arrow-forward" size={16} color={GREEN}/></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#F7FAF8'},content:{padding:20,paddingBottom:50},header:{flexDirection:'row',alignItems:'center',gap:14,marginBottom:12},back:{width:42,height:42,borderRadius:21,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#E4ECE7'},eyebrow:{fontSize:12,fontWeight:'800',textTransform:'uppercase',letterSpacing:.8,color:GREEN},title:{fontSize:25,fontWeight:'800',color:'#142019',marginTop:3},subtitle:{fontSize:15,lineHeight:22,color:'#69776F',marginBottom:22},grid:{gap:12},card:{backgroundColor:'#fff',borderRadius:22,padding:17,borderWidth:1,borderColor:'#E4ECE7'},number:{position:'absolute',right:16,top:16,backgroundColor:'#EAF8F0',paddingHorizontal:9,paddingVertical:5,borderRadius:10},numberText:{fontSize:12,fontWeight:'800',color:GREEN},icon:{width:48,height:48,borderRadius:16,backgroundColor:'#EAF8F0',alignItems:'center',justifyContent:'center',marginBottom:13},cardTitle:{fontSize:17,fontWeight:'800',color:'#142019',marginBottom:5},cardSubtitle:{fontSize:13,lineHeight:19,color:'#69776F',paddingRight:40},open:{flexDirection:'row',alignItems:'center',gap:6,marginTop:14},openText:{fontSize:13,fontWeight:'800',color:GREEN}
});
