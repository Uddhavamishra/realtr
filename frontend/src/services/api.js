import axios from "axios";

// Backend base URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://realtr-backend.onrender.com/";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   PROJECTS API
========================= */
export const projectsAPI = {
  getAll: () => api.get("/api/projects"),
  getById: (id) => api.get(`/api/projects/${id}`),
  create: (formData) =>
    api.post("/api/projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    api.put(`/api/projects/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/api/projects/${id}`),
};

/* =========================
   CLIENTS API
========================= */
export const clientsAPI = {
  getAll: () => api.get("/api/clients"),
  getById: (id) => api.get(`/api/clients/${id}`),
  create: (formData) =>
    api.post("/api/clients", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    api.put(`/api/clients/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/api/clients/${id}`),
};

/* =========================
   CONTACTS API
========================= */
export const contactsAPI = {
  getAll: () => api.get("/api/contacts"),
  create: (data) => api.post("/api/contacts", data),
  delete: (id) => api.delete(`/api/contacts/${id}`),
};

/* =========================
   NEWSLETTER API
========================= */
export const newsletterAPI = {
  getAll: () => api.get("/api/newsletter"),
  subscribe: (email) => api.post("/api/newsletter", { email }),
  unsubscribe: (id) => api.delete(`/api/newsletter/${id}`),
};

export default api;
