export class ResolveDetails{
    imageUrl :string
    mainClassificationName :string
    mainClassificationId :string
    serviceCatalogId :string
    serviceCatalogName :string
    resolveDescription :string
    resolveName :string
    createdOn :string
    createdBy :string
    updatedOn :string
    creatorName  :string
    timeOfCreation:string
    constructor(
       imageUrl :string,
       mainClassificationName :string,
       mainClassificationId :string,
       serviceCatalogId :string,
       serviceCatalogName :string,
       resolveDescription :string,
       resolveName :string,
       createdOn :string,
       createdBy :string,
       updatedOn :string,
       creatorName  :string,
       timeOfCreation:string)
       {
           this.createdBy = createdBy;
           this.createdOn = createdOn;
           this.creatorName= creatorName;
           this.imageUrl = imageUrl;
           this.mainClassificationId = mainClassificationId;
           this.mainClassificationName = mainClassificationName;
           this.resolveDescription = resolveDescription;
           this.resolveName =resolveName;
           this.serviceCatalogId = serviceCatalogId
           this.serviceCatalogName =serviceCatalogName;
           this.updatedOn = updatedOn;
           this.timeOfCreation=timeOfCreation;
       }
   }
   