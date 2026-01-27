import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";

export const GetSubsytemSettingsMainClassificationAgg = createAsyncThunk<ResponseModel,any>(
  "workspace/GetSubsytemSettingsMainClassificationAgg",
  async (params?:any) => {
    const response = await ControlPanelAggConsume.getSubsytemSettingsMainClassificationAgg({
        pageSize: params?.pageSize || "1000",
        pageNumber: params?.pageNumber || "1",
        search: params?.search || "",
        isHome: params?.isHome || false,
      });
    return response;
  }
);

export const editSubsytemMainClassificationSequence = createAsyncThunk<ResponseModel, any
  >("workspace/editSubsytemMainClassificationSequence",
  async (editedSubSystemSequence: any, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.UpdateSubsytemMainClassificationSequence(
        editedSubSystemSequence
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface SubsystemState {
  items: [];
  status:RequestStatus ;
  error: string | null;
}

const initialState: SubsystemState = {
  items: [],
  status: RequestStatus.idle,
  error: null,
};

const SubsytemSettingsMainClassificationSlice = createSlice({
  name: "subsytemSettingsMainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(GetSubsytemSettingsMainClassificationAgg.pending, handlePending)
      .addCase(GetSubsytemSettingsMainClassificationAgg.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.items = action.payload.result as unknown as [];
      })
      .addCase(GetSubsytemSettingsMainClassificationAgg.rejected,handleRejected)
       .addCase(editSubsytemMainClassificationSequence.pending, handlePending)
      .addCase(editSubsytemMainClassificationSequence.fulfilled, handleFulfilled)
      .addCase(editSubsytemMainClassificationSequence.rejected, handleRejected)
  },
});

const handlePending = (state: SubsystemState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: SubsystemState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: SubsystemState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default SubsytemSettingsMainClassificationSlice.reducer;
