import axios from 'axios';
import Cookies from 'js-cookie';

export const Http = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_ROOT
});

export const HttpAuth = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_ROOT
});

HttpAuth.interceptors.request.use(config => {
  config.headers.authorization = `${Cookies.get('access-token')}`;

  return config;
});

HttpAuth.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error.response) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 500) {
        localStorage.removeItem('primaryLogin');
        Cookies.remove('access-token', { path: '/', domain: 'localhost' });

        window.location.replace('/');
      }
    }
  }
);
