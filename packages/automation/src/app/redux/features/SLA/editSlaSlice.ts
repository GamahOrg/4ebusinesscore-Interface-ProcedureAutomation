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

export const editSLA = createAsyncThunk<ResponseModel, any>(
  "addSLA",
  async (data: any, thunkApi) => {
    try {
      const response = await SLAConsume.putSla(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const editSLASlice = createSlice({
  name: "editSLA",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editSLA.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        editSLA.fulfilled,
        (state: initialStateType, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        editSLA.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default editSLASlice.reducer;
