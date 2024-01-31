import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authTokenReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    authHandler: authTokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export default store;
