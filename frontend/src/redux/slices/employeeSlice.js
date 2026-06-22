import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import employeeService from "../../services/employeeService";

const initialState = {
    employees: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const fetchEmployees =
    createAsyncThunk(
        "employees/getAll",

        async (_, thunkAPI) => {
            try {
                return await employeeService.getEmployees();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

export const addEmployee =
    createAsyncThunk(
        "employees/create",

        async (
            employeeData,
            thunkAPI
        ) => {
            try {
                return await employeeService.createEmployee(
                    employeeData
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

export const updateEmployee =
    createAsyncThunk(
        "employees/update",

        async (
            { id, employeeData },
            thunkAPI
        ) => {
            try {
                return await employeeService.updateEmployee(
                    id,
                    employeeData
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

export const removeEmployee =
    createAsyncThunk(
        "employees/delete",

        async (id, thunkAPI) => {
            try {
                return await employeeService.deleteEmployee(
                    id
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

const employeeSlice =
    createSlice({
        name: "employees",

        initialState,

        reducers: {},

        extraReducers: (
            builder
        ) => {
            builder

                .addCase(
                    fetchEmployees.pending,
                    (state) => {
                        state.isLoading =
                            true;
                    }
                )

                .addCase(
                    fetchEmployees.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.isLoading =
                            false;

                        state.employees =
                            action.payload.employees;

                        state.isSuccess = true;
                    }
                )

                .addCase(
                    fetchEmployees.rejected,
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
                    updateEmployee.fulfilled,
                    (state) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                    }
                )

                .addCase(
                    removeEmployee.fulfilled,
                    (state) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                    }
                );
        },
    });

export default employeeSlice.reducer;