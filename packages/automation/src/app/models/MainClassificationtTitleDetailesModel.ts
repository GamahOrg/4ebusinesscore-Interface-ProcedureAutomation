export class MainClassificationtTitleDetailesModel {
  id: string;
  title: string;
  titleDescription: string;
  mainClassificationDescription: string;
  catalogDescription: string;
  categoryDescription: string;
  itemDescription: string;
  subjectDescription: string;
  serviceType: number;
  mainClassificationId: string | null;

  constructor(
    id: string = "",
    title: string = "",
    titleDescription: string = "",
    mainClassificationDescription: string = "",
    catalogDescription: string = "",
    categoryDescription: string = "",
    itemDescription: string = "",
    subjectDescription: string = "",
    serviceType: number = 0,
    mainClassificationId: null | string = ""
  ) {
    this.id = id;
    this.title = title;
    this.titleDescription = titleDescription;
    this.mainClassificationDescription = mainClassificationDescription;
    this.catalogDescription = catalogDescription;
    this.categoryDescription = categoryDescription;
    this.itemDescription = itemDescription;
    this.subjectDescription = subjectDescription;
    this.serviceType = serviceType;
    this.mainClassificationId = mainClassificationId;
  }
}
