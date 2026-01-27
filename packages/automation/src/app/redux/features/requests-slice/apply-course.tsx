import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TrainingConsume } from "@4eplatform/shared/apis/training";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { RequestStatus } from "@4eplatform/shared/enums/enums";

interface ApplyCourseState {
  status: RequestStatus;
  error: string | null;
}

const initialState: ApplyCourseState = {
  status: RequestStatus.idle,
  error: "",
};

export const postActionOnCourseStage = createAsyncThunk<ResponseModel, any>(
  "applyCourse/postActionOnCourseStage",
  async (newActionOnCourseStage, thunkApi) => {
    try {
      const response = await TrainingConsume.addActionOnCourseStage(
        newActionOnCourseStage
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const applyCourseSlice = createSlice({
  name: "applyCourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postActionOnCourseStage.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
      })
      .addCase(postActionOnCourseStage.pending, handlePending)
      .addCase(postActionOnCourseStage.rejected, handleRejected);
  },
});

const handlePending = (state: ApplyCourseState) => {
  state.status = RequestStatus.loading;
};
const handleFulfilled = (state: ApplyCourseState) => {
  state.status = RequestStatus.succeeded;
};
const handleRejected = (state: ApplyCourseState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default applyCourseSlice.reducer;
