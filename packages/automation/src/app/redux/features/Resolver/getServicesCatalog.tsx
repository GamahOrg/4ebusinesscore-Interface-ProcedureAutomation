import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/ResponseModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg"
import { ServiceCatalog } from "../../../models/ServiceCatalog";


export const getServiceCatalog= createAsyncThunk<ResponseModel,string>(
  "ServiceCatalog/getServiceCatalog",
  async (id:string) => {
    const response = await TicketingSystemAggConsume.getServiceCatalog(id);
    return response;
  }
);
interface ServiceCatalogState {
  item: ServiceCatalog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServiceCatalogState = {
    item:[],
    status: "idle",
    error: null,
};

const serviceCatalogIdSlice = createSlice({
  name: "getServiceCatalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServiceCatalog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getServiceCatalog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload.result as ServiceCatalog[];
      })
      .addCase(getServiceCatalog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default serviceCatalogIdSlice.reducer;
