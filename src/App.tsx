import React from "react";

import Message from "./components/Messages";
import Wants from "./components/Wants";
import Summary from "./components/Summary";

import useWants from "./actions/wants/useWants";
import useMessages from "./actions/useMessages";

import "./App.scss";

const App: React.FC = () => {
    const { messages, addError, addMessage, clearMessage } = useMessages();
    const { wantList, initiateAdd, initiateDelete } = useWants(addMessage, addError);

    return (
        <div className="app">
            <Message
                messages={ messages }
                handleClearMessage={ clearMessage } />

            <div className="application">
                <Wants wants={ wantList } initiateAdd={ initiateAdd } initiateDelete={ initiateDelete } />
                <Summary wants={ wantList } />
            </div>
        </div>
    );
}

export default App;
