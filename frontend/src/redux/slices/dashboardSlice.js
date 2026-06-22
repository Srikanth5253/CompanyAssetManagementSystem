import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import dashboardService
  from "../../services/dashboardService";

const initialState = {
  adminDashboard: null,
  employeeDashboard: null,
  categoryReport: [],
  requestReport: [],
  isLoading: false,
  isSuccess: false,
  isError: false,

  message: "",
};

export const fetchDashboardStats =
  createAsyncThunk(
    "dashboard/stats",

    async (_, thunkAPI) => {
      try {
        return await dashboardService.getDashboardStats();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
          error.message
        );
      }
    }
  );

export const fetchEmployeeDashboard =
  createAsyncThunk(
    "dashboard/employee",

    async (_, thunkAPI) => {
      try {
        return await dashboardService.getEmployeeDashboard();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
          error.message
        );
      }
    }
  );

export const fetchAssetCategoryReport =
  createAsyncThunk(
    "dashboard/categoryReport",

    async (_, thunkAPI) => {
      try {
        return await dashboardService.getAssetCategoryReport();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );

export const fetchRequestReport =
  createAsyncThunk(
    "dashboard/requestReport",

    async (_, thunkAPI) => {
      try {
        return await dashboardService.getRequestReport();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );

const dashboardSlice =
  createSlice({
    name: "dashboard",

    initialState,

    reducers: {},

    extraReducers:
      (builder) => {

        builder

          .addCase(
            fetchDashboardStats.pending,
            (state) => {
              state.isLoading = true;
            }
          )

          .addCase(
            fetchDashboardStats.fulfilled,
            (
              state,
              action
            ) => {
              state.isLoading = false;
              state.isSuccess = true;

              state.adminDashboard =
                action.payload;
            }
          )

          .addCase(
            fetchDashboardStats.rejected,
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
            fetchEmployeeDashboard.pending,
            (state) => {
              state.isLoading = true;
            }
          )

          .addCase(
            fetchEmployeeDashboard.fulfilled,
            (
              state,
              action
            ) => {
              state.isLoading = false;
              state.isSuccess = true;

              state.employeeDashboard =
                action.payload;
            }
          )

          .addCase(
            fetchEmployeeDashboard.rejected,
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
            fetchAssetCategoryReport.fulfilled,
            (state, action) => {
              state.categoryReport =
                action.payload.report;
            }
          )

          .addCase(
            fetchRequestReport.fulfilled,
            (state, action) => {

              state.requestReport =
                action.payload.report;

            }
          )

      },
  })



export default dashboardSlice.reducer;