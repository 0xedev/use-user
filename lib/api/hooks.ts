import { useCallback, useEffect, useState } from 'react';

export function listFrom<T = any>(value: any): T[] {
  if (Array.isArray(value)) return value;
  for (const key of ['items', 'data', 'results', 'stores', 'orders', 'carts', 'entries', 'offers']) {
    if (Array.isArray(value?.[key])) return value[key];
  }
  return [];
}

export function firstFrom<T = any>(value: any): T | null {
  if (!value) return null;
  if (value.data && !Array.isArray(value.data)) return value.data as T;
  return value as T;
}

export function money(value: unknown, fallback = '₦0') {
  if (typeof value === 'string') return value.startsWith('₦') ? value : `₦${value}`;
  if (typeof value === 'number') return `₦${value.toLocaleString('en-NG')}`;
  return fallback;
}

export function useApiResource<T>(loader: () => Promise<T>, deps: readonly unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await loader());
    } catch (err: any) {
      setError(err?.message || 'Unable to load data');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { void reload(); }, [reload]);
  return { data, loading, error, reload, setData };
}
