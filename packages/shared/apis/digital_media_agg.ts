import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const DigitalMediaAggEndpoints: { [key: string]: Endpoint } = {
  getOrgDefination: { url: "OrgDefination", method: "get" },
  getOrgDefinationById: { url: "OrgDefination", method: "getById" },
  getOrgWithoutContentById: {
    url: "OrgDefination/GetOrgWithoutContentById",
    method: "getById",
  },
  getAllBoardMembers: { url: "BoardMembers/GetAllBoardMembers", method: "get" },
  getMemberById: { url: "BoardMembers/GetMemberById", method: "getByIdParams" },
  getByIdOrgDefinationContent: {
    url: "OrgDefination/GetByIdOrgDefinationContent",
    method: "getByMultipleIds",
  },
};

export const DigitalMediaAggRootUrl = `${
  (window as any)._env_?.REACT_APP_API_DigitalMedia_Agg_Url
}/`;
const DigitalMediaAggBaseUrl = `${DigitalMediaAggRootUrl}api/v1/`;

export const DigitalMediaAggConsume = initializeConsume(
  DigitalMediaAggBaseUrl,
  DigitalMediaAggEndpoints
);
