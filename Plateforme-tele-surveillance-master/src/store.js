/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import { adminAuthApi } from '../services/adminAuthApi'
import { setupListeners } from '@reduxjs/toolkit/query'

// import userReducer from '../features/userSlice'
// import authReducer from '../features/authSlice'
export const store = configureStore({
  reducer: {
    [adminAuthApi.reducerPath]: adminAuthApi.reducer
    // user: userReducer,
    // auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminAuthApi.middleware),
})
setupListeners(store.dispatch)