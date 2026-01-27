import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import {  Category, CategoryResponse } from '../../../models/CategoryModel';
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';
import { ResponseModel } from '../../../models/response-model';


interface CategoryModel{
  data: CategoryResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
} 

const initialState : CategoryModel = {
    data:new CategoryResponse(),
    status: 'idle',
    error:null,
};
  
  export const addCategory = createAsyncThunk(
    "Category/addCategory",
    async (data: any, thunkApi) => {
      try {
        const response = await TicketingSystemConsume.postCategory(data);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );
  export const putCategory = createAsyncThunk(
    "Category/putCategory",
    async (data: any, thunkApi) => {
      try {
        const response = await TicketingSystemConsume.putCategory(data);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );
  export const deleteCategory = createAsyncThunk(
    "Category/deleteCategory",
    async (data: any, thunkApi) => {
      try {
        const response = await TicketingSystemConsume.deleteCategory(data);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );
  export const getCategory = createAsyncThunk<ResponseModel,any>(
    "Category/getCategory",
    async (data, thunkApi) => {
      try {
        const response = await TicketingSystemConsume.getCategory(data);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(getCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        let { result } = action.payload;
        state.data = { ...action.payload , categories: result  } as any
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(putCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(putCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message ?? "An error occurred";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default categorySlice.reducer;
