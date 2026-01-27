import { object, string, InferType, number } from "yup";
export const serviceCatalogSchema = object({
  name: string()
    .required("InputFieldIsRequried")
    .matches(/^[^@+]+$/, "ClassificationameMustContainOnlyArabicCharacters")
    .test(
      "no-leading-space",
      "ClassificationNameMustNotStartWithSpace",
      (value) => !value || !/^\s+/.test(value)
    ),

  priority: number()
    .positive("InputFieldIsRequried")
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  // icon: string().required("InputFieldIsRequried"),
  icon: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(<svg\b[^>]*>(.*?)<\/svg>|<.*\b(class|className)\b.*>)$/,
      "InvalidIconFormat"
    )
    .typeError("InputFieldIsRequried"),
  color: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  description: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[A-Za-z])[\u0600-\u06FF0-9\s\W_]+$/,
      "DescriptionMustContainOnlyArabicCharacters"
    ),
  mainClassificationId: string().notRequired(),
  serviceType: number()
    .positive("InputFieldIsRequried")
    .notRequired()
    .typeError("InputFieldIsRequried"),
  teamName: string().notRequired(),
  nameEn: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[\u0600-\u06FF])[a-zA-Z0-9\s\W_]+$/,
      "ClassificationameMustContainOnlyEnglishCharacters"
    )
    .test(
      "no-leading-space",
      "ClassificationNameMustNotStartWithSpace",
      (value) => !value || !/^\s+/.test(value)
    ),
  descriptionEn: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[\u0600-\u06FF])[a-zA-Z0-9\s\W_]+$/,
      "DescriptionMustContainOnlyEnglishCharacters"
    ),
});

export type serviceCatalogProps = InferType<typeof serviceCatalogSchema>;
