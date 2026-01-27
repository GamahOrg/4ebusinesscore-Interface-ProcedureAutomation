export class GetReportDataByIdDto {
  mainClassificationId: string;
  serviceCatalogId: string;
  categoryId: string;
  itemId: string;
  reportTitle: string;
  reportSubject?: string | null;
  reportNumber: number;
  creator: string;
  creatorEmail:string;
  createOn: Date;
  lastUpdate: Date;
  operationStatus: number;
  mainClassificationName: string;
  serviceCatalogName: string;
  categoryName: string;
  itemName: string;
  creatorName: string;
  jobNameAr: string;
  jobNameEn: string;
  responseDays: number;
  responseHours: number;
  responseMinutes: number;
  time: string;
  priorityLevel: number;
  technetionId:string;
  technicianEmail:string;
  technicianName:string;
  received:boolean;
  reportAttachments:[];
  requesterForm: any;
  requestInstanceId:string;
  commanName:string;
  serviceIntegration?:number
  constructor(
    mainClassificationId: string="",
    serviceCatalogId: string="",
    categoryId: string="",
    itemId: string="",
    reportTitle: string="",
    reportSubject: string | null ="",
    reportNumber: number=0,
    creator: string="",
    creatorEmail:string="",
    createOn: Date= new Date(),
    lastUpdate: Date= new Date(),
    operationStatus: number=0,
    mainClassificationName: string="",
    serviceCatalogName: string="",
    categoryName: string="",
    itemName: string="",
    creatorName: string="",
    jobNameAr: string="",
    jobNameEn: string="",
    responseDays: number=0,
    responseHours: number=0,
    responseMinutes: number=0,
    time: string="",
    priorityLevel: number=0,
    technetionId:string="",
    technicianEmail:string="",
    technicianName:string="",
    received:boolean=false,
    reportAttachments:[],
    requestInstanceId:string="",
    commanName:string=",",
    serviceIntegration:number=0
  ) {
    this.reportNumber = reportNumber;
    this.reportSubject = reportSubject;
    this.reportTitle = reportTitle;
    this.itemId = itemId;
    this.serviceCatalogId = serviceCatalogId;
    this.mainClassificationId = mainClassificationId;

    this.createOn = createOn;
    this.lastUpdate = lastUpdate;
    this.operationStatus = operationStatus;
    this.mainClassificationName = mainClassificationName;
    this.serviceCatalogName = serviceCatalogName;

    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.createOn = createOn;
    this.creatorName = creatorName;
    this.creator = creator;
    this.creatorEmail = creatorEmail;
    
    this.itemName = itemName;
    this.jobNameAr = jobNameAr;
    this.jobNameEn = jobNameEn;
    this.responseDays = responseDays;
    this.responseHours = responseHours;
    this.responseMinutes = responseMinutes;
    this.time = time;
    this.priorityLevel = priorityLevel;
    this.technetionId=technetionId;
    this.technicianEmail=technicianEmail;
    this.technicianName=technicianName;
    this.received=received;
    this.reportAttachments=reportAttachments;
    this.requestInstanceId=requestInstanceId;
    this.commanName=commanName;
    this.serviceIntegration=serviceIntegration
  }
}

export enum OperationStatus {
  Solved = "Solved",
  Rejected = "Rejected",
  Closed = "Closed",
  DeLay = "DeLay",
  Converted = "Converted",
  Received = "Received",
  AllReports = "AllReports",
  Late = "Late",
  Continued = "Continued",
  Requested = "Requested",
  Accepted = "Accepted",
  ReOpen = "ReOpen",
}
