import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.yoink.darrylmathias.tech/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
