import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { ManagementModel } from "../../../models/ManagementModel"; 
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { TicketingSystemAggConsume } from "@4eplatform/shared/apis/ticketing_system_agg";
import { OrgUsersModel } from "../../../models/users-model";


export const fetchEmloyeeManagement= createAsyncThunk<ResponseModel,any>(
    "EmployeeManagement/fetchEmloyeeManagement",
    async (params:any) => {
      const response = await ControlPanelAggConsume.getEmployee(
        {
            search: params?.search,
      });
      return response;
    }
  );

  export const fetchTechniciansServiceCatalog = createAsyncThunk<ResponseModel, any>(
    "EmployeeManagement/fetchTechniciansServiceCatalog",
    async (id: string, thunkApi) => {
      try {
        const response = await TicketingSystemAggConsume?.getTechniciansServiceCatalog(id);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err?.message);
      }
    }
  );

  export const fetchTechniciansCategory = createAsyncThunk<ResponseModel, any>(
    "EmployeeManagement/fetchTechniciansCategory",
    async (id: string, thunkApi) => {
      try {
        const response = await TicketingSystemAggConsume?.getTechniciansCategory(id);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err?.message);
      }
    }
  );

  export const fetchTechniciansItem = createAsyncThunk<ResponseModel, any>(
    "EmployeeManagement/fetchTechniciansItem",
    async (id: string, thunkApi) => {
      try {
        const response = await TicketingSystemAggConsume?.getTechniciansItem(id);
        return response;
      } catch (err: any) {
        return thunkApi.rejectWithValue(err?.message);
      }
    }
  );


interface EmployeeManagemnt {
  items: ManagementModel[];
  orgUsers:OrgUsersModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;


}

const initialState: EmployeeManagemnt = {
    items:[],
    orgUsers:[],
    status: "idle",
    error: null,
   
};

const EmployeeManagementSlice = createSlice({
  name: "EmployeeManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmloyeeManagement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmloyeeManagement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.result as ManagementModel[];
      })
      .addCase(fetchEmloyeeManagement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchTechniciansServiceCatalog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTechniciansServiceCatalog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orgUsers = action.payload.result as OrgUsersModel[];
      })
      .addCase(fetchTechniciansServiceCatalog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchTechniciansCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTechniciansCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orgUsers = action.payload.result as OrgUsersModel[];
      })
      .addCase(fetchTechniciansCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchTechniciansItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTechniciansItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orgUsers = action.payload.result as OrgUsersModel[];
      })
      .addCase(fetchTechniciansItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default EmployeeManagementSlice.reducer;
