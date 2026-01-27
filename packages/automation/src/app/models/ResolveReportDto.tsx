export class ResolveReportDtoArray {
    data: ResolveReportDto[];
    totalPages: number=1;
    totalItems: number=10;
  
    constructor(data: ResolveReportDto[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
export class ResolveReportDto{
  createdOn:Date
  mainClassificationName :string
  mainClassificationId:string
  resolveDescription :string
  resolveName :string
  id :string
  constructor(
    createdOn:Date,
    mainClassificationName :string,
    mainClassificationId:string,
    resolveDescription :string,
    resolveName :string,
    id :string,)
     {
      this.id=id;
      this.resolveName=resolveName;
      this.resolveDescription=resolveDescription;
      this.mainClassificationId=mainClassificationId;
      this.mainClassificationName=mainClassificationName;
      this.createdOn=createdOn;
     }
 }