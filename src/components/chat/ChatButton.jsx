import React, { useState } from "react";
import { createUser, createConversation, sendMessage } from "../../services/api";
import { useUser } from "../../contexts/UserContext";
import ChatWindow from "./ChatWindow";
import { initializeChatSession } from "./utils";

export default function ChatButton() {
  const { user, userId, saveUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleFormSubmit = async (formData) => {
    setError(null);
    setIsLoading(true);

    try {
      const { user: newUser, conversation: newConversation, initialMessages } =
        await initializeChatSession({
          formData,
          createUserFn: createUser,
          createConversationFn: createConversation,
          sendMessageFn: sendMessage,
        });

      saveUser(newUser);
      setConversation(newConversation);
      setMessages(initialMessages);
    } catch (err) {
      console.error(err);
      setError("No se pudo iniciar el chat. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessagesUpdated = (updatedMessages) => {
    // Asegurarse de que updatedMessages es un array válido
    if (Array.isArray(updatedMessages)) {
      setMessages(updatedMessages);
    }
  };

  return (
    <>
      {/* 🟢 Botón flotante - Parte inferior derecha */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all z-50"
        aria-label="Abrir chat"
      >
        💬
      </button>

      {/* 🗨️ Ventana de chat */}
      <ChatWindow
        isOpen={isOpen}
        onClose={toggleChat}
        user={user}
        conversation={conversation}
        messages={messages}
        onUserCreated={handleFormSubmit}
        onConversationCreated={setConversation}
        onMessagesUpdated={handleMessagesUpdated}
        isLoading={isLoading}
        formError={error}
      />
    </>
  );
}
