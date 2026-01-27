import { createSlice, createAsyncThunk ,PayloadAction } from "@reduxjs/toolkit";
import { ItemRequesterModel } from "../../../models/ItemRequesterModel";
import { ResponseModel } from "../../../models/response-model";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

interface stateType {
    data: ItemRequesterModel[];
    status: string;
    totalPages: number;
    totalItems: number;
    message: string;
}
const initialState: stateType = {
    data: [],
    status: "idle",
    totalPages: 1,
    totalItems: 1,
    message: "",
  };

export const addItemRequester= createAsyncThunk(
  "itemRequesters/addItemRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.addItemRequester(data);
      return response;
    } catch (err: any) {
      //console.log("err message from add itemRequester", err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const putItemRequester= createAsyncThunk(
  "itemRequesters/putItemRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.putItemRequester(data);
      return response;
    } catch (err: any) {
      //console.log("err message from put itemRequester", err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const deleteItemRequester= createAsyncThunk(
  "itemRequesters/deleteItemRequester",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.deleteItemRequester(data);
      return response;
    } catch (err: any) {
      //console.log("err message from delete itemRequester", err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const fetchItemRequesters = createAsyncThunk<
  ResponseModel,
  any
>(
  "itemRequesters/fetchItemRequesters",
  async (data: any, thunkApi) => {
    const {id, params} = data
    
    try {
      const response = await TicketingSystemAggConsume.getItemRequesters({
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
const itemRequestersSlice = createSlice({
  name: "itemRequesters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchItemRequesters.pending, (state: stateType) => {
      state.status = "loading";
    })
    .addCase(
      fetchItemRequesters.fulfilled,
      (state: stateType, action: PayloadAction<ResponseModel>) => {
        state.status = "succeeded";
        state.data = action.payload
          .result as ItemRequesterModel[];
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      }
    )
    .addCase(
      fetchItemRequesters.rejected,
      (state: stateType, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload;
      }
    )
    .addCase(addItemRequester.pending, (state: stateType) => {
      state.status = "loading";
    })
    .addCase(
      addItemRequester.fulfilled,
      (state: stateType, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.message = action.payload;
      }
    )
    .addCase(
      addItemRequester.rejected,
      (state: stateType, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload;
      }
    )
    .addCase(putItemRequester.pending, (state: stateType) => {
      state.status = "loading";
    })
    .addCase(
      putItemRequester.fulfilled,
      (state: stateType, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.message = action.payload;
      }
    )
    .addCase(
      putItemRequester.rejected,
      (state: stateType, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload;
      }
    )
    .addCase(deleteItemRequester.pending, (state: stateType) => {
      state.status = "loading";
    })
    .addCase(
      deleteItemRequester.fulfilled,
      (state: stateType, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.message = action.payload;
      }
    )
    .addCase(
      deleteItemRequester.rejected,
      (state: stateType, action: PayloadAction<any>) => {
        state.status = "failed";
        state.message = action.payload;
      }
    );
     
  },
});

export default itemRequestersSlice.reducer;
