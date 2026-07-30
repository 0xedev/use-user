import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureApiAuth } from './client';

const ACCESS_TOKEN = 'usemarket.accessToken';
const REFRESH_TOKEN = 'usemarket.refreshToken';
const GUEST_CART_TOKEN = 'usemarket.guestCartToken';
const ACCOUNT = 'usemarket.account';

export type StoredSession = {
  accessToken: string;
  refreshToken?: string;
  account?: unknown;
};

export const apiSession = {
  async initialise() {
    configureApiAuth({
      getAccessToken: () => AsyncStorage.getItem(ACCESS_TOKEN),
      getGuestCartToken: () => AsyncStorage.getItem(GUEST_CART_TOKEN),
    });
  },
  async saveSession(session: StoredSession) {
    await AsyncStorage.multiSet([
      [ACCESS_TOKEN, session.accessToken],
      ...(session.refreshToken ? [[REFRESH_TOKEN, session.refreshToken] as [string, string]] : []),
      ...(session.account ? [[ACCOUNT, JSON.stringify(session.account)] as [string, string]] : []),
    ]);
  },
  async saveGuestCartToken(token: string) {
    await AsyncStorage.setItem(GUEST_CART_TOKEN, token);
  },
  async getAccessToken() { return AsyncStorage.getItem(ACCESS_TOKEN); },
  async getRefreshToken() { return AsyncStorage.getItem(REFRESH_TOKEN); },
  async getGuestCartToken() { return AsyncStorage.getItem(GUEST_CART_TOKEN); },
  async getAccount<T = unknown>() {
    const value = await AsyncStorage.getItem(ACCOUNT);
    return value ? JSON.parse(value) as T : null;
  },
  async clearSession() {
    await AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN, ACCOUNT]);
  },
  async clearAll() {
    await AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN, GUEST_CART_TOKEN, ACCOUNT]);
  },
};
