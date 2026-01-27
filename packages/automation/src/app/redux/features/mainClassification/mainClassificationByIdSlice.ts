import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { MainClassification } from "../../../models/MainClassificationModel";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchMainClassificationById = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "mainClassificationById",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.getMainClassificationById(data);
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

const mainClassificationByIdSlice = createSlice({
  name: "mainClassificationById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainClassificationById.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMainClassificationById.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload?.result as unknown as MainClassification;
        }
      )
      .addCase(
        fetchMainClassificationById.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default mainClassificationByIdSlice.reducer;
