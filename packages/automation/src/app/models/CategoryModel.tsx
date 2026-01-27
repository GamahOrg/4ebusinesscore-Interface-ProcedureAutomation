import { PriorityLevel } from "../enums/priority-level-enum";
export enum Status {
  Idle = 1,
  Active = 2,
  // Add more status types if needed
}

export enum ServiceType {
  Type1 = 1,
  Type2 = 2,
  // Add more service types if needed
}

export class CategoryResponse {
  categories: Category[];
  pageIndex: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  message: string;
  statusEnum: number;

  constructor(
    categories: Category[] = [],
    pageIndex: number = 1,
    totalPages: number = 1,
    totalItems: number = 1,
    pageSize: number = 10,
    message: string = "",
    statusEnum: number = 3
  ) {
    this.categories = categories;
    this.pageIndex = pageIndex;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.pageSize = pageSize;
    this.message = message;
    this.statusEnum = statusEnum;
  }
}

export class Category{
  id?: string;
  name: string;
  priority: PriorityLevel;
  description: string;
  serviceCatalogId: string;
  parentCategoryId: string | null;
  status: Status = Status.Active;
  serviceType: ServiceType=ServiceType.Type1;
  teamName: string;
  nameEn:string;
  descriptionEn:string;
  cssClasses?:string;
    constructor(
      id: string='',
      name: string='',
      status: number=0,
      priority: PriorityLevel=PriorityLevel.Low,
      description: string='',
      serviceCatalogId: string='',
      parentCategoryId: string | null=null,
      serviceType: number=0,
      teamName: string='',
      cssClasses:string='',
      nameEn:string="",
      descriptionEn:string="",
    ) {
      this.id = id;
      this.name = name;
      this.status = status;
      this.priority = priority;
      this.description = description;
      this.serviceCatalogId = serviceCatalogId;
      this.parentCategoryId = parentCategoryId;
      this.serviceType = serviceType;
      this.teamName = teamName;
      this.cssClasses = cssClasses;
      this.nameEn = nameEn;
      this.descriptionEn=descriptionEn;
    }
}