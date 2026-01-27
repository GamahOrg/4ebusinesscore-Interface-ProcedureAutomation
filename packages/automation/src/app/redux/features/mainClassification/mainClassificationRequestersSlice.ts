import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchMainClassificationRequesters = createAsyncThunk<
  ResponseModel,
  any
>(
  "mainClassificationRequesters",
  async (data: any, thunkApi) => {
    const {id, params} = data

    try {
      const response = await TicketingSystemAggConsume.getMainClassificationRequesters({
        id,
        params: {
          pageSize: params?.pageSize,
          pageNumber: params?.pageNumber,
        },
      });
      
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const addMainClassificationRequester = createAsyncThunk(
  "mainClassificationRequesters/addMainClassificationRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addMainClassificationRequester(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putMainClassificationRequester = createAsyncThunk(
  "mainClassificationRequesters/putMainClassificationRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putMainClassificationRequester(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteMainClassificationRequester = createAsyncThunk(
  "mainClassificationRequesters/deleteMainClassificationRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.deleteMainClassificationRequester(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
interface state {
  data: any;
  status: string;
  totalPages: number;
  totalItems: number;
  message: string;
}

let initialState: state = {
  data: [],
  status: "idle",
  totalPages: 1,
  totalItems: 1,
  message: "",
};

const mainClassificationRequestersSlice = createSlice({
  name: "mainClassificationRequesters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainClassificationRequesters.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMainClassificationRequesters.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as any;
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchMainClassificationRequesters.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(addMainClassificationRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        addMainClassificationRequester.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
        }
      )
      .addCase(
        addMainClassificationRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(putMainClassificationRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        putMainClassificationRequester.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
        }
      )
      .addCase(
        putMainClassificationRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(deleteMainClassificationRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        deleteMainClassificationRequester.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
        }
      )
      .addCase(
        deleteMainClassificationRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default mainClassificationRequestersSlice.reducer;
