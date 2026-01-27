import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const StrategicThanksEndpoints: { [key: string]: Endpoint } = {
  thanksMessage: {
    url: `${version}ThanksMessage/PostThanksMessage`,
    method: "post",
  },
  likeMessage: {
    url: `${version}LikeMessage/LikeMessage`,
    method: "post",
  },
};
const StrategicThanksBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicThanks_Url
}/api/`;
export const StrategicThanksRootUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicThanks_Url
}/`;

export const StrategicThanksConsume = initializeConsume(
  StrategicThanksBaseUrl,
  StrategicThanksEndpoints
);
