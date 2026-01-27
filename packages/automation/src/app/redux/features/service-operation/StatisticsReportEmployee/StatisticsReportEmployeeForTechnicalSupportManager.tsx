import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../../models/response-model";

import { StatisticsReportEmployee } from "../../../../models/StatisticsReportEmployee/StatisticsReportEmployee-model";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchStatisticsReportEmployeeForTechnicalSupportManager =
  createAsyncThunk<ResponseModel, any>(
    "StatisticsReportEmployeeForTechnicalSupportManager/fetchStatisticsReportEmployeeForTechnicalSupportManager",
    async (params: any) => {
   
      const response =
        await TicketingSystemAggConsume.StatisticsReportEmployeeForTechnicalSupportManager(
          {
            pagesize: params?.pageSize,
            pagenumber: params?.pageNumber,
            ClassificationId: params?.ClassificationId,
            Requesttype: params?.RequestType,
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

const StatisticsReportEmployeeForTechnicalSupportManagerSlice = createSlice({
  name: "StatisticsReportEmployeeForTechnicalSupportManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchStatisticsReportEmployeeForTechnicalSupportManager.pending,
        (state) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchStatisticsReportEmployeeForTechnicalSupportManager.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.statisticsReportEmployee = action.payload
            .result as StatisticsReportEmployee[];
          state.totalpages = action.payload.totalPages as number;
          state.taotalItems = action.payload.totalItems as number;
        }
      )
      .addCase(
        fetchStatisticsReportEmployeeForTechnicalSupportManager.rejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        }
      );
  },
});

export default StatisticsReportEmployeeForTechnicalSupportManagerSlice.reducer;
