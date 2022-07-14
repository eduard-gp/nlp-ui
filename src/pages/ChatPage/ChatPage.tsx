import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chat, InputFilter } from "../../components";
import { selectConversation, selectSelectedPersona, setSelectedPersona } from "../../store/chatSlice";
import { getPersonas, selectPersonas } from "../../store/personasSlice";
import { AppDispatch } from "../../store/store";
import { Persona } from "../PersonaPage/models";

import "./ChatPage.css";

function ChatPage() {
    const dispatch = useDispatch<AppDispatch>();
    const personas = useSelector(selectPersonas);
    const selectedPersona = useSelector(selectSelectedPersona);
    const conversation = useSelector(selectConversation);

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

    return (
        <div>
            <div className="chat-menu">
                <div className="persona-filter">
                    <InputFilter elements={personas}
                        project={projectPersona}
                        selectedElement={selectedPersona}
                        handleSelectedElement={handleSelectedPersona}
                        placeholder={"Type to filter"}
                        disabled={false} />
                </div>
                <div className="conversation-menu">
                    <div className="persona-language-tag">
                        Persona language: {selectedPersona ? selectedPersona.language : ""}
                    </div>
                    <button className="btn">Reset conversation</button>
                </div>
            </div>
            <Chat conversation={conversation}/>
        </div>
    )
}

export default ChatPage;