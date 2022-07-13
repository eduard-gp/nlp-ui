import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../config/config";
import { Persona } from "../pages/PersonaPage/models";

interface PersonasRequest {
    status: "idle" | "loading" | "succeeded" | "failed",
    personas: Array<Persona>,
}

const initialState: PersonasRequest = {
    status: "idle",
    personas: []
};

export const getPersonas = createAsyncThunk("personas/getPersonas", async () => {
    const response = await axios({
        method: "get",
        url: `${BASE_URL}/personas`,
        withCredentials: true
    });
    return response.data;
});

const personasSlice = createSlice({
    name: "personas",
    initialState,
    reducers: {
        updatePersona(state, action) {
            for (let i = 0; i < state.personas.length; i++) {
                if (state.personas[i]["_id"]["$oid"] === action.payload["_id"]["$oid"]) {
                    state.personas[i] = action.payload;
                    break;
                }
            }
        },
        addPersona(state, action) {
            state.personas.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getPersonas.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getPersonas.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.personas = action.payload;
            })
            .addCase(getPersonas.rejected, (state, action) => {
                state.status = "failed";
            })
    }
});

export default personasSlice.reducer;

export const {
    updatePersona,
    addPersona
} = personasSlice.actions;

export const selectPersonas = (state: any) => state.personas.personas;