export class ResponseStatisticsReportAdministration {
  public reports: StatisticsReportAdministration[] = [];

  constructor(reports: StatisticsReportAdministration[]) {
    this.reports = reports;
  }
}
export class StatisticsReportAdministration {
   mainClassificationId: string | null;
   mainClassificationName: string | null;
   solved: number;
   lateReport: number;
   allReports: number;

  constructor(
    mainClassificationId: string | null,
    mainClassificationName: string | null,
    solved: number,
    lateReport: number,
    allReports: number
  ) {
    this.mainClassificationId = mainClassificationId;
    this.mainClassificationName = mainClassificationName;
    this.solved = solved;
    this.lateReport = lateReport;
    this.allReports = allReports;
  }
}
