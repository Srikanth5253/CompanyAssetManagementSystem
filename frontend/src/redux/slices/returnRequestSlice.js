import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import returnRequestService
  from "../../services/returnRequestService";

const initialState = {
  returnRequests: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createReturnRequest =
  createAsyncThunk(
    "returnRequests/create",

    async (
      assetId,
      thunkAPI
    ) => {
      try {
        return await returnRequestService.createReturnRequest(
          assetId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const getMyReturnRequests =
  createAsyncThunk(
    "returnRequests/getMy",

    async (_, thunkAPI) => {
      try {
        return await returnRequestService.getMyReturnRequests();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const fetchAllReturnRequests =
  createAsyncThunk(
    "returnRequests/fetchAll",

    async (_, thunkAPI) => {
      try {
        return await returnRequestService.getAllReturnRequests();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

export const approveReturnRequest =
  createAsyncThunk(
    "returnRequests/approve",

    async (
      id,
      thunkAPI
    ) => {
      try {
        return await returnRequestService.approveReturnRequest(
          id
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            error.message
        );
      }
    }
  );

const returnRequestSlice =
  createSlice({
    name: "returnRequests",

    initialState,

    reducers: {},

    extraReducers:
      (builder) => {
        builder

          .addCase(
            createReturnRequest.pending,
            (state) => {
              state.isLoading = true;
            }
          )

          .addCase(
            createReturnRequest.fulfilled,
            (state) => {
              state.isLoading = false;
              state.isSuccess = true;
            }
          )

          .addCase(
            createReturnRequest.rejected,
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
            getMyReturnRequests.fulfilled,
            (
              state,
              action
            ) => {
              state.returnRequests =
                action.payload.requests;
            }
          )

          .addCase(
            fetchAllReturnRequests.fulfilled,
            (
              state,
              action
            ) => {
              state.returnRequests =
                action.payload.requests;
            }
          )

          .addCase(
            approveReturnRequest.fulfilled,
            (
              state,
              action
            ) => {
              state.returnRequests =
                state.returnRequests.map(
                  (
                    request
                  ) =>
                    request._id ===
                    action.payload
                      .request?._id
                      ? {
                          ...request,
                          status:
                            "Approved",
                        }
                      : request
                );
            }
          );
      },
  });

export default
  returnRequestSlice.reducer;