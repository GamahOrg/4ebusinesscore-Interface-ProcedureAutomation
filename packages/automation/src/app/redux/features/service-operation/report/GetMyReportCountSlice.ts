import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ResponseModel,
  ResponseReportModel,
} from "../../../../models/response-model";
import {
  ReportDtos,
  StatisticsReportDto,
} from "../../../../models/get-report/ResponseReport";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchMyReportCount = createAsyncThunk<ResponseModel, any>(
  "GetMyReportCount/fetchMyReportCount",
  async (params: any) => {
    const response = await TicketingSystemAggConsume.GetMyReportCount({
      DetermineForResponse: params?.DetermineForResponse,
      ClassificationId: params?.ClassificationId,
      requestType: params?.RequestType,
      delegation: params?.delegation || 0,
      ...(params?.subSystemId && { subSystemId: params?.subSystemId }),
    });
    return response;
  }
);
interface ResponseReport {
  statisticsReport: StatisticsReportDto;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResponseReport = {
  status: "idle",
  error: null,
  statisticsReport: new StatisticsReportDto(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
};

const GetMyReportCountSlice = createSlice({
  name: "GetMyReportCount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyReportCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyReportCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statisticsReport = action.payload.result as StatisticsReportDto;
      })
      .addCase(fetchMyReportCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default GetMyReportCountSlice.reducer;
