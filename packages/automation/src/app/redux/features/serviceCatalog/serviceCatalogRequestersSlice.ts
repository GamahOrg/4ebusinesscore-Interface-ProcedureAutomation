import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { TechnicianRequesterModel } from "../../../models/TechnicianRequesterModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchServiceCatalogRequesters = createAsyncThunk<
  ResponseModel,
  any
>(
  "serviceCatalogRequesters",
  async (data: number | Number | string, thunkApi) => {
    try {
      const response = await TicketingSystemAggConsume.getServiceCatalogRequesters(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const addServiceCatalogRequester = createAsyncThunk(
  "serviceCatalogRequesters/addserviceCatalogRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addServiceCatalogRequester(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putServiceCatalogRequester = createAsyncThunk(
  "serviceCatalogRequesters/putServiceCatalogRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putServiceCatalogRequester(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteServiceCatalogRequester = createAsyncThunk(
  "serviceCatalogRequesters/deleteserviceCatalogRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.deleteServiceCatalogRequester(
        data
      );
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

const serviceCatalogRequestersSlice = createSlice({
  name: "serviceCatalogRequesters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceCatalogRequesters.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchServiceCatalogRequesters.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            .result as TechnicianRequesterModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchServiceCatalogRequesters.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(addServiceCatalogRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        addServiceCatalogRequester.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        addServiceCatalogRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(putServiceCatalogRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        putServiceCatalogRequester.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        putServiceCatalogRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(deleteServiceCatalogRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        deleteServiceCatalogRequester.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteServiceCatalogRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default serviceCatalogRequestersSlice.reducer;
