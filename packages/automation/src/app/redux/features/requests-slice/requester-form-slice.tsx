import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ServiceOperationConsume } from '@4eplatform/shared/apis/service_operation';
import { ResponseModel } from "../../../models/response-model";


interface requesterForm {
  questionsForm:null|string;
  status: string;
  message: string;
}

let initialState: requesterForm = {
  questionsForm:null,
  status: "idle",
  message: "",
};


export const fetchRequesterForm = createAsyncThunk<ResponseModel, any>(
  "RequesterForm/fetchRequesterForm",
  async (params, thunkApi) => {
    try {
      const response = await ServiceOperationConsume.getQuestionsReport(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);



const requesterFormSlice = createSlice({
  name: "RequesterForm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequesterForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRequesterForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questionsForm = action.payload.result as unknown as string;
       
      })
      .addCase(fetchRequesterForm.rejected, (state) => {
        state.status = "failed";
      });

  },
});

export default requesterFormSlice.reducer;
