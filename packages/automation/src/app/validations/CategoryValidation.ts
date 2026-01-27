import { object, string, InferType, number } from "yup";
export const categorySchema = object({
  name: string()
    .required("InputFieldIsRequried")
    .matches(/^[^@+]+$/, "SubcategorynameMustContainOnlyArabicCharacters1")
    .typeError("InputFieldIsRequried")
    .test(
      "no-leading-space",
      "CategoryNameMustNotStartWithSpace",
      (value) => !value || !/^\s+/.test(value)
    ),
  status: number()
    .positive()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  priority: number()
    .positive("InputFieldIsRequried")
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  description: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[A-Za-z])[\u0600-\u06FF0-9\s\W_]+$/,
      "SubcategoryDesMustContainOnlyArabicCharacters1"
    )
    .typeError("InputFieldIsRequried"),
  serviceType: number()
    .positive("InputFieldIsRequried")
    .notRequired()
    .typeError("InputFieldIsRequried"),
  nameEn: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[\u0600-\u06FF])[a-zA-Z0-9\s\W_]+$/,
      "SubcategorynameMustContainOnlyEnglishCharacters1"
    )
    .typeError("InputFieldIsRequried")
    .test(
      "no-leading-space",
      "CategoryNameMustNotStartWithSpace",
      (value) => !value || !/^\s+/.test(value)
    ),
  descriptionEn: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[\u0600-\u06FF])[a-zA-Z0-9\s\W_]+$/,
      "SubcategoryDesMustContainOnlyEnglishCharacters1"
    )
    .typeError("InputFieldIsRequried"),
});

export type categoryProps = InferType<typeof categorySchema>;
