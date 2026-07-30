import { apiRequest, createIdempotencyKey, withQuery } from './client';

export const customerApi = {
  clientConfiguration: () => apiRequest<any>('GET', '/v1/client-configuration', { auth: 'public' }),
  requestOtp: (body: unknown) => apiRequest<any>('POST', '/v1/auth/otp/challenges', { body, auth: 'public', idempotencyKey: createIdempotencyKey('otp') }),
  verifyOtp: (challengeId: string, body: unknown) => apiRequest<any>('POST', `/v1/auth/otp/challenges/${encodeURIComponent(challengeId)}/verify`, { body, auth: 'public' }),
  refreshSession: (body: unknown) => apiRequest<any>('POST', '/v1/auth/sessions/refresh', { body, auth: 'public' }),
  me: () => apiRequest<any>('GET', '/v1/me'),
  sessions: () => apiRequest<any>('GET', '/v1/auth/sessions'),
  revokeSession: (id: string) => apiRequest<void>('POST', `/v1/auth/sessions/${encodeURIComponent(id)}/revoke`),

  cities: (query: Record<string, unknown> = {}) => apiRequest<any>('GET', withQuery('/v1/discovery/cities', query), { auth: 'public' }),
  markets: (cityCode: string, query: Record<string, unknown> = {}) => apiRequest<any>('GET', withQuery(`/v1/discovery/cities/${encodeURIComponent(cityCode)}/markets`, query), { auth: 'public' }),
  stores: (query: Record<string, unknown> = {}) => apiRequest<any>('GET', withQuery('/v1/discovery/stores', query), { auth: 'public' }),
  resolveLocation: (body: unknown) => apiRequest<any>('POST', '/v1/discovery/location-resolution', { body, auth: 'public' }),
  rankStores: (body: unknown) => apiRequest<any>('POST', '/v1/discovery/store-rankings', { body, auth: 'public' }),
  rankingSnapshot: (snapshotId: string, query: Record<string, unknown> = {}) => apiRequest<any>('GET', withQuery(`/v1/discovery/store-rankings/${encodeURIComponent(snapshotId)}`, query), { auth: 'public' }),

  searchCatalogue: (query: Record<string, unknown>) => apiRequest<any>('GET', withQuery('/v1/catalogue/search', query), { auth: 'public' }),
  revalidateOffer: (id: string) => apiRequest<any>('GET', `/v1/catalogue/offers/${encodeURIComponent(id)}/revalidate`, { auth: 'public' }),

  createGuestCartSession: (body: unknown = {}) => apiRequest<any>('POST', '/v1/guest-cart-sessions', { body, auth: 'public', idempotencyKey: createIdempotencyKey('guest-cart') }),
  carts: (query: Record<string, unknown> = {}) => apiRequest<any>('GET', withQuery('/v1/shopping-carts', query), { auth: 'bearer-or-guest' }),
  cart: (id: string) => apiRequest<any>('GET', `/v1/shopping-carts/${encodeURIComponent(id)}`, { auth: 'bearer-or-guest' }),
  createCart: (body: unknown) => apiRequest<any>('POST', '/v1/shopping-carts', { body, auth: 'bearer-or-guest', idempotencyKey: createIdempotencyKey('cart') }),
  replaceCart: (id: string, body: unknown, version?: string) => apiRequest<any>('PUT', `/v1/shopping-carts/${encodeURIComponent(id)}`, { body, auth: 'bearer-or-guest', headers: version ? { 'If-Match': version } : undefined }),
  abandonCart: (id: string) => apiRequest<void>('DELETE', `/v1/shopping-carts/${encodeURIComponent(id)}`, { auth: 'bearer-or-guest' }),
  claimCarts: (body: unknown) => apiRequest<any>('POST', '/v1/shopping-carts/claim', { body, auth: 'bearer-and-guest', idempotencyKey: createIdempotencyKey('claim-cart') }),
  prepareCheckout: (id: string, body: unknown = {}) => apiRequest<any>('POST', `/v1/shopping-carts/${encodeURIComponent(id)}/prepare-checkout`, { body, idempotencyKey: createIdempotencyKey('prepare-checkout') }),
  createQuote: (body: unknown) => apiRequest<any>('POST', '/v1/quotes', { body, idempotencyKey: createIdempotencyKey('quote') }),
  createCheckout: (body: unknown) => apiRequest<any>('POST', '/v1/checkouts', { body, idempotencyKey: createIdempotencyKey('checkout') }),
  initializePayment: (id: string, body: unknown) => apiRequest<any>('POST', `/v1/payment-attempts/${encodeURIComponent(id)}/initialize`, { body, idempotencyKey: createIdempotencyKey('payment') }),
  queryPayment: (id: string, body: unknown = {}) => apiRequest<any>('POST', `/v1/payment-attempts/${encodeURIComponent(id)}/query`, { body }),

  orders: (query: Record<string, unknown> = {}) => apiRequest<any>('GET', withQuery('/v1/orders', query)),
  order: (id: string) => apiRequest<any>('GET', `/v1/orders/${encodeURIComponent(id)}`),
  cancelOrder: (id: string, body: unknown) => apiRequest<any>('POST', `/v1/orders/${encodeURIComponent(id)}/cancel`, { body, idempotencyKey: createIdempotencyKey('cancel-order') }),
  requestRefund: (id: string, body: unknown) => apiRequest<any>('POST', `/v1/orders/${encodeURIComponent(id)}/refund-requests`, { body, idempotencyKey: createIdempotencyKey('refund') }),
  reorder: (id: string, body: unknown = {}) => apiRequest<any>('POST', `/v1/orders/${encodeURIComponent(id)}/reorder`, { body, idempotencyKey: createIdempotencyKey('reorder') }),
  fulfilmentEvents: (id: string, query: Record<string, unknown> = {}) => apiRequest<any>('GET', withQuery(`/v1/orders/${encodeURIComponent(id)}/fulfilment-events`, query)),
  decideSubstitution: (id: string, decision: 'accept' | 'reject', body: unknown = {}) => apiRequest<any>('POST', `/v1/substitution-proposals/${encodeURIComponent(id)}/${decision}`, { body, idempotencyKey: createIdempotencyKey('substitution') }),

  wallet: () => apiRequest<any>('GET', '/v1/wallet'),
  walletEntries: (query: Record<string, unknown> = {}) => apiRequest<any>('GET', withQuery('/v1/wallet/entries', query)),
  createAddress: (body: unknown) => apiRequest<any>('POST', '/v1/addresses', { body, idempotencyKey: createIdempotencyKey('address') }),
  serviceability: (body: unknown) => apiRequest<any>('POST', '/v1/serviceability/evaluations', { body }),

  createSupportCase: (body: unknown) => apiRequest<any>('POST', '/v1/support/cases', { body, idempotencyKey: createIdempotencyKey('support') }),
  uploadSupportEvidence: (caseId: string, body: unknown) => apiRequest<any>('POST', `/v1/support/cases/${encodeURIComponent(caseId)}/evidence`, { body }),

  recordConversationConsent: (id: string, body: unknown) => apiRequest<any>('POST', `/v1/conversations/${encodeURIComponent(id)}/consent`, { body }),
  proposeConversationBasket: (id: string, body: unknown) => apiRequest<any>('POST', `/v1/conversations/${encodeURIComponent(id)}/baskets`, { body, idempotencyKey: createIdempotencyKey('voice-basket') }),
  confirmConversationBasket: (id: string, body: unknown = {}) => apiRequest<any>('POST', `/v1/conversation-baskets/${encodeURIComponent(id)}/confirm`, { body, idempotencyKey: createIdempotencyKey('confirm-basket') }),
  requestConversationHandoff: (id: string, body: unknown = {}) => apiRequest<any>('POST', `/v1/conversations/${encodeURIComponent(id)}/handoff`, { body }),
  consumeConversationContinuation: (body: unknown) => apiRequest<any>('POST', '/v1/conversation-continuations/consume', { body }),
};

export type CustomerApi = typeof customerApi;
