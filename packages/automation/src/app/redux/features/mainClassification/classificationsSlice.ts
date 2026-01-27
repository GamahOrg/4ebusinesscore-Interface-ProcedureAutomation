import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MainClassification,
  MainClassificationResponse,
} from "../../../models/MainClassificationModel";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

interface stateType {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalPages?: number;
  totalItems?: number;
}

const initialState: stateType = {
  status: "idle",
  error: null,
  data: [],
};

export const getClassification = createAsyncThunk(
  "classification/getClassification",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.getMainClassification({
        pageSize: data?.pageSize || "10",
        pageNumber: data?.pageNumber || "1",
        ...(data?.subSystemId && { subSystemId: data?.subSystemId }),
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const classificationsSlice = createSlice({
  name: "classification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClassification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClassification.fulfilled, (state, action) => {
        state.status = "succeeded";
        let { result } = action.payload;
        state.data = {
          ...action.payload,
          mainClassifications: result,
        } as MainClassificationResponse;
        state.totalItems = action.payload?.totalItems;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(getClassification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default classificationsSlice.reducer;
