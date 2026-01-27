import { PriorityLevel } from "../../../enums/priority-level-enum";

export class ServiceCatalogResponse {
  data: ServiceCatalog[];
  totalPages: number;
  totalItems: number;

  constructor(
    data: ServiceCatalog[] = [],
    totalPages: number = 1,
    totalItems: number = 1
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}
export class ServiceCatalog {
  id: string;
  name: string;
  priority: PriorityLevel;
  icon: string;
  color: string;
  description: string;
  mainClassificationId: string;
  serviceType: number;
  teamName?: string;
  nameEn:string;
  descriptionEn:string;
  constructor(
    id: string,
    name: string,
    priority: PriorityLevel,
    icon: string,
    color: string,
    description: string,
    mainClassificationId: string,
    serviceType: number,
    nameEn:string,
    descriptionEn:string,
    teamName?: string,
 
  ) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.icon = icon;
    this.color = color;
    this.description = description;
    this.mainClassificationId = mainClassificationId;
    this.serviceType = serviceType;
    this.teamName = teamName;
    this.nameEn = nameEn;
    this.descriptionEn = descriptionEn;
  }
}
