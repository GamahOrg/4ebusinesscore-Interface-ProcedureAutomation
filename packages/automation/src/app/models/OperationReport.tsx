export class OperationReportArray {
    data: OperationReport[];
    totalPages: number = 1;
    totalItems: number = 10;
  
    constructor(data: OperationReport[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  export class OperationReport {
    reportId:string;
    statusDate: string;
    statusNameAr: string;
    statusNameEn: string;
    note: string;
    image: string;
    jobNameAr: string;
    jobNameEn: string;
    fullName: string;
    createdOn: string;
    attatchment:string;
    redirectTechFullName:string;
    constructor(
        reportId:string,
        statusDate: string,
        statusNameAr: string,
        statusNameEn: string,
        note: string,
        image: string,
        jobNameAr: string,
        jobNameEn: string,
        fullName: string,
        createdOn: string=new Date().toDateString(),
        attatchment:string,
        redirectTechFullName:string,
    ){
     this.reportId=reportId;
     this.statusDate=statusDate;
     this.statusNameAr=statusNameAr;
     this.statusNameEn=statusNameEn;
     this.note=note;
     this.image = image;
     this.jobNameAr=jobNameAr;
     this.jobNameEn=jobNameEn;
     this.fullName=fullName;
     this.createdOn=createdOn;
     this.attatchment=attatchment;
     this.redirectTechFullName=redirectTechFullName;
    }
  }