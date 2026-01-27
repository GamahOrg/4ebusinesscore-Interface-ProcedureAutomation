import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";
import { SubsystemModel } from "../../models/subsystemsModel";

export const getSubsystemsDropdown = createAsyncThunk<any, object | undefined>(
  "workspace/fetchSubsystems",
  async (data: any) => {
    const response = await WorkspaceConsume.getSubsystems(data);
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

const SubsystemDropdownListSlice = createSlice({
  name: "getSubsystemDropdown",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubsystemsDropdown.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubsystemsDropdown.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as unknown as SubsystemModel[];
      })
      .addCase(getSubsystemsDropdown.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default SubsystemDropdownListSlice.reducer;
