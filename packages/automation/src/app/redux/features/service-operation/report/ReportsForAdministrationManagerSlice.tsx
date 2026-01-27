import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ReportDtos,
  StatisticsReportDto,
} from "../../../../models/get-report/ResponseReport";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";

export const fetchReportsForAdministrationManager = createAsyncThunk<any, any>(
  "ReportsForAdministrationManager/fetchReportsForAdministrationManager",
  async (params: any) => {
    const response =
      await TicketingSystemAggConsume.GetReportsForAdministrationManager({
        pageSize: params?.pageSize,
        pageNumber: params?.pageNumber,
        statisticsReport: params?.statisticsReport,
        ClassificationId: params?.ClassificationId,
        requestType: params?.RequestType,
        delegation: params?.delegation || 0,
        search: params?.search,
        ...(params?.integrationid && { integrationid: params?.integrationid }),
      });
    return response;
  }
);

export const GetcountReportsForAdministrationManager = createAsyncThunk<
  ResponseModel,
  any
>(
  "ReportsForAdministrationManager/GetcountReportsForAdministrationManager",
  async (params: any) => {
    const response =
      await TicketingSystemAggConsume.GetcountReportsForAdministrationManager({
        ClassificationId: params?.ClassificationId,
        requestType: params?.RequestType,
        delegation: params?.delegation,
        search: params?.search,
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
  countReport: number;
  totalItems: number;
}

const initialState: ResponseReport = {
  reports: [],
  status: "idle",
  error: null,
  pagination: new Pagination(),
  statisticsReport: new StatisticsReportDto(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
  countReport: 0,
  totalItems: 0,
};

const ReportsForAdministrationManagerSlice = createSlice({
  name: "ReportsForAdministrationManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsForAdministrationManager.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchReportsForAdministrationManager.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.reports = action.payload.result?.reports as ReportDtos[];
          state.countReport = action.payload.result?.statisticsReport as number;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
          state.totalItems = action.payload.totalItems as number;
        }
      )
      .addCase(
        fetchReportsForAdministrationManager.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      )
      .addCase(GetcountReportsForAdministrationManager.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        GetcountReportsForAdministrationManager.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.statisticsReport = action.payload.result as StatisticsReportDto;
        }
      )
      .addCase(
        GetcountReportsForAdministrationManager.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default ReportsForAdministrationManagerSlice.reducer;
