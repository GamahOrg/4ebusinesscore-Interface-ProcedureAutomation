import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetReportDataByIdDto } from "../../../../models/get-report/GetReportDataByIdModel";
import { Tech } from "../../../../models/get-report/GetAllTechnicaByMainIdMolde";
import { ResponseStatus } from "../../../../enums/response-status";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
export interface ResponseGetAllTechnicalByMainModel {
  result: result;

}
interface result{
  techMain: {reports?:object};
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  message: string;
  statusEnum: ResponseStatus;
}
export const fetchGetAllTechnicalByMainId = createAsyncThunk<
ResponseGetAllTechnicalByMainModel,
  string
>(
  "GetAllTechnicalByMainIdSelice/fetchGetAllTechnicalByMainId",
  async (id: any) => {
    const response =
      await TicketingSystemAggConsume.GetAllTechnicalByMainId(id);
    return response;
  }
);

interface ResponseReport {
  Tech: Tech[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResponseReport = {
  Tech: [],
  status: "idle",
  error: null,
};

const GetAllTechnicalByMainIdSelice = createSlice({
  name: "GetReportById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllTechnicalByMainId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchGetAllTechnicalByMainId.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.Tech = action?.payload?.result?.techMain as Tech[];
        }
      )
      .addCase(fetchGetAllTechnicalByMainId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? "An error occurred";
      });
  },
});

export default GetAllTechnicalByMainIdSelice.reducer;
