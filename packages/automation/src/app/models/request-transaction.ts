export class AssignRequestTransactionDto {
    comment: string;
    receivedDate?: Date;
    action: ActionOptionsAssign;
    assignRequestTransactionAttachment: AssignRequestTransactionAttachmentDto[] = [];
  
    constructor() {
      this.comment = '';
      this.receivedDate = undefined;
      this.action = ActionOptionsAssign.Save;
      this.assignRequestTransactionAttachment = [];
    }
  }
  
  export class AssignRequestTransactionAttachmentDto {
    attachmentName: string;
    attachmentURL: string;
  
    constructor() {
      this.attachmentName = '';
      this.attachmentURL = '';
    }
  }
  
  export enum ActionOptionsAssign {
    Save = 1,
    Send = 2
  }