/* ==========================
   💬 Utilidades de Chat
========================== */

const buildMessagePair = (userMessage, result, offset = 0) => {
    const baseTimestamp = Date.now() + offset;

    const userMessageObject = {
        id: result?.user_message_id || `user-${baseTimestamp}`,
        role: "user",
        content: userMessage,
        timestamp: new Date(baseTimestamp).toISOString(),
    };

    const assistantMessageObject = {
        id: result?.assistant_message_id || `assistant-${baseTimestamp}`,
        role: "assistant",
        content: result?.response || "",
        timestamp: new Date(baseTimestamp + 10).toISOString(),
        context_used: result?.context_used ?? null,
        sources_count: result?.sources_count ?? null,
    };

    return { userMessageObject, assistantMessageObject };
};

export const initializeChatSession = async ({
    formData,
    createUserFn,
    createConversationFn,
    sendMessageFn,
}) => {
    if (!createUserFn || !createConversationFn || !sendMessageFn) {
        throw new Error("Faltan dependencias para inicializar el chat.");
    }

    const newUser = await createUserFn(formData.name, formData.email);
    const conversationTitle = `chat with ${formData.name}`;
    const newConversation = await createConversationFn(newUser.id, conversationTitle);

    const initialResponse = await sendMessageFn(newConversation.id, newUser.id, "hola");

    if (!initialResponse || initialResponse.success === false) {
        throw new Error("No se pudo enviar el mensaje inicial.");
    }

    const { userMessageObject, assistantMessageObject } = buildMessagePair(
        "hola",
        initialResponse
    );

    return {
        user: newUser,
        conversation: newConversation,
        initialMessages: [assistantMessageObject],
    };
};

export const sendChatMessagePair = async ({
    conversationId,
    userId,
    message,
    sendMessageFn,
}) => {
    if (!sendMessageFn) {
        throw new Error("Falta la función para enviar mensajes.");
    }

    const result = await sendMessageFn(conversationId, userId, message);

    if (!result || result.success === false) {
        throw new Error("La API no retornó una respuesta válida.");
    }

    return buildMessagePair(message, result);
};

export const handleSendMessage = async ({
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
    sendMessageFn,
}) => {
    event?.preventDefault?.();

    if (!newMessage?.trim() || isSending || !conversation || !user) return;

    const trimmedMessage = newMessage.trim();
    setNewMessage("");
    setIsSending(true);
    setError(null);

    try {
        const { userMessageObject, assistantMessageObject } = await sendChatMessagePair({
            conversationId: conversation.id,
            userId: user.id,
            message: trimmedMessage,
            sendMessageFn,
        });

        setMessages((prevMessages) => {
            const updatedList = [...prevMessages, userMessageObject, assistantMessageObject];
            onMessagesUpdated?.(updatedList);
            return updatedList;
        });

        if (inputRef?.current) {
            inputRef.current.focus();
        }
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        setError("No se pudo enviar el mensaje. Por favor, intenta nuevamente.");
        setNewMessage(trimmedMessage);
        if (inputRef?.current) {
            inputRef.current.focus();
        }
    } finally {
        setIsSending(false);
    }
};

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