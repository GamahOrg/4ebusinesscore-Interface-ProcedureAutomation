export class SubsystemModelArray {
  data: SubsystemModel[];
  totalPages: number = 1;
  totalItems: number = 10;

  constructor(data: SubsystemModel[], totalPages: number, totalItems: number) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class SubsystemModel {
  id: string;
  noteNameAr: string;
  noteNameEn: string;
  icon: string;
  createdOn?: string;
  numberOfServices?: number;
  color?: number;
  isExternal?: boolean;
  isSinglSignOn?: boolean;
  constructor(
    id: string = "",
    noteNameAr: string = "",
    noteNameEn: string = "",
    icon: string = "",
    createdOn: string = "",
    numberOfServices: number = 0,
    color?: number,
    isExternal?: boolean,
    isSinglSignOn?: boolean
  ) {
    this.id = id;
    this.noteNameAr = noteNameAr;
    this.noteNameEn = noteNameEn;
    this.icon = icon;
    this.createdOn = createdOn;
    this.numberOfServices = numberOfServices;
    this.color = color;
    this.isExternal = isExternal;
    this.isSinglSignOn = isSinglSignOn;
  }
}
