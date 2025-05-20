// src/redux/store.ts

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./app/baseApi";
import cartSlice from "./features/cart/cartSlice";
import {orderApi } from "./features/order/orderApi";

// ✅ Only persist the `auth` slice
const authPersistConfig = {
  key: "BikeAuth",
  storage,
};
const cartPersistConfig = {
  key: "BikeCart",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  cart: persistReducer(cartPersistConfig, cartSlice),
  [baseApi.reducerPath]: baseApi.reducer,
   [orderApi.reducerPath]: orderApi.reducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, orderApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
