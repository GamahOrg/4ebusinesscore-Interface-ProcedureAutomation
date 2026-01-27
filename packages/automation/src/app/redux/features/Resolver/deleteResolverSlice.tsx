import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { FAQConsume } from "@4eplatform/shared/apis/faq";

export const deleteResolver = createAsyncThunk<ResponseModel, string>(
  "deleteResolver/deleteResolverById",
  async (itemId: string, thunkApi) => {
    try {
      const response = await FAQConsume.deleteResolveReport(itemId);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
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

const deleteResolverSlice = createSlice({
  name: "deleteResolver",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteResolver.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteResolver.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteResolver.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default deleteResolverSlice.reducer;
