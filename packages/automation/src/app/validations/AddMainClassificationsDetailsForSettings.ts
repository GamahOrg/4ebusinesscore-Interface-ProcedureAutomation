import { object, string, InferType, number} from "yup";
export const AddMainClassificationsDetailsForSettingsSchema = object({
  serviceType: number().notRequired(),
  titleForOrders: string().required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "TitleArMustBeInArabicWords").typeError("InputFieldIsRequried"),
  titleDescriptionForOrders: string().required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "TitleDesArMustBeInArabicWords").typeError("InputFieldIsRequried"), 
  mainClassificationDescriptionForOrders: string().required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "MainclassificationArMustBeInArabicWords").typeError("InputFieldIsRequried"), 
  catalogDescriptionForOrders: string().required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "CatalogArMustBeInArabicWords").typeError("InputFieldIsRequried"),
  categoryDescriptionForOrders: string().required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "CategoryArMustBeInArabicWords1").typeError("InputFieldIsRequried"), 
  itemDescriptionForOrders: string().required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "ItemArMustBeInArabicWords").typeError("InputFieldIsRequried"), 
  subjectDescriptionForOrders: string().required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "SubjectArMustBeInArabicWords").typeError("InputFieldIsRequried"),  
  titleForReports: string().required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "TitleArMustBeInArabicWords").typeError("InputFieldIsRequried"),

  titleDescriptionForReports: string().required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "TitleDesArMustBeInArabicWords").typeError("InputFieldIsRequried"), 

  mainClassificationDescriptionForReports: string().required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "MainclassificationArMustBeInArabicWords").typeError("InputFieldIsRequried"), 

  catalogDescriptionForReports: string().required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "CatalogArMustBeInArabicWords").typeError("InputFieldIsRequried"),

  categoryDescriptionForReports: string().required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "CategoryArMustBeInArabicWords1").typeError("InputFieldIsRequried"), 

  itemDescriptionForReports: string().required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "ItemArMustBeInArabicWords").typeError("InputFieldIsRequried"), 

  subjectDescriptionForReports: string().required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "SubjectArMustBeInArabicWords").typeError("InputFieldIsRequried"),  

titleForOrdersEn:string().required("InputFieldIsRequried")
.matches(/^[a-zA-Z\s@\-+=]+$/, "TitleEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

titleDescriptionForOrdersEn:string().required("InputFieldIsRequried")
.matches(/^[a-zA-Z\s@\-+=]+$/, "TitleDescriptionEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

mainClassificationDescriptionForOrdersEn:string().required("InputFieldIsRequried")
.matches(/^[a-zA-Z\s@\-+=]+$/, "MainclassificationEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

catalogDescriptionForOrdersEn:string().required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "CatalogEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

categoryDescriptionForOrdersEn:string().required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "CategoryEnMustBeInEnglishWords1").typeError("InputFieldIsRequried"),

itemDescriptionForOrdersEn:string().required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "ItemEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

subjectDescriptionForOrdersEn:string().required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "SubjectEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),




    titleForReportsEn:string().required("InputFieldIsRequried")
.matches(/^[a-zA-Z\s@\-+=]+$/, "TitleEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

titleDescriptionForReportsEn:string().required("InputFieldIsRequried")
.matches(/^[a-zA-Z\s@\-+=]+$/, "TitleDescriptionEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

mainClassificationDescriptionForReportsEn:string().required("InputFieldIsRequried")
.matches(/^[a-zA-Z\s@\-+=]+$/, "MainclassificationEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

catalogDescriptionForReportsEn:string().required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "CatalogEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

categoryDescriptionForReportsEn:string().required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "CategoryEnMustBeInEnglishWords1").typeError("InputFieldIsRequried"),

itemDescriptionForReportsEn:string().required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "ItemEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),

subjectDescriptionForReportsEn:string().required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "SubjectEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),





});



export type AddMainClassificationsDetailsForSettingsProps = InferType<
  typeof AddMainClassificationsDetailsForSettingsSchema
>;
