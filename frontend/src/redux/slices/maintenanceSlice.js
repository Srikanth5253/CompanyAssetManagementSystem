import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import maintenanceService
    from "../../services/maintenanceService";

const initialState = {
    maintenanceRequests: [],
    myMaintenanceRequests: [],

    isLoading: false,
    isSuccess: false,
    isError: false,

    message: "",
};

export const createMaintenanceRequest =
    createAsyncThunk(
        "maintenance/create",

        async (data, thunkAPI) => {
            try {
                return await maintenanceService.createMaintenanceRequest(
                    data
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );
            }
        }
    );

export const fetchMyMaintenanceRequests =
    createAsyncThunk(
        "maintenance/myRequests",

        async (_, thunkAPI) => {
            try {
                return await maintenanceService.getMyMaintenanceRequests();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );
            }
        }
    );

export const fetchAllMaintenanceRequests =
    createAsyncThunk(
        "maintenance/allRequests",

        async (_, thunkAPI) => {
            try {
                return await maintenanceService.getAllMaintenanceRequests();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );
            }
        }
    );

export const startRepair =
    createAsyncThunk(
        "maintenance/startRepair",

        async (id, thunkAPI) => {
            try {

                await maintenanceService.startRepair(id);

                return id;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );

            }
        }
    );

export const completeRepair =
    createAsyncThunk(
        "maintenance/completeRepair",

        async (id, thunkAPI) => {
            try {

                await maintenanceService.completeRepair(id);

                return id;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );

            }
        }
    );

const maintenanceSlice =
    createSlice({
        name: "maintenance",

        initialState,

        reducers: {},

        extraReducers:
            (builder) => {

                builder

                    .addCase(
                        createMaintenanceRequest.pending,
                        (state) => {
                            state.isLoading = true;
                        }
                    )

                    .addCase(
                        createMaintenanceRequest.fulfilled,
                        (state) => {
                            state.isLoading = false;
                            state.isSuccess = true;
                        }
                    )

                    .addCase(
                        createMaintenanceRequest.rejected,
                        (state, action) => {
                            state.isLoading = false;
                            state.isError = true;
                            state.message =
                                action.payload;
                        }
                    )

                    .addCase(
                        fetchMyMaintenanceRequests.pending,
                        (state) => {
                            state.isLoading = true;
                        }
                    )

                    .addCase(
                        fetchMyMaintenanceRequests.fulfilled,
                        (state, action) => {
                            state.isLoading = false;
                            state.isSuccess = true;

                            state.myMaintenanceRequests =
                                action.payload.requests;
                        }
                    )

                    .addCase(
                        fetchMyMaintenanceRequests.rejected,
                        (state, action) => {
                            state.isLoading = false;
                            state.isError = true;

                            state.message =
                                action.payload;
                        }
                    )

                    .addCase(
                        fetchAllMaintenanceRequests.pending,
                        (state) => {
                            state.isLoading = true;
                        }
                    )

                    .addCase(
                        fetchAllMaintenanceRequests.fulfilled,
                        (state, action) => {
                            state.isLoading = false;
                            state.isSuccess = true;

                            state.maintenanceRequests =
                                action.payload.requests;
                        }
                    )

                    .addCase(
                        fetchAllMaintenanceRequests.rejected,
                        (state, action) => {
                            state.isLoading = false;
                            state.isError = true;

                            state.message =
                                action.payload;
                        }
                    )

                    .addCase(
                        startRepair.fulfilled,
                        (state, action) => {

                            const request =
                                state.maintenanceRequests.find(
                                    (item) =>
                                        item._id ===
                                        action.payload
                                );

                            if (request) {
                                request.status =
                                    "In Progress";
                            }

                        }
                    )

                    .addCase(
                        completeRepair.fulfilled,
                        (state, action) => {

                            const request =
                                state.maintenanceRequests.find(
                                    (item) =>
                                        item._id ===
                                        action.payload
                                );

                            if (request) {
                                request.status =
                                    "Completed";
                            }

                        }
                    )

            },
    });

export default maintenanceSlice.reducer;