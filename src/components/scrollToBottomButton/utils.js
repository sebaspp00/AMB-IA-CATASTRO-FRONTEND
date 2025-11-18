/* ==========================
   📜 Utilidades de Scroll
========================== */

/**
 * Verifica si el usuario está cerca del final del scroll
 * @param {HTMLElement} container - Contenedor con scroll
 * @param {number} threshold - Distancia en píxeles desde el final para considerar "cerca" (default: 150)
 * @returns {boolean} - true si está cerca del final, false si no
 */
export const isNearBottom = (container, threshold = 150) => {
    if (!container) return true;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom < threshold;
};

/**
 * Crea una función para verificar la posición del scroll y actualizar el estado del botón
 * @param {HTMLElement} container - Contenedor con scroll
 * @param {Function} setShowButton - Función para actualizar el estado de visibilidad del botón
 * @param {number} threshold - Distancia en píxeles desde el final (default: 150)
 * @returns {Function} - Función que verifica la posición del scroll
 */
export const createScrollPositionChecker = (container, setShowButton, threshold = 150) => {
    return () => {
        if (!container) return;
        try {
            const nearBottom = isNearBottom(container, threshold);
            setShowButton(!nearBottom);
        } catch (error) {
            console.error("Error al verificar posición del scroll:", error);
        }
    };
};

/**
 * Verifica la posición del scroll después de un delay
 * @param {HTMLElement} container - Contenedor con scroll
 * @param {Function} setShowButton - Función para actualizar el estado
 * @param {number} delay - Delay en milisegundos (default: 100)
 * @param {number} threshold - Distancia en píxeles desde el final (default: 150)
 */
export const checkScrollPositionDelayed = (container, setShowButton, delay = 100, threshold = 150) => {
    setTimeout(() => {
        if (container) {
            const nearBottom = isNearBottom(container, threshold);
            setShowButton(!nearBottom);
        }
    }, delay);
};