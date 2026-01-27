// configureStore.js

import categorySlice from "../features/category/categorySlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SlaReducer from "../features/SLA/slaSlice";
import slaDetailsSlice from "../features/SLA/slaDetailsSlice";
import slaDeleteSlice from "../features/SLA/slaDeleteSlice";
import escalationDetailsSlice from "../features/SLA/escalationDetailsSlice";
import escalationLevelsSlice from "../features/SLA/escalationLevelSlice";
import escalationLevelDeleteSlice from "../features/SLA/escalationDeleteSlice";
import addEscalationLevelSlice from "../features/SLA/addEscalationLevelSlice";
import employeeManagementSlice from "../features/SLA/employeManagementSlice";
import getAllResolveSlice from "../features/Resolver/getAllResolveSlice";
import addResolveSlice from "../features/Resolver/addResolveSlice";
import resolverDetailsSlice from "../features/Resolver/getResolverDetailsSlice";
import deleteResolverSlice from "../features/Resolver/deleteResolverSlice";
import serviceCatalogIdSlice from "../features/Resolver/getServicesCatalog";
import serviceCatalogSlice from "../features/serviceCatalog/serviceCatalogSlice";

import editDataSlice from "../features/Resolver/editResolveSlice";
import mainClassificationSliceService from "../features/Resolver/getMainClassificationSlice";
import mainClassificationSlice from "../features/mainClassification/mainClassificationSlice";

// ... import other reducers
import addSlaSlice from "../features/SLA/addSlaSlice";
import editSlaSlice from "../features/SLA/editSlaSlice";
import userOrgsSlice from "../features/mainClassification/orgsSlice";
import mainClassificationByIdSlice from "../features/mainClassification/mainClassificationByIdSlice";
import serviceCatalogByIdSlice from "../features/serviceCatalog/serviceCatalogByIdSlice";
import mainClassificationTreeSlice from "../features/mainClassification/mainClassificationTreeSlice";
import categoryByIdSlice from "../features/category/categoryByIdSlice";
import itemSlice from "../features/item/itemSlice";
import itemByIdSlice from "../features/item/itemByIdSlice";
import serviceCatalogTechniciansSlice from "../features/serviceCatalog/serviceCatalogTechniciansSlice";
import serviceCatalogRequestersSlice from "../features/serviceCatalog/serviceCatalogRequestersSlice";
import mainClassificationRequestersSlice from "../features/mainClassification/mainClassificationRequestersSlice";
import mainClassificationTechniciansSlice from "../features/mainClassification/mainClassificationTechniciansSlice";
import reportSlice from "../features/report/reportSlice";
import categoryRequestersSlice from "../features/category/categoryRequestersSlice";
import categoryTechniciansSlice from "../features/category/categoryTechniciansSlice";
// ... import other reducers
import itemRequestersSlice from "../features/item/itemRequestersSlice";
import itemTechniciansSlice from "../features/item/itemTechniciansSlice";

import ReportsForTechnicalSupportManagerSlice from "../features/service-operation/report/ReportsTechnicalSupportManagerSlice";
import StatisticsReportEmployeeForTechnicalSupportManagerSlice from "../features/service-operation/StatisticsReportEmployee/StatisticsReportEmployeeForTechnicalSupportManager";

