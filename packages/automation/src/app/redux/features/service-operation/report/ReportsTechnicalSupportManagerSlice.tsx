import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ReportDtos,
  StatisticsReportDto,
} from "../../../../models/get-report/ResponseReport";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";

export const fetchReportsForTechnicalSupportManager = createAsyncThunk<
  any,
  any
>(
  "ReportsForTechnicalSupportManager/fetchReportsForTechnicalSupportManager",
  async (params: any) => {
    const response =
      await TicketingSystemAggConsume.GetReportsForTechnicalSupportManager({
        pageSize: params?.pageSize,
        pageNumber: params?.pageNumber,
        statisticsReport: params?.statisticsReport,
        ClassificationId: params?.ClassificationId,
        Requesttype: params?.RequestType,
        search: params?.search,
      });
    return response;
  }
);
interface ResponseReport {
  reports: ReportDtos[];
  statisticsReport: StatisticsReportDto;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pagination: Pagination;
  totalItems: any;
}

const initialState: ResponseReport = {
  reports: [],
  status: "idle",
  error: null,
  pagination: new Pagination(),
  statisticsReport: new StatisticsReportDto(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
  totalItems: 0,
};

const ReportsForTechnicalSupportManagerSlice = createSlice({
  name: "ReportsForTechnicalSupportManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsForTechnicalSupportManager.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchReportsForTechnicalSupportManager.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.reports = action.payload.result?.reports as ReportDtos[];
          state.totalItems = action.payload.totalItems as number;
          state.statisticsReport = action.payload.result
            ?.statisticsReport as StatisticsReportDto;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        }
      )
      .addCase(
        fetchReportsForTechnicalSupportManager.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default ReportsForTechnicalSupportManagerSlice.reducer;
