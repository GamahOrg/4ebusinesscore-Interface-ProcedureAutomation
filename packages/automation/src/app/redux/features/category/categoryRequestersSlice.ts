import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { ServiceCatalogRequesterTechnicianModel } from "../../../models/serviceMangment/serviceCatalog/ServiceCatalogRequesterModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchCategoryRequesters = createAsyncThunk<
  ResponseModel,
  any
>(
  "categoryRequesters",
  async (data: any, thunkApi) => {
    const {id, params} = data

    try {
      const response = await TicketingSystemAggConsume.getCategoryRequesters({
        id,
        params: {
          pageSize: params?.pageSize,
          pageNumber: params?.pageNumber,
        }
      });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const addCategoryRequester = createAsyncThunk(
  "categoryRequesters/addcategoryRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addCategoryRequester(data);
      return response;
    } catch (err: any) {
      //console.log("err message from add classification", err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putCategoryRequester = createAsyncThunk(
  "categoryRequesters/putCategoryRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putCategoryRequester(data);
      return response;
    } catch (err: any) {
      //console.log("err message from put classification", err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteCategoryRequester = createAsyncThunk(
  "categoryRequesters/deletecategoryRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.deleteCategoryRequester(
        data
      );
      return response;
    } catch (err: any) {
      //console.log("err message from delete classification", err.message);
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

const categoryRequestersSlice = createSlice({
  name: "categoryRequesters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryRequesters.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategoryRequesters.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            .result as ServiceCatalogRequesterTechnicianModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchCategoryRequesters.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(addCategoryRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        addCategoryRequester.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        addCategoryRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(putCategoryRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        putCategoryRequester.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        putCategoryRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(deleteCategoryRequester.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        deleteCategoryRequester.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteCategoryRequester.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default categoryRequestersSlice.reducer;
