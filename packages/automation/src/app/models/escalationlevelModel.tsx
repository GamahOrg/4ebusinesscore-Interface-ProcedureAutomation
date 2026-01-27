export class EscalationLevelModelArray {
  data: EscalationLevelModel[];
  totalPages: number = 1;
  totalItems: number = 10;

  constructor(
    data: EscalationLevelModel[],
    totalPages: number,
    totalItems: number
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class EscalationLevelModel {
  id: string;
  escalationLevelName: string;
  levelIndex: number;
  responseMinutes: number;
  responseHours: number;
  responseDays: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  fourthName: string;
  slaId: string;
  userId: string;
  constructor(
  id: string,
  escalationLevelName: string,
  levelIndex: number,
  responseMinutes: number,
  responseHours: number,
  responseDays: number,
  firstName: string,
  secondName: string,
  thirdName: string,
  fourthName: string,
  slaId: string,
  userId: string,
  ) {
    this.id=id;
    this.escalationLevelName=escalationLevelName;
    this.levelIndex=levelIndex;
    this.responseMinutes=responseMinutes;
    this.responseHours=responseHours;
    this.responseDays=responseDays;
    this.firstName=firstName;
    this.secondName=secondName;
    this.thirdName=thirdName;
    this.fourthName=fourthName;
    this.slaId=slaId;
    this.userId=userId;
}
}