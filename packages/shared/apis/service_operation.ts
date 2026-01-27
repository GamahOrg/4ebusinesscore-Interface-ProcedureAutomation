import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const ServiceOperationEndpoints: { [key: string]: Endpoint } = {
  getQuestionsReport: { url: "/Report/GetRequesterForm", method: "get" },
  getAllReports: { url: "/Report", method: "get" },
  PostRatingsReport: {
    url: "/OperationReport/PostRatingsReport",
    method: "post",
  },
  GetAllRatingsReport: {
    url: "/OperationReport/GetAllRatingsReport",
    method: "getById",
  },
  PostReportNote: { url: "/ReportNote/PostReportNote", method: "post" },
};

const ServiceOperationBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_ServiceOperation_Url
}/api/`;
export const ServiceOperationRootUrl = `${
  (window as any)._env_?.REACT_APP_API_ServiceOperation_Url
}`;

export const ServiceOperationConsume = initializeConsume(
  ServiceOperationBaseUrl,
  ServiceOperationEndpoints
);
