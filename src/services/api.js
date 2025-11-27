// src/services/api.js
import axios from 'axios';
import { config } from '../config.js';

// 🧹 Normalizar la URL base: eliminar barra final si existe
const normalizeBaseURL = (url) => {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

/**
 * Crea una instancia de axios con configuración personalizada
 * @param {Object} customConfig - Configuración personalizada
 * @param {string} [customConfig.apiUrl] - URL base de la API
 * @param {string} [customConfig.apiKey] - API key para autenticación
 * @returns {import('axios').AxiosInstance} Instancia de axios configurada
 */
const createApiInstance = (customConfig = {}) => {
  const baseURL = normalizeBaseURL(customConfig.apiUrl || config.apiUrl);
  const apiKey = customConfig.apiKey || config.api_key;

  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
  });
};

// Instancia por defecto para retrocompatibilidad
const api = createApiInstance();

// Exportar función para crear instancias personalizadas
export { createApiInstance };

/* ==========================
   👥 Gestión de Usuarios
========================== */
export const createUser = async (name, email, customConfig) => {
  const apiInstance = customConfig ? createApiInstance(customConfig) : api;
  const res = await apiInstance.post(`chat/users`, { name, email });
  return res.data.user || res.data;
};

/* ==========================
   💬 Conversaciones
========================== */

export const createConversation = async (userId, title, customConfig) => {
  const apiInstance = customConfig ? createApiInstance(customConfig) : api;
  const res = await apiInstance.post(`chat/conversations`, {
    user_id: userId,
    title,
  });
  return res.data.conversation || res.data;
};

export const sendMessage = async (conversationId, userId, query, customConfig) => {
  const apiInstance = customConfig ? createApiInstance(customConfig) : api;
  const res = await apiInstance.post(`chat/conversations/${conversationId}/query`, {
    user_id: userId,
    query,
  });
  return res.data;
};