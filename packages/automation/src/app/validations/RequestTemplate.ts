import { object, string, InferType, number } from "yup";
export const requestTemplateSchema = object({
  name: string().required("InputFieldIsRequried")
  .matches(/^[a-zA-Z0-9\u0600-\u06FF\s]+$/, "RequestInstanceNameMustNotContainSpecialCharacters"),
  actionOptions: number(),
  requestCategoryId: string().typeError("InputFieldIsRequried").required("InputFieldIsRequried"),
  requestTypeId: string().typeError("InputFieldIsRequried").required("InputFieldIsRequried"),
  parentRequestTemplateId: string().typeError("InputFieldIsRequried"),
  numOfSteps:number().moreThan(0).typeError("InputFieldIsRequried"),
});

export type requestTemplateSchemaProps = InferType<typeof requestTemplateSchema>;
