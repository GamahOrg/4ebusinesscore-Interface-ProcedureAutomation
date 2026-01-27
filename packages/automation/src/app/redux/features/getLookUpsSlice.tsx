import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";
import { Lookup } from "../../models/Lookup";

export const getNoteTypeId = createAsyncThunk<any>(
  "workspace/fetchNoteTypeId",
  async (data: any) => {
    const response = await WorkspaceConsume.getNoteTypeId();
    return response;
  }
);

interface SubsystemState {
  items: Lookup[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
};

const NoteTypeIdSlice = createSlice({
  name: "getNoteTypeId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNoteTypeId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNoteTypeId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as unknown as Lookup[];
      })
      .addCase(getNoteTypeId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default NoteTypeIdSlice.reducer;
