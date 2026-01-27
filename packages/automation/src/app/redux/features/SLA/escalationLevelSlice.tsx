import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import {EscalationLevelModel} from "../../../models/escalationlevelModel"
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";


export const fetchEscalationLevels= createAsyncThunk<ResponseModel,any>(
    "EscalationLevels/fetchEscalationLevels",
    async (params:any) => {
      const response = await TicketingSystemAggConsume.getAllEscalationLevels(  
        {
        pageSize: params?.pageSize,
        pageNumber: params?.pageNumber,
      });
      return response;
    }
  );
interface EscalationLevels {
  items: EscalationLevelModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalpages:number;
  taotalItems:number;
}

const initialState: EscalationLevels = {
    items:[],
    status: "idle",
    error: null,
    totalpages: 1,
    taotalItems:1,
};

const EscalationLevelsSlice = createSlice({
  name: "EscalationLevels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEscalationLevels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEscalationLevels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as EscalationLevelModel[];
        state.totalpages= action.payload.totalPages as number;
        state.taotalItems= action.payload.totalItems as number;
      })
      .addCase(fetchEscalationLevels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default EscalationLevelsSlice.reducer;
