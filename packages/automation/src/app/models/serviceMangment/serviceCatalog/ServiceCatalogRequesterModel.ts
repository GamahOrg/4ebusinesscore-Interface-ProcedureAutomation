export class ServiceCatalogRequesterTechnicianModel {
  firstName: string;
  secondName: string;
  userName: string;
  userGender: number;
  email: string;
  phoneNumber: string;
  imgUrl: string;
  userId: string;
  massge: string;
  jobNameAr: string;
  jobNameEn: string;
  jobId: string;

  constructor(
    firstName: string,
    secondName: string,
    userName: string,
    userGender: number,
    email: string,
    phoneNumber: string,
    imgUrl: string,
    userId: string,
    massge: string,
    jobNameAr: string,
    jobNameEn: string,
    jobId: string
  ) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.userName = userName;
    this.userGender = userGender;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.imgUrl = imgUrl;
    this.userId = userId;
    this.massge = massge;
    this.jobNameAr = jobNameAr;
    this.jobNameEn = jobNameEn;
    this.jobId = jobId;
  }
}
