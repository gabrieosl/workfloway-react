import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.workfloway.com",
});

api.interceptors.request.use(
  config => {
    // Do something before request is sent
    // console.log(config);
    // console.log('request');
    return config;
  },
  error => {
    // console.log('request error');
    // Do something with request error
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  response => {
    // Do something with response data
    // console.log('response');

    return response;
  },
  error => {
    // Do something with response error
    // console.log('response error');
    // localStorage.removeItem('@Workfloway:token');
    // localStorage.removeItem('@Workfloway:user');
    // window.location.reload();
    return Promise.reject(error);
  },
);

export default api;
