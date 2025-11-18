// Función para formatear la fecha y hora
export const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'No disponible';
    const date = new Date(dateTimeString);
    return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

  // Formatear la fecha
  export const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    try {
      return new Date(timestamp).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "";
    }
  };

export const fetchData = async (fetchFunction, setData, setError, setIsLoading) => {
    setIsLoading(true);
    setError(null);
    try {
        const data = await fetchFunction();
        setData(data);
    } catch (error) {
        setError(error.message || 'Error al cargar los datos');
    } finally {
        setIsLoading(false);
    }
};

export const fetchDataById = async (fetchFunction, setData, setError, setIsLoading, id) => {
    setIsLoading(true);
    setError(null);
    try {
        const data = await fetchFunction(id);
        setData(data);
    } catch (error) {
        setError(error.message || 'Error al cargar los datos');
    } finally {
        setIsLoading(false);
    }
};