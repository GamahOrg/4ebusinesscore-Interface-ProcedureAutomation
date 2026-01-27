import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const StrategicLoyaltyEndpoints: { [key: string]: Endpoint } = {
  //Categories
  getCategoryList: {
    url: `${version}Categories/GetListCategory`,
    method: `get`,
  },
  getAllCategories: {
    url: `${version}Categories/GetAllCategories`,
    method: `get`,
  },
  getCategoryById: {
    url: `${version}Categories/GetCategoryById`,
    method: `getById`,
  },
  postCategory: {
    url: `${version}Categories/PostCategory`,
    method: `post`,
  },
  putCategory: {
    url: `${version}Categories/putCategory`,
    method: `put`,
  },
  deleteCategory: {
    url: `${version}Categories/DeleteCategory`,
    method: `delete`,
  },

  //Lk_DiscountMethod
  getAllDiscountMethod: {
    url: `${version}Lk_DiscountMethod/GetAllDiscountMethod`,
    method: `get`,
  },
  getDiscountMethodById: {
    url: `${version}Lk_DiscountMethod/GetByIdDiscountMethod`,
    method: `getById`,
  },
  postDiscountMethod: {
    url: `${version}Lk_DiscountMethod/PostDiscountMethod`,
    method: `post`,
  },
  putDiscountMethod: {
    url: `${version}Lk_DiscountMethod/putDiscountMethod`,
    method: `putById`,
  },
  deleteDiscountMethod: {
    url: `${version}Lk_DiscountMethod/deleteDiscountMethod`,
    method: `delete`,
  },

  //Lk_DiscountType
  getAllDiscountType: {
    url: `${version}Lk_DiscountType/GetAllDiscountType`,
    method: `get`,
  },
  getDiscountTypeById: {
    url: `${version}Lk_DiscountType/GetByIdDiscountType`,
    method: `getById`,
  },
  postDiscountType: {
    url: `${version}Lk_DiscountType/PostDiscountType`,
    method: `post`,
  },
  putDiscountType: {
    url: `${version}Lk_DiscountType/putDiscountType`,
    method: `putById`,
  },
  deleteDiscountType: {
    url: `${version}Lk_DiscountType/deleteDiscountType`,
    method: `delete`,
  },

  //LK_OfferType
  getAllLKOfferType: {
    url: `${version}LK_OfferType/GetAllK_OfferType`,
    method: `get`,
  },
  getLKOfferTypeById: {
    url: `${version}LK_OfferType/GetByIdlK_OfferType`,
    method: `getById`,
  },
  postLKOfferType: {
    url: `${version}LK_OfferType/PostLK_OfferTypeMethod`,
    method: `post`,
  },
  putLKOfferType: {
    url: `${version}LK_OfferType/putLK_OfferType`,
    method: `putById`,
  },
  deleteLKOfferType: {
    url: `${version}LK_OfferType/DeleteOfferType`,
    method: `delete`,
  },

  //offer
  postOffer: {
    url: `${version}Offer/PostOffer`,
    method: `post`,
  },
  putOffer: {
    url: `${version}Offer/putOffer`,
    method: `putById`,
  },
  getOfferById: {
    url: `${version}Offer/GetOfferById`,
    method: `getById`,
  },
  getAllOffer: {
    url: `${version}Offer/GetAllOffer`,
    method: `get`,
  },
  getOfferByServiceProvider: {
    url: `${version}Offer/GetOffersByServiceProviderId`,
    method: `getById`,
  },
  getAllOffersWithFilter: {
    url: `${version}Offer/GetAllOffersWithFilter`,
    method: `get`,
  },
  deleteOffer: {
    url: `${version}Offer/DeleteOffer`,
    method: `delete`,
  },

  //OfferLikeUsed
  postOfferLikeUsed: {
    url: `${version}OfferLikeUsed/PostOfferLikeUsed`,
    method: `post`,
  },

  //ServiceProvider
  postServiceProvider: {
    url: `${version}ServiceProvider/PostServiceProvider`,
    method: `post`,
  },
  postServiceProviderWithOffer: {
    url: `${version}ServiceProvider/PostServiceProviderWithOffer`,
    method: `post`,
  },
  putServiceProvider: {
    url: `${version}ServiceProvider/PutServiceProvider`,
    method: `putById`,
  },
  getListServiceProvider: {
    url: `${version}ServiceProvider/GetListServiceProvider`,
    method: `get`,
  },
  getServiceProviderById: {
    url: `${version}ServiceProvider/GetServiceProviderById`,
    method: `getById`,
  },
  getAllServiceProvider: {
    url: `${version}ServiceProvider/GetAllServiceProvider`,
    method: `get`,
  },
  getAllServiceProviderWithFilter: {
    url: `${version}ServiceProvider/GetAllServiceProviderWithFilter`,
    method: `get`,
  },
  deleteServiceProvider: {
    url: `${version}ServiceProvider/DeleteServiceProvider`,
    method: `delete`,
  },

  //ServiceProviderLike
  postServiceProviderLike: {
    url: `${version}ServiceProviderLike/PostServiceProviderLike`,
    method: `post`,
  },

  //SubCategories
  getListSubCategories: {
    url: `${version}SubCategories/GetListSubCategories`,
    method: `get`,
  },
  postSubCategory: {
    url: `${version}SubCategories/PostSubCategory`,
    method: `post`,
  },
};
const StrategicLoyaltyBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicLoyalty_Url
}/api/`;
export const StrategicLoyaltyRootUrl = `${
  (window as any)._env_?.REACT_APP_API_StrategicLoyalty_Url
}/`;

export const StrategicLoyaltyConsume = initializeConsume(
  StrategicLoyaltyBaseUrl,
  StrategicLoyaltyEndpoints
);
