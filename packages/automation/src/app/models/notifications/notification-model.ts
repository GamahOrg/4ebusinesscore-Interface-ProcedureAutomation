export class NotificationModel {

    id:string;
    workspaceNameAR:string;
    workspaceNameEn:string;
    sendByMail:boolean;
    sendBySystem:boolean;
    notificationStatus:string;
    notificationStatusAr?:string

    constructor(
      id:string="",
      workspaceNameAR:string="",
      workspaceNameEn:string="",
      sendByMail:boolean=true,
      sendBySystem:boolean=true,
      notificationStatus:string="",
      notificationStatusAr:string=""


    ) {
    this.id=id;
    this.workspaceNameAR=workspaceNameAR;
    this.workspaceNameEn=workspaceNameEn;
    this.sendByMail=sendByMail;
    this.sendBySystem=sendBySystem;
    this.notificationStatus=notificationStatus;
    this.notificationStatusAr=notificationStatusAr
    }
  }