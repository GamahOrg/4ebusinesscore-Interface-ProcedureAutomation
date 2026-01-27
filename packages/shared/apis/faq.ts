import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const FAQEndpoints: { [key: string]: Endpoint } = {
  deleteResolveReport: {
    url: "/ResolveReport/DeleteResolveReport",
    method: "delete",
  },
};

export const FAQRootUrl = (window as any)._env_?.REACT_APP_API_FAQ_Url;
export const FAQBaseUrl = `${FAQRootUrl}/api/`;

export const FAQConsume = initializeConsume(FAQBaseUrl, FAQEndpoints);
