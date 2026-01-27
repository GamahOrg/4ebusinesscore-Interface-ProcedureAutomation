import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../../models/response-model";
import {
  ReportDtos,
  StatisticsReportDto,
} from "../../../../models/get-report/ResponseReport";
import { GetReportDataByIdDto } from "../../../../models/get-report/GetReportDataByIdModel";
import { GetMangerToRequesterByReportIdMolde } from "../../../../models/get-report/get-manger-by-repoert-id-model";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchGetMangerToRequesterByReportId = createAsyncThunk<
  ResponseModel,
  string
>(
  "fetchGetMangerToRequesterByReportId/GetMangerToRequesterByReportId",
  async (id: any) => {
    const response =
      await TicketingSystemAggConsume.GetMangerToRequesterByReportId(id);
    return response;
  }
);

interface ResponseReport {
  mager: GetMangerToRequesterByReportIdMolde;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResponseReport = {
  mager: new GetMangerToRequesterByReportIdMolde("", ""),
  status: "idle",
  error: null,
};

const fetchGetMangerToRequesterByReportIdSlice = createSlice({
  name: "GetReportById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetMangerToRequesterByReportId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchGetMangerToRequesterByReportId.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.mager = action.payload
            .result as GetMangerToRequesterByReportIdMolde;
        }
      )
      .addCase(
        fetchGetMangerToRequesterByReportId.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default fetchGetMangerToRequesterByReportIdSlice.reducer;
