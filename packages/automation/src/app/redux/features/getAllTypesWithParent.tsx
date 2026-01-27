import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";
import { SystemWithParentModel } from "../../models/SystemWithParentModel";


export const GetAllTypesWithParent = createAsyncThunk<any>(
  "workspace/GetAllTypesWithParent",
  async () => {
    const response =
      await WorkspaceConsume.GetAllTypeWithListOfWorkspaceParent();
    return response;
  }
);

interface SubsystemState {
  items: SystemWithParentModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
};

const AllTypesWithParentSlice = createSlice({
  name: "getAllTypesWithParent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllTypesWithParent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAllTypesWithParent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload
          .result as unknown as SystemWithParentModel[];
      })
      .addCase(GetAllTypesWithParent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default AllTypesWithParentSlice.reducer;
