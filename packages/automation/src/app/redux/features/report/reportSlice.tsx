import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit';
import { ReportModel, OthersReportsResponseModel, OtherReportModel } from '../../../models/ReportModel';
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { ServiceOperationConsume } from '@4eplatform/shared/apis/service_operation';
import { ResponseModel } from '../../../models/response-model';
import { DynamicWorkflowAggConsume } from '@4eplatform/shared/apis/dynamic_workflow_agg';
import { IncomingRequests } from '../../../models/incoming-requests';

interface stateType{
  data: OtherReportModel[];
  incomingRequests: IncomingRequests[];
  incomingRequest:IncomingRequests;
  currentReport: ReportModel;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  requestTimeline: any;
} 

const initialState : stateType = {
    status: 'idle',
    incomingRequests: [],
    error:null,
    data: [],
    currentReport: new ReportModel(),
    incomingRequest: {
      id: "",
      name: "",
      date: new Date(),
      requestStatus: 0,
      createdByFirstName: "",
      createdBySecondName: "",
      createdByThirdName: "",
      createdByFourthName: "",
      orgNameAr: "",
      orgNameEn: "",
      requestCategoryName: "",
      requestNumber: "",
      createBy: "",
      email: "",
    },
    requestTimeline: null,
};
  
export const getAllReports = createAsyncThunk(
    'report/getAllReports',
    async (_, thunkApi) => {
      try {
        const response = await ServiceOperationConsume.getAllReports();
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err.message);
      }
    }
);

export const addReport = createAsyncThunk(
  'report/addReport',
    async (data:FormData, thunkApi) => {
    try {
      const response = await TicketingSystemAggConsume.addReport(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addService = createAsyncThunk(
  'report/addService',
  async (data:FormData, thunkApi) => {
    try {
      const response = await TicketingSystemAggConsume.addService(data);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const getIncomingRequestsById = createAsyncThunk<ResponseModel, any>(
  "report/getIncomingRequestsById",
  async (params, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getRequestInstancesByActionTakerById(params);
      return response;
    } catch (error) {

      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchRequestTimeline = createAsyncThunk<ResponseModel, any>(
  "report/fetchRequestTimeline",
  async (params, thunkApi) => {
    try {
      const response = await DynamicWorkflowAggConsume.getRequestTimeline(params);
      return response;
    } catch (error) {

      return thunkApi.rejectWithValue(error);
    }
  }
);

  
const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setCurrentReport: (state, action) => {
      state.currentReport = action.payload;
    },
  },
    extraReducers: (builder) => {
        builder
            .addCase(getAllReports.pending, (state) => {
              state.status = "loading";
            })
            .addCase(getAllReports.fulfilled, (state, action) => {
              state.status = "succeeded";
              state.data=action.payload.result as OtherReportModel[]
            })
            .addCase(getAllReports.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message ?? "An error occurred";
            })
            .addCase(addReport.pending, (state) => {
              state.status = "loading";
            })
            .addCase(addReport.fulfilled, (state, action) => {
              state.status = "succeeded";
            })
            .addCase(addReport.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message ?? "An error occurred";
            })
            .addCase(addService.pending, (state) => {
              state.status = "loading";
            })
            .addCase(addService.fulfilled, (state, action) => {
              state.status = "succeeded";
            })
            .addCase(addService.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message ?? "An error occurred";
            })
            .addCase(getIncomingRequestsById.pending, (state) => {
              state.status = "loading";
            })
            .addCase(
              getIncomingRequestsById.fulfilled,
              (state, action) => {
                state.status = "succeeded";
                state.incomingRequest = action.payload.result as IncomingRequests;
              }
            )
            .addCase(getIncomingRequestsById.rejected, (state) => {
              state.status= "failed";
            })
            .addCase(fetchRequestTimeline.pending, (state) => {
              state.status = "loading";
            })
            .addCase(fetchRequestTimeline.fulfilled, (state, action) => {
              state.status = "succeeded";
              state.requestTimeline = action.payload.result as ResponseModel;
             
            })
            .addCase(fetchRequestTimeline.rejected, (state) => {
              state.status = "failed";
            });
      },
});

export const { setCurrentReport } = reportSlice.actions;
export default reportSlice.reducer;
