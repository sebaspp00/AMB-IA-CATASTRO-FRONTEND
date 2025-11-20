import React, { useState } from "react";
import { createUser, createConversation, sendMessage } from "@services/api";
import { useUser } from "@contexts/UserContext";
import ChatWindow from "@components/chat/ChatWindow";
import { initializeChatSession } from "@components/chat/utils";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";


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
      <button
        onClick={toggleChat}
        className="
          fixed bottom-6 right-6
          bg-gradient-to-br from-blue-600 to-blue-700
          hover:from-blue-700 hover:to-blue-800
          text-white
          w-14 h-14
          rounded-full
          shadow-xl
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110 hover:shadow-2xl
          active:scale-95
          z-50
        "
        aria-label="Abrir chat"
      >
        <ChatBubbleLeftRightIcon className="w-7 h-7" />
      </button>


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
