import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../../models/response-model";
import { StatisticsReportAdministration } from "../../../../models/StatisticsReportEmployee/StatisticsReportAdministration-model";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchStatisticsReportAdministrationForAdministrationManager =
  createAsyncThunk<ResponseModel, any>(
    "StatisticsReportAdministrationForAdministrationManager/fetchStatisticsReportAdministrationForAdministrationManager",
    async (params: any) => {
      const response =
        await TicketingSystemAggConsume.StatisticsReportAdministrationForAdministrationManager(
          {
            pagesize: params?.pageSize,
            pagenumber: params?.pageNumber,
            ClassificationId: params?.ClassificationId,
            requestType: params?.RequestType,
            search: params?.search,
          }
        );
      return response;
    }
  );
interface ResponseReport {
  statisticsReportEmployee: StatisticsReportAdministration[];
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

const StatisticsReportAdministrationForAdministrationManager = createSlice({
  name: "StatisticsReportAdministrationForAdministrationManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchStatisticsReportAdministrationForAdministrationManager.pending,
        (state) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchStatisticsReportAdministrationForAdministrationManager.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.statisticsReportEmployee = action.payload
            .result as StatisticsReportAdministration[];
          state.totalpages = action.payload.totalPages as number;
          state.taotalItems = action.payload.totalItems as number;
        }
      )
      .addCase(
        fetchStatisticsReportAdministrationForAdministrationManager.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default StatisticsReportAdministrationForAdministrationManager.reducer;
