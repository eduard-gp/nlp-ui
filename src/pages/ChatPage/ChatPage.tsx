import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Chat, InputFilter } from "../../components";
import { BASE_URL } from "../../config/config";
import {
    addReplay,
    resetConversation,
    selectConversation,
    selectSelectedPersona,
    setSelectedPersona
} from "../../store/chatSlice";
import { getPersonas, selectPersonas } from "../../store/personasSlice";
import { AppDispatch } from "../../store/store";
import { Persona } from "../PersonaPage/models";

import "./ChatPage.css";

function ChatPage() {
    const dispatch = useDispatch<AppDispatch>();
    const personas = useSelector(selectPersonas);
    const selectedPersona = useSelector(selectSelectedPersona);
    const conversation = useSelector(selectConversation);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        dispatch(getPersonas());
    }, []);

    function projectPersona(persona: Persona): string {
        if (persona) {
            return persona.description.case;
        }
        return "";
    }

    function handleSelectedPersona(persona: Persona) {
        dispatch(setSelectedPersona(persona));
    }

    function handleSendMessage(message: string) {
        axios({
            method: "post",
            url: `${BASE_URL}/chat/utterance`,
            withCredentials: true,
            data: {
                language: selectedPersona["language"],
                persona_id: selectedPersona["_id"]["$oid"],
                utterance: message
            }
        }).then((res) => {
            dispatch(addReplay({
                responder: "I",
                text: message
            }));
            dispatch(addReplay({
                responder: "persona",
                text: res.data
            }));
        }).catch((error) => console.error(error));
    }

    function handleSelectAndReselect() {
        if (selectedPersona) {
            setDisabled(!disabled);
            dispatch(setSelectedPersona({...selectedPersona}));
            dispatch(resetConversation());
        }
    }

    function handleResetConversation() {
        dispatch(resetConversation());
    }

    function buildPersonaDescription(persona: any) {
        if (!persona) {
            return <div></div>
        }
        const result = [];
        for (const key in persona.description) {
            if (key === "case") {
                continue;
            }
            result.push(
                <div className="persona-description-label">{key}:</div>
            );
            if (Array.isArray(persona.description[key])) {
                result.push(
                    <ul>
                        {persona.description[key].map((elem: any, index: number) => (
                            <li key={`${key}-${index}`}>{elem}</li>
                        ))}
                    </ul>
                )
            } else {
                result.push(<div>{persona.description[key]}</div>);
            }
        }
        return result
    }

    return (
        <div>
            <div className="chat-menu">
                <div className="persona-filter ">
                    <InputFilter elements={personas}
                        project={projectPersona}
                        selectedElement={selectedPersona}
                        handleSelectedElement={handleSelectedPersona}
                        placeholder={"Type to filter"}
                        disabled={!disabled} />
                    <button className="btn"
                        onClick={handleSelectAndReselect}>{disabled ? "Select" : "Reselect"}</button>
                </div>
                <div className="conversation-menu">
                    <div className="persona-language-tag">
                        Persona language: {selectedPersona ? selectedPersona.language : ""}
                    </div>
                    <button className="btn"
                            disabled={disabled}
                            onClick={handleResetConversation}>Reset conversation</button>
                </div>
            </div>
            <div className="chat-persona-description-container">
                <h2>Persona description:</h2>
                <div className="chat-persona-description">
                    {buildPersonaDescription(selectedPersona)}
                </div>
            </div>
            <Chat conversation={conversation}
                  handleSendMessage={handleSendMessage}
                  disabled={disabled}/>
        </div>
    )
}

export default ChatPage;