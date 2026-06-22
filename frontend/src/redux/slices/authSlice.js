import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import authService from "../../services/authService";

const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    ) || null;

const initialState = {
    user,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const registerUser =
    createAsyncThunk(
        "auth/register",

        async (
            userData,
            thunkAPI
        ) => {
            try {
                return await authService.register(
                    userData
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data
                        ?.message ||
                    error.message
                );
            }
        }
    );

export const loginUser =
    createAsyncThunk(
        "auth/login",

        async (
            userData,
            thunkAPI
        ) => {
            try {
                const data =
                    await authService.login(
                        userData
                    );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data)
                );

                return data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data
                        ?.message ||
                    error.message
                );
            }
        }
    );

export const changePassword =
    createAsyncThunk(
        "auth/changePassword",

        async (
            passwordData,
            thunkAPI
        ) => {
            try {
                return await authService.changePassword(
                    passwordData
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data
                        ?.message ||
                    error.message
                );
            }
        }
    );

const authSlice =
    createSlice({
        name: "auth",

        initialState,

        reducers: {
            logout: (state) => {
                localStorage.removeItem(
                    "user"
                );

                state.user = null;
            },

            reset: (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = "";
            },
        },

        extraReducers: (builder) => {
            builder

                .addCase(
                    registerUser.pending,
                    (state) => {
                        state.isLoading = true;
                        state.isError = false;
                        state.isSuccess = false;
                        state.message = "";
                    }
                )

                .addCase(
                    registerUser.fulfilled,
                    (state, action) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                        state.user = action.payload;
                    }
                )

                .addCase(
                    registerUser.rejected,
                    (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                    }
                )


                .addCase(
                    loginUser.pending,
                    (state) => {
                        state.isLoading = true;
                        state.isError = false;
                        state.isSuccess = false;
                        state.message = "";
                    }
                )

                .addCase(
                    loginUser.fulfilled,
                    (state, action) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                        state.user = action.payload;
                    }
                )

                .addCase(
                    loginUser.rejected,
                    (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                    }
                )

                .addCase(
                    changePassword.pending,
                    (state) => {
                        state.isLoading = true;
                    }
                )

                .addCase(
                    changePassword.fulfilled,
                    (state) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                    }
                )

                .addCase(
                    changePassword.rejected,
                    (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                    }
                )
        }
    });

export const {
    logout,
    reset,
} = authSlice.actions;

export default authSlice.reducer;