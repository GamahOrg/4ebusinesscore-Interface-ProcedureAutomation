import { object, string, InferType, number } from "yup";
export const AcceptRequestSchema = object({
  comment: string().notRequired(),
});

export type AcceptRequestSchema = InferType<typeof AcceptRequestSchema>;
