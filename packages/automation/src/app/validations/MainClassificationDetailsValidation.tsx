import { object, string, InferType, number, boolean, array } from "yup";

export const AddMainClassificationsDetailsSchema = object({
  title: string().required("InputFieldIsRequried"),
  titleDescription: string().required("InputFieldIsRequried"),
  mainClassificationDescription: string().required("InputFieldIsRequried"),
  catalogDescription: string().required("InputFieldIsRequried"),
  categoryDescription : string().required("InputFieldIsRequried"),
  itemDescription: string().required("InputFieldIsRequried"),
  subjectDescription: string().required("InputFieldIsRequried"),
});

export type AddMainClassificationsDetailsProps = InferType<
  typeof AddMainClassificationsDetailsSchema
>;
