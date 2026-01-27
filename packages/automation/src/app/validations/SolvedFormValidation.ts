import {string, InferType, mixed, boolean} from 'yup'

import * as Yup from 'yup';

export const validationSolvedFormsSchema = Yup.object({
  validationCheker: boolean().nullable(), // this is for check for the validation



  Reason: string().when(
  "validationCheker",
  {
    is: (validationCheker: boolean) =>
      validationCheker === true ,
    then: string().required("MainReasonIsRequired"),
    otherwise: string().nullable(),
  }
),
  // Reason: string().required("MainReasonIsRequired"),


  // DescriptionSolved: string().when('validationCheker', {
  //   is: true,
  //   then: string().required("DescriptionSolved Is Required"),
  //   otherwise: string().nullable(),
  // }),
DescriptionSolved:string().nullable(),
  Attatchment: mixed()
  .test("fileSize", "theFileIsTooLarge", function (value) {
    if (value && value.length && value.length > 0) {
      return value[0].size <= 20000000;
    } else {
      return true;
    }
  }),
});

export type validationSolvedForms = InferType<typeof validationSolvedFormsSchema>