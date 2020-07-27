import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.API_BACKEND_URL,
  baseURL: 'https://api.workfloway.com',
});

export default api;
