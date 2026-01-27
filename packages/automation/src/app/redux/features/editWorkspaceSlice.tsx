import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { ResponseModel } from "../../models/response-model";
import { SubsystemModel } from "../../models/subsystemsModel";

interface EditSubsystemArgs {
  id: string;
  item: {};
}

export const editSubsystem = createAsyncThunk<
  ResponseModel,
  EditSubsystemArgs

>("workspace/editSubsystem", async ({ id, item }, thunkAPI) => {
  try {
    const response = await ControlPanelAggConsume.editSubsystem({
      id,
      body: item,
    });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: "An error occurred" });
  }
});

export const editSubsystemCard = createAsyncThunk<
  ResponseModel,
  EditSubsystemArgs

>("workspace/editSubsystem", async ({ id, item }, thunkAPI) => {
  try {
    const response = await ControlPanelAggConsume.editSubsystemCard({
      id,
      body: item,
    });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: "An error occurred" });
  }
});

interface SubsystemState {
  item: SubsystemModel;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubsystemState = {
  item: new SubsystemModel(),
  status: "idle",
  error: null,
};
const editDataSlice = createSlice({
  name: "editData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editSubsystem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editSubsystem.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editSubsystem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default editDataSlice.reducer;
