import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {ResponseModel} from "../../../../models/ResponseModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg"
import { OpertionStatus } from "../../../../models/OpertionStatus";

export const getAllReportStatusByReportId= createAsyncThunk<ResponseModel,any>(
  "report/getAllReportStatus",
  async (id:any) => {
    const response = await TicketingSystemAggConsume.getAllReportStatus(id);
    return response;
  }
);
interface ResolverState {
  item: OpertionStatus[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResolverState = {
    item:[],
    status: "idle",
    error: null,
};

const getAllReportStatusSlice = createSlice({
  name: "getAllReportStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReportStatusByReportId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllReportStatusByReportId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload.result as OpertionStatus[];
      })
      .addCase(getAllReportStatusByReportId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default getAllReportStatusSlice.reducer;
