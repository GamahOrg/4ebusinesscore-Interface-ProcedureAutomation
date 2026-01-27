import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ReportModel } from "../../../models/ReportModel";
import { ResponseModel } from "../../../models/response-model";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchFilterMyReport = createAsyncThunk<ResponseModel, any>(
  "myReports/fetchFilterMyReport",
  async (data: any, thunkApi) => {
    var bodyFormData = new FormData();
    if (Object.keys(data?.body)?.length > 0) {
      bodyFormData.append("statisticsReport", data?.body?.statisticsReport);
      // if (data?.body?.filterReportServiceCatalogId[0] != null) {
      //   for (
      //     let index = 0;
      //     index < data?.body?.filterReportServiceCatalogId?.length;
      //     index++
      //   ) {
      //     bodyFormData.append(
      //       "filterReport.ServiceCatalogId",
      //       data?.body?.filterReportServiceCatalogId[index]
      //     );
      //   }
      // }
      if (data?.body?.filterReportCategoryId[0] != null) {
        for (
          let index = 0;
          index < data?.body?.filterReportCategoryId?.length;
          index++
        ) {
          bodyFormData.append(
            "filterReport.CategoryId",
            data?.body?.filterReportCategoryId[index]
          );
        }
      }
      // if (data?.body?.filterReportItemId[0] != null) {
      //   for (
      //     let index = 0;
      //     index < data?.body?.filterReportItemId?.length;
      //     index++
      //   ) {
      //     bodyFormData.append(
      //       "filterReport.ItemId",
      //       data?.body?.filterReportItemId[index]
      //     );
      //   }
      // }
      if (data?.body?.filterReportClassificationId[0] != null) {
        for (
          let index = 0;
          index < data?.body?.filterReportClassificationId?.length;
          index++
        ) {
          bodyFormData.append(
            "filterReport.ClassificationId",
            data?.body?.filterReportClassificationId[index]
          );
        }
      }
      if (data?.body?.filterReportRequester[0] != null) {
        for (
          let index = 0;
          index < data?.body?.filterReportRequester?.length;
          index++
        ) {
          bodyFormData.append(
            "filterReport.Requester",
            data?.body?.filterReportRequester[index]
          );
        }
      }
      if (data?.body?.filterReportReportTitle[0] != null) {
        for (
          let index = 0;
          index < data?.body?.filterReportReportTitle?.length;
          index++
        ) {
          bodyFormData.append(
            "filterReport.ReportTitle",
            data?.body?.filterReportReportTitle[index]
          );
        }
      }
      // if (data?.body?.filterReportReportSubject[0] != null) {
      //   for (
      //     let index = 0;
      //     index < data?.body?.filterReportReportSubject?.length;
      //     index++
      //   ) {
      //     bodyFormData.append(
      //       "filterReport.ReportSubject",
      //       data?.body?.filterReportReportSubject[index]
      //     );
      //   }
      // }
      if (data?.body?.filterReportReportNumber[0] != null) {
        for (
          let index = 0;
          index < data?.body?.filterReportReportNumber?.length;
          index++
        ) {
          bodyFormData.append(
            "filterReport.ReportNumber",
            data?.body?.filterReportReportNumber[index]
          );
        }
      }
      if (data?.body?.filterReportPriority[0] != null) {
        for (
          let index = 0;
          index < data?.body?.filterReportPriority?.length;
          index++
        ) {
          bodyFormData.append(
            "FilterReport.Priority",
            data?.body?.filterReport.Priority[index]
          );
        }
      }
    }
    try {
      const response = await TicketingSystemAggConsume.getFilterMyReport({
        params: data.params,
        body: bodyFormData,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface reports {
  myReports: ReportModel[];
  status: string;
  totalPages: number;
  totalItems: number;
  message: string;
  pageSize: number;
  pageIndex: number;
}

let initialState: reports = {
  myReports: [],
  status: "idle",
  totalPages: 0,
  totalItems: 0,
  message: "",
  pageSize: 0,
  pageIndex: 0,
};

const myReportsSlice = createSlice({
  name: "myReports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterMyReport.pending, (state: reports) => {
        state.status = "loading";
      })
      .addCase(
        fetchFilterMyReport.fulfilled,
        (state: reports, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.myReports = action.payload.result as unknown as ReportModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
          state.pageIndex = action.payload.pageIndex;
          state.pageSize = action.payload.pageSize;
        }
      )
      .addCase(
        fetchFilterMyReport.rejected,
        (state: reports, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default myReportsSlice.reducer;
