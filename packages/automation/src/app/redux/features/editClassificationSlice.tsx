import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TicketingSystemConsume } from "@4eplatform/shared/apis/ticketing_system";

import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { ResponseModel } from "../../models/response-model";
import { MainClassification } from "../../models/MainClassificationModel";

export const fetchMainClassificationById = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "editClassification/mainClassificationById",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response =
        await TicketingSystemConsume.getMainClassificationById(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const putMainClassification = createAsyncThunk(
  "editClassification/putMainClassification",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putMainClassification(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const fetchOrgMembers = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("editClassification/orgMembers", async ({ id, myparams }, thunkApi) => {
  try {
    const response = await ControlPanelAggConsume.getAllOrgMembers({
      id,
      params: {
        pageSize: myparams?.pageSize,
        pageNumber: myparams?.pageNumber,
        date: myparams?.date,
      },
    });
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err);
  }
});


interface editClassificationSliceState {
  mainClassificationData: MainClassification;
  orgMembersData: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string;
}

const initialState: editClassificationSliceState = {
  mainClassificationData: new MainClassification(),
  orgMembersData: [],
  status: "idle",
  error: null,
  message: "",
};

const EditClassificationSlice = createSlice({
  name: "editClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMainClassificationById.pending,
        (state: editClassificationSliceState) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchMainClassificationById.fulfilled,
        (
          state: editClassificationSliceState,
          action: PayloadAction<ResponseModel>
        ) => {
          state.status = "succeeded";
          state.mainClassificationData = action.payload
            ?.result as unknown as MainClassification;
        }
      )
      .addCase(
        fetchMainClassificationById.rejected,
        (state: editClassificationSliceState, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      ).addCase(putMainClassification.pending, (state: editClassificationSliceState) => {
        state.status = "loading";
      })
      .addCase(putMainClassification.fulfilled, (state: editClassificationSliceState, action: PayloadAction<any>) => {
        state.status = "succeeded";
      })
      .addCase(putMainClassification.rejected, (state: editClassificationSliceState, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchOrgMembers.pending, (state: editClassificationSliceState) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgMembers.fulfilled,
        (state: editClassificationSliceState, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.orgMembersData = action.payload?.result as unknown as any;
        }
      )
      .addCase(
        fetchOrgMembers.rejected,
        (state: editClassificationSliceState, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default EditClassificationSlice.reducer;
