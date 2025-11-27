import React from "react";
import { ConfigProvider } from "@contexts/ConfigContext";
import { UserProvider } from "@contexts/UserContext";
import ChatButton from "@components/chat/ChatButton";
import "@/index.css";

/**
 * Widget de Chat AMB-IA
 * Componente autocontenido que incluye todo lo necesario para funcionar
 * 
 * @param {Object} props
 * @param {string} [props.apiKey] - API key para autenticación. Si no se proporciona, usa la variable de entorno
 * 
 * @example
 * // Uso básico con API key
 * <ChatWidget apiKey="tu-api-key-aqui" />
 */
export default function ChatWidget({ apiKey }) {
    return (
        <ConfigProvider apiKey={apiKey}>
            <UserProvider>
                <ChatButton />
            </UserProvider>
        </ConfigProvider>
    );
}
