import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MainClassificationResponse } from "../../../models/MainClassificationModel";
import { TicketingSystemConsume } from "@4eplatform/shared/apis/ticketing_system";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

interface stateType {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: stateType = {
  status: "idle",
  error: null,
  data: [],
};

export const addMainClassification = createAsyncThunk(
  "mainClassification/addMainClassification",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addMainClassification(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putMainClassification = createAsyncThunk(
  "mainClassification/putMainClassification",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putMainClassification(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteMainClassification = createAsyncThunk(
  "mainClassification/deleteMainClassification",
  async (data: any, thunkApi) => {
    try {
      const response =
        await TicketingSystemAggConsume.deleteMainClassification(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getMainClassification = createAsyncThunk<any, any>(
  "mainClassification/getMainClassification",
  async (param = {}, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.getMainClassification({
        pageSize: param?.pageSize || "100",
        pageNumber: param?.pageNumber || "1",
        search: param?.search || "",
        ...(param?.subSystemId && { subSystemId: param?.subSystemId }),
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getMainClassificationById = createAsyncThunk<any, any>(
  "mainClassification/getMainClassificationById",
  async (id, thunkApi) => {
    try {
      const response =
        await TicketingSystemConsume.getMainClassificationById(id);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
const mainClassificationSlice = createSlice({
  name: "mainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMainClassification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMainClassification.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addMainClassification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(getMainClassification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMainClassification.fulfilled, (state, action) => {
        state.status = "succeeded";
        let { result } = action.payload;
        state.data = {
          ...action.payload,
          mainClassifications: result,
        } as MainClassificationResponse;
      })
      .addCase(getMainClassificationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        let { result } = action.payload;
        state.data = {
          ...action.payload,
          mainClassifications: [result],
        } as MainClassificationResponse;
      })
      .addCase(getMainClassification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(putMainClassification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putMainClassification.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(putMainClassification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(deleteMainClassification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMainClassification.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteMainClassification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default mainClassificationSlice.reducer;
