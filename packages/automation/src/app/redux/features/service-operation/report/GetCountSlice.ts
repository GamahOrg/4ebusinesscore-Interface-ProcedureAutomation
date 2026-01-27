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

export const fetchGetCount = createAsyncThunk<ResponseModel, any>(
  "GetCount/fetchGetCount",
  async (params: any) => {
    const response = await TicketingSystemAggConsume.GetCount({
      DetermineForResponse: params?.DetermineForResponse,
      ClassificationId: params?.ClassificationId,
      Requesttype: params?.Requesttype,
      search: params?.search,
      delegation: params?.delegation || 0,
      ...(params?.subSystemId && { subSystemId: params?.subSystemId }),
      ...(params?.integrationid && { integrationid: params?.integrationid }),
    });
    return response;
  }
);

export const fetchGetCountAdmin = createAsyncThunk<ResponseModel, any>(
  "GetCount/fetchGetCountAdmin",
  async (params: any) => {
    const response = await TicketingSystemAggConsume.GetCountAdmin({
      ClassificationId: params?.ClassificationId,
      RequestType: params?.RequestType,
      search: params?.search,
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

const GetCountSlice = createSlice({
  name: "GetCountSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statisticsReport = action.payload.result as StatisticsReportDto;
      })
      .addCase(fetchGetCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchGetCountAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetCountAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statisticsReport = action.payload.result as StatisticsReportDto;
      })
      .addCase(fetchGetCountAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default GetCountSlice.reducer;
