import { MAIN_BASE_URL } from "@4eplatform/shared";

interface Endpoint {
  url: string;
  method: keyof Requests; // 'get', 'post', 'put', 'delete'
}
interface Requests {
  get: (url: string, params?: any) => Promise<any>;
  getById: (url: string, id: any) => Promise<any>;
  post: (url: string, body: {}) => Promise<any>;
  put: (url: string, body: {}) => Promise<any>;
  delete: (url: string) => Promise<any>;
  putById: (url: string, id: string, body: {}) => Promise<any>;
}

const requestTemplateEndpoints: { [key: string]: Endpoint } = {
  getRequestTemplate: { url: "RequestTemplate", method: "get" },
  getRequestTemplateById: { url: "RequestTemplate", method: "getById" },
  postRequestTemplate: { url: "RequestTemplate", method: "post" },
  putRequestTemplate: { url: "RequestTemplate", method: "putById" },
  deleteRequestTemplate: { url: "RequestTemplate", method: "delete" },
};

const requestCategoryEndpoints: { [key: string]: Endpoint } = {
  getRequestCategory: { url: "RequestCategory", method: "get" },
};

const parentRequestTemplateEndpoints: { [key: string]: Endpoint } = {
  getParentRequestTemplate: {
    url: "RequestTemplate/GetParentRequestTemplatesByCategoryId",
    method: "getById",
  },
};

const organizationEndpoints: { [key: string]: Endpoint } = {
  getOrganization: { url: "OrgHierarchy/GetAll", method: "get" },
};

const slaEndpoints: { [key: string]: Endpoint } = {
  getSLA: { url: "SLA/GetAllSla", method: "get" },
};

const rolsEndpoints: { [key: string]: Endpoint } = {
  getRols: { url: "v1/Role", method: "get" },
};

const employeeEndpoints: { [key: string]: Endpoint } = {
  getEmployee: { url: "Org/GetOrg", method: "get" },
};

const requestTemplateByIdEndpoints: { [key: string]: Endpoint } = {
  getRequestTemplateById: { url: "RequestTemplate", method: "getById" },
};

const specializedEndpoints: { [key: string]: Endpoint } = {
  getSpecialized: { url: "Lookup/GetAllLookup", method: "get" },
};

const userLoggedInEndpoints: { [key: string]: Endpoint } = {
  getUserLoggedIn: { url: "v1/User/GetLoggedInUser", method: "get" },
};

export const baseUrl =
  (window as any)._env_?.REACT_APP_API_DynamicWorkFlow_Url + "/";
export const baseUrlForOrg = (window as any)._env_?.REACT_APP_API_Org_Url + "/";
export const baseUrlForSla = (window as any)._env_?.REACT_APP_API_SLA_Url + "/";
export const baseUrlForRols =
  (window as any)._env_?.REACT_APP_API_User_Url + "/";
export const baseUrlForEmployee =
  (window as any)._env_?.REACT_APP_API_ControlPanel_Agg_Url + "/";
export const baseUrlForRequestTemplateById =
  (window as any)._env_?.REACT_APP_API_DynamicWorkFlowAgg_Url + "/";
export const baseUrlForSpecialized =
  (window as any)._env_?.REACT_APP_API_Org_Url + "/";
export const baseUrlForUserLoggedIn =
  (window as any)._env_?.REACT_APP_API_User_Url + "/";

const userLoggedInApis = {
  baseurl: `${baseUrlForUserLoggedIn}api/`,
  endpoints: userLoggedInEndpoints,
};

const requestTemplateByIdApis = {
  baseurl: `${baseUrlForRequestTemplateById}api/`,
  endpoints: requestTemplateByIdEndpoints,
};

const requestTemplateApis = {
  baseurl: `${baseUrl}api/`,
  endpoints: requestTemplateEndpoints,
};

const requestCategoryApis = {
  baseurl: `${baseUrl}api/`,
  endpoints: requestCategoryEndpoints,
};

const parentRequestTemplateApis = {
  baseurl: `${baseUrl}api/`,
  endpoints: parentRequestTemplateEndpoints,
};

const organizationApis = {
  baseurl: `${baseUrlForOrg}api/`,
  endpoints: organizationEndpoints,
};

const slaApis = {
  baseurl: `${baseUrlForSla}api/`,
  endpoints: slaEndpoints,
};

const rolsApis = {
  baseurl: `${baseUrlForRols}api/`,
  endpoints: rolsEndpoints,
};

const employeeApis = {
  baseurl: `${baseUrlForEmployee}api/`,
  endpoints: employeeEndpoints,
};

const specializedApis = {
  baseurl: `${baseUrlForSpecialized}api/`,
  endpoints: specializedEndpoints,
};

export {
  requestTemplateApis,
  requestCategoryApis,
  parentRequestTemplateApis,
  organizationApis,
  slaApis,
  rolsApis,
  employeeApis,
  requestTemplateByIdApis,
  specializedApis,
  userLoggedInApis,
};
