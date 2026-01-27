import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

let version = `v1/`;

const TrainingEndpoints: { [key: string]: Endpoint } = {
  // apply course controller endpoints
  getCities: {
    url: `${version}ApplyCourse/GetCities`,
    method: `get`,
  },
  getCoursesForapplicationUser: {
    url: `${version}ApplyCourse/CoursesForapplicationUser`,
    method: `get`,
  },
  getCoursesForapplicationUserByCourseId: {
    url: `${version}ApplyCourse/CoursesForapplicationUser`,
    method: `getById`,
  },
  addActionOnCourseStage: {
    url: `${version}ApplyCourse/ActionOnCourseStage`,
    method: `post`,
  },
  getCancelNotes: {
    url: `${version}ApplyCourse/GetCancelNotes`,
    method: `getById`,
  },
  getCoursesStageForApplicationUser: {
    url: `${version}ApplyCourse/CoursesStageForapplicationUser`,
    method: `get`,
  },
  // ApprovalCycle controller endpoints
  getApprovalCycles: {
    url: `${version}ApprovalCycle/GetAllApprovalCycle`,
    method: `get`,
  },
  getApprovalCycleById: {
    url: `${version}ApprovalCycle/GetApprovalCycleById`,
    method: `getById`,
  },
  addApprovalCycle: {
    url: `${version}ApprovalCycle`,
    method: `post`,
  },
  editApprovalCycle: {
    url: `${version}ApprovalCycle/PutApprovalCycle`,
    method: `putById`,
  },
  deleteApprovalCycle: {
    url: `${version}ApprovalCycle/DeleteApprovalCycle`,
    method: `delete`,
  },
  //   category controller endpoints
  addCategory: {
    url: `${version}Category`,
    method: `post`,
  },
  deleteCategory: {
    url: `${version}Category/DeleteCategory`,
    method: `delete`,
  },
  getAllCategories: {
    url: `${version}Category/GetAllCategories`,
    method: `get`,
  },
  //   course controller endpoints
  getAllCourses: {
    url: `${version}Course/GetAllCourses`,
    method: `get`,
  },
  getCourseByCourseStageId: {
    url: `${version}Course/GetCourseByCourseStageId`,
    method: `getById`,
  },
  getCourseAllDataForRenewById: {
    url: `${version}Course/GetCourseAllDataForRenew`,
    method: `getById`,
  },
  addCourse: {
    url: `${version}Course/PostCourse`,
    method: `post`,
  },
  editCourse: {
    url: `${version}Course/PutCourse`,
    method: `putById`,
  },
  //   course applicants controller endpoints
  addApplyEmplyeesToCourses: {
    url: `${version}CourseApplicants/ApplyEmplyeesToCourses`,
    method: `post`,
  },
  getAppliedCourses: {
    url: `${version}CourseApplicants/GetAppliedCourses`,
    method: `get`,
  },
  deleteAppliedCourseByCourseStageId: {
    url: `${version}CourseApplicants/DeleteAppliedCourse/courseStageId`,
    method: `deleteByQuery`,
  },
  updateApplicants: {
    url: `${version}CourseApplicants/UpdateApplicants`,
    method: `put`,
  },
  //   course stage controller endpoints
  getCourseStageById: {
    url: `${version}CourseStage/GetCourseStageById`,
    method: `getById`,
  },
  deleteCourse: {
    url: `${version}CourseStage/DeleteCourse`,
    method: `delete`,
  },
  editCourseStageStopOrPublish: {
    url: `${version}CourseStage/EditCourseStageStopOrPublish`,
    method: `putById`,
  },
  cancelApplicationById: {
    url: `${version}CourseStage/CancelApplication`,
    method: `putById`,
  },
  cancelStageById: {
    url: `${version}CourseStage/CancelStageById`,
    method: `putById`,
  },
  adminCancelCourse: {
    url: `${version}CourseStage/AdminCancelCourse`,
    method: `putById`,
  },
  getCourseSpecificationsById: {
    url: `${version}CourseStage/GetCourseSpecifications/id`,
    method: `get`,
  },
  getCourseStagesForEmployeesApplications: {
    url: `${version}CourseStage/GetCourseStagesForEmployeesApplications`,
    method: `get`,
  },
  //   course survey controller endpoints
  getCourseStageSurvey: {
    url: `${version}CousreServey/GetCourseStageSurvey/id`,
    method: `get`,
  },
  getServeybyUserId: {
    url: `${version}CousreServey/GetServeybyUserId`,
    method: `get`,
  },
  addCourseUserSurvey: {
    url: `${version}CousreServey/PostCourseUserSurvey`,
    method: `postByParamsWithBody`,
  },
  //   FAQ Controller endpoints
  addFAQ: {
    url: `${version}FAQ`,
    method: `post`,
  },
  editFAQ: {
    url: `${version}FAQ/PutFAQ`,
    method: `putByQueryWithBody`,
  },
  deleteFAQ: {
    url: `${version}FAQ/DeleteFAQ`,
    method: `delete`,
  },
  getAllFAQs: {
    url: `${version}FAQ/GetAllFAQs`,
    method: `get`,
  },
  getFAQById: {
    url: `${version}FAQ/GetFAQById`,
    method: `getById`,
  },
  //   group controller endpoints
  addGroup: {
    url: `${version}Group`,
    method: `post`,
  },
  deleteGroup: {
    url: `${version}Group/DeleteGroup`,
    method: `delete`,
  },
  getAllGroup: {
    url: `${version}Group/GetAllGroup`,
    method: `get`,
  },
  // lookups controller endpoints
  addLkAgreement: {
    url: `${version}LookUps/PostLkAgreement`,
    method: `post`,
  },
  deleteLkAgreement: {
    url: `${version}LookUps/DeleteLkAgreement`,
    method: `delete`,
  },
  getAllLkAgreements: {
    url: `${version}LookUps/GetAllLkAgreements`,
    method: `get`,
  },
  addLkPublish: {
    url: `${version}LookUps/PostLkPublish`,
    method: `post`,
  },
  deleteLkPublish: {
    url: `${version}LookUps/DeleteLkPublish`,
    method: `delete`,
  },
  getAllLkPublish: {
    url: `${version}LookUps/GetAllLkPublish`,
    method: `get`,
  },
  addLkCourseLocation: {
    url: `${version}LookUps/PostLkCourseLocation`,
    method: `post`,
  },
  deleteLkCourseLocation: {
    url: `${version}LookUps/DeleteLkCourseLocation`,
    method: `delete`,
  },
  getAllLkCourseLocation: {
    url: `${version}LookUps/GetAllLkCourseLocation`,
    method: `get`,
  },
  addLkSpecialty: {
    url: `${version}LookUps/PostLkSpecialty`,
    method: `post`,
  },
  deleteLkSpecialty: {
    url: `${version}LookUps/DeleteLkSpecialty`,
    method: `delete`,
  },
  getAllLkSpecialty: {
    url: `${version}LookUps/GetAllLkSpecialty`,
    method: `get`,
  },
  addLkSpecialtyPrivate: {
    url: `${version}LookUps/PostLkSpecialtyPrivate`,
    method: `post`,
  },
  deleteLkSpecialtyPrivate: {
    url: `${version}LookUps/DeleteLkSpecialtyPrivate`,
    method: `delete`,
  },
  getAllLkSpecialtyPrivate: {
    url: `${version}LookUps/GetAllLkSpecialtyPrivate`,
    method: `get`,
  },
  addLkCity: {
    url: `${version}LookUps/PostLkCity`,
    method: `postByParamsWithBody`,
  },
  editLkCity: {
    url: `${version}LookUps/PutLkCity`,
    method: `put`,
  },
  deleteLkCity: {
    url: `${version}LookUps/DeleteLkCity`,
    method: `delete`,
  },
  getAllLkCities: {
    url: `${version}LookUps/GetAllLkCities`,
    method: `get`,
  },
  getLkCityByCountryId: {
    url: `${version}LookUps/GetLkCityByCountryId`,
    method: `getByIdParams`,
  },
  addLkCountry: {
    url: `${version}LookUps/PostLkCountry`,
    method: `post`,
  },
  deleteLkCountry: {
    url: `${version}LookUps/DeleteLkCountry`,
    method: `delete`,
  },
  getAllLkCountries: {
    url: `${version}LookUps/GetAllLkCountries`,
    method: `get`,
  },
  getAllLkCountriesByLocation: {
    url: `${version}LookUps/GetAllLkCountriesByLocation`,
    method: `getById`,
  },
  getAllCourseAction: {
    url: `${version}LookUps/GetAllCourseAction`,
    method: `get`,
  },
  //   survey controller endpoints
  addSurvey: {
    url: `${version}Survey`,
    method: `post`,
  },
  editSurvey: {
    url: `${version}Survey/PutSurvey`,
    method: `put`,
  },
  deleteSurvey: {
    url: `${version}Survey/DeleteSurvey`,
    method: `delete`,
  },
  getAllSurvey: {
    url: `${version}Survey/GetAllSurvey`,
    method: `get`,
  },
  getSurveyById: {
    url: `${version}Survey/GetSurveyById`,
    method: `getById`,
  },
  //   unavailable courses controller endpoints
  getAllUnAvailableCourses: {
    url: `${version}UnAvailableCourses/GetAllUnAvailableCourses`,
    method: `get`,
  },
  getAllMyUnAvailableCourses: {
    url: `${version}UnAvailableCourses/GetAllMyUnAvailableCourses`,
    method: `get`,
  },
  getAllCoursesByUserId: {
    url: `${version}UnAvailableCourses/GetAllCoursesByUserId`,
    method: `getById`,
  },
  getAllAvailableCoursesByUserId: {
    url: `${version}Course/GetAllAvaliableCoursesByUserId`,
    method: `getByIdParams`,
  },
  getAllUnavailableCoursesByUserId: {
    url: `${version}UnAvailableCourses/GetAllUnAvaliableCoursesByUserId`,
    method: `getByIdParams`,
  },
  addUnAvailableCourses: {
    url: `${version}UnAvailableCourses`,
    method: `post`,
  },
  deleteUnAvailableCourses: {
    url: `${version}UnAvailableCourses`,
    method: `deleteByQueryWithId`,
  },
  deleteUnAvailableCoursesParams: {
    url: `${version}UnAvailableCourses`,
    method: `delete`,
  },
  editUnAvailableCourses: {
    url: `${version}UnAvailableCourses`,
    method: `put`,
  },
  editCancelRequestCourse: {
    url: `${version}UnAvailableCourses/PutCancelRequestCourse`,
    method: `putByQuery`,
  },
  editExceptionApprovedUnAvailableCourse: {
    url: `${version}UnAvailableCourses/PutExceptionApprovedUnAvailableCourse`,
    method: `putByQuery`,
  },
  editApprovedOrRejectUnAvailableCourse: {
    url: `${version}UnAvailableCourses/PutApprovedOrRejectUnAvailableCourse`,
    method: `putById`,
  },
  getAllUnAvailableCoursesDrop: {
    url: `${version}UnAvailableCourses/GetAllUnAvailableCoursesDrop`,
    method: `get`,
  },
  getAllItemsCourse: {
    url: `${version}ApplyCourse/GetItemsByCourseId`,
    method: `getById`,
  },
  getAllImages: {
    url: `${version}ImageSetting/GetAllImages`,
    method: `get`,
  },
  getAllImagesVisible: {
    url: `${version}ImageSetting/GetAllImageVisable`,
    method: `get`,
  },
  getImageById: {
    url: `${version}ImageSetting/GetImageById`,
    method: `getById`,
  },
  postImage: {
    url: `${version}ImageSetting`,
    method: `post`,
  },
  deleteImage: {
    url: `${version}ImageSetting/Deleteimage`,
    method: `delete`,
  },
  editImage: {
    url: `${version}ImageSetting/updateimage`,
    method: `putByQueryWithBody`,
  },
  getLkCountryById: {
    url: `${version}LookUps/GetLkCountryById`,
    method: `getById`,
  },
  editLkCountry: {
    url: `${version}LookUps/PutLKCountry`,
    method: `putById`,
  },
  getDetailsCourseByCourseId: {
    url: `${version}Course/GetCourseStagesByCourseId`,
    method: `getById`,
  },
  postRole: {
    url: `${version}Role/PostRoleAssign`,
    method: `post`,
  },
  putRole: {
    url: `${version}Role/PutRoleAssign`,
    method: `putByQueryWithBody`,
  },
  deleteRole: {
    url: `${version}Role/DeleteRoleAssign`,
    method: `delete`,
  },
  getAllPermissionsTypes: {
    url: `${version}LookUps/GetAllRoleType`,
    method: `get`,
  },
};
export const TrainingRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Training_Url
}/`;
const TrainingBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Training_Url
}/api/`;

export const TrainingConsume = initializeConsume(
  TrainingBaseUrl,
  TrainingEndpoints
);
