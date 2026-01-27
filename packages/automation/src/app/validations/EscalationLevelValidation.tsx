import { string,InferType,number,object} from 'yup'

export const EscalationLevelSchema = object({
  escalationLevelName: string().required('InputFieldIsRequried'),
  responseMinutes: number().typeError("MinutesMustBeANumber"),
  responseHours: number().typeError("HoursMustBeANumber"),
  responseDays:  number().typeError("DaysMustBeANumber"),
  userId: string().required('InputFieldIsRequried'),

})


export type EscalationLevelProps = InferType<typeof EscalationLevelSchema>