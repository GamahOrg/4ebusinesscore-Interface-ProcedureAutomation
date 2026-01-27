import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";
import { Lookup } from "../models/Lookup";
import { ResponseModel } from "../models/ResponseModel";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import SubSystemSettingsModel from "../models/SubSystemSettingsModel";

interface AllSubSystemSettingsMainClassificationState {
  items: Lookup[];
  subsytemSettingsByMainClassificationId:SubSystemSettingsModel[];
  status: RequestStatus;
  error: string | null;
}

const initialState: AllSubSystemSettingsMainClassificationState = {
  items: [],
  subsytemSettingsByMainClassificationId:[],
  status: RequestStatus.idle,
  error: null,
};

export const getAllSubSystemSettingsMainClassification = createAsyncThunk<
  ResponseModel,
  any
>(
  "workspace/fetchSubsystemsSettingsMainClassification",
  async (params = {}, thunkApi) => {
    try {
      const response =
        await WorkspaceConsume.GetAllSubsytemSettingsMainClassification(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getSubsytemSettingsByMainClassificationId = createAsyncThunk<
  ResponseModel,
  any
>(
  "workspace/fetchSubsytemSettingsByMainClassificationId",
  async (id:string, thunkApi) => {
    try {
      const response =
        await WorkspaceConsume.GetSubsytemSettingsByMainClassificationId(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const SubsystemSettingsMainClassification = createSlice({
  name: "SubsystemSettingsMainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubSystemSettingsMainClassification.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(
        getAllSubSystemSettingsMainClassification.fulfilled,
        (state, action) => {
          state.status = RequestStatus.succeeded;
          state.items = action.payload.result as Lookup[];
        }
      )
      .addCase(
        getAllSubSystemSettingsMainClassification.rejected,
        (state, action) => {
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        }
      ).addCase(getSubsytemSettingsByMainClassificationId.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(
        getSubsytemSettingsByMainClassificationId.fulfilled,
        (state, action) => {
          state.status = RequestStatus.succeeded;
          state.subsytemSettingsByMainClassificationId = action.payload.result as SubSystemSettingsModel[];
        }
      )
      .addCase(
        getSubsytemSettingsByMainClassificationId.rejected,
        (state, action) => {
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        }
      )
  },
});

export default SubsystemSettingsMainClassification.reducer;
