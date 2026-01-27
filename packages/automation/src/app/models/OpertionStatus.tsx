import { OperationStatusEums } from "../enums/operationStatus";

export class OpertionStatusArray {
    data: OpertionStatus[];
    totalPages: number = 1;
    totalItems: number = 10;
  
    constructor(data: OpertionStatus[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  export class OpertionStatus {
    reportId:string;
    operationStatus: OperationStatusEums;
    statusDate: string;
    statusNameAr: string;
    statusNameEn: string;
    reportTitle: string;
    constructor(
        reportId:string,
        operationStatus: OperationStatusEums,
        statusNameAr: string,
        statusNameEn: string,
        reportTitle: string,
        statusDate: string
    ){
     this.reportId=reportId;
     this.statusDate=statusDate;
     this.statusNameAr=statusNameAr;
     this.statusNameEn=statusNameEn;
     this.operationStatus=operationStatus;
     this.reportTitle = reportTitle;
    }
  }