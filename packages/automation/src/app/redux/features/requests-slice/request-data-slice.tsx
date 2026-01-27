import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { ResponseModel } from "../../../models/response-model";
import { RequestDataModel } from "../../../models/request-data";


interface requestData {
  RequestData:RequestDataModel;
  status: string;
  message: string;
}

let initialState: requestData = {
  RequestData: new RequestDataModel("","","","","","","","","",0,0,"",[],[],[],[],[],[],0,""),
  status: "idle",
  message: "",
};


export const fetchReportsByRequestId= createAsyncThunk<ResponseModel, any>(
  "requestData/fetchReportsByRequestId",
  async (id, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getAllReportsByRequestId(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);



const requestDataSlice = createSlice({
  name: "requestData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsByRequestId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReportsByRequestId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.RequestData = action.payload.result as RequestDataModel;
       
      })
      .addCase(fetchReportsByRequestId.rejected, (state) => {
        state.status = "failed";
      });

  },
});

export default requestDataSlice.reducer;
