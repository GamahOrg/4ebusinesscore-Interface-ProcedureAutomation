import { object, string, InferType, number, mixed,array } from "yup";

export const mainClassificationToEditSchema = object({
  name: string().required("InputFieldIsRequried"),
  // orgId: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  admins: array()
  .of(string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"))
  .min(1, "InputFieldIsRequried").typeError("InputFieldIsRequried"),
  // admin: mixed().notRequired(),
  icon: string().required("InputFieldIsRequried").matches(/^(<svg\b[^>]*>(.*?)<\/svg>|<.*\b(class|className)\b.*>)$/, "InvalidIconFormat").typeError("InputFieldIsRequried"),
  kpi: mixed().notRequired(),
  color: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  description: string().required("InputFieldIsRequried"),
  serviceType: number()
    .positive("InputFieldIsRequried")
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  teamName: string().notRequired(),
  subSystemMainClassificationId: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
    subSystemMainClassificationLookupId : string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
    isIntegrated:string().notRequired().nullable(),
    subSystemId: string().when("isIntegrated", {
      is: (value: any) => value === "yes",
      then: (schema) => schema.required("InputFieldIsRequried"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
});

export type mainClassificationToEditProps = InferType<
  typeof mainClassificationToEditSchema
>;
