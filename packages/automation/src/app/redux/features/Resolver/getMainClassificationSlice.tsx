import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg"
import { MainClassificationServiceCatalog } from "../../../models/ServiceCatalog";

export const getMainClassification= createAsyncThunk<any>(
  "mainClassification/getMainClassification",
  async (data:any) => {
    const response = await TicketingSystemAggConsume.getMainClassification();
    return response;
  }
);


interface MainClassificationState {
  items: MainClassificationServiceCatalog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MainClassificationState = {
  items: [],
  status: "idle",
  error: null,
};

const mainClassificationSliceService = createSlice({
  name: "getMainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMainClassification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMainClassification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as unknown as MainClassificationServiceCatalog[];

      })
      .addCase(getMainClassification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default mainClassificationSliceService.reducer;
