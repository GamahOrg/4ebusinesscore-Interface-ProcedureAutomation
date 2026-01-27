import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const StrategicCommunicationAggEndpoints: { [key: string]: Endpoint } = {
  //congrats
  getCongratById: {
    url: `${version}Congrats/GetCongratById`,
    method: "getById",
  },
  getAllCongrats: {
    url: `${version}Congrats/GetAllCongrats`,
    method: "get",
  },
  getAllMyCongrats: {
    url: `${version}Congrats/GetAllMyCongrats`,
    method: "get",
  },

  //group
  getGroupById: {
    url: `${version}Groups/GetGroupById`,
    method: "getById",
  },
  getAllGroups: {
    url: `${version}Groups/GetAllGroups`,
    method: "get",
  },

  //medals
  getMedalByCategoryId: {
    url: `${version}Medal/GetAllMedalbyCategoryId`,
    method: "get",
  },
  getAllMedals: {
    url: `${version}Medal/GetAllMedal`,
    method: "get",
  },

  //thanks
  getThanksMessages: {
    url: `${version}Thanks/GetThanksMessagesByUserId`,
    method: "get",
  },
};
const StrategicCommunicationAggBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicCommunication_Agg_Url
}/api/`;
export const StrategicCommunicationAggRootUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicCommunication_Agg_Url
}/`;

export const StrategicCommunicationAggConsume = initializeConsume(
  StrategicCommunicationAggBaseUrl,
  StrategicCommunicationAggEndpoints
);
