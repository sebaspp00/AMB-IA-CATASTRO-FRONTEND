import React, { createContext, useContext } from "react";
import { config as defaultConfig } from "@/config";

/**
 * Contexto de configuración del widget
 * Permite pasar configuraciones como apiKey desde el componente padre
 */
const ConfigContext = createContext(null);

/**
 * Hook para acceder a la configuración del widget
 * @returns {Object} Objeto con la configuración (apiKey, apiUrl, etc.)
 */
export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfig debe usarse dentro de ConfigProvider");
    }
    return context;
};

/**
 * Provider de configuración para el widget
 * @param {Object} props
 * @param {string} props.apiKey - API key para autenticación (opcional)
 * @param {React.ReactNode} props.children - Componentes hijos
 */
export const ConfigProvider = ({ apiKey, children }) => {
    const configValue = {
        apiKey: apiKey || defaultConfig.api_key,
        apiUrl: defaultConfig.apiUrl, // Siempre usa la URL de la variable de entorno
        appName: defaultConfig.appName,
        env: defaultConfig.env,
    };

    return (
        <ConfigContext.Provider value={configValue}>
            {children}
        </ConfigContext.Provider>
    );
};
