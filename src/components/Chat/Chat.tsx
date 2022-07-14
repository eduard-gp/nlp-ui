import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../config/config";
import { Reply } from "../../store/chatSlice";
import "./Chat.css";

function Chat({
    conversation
} : {
    conversation: Array<Reply>
}) {
    const [utterance, setUtterance] = useState<string>("");

    function handleUtteranceChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUtterance(e.target.value);
    }

    function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }
    const msg: Array<Reply> = [
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine asdfa ad da"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        },
        {
            responder: "I",
            text: "Ce mai faci? aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa"
        },
        {
            responder: "persona",
            text: "Sunt bine"
        }
    ]

    function sendDemoUtterance() {
        axios({
            method: "post",
            url: `${BASE_URL}/chat/utterance`,
            withCredentials: true,
            data: {
                language: "en",
                utterance: "Hello there"
            }
        }).then((res) => console.log(res))
        .catch((error) => console.error(error));
    }

    return (
        <div className="chat-container">
            <div className="messages-container">
                {msg.map((m: Reply, index: number) => (
                    <div className={`message ${m.responder === "persona" ? "persona-message" : ""}`}
                        key={index}>
                        {m.text}
                    </div>
                ))}
            </div>
            <form className="send-message-menu" onSubmit={handleSendMessage}>
                <input value={utterance} onChange={handleUtteranceChange} />
                <button className="btn">Send</button>
            </form>
            <button onClick={sendDemoUtterance}>Click</button>
        </div>
    );
}

export default Chat;