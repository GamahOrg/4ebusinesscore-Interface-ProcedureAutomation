export class ResolveReportArray {
    data: ResolveReport[];
    totalPages: number=1;
    totalItems: number=10;
  
    constructor(data: ResolveReport[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
export class ResolveReport{
    resolveName:string
    resolveDescription:string
    mainClassificationId:string
    serviceCatalogId:string
    imageUrl:File|any
    constructor(
       imageUrl :string,
       resolveName:string,
       resolveDescription:string,
       mainClassificationId:string,
       serviceCatalogId:string)
       {
           this.imageUrl = imageUrl;
           this.mainClassificationId = mainClassificationId;
           this.resolveDescription = resolveDescription;
           this.resolveName =resolveName;
           this.serviceCatalogId = serviceCatalogId
       }
   }
   
export interface PostResolveReport{
    resolveName:string,
    resolveDescription:string,
    mainClassificationId:string,
    serviceCatalogId:string,
    imageUrl:File|any
}
interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }

  