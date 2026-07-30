import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Item = { icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string };

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  items?: Item[];
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  accent?: string;
};

const GREEN = '#0B7A3E';

export default function FeatureScreen({
  eyebrow = 'useMarket',
  title,
  description,
  icon,
  items = [],
  primaryLabel = 'Continue',
  secondaryLabel,
  onPrimary,
  accent = GREEN,
}: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity accessibilityLabel="Go back" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={22} color="#162019" />
          </TouchableOpacity>
          <Text style={styles.brand}>useMarket</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={[styles.hero, { backgroundColor: `${accent}14` }]}>
          <View style={[styles.heroIcon, { backgroundColor: accent }]}>
            <Ionicons name={icon} size={34} color="#FFFFFF" />
          </View>
          <Text style={[styles.eyebrow, { color: accent }]}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {items.length > 0 && (
          <View style={styles.list}>
            {items.map((item) => (
              <View key={item.title} style={styles.item}>
                <View style={[styles.itemIcon, { backgroundColor: `${accent}12` }]}>
                  <Ionicons name={item.icon} size={22} color={accent} />
                </View>
                <View style={styles.itemCopy}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94A19A" />
              </View>
            ))}
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.primary, { backgroundColor: accent }]} onPress={onPrimary}>
            <Text style={styles.primaryText}>{primaryLabel}</Text>
          </TouchableOpacity>
          {secondaryLabel ? (
            <TouchableOpacity style={styles.secondary} onPress={() => router.back()}>
              <Text style={[styles.secondaryText, { color: accent }]}>{secondaryLabel}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FBF9' },
  content: { padding: 20, paddingBottom: 36 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  back: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E6ECE8' },
  brand: { fontSize: 20, fontWeight: '800', color: GREEN },
  headerSpacer: { width: 42 },
  hero: { borderRadius: 28, padding: 24, alignItems: 'center', marginBottom: 20 },
  heroIcon: { width: 68, height: 68, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  eyebrow: { fontSize: 13, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800', color: '#162019', textAlign: 'center', marginBottom: 10 },
  description: { fontSize: 16, lineHeight: 24, color: '#5F6D65', textAlign: 'center' },
  list: { backgroundColor: '#FFFFFF', borderRadius: 24, paddingHorizontal: 16, borderWidth: 1, borderColor: '#E8EEE9' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5EAE7' },
  itemIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  itemCopy: { flex: 1, paddingRight: 8 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: '#1B2620', marginBottom: 3 },
  itemSubtitle: { fontSize: 13, lineHeight: 18, color: '#718078' },
  actions: { marginTop: 24, gap: 12 },
  primary: { minHeight: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  secondary: { minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { fontSize: 15, fontWeight: '700' },
});
