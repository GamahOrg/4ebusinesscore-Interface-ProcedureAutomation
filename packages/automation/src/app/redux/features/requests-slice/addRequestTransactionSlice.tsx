import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DynamicWorkflowConsume } from "@4eplatform/shared/apis/dynamic_workflow";
import { ResponseModel } from "../../../models/response-model";
interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

// export const postRequestTransaction = createAsyncThunk<ResponseModel, any>(
//   "user-profile-add-request-transaction",
//   async (data, thunkApi) => {
//     try {
//       const response = await DynamicWorkflowConsume.postTransaction(data);
//       return response;
//     } catch (err: any) {
//       return thunkApi.rejectWithValue(err);
//     }
//   }
// );

export const postRequestTransaction = createAsyncThunk<ResponseModel, any>(
  "user-profile-add-request-transaction",
  async (data, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Comment", data?.comment);
    bodyFormData.append("Action", data?.action);
    bodyFormData.append("RequestInstanceId", data?.requestInstanceId);
    // bodyFormData.append("AffectedSteps", data?.affectedSteps);
    bodyFormData.append("Attachments", data?.attachments);
    try {
      const response = await DynamicWorkflowConsume.postTransaction(bodyFormData);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const addRequestTransactionSlice = createSlice({
  name: "user-profile-add-request-transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRequestTransaction.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        postRequestTransaction.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        postRequestTransaction.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default addRequestTransactionSlice.reducer;
