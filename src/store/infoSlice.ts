import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../config/config";
import { SupportedLanguage } from "../pages/PersonaPage/models";

interface InfoRequest {
    status: "idle" | "loading" | "succeeded" | "failed",
    languages: Array<SupportedLanguage>,
    labels: Array<string>
}

const initialState: InfoRequest = {
    status: "idle",
    languages: [],
    labels: []
};

export const getInfo = createAsyncThunk("info/getInfo", async () => {
    const languagesPromise = axios({
        method: "get",
        url: `${BASE_URL}/info/languages`,
        withCredentials: true
    });
    const labelsPromise = axios({
        method: "get",
        url: `${BASE_URL}/info/labels`,
        withCredentials: true
    });
    const [languagesResponse, labelsResponse] = await Promise.all([languagesPromise, labelsPromise]);
    return {languages: languagesResponse.data, labels: labelsResponse.data};
});

const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getInfo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
                const {languages, labels} = action.payload;
                state.languages = languages;
                state.labels = labels;
            })
            .addCase(getInfo.rejected, (state, action) => {
                state.status = "failed";
            })
    }
});

export default infoSlice.reducer;

export const selectLanguages = (state: any) => state.info.languages;
export const selectLabels = (state: any) => state.info.labels;
