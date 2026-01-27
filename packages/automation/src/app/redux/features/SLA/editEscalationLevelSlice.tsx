import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { AddEscalationLevelModel } from "../../../models/addEscalationLevelModel";
import { SLAConsume } from "@4eplatform/shared/apis/sla";

export const editEscalationLevel = createAsyncThunk<ResponseModel, { id: string, sl: any }>(
  "SLA/EditSl",
  async ({ id, sl }) => {
    const response = await SLAConsume.editEscalationLevel(id, sl);
    return response;
  }
);

interface EscalationLevelSliceState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EscalationLevelSliceState = {
  status: "idle",
  error: null,
};

const editEscalationLevelSlice = createSlice({
  name: "editEscalationLevel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editEscalationLevel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editEscalationLevel.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editEscalationLevel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });

  },
});

export default editEscalationLevelSlice.reducer;
