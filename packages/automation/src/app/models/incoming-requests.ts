import { RequestStatus } from "../enums/request-status-enum";

export interface IncomingRequests{
    id: string;
    name:string;
    date: Date;
    requestStatus: RequestStatus;
    createdByFirstName:string ;
    createdBySecondName:string ;
    createdByThirdName: string;
    createdByFourthName:string ;
    orgNameAr: string;
    orgNameEn: string;
    requestCategoryName:string;
    requestNumber:string,
    createBy:string,
    email:string,
}