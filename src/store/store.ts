import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import personasReducer from "./personasSlice";
import infoReducer from "./infoSlice";
import personaFormReducer from "./personaFormSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        personas: personasReducer,
        info: infoReducer,
        personaForm: personaFormReducer,
        chat: chatReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch