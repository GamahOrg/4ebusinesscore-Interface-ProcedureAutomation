import { string, InferType, object } from "yup";

export const AddEditSystemClassificationsSchema = object({
  nameAr: string()
    .required("InputFieldIsRequried")
    // .matches(/^[\u0600-\u06FF\s]+$/, "NoteNameArMustBeInArabicWords")
    .typeError("InputFieldIsRequried"),
  nameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "NoteNameEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),
  description: string()
    .required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "DescriptionArMustBeInArabicWords").typeError("InputFieldIsRequried"),
  descriptionEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "DescriptionEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),
  icon: string().required("InputFieldIsRequried").matches(/^(<svg\b[^>]*>(.*?)<\/svg>|<.*\b(class|className)\b.*>)$/, "InvalidIconFormat").typeError("InputFieldIsRequried"),
  color: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  subsytemMainLookupId: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
});

export type AddEditSystemClassificationsProps = InferType<
  typeof AddEditSystemClassificationsSchema
>;
