import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { exceptionUsersModel } from "../../../models/RequestTemplate/exceptionUsersModel";
import { DynamicWorkflowConsume } from "@4eplatform/shared/apis/dynamic_workflow";


interface state {
    excludedUsers: exceptionUsersModel[];
    notExcludedUsers: exceptionUsersModel[];
    message: string;
    status: RequestStatus;
    pagination: Pagination;
    error: string | null;
}

let initialState: state = {
    excludedUsers: [],
    notExcludedUsers: [],
    message: "",
    status: RequestStatus.idle,
    pagination: new Pagination(),
    error: "",
};

export const fetchExcludedUsers = createAsyncThunk<ResponseModel, any>(
    "excludedUsers/fetchExcludedUsers",
    async (params: any, thunkApi) => {
        try {
            const response = await DynamicWorkflowAggConsume.getDefaultExceptionActionTacker(
                {
                    pageSize: params?.pageSize || "1000",
                    pageNumber: params?.pageNumber || "1",
                    userName:params?.userName
                });
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const fetchNotExcludedUsers = createAsyncThunk<ResponseModel, any>(
    "excludedUsers/fetchNotExcludedUsers",
    async (params: any, thunkApi) => {
        try {
            const response = await DynamicWorkflowAggConsume.getNotExceptionActionTacker(
                {
                    pageSize: params?.pageSize || "1000",
                    pageNumber: params?.pageNumber || "1",
                });
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const postExcludedUsers = createAsyncThunk<ResponseModel, any>(
    "excludedUsers/postExcludedUsers",
    async (data: any, thunkApi) => {
        try {
            const response = await DynamicWorkflowConsume.postExceptionActionTacker(data);
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const deleteExcludedUsers = createAsyncThunk<ResponseModel, any>(
    'excludedUsers/deleteExcludedUsers',
    async (data: any, thunkApi) => {
        try {
            const response = await DynamicWorkflowConsume.deleteExceptionActionTacker(data);
            return response;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

const excludedUsersSlice = createSlice({
    name: "excludedUsers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExcludedUsers.fulfilled,
                (state: state, action: PayloadAction<ResponseModel>) => {
                    state.status = RequestStatus.succeeded;
                    state.excludedUsers = action.payload?.result as unknown as exceptionUsersModel[];
                    let {message,result,statusEnum,...pagination}=action?.payload
                    state.pagination=pagination
                }
            )
            .addCase(fetchExcludedUsers.pending, handlePending)
            .addCase(fetchExcludedUsers.rejected, handleRejected)

            .addCase(fetchNotExcludedUsers.fulfilled,
                (state: state, action: PayloadAction<ResponseModel>) => {
                    state.status = RequestStatus.succeeded;
                    state.notExcludedUsers = action.payload?.result as unknown as exceptionUsersModel[];
                }
            )
            .addCase(fetchNotExcludedUsers.pending, handlePending)
            .addCase(fetchNotExcludedUsers.rejected, handleRejected)

            .addCase(postExcludedUsers.fulfilled, handleFulfilled)
            .addCase(postExcludedUsers.pending, handlePending)
            .addCase(postExcludedUsers.rejected, handleRejected)

            .addCase(deleteExcludedUsers.fulfilled, handleFulfilled)
            .addCase(deleteExcludedUsers.pending, handlePending)
            .addCase(deleteExcludedUsers.rejected, handleRejected)
    },
});

const handlePending = (state: any) => {
    state.status = RequestStatus.loading;
};
const handleFulfilled = (state: any) => {
    state.status = RequestStatus.succeeded;
};
const handleRejected = (state: any, action: any) => {
    state.status = RequestStatus.failed;
    state.error = action.error.message ?? "An error occurred";
};


export default excludedUsersSlice.reducer;
