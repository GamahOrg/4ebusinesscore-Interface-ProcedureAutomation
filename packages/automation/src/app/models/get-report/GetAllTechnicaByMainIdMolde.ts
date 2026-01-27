export class TechByMainResponse {
  Techs: Tech[] = [];
  totalPages: number;
  totalItems: number;
  constructor(Techs: Tech[], totalPages: number, totalItems: number) {
    this.Techs = Techs;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
  }
}
export class Tech {
  mainClassificationId: string;
  technicianId: string;
  email: string;
  fullName: string;
  constructor(
    mainClassificationId: string="",
    technicianId: string="",
    email: string="",
    fullName: string=""
  ) {
    this.mainClassificationId = mainClassificationId;
    this.technicianId = technicianId;
    this.email = email;
    this.fullName = fullName;
  }
}
