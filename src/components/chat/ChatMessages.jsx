import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
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
  React.useEffect(() => {
    if (inputRef?.current) {
      const textarea = inputRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newMessage]);

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

      {/* Formulario de mensaje (MEJORADO) */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-200 shadow-sm"
      >
        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="flex items-end gap-3">
          
          {/* Contenedor mejorado para el textarea */}
          <div className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 flex items-center hover:bg-gray-200 transition">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Escribe un mensaje..."
              disabled={isSendingInput}
              className="w-full bg-transparent outline-none resize-none overflow-hidden text-sm"
              rows={1}
            />
          </div>

          {/* Botón redondo con icono */}
          <button
            type="submit"
            disabled={isSendingInput || !newMessage.trim()}
            className={`bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full flex items-center justify-center 
                        ${
                          isSendingInput || !newMessage.trim()
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                        }`}
          >
            <PaperAirplaneIcon className="w-5 h-5 rotate-0" />
          </button>

        </div>
      </form>
    </>
  );
}


