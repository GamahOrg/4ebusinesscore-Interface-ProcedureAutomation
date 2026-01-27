export class ManagementModeArray {
  data: ManagementModel[];
  totalPages: number = 1;
  totalItems: number = 10;

  constructor(data: ManagementModel[], totalPages: number, totalItems: number) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}
class EmployeeModel {
  imageUrl: null | string;
  userNmae: string;
  userId: string;
  userGender: number;
  collapsed: boolean;
  checked: boolean;
  constructor(
    imageUrl: null | string,
    userNmae: string,
    userId: string,
    userGender: number,
    collapsed: boolean,
    checked: boolean,
  ){
   this.imageUrl=imageUrl;
   this.userNmae=userNmae;
   this.userId=userId;
   this.userGender=userGender;
   this.collapsed=collapsed;
   this.checked = checked;
  }
}
export class ManagementModel {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  parentId: null | string;
  mebmers: EmployeeModel[];
  collapsed: boolean;
  checked: boolean;
  userNmae?:string
  constructor(
    id: string,
    nameAr: string,
    nameEn: string,
    description: string,
    parentId: null | string,
    mebmers: EmployeeModel[],
    collapsed: boolean,
    checked: boolean,
    userNmae?:string
  ) {
    this.id = id;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.description = description;
    this.parentId = parentId;
    this.mebmers = mebmers;
    this.collapsed=collapsed;
    this.checked=checked;
    this.userNmae=userNmae
  }
}
