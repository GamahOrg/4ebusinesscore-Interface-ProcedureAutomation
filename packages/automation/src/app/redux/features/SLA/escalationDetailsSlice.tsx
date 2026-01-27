import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import {EscalationLevelModel} from "../../../models/escalationlevelModel"
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const getEscalationLevelById= createAsyncThunk<ResponseModel,any>(
  "EscalationLevelDetails/getEscalationLevelById",
  async (id:string,thunkApi) => {
    try{
      const response = await TicketingSystemAggConsume.getEscalationLevelById(id);
    return response;
    }
    catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface EscalationLevelDetails {
  item: EscalationLevelModel;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EscalationLevelDetails = {
    item:new EscalationLevelModel("","",0,0,0,0,"","","","","",""),
    status: "idle",
    error: null,
};

const EscalationDetailsSlice = createSlice({
  name: "EscalationLevelDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEscalationLevelById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEscalationLevelById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload.result as EscalationLevelModel;
      })
      .addCase(getEscalationLevelById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default EscalationDetailsSlice.reducer;
