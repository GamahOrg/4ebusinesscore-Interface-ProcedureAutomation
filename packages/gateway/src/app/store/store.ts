import PlatformSlice from "../features/platform-settings/platformSettings";
import authSlice from "../features/user/auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userLoginSlice from "../features/user/user-login-slice";
import SubsystemSettingsClassification from "../features/header/subsytemSettingsMainClassification";
import subsytemSettingsMainClassificationAggSlice from "../features/header/subsytemSettingsMainClassificationSlice";
import notifiactionsSlice from "@4eplatform/connect/src/app/features/notifiactionsSlice";
import { storeRegistry } from "@4eplatform/shared/store/storeRegistry";
import requestsSlice from "../features/requests-slice";
import userViewSlice from "../features/user-profile/user-view-slice";

const store = storeRegistry.createStore({
  login: authSlice,
  Platform: PlatformSlice,
  userLogin: userLoginSlice,
  SubSystemClassificationByRowCount: SubsystemSettingsClassification,
  subsytemSettingsMainClassificationAggSlice:
    subsytemSettingsMainClassificationAggSlice,
  notifications: notifiactionsSlice,
  requests: requestsSlice,
  userView: userViewSlice,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
// export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
