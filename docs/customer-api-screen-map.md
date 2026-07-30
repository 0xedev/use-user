# Customer frontend → backend API map

Backend source: `0xedev/useMarket` OpenAPI 3.1 contract (`177 operations`, `169 path templates`).

## Existing customer journeys

| Journey | Backend operations |
| --- | --- |
| OTP login | `requestOtpChallenge`, `verifyOtpChallenge`, `refreshSession` |
| Account/session | `getCurrentAccount`, `listSessions`, `revokeSession`, `revokeDevice` |
| City/market/store discovery | `listDiscoveryCities`, `listDiscoveryMarkets`, `listDiscoveryStores`, `resolveDiscoveryLocation`, `createDiscoveryStoreRanking`, `getDiscoveryStoreRankingSnapshot` |
| Catalogue/search | `searchCatalogue`, `revalidateCatalogueOffer` |
| Guest shopping | `createGuestCartSession`, shopping-cart operations, `claimShoppingCarts` |
| Cart | `listShoppingCarts`, `createShoppingCart`, `getShoppingCart`, `replaceShoppingCart`, `abandonShoppingCart` |
| Checkout/payment | `prepareShoppingCartCheckout`, `createQuote`, `createCheckout`, `initializePayment`, `queryPayment` |
| Orders | `listCustomerOrders`, `getOrderStatus`, `reorderCustomerOrder` |
| Live tracking | `getFulfilmentEventBackfill`, `streamFulfilmentEvents` |
| Wallet | `getCustomerWallet`, `listCustomerWalletEntries` |
| Address/serviceability | `createAddressVersion`, `evaluateServiceability` |
| Support | `createSupportCase`, `uploadSupportEvidence`, `accessSupportEvidence` |

## New 22 screens

| Screen | API binding |
| --- | --- |
| Schedule delivery | quote/checkout delivery-window data; no dedicated schedule mutation in current customer contract |
| Delivery instructions | checkout/cart payload; no dedicated instruction endpoint |
| Substitution approval | `decideSubstitutionProposal` |
| Item out of stock | `revalidateCatalogueOffer`, `replaceShoppingCart` |
| Cancel order | `cancelCustomerOrder` |
| Refund / return request | `createOrderRefundRequest` |
| Refund request submitted | response from `createOrderRefundRequest` + `getOrderStatus` |
| Rate vendor | no rating/review endpoint in current contract |
| Rate rider | no rating/review endpoint in current contract |
| Collections | `searchCatalogue` (collection/category filters depend on contract payload) |
| Flash deals | `searchCatalogue`; promotion read endpoint is not customer-facing in current contract |
| Nearby stores | discovery ranking and store endpoints |
| Recommended for you | no customer recommendation endpoint; use catalogue/discovery fallback only |
| Recently viewed | no backend endpoint; device-local history required |
| Connect WhatsApp | no customer account-link endpoint; Meta webhook endpoints are server-to-server only |
| Connect WhatsApp alternate | same limitation as above |
| Reconnect WhatsApp | same limitation as above |
| WhatsApp order tracking | `listCustomerOrders`, `getOrderStatus`, fulfilment events |
| Voice ordering start | `recordConversationConsent` |
| Voice listening | voice transport is not exposed as a customer HTTP upload endpoint in the current contract |
| Voice confirm items | `proposeConversationBasket`, `confirmConversationBasket` |
| Empty cart | `listShoppingCarts`, `getShoppingCart` |

## Required backend additions

1. Customer vendor/rider ratings and review submission.
2. Customer-facing promotions/flash-deals feed.
3. Personalised recommendations feed.
4. Recently-viewed sync, unless intentionally local-only.
5. WhatsApp account connect/reconnect/status endpoints.
6. Customer voice-audio ingestion/session endpoint.
7. Explicit delivery-slot selection and delivery-instruction persistence, unless these are fields on checkout requests.

The frontend must keep static/local fallbacks for unsupported operations until these endpoints are added to the OpenAPI contract.
