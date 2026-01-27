import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model"; 
// import { DynamicWorkflowAggConsume } from "../../../requests/dynamic-workflow-apis";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { UserModel } from "../../../models/user-model";

interface RequestTimeline {
  data:any;
  userData: UserModel;
  status: string;
  message: string;
}

let initialState: RequestTimeline = {
  data:  null,
  userData: new UserModel(
    0,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    "",
    new Date(),
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  status: "idle",
  message: "",
};


export const fetchRequestTimeline = createAsyncThunk<ResponseModel, any>(
  "RequestTimeline/fetchRequestTimeline",
  async (params, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getRequestTimeline(params);
      return response;
    } catch (error) {

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDelegationUser = createAsyncThunk<
  ResponseModel,
  number | string | Number
>("RequestTimeline/fetchDelegationUser", async (data: number | string | Number, thunkApi) => {
  try {
    const response = await ControlPanelAggConsume?.getUserbyId(data);
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err);
  }
});



const requestTimelineSlice = createSlice({
  name: "RequestTimeline",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestTimeline.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRequestTimeline.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.result as ResponseModel;
       
      })
      .addCase(fetchRequestTimeline.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchDelegationUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDelegationUser.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.userData = action.payload?.result as unknown as UserModel;
        }
      )
      .addCase(
        fetchDelegationUser.rejected,
        (state) => {
          state.status = "failed";
        }
      );

  },
});

export default requestTimelineSlice.reducer;
