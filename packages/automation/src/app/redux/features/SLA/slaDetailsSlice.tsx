import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { SlaModel, SlaModelArray } from "../../../models/slaModel";
import { SLAConsume } from "@4eplatform/shared/apis/sla";

export const getSlaById = createAsyncThunk<ResponseModel, any>(
  "slaDetails/getSlaById",
  async (id: string) => {
    const response = await SLAConsume.getSlaById(id);
    return response;
  }
);
interface SubsystemState {
  item: SlaModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  item: [],
  status: "idle",
  error: null,
};

const slaDetailsSlice = createSlice({
  name: "slaDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSlaById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSlaById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload.result as SlaModel[];
      })
      .addCase(getSlaById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default slaDetailsSlice.reducer;
