import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MainClassification,
  MainClassificationResponse,
} from "../../../models/MainClassificationModel";
import { TicketingSystemConsume } from '@4eplatform/shared/apis/ticketing_system';
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";

interface stateType {
  data: MainClassification[];
  mainclassficationloggedinData: MainClassification[];
  status: "idle" | "loading" | "succeeded" | "failed";
  totalItems: ""
  totalPages: ""
  error: string | null;
}

const initialState: stateType = {
  status: "idle",
  error: null,
  data: [],
  mainclassficationloggedinData: [],
  totalItems: "",
  totalPages: "",
};

export const mainClassificationLoginUser = createAsyncThunk(
  "mainClassificationLoginUser/getmainClassificationLoginUser",
  async (data: any) => {
    const response =
       await TicketingSystemConsume.getfMainClassificationLoginUser({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
        Search: data?.search,
      });
    return response;
  }
);

export const getMainclassficationloggedinUserAdmin = createAsyncThunk(
  "mainClassificationLoginUser/getMainclassficationloggedinUserAdmin",
  async (data: any) => {
    const response =
       await TicketingSystemAggConsume.getMainclassficationloggedinUserAdmin({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
      });
    return response;
  }
);

export const mainClassificationUserloginTechnacian = createAsyncThunk(
  "mainClassificationLoginUser/getAllMainClassificationUserloginTechnacian",
  async (data: any) => {
    const response =
       await TicketingSystemConsume.getAllMainClassificationUserloginTechnacian({
        pageSize: data?.pageSize,
        pageNumber: data?.pageNumber,
        classificationId: data?.ClassificationId,
        ...(data?.subSystemId && { subSystemId: data?.subSystemId }),

      });
    return response;
  }
);

const mainClassificationLoginUserSlicee = createSlice({
  name: "mainClassification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(mainClassificationLoginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(mainClassificationLoginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action?.payload?.result as unknown as MainClassification[];
        state.totalItems = action?.payload?.totalItems as any;
        state.totalPages = action?.payload?.totalPages as any;
      })
      .addCase(mainClassificationLoginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(mainClassificationUserloginTechnacian.pending, (state) => {
        state.status = "loading";
      })
      .addCase(mainClassificationUserloginTechnacian.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action?.payload?.result as unknown as MainClassification[];
      })
      .addCase(mainClassificationUserloginTechnacian.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(getMainclassficationloggedinUserAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMainclassficationloggedinUserAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mainclassficationloggedinData = action?.payload?.result as unknown as MainClassification[];
      })
      .addCase(getMainclassficationloggedinUserAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
  },
});

export default mainClassificationLoginUserSlicee.reducer;
