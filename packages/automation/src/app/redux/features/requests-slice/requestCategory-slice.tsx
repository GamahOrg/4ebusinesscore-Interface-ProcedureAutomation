import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DynamicWorkflowConsume } from "@4eplatform/shared/apis/dynamic_workflow";
import { RequestCategory } from "../../../../../../user-profile/src/user-profile/models/requests/requests-category";


interface stateType {
  data: RequestCategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message:string
}

const initialState: stateType = {
  data: [],
  status: "idle",
  error: null,
  message: "",
};



export const getRequestCategory = createAsyncThunk(
  "requestCategory/getRequestCategory",
  async (_, thunkApi) => {
    try {
      const response = await DynamicWorkflowConsume.getRequestCategory();
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);



const requestCategorySlice = createSlice({
  name: "requestCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRequestCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRequestCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload
          .result as unknown as RequestCategory[];
      })
      .addCase(getRequestCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })     
  },
});

export default requestCategorySlice.reducer;
