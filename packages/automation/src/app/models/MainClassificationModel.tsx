export enum ServiceType {
  Type1 = 1,
  Type2 = 2,
}

export class MainClassificationResponse {
  mainClassifications: MainClassification[];
  totalPages: number;
  totalItems: number;

  constructor(
    mainClassifications: MainClassification[] = [],
    totalPages: number = 1,
    totalItems: number = 1
  ) {
    this.mainClassifications = mainClassifications;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}
export class MainClassification {
  id: string;
  name: string;
  orgId: string;
  admin: string;
  icon: string;
  color: string;
  description: string;
  serviceType: ServiceType;
  teamName: string;
  kpi: string;
  hasServiceCatalog: boolean;
  electronicsServicesId: string[];
  isShowInHomePage: boolean;
  electronicsServices: any;
  subSystemMainClassificationId: string;
  subSystemId: string;
  subSystemMainClassificationLookupId:string;
  admins?:string[];
  nameEn:string;
  descriptionEn:string;
  constructor() {
    this.id = "";
    this.name = "";
    this.orgId = "";
    this.admin = "";
    this.icon = "";
    this.color = "";
    this.description = "";
    this.serviceType = ServiceType.Type1;
    this.teamName = "";
    this.kpi = "";
    this.hasServiceCatalog = false;
    this.electronicsServicesId = [];
    this.isShowInHomePage = false;
    this.electronicsServices = "";
    this.subSystemMainClassificationId = "";
    this.subSystemId = "";
    this.subSystemMainClassificationLookupId="";
    this.admins=[];
    this.nameEn="";
    this.descriptionEn="";  
  }
}
