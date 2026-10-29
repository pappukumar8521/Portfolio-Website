import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hiremitra_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on admin endpoint, clear stale token
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('hiremitra_admin_token');
        localStorage.removeItem('hiremitra_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Public APIs
export const submitAssessment = (formData) => {
  return api.post('/candidates', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const submitReferralRequest = (formData) => {
  return api.post('/referrals', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const submitContact = (data) => {
  return api.post('/contact', data);
};

export const getPublicData = () => {
  return api.get('/public');
};

// Admin Auth APIs
export const adminLogin = (credentials) => {
  return api.post('/admin/login', credentials);
};

export const getAdminMe = () => {
  return api.get('/admin/me');
};

// Admin Data APIs
export const getAdminStats = () => {
  return api.get('/stats');
};

export const getCandidates = (params) => {
  return api.get('/candidates', { params });
};

export const getCandidateById = (id) => {
  return api.get(`/candidates/${id}`);
};

export const updateCandidate = (id, data) => {
  return api.patch(`/candidates/${id}`, data);
};

export const deleteCandidate = (id) => {
  return api.delete(`/candidates/${id}`);
};

export const getReferrals = (params) => {
  return api.get('/referrals', { params });
};

export const updateReferral = (id, data) => {
  return api.patch(`/referrals/${id}`, data);
};

export const getContacts = (params) => {
  return api.get('/contact', { params });
};

export const updateContact = (id, data) => {
  return api.patch(`/contact/${id}`, data);
};

export default api;

