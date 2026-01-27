export class OthersReportsResponseModel {
  reports: OtherReportModel[];
  totalPages: number;
  totalItems: number;
  
  constructor(
    reports: OtherReportModel[] = [],
    totalPages: number = 1,
    totalItems: number = 10
  ) {
    this.reports = reports;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

//for incomming reports
export class OtherReportModel {
  id: string;
  reportNumber: number;
  reportTitle: string;

  constructor(
    id: string = '',
    reportNumber: number = 0,
    reportTitle: string = '',
  ) {
    this.id = id;
    this.reportNumber = reportNumber;
    this.reportTitle = reportTitle;
    
  }
}

//for current report data
export class ReportModel {
  MainClassificationId: string;
  ServiceCatalogId: string;
  CategoryId: string;
  ItemId: string;
  ReportSubCategory: string;
  ReportTitle: string;
  ReportSubject: string;
  TechnicianId: string;
  SourceReports: string[];
  DependentReports: string[];
  AttachmentDTOs: File[];
  RequesterForm?:string
  constructor(
    MainClassificationId: string = '',
    ServiceCatalogId: string = '',
    CategoryId: string = '',
    ItemId: string = '',
    ReportSubCategory:string='',
    ReportTitle: string = '',
    ReportSubject: string = '',
    TechnicianId: string = '',
    SourceReports: string[] = [],
    DependentReports: string[] = [],
    AttachmentDTOs: File[]=[],
    RequesterForm?:string

  ) {
    this.MainClassificationId = MainClassificationId;
    this.ServiceCatalogId = ServiceCatalogId;
    this.CategoryId = CategoryId;
    this.ItemId = ItemId;
    this.ReportTitle = ReportTitle;
    this.ReportSubject = ReportSubject;
    this.TechnicianId = TechnicianId;
    this.SourceReports = SourceReports;
    this.DependentReports = DependentReports;
    this.AttachmentDTOs = AttachmentDTOs;
    this.ReportSubCategory = ReportSubCategory;
    this.RequesterForm=RequesterForm
  }
}