// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, //ono sto sam napravila u authslice u onom reducer a to je da cuva token
  },
});
//Kutija u kojoj cuvam podatke na osnovu pravila definisanog u authslice