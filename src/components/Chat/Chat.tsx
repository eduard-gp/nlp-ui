import React, { useEffect, useState } from "react";

import { Reply } from "../../store/chatSlice";

import "./Chat.css";

function Chat({
    conversation,
    disabled,
    handleSendMessage
} : {
    conversation: Array<Reply>,
    disabled: boolean,
    handleSendMessage: (message: string) => void
}) {
    const [utterance, setUtterance] = useState<string>("");

    function handleUtteranceChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUtterance(e.target.value);
    }

    useEffect(() => {
        const d = document.querySelector(".messages-container");
        if (d) {
            d.scrollTop = d.scrollHeight;
        }
    });

    return (
        <div className="chat-container">
            <div className="messages-container">
                {conversation.map((m: Reply, index: number) => (
                    <div className={`message ${m.responder === "persona" ? "persona-message" : ""}`}
                        key={index}>
                        {m.text}
                    </div>
                ))}
            </div>
            <form className="send-message-menu" onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(utterance);
                setUtterance("");
            }}>
                <input value={utterance}
                       onChange={handleUtteranceChange}
                       disabled={disabled} />
                <button className="btn"
                        disabled={disabled}>Send</button>
            </form>
        </div>
    );
}

export default Chat;