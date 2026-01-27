export class ElectronicServicesResponse {
  electronicServices: ElectronicServices[];
  totalPages: number;
  totalItems: number;

  constructor(electronicServices = [], totalPages = 0, totalItems = 0) {
    this.electronicServices = electronicServices;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}
export class ElectronicServices {
  id: string;
  name: string;

  constructor() {
    this.id = "";
    this.name = "";
  }
}
