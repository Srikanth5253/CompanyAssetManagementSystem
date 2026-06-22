import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import requestService
    from "../../services/requestService";

const initialState = {
    requests: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const createRequest =
    createAsyncThunk(
        "requests/create",

        async (
            requestData,
            thunkAPI
        ) => {
            try {
                return await requestService.createRequest(
                    requestData
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

export const getMyRequests =
    createAsyncThunk(
        "requests/getMyRequests",

        async (_, thunkAPI) => {
            try {
                return await requestService.getMyRequests();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data
                        ?.message ||
                    error.message
                );
            }
        }
    );

export const fetchAllRequests =
    createAsyncThunk(
        "requests/fetchAll",

        async (_, thunkAPI) => {
            try {
                return await requestService.getAllRequests();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

export const updateRequest =
    createAsyncThunk(
        "requests/update",

        async (
            { id, status },
            thunkAPI
        ) => {
            try {
                return await requestService.updateRequestStatus(
                    id,
                    { status }
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

const requestSlice =
    createSlice({
        name: "requests",

        initialState,

        reducers: {},

        extraReducers:
            (builder) => {
                builder

                    .addCase(
                        createRequest.pending,
                        (state) => {
                            state.isLoading = true;
                        }
                    )

                    .addCase(
                        createRequest.fulfilled,
                        (state) => {
                            state.isLoading = false;
                            state.isSuccess = true;
                        }
                    )

                    .addCase(
                        createRequest.rejected,
                        (
                            state,
                            action
                        ) => {
                            state.isLoading = false;
                            state.isError = true;
                            state.message =
                                action.payload;
                        }
                    )

                    .addCase(
                        getMyRequests.fulfilled,
                        (
                            state,
                            action
                        ) => {
                            state.requests =
                                action.payload.requests;
                        }
                    )

                    .addCase(
                        fetchAllRequests.fulfilled,
                        (state, action) => {
                            state.requests =
                                action.payload.requests;
                        }
                    )

                    .addCase(
                        updateRequest.pending,
                        (state) => {
                            state.isLoading = true;
                        }
                    )

                    .addCase(
                        updateRequest.fulfilled,
                        (state, action) => {
                            state.isLoading = false;
                            state.isSuccess = true;

                            state.requests =
                                state.requests.map(
                                    (request) =>
                                        request._id ===
                                            action.payload.request._id
                                            ? {
                                                ...request,
                                                status:
                                                    action.payload
                                                        .request
                                                        .status,
                                            }
                                            : request
                                );
                        }
                    )

                    .addCase(
                        updateRequest.rejected,
                        (state, action) => {
                            state.isLoading = false;
                            state.isError = true;
                            state.message =
                                action.payload;
                        }
                    )
            },
    });

export default requestSlice.reducer;