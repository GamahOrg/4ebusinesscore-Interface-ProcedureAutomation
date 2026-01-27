import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WorkspaceConsume } from "@4eplatform/shared/apis/workspace";
import { ResponseModel } from "../../models/response-model";

interface initialStateType {
  items: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  message: string | null;
  error: string | null;
}
const initialState: initialStateType = {
  items: [],
  status: "idle",
  message: null,
  error: null,
};

export const addSSOSecuritySetting = createAsyncThunk(
  "ssoSecuritySetting/postSSOSecuritySetting",
  async (data: { params: any;}, thunkApi) => {
    try {
      const { params } = data;
      const response = await WorkspaceConsume.PostSSOSecuritySetting({ params });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const editSSOSecuritySetting = createAsyncThunk(
  "ssoSecuritySetting/putSSOSecuritySetting",
  async (data: { params: any;}, thunkApi) => {
    try {
      const { params } = data;
      const response = await WorkspaceConsume.PutSSOSecuritySetting({ params });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteSSOSecuritySetting = createAsyncThunk<ResponseModel, any>(
  "ssoSecuritySetting/deleteSSOSecuritySetting",
  async (id :any, thunkApi) => {
    try {
      const response = await WorkspaceConsume.DeleteSSOSecuritySetting(`sSoSecurtiySettingId=${id}`);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getAllSSOSecuritySetting = createAsyncThunk<ResponseModel, any>(
  "ssoSecuritySetting/getAllSubSystemMainLookUP",
  async (_, thunkApi) => {
    try {
      const response = await WorkspaceConsume.GetAllSSOSecuritySetting();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const ssoSecuritySettingSlice = createSlice({
  name: "ssoSecuritySetting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSSOSecuritySetting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSSOSecuritySetting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as any;
      })
      .addCase(getAllSSOSecuritySetting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addSSOSecuritySetting.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        addSSOSecuritySetting.fulfilled,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        addSSOSecuritySetting.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      )
      .addCase(editSSOSecuritySetting.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        editSSOSecuritySetting.fulfilled,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        editSSOSecuritySetting.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      )
      .addCase(deleteSSOSecuritySetting.pending, (state: initialStateType) => {
        state.status = "loading";
      })
      .addCase(
        deleteSSOSecuritySetting.fulfilled,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.message = action.payload?.message;
        }
      )
      .addCase(
        deleteSSOSecuritySetting.rejected,
        (state: initialStateType, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default ssoSecuritySettingSlice.reducer;
