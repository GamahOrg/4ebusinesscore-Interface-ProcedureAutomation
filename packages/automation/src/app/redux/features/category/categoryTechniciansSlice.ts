import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { ServiceCatalogRequesterTechnicianModel } from "../../../models/serviceMangment/serviceCatalog/ServiceCatalogRequesterModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchCategoryTechnicians = createAsyncThunk<
  ResponseModel,
  any
>(
  "categoryTechnicians/getById",
  async (data:string, thunkApi) => {
    try {
      const response = await TicketingSystemAggConsume.getCategoryTechnicians(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const addCategoryTechnician = createAsyncThunk(
  "categoryTechnicians/addCategoryTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addCategoryTechnician(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putCategoryTechnician = createAsyncThunk(
  "categoryTechnicians/putCategoryTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putCategoryTechnician(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteCategoryTechnician = createAsyncThunk(
  "categoryTechnicians/deleteCategoryTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.deleteCategoryTechnician(
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

const categoryTechniciansSlice = createSlice({
  name: "categoryTechnicians",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryTechnicians.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategoryTechnicians.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            .result as ServiceCatalogRequesterTechnicianModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchCategoryTechnicians.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(addCategoryTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        addCategoryTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        addCategoryTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(putCategoryTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        putCategoryTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        putCategoryTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(deleteCategoryTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        deleteCategoryTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteCategoryTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default categoryTechniciansSlice.reducer;
