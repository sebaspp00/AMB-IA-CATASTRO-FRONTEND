// src/services/api.js
import axios from 'axios';
import { config } from '../config.js';

// 🧹 Normalizar la URL base: eliminar barra final si existe
const normalizeBaseURL = (url) => {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const baseURL = normalizeBaseURL(config.apiUrl);

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

/* ==========================
   👥 Gestión de Usuarios
========================== */
export const createUser = async (name, email) => {
  const res = await api.post(`chat/users`, { name, email });
  return res.data.user || res.data;
};

/* ==========================
   💬 Conversaciones
========================== */
export const getUserConversations = async (userId) => {
  const res = await api.get(`chat/users/${userId}/conversations`);
  return res.data;
};

export const createConversation = async (userId, title) => {
  const res = await api.post(`chat/conversations`, {
    user_id: userId,
    title,
  });
  return res.data.conversation || res.data;
};

export const sendMessage = async (conversationId, userId, query) => {
  const res = await api.post(`chat/conversations/${conversationId}/query`, {
    user_id: userId,
    query,
  });
  return res.data;
};



/* ==========================
   📄 Gestión de Documentos
========================== */
export const uploadDocument = async (file, userId = null) => {
  const formData = new FormData();
  formData.append('file', file);
  if (userId) formData.append('user_id', userId);

  const res = await api.post(`documents/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const listDocuments = async () => {
  const res = await api.get(`documents`);
  return res.data;
};

export const deleteDocument = async (id) => {
  const res = await api.delete(`documents/${id}`);
  return res.data;
};

export const searchDocuments = async (query, limit = 5, min_score = 0.7) => {
  const res = await api.post(`documents/search`, { query, limit, min_score });
  return res.data;
};

export const getDocumentsStats = async () => {
  const res = await api.get(`documents/stats`);
  return res.data;
};

/* ==========================
   🏥 Health Checks
========================== */
export const getHealth = async () => {
  const res = await api.get(`${baseURL.replace('/api', '')}/health`);
  return res.data;
};

export const getChatHealth = async () => {
  const res = await api.get(`chat/health`);
  return res.data;
};

export const getDocumentsHealth = async () => {
  const res = await api.get(`documents/health`);
  return res.data;
};