import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { ResponseModel } from "../../../models/response-model";
import { Requests } from "../../../../../../user-profile/src/user-profile/models/requests/requests";

export const fetchOutgoingRequests = createAsyncThunk<ResponseModel, any>(
  "outgoingRequests/fetchOutgoingRequests",
  async (data: any, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getOutgoingRequests(
        {
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);


interface delegations {
  data: Requests[];
  status: string;
  totalPages: number;
  message: string;
  totalItems:number;
  pageSize:number;
  pageIndex:number;
}

let initialState: delegations = {
  data: [],
  status: "idle",
  totalPages: 0,
  message: "",
  totalItems:0,
  pageSize:0,
  pageIndex:0
};

const outgoingRequestsSlice = createSlice({
  name: "outgoingRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutgoingRequests.pending, (state: delegations) => {
        state.status = "loading";
      })
      .addCase(
        fetchOutgoingRequests.fulfilled,
        (state: delegations, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as Requests[];
          state.totalItems = action.payload.totalItems as number;
          state.totalPages = action.payload.totalPages;
          state.pageIndex = action.payload.pageIndex;
          state.pageSize = action.payload.pageSize;
        }
      )
      .addCase(
        fetchOutgoingRequests.rejected,
        (state: delegations, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default outgoingRequestsSlice.reducer;
