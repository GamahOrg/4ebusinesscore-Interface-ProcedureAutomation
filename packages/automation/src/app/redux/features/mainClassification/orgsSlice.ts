import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { OrgsModel } from "../../../models/orgsModel";
import { OrgConsume } from "@4eplatform/shared/apis/org";

export const fetchOrgs= createAsyncThunk<ResponseModel,object|undefined>(
  "userOrgs/fetchOrgs",
  async (params={}, thunkApi) => {
    try {
      const response = await OrgConsume.getAllOrgs(params);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface orgs {
  data: OrgsModel[];
  status: string;
  message: string;
}
let initialState: orgs = {
  data: [],
  status: "idle",
  message: "",
};

const userOrgsSlice = createSlice({
  name: "userOrgs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.pending, (state: orgs) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrgs.fulfilled,
        (state: orgs, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as OrgsModel[];
        }
      )
      .addCase(
        fetchOrgs.rejected,
        (state: orgs, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload.message;
        }
      );
  },
});

export default userOrgsSlice.reducer;
