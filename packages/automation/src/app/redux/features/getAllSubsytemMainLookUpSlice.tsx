import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";

import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Lookup } from "../../models/Lookup";
import { ResponseModel } from "../../models/response-model";

interface AllSubSystemSettingsMainLookUpState {
  items: Lookup[];
  status: RequestStatus;
  error: string | null;
}

const initialState: AllSubSystemSettingsMainLookUpState = {
  items: [],
  status: RequestStatus.idle,
  error: null,
};

export const getAllSubSystemMainLookUP = createAsyncThunk<ResponseModel, any>(
  "SubsystemMainLookUp/getAllSubSystemMainLookUP",
  async (_, thunkApi) => {
    try {
      const response = await WorkspaceConsume.getAllSubSystemMainLookUP();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const getAllSubsystemMainLookUpSlice = createSlice({
  name: "SubsystemSettingsMainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubSystemMainLookUP.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getAllSubSystemMainLookUP.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.items = action.payload.result as Lookup[];
      })
      .addCase(getAllSubSystemMainLookUP.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default getAllSubsystemMainLookUpSlice.reducer;
