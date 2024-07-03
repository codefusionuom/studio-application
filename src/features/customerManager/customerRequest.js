import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerRequest:{
    id:'',
    firstname: '',
    lastname: '',
    email: '',
    mobilePhone: '',
    address: '',
    serviceType: '',
    serviceDate: '',
    note: '',
    status: '',
    createdAt: '',
    updatedAt: '',
},
count:0
};

const customerRequestSlice = createSlice({
  name: 'customerRequest',
  initialState,
  reducers: {
    selectCustomerRequest: (state, action) => {
      state.customerRequest=(action.payload);
    
    },
    resetSelectCustomerRequest: (state, action) => {
      state.customerRequest=initialState.customerRequest;
    
    },
    addCustomerRequest: (state, action) => {
      state.count++;
    },
    resetCustomerRequest: (state, action) => {
      state.count=0;
    }

    
  },
});

export const { resetSelectCustomerRequest,addCustomerRequest,selectCustomerRequest,resetCustomerRequest } = customerRequestSlice.actions;
export default customerRequestSlice.reducer;