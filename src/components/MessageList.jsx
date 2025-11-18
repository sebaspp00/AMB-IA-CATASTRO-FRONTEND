import React from "react";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, isSending }) {
  if (messages.length === 0 && !isSending) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>Iniciando conversación...</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((message, index) => (
        <MessageItem key={message.id || message.timestamp || index} message={message} />
      ))}
      {isSending && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-sm text-gray-500">Escribiendo...</p>
          </div>
        </div>
      )}
    </>
  );
}

