import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true, // Inclui cookies para autenticação
});

export default api;
