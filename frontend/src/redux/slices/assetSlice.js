import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import assetService from "../../services/assetService";

const initialState = {
    assets: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const fetchAssets =
    createAsyncThunk(
        "assets/getAll",

        async (_, thunkAPI) => {
            try {
                return await assetService.getAssets();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data
                        ?.message ||
                    error.message
                );
            }
        }
    );

export const fetchMyAssets =
    createAsyncThunk(
        "assets/getMyAssets",

        async (_, thunkAPI) => {
            try {
                return await assetService.getMyAssets();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );
            }
        }
    );

export const addAsset =
    createAsyncThunk(
        "assets/create",

        async (
            assetData,
            thunkAPI
        ) => {
            try {
                return await assetService.createAsset(
                    assetData
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

export const editAsset =
    createAsyncThunk(
        "assets/update",

        async (
            {
                id,
                assetData,
            },
            thunkAPI
        ) => {
            try {
                return await assetService.updateAsset(
                    id,
                    assetData
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

export const removeAsset =
    createAsyncThunk(
        "assets/delete",

        async (
            id,
            thunkAPI
        ) => {
            try {
                return await assetService.deleteAsset(
                    id
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

export const assignAssetToEmployee =
    createAsyncThunk(
        "assets/assign",

        async (
            {
                assetId,
                employeeId,
            },
            thunkAPI
        ) => {
            try {
                return await assetService.assignAsset(
                    assetId,
                    employeeId
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

export const returnAssignedAsset =
    createAsyncThunk(
        "assets/return",

        async (
            assetId,
            thunkAPI
        ) => {
            try {
                return await assetService.returnAsset(
                    assetId
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

export const retireAsset =
    createAsyncThunk(
        "assets/retire",

        async (
            { id, reason },
            thunkAPI
        ) => {

            try {

                return await assetService.retireAsset(
                    id,
                    reason
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message ||
                    error.message
                );

            }

        }
    );

const assetSlice =
    createSlice({
        name: "assets",

        initialState,

        reducers: {},

        extraReducers: (
            builder
        ) => {
            builder

                .addCase(
                    fetchAssets.pending,
                    (state) => {
                        state.isLoading =
                            true;
                    }
                )

                .addCase(
                    fetchAssets.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.isLoading =
                            false;

                        state.assets =
                            action.payload.assets;
                    }
                )

                .addCase(
                    fetchAssets.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.isLoading =
                            false;

                        state.isError = true;

                        state.message =
                            action.payload;
                    }
                )

                .addCase(
                    fetchMyAssets.pending,
                    (state) => {
                        state.isLoading = true;
                    }
                )

                .addCase(
                    fetchMyAssets.fulfilled,
                    (state, action) => {
                        state.isLoading = false;
                        state.assets = action.payload.assets;
                    }
                )

                .addCase(
                    fetchMyAssets.rejected,
                    (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                    }
                )

                .addCase(
                    addAsset.fulfilled,
                    (state) => {
                        state.isLoading =
                            false;

                        state.isSuccess =
                            true;
                    }
                )

                .addCase(
                    editAsset.fulfilled,
                    (state) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                    }
                )
                .addCase(
                    removeAsset.fulfilled,
                    (state) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                    }
                )

                .addCase(
                    assignAssetToEmployee.fulfilled,
                    (state) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                    }
                )

                .addCase(
                    returnAssignedAsset.fulfilled,
                    (state) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                    }
                )

                .addCase(
                    retireAsset.pending,
                    (state) => {
                        state.isLoading = true;
                    }
                )

                .addCase(
                    retireAsset.fulfilled,
                    (state) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                    }
                )

                .addCase(
                    retireAsset.rejected,
                    (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message =
                            action.payload;
                    }
                )

        },
    });

export default assetSlice.reducer;