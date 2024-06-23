import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // Replace this with your base URL
  timeout: 50000, // Optional timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
   
  },
});

export default axiosInstance;