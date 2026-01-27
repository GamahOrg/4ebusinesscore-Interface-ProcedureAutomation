import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/ResponseModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg"
import { ResolveDetails } from "../../../models/ResolveDetails";

export const getResolverById= createAsyncThunk<ResponseModel,any>(
  "resolver/getResolverById",
  async (id:string) => {
    const response = await TicketingSystemAggConsume.getResolverComponent(id);
    return response;
  }
);
interface ResolverState {
  item: ResolveDetails;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResolverState = {
    item:new ResolveDetails('','','','','','','','','','','',''),
    status: "idle",
    error: null,
};

const resolverDetailsSlice = createSlice({
  name: "getResolverById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResolverById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getResolverById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload.result as ResolveDetails;
      })
      .addCase(getResolverById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default resolverDetailsSlice.reducer;
