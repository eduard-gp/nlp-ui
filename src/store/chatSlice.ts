import { createSlice } from "@reduxjs/toolkit";

import { Persona } from "../pages/PersonaPage/models";

export interface Reply {
    responder: string
    text: string
}

export interface Chat {
    selectedPersona: Persona | null,
    conversation: Array<Reply>
}

const initialState: Chat = {
    selectedPersona: null,
    conversation: []
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedPersona(state, action) {
            state.selectedPersona = action.payload;
        },
        addReplay(state, action) {
            state.conversation.push(action.payload);
        },
        resetConversation(state) {
            state.conversation = [];
        }
    },
});

export default chatSlice.reducer;

export const {
    setSelectedPersona,
    addReplay,
    resetConversation
} = chatSlice.actions;

export const selectSelectedPersona = (state: any) => state.chat.selectedPersona;
export const selectConversation = (state: any) => state.chat.conversation;
