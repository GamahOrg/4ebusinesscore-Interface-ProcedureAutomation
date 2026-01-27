import { string, InferType, mixed} from 'yup'
import * as Yup from 'yup';

export const validationResolverFormsSchema = Yup.object({
  resolveName: string().required('resolveNameIsRequired'),
  resolveDescription: string(),
  mainClassificationId: string().required("InputFieldIsRequried"),
  serviceCatalogId: string().required("InputFieldIsRequried"),
  imageUrl:  mixed()
  .test("fileSize", "theFileIsTooLarge", function (value) {
    if (value && value.length && value.length > 0) {
      return value[0].size <= 20000000;
    } else {
      return true;
    }
  })
})


export type validationResolverForms = InferType<typeof validationResolverFormsSchema>