import { object, string, InferType, array, mixed, number } from "yup";

export const validationReportModelSchema = object({
    ReportTitle: string().required("InputFieldIsRequried"),
    CategoryId: string().required("InputFieldIsRequried"),
    // ItemId: mixed()
    // .test(
    //     "is-valid-id",
    //     "YouMustSelectOption",
    //     (value) =>
    //         (typeof value === "number" && value > -1) ||
    //         /^[0-9a-fA-F-]{36}$/.test(value)
    // )
    ItemId: string().required("InputFieldIsRequired"),    
    ReportSubCategory: string(),
    requestUsers: mixed().typeError("InputFieldIsRequried"),
    SourceReports: array() || string() || null,
    MainClassificationId: string(),
    ServiceCatalogId: string(),
    TechnicianId: string(),
    RequesterForm: string(),
    ReportSubject: string().required("InputFieldIsRequried"),
    integretedId: string(),
    serviceIntegration: number(),
});

export type reportModelProps = InferType<typeof validationReportModelSchema>;
