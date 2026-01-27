import { object, string, InferType, number,mixed } from "yup";
export const slaSchema = object({
  slaName: string().required("InputFieldIsRequried").matches(/^[\u0600-\u06FF\s]+$/, "SlaNameMustBeInArabicWords"),
  // implementDays: number().required('InputFieldIsRequried').typeError("InputFieldIsRequried"),
  // implementHours: number().required('InputFieldIsRequried').typeError("InputFieldIsRequried"),
  // implementMinutes: number().required('InputFieldIsRequried').typeError("InputFieldIsRequried"),
  // respondMinutes: number().required('InputFieldIsRequried').typeError("InputFieldIsRequried"),
  // respondHours: number().required('InputFieldIsRequried').typeError("InputFieldIsRequried"),
  // respondDays:  number().required('InputFieldIsRequried').typeError("InputFieldIsRequried"),
  mainClassificationId: string().required("InputFieldIsRequried"),
  implementDays: number().typeError("YouMustEnterNumbers"),
  implementHours: number().typeError("YouMustEnterNumbers"),
  implementMinutes:number().typeError("YouMustEnterNumbers"),
  respondMinutes: number().typeError("YouMustEnterNumbers"),
  respondHours: number().typeError("YouMustEnterNumbers"),
  respondDays:  number().typeError("YouMustEnterNumbers"),
  description: string(),
  status: number()
    .min(1, "InputFieldIsRequried")
    .required("InputFieldIsRequried"),
})


export type slaProps = InferType<typeof slaSchema>;
