import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { AddEscalationLevelModel } from "../../../models/addEscalationLevelModel";
import { SLAConsume } from "@4eplatform/shared/apis/sla";

export const addEscalationLevel= createAsyncThunk<ResponseModel,any>(
  "SLA/AddSl",
  async (sl:AddEscalationLevelModel) => {
    const response = await SLAConsume.addEscalationLevel(sl);
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

const addEscalationLevelSlice = createSlice({
  name: "addEscalationLevel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEscalationLevel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEscalationLevel.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addEscalationLevel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });

  },
});

export default addEscalationLevelSlice.reducer;
