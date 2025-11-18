import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatTimestamp } from "../utils";

export default function MessageItem({ message }) {
  const isUserMessage = message.role === "user";

  const content =
    message.content ||
    message.query ||
    message.message ||
    message.response ||
    "";

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUserMessage
            ? "bg-blue-600 text-white"
            : "bg-white border border-gray-200 text-gray-800"
        }`}
      >
        {isUserMessage ? (
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none text-sm prose-p:leading-snug prose-pre:bg-gray-100 prose-pre:p-2 prose-pre:rounded-md prose-code:text-blue-600">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}

        {message.timestamp && (
          <p
            className={`text-xs mt-1 ${
              isUserMessage ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {formatTimestamp(message.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}


