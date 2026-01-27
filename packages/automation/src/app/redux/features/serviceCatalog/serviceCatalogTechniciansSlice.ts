import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { ServiceCatalogRequesterTechnicianModel } from "../../../models/serviceMangment/serviceCatalog/ServiceCatalogRequesterModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchServiceCatalogTechnicians = createAsyncThunk<
  ResponseModel,
  any
>(
  "serviceCatalogTechnicians/getAll",
  async (data: number | Number | string, thunkApi) => {
    try {
      const response = await TicketingSystemAggConsume.getServiceCatalogTechnicians(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const addServiceCatalogTechnician = createAsyncThunk(
  "serviceCatalogTechnicians/addServiceCatalogTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addServiceCatalogTechnician(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putServiceCatalogTechnician = createAsyncThunk(
  "serviceCatalogTechnicians/putServiceCatalogTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putServiceCatalogTechnician(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteServiceCatalogTechnician = createAsyncThunk(
  "serviceCatalogTechnicians/deleteServiceCatalogTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.deleteServiceCatalogTechnician(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
interface state {
  data: ServiceCatalogRequesterTechnicianModel[];
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

const serviceCatalogTechniciansSlice = createSlice({
  name: "serviceCatalogTechnicians",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceCatalogTechnicians.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchServiceCatalogTechnicians.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            .result as ServiceCatalogRequesterTechnicianModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchServiceCatalogTechnicians.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(addServiceCatalogTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        addServiceCatalogTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        addServiceCatalogTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(putServiceCatalogTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        putServiceCatalogTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        putServiceCatalogTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(deleteServiceCatalogTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        deleteServiceCatalogTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteServiceCatalogTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default serviceCatalogTechniciansSlice.reducer;
