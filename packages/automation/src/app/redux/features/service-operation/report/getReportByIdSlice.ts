import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../../models/response-model";
import { GetReportDataByIdDto } from "../../../../models/get-report/GetReportDataByIdModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { FormData } from "@4eplatform/shared";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
export const fetchGetReportById = createAsyncThunk<ResponseModel, string>(
  "GetReportById/fetchGetReportById",
  async (id: any) => {
    const response =
      await TicketingSystemAggConsume.GetReportDataByReportId(id);
    return response;
  }
);

export const PutOperationReportConverted = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("ReportConverted/PutOperationReportConverted", async (id, body) => {
  const response = await TicketingSystemAggConsume.PutOperationReportConverted(
    id,
    body
  );
  return response;
});

export const PutOperationReportStatus= createAsyncThunk<
  ResponseModel,
  any
>("ReportConverted/PutOperationReportStatus", async (data) => {
  const response = await TicketingSystemAggConsume.editOperationReportStatus(
    data
  );
  return response;
});

export const PutOperationReportRejected = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("ReportRejected/PutOperationReportRejected", async (id, body) => {
  const response = await TicketingSystemAggConsume.PutReportStatusRejected(
    id,
    body
  );
  return response;
});
export const PutOperationReportStatusDelay = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("ReportDelay/PutOperationReportDelay", async (id, body) => {
  const response =
    await TicketingSystemAggConsume.PutOperationReportStatusDelay(id, body);
  return response;
});
// export const PutOperationReportStatusSolved = createAsyncThunk<
//   ResponseModel,
//   { id: string; body: any }
// >("ReportSolved/PutOperationReportStatusSolved", async (id, body) => {
//   const response =
//     await TicketingSystemAggConsume.PutOperationReportStatusSolved(
//       id,
//       body
//     );
//   return response;
// });

export const PutOperationReportStatusSolved = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("ReportSolved/PutOperationReportStatusSolved", async (params) => {
  try {
    const response =
      await TicketingSystemAggConsume.PutOperationReportStatusSolved(params);
    return response;
  } catch (error) {
    console.error("Error in PutOperationReportStatusSolved:", error);
    throw error;
  }
});

export const PutOperationReportStatusClosed = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("ReportClosed/PutOperationReportStatusClosed", async (id, body) => {
  const response =
    await TicketingSystemAggConsume.PutOperationReportStatusClosed(id, body);
  return response;
});
export const PutOperationReportStatusReopen = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("ReportReopen/PutOperationReportStatusReopen", async (id, body) => {
  const response =
    await TicketingSystemAggConsume.PutOperationReportStatusReopen(id, body);
  return response;
});
export const PutOperationReportStatusAccepted = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("ReportAccepted/PutOperationReportStatusAccepted", async (id, body) => {
  const response =
    await TicketingSystemAggConsume.PutOperationReportStatusAccepted(id, body);
  return response;
});

export const PutConsentRequestStatus = createAsyncThunk<
  ResponseModel,
  { id: string; body: any }
>("ConsentRequestStatuss/PutConsentRequestStatus", async (id, body) => {
  const response = await TicketingSystemAggConsume.PutConsentRequestStatus(
    id,
    body
  );
  return response;
});
export const PostOperationReport = createAsyncThunk<
  ResponseModel,
  { reportId: any }
>("PostOperationt/PostOperationReport", async (reportId) => {
  const response =
    await TicketingSystemAggConsume.PostOperationReport(reportId);
  return response;
});

export const getAllDelegationToUserByUserId = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("GetReportById/getAllDelegationToUserByUserId", async ({ id, myparams }) => {
  const response = await UserManagmentConsume.getAllDelegationToUserByUserId({
    id,
    params: {
      pageSize: myparams?.pageSize,
      pageNumber: myparams?.pageNumber,
      date: myparams?.date,
    },
  });
  return response;
});
interface putRequset {
  managerId: string;
  senderId: string;
  note: string;
  reportId: string;
}
export const PostConsentRequest = createAsyncThunk<
  ResponseModel,
  {
    reportId: string;
    senderId: string;
    managerId: string;
    note: string;
  }
>(
  "ConsentRequest/PostConsentRequest",
  async ({ reportId, senderId, managerId, note }, thunkApi) => {
    try {
      const response = await TicketingSystemAggConsume.PostConsentRequest({
        reportId: reportId,
        senderId: senderId,
        managerId: managerId,
        note: note,
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
interface ResponseReport {
  report: GetReportDataByIdDto;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  data: any;
}

const initialState: ResponseReport = {
  data: [],
  report: new GetReportDataByIdDto(
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    "",
    new Date(),
    new Date(),
    0,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    0,
    0,
    "",
    0,
    "",
    "",
    "",
    false,
    []
  ),
  status: "idle",
  error: null,
};

const GetReportById = createSlice({
  name: "GetReportById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetReportById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetReportById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.report = action.payload.result as GetReportDataByIdDto;
      })
      .addCase(fetchGetReportById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(PutOperationReportStatusSolved.pending, (state) => {
        state.status = "loading";
      })
      .addCase(PutOperationReportStatusSolved.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(PutOperationReportStatusSolved.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(
        getAllDelegationToUserByUserId.fulfilled,
        (state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = (action as PayloadAction<ResponseModel>).payload
            .result as any;
        }
      )
      .addCase(getAllDelegationToUserByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllDelegationToUserByUserId.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default GetReportById.reducer;
