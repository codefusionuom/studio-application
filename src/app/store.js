import { configureStore } from '@reduxjs/toolkit'
import customerRequestReducer from '../features/customerManager/customerRequest';


export const store = configureStore({
  reducer: {
    customerRequests: customerRequestReducer,
  },
})

