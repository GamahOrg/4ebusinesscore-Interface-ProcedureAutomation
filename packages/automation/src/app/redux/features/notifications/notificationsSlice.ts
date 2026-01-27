import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../../../models/response-model";
import { RequestNotificationsStatus } from "../../../enums/response-status";
import { NotificationModel } from "../../../models/notifications/notification-model";
import { NotificationsAggConsume } from "@4eplatform/shared/apis/notification_agg";
import { NotificationsConsume } from "@4eplatform/shared/apis/notification";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { sliceAction } from "@4eplatform/shared/assets/slices/sliceAction";
import { casesHandler } from "@4eplatform/shared/assets/slices/casesHandler";

interface NotificationsState {
  notification: NotificationModel;
  notifications: NotificationModel[];
  status: RequestNotificationsStatus;
  error: string | null;
  pagination: Pagination;
}

const initialState: NotificationsState = {
  notification: new NotificationModel(),
  notifications: [],
  status: RequestNotificationsStatus.idle,
  error: "",
  pagination: new Pagination(),
};

export const getAllNotificationSettings = createAsyncThunk<ResponseModel, any>(
  "notifications/getAllNotificationSettings",
  async (params = {}, thunkApi) => {
    try {
      const response = await NotificationsAggConsume.getAllNotificationsSettings(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const putNotificationSettings = sliceAction(
//   "notifications/putNotificationSettings",
//   (data: object) => NotificationsConsume.putNotificationSettingsById(data)
// );

export const putNotificationSettings = sliceAction(
  "notifications/putNotificationSettings",
  (body: object) => NotificationsConsume.putNotificationSettingsById(body)
);

const NotificationsSlice = createSlice({
  name: "notificationSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllNotificationSettings.fulfilled, (state, action) => {
        state.status = RequestNotificationsStatus.succeeded;
        state.notifications = (action as PayloadAction<ResponseModel>).payload
          .result as NotificationModel[];
        state.pagination = (action as PayloadAction<ResponseModel>).payload;
      })
      .addCase(getAllNotificationSettings.pending, handlePending)
      .addCase(getAllNotificationSettings.rejected, handleRejected)

      .addMatcher(
        (action) => action.type.startsWith("putNotificationSettings"),
        (state, action) => {
          switch (action.type) {
            case `${putNotificationSettings.fulfilled}`:
              state.status = RequestNotificationsStatus.succeeded;
              return state;
            default:
              return casesHandler("putNotificationSettings")(state, action);
          }
        }
      );
  },
});

const handlePending = (state: NotificationsState) => {
  state.status = RequestNotificationsStatus.loading;
};
const handleFulfilled = (state: NotificationsState) => {
  state.status = RequestNotificationsStatus.succeeded;
};

const handleRejected = (state: NotificationsState, action: any) => {
  state.status = RequestNotificationsStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export default NotificationsSlice.reducer;
