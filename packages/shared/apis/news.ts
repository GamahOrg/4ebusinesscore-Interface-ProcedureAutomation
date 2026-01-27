import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const NewsEndpoints: { [key: string]: Endpoint } = {
  getAllNews: { url: "News/GetAllNewsPaginatedFiltered", method: "get" },
  postNews: { url: "News", method: "post" },
  deleteNews: { url: "News", method: "delete" },
  getNewsById: { url: "News/GetNewsDetails", method: "getById" },
  getNewsModelById: { url: "News", method: "getById" },
  putNews: { url: "News", method: "putById" },
  changeNewsState: { url: "News/PutPublishNews", method: "putById" },

  getAllMainNews: { url: "News/GetAllMainNews", method: "get" },
  getAllMainNewsHome: { url: "News/GetAllMainNews", method: "get" },
  getAllMainHomeNews: { url: "News/GetAllMainHomeNews", method: "get" },
  getAllLastestNews: { url: "News/GetAllLeatestNews", method: "get" },
  getAllLastestNewsPaginated: {
    url: "News/GetAllLatestNewsPaginated",
    method: "get",
  },
  getAllImportantNews: { url: "News/GetAllImportantNews", method: "get" },
  getAllSimilarNews: {
    url: "News/GetAllSimilarNewsPaginated",
    method: "getById",
  },
  postRateNews: { url: "News/PostNewsRating", method: "post" },

  getAllAuthor: { url: "Author/GetAllAuthorsPaginated", method: "get" },
  getAllNewsAuthor: { url: "News/GetAllNewsByAuthorId", method: "get" },
  getAllAuthorWithoutPagination: { url: "Author/GetAllAuthors", method: "get" },
  postAuthor: { url: "Author/PostAuthor", method: "post" },
  putAuthor: { url: "Author/PutAuthor", method: "putById" },
  changeAuthorState: { url: "Author/changeAuthorState", method: "putById" },
  deleteAuthor: { url: "Author/DeleteAuthor", method: "delete" },
  getAllSectors: {
    url: "Sector/GetAllSectorsPaginatedFiltered",
    method: "get",
  },
  getAllNewSector: { url: "Sector", method: "get" },
  getAllSectorsWithoutPagination: { url: "Sector", method: "get" },
  getSector: { url: "Sector", method: "getById" },
  postNewSector: { url: "Sector", method: "post" },
  putASector: { url: "Sector", method: "putById" },
  changeSectorState: { url: "Sector/changeSectorState", method: "putById" },
  deleteSector: { url: "Sector", method: "delete" },
};

export const NewsRootUrl = (window as any)._env_
  ?.REACT_APP_API_Digital_News_Url;
export const NewsBaseUrl = `${NewsRootUrl}/api/`;

export const NewsConsume = initializeConsume(NewsBaseUrl, NewsEndpoints);
