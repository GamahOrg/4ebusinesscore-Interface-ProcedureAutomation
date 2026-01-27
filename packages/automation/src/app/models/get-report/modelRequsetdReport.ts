export class RequsetdReportmodel {
  idReport: string;
  technicalSupportEmployeeId: string;
  reportNumber?: number;
  status: number;
  date?: Date;
  lastUpdate?: Date;
  technicalSupportEmployee?: string;
  categoryName?: string;
  mainClassificationName?: string;
  iteamName?: string;
  serviceCatalogName?: string;
  categoryId?: string;
  mainClassificationId?: string;
  iteamId?: string;
  serviceCatalogId?: string;
  reportTitle: string;
  reportSubject: string;
  administrationEmployee?: string;
 
  administrationEmployeeId?: string;
  priorityLevel?: number;
  orgNameAr?: string;
  orgNameEn?: string;
  emial?: string;
  phone?: string;
  jopNameAr?: string;
  jopNameEn?: string;
  requsetId?: string;
  time?:string;
  constructor(
    Status: number,
    TechnicalSupportEmployeeId: string,
    IdReport: string,
    ReportTitle: string,
    ReportSubject: string,
    ReportNumber?: number,
    Date?: Date,
    LastUpdate?: Date,
    TechnicalSupportEmployee?: string,
    CategoryName?: string,
    MainClassificationName?: string,
    IteamName?: string,
    ServiceCatalogName?: string,
    CategoryId?: string,
    MainClassificationId?: string,
    IteamId?: string,
    ServiceCatalogId?: string,
    AdministrationEmployee?: string,
    time?:string,
   
    AdministrationEmployeeId?: string,
    PriorityLevel?: number,
    OrgNameAr?: string,
    OrgNameEn?: string,
    Emial?: string,
    phone?: string,
    JopNameAr?: string,
    JopNameEn?: string,
    requsetId?: string
  ) {
    this.lastUpdate = LastUpdate;
    this.date = Date;
    this.reportNumber = ReportNumber;
    this.iteamId = IteamId;
    this.mainClassificationId = MainClassificationId;
    this.technicalSupportEmployee = TechnicalSupportEmployee;
    this.categoryName = CategoryName;
    this.serviceCatalogId = ServiceCatalogId;
    this.administrationEmployee = AdministrationEmployee;
    this.idReport = IdReport;
    this.status = Status;
    this.reportTitle = ReportTitle;
    this.reportSubject = ReportSubject;
    this.requsetId = requsetId;
    this.jopNameEn = JopNameEn;
    this.jopNameAr = JopNameAr;
    this.phone = phone;

    this.mainClassificationName=MainClassificationName;
    this.iteamName=IteamName;
    this.serviceCatalogName=ServiceCatalogName;
    this.categoryId=CategoryId;
    this.technicalSupportEmployeeId= TechnicalSupportEmployeeId;
    this.administrationEmployeeId= AdministrationEmployeeId;
    this.priorityLevel= PriorityLevel;
    this.orgNameAr= OrgNameAr;
    this.emial= Emial;
    this.orgNameAr= OrgNameEn;
    this.time=time;
  }
}
