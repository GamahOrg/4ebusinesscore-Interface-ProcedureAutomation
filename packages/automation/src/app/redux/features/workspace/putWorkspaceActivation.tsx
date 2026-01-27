import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../models/response-model";
import { SubsystemModel } from "../models/subsystemsModel";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";

export const putWorkspaceActivation = createAsyncThunk<ResponseModel, any>(
  "workspace/putWorkspaceActivation",
  async (id: string) => {
    const response = await WorkspaceConsume.putWorkspaceActivation({
      id,
      body: { id },
    });
    return response;
  }
);

interface SubsystemState {
  items: SubsystemModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
};

const putWorkspaceActivationSlice = createSlice({
  name: "putSubsystem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(putWorkspaceActivation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putWorkspaceActivation.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedItem = action.payload.result as SubsystemModel;
        const updatedItemId = updatedItem?.id;
        const itemIndex = state?.items?.findIndex(
          (item) => item?.id === updatedItemId
        );
        if (itemIndex !== -1) {
          state.items = [...state.items]; // Create a shallow copy
          state.items[itemIndex] = updatedItem;
        }
      })
      .addCase(putWorkspaceActivation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default putWorkspaceActivationSlice.reducer;
