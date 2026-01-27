import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { SLAConsume } from "@4eplatform/shared/apis/sla";

export const deleteEscalationLevelById = createAsyncThunk<ResponseModel, string>(
  "deleteEscalationLevel/deleteEscalationLevelById",
  async (itemId: string) => {
    const response = await SLAConsume.deleteEscalationLevel(itemId);
    return response;
  }
);

interface ItemsState {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;

}
  
  const initialState: ItemsState = {
    status: "idle",
    error: null,
};
  
const deleteEscalationLevelSlice = createSlice({
    name: "deleteEscalationLevel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(deleteEscalationLevelById.pending, (state) => {
          state.status = "loading";
  
        })
        .addCase(deleteEscalationLevelById.fulfilled, (state) => {
          state.status = "succeeded";
          state.error=null
        })
        .addCase(deleteEscalationLevelById.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        });
    },
  });
  
  export default deleteEscalationLevelSlice.reducer;