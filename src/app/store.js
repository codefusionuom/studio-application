import { configureStore } from '@reduxjs/toolkit' //configureStore: This function from Redux Toolkit simplifies the process of setting up a Redux store. It automatically sets up the Redux DevTools extension and middleware for you.
import customerRequestReducer from '../features/customerManager/customerRequest';
import authReducer from './authSlice'; //function that manages the authentication state

export const store = configureStore({
  reducer: {
    customerRequests: customerRequestReducer,
    auth: authReducer,
  },
});

