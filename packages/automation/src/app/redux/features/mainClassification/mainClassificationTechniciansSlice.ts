import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { TechnicianRequesterModel } from "../../../models/TechnicianRequesterModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchMainClassificationTechnicians = createAsyncThunk<
  ResponseModel,
  any
>(
  "mainClassificationTechnicians/getAll",
  async (data: any, thunkApi) => {
    const {id, params} = data

    try {
      const response = await TicketingSystemAggConsume.getMainClassificationTechnicians({
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
export const addMainClassificationTechnician = createAsyncThunk(
  "mainClassificationTechnicians/addMainClassificationTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addMainClassificationTechnician(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putMainClassificationTechnician = createAsyncThunk(
  "mainClassificationTechnicians/putMainClassificationTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putMainClassificationTechnician(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteMainClassificationTechnician = createAsyncThunk(
  "mainClassificationTechnicians/deleteMainClassificationTechnician",
  async (data: any, thunkApi) => {
    try {
      const response =
        await TicketingSystemConsume.deleteMainClassificationTechnician(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
interface state {
  data: TechnicianRequesterModel[];
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

const mainClassificationTechniciansSlice = createSlice({
  name: "mainClassificationTechnicians",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainClassificationTechnicians.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMainClassificationTechnicians.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            .result as TechnicianRequesterModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchMainClassificationTechnicians.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(addMainClassificationTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        addMainClassificationTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        addMainClassificationTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(putMainClassificationTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        putMainClassificationTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        putMainClassificationTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(deleteMainClassificationTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        deleteMainClassificationTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteMainClassificationTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default mainClassificationTechniciansSlice.reducer;
