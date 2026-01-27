import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DynamicWorkflowConsume } from "@4eplatform/shared/apis/dynamic_workflow";
import { ResponseModel } from "../../../models/response-model";
import { AssignRequestTransactionDto } from "../../../models/request-transaction";
interface initialStateType {
  status: string;
  message: string;
  requestTransaction: AssignRequestTransactionDto;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
  requestTransaction: new AssignRequestTransactionDto(),
};
export const postRequestTransaction = createAsyncThunk<ResponseModel, any>(
  "request-transaction/postRequestTransaction",
  async (data, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Comment", data?.comment);
    bodyFormData.append("Action", data?.action);
    bodyFormData.append("RequestInstanceId", data?.requestInstanceId);
    if (data?.description) {
      bodyFormData.append(
        "AssginRequestInstance.Description",
        data?.description,
      );
    }
    if (data?.endDate) {
      bodyFormData.append("AssginRequestInstance.EndDate", data?.endDate);
    }
    if (data?.actionTakerId) {
      bodyFormData.append(
        "AssginRequestInstance.ActionTakerId",
        data?.actionTakerId,
      );
    }
    if (data?.stepId) {
      bodyFormData.append("StepId", data?.stepId);
    }
    if (data?.groupAssginActionTackers[0] != null) {
      for (
        let index = 0;
        index < data.groupAssginActionTackers.length;
        index++
      ) {
        bodyFormData.append(
          "AssginRequestInstance.GroupAssginActionTackers",
          data.groupAssginActionTackers[index],
        );
      }
    }
    if (data?.attachments) {
      bodyFormData.append("Attachments", data?.attachments);
    }
    if (data?.attachmentsForUserOrGroup) {
      bodyFormData.append(
        "AssginRequestInstance.Attachments",
        data?.attachmentsForUserOrGroup,
      );
    }
    try {
      const response = await DynamicWorkflowConsume.postTransaction(
        bodyFormData,
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
export const postAssignRequestTransaction = createAsyncThunk<
  ResponseModel,
  any
>(
  "request-transaction/postAssignRequestTransaction",
  async (data, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Comment", data?.comment);
    bodyFormData.append("Action", data?.action);
    bodyFormData.append(
      "AssginRequestInstanceId",
      data?.assginRequestInstanceId,
    );
    bodyFormData.append("Attachments", data?.attachments);
    try {
      const response = await DynamicWorkflowConsume.addAssginRequestTransaction(
        bodyFormData,
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
export const putAssignRequestTransaction = createAsyncThunk<ResponseModel, any>(
  "request-transaction/putAssignRequestTransaction",
  async (data, thunkApi) => {
    var bodyFormData = new FormData();
    bodyFormData.append("Comment", data?.comment);
    bodyFormData.append("Action", data?.action);
    bodyFormData.append(
      "AssginRequestInstanceId",
      data?.assginRequestInstanceId,
    );
    bodyFormData.append("Attachments", data?.attachments);
    try {
      const response = await DynamicWorkflowConsume.putAssginRequestTransaction(
        bodyFormData,
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
export const fetchAssginRequestTransaction = createAsyncThunk<
  ResponseModel,
  any
>(
  "request-transaction/fetchAssginRequestTransaction",
  async (params, thunkApi) => {
    try {
      const response = await DynamicWorkflowConsume.getAssginRequestTransaction(
        params,
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
const requestTransactionSlice = createSlice({
  name: "request-transaction",
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
        },
      )
      .addCase(
        postRequestTransaction.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        },
      )
      .addCase(
        postAssignRequestTransaction.pending,
        (state: initialStateType) => {
          state.status = "loading";
        },
      )
      .addCase(
        postAssignRequestTransaction.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        },
      )
      .addCase(
        postAssignRequestTransaction.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        },
      )
      .addCase(
        putAssignRequestTransaction.pending,
        (state: initialStateType) => {
          state.status = "loading";
        },
      )
      .addCase(
        putAssignRequestTransaction.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        },
      )
      .addCase(
        putAssignRequestTransaction.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        },
      )
      .addCase(
        fetchAssginRequestTransaction.pending,
        (state: initialStateType) => {
          state.status = "loading";
        },
      )
      .addCase(
        fetchAssginRequestTransaction.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.requestTransaction = action?.payload
            ?.result as AssignRequestTransactionDto;
          state.message = action.payload?.message;
        },
      )
      .addCase(
        fetchAssginRequestTransaction.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        },
      );
  },
});

export default requestTransactionSlice.reducer;
