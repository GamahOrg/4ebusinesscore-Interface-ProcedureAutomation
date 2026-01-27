import { Pagination } from "@4eplatform/shared/models/Pagination";

export class ResponseReport {
  reports: ReportDtos[] = [];
  pagination?: Pagination = new Pagination();
  statisticsReport: StatisticsReportDto = new StatisticsReportDto(
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  );
  constructor(
    reports: ReportDtos[],
    statisticsReport: StatisticsReportDto,
    pagination: Pagination
  ) {
    this.reports = reports;
    this.statisticsReport = statisticsReport;
    this.pagination = pagination;
  }
}

export class ReportDtos {
  public idReport: string;
  public reportNumber: number | null;
  public status: number;
  public date: Date | null;
  public lastUpdate: Date | null;
  public technicalSupportEmployee: string | null;
  public categoryName: string | null;
  public mainClassificationName: string | null;
  public itemName: string | null;
  public serviceCatalogName: string | null;
  public categoryId: string | null;
  public mainClassificationId: string | null;
  public itemId: string | null;
  public serviceCatalogId: string | null;
  public reportTitle: string;
  public reportSubject: string;
  public administrationEmployee: string | null;
  public technetionId: string | null;
  public administrationEmployeeId: string | null;
  public priorityLevel: number | null;
  public creator: string;
  public creatorEmail: string;
  time?: string;
  public commanName: string | null;
  ratingsReportStatus?: number | null;

  constructor(
    idReport: string,
    reportNumber: number | null,
    status: number,
    date: Date | null,
    lastUpdate: Date | null,
    technicalSupportEmployee: string | null,
    categoryName: string | null,
    mainClassificationName: string | null,
    itemName: string | null,
    serviceCatalogName: string | null,
    categoryId: string | null,
    mainClassificationId: string | null,
    itemId: string | null,
    serviceCatalogId: string | null,
    reportTitle: string,
    reportSubject: string,
    administrationEmployee: string | null,
    technetionId: string | null,
    administrationEmployeeId: string | null,
    priorityLevel: number | null,
    commanName: string | null,
    creator: string,
    creatorEmail: string,
    time?: string,
    ratingsReportStatus?: number | null
  ) {
    this.idReport = idReport;
    this.reportNumber = reportNumber;
    this.status = status;
    this.date = date;
    this.lastUpdate = lastUpdate;
    this.technicalSupportEmployee = technicalSupportEmployee;
    this.categoryName = categoryName;
    this.mainClassificationName = mainClassificationName;
    this.itemName = itemName;
    this.serviceCatalogName = serviceCatalogName;
    this.categoryId = categoryId;
    this.mainClassificationId = mainClassificationId;
    this.itemId = itemId;
    this.serviceCatalogId = serviceCatalogId;
    this.reportTitle = reportTitle;
    this.reportSubject = reportSubject;
    this.administrationEmployee = administrationEmployee;
    this.technetionId = technetionId;
    this.administrationEmployeeId = administrationEmployeeId;
    this.priorityLevel = priorityLevel;
    this.creator = creator;
    this.creatorEmail = creatorEmail;
    this.time = time;
    this.commanName = commanName;
    this.ratingsReportStatus = ratingsReportStatus;
  }
}

export class StatisticsReportDto {
  public allReports: number;
  public solved: number;
  public continued: number;
  public late: number;
  public rejected: number;
  public closed: number;
  public delay: number;
  public converted: number;
  public requested: number;
  public wating: number;
  public rejectinRequestTemplate: number;
  public exceptionApprove: number;
  public canceld?:number;
  constructor(
    allReports: number,
    solved: number,
    continued: number,
    late: number,
    rejected: number,
    closed: number,
    delay: number,
    converted: number,
    requested: number,
    wating: number,
    rejectinRequestTemplate: number,
    exceptionApprove: number,
    canceld?:number
  ) {
    this.allReports = allReports;
    this.solved = solved;
    this.continued = continued;
    this.late = late;
    this.rejected = rejected;
    this.closed = closed;
    this.delay = delay;
    this.converted = converted;
    this.requested = requested;
    this.wating = wating;
    this.rejectinRequestTemplate = rejectinRequestTemplate;
    this.exceptionApprove = exceptionApprove;
    this.canceld=canceld
  }
}
export enum DetermineForResponse {
  GetReportsForTechnicalSupportManager,
  GetReportsForAdministrationManager,
  GetReportsForAdministrationEmployee,
  GetReportsForTechnicalSupportEmployee,
}
