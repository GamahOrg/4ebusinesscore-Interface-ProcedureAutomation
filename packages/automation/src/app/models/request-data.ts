export class RequestDataModelArray {
  data: RequestDataModel[];
  totalPages: number = 1;
  totalItems: number = 10;

  constructor(
    data: RequestDataModel[],
    totalPages: number,
    totalItems: number
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class RequestDataModel {
  mainClassificationId: string;
  serviceCatalogId: string;
  categoryId: string;
  itemId: string;
  technicianId: string;
  requestInstanceId: string;
  reportTitle: string;
  reportSubject: string;
  requestNumber: string;
  reportNumber: number;
  requestType: number;
  requesterForm: string;
  reportAttachments: reportAttachmentsModel[];
  sourceReports: [];
  dependentReport: [];
  operationReports: [];
  consentRequests: [];
  ratingsReports: [];
  rate?:number;
  item: string;
  constructor(
    mainClassificationId: string,
    serviceCatalogId: string,
    categoryId: string,
    itemId: string,
    technicianId: string,
    requestInstanceId: string,
    reportTitle: string,
    reportSubject: string,
    requestNumber: string,
    reportNumber: number,
    requestType: number,
    requesterForm: string,
    reportAttachments: reportAttachmentsModel[],
    sourceReports: [],
    dependentReport: [],
    operationReports: [],
    consentRequests: [],
    ratingsReports: [],
    rate:0,
    item: string,
  ) {
    this.mainClassificationId = mainClassificationId;
    this.serviceCatalogId = serviceCatalogId;
    this.categoryId = categoryId;
    this.itemId = itemId;
    this.technicianId = technicianId;
    this.requestInstanceId = requestInstanceId;
    this.reportTitle = reportTitle;
    this.reportSubject = reportSubject;
    this.requestNumber = requestNumber;
    this.reportNumber = reportNumber;
    this.requestType = requestType;
    this.requesterForm = requesterForm;
    this.reportAttachments = reportAttachments;
    this.sourceReports = sourceReports;
    this.dependentReport = dependentReport;
    this.operationReports = operationReports;
    this.consentRequests = consentRequests;
    this.ratingsReports = ratingsReports;
    this.rate=rate
    this.item=item
  }
}

export class reportAttachmentsModel {
  fileUrl: string;
  reportId: string;

  constructor(fileUrl: string, reportId: string) {
    this.fileUrl = fileUrl;
    this.reportId = reportId;
  }
}
