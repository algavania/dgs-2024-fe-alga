import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://digistar-demo-be.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
