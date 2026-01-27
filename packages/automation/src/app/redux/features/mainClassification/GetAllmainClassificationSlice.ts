import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MainClassification,
  MainClassificationResponse,
} from "../../../models/MainClassificationModel";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

interface stateType {
  data: MainClassification[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: stateType = {
  status: "idle",
  error: null,
  data: [],
};


export const featchGetmainClassification = createAsyncThunk(
  "GetmainClassification/featchGetmainClassification",
  async (data: any) => {
    const response =
       await TicketingSystemConsume.getfMainClassification({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
        classificationId: data?.ClassificationId,
        ...(data?.subSystemId && { subSystemId: data?.subSystemId }),
      });
    return response;
  }
);


const GetAllmainClassificationSlice = createSlice({
  name: "mainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(featchGetmainClassification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchGetmainClassification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action?.payload?.result as unknown as MainClassification[];
      })
      .addCase(featchGetmainClassification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default GetAllmainClassificationSlice.reducer;
