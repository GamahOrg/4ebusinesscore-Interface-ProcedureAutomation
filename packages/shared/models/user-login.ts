export class RoleModel {
  nameAr: string;
  nameEn: string;

  constructor(nameAr: string, nameEn: string) {
    this.nameAr = nameAr;
    this.nameEn = nameEn;
  }
}
export class UserLoginModel {
  id: string;
  userName: string;
  imageUrl: string;
  userGender: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  forthName: string;
  roles: RoleModel[];
  jobNameAr: string;
  jobNameEn: string;
  orgHierarchyAr?: string;
  constructor(
    id: string,
    userName: string,
    imageUrl: string,
    userGender: number,
    firstName: string,
    secondName: string,
    thirdName: string,
    forthName: string,
    roles: RoleModel[],
    jobNameAr: string,
    jobNameEn: string,
    orgHierarchyAr?: string
  ) {
    this.id = id;
    this.userName = userName;
    this.imageUrl = imageUrl;
    this.userGender = userGender;
    this.firstName = firstName;
    this.forthName = forthName;
    this.secondName = secondName;
    this.thirdName = thirdName;
    this.roles = roles;
    this.jobNameAr = jobNameAr;
    this.jobNameEn = jobNameEn;
    this.orgHierarchyAr = orgHierarchyAr;
  }
}
