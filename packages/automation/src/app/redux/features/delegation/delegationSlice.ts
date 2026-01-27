import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserManagmentConsume } from "@4eplatform/shared/apis/user_management";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { delegationModel } from './../../../../../../user-profile/src/user-profile/models/delegation/delegation-model';

export const getAllDelegationFromUserByUserId = createAsyncThunk<
  ResponseModel,
  any
>(
  "delegations/getAllDelegationFromUserByUserId",
  async ({ id, myParams }, thunkApi) => {
    try {
      const response =
        await UserManagmentConsume.getAllDelegationFromUserByUserId({
          id,
          params: {
            pageSize: myParams?.pageSize,
            pageNumber: myParams?.pageNumber,
          },
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const fetchDelegations = createAsyncThunk<ResponseModel, any>(
  "delegations/fetchDelegations",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getAllDelegationByUserId(
        {
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const fetchAllDelegationFromUser = createAsyncThunk<ResponseModel, any>(
  "delegations/fetchAllDelegationFromUser",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getAllDelegationFromUser(
        {
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const fetchAllDelegationToUser = createAsyncThunk<ResponseModel, any>(
  "delegations/fetchAllDelegationToUser",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.getAllDelegationToUser(
        {
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);
export const addNewDelegation = createAsyncThunk<ResponseModel, any>(
  "delegations/addNewDelegation",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.addNewUserDelegation(data);
       
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const deleteDelegation = createAsyncThunk<ResponseModel, any>(
  "delegations/deleteDelegation",
  async (id:string, thunkApi) => {
    try {
      const response = await UserManagmentConsume.deleteDelegation(id);
       
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const putUserDelegationFromApproved = createAsyncThunk<ResponseModel, any>(
  "delegations/putUserDelegationFromApproved",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.updateUserDelegationFromApproved(data);
       
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const putUserDelegationToApproved = createAsyncThunk<ResponseModel, any>(
  "delegations/putUserDelegationToApproved",
  async (data: any, thunkApi) => {
    try {
      const response = await UserManagmentConsume.updateUserDelegationToApproved(data);
       
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
interface delegations {
  data: delegationModel[];
  fromDelegations: any;
  outgoingDelegations:delegationModel[];
  incomingDelegations:delegationModel[];
  status: string;
  totalPages: number;
  message: string;
  statusForIncoming: string;
  totalPagesForIncoming: number;
  totalItemsForIncoming: number;
  messageForIncoming: string;
  pageSizeForIncoming:number;
  pageIndexForIncoming:number;
  statusForOutgoing: string;
  totalPagesForOutgoing: number;
  totalItemsForOutgoing: number;
  messageForOutgoing: string;
  pageSizeForOutgoing:number;
  pageIndexForOutgoing:number;
}

let initialState: delegations = {
  data: [],
  fromDelegations:[],
  outgoingDelegations:[],
  incomingDelegations:[],
  status: "idle",
  totalPages: 0,
  message: "",
  statusForIncoming: "idle",
  totalPagesForIncoming: 0,
  totalItemsForIncoming:0,
  messageForIncoming: "",
  pageSizeForIncoming:0,
  pageIndexForIncoming:0,
  statusForOutgoing: "idle",
  totalPagesForOutgoing: 0,
  totalItemsForOutgoing:0,
  messageForOutgoing: "",
  pageSizeForOutgoing:0,
  pageIndexForOutgoing:0,
};

const delegationsSlice = createSlice({
  name: "delegations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDelegations.pending, (state: delegations) => {
        state.status = "loading";
      })
      .addCase(
        fetchDelegations.fulfilled,
        (state: delegations, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.data = action.payload.result as unknown as delegationModel[];
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(
        fetchDelegations.rejected,
        (state: delegations, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload;
        }
      ).addCase(fetchAllDelegationToUser.pending, (state: delegations) => {
        state.statusForIncoming = "loading";
      })
      .addCase(
        fetchAllDelegationToUser.fulfilled,
        (state: delegations, action: PayloadAction<ResponseModel>) => {
          state.statusForIncoming = "succeeded";
          state.incomingDelegations = action.payload.result as unknown as delegationModel[];
          state.totalPagesForIncoming = action.payload.totalPages;
          state.totalItemsForIncoming = action.payload.totalItems;
          state.pageIndexForIncoming = action.payload.pageIndex;
          state.pageSizeForIncoming = action.payload.pageSize;
        }
      )
      .addCase(
        fetchAllDelegationToUser.rejected,
        (state: delegations, action: PayloadAction<any>) => {
          state.statusForIncoming = "failed";
          state.messageForIncoming = action.payload;
        }
      )
      .addCase(fetchAllDelegationFromUser.pending, (state: delegations) => {
        state.statusForOutgoing = "loading";
      })
      .addCase(
        fetchAllDelegationFromUser.fulfilled,
        (state: delegations, action: PayloadAction<ResponseModel>) => {
          state.statusForOutgoing = "succeeded";
          state.outgoingDelegations = action.payload.result as unknown as delegationModel[];
          state.totalPagesForOutgoing = action.payload.totalPages;
          state.totalItemsForOutgoing = action.payload.totalItems;
          state.pageIndexForOutgoing = action.payload.pageIndex;
          state.pageSizeForOutgoing = action.payload.pageSize;
        }
      )
      .addCase(
        fetchAllDelegationFromUser.rejected,
        (state: delegations, action: PayloadAction<any>) => {
          state.statusForOutgoing = "failed";
          state.messageForOutgoing = action.payload;
        }
      )
      .addCase(
        getAllDelegationFromUserByUserId.pending,
        (state: delegations, action: any) => {
          state.status = "loading";
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        getAllDelegationFromUserByUserId.fulfilled,
        (state: delegations, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.fromDelegations = action.payload.result as any;
          state.message = action?.payload?.message;
        }
      )
      .addCase(
        getAllDelegationFromUserByUserId.rejected,
        (state: delegations, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action?.payload?.message;
        }
      );
  },
});

export default delegationsSlice.reducer;
