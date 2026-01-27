export class rattingModel {
  id: string;
  note: string;
  ratingsReportStatus: number;
  reportId?: string;
  constructor(
    id: string,
    ratingsReportStatus: number,
    note: string,
    reportId?: string
  ) {
    this.id = id;
    this.note = note;
    this.reportId = reportId;
    this.ratingsReportStatus = ratingsReportStatus;
  }
}
