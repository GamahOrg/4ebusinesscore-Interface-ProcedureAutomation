import { object, string, InferType, number, mixed } from "yup";

export const ValidationFormsSchema = object({
  noteNameAr: string()
    .required("InputFieldIsRequried")
       .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "ServiceNameArMustBeInArabicWords")
    .typeError("InputFieldIsRequried"),
  noteNameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "ServiceNameEnMustBeInEnglishWords"),
  description: string().required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "DescriptionMustContainOnlyArabicCharacters")
    .typeError("InputFieldIsRequried"),
   descriptionEn: string().required("InputFieldIsRequried")  
    .matches(/^[a-zA-Z\s@\-+=]+$/, "DescriptionMustContainOnlyEnglishCharacters")  
      .typeError("InputFieldIsRequried"),
  icon: string().required("InputFieldIsRequried").matches(/^(<svg\b[^>]*>(.*?)<\/svg>|<.*\b(class|className)\b.*>)$/, "InvalidIconFormat").typeError("InputFieldIsRequried"),
  url: string().required("websiteUrlIsRequired").typeError("websiteUrlIsRequired"),

  color: number()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  noteTypeId: string().required("InputFieldIsRequried"),
  parentId: string().notRequired(),
  subsytemMainId: mixed().notRequired(),
  subsytemMainLookupId: string().required("InputFieldIsRequried"),
  signOn: string().nullable(),
  identityProvider: string().when("signOn", {
      is: "yes",
      then: string().required("InputFieldIsRequried"),
      otherwise: string().nullable(),
    }),
    clientId: string().when("signOn", {
      is: "yes",
      then: string().required("InputFieldIsRequried"),
      otherwise: string().nullable(),
    }),
    clientSecret: string().when("signOn", {
      is: "yes",
      then: string().required("InputFieldIsRequried"),
      otherwise: string().nullable(),
    }),
    isIntegerated:string().notRequired().nullable(),
    endPoint: string().when("isIntegrated", {
      is: (value: any) => value === "yes",
      then: (schema) => schema.required("InputFieldIsRequried"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
});
export type ValidationFormsProps = InferType<typeof ValidationFormsSchema>;
