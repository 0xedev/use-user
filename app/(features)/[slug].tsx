import ApiConnectedCustomerScreen from '@/components/ApiConnectedCustomerScreen';
import { useLocalSearchParams } from 'expo-router';

export default function CustomerFeatureRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return <ApiConnectedCustomerScreen slug={slug ?? 'schedule-delivery'} />;
}
