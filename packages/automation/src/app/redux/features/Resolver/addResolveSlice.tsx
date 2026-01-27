import { AsyncThunkAction, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostResolveReport } from "../../../models/resolveReport";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg"
interface initialStateType{
    status: "idle" | "loading" | "succeeded" | "failed";
    message:string | null;
}
const initialState: initialStateType = {
    status: "idle",
    message: null,
  };
  
 const objToFormData = (data: any) => {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
      if (value)
          //@ts-ignore
          formData.append(key, value);
  }
  return formData;
};
  export const addResolveReport= createAsyncThunk(
    "addResolveReport",
    async (data: PostResolveReport, thunkApi) => {
      try {
        var formData = objToFormData(data);
        const response = await TicketingSystemAggConsume.addResolver(formData);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
  );

  const addResolveSlice = createSlice({
    name: "addResolveReport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addResolveReport.pending, (state: initialStateType) => {
          state.status = "loading";
        })
        .addCase(
            addResolveReport.fulfilled,
          (state: initialStateType, action:PayloadAction<any>) => {
            state.status = "succeeded";
            state.message=action.payload?.message
          }
        )
        .addCase(
            addResolveReport.rejected,
          (state: initialStateType, action: PayloadAction<any>) => {
            state.status = "failed";
            state.message = action.payload?.message;
          }
        );
    },
  });

  export default addResolveSlice.reducer;
