import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../../models/response-model";
import { ServiceOperationConsume } from "@4eplatform/shared/apis/service_operation";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

interface ResponseReport {
  reportNotes: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResponseReport = {
  reportNotes: "",
  status: "idle",
  error: null,
};

export const postReportNote = createAsyncThunk<ResponseModel, { data: any }>(
  "ReportNoteSlice/postReportNote",
  async ({data}) => {
          let formdata = new FormData();
      if (data.reportNoteAttachments) {
        data.reportNoteAttachments.forEach((file:any) => {
          formdata.append("reportNoteAttachments", file);
        });
      }
      formdata.append("note", data.note);
      formdata.append("reportId", data.reportId);
      formdata.append("noteCreatortype", data.noteCreatortype);
    const response = await ServiceOperationConsume.PostReportNote(formdata)
    return response;
  }
);

export const fetchReportNote = createAsyncThunk<ResponseModel, any>(
  "ReportNoteSlice/fetchReportNote",
  async (reportId: string) => {
    const response = await TicketingSystemAggConsume.GetReportNoteByReportId(`id?ReportId=`+reportId);
    return response;
  }
);

const ReportNotesSlice = createSlice({
  name: "ReportNotesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReportNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reportNotes = action.payload.result as any[];
      })
      .addCase(fetchReportNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(postReportNote.pending, handlePending)
      .addCase(postReportNote.rejected, handleRejected)
      .addCase(postReportNote.fulfilled, handleFulfilled);
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

export default ReportNotesSlice.reducer;
