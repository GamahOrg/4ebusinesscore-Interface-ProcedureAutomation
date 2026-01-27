export class AddEscalationLevelModelArray {
    data: AddEscalationLevelModel[];
    totalPages: number = 1;
    totalItems: number = 10;
  
    constructor(
      data: AddEscalationLevelModel[],
      totalPages: number,
      totalItems: number
    ) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class AddEscalationLevelModel {
    escalationLevelName: string;
    responseMinutes: number;
    responseHours: number;
    responseDays: number;
    slaId: string;
    userId: string;
    constructor(
    escalationLevelName: string,
    responseMinutes: number,
    responseHours: number,
    responseDays: number,
    slaId: string,
    userId: string,
    ) {
      this.escalationLevelName=escalationLevelName;
      this.responseMinutes=responseMinutes;
      this.responseHours=responseHours;
      this.responseDays=responseDays;
      this.slaId=slaId;
      this.userId=userId;
  }
  }