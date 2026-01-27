import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const StrategicMedalsEndpoints: { [key: string]: Endpoint } = {
  //category
  addCategory: {
    url: `${version}Category/PostCategory`,
    method: "post",
  },
  editCategory: {
    url: `${version}Category/PutCategory`,
    method: "putById",
  },
  removeCategory: {
    url: `${version}Category/DeleteCategory`,
    method: "delete",
  },
  getAllCategories: {
    url: `${version}Category/GetAllCategory`,
    method: "get",
  },
  getCategoryById: {
    url: `${version}Category/GetCategoryById`,
    method: "get",
  },

  //Lk_Notifications
  addLk_Notification: {
    url: `${version}Lk_Notifications/PostLk_Notification`,
    method: "post",
  },
  editLk_Notification: {
    url: `${version}Lk_Notifications/PutLK_Notification`,
    method: "putById",
  },
  removeLk_Notification: {
    url: `${version}Lk_Notifications/DeleteLK_Notification`,
    method: "delete",
  },
  getAllLk_Notifications: {
    url: `${version}Lk_Notifications/GetAllLK_Notification`,
    method: "get",
  },
  getLk_NotificationById: {
    url: `${version}Lk_Notifications/GetLK_NotificationById`,
    method: "get",
  },

  //medal
  addMedal: {
    url: `${version}Medal/PostMedal`,
    method: "post",
  },
  editMedal: {
    url: `${version}Medal/PutMedal`,
    method: "putById",
  },
  removeMedal: {
    url: `${version}Medal/DeleteMedal`,
    method: "delete",
  },
  editGiveMedals: {
    url: `${version}Medal/GiveMedals`,
    method: "put",
  },
  getAllMedalByCategoryId: {
    url: `${version}Medal/GetAllMedalByCategoryId`,
    method: "get",
  },
  getAllMedalByUserId: {
    url: `${version}Medal/GetAllMedalByUserId`,
    method: "get",
  },
  getMedalById: {
    url: `${version}Medal/GetMedalById`,
    method: "get",
  },

  //SubMedals
  getSubMedalById: {
    url: `${version}SubMedals/GetSubMedalById`,
    method: "get",
  },
  getAllSubMedals: {
    url: `${version}SubMedals/GetAllSubMedals`,
    method: "get",
  },
};
const StrategicMedalsBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicMedals_Url
}/api/`;
export const StrategicMedalsRootUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicMedals_Url
}/`;

export const StrategicMedalsConsume = initializeConsume(
  StrategicMedalsBaseUrl,
  StrategicMedalsEndpoints
);
