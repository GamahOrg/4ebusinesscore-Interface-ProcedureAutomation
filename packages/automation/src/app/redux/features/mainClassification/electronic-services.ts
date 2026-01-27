import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TicketingSystemConsume } from "@4eplatform/shared/apis/ticketing_system";
import {
  ElectronicServices,
  ElectronicServicesResponse,
} from "../../../models/electronic-services/ElectronicServicesModel";
import { ResponseModel } from "../../../models/ResponseModel";

interface stateType {
  data: ElectronicServicesResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: stateType = {
  data: new ElectronicServicesResponse(),
  status: "idle",
  error: null,
};

export const fetchElectronicServices = createAsyncThunk<ResponseModel, any>(
  "classification/getElectronicServices",
  async (params = {}, thunkApi) => {
    try {
      const response =
        await TicketingSystemConsume.getElectronicServices(params);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const electronicServicesSlice = createSlice({
  name: "electronicServices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchElectronicServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchElectronicServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.electronicServices = action.payload
          ?.result as ElectronicServices[];
      })
      .addCase(fetchElectronicServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default electronicServicesSlice.reducer;
