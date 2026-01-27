import { object, string, InferType, number, mixed, array } from "yup";

export const mainClassificationSchema = object({
  name: string()
    .required("InputFieldIsRequried")
    .matches(/^[^@+]+$/, "NameMustNotContainSpecialCharacters")
    .typeError("InputFieldIsRequried")
    .test(
      "no-leading-space",
      "ClassificationNameMustNotStartWithSpace",
      (value) => !value || !/^\s+/.test(value)
    ),

  // orgId: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  admins: array()
    .of(
      string()
        .required("InputFieldIsRequried")
        .typeError("InputFieldIsRequried")
    )
    .min(1, "InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  // admin: mixed().notRequired(),
  icon: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(<svg\b[^>]*>(.*?)<\/svg>|<.*\b(class|className)\b.*>)$/,
      "InvalidIconFormat"
    )
    .typeError("InputFieldIsRequried"),
  kpi: string()
    .nullable()
    .notRequired()
    .matches(/^(https?:\/\/[^\s]+|www\.[^\s]+|\/[^\s]+|[^\s]+\.[^\s]+)$/i, {
      message: "PleaseEnterAValidURL",
      excludeEmptyString: true,
    }),
  color: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  description: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[A-Za-z])[\u0600-\u06FF0-9\s\W_]+$/,
      "ClassificationdesMustContainOnlyArabicCharacters"
    )
    .typeError("InputFieldIsRequried"),
  serviceType: number()
    .positive("InputFieldIsRequried")
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  teamName: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  subSystemMainClassificationId: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  subSystemMainClassificationLookupId: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  isIntegrated: string().notRequired().nullable(),
  subSystemId: string().when("isIntegrated", {
    is: (value: any) => value === "yes",
    then: (schema) => schema.required("InputFieldIsRequried"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  nameEn: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[\u0600-\u06FF])[a-zA-Z0-9\s\W_]+$/,
      "ClassificationameMustContainOnlyEnglishCharacters"
    )
    .typeError("InputFieldIsRequried")
    .test(
      "no-leading-space",
      "ClassificationNameMustNotStartWithSpace",
      (value) => !value || !/^\s+/.test(value)
    ),
  descriptionEn: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(?!.*[@+])(?!.*[\u0600-\u06FF])[a-zA-Z0-9\s\W_]+$/,
      "ClassificationdesMustContainOnlyEnglishCharacters"
    )
    .typeError("InputFieldIsRequried"),
});

export type mainClassificationProps = InferType<
  typeof mainClassificationSchema
>;
