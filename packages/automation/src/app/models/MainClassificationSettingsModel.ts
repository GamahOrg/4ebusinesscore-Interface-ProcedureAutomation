export class MainClassificationSettingsModel {
  catalogDescription: string;
  categoryDescription: string;
  id: string;
  itemDescription: string;
  mainClassificationDescription: string;
  mainClassificationId: string;
  serviceType: number;
  subjectDescription: string;
  title: string;
  titleDescription: string;
  titleEn: string;
  titleDescriptionEn: string;
  mainClassificationDescriptionEn: string;
  catalogDescriptionEn: string;
  categoryDescriptionEn: string;
  itemDescriptionEn: string;
  subjectDescriptionEn: string;
  constructor(
    catalogDescription: string = "",
    categoryDescription: string = "",
    id: string = "",
    itemDescription: string = "",
    mainClassificationDescription: string = "",
    mainClassificationId: string = "",
    serviceType: number = 0,
    subjectDescription: string = "",
    title: string = "",
    titleDescription: string = "",
    titleEn: string = "",
    titleDescriptionEn: string = "",
    mainClassificationDescriptionEn: string = "",
    catalogDescriptionEn: string = "",
    categoryDescriptionEn: string = "",
    itemDescriptionEn: string = "",
    subjectDescriptionEn: string = ""
  ) {
    this.catalogDescription = catalogDescription;
    this.categoryDescription = categoryDescription;
    this.id = id;
    this.itemDescription = itemDescription;
    this.mainClassificationDescription = mainClassificationDescription;
    this.mainClassificationId = mainClassificationId;
    this.serviceType = serviceType;
    this.subjectDescription = subjectDescription;
    this.title = title;
    this.titleDescription = titleDescription;
    this.titleEn=titleEn;
    this.titleDescriptionEn=titleDescriptionEn;
    this.mainClassificationDescriptionEn=mainClassificationDescriptionEn;
    this.catalogDescriptionEn=catalogDescriptionEn
    this.categoryDescriptionEn=categoryDescriptionEn
    this.itemDescriptionEn=itemDescriptionEn
    this.subjectDescriptionEn=subjectDescriptionEn


  }
}
