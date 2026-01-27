import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { SlaModel, SlaModelArray } from "../../../models/slaModel";
import { SLAConsume } from "@4eplatform/shared/apis/sla";

export const getSla= createAsyncThunk<ResponseModel,any>(
  "SLA/fetchSla",
  async (params:any) => {
    const response = await SLAConsume.getAllSla(  
      {
      name:params?.searchTerm,
      pageSize: params?.pageSize,
      pageNumber: params?.pageNumber,
      mainclassiffication: params?.mainclassiffication,
    });
    return response;
  }
);

interface SubsystemState {
  items: SlaModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalpages:number;
  taotalItems:number;
}

const initialState: SubsystemState = {
  items: [],
  status: "idle",
  error: null,
  totalpages: 1,
  taotalItems:1,
};

const SubsystemSlice = createSlice({
  name: "getSubsystem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSla.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSla.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as SlaModel[];
        state.totalpages= action.payload.totalPages as number;
        state.taotalItems= action.payload.totalItems as number;
      })
      .addCase(getSla.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });

  },
});

export default SubsystemSlice.reducer;
