import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ReportDtos,
  StatisticsReportDto,
} from "../../../../models/get-report/ResponseReport";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";

export const fetchGetReportsForTechnicalSupportEmployee = createAsyncThunk<
  any,
  any
>(
  "GetReportsForTechnicalSupportEmployee/fetchGetReportsForTechnicalSupportEmployee",
  async (params: any) => {
    const response =
      await TicketingSystemAggConsume.GetReportsForTechnicalSupportEmployee({
        pageSize: params?.pageSize,
        pageNumber: params?.pageNumber,
        statisticsReport: params?.statisticsReport,
        ClassificationId: params?.ClassificationId,
        delegation: params?.delegation || 0,
        search: params?.search,
        Requesttype: params?.Requesttype,
        ...(params?.subSystemId && { subSystemId: params?.subSystemId }),
        ...(params?.integrationid && { integrationid: params?.integrationid }),
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
}

const initialState: ResponseReport = {
  reports: [],
  status: "idle",
  error: null,
  pagination: new Pagination(),
  statisticsReport: new StatisticsReportDto(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
};

const ReportsForTechnicalSupportEmployeeSlice = createSlice({
  name: "ReportsForTechnicalSupportEmployee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetReportsForTechnicalSupportEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchGetReportsForTechnicalSupportEmployee.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.reports = action.payload.result?.reports as ReportDtos[];
          state.statisticsReport = action.payload.result
            ?.statisticsReport as StatisticsReportDto;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        }
      )
      .addCase(
        fetchGetReportsForTechnicalSupportEmployee.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default ReportsForTechnicalSupportEmployeeSlice.reducer;
