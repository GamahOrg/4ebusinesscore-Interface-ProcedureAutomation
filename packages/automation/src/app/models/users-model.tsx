export class OrgUsersModelArray {
  data: OrgUsersModel[];
  totalPages: number = 1;
  totalItems: number = 10;

  constructor(data: OrgUsersModel[], totalPages: number, totalItems: number) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class OrgUsersModel {
  orgId: string;
  orgNameAr: string;
  orgNameEn: string;
  users: UsersModel[];
  collapsed: boolean;
  checked: boolean;
  constructor(
    orgId: string,
    orgNameAr: string,
    orgNameEn: string,
    users: UsersModel[],
    collapsed: boolean,
    checked: boolean
  ) {
    this.orgId = orgId;
    this.orgNameAr = orgNameAr;
    this.orgNameEn = orgNameEn;
    this.users = users;
    this.collapsed = collapsed;
    this.checked = checked;
  }
}

class UsersModel {
  userId: undefined | string;
  userName: string;
  check: boolean;
  collapsed: boolean;
  checked: boolean;
  constructor(
    userId: undefined | string,
    userName: string,
    check: boolean,
    collapsed: boolean,
    checked: boolean
  ) {
    this.userId = userId;
    this.userName = userName;
    this.check = check;
    this.collapsed = collapsed;
    this.checked = checked;
  }
}
