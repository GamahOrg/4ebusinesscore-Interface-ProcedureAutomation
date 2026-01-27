import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ResponseModel,
  ResponseReportModel,
} from "../../../../models/response-model";

import { rattingModel } from "../../../../models/raating-report-model";
import { ServiceOperationConsume } from '@4eplatform/shared/apis/service_operation';

export const fetchRatingsReport = createAsyncThunk<ResponseModel, any>(
  "RatingsReportSlice/fetchRatingsReport",
  async (reportId: string) => {
    const response = await ServiceOperationConsume.GetAllRatingsReport(
      reportId
    );
    return response;
  }
);
export const PostRatingsReport = createAsyncThunk<
  ResponseModel,
  { data:any}
>(
  "PostRatings/PostRatingsReport",
  async ({data }) => {
    const response = await ServiceOperationConsume.PostRatingsReport({
      note:data.note,
      reportId:data.reportId,
      ratingsReportStatus:data.ratingsReportStatus
    }
     
    );
    return response;
  }
);
interface ResponseReport {
  reports: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResponseReport = {
  reports: "",
  status: "idle",
  error: null,
};

const RatingsReportSlice = createSlice({
  name: "RatingsReportSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingsReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRatingsReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reports = action.payload.result as rattingModel[];
      })
      .addCase(fetchRatingsReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(PostRatingsReport.pending,handlePending)
      .addCase(PostRatingsReport.rejected, handleRejected)
      .addCase(PostRatingsReport.fulfilled,handleFulfilled )
  },
});

const handlePending = (state: ResponseReport) => {
  state.status = "loading";
};

const handleFulfilled = (state: ResponseReport) => {
  state.status = "succeeded";
};

const handleRejected = (state: ResponseReport, action: any) => {
  state.status = "failed";
  state.error = action.error.message ?? "An error occurred";
};
export default RatingsReportSlice.reducer;
