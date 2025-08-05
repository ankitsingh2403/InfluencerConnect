import axios from 'axios';

const API = axios.create({
  baseURL: 'https://influencerconnect1.onrender.com/api', // Your backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
