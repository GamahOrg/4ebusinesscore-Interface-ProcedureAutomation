import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {ResponseModel} from "../../../../models/ResponseModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg"
import {OperationReport} from "../../../../models/OperationReport"

export const getAllReportStepByReportId= createAsyncThunk<ResponseModel,any>(
  "report/getAllReportStep",
  async (id:any) => {
    const response = await TicketingSystemAggConsume.getAllReportStep(id);
    return response;
  }
);
interface ResolverState {
  item: OperationReport[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResolverState = {
    item:[],
    status: "idle",
    error: null,
};

const getAllReportStepSlice = createSlice({
  name: "getAllReportStep",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReportStepByReportId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllReportStepByReportId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload.result as OperationReport[];
      })
      .addCase(getAllReportStepByReportId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default getAllReportStepSlice.reducer;
