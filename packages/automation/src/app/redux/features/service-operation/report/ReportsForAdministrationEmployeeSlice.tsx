import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ReportDtos,
  StatisticsReportDto,
} from "../../../../models/get-report/ResponseReport";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";

export const fetchGetReportsForAdministrationEmployee = createAsyncThunk<
  any,
  any
>(
  "GetReportsForAdministrationEmployee/fetchGetReportsForAdministrationEmployee",
  async (params: any) => {
    const response =
      await TicketingSystemAggConsume.GetReportsForAdministrationEmployee({
        pageSize: params?.pageSize,
        pageNumber: params?.pageNumber,
        statisticsReport: params?.statisticsReport,
        ClassificationId: params?.ClassificationId,
        requestType: params?.RequestType,
        delegation: params?.delegation || 0,
        search: params?.search,
        ...(params?.subSystemId && { subSystemId: params?.subSystemId }),
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
  totalItems: number;
}

const initialState: ResponseReport = {
  reports: [],
  status: "idle",
  error: null,
  pagination: new Pagination(),
  statisticsReport: new StatisticsReportDto(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
  totalItems: 0,
};

const ReportsForAdministrationEmployeeSlice = createSlice({
  name: "ReportsForAdministrationEmployee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetReportsForAdministrationEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchGetReportsForAdministrationEmployee.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.reports = action.payload.result?.reports as ReportDtos[];
          state.statisticsReport = action.payload.result
            ?.statisticsReport as StatisticsReportDto;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
          state.totalItems = action.payload.totalItems as number;
        }
      )
      .addCase(
        fetchGetReportsForAdministrationEmployee.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default ReportsForAdministrationEmployeeSlice.reducer;
