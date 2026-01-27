import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SubsystemModel } from "../models/subsystemsModel";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";
import { ResponseModel } from "../../../models/response-model";

export const getSubSystems = createAsyncThunk<ResponseModel, any>(
  "workspace/fetchSubsystems",
  async (params: any = {}) => {
    const response = await WorkspaceConsume.getAllSubsystems({
      searhTerm: params?.searchTerm,
      pagesize: params?.pageSize,
      pagenumber: params?.pageNumber,
      component: params?.component,
      numberofservices: params?.numberofservices,
      date: params?.date,
      subsystemType: params?.subsystemType,
      // isExternal: params?.isExternal,
      // isSinglSignOn: params?.isSinglSignOn,
    });
    return response;
  }
);

interface SubsystemState {
  items: SubsystemModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalpages: number;
  taotalItems: number;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
  totalpages: 1,
  taotalItems: 1,
};

const SubsystemSlice = createSlice({
  name: "getSubsystem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubSystems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubSystems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as unknown as SubsystemModel[];
        state.totalpages = action.payload.totalPages as number;
        state.taotalItems = action.payload.totalItems as number;
      })
      .addCase(getSubSystems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default SubsystemSlice.reducer;
