import React, { useState, useEffect, useRef } from "react";
import { sendMessage } from "@services/api";
import ChatForm from "@components/chat/ChatForm";
import ChatMessages from "@components/chat/ChatMessages";
import { useScrollToBottom } from "@/components/scrollToBottomButton/useScrollToBottom";
import { handleSendMessage as handleSendMessageUtil } from "@components/chat/utils";

export default function ChatWindow({ 
  isOpen, 
  onClose, 
  user, 
  conversation, 
  messages: initialMessages,
  onUserCreated,
  onConversationCreated,
  onMessagesUpdated,
  isLoading = false,
  formError = null
}) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
    const {
    showButton: showScrollButton,
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
    checkPositionAfterUpdate,
  } = useScrollToBottom({
    threshold: 150,
    autoScrollDelay: 300,
    initDelay: 100,
    isEnabled: isOpen && !!user && !!conversation,
  });

  useEffect(() => {
    // Sincronizar mensajes cuando cambian desde el componente padre
    if (initialMessages && Array.isArray(initialMessages)) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // Scroll automático cuando hay nuevos mensajes
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
      // Verificar posición después del scroll automático
      setTimeout(() => {
        checkPositionAfterUpdate();
      }, 350);
    }
  }, [messages, scrollToBottom, checkPositionAfterUpdate]);

  // Asegurar que al abrir el chat se posicione al final
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
        checkPositionAfterUpdate();
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, messages.length, scrollToBottom, checkPositionAfterUpdate]);

  // Auto-focus en el input cuando se abre el chat y hay usuario
  useEffect(() => {
    if (isOpen && user && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, user]);

  const handleSendMessage = async (event) => {
    await handleSendMessageUtil({
      event,
      conversation,
      user,
      newMessage,
      isSending,
      setNewMessage,
      setIsSending,
      setError,
      inputRef,
      setMessages,
      onMessagesUpdated,
      sendMessageFn: sendMessage,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 bg-white border border-gray-300 rounded-lg shadow-xl w-96 h-[500px] flex flex-col z-40">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {user ? `Chat - ${user.name}` : "Iniciar Chat"}
        </h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Cerrar chat"
        >
          ✕
        </button>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {!user ? (
          // Formulario de inicio
          <div className="p-4">
            <ChatForm
              onSubmit={onUserCreated}
              isLoading={isLoading}
              error={formError || error}
            />
          </div>
        ) : (
          // Ventana de conversación
          <ChatMessages
            messages={messages}
            isSending={isSending}
            messagesContainerRef={messagesContainerRef}
            messagesEndRef={messagesEndRef}
            showScrollButton={showScrollButton}
            scrollToBottom={scrollToBottom}
            handleSendMessage={handleSendMessage}
            inputRef={inputRef}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            error={error}
            isSendingInput={isSending}
          />
        )}
      </div>
    </div>
  );
}

