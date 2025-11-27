// Configuración de la aplicación
// En modo desarrollo usa variables de entorno
// En modo producción (widget) usa URL hardcodeada
export const config = {
  apiUrl: import.meta.env.VITE_API_URL_PROD,
  appName: import.meta.env.VITE_APP_NAME || 'AMB-IA',
  env: import.meta.env.VITE_ENV || 'production',
  api_key: import.meta.env.VITE_API_KEY,
}