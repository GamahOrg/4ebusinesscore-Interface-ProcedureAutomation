import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const CircularsEndpoints: { [key: string]: Endpoint } = {
  // circular controller endpoints
  postCircular: { url: "/Circular", method: "post" },
  putCircular: { url: "/Circular", method: "put" },
  archiveCircular: { url: "/Circular/PutArchiveCircular", method: "put" },
  deleteCircular: { url: "/Circular", method: "delete" },
  deleteConfidentialCircular: {
    url: "/Circular/DeleteConfidentialCircular",
    method: "deleteByQuery",
  },
  deletePrivateCircular: {
    url: "/Circular/DeletePrivateCircular",
    method: "deleteByQuery",
  },
  getCircular: { url: "/Circular", method: "getById" },
  getAllArchievedCircular: {
    url: "/Circular/GetAllArchievedCircular",
    method: "get",
  },
  putArchiveCircular: { url: "/Circular/PutArchiveCircular", method: "put" },
  getAllCircularIssuer: {
    url: "/Circular/GetAllCircularIssuer",
    method: "get",
  },
  getAllCircularNumbers: {
    url: "/Circular/GetAllCircularNumbers",
    method: "get",
  },
  // getAllCircularSource:{ url: "/Circular/GetAllCircularSource", method: "get" },
  getAllCircularsPublic: {
    url: "/Circular/GetAllCircularsPublic",
    method: "postByParamsWithBody",
  },
  getAllCircularsPrivate: {
    url: "/Circular/GetAllCircularsPrivateOrg",
    method: "postByParamsWithBody",
  },
  getAllConfidentialCirculars: {
    url: "/Circular/GetAllConfidentialCirculars",
    method: "postByParamsWithBody",
  },

  // documentInfo controller endpoints
  // getDocumentInfoByCircularId: { url: "/DocumentInfo/DocumentInfoByCircularId", method: "getById" },
  postDocumentInfo: { url: "/DocumentInfo", method: "post" },
  deleteDocumentInfo: { url: "/DocumentInfo", method: "delete" },

  // relatedDocuments controller endpoints
  postRelatedDocuments: { url: "/RelatedDocuments", method: "post" },
  putRelatedDocuments: { url: "/RelatedDocuments", method: "put" },
  getAllRelatedDocumentsByCircularId: {
    url: "/RelatedDocuments/GetAllRelatedDocumentsByCircularId",
    method: "getById",
  },
  getIssuerSourceByCircularNumber: {
    url: "/RelatedDocuments/GetIssuerSourceByCircularNumber",
    method: "getById",
  },
  getNumberIssuerByCircularSource: {
    url: "/RelatedDocuments/GetNumberIssuerByCircularSource",
    method: "getById",
  },
  getSourceNumberByCircularIssuer: {
    url: "/RelatedDocuments/GetSourceNumberByCircularIssuerId",
    method: "getById",
  },
  getIssuerNumberSourceByDate: {
    url: "RelatedDocuments/GetIssuerNumberSourceByDate",
    method: "get",
  },
  getSourceNumberByCircularIssuerIdAndDate: {
    url: "RelatedDocuments/GetSourceNumberByCircularIssuerIdAndDate",
    method: "get",
  },

  // new lookups
  getLkEnforcement: { url: "LookUps/GetLkEnforcement", method: "get" },
  getLkIssuer: { url: "LookUps/GetLkIssuer", method: "get" },
  getLkApproval: { url: "LookUps/GetLkApproval", method: "get" },
  postLkApproval: { url: "LookUps/PostLkApproval", method: "post" },
  getOneLkApproval: { url: "LookUps/GetLK_ApprovalById", method: "getById" },
  putLkApproval: { url: "LookUps/PutLK_Approval", method: "put" },
  deleteLkApproval: { url: "LookUps/DeleteLK_Approval", method: "delete" },
  postLkIssuer: { url: "LookUps/PostLkIssuer", method: "post" },
  getOneLkIssuer: { url: "LookUps/GetLK_IssuerById", method: "getById" },
  putLkIssuer: { url: "LookUps/PutLK_Issuer", method: "put" },
  deleteLkIssuer: { url: "LookUps/DeleteLK_Issuer", method: "delete" },
};
const CircularsBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Circulars_Url
}/api/v1/`;
export const CircularsRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Circulars_Url
}/`;

export const CircularsConsume = initializeConsume(
  CircularsBaseUrl,
  CircularsEndpoints
);
