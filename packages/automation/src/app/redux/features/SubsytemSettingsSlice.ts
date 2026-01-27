import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { ResponseModel } from "../../models/response-model";
import { GetWorkSpaceByIdResponse } from "../../models/GetWorkSpaceByIdResponse";

export const fetchWorkSpace= createAsyncThunk<ResponseModel,any>(
  "SubsytemSettingsAggregator/GetWorkSpaceById",
  async (id:any) => {
    const response = await ControlPanelAggConsume.GetWorkSpaceById(id);
    return response;
  }
);
interface workspace {
  data: GetWorkSpaceByIdResponse;
  status: string;
  message: string;
}
let initialState: workspace = {
  data: new GetWorkSpaceByIdResponse(),
  status: "idle",
  message: "",
};

const subsytemSettingsSlice = createSlice({
  name: "SubsytemSettingsAggregator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkSpace.pending, (state: workspace) => {
        state.status = "loading";
      })
      .addCase(
        fetchWorkSpace.fulfilled,
        (state: workspace, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as GetWorkSpaceByIdResponse;
        }
      )
      .addCase(
        fetchWorkSpace.rejected,
        (state: workspace, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message
        }
      );
  },
});

export default subsytemSettingsSlice.reducer;
