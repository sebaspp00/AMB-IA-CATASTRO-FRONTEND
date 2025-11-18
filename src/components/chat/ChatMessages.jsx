import React from "react";
import MessageList from "../MessageList";
import ScrollToBottomButton from "../scrollToBottomButton/ScrollToBottomButton";

export default function ChatMessages({
  messages,
  isSending,
  messagesContainerRef,
  messagesEndRef,
  showScrollButton,
  scrollToBottom,
  handleSendMessage,
  inputRef,
  newMessage,
  setNewMessage,
  error,
  isSendingInput,
}) {
  return (
    <>
      {/* Área de mensajes */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 relative"
      >
        <MessageList messages={messages} isSending={isSending} />
        <div ref={messagesEndRef} />
        <div className="sticky bottom-4 flex justify-end pointer-events-none">
          <ScrollToBottomButton
            onClick={scrollToBottom}
            isVisible={showScrollButton}
            className="pointer-events-auto"
          />
        </div>
      </div>

      {/* Formulario de envío de mensajes */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={isSendingInput}
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isSendingInput || !newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors"
          >
            {isSendingInput ? "..." : "Enviar"}
          </button>
        </div>
      </form>
    </>
  );
}

