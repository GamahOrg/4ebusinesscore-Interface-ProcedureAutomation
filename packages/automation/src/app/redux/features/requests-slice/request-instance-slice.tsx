import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchReportDataByRequestinstanceId = createAsyncThunk<
  ResponseModel,
  any
>("RequestInstance/fetchReportDataByRequestinstanceId", async (id: any) => {
  const response =
    await TicketingSystemAggConsume.getReportDataByRequestinstanceId(id);
  return response;
});

interface RequestInstance {
  data: any;
  status: string;
  message: string;
}

let initialState: RequestInstance = {
  data: {},
  status: "idle",
  message: "",
};

const requestInstanceSlice = createSlice({
  name: "RequestInstance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchReportDataByRequestinstanceId.pending,
        (state: RequestInstance) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchReportDataByRequestinstanceId.fulfilled,
        (state: RequestInstance, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as RequestInstance;
        }
      )
      .addCase(
        fetchReportDataByRequestinstanceId.rejected,
        (state: RequestInstance, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default requestInstanceSlice.reducer;
