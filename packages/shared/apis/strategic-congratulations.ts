import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const StrategicCongratulationsEndpoints: { [key: string]: Endpoint } = {
  //category
  getِAllCategory: {
    url: `${version}Category/GetAllCategories`,
    method: `get`,
  },
  getCategoryById: {
    url: `${version}Category/GetCategoryById`,
    method: `getById`,
  },
  postCategory: {
    url: `${version}Category/PostCategory`,
    method: `post`,
  },
  deleteCategory: {
    url: `${version}Category/DeleteCategory`,
    method: `delete`,
  },
  putCategory: {
    url: `${version}Category`,
    method: `put`,
  },

  //congerts
  postCongrats: {
    url: `${version}Congrats/PostCongrats`,
    method: `post`,
  },
  deleteCongrats: {
    url: `${version}Congrats/DeleteCongrats`,
    method: `delete`,
  },
  putCongrats: {
    url: `${version}Congrats/PutCongrats`,
    method: `put`,
  },

  //Groups
  postGroups: {
    url: `${version}Groups/PostGroup`,
    method: `post`,
  },
  putGroups: {
    url: `${version}Groups/PutGroup`,
    method: `put`,
  },
  deleteGroups: {
    url: `${version}Groups/DeleteGroup`,
    method: `delete`,
  },

  //LookUp
  getAllLookUp: {
    url: `${version}LookUp/GetAllSendToLookUp`,
    method: `get`,
  },
  getLookUpById: {
    url: `${version}LookUp/GetSendToById`,
    method: `getById`,
  },
  putLookUp: {
    url: `${version}LookUp`,
    method: `putById`,
  },
  postLookUp: {
    url: `${version}LookUp/PostLookupSendTo`,
    method: `post`,
  },
  deleteLookUp: {
    url: `${version}LookUp/DeleteSendTo`,
    method: `delete`,
  },

  //SubCategory
  getSubCategoryById: {
    url: `${version}SubCategory/GetSubCategoryById`,
    method: `getById`,
  },
  deleteSubCategory: {
    url: `${version}SubCategory/DeleteSubCategory`,
    method: `delete`,
  },
  putSubCategory: {
    url: `${version}SubCategory/PutSubCategory`,
    method: `putById`,
  },
  postSubCategory: {
    url: `${version}SubCategory/PostSubCategory`,
    method: `post`,
  },
  getAllSubCategoryByMainCategoryId: {
    url: `${version}SubCategory/GetAllSubCategoryByMainCategoryId`,
    method: `getByIdParams`,
  },

  //Template
  getTemplateById: {
    url: `${version}Template/GetTemplateById`,
    method: `getById`,
  },
  getAllTemplatesBySubCategoryId: {
    url: `${version}Template/GetAllTemplatesBySubCategoryId`,
    method: `getById`,
  },
  postTemplate: {
    url: `${version}Template/PostTemplate`,
    method: `post`,
  },
  putTemplate: {
    url: `${version}Template/PutTemplate`,
    method: `putById`,
  },
  deleteTemplate: {
    url: `${version}Template/DeleteTemplate`,
    method: `delete`,
  },
  postTemplateUserException: {
    url: `${version}Template/TemplateUserException`,
    method: `post`,
  },
};
const StrategicCongratulationsBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicCongratulations_Url
}/api/`;
export const StrategicCongratulationsRootUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicCongratulations_Url
}/`;

export const StrategicCongratulationsConsume = initializeConsume(
  StrategicCongratulationsBaseUrl,
  StrategicCongratulationsEndpoints
);
