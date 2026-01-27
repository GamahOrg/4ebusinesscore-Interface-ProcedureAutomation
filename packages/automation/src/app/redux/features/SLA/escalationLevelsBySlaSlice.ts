import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { EscalationLevelModel } from "../../../models/escalationlevelModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

export const fetchAllEscalationLevelsBySlaId = createAsyncThunk<
  ResponseModel,
  any
>("EscalationLevelsBySlaId/fetchAllEscalationLevelsBySlaId", async (id: any) => {
    let params={
        pageSize:20,pageNumber:1
    }
  const response = await TicketingSystemAggConsume.getAllEscalationLevelsBySlaId(
    id,params
  );
  return response;
});
interface EscalationLevels {
  items: EscalationLevelModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalpages: number;
  taotalItems: number;
}

const initialState: EscalationLevels = {
  items: [],
  status: "idle",
  error: null,
  totalpages: 1,
  taotalItems: 1,
};

const escalationLevelsBySlaSlice = createSlice({
  name: "EscalationLevelsBySlaId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEscalationLevelsBySlaId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllEscalationLevelsBySlaId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as EscalationLevelModel[];
        state.totalpages = action.payload.totalPages as number;
        state.taotalItems = action.payload.totalItems as number;
      })
      .addCase(fetchAllEscalationLevelsBySlaId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default escalationLevelsBySlaSlice.reducer;
