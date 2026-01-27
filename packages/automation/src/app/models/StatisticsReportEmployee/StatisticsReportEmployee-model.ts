export class ResponseStatisticsReportEmployee {
  public reports: StatisticsReportEmployee[] = [];

  constructor(reports: StatisticsReportEmployee[]) {
    this.reports = reports;
  }
}
export class StatisticsReportEmployee {
   userId: string | null;
   userName: string | null;
   solved: number;
   lateReport: number;
   allReports: number;

  constructor(
    userId: string | null,
    userName: string | null,
    solved: number,
    lateReport: number,
    allReports: number
  ) {
    this.userId = userId;
    this.userName = userName;
    this.solved = solved;
    this.lateReport = lateReport;
    this.allReports = allReports;
  }
}
