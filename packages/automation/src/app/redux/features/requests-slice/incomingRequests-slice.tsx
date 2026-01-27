import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { ResponseModel } from "../../../models/response-model";
import { IncomingRequests } from "../../../models/incoming-requests";


export const fetchIncomingRequests = createAsyncThunk<ResponseModel, any>(
  "IncomingRequests/fetchIncomingRequests",
  async (data: any, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getIncomingRequests(
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
  data: IncomingRequests[];
  status: string;
  totalPages: number;
  totalItems: number;
  message: string;
  pageSize:number;
  pageIndex:number;
}

let initialState: delegations = {
  data: [],
  status: "idle",
  totalPages: 0,
  totalItems:0,
  message: "",
  pageSize:0,
  pageIndex:0
};

const incomingRequestsSlice = createSlice({
  name: "IncomingRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomingRequests.pending, (state: delegations) => {
        state.status = "loading";
      })
      .addCase(
        fetchIncomingRequests.fulfilled,
        (state: delegations, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as IncomingRequests[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
          state.pageIndex = action.payload.pageIndex;
          state.pageSize = action.payload.pageSize;
        }
      )
      .addCase(
        fetchIncomingRequests.rejected,
        (state: delegations, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default incomingRequestsSlice.reducer;
