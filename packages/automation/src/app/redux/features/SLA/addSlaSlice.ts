import { ResponseModel } from "./../../../models/response-model";
import { SLAConsume } from "@4eplatform/shared/apis/sla";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  status: string;
  message: string;
}
const initialState: initialStateType = {
  status: "idle",
  message: "",
};

export const addSLA = createAsyncThunk<ResponseModel, any>(
  "addSLA",
  async (data: any, thunkApi) => {
    try {
      const response = await SLAConsume.postSla(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const addSLASlice = createSlice({
  name: "addSLA",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSLA.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        addSLA.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        addSLA.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default addSLASlice.reducer;
