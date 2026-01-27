import { string, InferType, number, object, mixed } from "yup";

// const urlRegex =
//   /^(\/[\w\-\/=0-9]*|https?:\/\/([\w\-]+\.)*[\w\-]+\.(sa|[a-z]{2,})(\/[\w\-;=0-9]*)*(\?[\w\-=&0-9]*)?(#[\w\-]*)?)$/;

const urlRegex =
  /^(\/|https?:\/\/|www\.|[\w\-]+)([\w\-]+\.)[\w\-]+\.(sa|com|org|[a-z]{2,})(\/[\w\-;=0-9])(\?[\w\-=&])?(#[\w\-]*)?$/;

export const ValidationSFormsSchema = object({
  noteNameAr: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "NoteNameArMustBeInArabicWords")
    .typeError("InputFieldIsRequried"),
  noteNameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s@\-+=]+$/, "NoteNameEnMustBeInEnglishWords")
        .typeError("InputFieldIsRequried"),
  organizationHierarchyId: string().notRequired(),
  description: string().required("InputFieldIsRequried") 
  .matches(/^[\u0600-\u06FF\s@\-+=]+$/, "DescriptionMustContainOnlyArabicCharacters")
    .typeError("InputFieldIsRequried"),
  descriptionEn: string().required("InputFieldIsRequried")  
    .matches(/^[a-zA-Z\s@\-+=]+$/, "DescriptionMustContainOnlyEnglishCharacters")  
      .typeError("InputFieldIsRequried"),


  icon: string().required("InputFieldIsRequried").matches(/^(<svg\b[^>]*>(.*?)<\/svg>|<.*\b(class|className)\b.*>)$/, "InvalidIconFormat").typeError("InputFieldIsRequried"),
  url: string()
    .required("websiteUrlIsRequired")
    .typeError("websiteUrlIsRequired")
  ,
  color: number()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  subsytemMainId: mixed().notRequired(),
  signOn: string().nullable(),
  isExternalComponent: string().when("signOn", {
    is: "yes",
    then: string().required("InputFieldIsRequried"),
    otherwise: string().nullable(),
  }),
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
  subsytemMainLookupId: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  // ssoSecuritySettingName: string()
  //   .required("InputFieldIsRequried")
  //   .typeError("InputFieldIsRequried"),
  ssoSecuritySettingId: string().when("signOn", {
    is: "yes",
    then: string().required("InputFieldIsRequried"),
    otherwise: string().nullable()
  }),
});

export type ValidationSystemFormsProps = InferType<
  typeof ValidationSFormsSchema
>;
