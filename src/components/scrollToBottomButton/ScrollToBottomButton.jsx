import React from "react";

export default function ScrollToBottomButton({ onClick, isVisible, className = "" }) {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all flex items-center justify-center hover:scale-110 active:scale-95 ${className}`}
      aria-label="Ir al final de la conversación"
      title="Ir al final"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
}

