import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceCatalogResponse } from "../../../models/serviceMangment/serviceCatalog/serviceCatalogModel";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';


interface stateType {
  data: ServiceCatalogResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: stateType = {
  status: "idle",
  error: null,
  data: new ServiceCatalogResponse(),
};

export const addServiceCatalog = createAsyncThunk(
  "serviceCatalog/addServiceCatalog",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.postServiceCatalog(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putServiceCatalog = createAsyncThunk(
  "serviceCatalog/putServiceCatalog",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putServiceCatalog(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteServiceCatalog = createAsyncThunk(
  "serviceCatalog/deleteServiceCatalog",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.deleteServiceCatalog(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

  export const getServiceCatalog = createAsyncThunk(
    'serviceCatalog/getServiceCatalog',
    async (_, thunkApi) => {
      try {
        const response = await TicketingSystemConsume.getServiceCatalog(
        {  pageSize: 1000,
          pageNumber: 1,}
   
        );
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
);

const serviceCatalogSlice = createSlice({
  name: "serviceCatalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addServiceCatalog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addServiceCatalog.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addServiceCatalog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(getServiceCatalog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getServiceCatalog.fulfilled, (state, action) => {
        state.status = "succeeded";
        let { result } = action.payload;
        state.data = action.payload as ServiceCatalogResponse;
        state.data = { ...action.payload , data: result  } as ServiceCatalogResponse 
      })
      .addCase(getServiceCatalog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(putServiceCatalog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putServiceCatalog.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(putServiceCatalog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(deleteServiceCatalog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteServiceCatalog.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteServiceCatalog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
  
});

export default serviceCatalogSlice.reducer;
