import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { ServiceCatalog } from "../../../models/serviceMangment/serviceCatalog/serviceCatalogModel";
import { PriorityLevel } from "../../../enums/priority-level-enum";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';

export const fetchServiceCatalogById = createAsyncThunk<
  ResponseModel,
  number | string | Number
>("serviceCatalogById", async (data: number | string | Number, thunkApi) => {
  try {
    const response = await TicketingSystemConsume.getServiceCatalogById(data);
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err);
  }
});
interface state {
  data: ServiceCatalog;
  status: string;
  message: string;
}
let initialState: state = {
  data: new ServiceCatalog("", "", PriorityLevel.Low, "", "", "", "", 0),
  status: "idle",
  message: "",
};

const serviceCatalogByIdSlice = createSlice({
  name: "serviceCatalogById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceCatalogById.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchServiceCatalogById.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload?.result as unknown as ServiceCatalog;
        }
      )
      .addCase(
        fetchServiceCatalogById.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default serviceCatalogByIdSlice.reducer;
