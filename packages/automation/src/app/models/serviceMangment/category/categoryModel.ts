export class DomainsModel {
  id: string;
  createdOn: Date;
  updatedOn: Date;
  domainName: string;
  domainNickName: string;
  userName: string;
  email: string;
  isActive: boolean;
  password?: string;
  constructor(
    id: string = "",
    createdOn: Date = new Date(),
    updatedOn: Date = new Date(),
    domainName: string = "",
    domainNickName: string = "",
    userName: string = "",
    email: string = "",
    isActive: boolean = false,
    password?: string
  ) {
    this.id = id;
    this.createdOn = createdOn;
    this.domainName = domainName;
    this.domainNickName = domainNickName;
    this.email = email;
    this.isActive = isActive;
    this.updatedOn = updatedOn;
    this.userName = userName;
    this.password = password;
  }
}
