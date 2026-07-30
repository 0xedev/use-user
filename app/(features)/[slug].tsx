import StaticCustomerScreen from '@/components/StaticCustomerScreen';
import { useLocalSearchParams } from 'expo-router';

export default function CustomerFeatureRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return <StaticCustomerScreen slug={slug ?? 'schedule-delivery'} />;
}
