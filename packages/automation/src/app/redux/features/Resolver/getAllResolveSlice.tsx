import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { ResolveReportDto } from "../../../models/ResolveReportDto";
import { Pagination } from "@4eplatform/shared/models/Pagination";

export const getResolverComponent = createAsyncThunk<ResponseModel, any>(
  "resolver/GetResolve",

  async (params: any, data: any) => {
    const response = await TicketingSystemAggConsume.resolveReport(params);
    return response;
  }
);

interface ResolveReportState {
  items: ResolveReportDto[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pagination: Pagination;
}

const initialState: ResolveReportState = {
  items: [],
  status: "idle",
  error: null,
  pagination: new Pagination(),
};

const getAllResolveSlice = createSlice({
  name: "getResolvers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResolverComponent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getResolverComponent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as unknown as ResolveReportDto[];
        state.pagination = (action as PayloadAction<ResponseModel>).payload;
      })
      .addCase(getResolverComponent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default getAllResolveSlice.reducer;
