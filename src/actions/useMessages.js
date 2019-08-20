import { useState } from "react";

let messageId = 0;

const useMessages = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (content) => {
        const newMessages = messages.slice();
        newMessages.push({
            type: "message",
            content,
            messageId: messageId++
        });
        setMessages(newMessages);
    }

    const addError = (content) => {
        const newMessages = messages.slice();
        newMessages.push({
            type: "error",
            content,
            messageId: messageId++
        });
        setMessages(newMessages);
    }

    const clearMessage = (id) => {
        const newMessages = messages.slice();
        const index = messages.find(item => item.messageId === id);
        newMessages.splice(index, 1);
        setMessages(newMessages);
    }

    return { messages, addMessage, addError, clearMessage };
};

export default useMessages;
