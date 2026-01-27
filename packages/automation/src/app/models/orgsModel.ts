export class OrgsModelArray {
    data: OrgsModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: OrgsModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class OrgsModel {
    id: string;
    nameAr: string;
    nameEn: string;
    description: string;
    parentId: string | null;
    managerId: string | null;
    organizationMembers: any[];
    categoryId: string;
    categoryNameAr: string;
    categoryNameEn: string;
    collapsed: boolean;
    checked: boolean;
    children: OrgsModel[];
    constructor(
      id: string,
      nameAr: string,
      nameEn: string,
      description: string,
      parentId: string | null,
      managerId: string | null,
      organizationMembers: any[],
      categoryId: string,
      categoryNameAr: string,
      categoryNameEn: string,
      children: OrgsModel[]
    ) {
      this.parentId = parentId;
      this.id = id;
      this.description = description;
      this.organizationMembers = organizationMembers;
      this.nameEn = nameEn;
      this.nameAr = nameAr;
      this.managerId = managerId;
      this.categoryId = categoryId;
      this.children = children;
      this.categoryNameAr = categoryNameAr;
      this.categoryNameEn = categoryNameEn;
      this.collapsed =true;
      this.checked = false;
    }
  }
  