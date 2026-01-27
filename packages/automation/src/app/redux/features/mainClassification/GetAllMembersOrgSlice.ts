import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";

export const fetchOrgMembers = createAsyncThunk<
  ResponseModel,
  { id: string; myparams?: any }
>("orgMembers", async ({ id, myparams }, thunkApi) => {
  try {
    const response = await ControlPanelAggConsume.getAllOrgMembers({
      id,
      params: {
        pageSize: myparams?.pageSize,
        pageNumber: myparams?.pageNumber,
        date: myparams?.date,
      },
    });
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err);
  }
});

export const getLoggedInUser = createAsyncThunk<
  ResponseModel,
any
>("orgMembers/getLoggedInUser", async (params, thunkApi) => {
  try {
    const response = await ControlPanelAggConsume.getAllLoggedInUser(params)
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err);
  }
});
interface state {
  data: any;
  status: string;
  message: string;
  loggedMembers:any;
}
let initialState: state = {
  data: [],
  status: "idle",
  message: "",
  loggedMembers:""
};

const orgMembersSlice = createSlice({
  name: "orgMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgMembers.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgMembers.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload?.result as unknown as any;
        }
      )
      .addCase(
        fetchOrgMembers.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      )
      .addCase(getLoggedInUser.pending, (state: state) => {
        state.status = "loading";
      })
      .addCase(
        getLoggedInUser.fulfilled,
        (state: state, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.loggedMembers = action.payload?.result as unknown as any;
        }
      )
      .addCase(
        getLoggedInUser.rejected,
        (state: state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default orgMembersSlice.reducer;
