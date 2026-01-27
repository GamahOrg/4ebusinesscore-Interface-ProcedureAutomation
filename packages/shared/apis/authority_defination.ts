import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const AuthorityDefinationEndpoints: { [key: string]: Endpoint } = {
  addAboutAuthority: {
    url: "AuthorityIdentification/PostAboutAuthority",
    method: "post",
  },
  addBasicDetails: {
    url: "AuthorityIdentification/PostBasicDetails",
    method: "post",
  },
  getAboutAuthority: {
    url: "AuthorityIdentification/GetAboutAuthority",
    method: "get",
  },
  getBasicDetails: {
    url: "AuthorityIdentification/GetBasicDetails",
    method: "get",
  },
  getAllLK_SocialMedia: {
    url: "LK_SocialMedia/GetAllLK_SocialMedia",
    method: "get",
  },
  addLK_SocialMedia: {
    url: "LK_SocialMedia/PostLK_SocialMedia",
    method: "post",
  },
  putLK_SocialMedia: {
    url: "LK_SocialMedia/PutLK_SocialMedia",
    method: "putById",
  },
  deleteLK_SocialMedia: {
    url: "LK_SocialMedia/DeleteLK_SocialMedia",
    method: "delete",
  },
  // getOrgDefination: { url: "OrgDefination", method: "get" },
  addOrgDefination: { url: "OrgDefination", method: "post" },
  addOrgDefinationURL: {
    url: "OrgDefination/AddOrgDefinationURL",
    method: "post",
  },
  deleteOrgDefination: {
    url: "OrgDefination/DeleteOrgDefination",
    method: "delete",
  },
  getSocialMedia: {
    url: "SocialMedia/GetSocialMedia",
    method: "get",
  },
  addSocialMedia: { url: "SocialMedia", method: "post" },
  deleteSocialMedia: { url: "SocialMedia/DeleteSocialMedia", method: "delete" },
  putExternalMember: { url: "BoardMember/PutExternalMember", method: "put" },
  addExternalMember: { url: "BoardMember/PostExternalMember", method: "post" },
  putInternalMember: { url: "BoardMember/PutInternalMember", method: "put" },
  addInternalMember: { url: "BoardMember/PostInternalMember", method: "post" },
  deleteInternalMember: {
    url: "BoardMember/DeleteInternalMember",
    method: "delete",
  },
  deleteExternalMember: {
    url: "BoardMember/DeleteExternalMember",
    method: "delete",
  },
  getLkPosition: { url: "LK_Position/GetLkPosition", method: "get" },
};

export const AuthorityDefinationRootUrl = `${
  (window as any)._env_?.REACT_APP_API_AuthorityDefination_Url
}/`;
const AuthorityDefinationBaseUrl = `${AuthorityDefinationRootUrl}api/v1/`;

export const AuthorityDefinationConsume = initializeConsume(
  AuthorityDefinationBaseUrl,
  AuthorityDefinationEndpoints
);
