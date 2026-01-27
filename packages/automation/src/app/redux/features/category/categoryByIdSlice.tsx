import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import {  Category } from '../../../models/CategoryModel';
import { ResponseModel } from '../../../models/response-model';
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

interface CategoryModel{
  data: Category;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
} 

const initialState : CategoryModel = {
    status: 'idle',
    error:null,
    // data: new Category("","",1, PriorityLevel.Low,"","",null,1,"",""),
    data: new Category()
};

export const getCategoryById = createAsyncThunk<ResponseModel,string>
("CategoryById", async (data:string, thunkApi) => {
  try {
    const response = await TicketingSystemConsume.getCategoryById(data);
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err);
  }
});

const categoryByIdSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCategoryById.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getCategoryById.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload?.result?.result as Category;
        })
        .addCase(getCategoryById.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? "An error occurred";
        })
    },
});

export default categoryByIdSlice.reducer;