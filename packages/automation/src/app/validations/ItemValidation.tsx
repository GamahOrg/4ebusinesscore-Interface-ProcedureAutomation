import { object, string, InferType, number, mixed } from "yup";
export const itemSchema = object({
  name: string()
    .required("InputFieldIsRequried")
    .matches(/^[^@+]+$/, "ItemnameMustContainOnlyArabicCharacters")
    .typeError("InputFieldIsRequried")
    .test(
      "no-leading-space",
      "ItemNameMustNotStartWithSpace",
      (value) => !value || !/^\s+/.test(value)
    ),
  duration: string().notRequired(),
  effect: mixed().notRequired().typeError("InputFieldIsRequried"),
  // effect: number().notRequired()
  //   .positive("InputFieldIsRequried")
  //   .required("InputFieldIsRequried")
  //   .typeError("InputFieldIsRequried"),
  priorityLevel: number()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  // priorityLevel: number()
  //   .positive("InputFieldIsRequried")
  //   .required("InputFieldIsRequried")
  //   .typeError("InputFieldIsRequried"),
  description: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[A-Za-z])[\u0600-\u06FF0-9\s\W_]+$/,
      "ItemDesMustContainOnlyArabicCharacters"
    ),
  slaId: string().required("InputFieldIsRequried"),
  serviceType: number()
    .positive("InputFieldIsRequried")
    .notRequired()
    .typeError("InputFieldIsRequried"),
  // categoryId: string().required("InputFieldIsRequried"),
  categoryId: string().notRequired(),
  // requestFor: number().positive("InputFieldIsRequried").notRequired().typeError("InputFieldIsRequried"),
  requestFor: number()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  // technicianSelection: number().positive("InputFieldIsRequried").required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  technicianSelection: number().notRequired(),
  requestTempleteName: string().notRequired(),
  isIntegrated: string().notRequired().nullable(),
  workspaceServiceID: string().when("isIntegrated", {
    is: (value: any) => value === "yes",
    then: (schema) => schema.required("InputFieldIsRequried"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  nameEn: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[\u0600-\u06FF])[a-zA-Z0-9\s\W_]+$/,
      "ItemnameMustContainOnlyEnglishCharacters"
    )
    .typeError("InputFieldIsRequried")
    .test(
      "no-leading-space",
      "ItemNameMustNotStartWithSpace",
      (value) => !value || !/^\s+/.test(value)
    ),
  descriptionEn: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[\u0600-\u06FF])[a-zA-Z0-9\s\W_]+$/,
      "ItemDesMustContainOnlyEnglishCharacters"
    ),
});
export type itemProps = InferType<typeof itemSchema>;
