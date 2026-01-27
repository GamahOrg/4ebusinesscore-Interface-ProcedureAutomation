import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ResolveReport } from "../../../models/resolveReport";
import { ResponseModel } from "../../../models/ResponseModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { FormData } from "@4eplatform/shared/index";
interface EditResolveReportArgs {
  id: any;
  item: {};
}
interface ResolveReportState {
  item: ResolveReport;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: ResolveReportState = {
  item: new ResolveReport("", "", "", "", ""),
  status: "idle",
  error: null,
};

export const editResolver = createAsyncThunk<
  ResponseModel,
  EditResolveReportArgs,
  AsyncThunkConfig
>("resolve/editResolve", async ({ id, item }, thunkAPI) => {
  try {
    var formData = FormData(item);
    const response = await TicketingSystemAggConsume.editResolver({
      id,
      body: formData,
    });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: "An error occurred" });
  }
});

const editDataSlice = createSlice({
  name: "editData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editResolver.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editResolver.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editResolver.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default editDataSlice.reducer;
