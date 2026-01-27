export class RoleModel {
  nameAr: string;
  nameEn: string;
  roleId: string;

  constructor(nameAr: string, nameEn: string, roleId:string) {
    this.nameAr = nameAr;
    this.nameEn = nameEn;
    this.roleId = roleId;
  }
}
export class UserLoginModel {
  id: string;
  userName: string;
  imageUrl: string;
  userGender: number;
  firstName:string;
  secondName:string
  thirdName:string
  forthName:string
  roles: RoleModel[]; // Use RoleModel as the type
  constructor(
    id: string,
    userName: string,
    imageUrl: string,
    userGender: number,
    firstName:string,
    secondName:string,
    thirdName:string,
    forthName:string,
    roles: RoleModel[] // Use RoleModel as the type
  ) {
    this.id = id;
    this.userName = userName;
    this.imageUrl = imageUrl;
    this.userGender = userGender;
    this.firstName = firstName;
    this.forthName = forthName;
    this.secondName = secondName;
    this.thirdName = thirdName;
    this.roles =roles;
  }
}
