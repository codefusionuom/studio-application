import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//createSlice: function from Redux Toolkit is used to create a slice of the Redux state along with the corresponding actions and reducers.
//createAsyncThunk:function is used to create an asynchronous thunk, which is a function that performs asynchronous logic and interacts with the Redux store.
import axios from 'axios';
import axiosInstance from '../config/axios.config';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login', //action type, which is used to identify this particular action
  async (credentials, { rejectWithValue }) => {
    try {
      
      const response = await axiosInstance.post('superAdmin/admin/auth', credentials);
      const token = response.data.token;
      // Save token in local storage
      localStorage.setItem('token', token);
      // console.log('loged');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for loading user
export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
  try {
    
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const response = await axiosInstance.get('superAdmin/admin/auth', {
      headers: { 'x-auth-token': token }
    });
    // console.log('loaded');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    admin: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearAuthState(state) {
      state.token = null;
      state.admin = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout,clear } = authSlice.actions;

export default authSlice.reducer;
