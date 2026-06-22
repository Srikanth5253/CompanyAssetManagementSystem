import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import historyService
  from "../../services/historyService";

const initialState = {
  history: [],
  isLoading: false,
};

export const fetchHistory =
  createAsyncThunk(
    "history/fetchAll",
    async (_, thunkAPI) => {
      try {
        return await historyService.getHistory();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );

const historySlice =
  createSlice({
    name: "history",
    initialState,

    reducers: {},

    extraReducers:
      (builder) => {
        builder

          .addCase(
            fetchHistory.pending,
            (state) => {
              state.isLoading = true;
            }
          )

          .addCase(
            fetchHistory.fulfilled,
            (
              state,
              action
            ) => {
              state.isLoading = false;
              state.history =
                action.payload.history;
            }
          )

          .addCase(
            fetchHistory.rejected,
            (state) => {
              state.isLoading = false;
            }
          );
      },
  });

export default historySlice.reducer;