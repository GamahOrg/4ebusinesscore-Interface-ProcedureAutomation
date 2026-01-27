import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { MainClassificationTreeModel } from "../../../models/MainClassificationTreeModel";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';
import { MainClassificationtTitleDetailesModel } from "../../../models/MainClassificationtTitleDetailesModel";

export const fetchMainClassificationTree = createAsyncThunk<
  ResponseModel,
  number | string | Number
>(
  "mainClassificationTree",
  async (data: number | string | Number, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.getTreeOfMainClassification(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const fetchMainClassificationtTitleById = createAsyncThunk<ResponseModel, any>(
  "mainClassificationTree/fetchMainClassificationtTitleById",
  async (data: any, thunkApi) => {
    try {
      const response = await TicketingSystemConsume.getMainClassificationtTitleDetailesByMainClassificationId(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface state {
  data: MainClassificationTreeModel;
  titlesData: [MainClassificationtTitleDetailesModel];
  status: string;
  message: string;
}
let initialState: state = {
  data: new MainClassificationTreeModel(),
  titlesData: [new MainClassificationtTitleDetailesModel()],
  status: "idle",
  message: "",
};

const mainClassificationTreeSlice = createSlice({
  name: "mainClassificationTree",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainClassificationTree.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMainClassificationTree.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload
            ?.result  as MainClassificationTreeModel;
        }
      )
      .addCase(
        fetchMainClassificationTree.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      )
      .addCase(fetchMainClassificationtTitleById.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMainClassificationtTitleById.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.titlesData = action.payload?.result  as any;
        }
      )
      .addCase(
        fetchMainClassificationtTitleById.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default mainClassificationTreeSlice.reducer;
