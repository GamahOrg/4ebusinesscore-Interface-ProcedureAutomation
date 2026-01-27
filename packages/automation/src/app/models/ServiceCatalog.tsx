import { Category } from "./CategoryModel";

export interface  ServiceCatalog{
    serviceCatalogId:string,
    serviceCatalogName:string,
    categoryInfo:[Category]
}


export interface  MainClassificationServiceCatalog{
    mainClassificationId:string,
    mainClassificationName:string,
    serviceCatalogInfo:[ServiceCatalog]
}