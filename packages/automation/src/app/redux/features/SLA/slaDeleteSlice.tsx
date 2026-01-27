import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { SLAConsume } from "@4eplatform/shared/apis/sla";

export const deleteSlaById = createAsyncThunk<ResponseModel, string>(
  "deleteSla/deleteSlaById",
  async (itemId: string) => {
    const response = await SLAConsume.deleteSLA(itemId);
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
  
const itemsSlice = createSlice({
    name: "deleteSla",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(deleteSlaById.pending, (state) => {
          state.status = "loading";
  
        })
        .addCase(deleteSlaById.fulfilled, (state) => {
          state.status = "succeeded";
          state.error=null
        })
        .addCase(deleteSlaById.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        });
    },
  });
  
  export default itemsSlice.reducer;