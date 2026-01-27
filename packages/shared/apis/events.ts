import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const EventsEndpoints: { [key: string]: Endpoint } = {
  getAllEvents: { url: "/Events", method: "get" },
  addEvent: {
    url: "/Events",
    method: "post",
  },
  getAllEventsPaginatedFiltered: {
    url: "/Events/GetAllEventsPaginatedFiltered",
    method: "get",
  },
  getEventsById: { url: "/Events", method: "getById" },
  putEventById: { url: "/Events", method: "putById" },
  deleteEvent: { url: "/Events/DeleteEvents", method: "delete" },
  getEventsDetailsById: { url: "/Events/GetEventsDetails", method: "getById" },
  postEventsRating: { url: "/Events/PostEventsRating", method: "post" },
  getAllSectors: { url: "/Sector", method: "get" },
  PutPublishEvents: { url: "/Events/PutPublishEvents", method: "putById" },
};

export const eventsRootUrl =
  (window as any)._env_?.REACT_APP_API_Events_Url + "/";
const EventsBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Events_Url
}/api/v1/`;

export const EventsConsume = initializeConsume(EventsBaseUrl, EventsEndpoints);
