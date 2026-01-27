import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TicketingSystemConsume } from "@4eplatform/shared/apis/ticketing_system";
import { RequestStatus } from "@4eplatform/shared/enums/enums";

interface mainClassificationDetailsState {
  data: any;
  status: RequestStatus;
  error: string | null;
}

const initialState: mainClassificationDetailsState = {
  status: RequestStatus.idle,
  error: "",
  data: [],
};

export const addMainClassificationTitleDetails = createAsyncThunk(
  "mainClassificationTitleDetails/addMainClassificationTitleDetails",
  async (data: any, thunkApi) => {
    try {
      const response =
        await TicketingSystemConsume.addMainClassificationDetailsTitle(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const editMainClassificationTitleDetails = createAsyncThunk(
  "mainClassificationTitleDetails/editMainClassificationTitleDetails",
  async (data: any, thunkApi) => {
    try {
      const response =
        await TicketingSystemConsume.putMainClassificationDetailsTitle(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const fetchMainClassificationtTitleDetailesByMainClassificationId = createAsyncThunk(
  "mainClassificationTitleDetails/addMainClassificationTitleDetails",
  async (data: any, thunkApi) => {
    try {
      const response =
        await TicketingSystemConsume.getMainClassificationtTitleDetailesByMainClassificationId(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
const mainClassificationTitleDetailsSlice = createSlice({
  name: "mainClassificationTitleDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMainClassificationTitleDetails.pending, handlePending)
      .addCase(addMainClassificationTitleDetails.fulfilled, handleFulfilled)
      .addCase(addMainClassificationTitleDetails.rejected, handleRejected);
  },
});

const handlePending = (state: mainClassificationDetailsState) => {
  state.status = RequestStatus.loading;
};

const handleFulfilled = (state: mainClassificationDetailsState) => {
  state.status = RequestStatus.succeeded;
};

const handleRejected = (state: mainClassificationDetailsState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default mainClassificationTitleDetailsSlice.reducer;
