import axios from 'axios';

// En producción usamos ruta relativa '/api' (mismo origen que el frontend en
// Vercel). Un rewrite en vercel.json la proxea al backend de Render, lo que
// hace que las cookies de auth sean "same-site" para el navegador y evita que
// Safari/iOS (ITP) las bloquee como cookies cross-site de terceros — eso era
// lo que rompía el login/datos en mobile mientras en desktop (Chrome) andaba.
const API_URL = import.meta.env.VITE_API_URL || '/api';

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
//
// Importante: NO excluimos TODAS las rutas '/auth/*' del refresh-retry.
// '/auth/me' (chequeo de sesión al cargar la página) necesita poder
// refrescar igual que cualquier otra ruta: el access token dura solo 15
// minutos, así que si el admin deja la pestaña abierta más tiempo y
// recarga, '/auth/me' da 401 aunque el refresh token (7-30 días) siga
// siendo válido. Antes, al estar excluida, esto tiraba al usuario al
// login innecesariamente en vez de refrescar la sesión en silencio.
// Las rutas de abajo sí deben quedar excluidas porque su propio 401 es
// una respuesta de negocio (credenciales inválidas) o porque reintentarlas
// podría crear un loop (refresh llamándose a sí mismo).
const NO_REFRESH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/google',
  '/auth/refresh',
  '/auth/logout',
  '/auth/change-password',
];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const isNoRefreshRoute = NO_REFRESH_ROUTES.some((path) => originalRequest?.url?.includes(path));

    if (status === 401 && !originalRequest._retry && !isNoRefreshRoute) {
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
  changePassword: (data) => api.put('/auth/change-password', data),
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
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
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
  list: (params) => api.get('/payment-methods', { params }),
  create: (data) => api.post('/payment-methods', data),
  update: (id, data) => api.put(`/payment-methods/${id}`, data),
  remove: (id) => api.delete(`/payment-methods/${id}`),
};

export const paymentsAPI = {
  createPreference: (data) => api.post('/payments/create-preference', data),
  status: (orderId) => api.get(`/payments/status/${orderId}`),
};

export const leadsAPI = {
  list: () => api.get('/leads'),
  create: (data) => api.post('/leads', data),
  update: (id, data) => api.put(`/leads/${id}`, data),
  remove: (id) => api.delete(`/leads/${id}`),
};

export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export default api;
