import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Instancia central de Axios — envía cookies HttpOnly (accessToken/refreshToken)
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error) => {
  refreshQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
  refreshQueue = [];
};

// Interceptor: si el access token expiró (401 + expired: true), intenta refrescar
// una sola vez y reintenta la request original.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const isAuthRoute = originalRequest?.url?.includes('/auth/');

    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/auth/refresh');
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* ─── Helpers de API por recurso ─────────────────────── */

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  google: (credential) => api.post('/auth/google', { credential }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  refresh: () => api.post('/auth/refresh'),
};

export const productsAPI = {
  list: (params) => api.get('/products', { params }),
  get: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
  adjustStock: (id, adjustment) => api.patch(`/products/${id}/stock`, { adjustment }),
};

export const ordersAPI = {
  list: (params) => api.get('/orders', { params }),
  get: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}`, data),
  remove: (id) => api.delete(`/orders/${id}`),
};

export const suppliersAPI = {
  list: (params) => api.get('/suppliers', { params }),
  get: (id) => api.get(`/suppliers/${id}`),
  create: (data) => api.post('/suppliers', data),
  update: (id, data) => api.put(`/suppliers/${id}`, data),
  remove: (id) => api.delete(`/suppliers/${id}`),
};

export const adminAPI = {
  dashboard: (params) => api.get('/admin/dashboard', { params }),
  salesTrend: (params) => api.get('/admin/sales-trend', { params }),
  transactions: (params) => api.get('/admin/transactions', { params }),
  financialReport: () => api.get('/admin/financial-report'),
  users: (params) => api.get('/admin/users', { params }),
  buyers: () => api.get('/admin/buyers'),
};

export const manualOrdersAPI = {
  create: (data) => api.post('/orders/manual', data),
};

export const reservationsAPI = {
  list: (params) => api.get('/reservations', { params }),
  create: (data) => api.post('/reservations', data),
  fulfill: (id) => api.patch(`/reservations/${id}/fulfill`),
  cancel: (id) => api.patch(`/reservations/${id}/cancel`),
};

export const supplierOrdersAPI = {
  list: () => api.get('/supplier-orders'),
  create: (data) => api.post('/supplier-orders', data),
  update: (id, data) => api.put(`/supplier-orders/${id}`, data),
  remove: (id) => api.delete(`/supplier-orders/${id}`),
};

export const dispatchesAPI = {
  list: () => api.get('/dispatches'),
  create: (data) => api.post('/dispatches', data),
  update: (id, data) => api.put(`/dispatches/${id}`, data),
  remove: (id) => api.delete(`/dispatches/${id}`),
};

export const paymentMethodsAPI = {
  list: () => api.get('/payment-methods'),
  create: (data) => api.post('/payment-methods', data),
  update: (id, data) => api.put(`/payment-methods/${id}`, data),
  remove: (id) => api.delete(`/payment-methods/${id}`),
};

export const leadsAPI = {
  list: () => api.get('/leads'),
  create: (data) => api.post('/leads', data),
  update: (id, data) => api.put(`/leads/${id}`, data),
  remove: (id) => api.delete(`/leads/${id}`),
};

export default api;
