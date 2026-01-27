import { ResponseStatus } from "../enums/response-status";

export interface ResponseModel{
    result:object;
    pageIndex:number;
    pagesize:number;
    totalPage:number;
    totalItemes:number;
    message:string;
    statusEunm:ResponseStatus;
    totalItems?: number;
    totalPages?: number;

}