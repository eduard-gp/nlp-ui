import { createSlice } from "@reduxjs/toolkit";
import { Persona, SupportedLanguage } from "../pages/PersonaPage/models";

interface PersonaForm {
    selectedPersona: Persona | null,
    disabled: boolean,
    form: Persona | null
}

const initialState: PersonaForm = {
    selectedPersona: null,
    disabled: true,
    form: null
}

const personaFormSlice = createSlice({
    name: "personaForm",
    initialState,
    reducers: {
        setSelectedPersona(state, action) {
            state.selectedPersona = action.payload;
        },
        setDisabled(state, action) {
            state.disabled = action.payload;
        },
        setForm(state, action) {
            state.form = action.payload;
        },
        setDescriptionForm(state, action) {
            if (state.form) {
                state.form.description = action.payload;
            }
        },
        setDialogForm(state, action) {
            if (state.form) {
                state.form.dialog = action.payload;
            }
        },
        setLanguageForm(state, action) {
            if (state.form) {
                state.form.language = action.payload;
            }
        }
    },
});

export default personaFormSlice.reducer;

export const {
    setSelectedPersona,
    setDisabled,
    setForm,
    setDescriptionForm,
    setDialogForm,
    setLanguageForm
} = personaFormSlice.actions;

export const selectSelectedPersona = (state: any) => state.personaForm.selectedPersona;
export const selectDisabledStatus = (state: any) => state.personaForm.disabled;
export const selectForm = (state: any) => state.personaForm.form;
export const selectDescriptionForm = (state: any) => state.personaForm.form?.description;
export const selectDialogForm = (state: any) => state.personaForm.form?.dialog;
export const selectLanguageForm = (state: any) => state.personaForm.form?.language;
