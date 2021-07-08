import axios from 'axios';
import TokenStorage from './token-storage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = TokenStorage.getToken();

  if (token) {
    config.headers['X-Heltek-Token'] = token;
  }

  return config;
});

export default instance;
