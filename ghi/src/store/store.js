import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authTokenReducer from "./authSlice";
import { authApi } from "./authApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    authHandler: authTokenReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