import ReportsForTechnicalSupportEmployeeSlice from "../features/service-operation/report/ReportsForTechnicalSupportEmployeeSlice";
import StatisticsReportAdministrationForAdministrationManager from "../features/service-operation/StatisticsReportEmployee/StatisticsReportAdministrationForAdministrationManager";
import StatisticsReportAdministrationForTechnicalSupportManager from "../features/service-operation/StatisticsReportEmployee/StatisticsReportAdministrationForTechnicalSupportManager";
import StatisticsReportEmployeeForAdministrationManager from "../features/service-operation/StatisticsReportEmployee/StatisticsReportEmployeeForAdministrationManager";
import ReportsForAdministrationManagerSlice from "../features/service-operation/report/ReportsForAdministrationManagerSlice";
import getReportByIdSlice from "../features/service-operation/report/getReportByIdSlice";
import GetAllTechnicalByMainIdSelice from "../features/service-operation/report/GetAllTechnicalByMainIdSelice";
import getAllReportStepSlice from "../features/service-operation/report/GetAllReportStep";
import getAllReportStatusSlice from "../features/service-operation/report/GetAllReportStatus";
import mainClassificationLoginUserSlicee from "../features/mainClassification/mainClassificationLoginUserSlicee";
import fetchGetMangerToRequesterByReportIdSlice from "../features/service-operation/report/GetMangerToRequesterByReportIdSlice";
import GetRequsetdReportbyIdSlice from "../features/service-operation/report/GetRequsetdReportbyIdSlice";
import ReportsForAdministrationEmployeeSlice from "../features/service-operation/report/ReportsForAdministrationEmployeeSlice";
import GetAllmainClassificationSlice from "../features/mainClassification/GetAllmainClassificationSlice";
import GetCountSlice from "../features/service-operation/report/GetCountSlice";
import RatingsReportSlice from "../features/service-operation/report/RatingsReportSlice";
import requestTemplateSlice from "../features/requestTemplate/requestTemplateSlice";
// import orgHierarchySlice from "../features/mainClassification/orgHierarchySlice";
import orgMembersSlice from "../features/mainClassification/GetAllMembersOrgSlice";
import usersSlice from "../features/SLA/usersSlice";
import escalationLevelsBySlaSlice from "../features/SLA/escalationLevelsBySlaSlice";
import classificationsSlice from "../features/mainClassification/classificationsSlice";
import GetMyReportCountSlice from "../features/service-operation/report/GetMyReportCountSlice";
import requestTimelineSlice from "../features/requestTemplate/request-timeline-slice";
import NotificationsSlice from "../features/notifications/notificationsSlice";
import technicalSupportManagerReportsWithFilterSlice from "../features/report/technicalSupportManagerReportsWithFilterSlice";
import technicalSupportEmployeeReportsWithFilterSlice from "../features/report/technicalSupportEmployeeReportsWithFilterSlice";
import myReportsSlice from "../features/report/myReportsSlice";
import administrationEmployeeReportsWithFilterSlice from "../features/report/administrationEmployeeReportsWithFilterSlice";
import administrationManagerReportsWithFilterSlice from "../features/report/administrationManagerReportsWithFilterSlice";
import electronicServices from "../features/mainClassification/electronic-services";
import excludedUsersSlice from "../features/excludedUsers/excludedUsersSlice";
import GetSubsytemSettingsMainClassificationAgg from "../features/mainClassification/subsytemSettingsMainClassificationSlice";
import mainClassificationTitleDetailsSlice from "../features/mainClassification/mainClassificationTitleDetailsSlice"
import ReportNotesSlice from './../features/service-operation/report/ReportNotesSlice';
import outgoingRequestsSlice from "../features/requests-slice/outgoingRequests-slice";
import incomingRequestsSlice from "../features/requests-slice/incomingRequests-slice";
import addRequestTransactionSlice from "../features/requests-slice/addRequestTransactionSlice";
import requesterFormSlice from "../features/requests-slice/requester-form-slice";
import requestCategorySlice from "../features/requests-slice/requestCategory-slice";
import requestsSlice from "../features/requests-slice/requests-slice";
import requestDataSlice from "../features/requests-slice/request-data-slice";
import requestTransactionSlice from "../features/requests-slice/request-transaction-slice";
import archivedRequestsSlice from "../features/requests-slice/archived-requests-slice";
import delegationsSlice from './../features/delegation/delegationSlice';
import requestInstanceSlice from "../features/requests-slice/request-instance-slice";
import applyCourseSlice from './../features/requests-slice/apply-course';
import getAllSubsystemMainLookUpSlice from "../features/getAllSubsytemMainLookUpSlice";
import SubsystemSettingsMainClassification from "../features/getAllSubsytemSettingsMainClassification";
import getAllMyComponentsSlice from "../features/getAllMyComponentsSlice";
import SubsystemSettingsClassification from "../features/subsytemSettingsMainClassification";
import subsytemSettingsMainClassificationById from "../features/subsytemSettingsMainClassificationById";
import subsytemSettingsSlice from "../features/SubsytemSettingsSlice";
import AllTypesWithParentSlice from "../features/getAllTypesWithParent";
import NoteTypeIdSlice from "../features/getLookUpsSlice";
import SubsystemDropdownListSlice from "../features/getAllSubsystemSlice";
import ssoSecuritySettingSlice from "../features/ssoSecuritySettingSlice";
import orgHierarchySlice from "../features/orgHierarchySlice"
import EditClassificationSlice from "../features/editClassificationSlice";
import { storeRegistry } from "@4eplatform/shared/store/storeRegistry";
import getAllHiddenWorkspacesSlice from "../features/workspace/getAllHiddenWorkspacesSlice";
import favouritesListSlice from "../features/workspace/favouritesListSlice";
import postHiddenWorkspacesSlice from "../features/workspace/postHiddenWorkspacesSlice";
import deleteHiddenWorkspacesSlice from "../features/workspace/deleteHiddenWorkspacesSlice";
export const store = storeRegistry.createStore({
    category: categorySlice,
    categoryById: categoryByIdSlice,
    categoryRequesters: categoryRequestersSlice,
    categoryTechnicians: categoryTechniciansSlice,

    sla: SlaReducer,
    slaDetails: slaDetailsSlice,
    sleDeleted: slaDeleteSlice,
    escalationDetails: escalationDetailsSlice,
    getAllResolver: getAllResolveSlice,
    addResolve: addResolveSlice,
    getserviceCatalog: serviceCatalogIdSlice,
    mainClassification: mainClassificationSlice,
    editResolver: editDataSlice,
    resolverDetails: resolverDetailsSlice,
    deleteResolver: deleteResolverSlice,
    mainClassificationService: mainClassificationSliceService,
    escalationLevel: escalationLevelsSlice,
    escalationLevelDelete: escalationLevelDeleteSlice,
    addEscalationLevel: addEscalationLevelSlice,
    employeeManagement: employeeManagementSlice,
    addSla: addSlaSlice,
    editSla: editSlaSlice,
    serviceCatalog: serviceCatalogSlice,
    serviceCatalogById: serviceCatalogByIdSlice,
    mainClassificationById: mainClassificationByIdSlice,
    mainClassificationTree: mainClassificationTreeSlice,
    orgsSlice: userOrgsSlice,
    report: reportSlice,
    item: itemSlice,
    itemById: itemByIdSlice,
    serviceCatalogTechnicians: serviceCatalogTechniciansSlice,
    serviceCatalogRequesters: serviceCatalogRequestersSlice,
    mainClassificationRequesters: mainClassificationRequestersSlice,
    mainClassificationTechnicians: mainClassificationTechniciansSlice,
    itemRequesters: itemRequestersSlice,
    itemTechnician: itemTechniciansSlice,
    ReportsForTechnicalSupportManager: ReportsForTechnicalSupportManagerSlice,
    StatisticsReportEmployeeForTechnicalSupportManager:
      StatisticsReportEmployeeForTechnicalSupportManagerSlice,
    ReportsForAdministrationEmployee: ReportsForAdministrationEmployeeSlice,
    ReportsForAdministrationManager: ReportsForAdministrationManagerSlice,
    ReportsForTechnicalSupportEmployee: ReportsForTechnicalSupportEmployeeSlice,
    StatisticsReportAdministrationForAdministrationManager:
      StatisticsReportAdministrationForAdministrationManager,
    StatisticsReportAdministrationForTechnicalSupportManager:
      StatisticsReportAdministrationForTechnicalSupportManager,
    StatisticsReportEmployeeForAdministrationManager:
      StatisticsReportEmployeeForAdministrationManager,
    GetReportById: getReportByIdSlice,
    GetAllTechnicalByMainId: GetAllTechnicalByMainIdSelice,
    GetAllReportSteps: getAllReportStepSlice,
    GetAllReportStatus: getAllReportStatusSlice,
    mainClassificationLoginUser: mainClassificationLoginUserSlicee,
    MangerToRequesterByReportId: fetchGetMangerToRequesterByReportIdSlice,
    GetRequsetdReportbyId: GetRequsetdReportbyIdSlice,
    GetAllmainClassification: GetAllmainClassificationSlice,
    GetCount: GetCountSlice,
    GetMyReportCount: GetMyReportCountSlice,
    RatingsReport: RatingsReportSlice,
    ReportNotes: ReportNotesSlice,
    requestTemplate: requestTemplateSlice,
    orgHierarchy: orgHierarchySlice,
    orgMembers: orgMembersSlice,
    users: usersSlice,
    excludedUsers: excludedUsersSlice,
    escalationLevelsBySla: escalationLevelsBySlaSlice,
    classifications: classificationsSlice,
    requestTimeline: requestTimelineSlice,
    notifications: NotificationsSlice,
    technicalSupportManagerReportsWithFilter:
      technicalSupportManagerReportsWithFilterSlice,
    technicalSupportEmployeeReportsWithFilter:
      technicalSupportEmployeeReportsWithFilterSlice,
    myReports: myReportsSlice,
    administrationManagerReportsWithFilter:
      administrationManagerReportsWithFilterSlice,
    administrationEmployeeReportsWithFilter:
      administrationEmployeeReportsWithFilterSlice,
    electronicServices: electronicServices,
    subSystemSettingsMainClassification: SubsystemSettingsMainClassification,
    subsytemSettingsMainClassificationAggSlice: GetSubsytemSettingsMainClassificationAgg,
    allSubSystemMainLookUp:getAllSubsystemMainLookUpSlice,
    mainClassificationDetails:mainClassificationTitleDetailsSlice,
    outgoingRequests: outgoingRequestsSlice,
    incomingRequests: incomingRequestsSlice,
    addRequestTransaction:addRequestTransactionSlice,
    requesterForm:requesterFormSlice,
    requestCategory:requestCategorySlice,
    requests:requestsSlice,
    requestData:requestDataSlice,
    delegation:delegationsSlice,
    requestTransaction:requestTransactionSlice ,
    archivedRequests:archivedRequestsSlice,
    requestInstance: requestInstanceSlice,
    applyCourse: applyCourseSlice,
    automationWorkspace:getAllMyComponentsSlice,  
    subsystemSettingsClassification: SubsystemSettingsClassification,
    allSubsytemByClassificationId: subsytemSettingsMainClassificationById,
    SubsytemSettingsAggregator: subsytemSettingsSlice,
    AllTypesWithParents: AllTypesWithParentSlice,
    NoteTypeId: NoteTypeIdSlice,
 subsystemDropdownList: SubsystemDropdownListSlice,
 ssoSecuritySetting:ssoSecuritySettingSlice,
     editClassification: EditClassificationSlice,
       myComponents: getAllMyComponentsSlice,
  hiddenWorkspaces: getAllHiddenWorkspacesSlice,
  getFavouriteList: favouritesListSlice,
  postHiddenWorkspaces: postHiddenWorkspacesSlice,
  deleteHiddenWorkspaces: deleteHiddenWorkspacesSlice,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
