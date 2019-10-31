import React from "react";

import { Message } from "../types";

import "./Messages.scss";

type MessageProps = {
    message: Message;
    handleClearMessage: (id: number) => void;
};

const MessageItem: React.SFC<MessageProps> = ({ message, handleClearMessage }) => {
    const removeMesage = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        const id = parseInt(event.currentTarget.dataset.id as string, 10);
        handleClearMessage(id);
    };

    const additionalClass = message.type === "error" ? "message__item--error" : "";
    return (
        <li className={ `message__item ${ additionalClass }` } key={ message.messageId }>
            <span className="message__item__text">{ message.content }</span>
            <button className="message__item__clear" onClick={ removeMesage } data-id={ message.messageId }>X</button>
        </li>
    );
};

type MessagesProps = {
    messages: Message[];
    handleClearMessage: (id: number) => void;
};

const Messages: React.SFC<MessagesProps> = ({
    messages = [],
    handleClearMessage = () => {},
}) => {
    return (
        <ul className="message">
            { messages.map(message => <MessageItem
                key={ message.messageId }
                message={ message }
                handleClearMessage={ handleClearMessage } />) }
        </ul>
    );
};

export default Messages;
