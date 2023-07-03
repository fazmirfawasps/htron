import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
const refreshAccessToken = async () => {
  try {
    console.log('refresh console ');
    const response = await api.post('/admin/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    console.log(response.data);
    localStorage.setItem('accessToken', response.data.accessToken);
    return true;
  } catch (error) {
    return false;
  }
};
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refreshAccessToken().then((success) => {
        if (success) {
          return api(originalRequest);
        } else {
          return Promise.reject(error);
        }
      });
    }
    return Promise.reject(error);
  },
);

export default api;
