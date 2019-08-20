import React from "react";
import PropTypes from "prop-types";
import "./Messages.scss";

const Message = ({ message, handleClearMessage }) => {
    const removeMesage = (event) => {
        const id = parseInt(event.target.dataset.id, 10);
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

const Messages = ({ messages, handleClearMessage }) => {
    return (
        <ul className="message">
            { messages.map(message => <Message
                key={ message.id} 
                message={ message } 
                handleClearMessage={ handleClearMessage } />) }
        </ul>
    );
}

Message.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(["error", "message"]),
        content: PropTypes.string,
        messageId: PropTypes.number
    })),
    handleClearMessage: PropTypes.func
};

Message.defaultProps = {
    messages: [],
    handleClearMessage: () => {}
};

export default Messages;
