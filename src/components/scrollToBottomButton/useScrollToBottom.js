import { useState, useEffect, useRef, useCallback } from "react";
import { createScrollPositionChecker, checkScrollPositionDelayed, isNearBottom } from "@/components/scrollToBottomButton/utils";

/**
 * Hook personalizado para manejar el scroll hacia abajo y la visibilidad del botón
 * @param {Object} options - Opciones de configuración
 * @param {number} options.threshold - Distancia en píxeles desde el final (default: 150)
 * @param {number} options.autoScrollDelay - Delay para verificar posición después de scroll automático (default: 300)
 * @param {number} options.initDelay - Delay para verificar posición inicial (default: 100)
 * @returns {Object} - Objeto con refs, estado y funciones
 */
export const useScrollToBottom = ({
  threshold = 150,
  autoScrollDelay = 300,
  initDelay = 100,
  isEnabled = true,
} = {}) => {
  const [showButton, setShowButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Verificar posición después de cambios en los mensajes
  const checkPositionAfterUpdate = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      checkScrollPositionDelayed(
        container,
        setShowButton,
        autoScrollDelay,
        threshold
      );
    }
  }, [autoScrollDelay, threshold]);

  // Configurar listener de scroll cuando el contenedor está disponible
  useEffect(() => {
    if (!isEnabled) {
      setShowButton(false);
      return;
    }

    let checkScrollPosition = null;
    let timeoutId = null;
    let container = null;

    const setupScrollListener = () => {
      container = messagesContainerRef.current;
      if (!container) {
        // Si el contenedor no está disponible, intentar de nuevo después de un delay
        timeoutId = setTimeout(setupScrollListener, 100);
        return;
      }

      // Crear función para verificar posición del scroll
      checkScrollPosition = createScrollPositionChecker(
        container,
        setShowButton,
        threshold
      );

      // Agregar listener
      container.addEventListener("scroll", checkScrollPosition, { passive: true });
      
      // Verificar posición inicial
      checkScrollPositionDelayed(container, setShowButton, initDelay, threshold);
    };

    // Iniciar configuración
    setupScrollListener();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (container && checkScrollPosition) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [threshold, initDelay, isEnabled]);

  // Verificar posición cuando el contenedor esté disponible (como respaldo)
  useEffect(() => {
    if (!isEnabled) return;

    const container = messagesContainerRef.current;
    if (!container) return;

    // Verificar posición después de que el contenedor esté disponible
    const verifyPosition = () => {
      if (container) {
        const nearBottom = isNearBottom(container, threshold);
        setShowButton(!nearBottom);
      }
    };
    
    // Verificar después de un pequeño delay para asegurar que el DOM esté completamente renderizado
    const timeoutId = setTimeout(verifyPosition, 300);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [threshold, isEnabled]);

  return {
    showButton,
    messagesEndRef,
    messagesContainerRef,
    scrollToBottom,
    checkPositionAfterUpdate,
  };
};

