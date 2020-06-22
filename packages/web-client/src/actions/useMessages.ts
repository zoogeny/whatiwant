import { useState } from "react";

import { Message } from "@wiw/types";

let messageId = 0;

const useMessages = (): {
    messages: Message[],
    addMessage: (content: string) => void;
    addError: (content: string) => void;
    clearMessage: (id: number) => void;
} => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (content: string) => {
        const newMessages = messages.slice();
        newMessages.push({
            type: "message",
            content,
            messageId: messageId++,
        });
        setMessages(newMessages);
    };

    const addError = (content: string) => {
        const newMessages = messages.slice();
        newMessages.push({
            type: "error",
            content,
            messageId: messageId++,
        });
        setMessages(newMessages);
    };

    const clearMessage = (id: number) => {
        const newMessages = messages.filter(message => message.messageId !== id);
        setMessages(newMessages);
    };

    return { messages, addMessage, addError, clearMessage };
};

export default useMessages;
