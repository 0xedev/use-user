import FinalCustomerScreen from '@/components/FinalCustomerScreen';
import { useLocalSearchParams } from 'expo-router';

export default function CustomerFeatureRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return <FinalCustomerScreen slug={slug ?? 'schedule-delivery'} />;
}
