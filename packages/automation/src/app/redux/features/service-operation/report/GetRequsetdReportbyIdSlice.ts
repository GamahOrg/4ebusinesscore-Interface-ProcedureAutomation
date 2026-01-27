import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../../models/response-model";
import { RequsetdReportmodel } from "../../../../models/get-report/modelRequsetdReport";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchRequsetdReport = createAsyncThunk<
  ResponseModel,
  {// id: string; 
    params: any }
>("RequsetdReport/fetchRequsetdReport", async (input) => {
   
  const response = await TicketingSystemAggConsume.GetRequsetdReportbyId(
    {
      pageSize: input.params?.pageSize,
      pageNumber: input.params?.pageNumber,
    //  RequsetdReportId:input.id
    }
  );
  return response;
});
interface ResponseReport {
  RequsetdRepor: RequsetdReportmodel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResponseReport = {
  // RequsetdRepor: new RequsetdReportmodel(
  //   0,
  //   "",
  //   "",
  //   "",
  // "",
  //   0,
  //   new Date(),
  //   new Date(),
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   "",
  //   ""
  // ),
  RequsetdRepor:[],
  status: "idle",
  error: null,
};

const GetRequsetdReportbyIdSlice = createSlice({
  name: "GetReportById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequsetdReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRequsetdReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.RequsetdRepor = action.payload.result as RequsetdReportmodel[];
      })
      .addCase(fetchRequsetdReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default GetRequsetdReportbyIdSlice.reducer;
