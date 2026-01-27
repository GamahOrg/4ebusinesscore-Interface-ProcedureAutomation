import { Item } from './../../../models/ItemModel';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { ItemRequesterModel } from "../../../models/ItemRequesterModel";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';



export const fetchItemTechnicians = createAsyncThunk<
  ResponseModel,
  any
>(
  "itemTechnicians/fetchItemTechnicians",
  async (data: number | Number | string, thunkApi) => {
    try {
      const response = await TicketingSystemAggConsume.getItemTechnicians(
        data
      );
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const addItemTechnician = createAsyncThunk(
  "itemTechnicians/addItemTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addItemTechnician(
        data
      );
      return response;
    } catch (err: any) {
      //console.log("err message from add itemTechnician", err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putItemTechnician = createAsyncThunk(
  "itemTechnicians/putItemTechnician",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putItemTechnician(
        data
      );
      return response;
    } catch (err: any) {
      //console.log("err message from put itemTechnician", err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteItemTechnician = createAsyncThunk(
  "itemTechnicians/deleteItemTechnician",
  async (data: any, thunkApi) => {
    try {
      const response =
        await TicketingSystemConsume.deleteItemTechnician(data);
      return response;
    } catch (err: any) {
      //console.log("err message from delete itemTechnician", err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
interface state {
  data: ItemRequesterModel[];
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

const ItemTechniciansSlice = createSlice({
  name: "itemTechnicians",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemTechnicians.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchItemTechnicians.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            .result as ItemRequesterModel[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(
        fetchItemTechnicians.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(addItemTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        addItemTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        addItemTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(putItemTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        putItemTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        putItemTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      )
      .addCase(deleteItemTechnician.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        deleteItemTechnician.fulfilled,
        (state: state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteItemTechnician.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      );
  },
});

export default ItemTechniciansSlice.reducer;
