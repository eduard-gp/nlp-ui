import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../config/config";

interface UserRequest {
    status: "idle" | "loading" | "succeeded" | "failed",
    isLogged: boolean,
    userInfo: any
}

const initialState: UserRequest = {
    status: "idle",
    isLogged: false,
    userInfo: null
}

export const checkAuth = createAsyncThunk("auth/chechAuth", async () => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}/auth/islogged`,
        withCredentials: true
    });
    return response.data;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogginStatus: (state, action) => {
            state.isLogged = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(checkAuth.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLogged = action.payload.isLogged;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = "failed";
                state.isLogged = false;
            })
    }
});

export default authSlice.reducer;

export const { setLogginStatus } = authSlice.actions;

export const selectLogginStatus = (state: any) => state.auth.isLogged;