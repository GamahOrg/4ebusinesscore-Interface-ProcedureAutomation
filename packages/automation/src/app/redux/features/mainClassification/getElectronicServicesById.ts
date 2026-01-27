import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { MainClassification } from "../../../models/MainClassificationModel";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchElectronicServicesById = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "electronicServicesById",
  async (id: number | string | Number, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.getElectronicServicesByMainId(id);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface state {
  data: MainClassification;
  status: string;
  message: string;
}
let initialState: state = {
  data: new MainClassification(),
  status: "idle",
  message: "",
};

const electronicServicesByIdSlice = createSlice({
  name: "mainClassificationById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchElectronicServicesById.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchElectronicServicesById.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload?.result as unknown as MainClassification;
        }
      )
      .addCase(
        fetchElectronicServicesById.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default electronicServicesByIdSlice.reducer;
