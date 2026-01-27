import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../../models/response-model";
import {
  ReportDtos,
  StatisticsReportDto,
} from "../../../../models/get-report/ResponseReport";
import { StatisticsReportEmployee } from "../../../../models/StatisticsReportEmployee/StatisticsReportEmployee-model";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchStatisticsReportEmployeeForAdministrationManager =
  createAsyncThunk<ResponseModel, any>(
    "StatisticsReportEmployeeForAdministrationManager/fetchStatisticsReportEmployeeForAdministrationManager",
    async (params: any) => {
      const response =
      await TicketingSystemAggConsume.StatisticsReportEmployeeForAdministrationManager(
          {
            pageSize: params?.pageSize,
            pageNumber: params?.pageNumber,
            ClassificationId: params?.ClassificationId,
            requestType: params?.RequestType,
            search: params?.search,
          }
        );
      return response;
    }
  );
interface ResponseReport {
  statisticsReportEmployee: StatisticsReportEmployee[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalpages: number;
  taotalItems: number;
}

const initialState: ResponseReport = {
  statisticsReportEmployee: [],
  status: "idle",
  error: null,
  totalpages: 1,
  taotalItems: 1,
};

const StatisticsReportEmployeeForAdministrationManager = createSlice({
  name: "StatisticsReportEmployeeForAdministrationManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchStatisticsReportEmployeeForAdministrationManager.pending,
        (state) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchStatisticsReportEmployeeForAdministrationManager.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.statisticsReportEmployee = action.payload
            .result as StatisticsReportEmployee[];
          state.totalpages = action.payload.totalPages as number;
          state.taotalItems = action.payload.totalItems as number;
        }
      )
      .addCase(
        fetchStatisticsReportEmployeeForAdministrationManager.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default StatisticsReportEmployeeForAdministrationManager.reducer;
