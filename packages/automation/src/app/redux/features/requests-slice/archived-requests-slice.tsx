import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DynamicWorkflowAggConsume } from "@4eplatform/shared/apis/dynamic_workflow_agg";
import { ResponseModel } from "../../../models/response-model";
import { IncomingRequests } from "../../../models/incoming-requests";

export const fetchArchivedRequestsWithFilter = createAsyncThunk<
  ResponseModel,
  any
>(
  "archivedRequests/fetchArchivedRequestsWithFilter",
  async (data: any, thunkApi) => {
    var bodyFormData = new FormData();
    if (Object.keys(data?.body)?.length > 0) {
      if (data?.body?.orgIds[0] != null) {
        for (let index = 0; index < data?.body?.orgIds?.length; index++) {
          bodyFormData.append("orgIds", data?.body?.orgIds[index]);
        }
      }
      if (data?.body?.requester[0] != null) {
        for (let index = 0; index < data?.body?.requester?.length; index++) {
          bodyFormData.append("requester", data?.body?.requester[index]);
        }
      }
      if (data?.body?.requestInstanceName[0] != null) {
        for (
          let index = 0;
          index < data?.body?.requestInstanceName?.length;
          index++
        ) {
          bodyFormData.append(
            "requestInstanceName",
            data?.body?.requestInstanceName[index]
          );
        }
      }
      if (data?.body?.categoryIds[0] != null) {
        for (let index = 0; index < data?.body?.categoryIds?.length; index++) {
          bodyFormData.append("categoryIds", data?.body?.categoryIds[index]);
        }
      }
      if (data?.body?.requestInstanceNumber[0] != null) {
        for (
          let index = 0;
          index < data?.body?.requestInstanceNumber?.length;
          index++
        ) {
          bodyFormData.append(
            "requestInstanceNumber",
            data?.body?.requestInstanceNumber[index]
          );
        }
      }
      if (data?.body?.statues[0] != null) {
        for (let index = 0; index < data?.body?.statues?.length; index++) {
          bodyFormData.append("statues", data?.body?.statues[index]);
        }
      }
      if (data?.body?.dateTimes[0] != null) {
        for (let index = 0; index < data?.body?.dateTimes?.length; index++) {
          bodyFormData.append(
            "dateTimes",
            data?.body?.dateTimes[index].split("T")[0]
          );
        }
      }
      if (data?.body?.delegatedUsers[0] != null) {
        for (
          let index = 0;
          index < data?.body?.delegatedUsers?.length;
          index++
        ) {
          bodyFormData.append(
            "delegatedUsers",
            data?.body?.delegatedUsers[index]
          );
        }
      }
    }
    try {
      const response =
        await DynamicWorkflowAggConsume.getAllFliterRequestInstancesTharUserTakeAction({
          params: data.params,
          body: bodyFormData,
        });
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message);
    }
  }
);

interface archivedRequests {
  archivedRequests: IncomingRequests[];
  status: string;
  totalPages: number;
  totalItems: number;
  message: string;
}

let initialState: archivedRequests = {
  archivedRequests: [],
  status: "idle",
  totalPages: 0,
  totalItems: 0,
  message: "",
};

const archivedRequestsSlice = createSlice({
  name: "archivedRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchArchivedRequestsWithFilter.pending,
        (state: archivedRequests) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchArchivedRequestsWithFilter.fulfilled,
        (state: archivedRequests, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.archivedRequests = action.payload
            .result as unknown as IncomingRequests[];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
        }
      );
  },
});

export default archivedRequestsSlice.reducer;
