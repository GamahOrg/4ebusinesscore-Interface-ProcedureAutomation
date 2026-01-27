import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { MainClassificationSettingsModel } from "../../../../models/MainClassificationSettingsModel";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { AddMainClassificationsDetailsForSettingsProps } from "../../../../validations/AddMainClassificationsDetailsForSettings";
type ScreenDetailsProps = {
  register?: UseFormRegister<AddMainClassificationsDetailsForSettingsProps>;
  setValue?: UseFormSetValue<AddMainClassificationsDetailsForSettingsProps>;
  formValues?: AddMainClassificationsDetailsForSettingsProps;
  errors?: FieldErrors<AddMainClassificationsDetailsForSettingsProps>;
  id: string;
  ordersSettings?: MainClassificationSettingsModel[];
  reportsSettings?: MainClassificationSettingsModel[];
};

export const EditScreenSettingsTab: FC<ScreenDetailsProps> = ({
  register,
  setValue,
  formValues,
  errors,
  id,
  ordersSettings,
  reportsSettings,
}) => {
  const intl = useIntl();
  // let mainClassification = useAppSelector((state: RootState) => {
  //   return state?.mainClassificationById?.data;
  // });
  let [aboutData, setAboutData] = useState<any>([
    {
      id: 1,
      title: "OrdersScreenSettings",
      expanded: true,
      img: "fas fa-sticky-note",
      theme: "danger",
      serviceType: 2,
    },
    {
      id: 2,
      title: "ReportsScreenSettings",
      expanded: false,
      img: "fas fa-sticky-note",
      theme: "danger",
      serviceType: 3,
    },
  ]);
  // useEffect(() => {
  //   setValue?.("serviceType", mainClassification?.serviceType);
  // }, [mainClassification]);

  useEffect(() => {
    if (Array.isArray(ordersSettings) && ordersSettings?.slice(-1)[0]?.id) {
      let lastOrder = ordersSettings?.slice(-1)[0];

      setValue?.("catalogDescriptionForOrders", lastOrder?.catalogDescription);
      setValue?.(
        "categoryDescriptionForOrders",
        lastOrder?.categoryDescription,
      );
      setValue?.("itemDescriptionForOrders", lastOrder?.itemDescription);
      setValue?.(
        "mainClassificationDescriptionForOrders",
        lastOrder?.mainClassificationDescription,
      );
      setValue?.("subjectDescriptionForOrders", lastOrder?.subjectDescription);
      setValue?.("titleDescriptionForOrders", lastOrder?.titleDescription);
      setValue?.("titleForOrders", lastOrder?.title);

      setValue?.("titleForOrdersEn", lastOrder?.titleEn || "Add a new service");
      setValue?.(
        "titleDescriptionForOrdersEn",
        lastOrder?.titleDescriptionEn || "Service address",
      );
      setValue?.(
        "mainClassificationDescriptionForOrdersEn",
        lastOrder?.mainClassificationDescriptionEn || "Main classification",
      );
      setValue?.(
        "catalogDescriptionForOrdersEn",
        lastOrder?.catalogDescriptionEn || "Catalog",
      );
      setValue?.(
        "categoryDescriptionForOrdersEn",
        lastOrder?.categoryDescriptionEn || "Category",
      );
      setValue?.(
        "itemDescriptionForOrdersEn",
        lastOrder?.itemDescriptionEn || "Item",
      );
      setValue?.(
        "subjectDescriptionForOrdersEn",
        lastOrder?.subjectDescriptionEn || "Service subject",
      );
    }
  }, [ordersSettings]);
  useEffect(() => {
    if (Array.isArray(reportsSettings) && reportsSettings?.slice(-1)[0]?.id) {
      let lastReport = reportsSettings?.slice(-1)[0];
      setValue?.(
        "catalogDescriptionForReports",
        lastReport?.catalogDescription as string,
      );
      setValue?.(
        "categoryDescriptionForReports",
        lastReport?.categoryDescription as string,
      );
      setValue?.(
        "itemDescriptionForReports",
        lastReport?.itemDescription as string,
      );
      setValue?.(
        "mainClassificationDescriptionForReports",
        lastReport?.mainClassificationDescription as string,
      );
      setValue?.(
        "subjectDescriptionForReports",
        lastReport?.subjectDescription as string,
      );
      setValue?.(
        "titleDescriptionForReports",
        lastReport?.titleDescription as string,
      );
      setValue?.("titleForReports", lastReport?.title as string);

      setValue?.(
        "titleForReportsEn",
        (lastReport?.titleEn as string) ||
          "Add a report about an existing service",
      );
      setValue?.(
        "titleDescriptionForReportsEn",
        (lastReport?.titleDescriptionEn as string) || "Report title",
      );
      setValue?.(
        "mainClassificationDescriptionForReportsEn",
        (lastReport?.mainClassificationDescriptionEn as string) ||
          "Main classification",
      );
      setValue?.(
        "catalogDescriptionForReportsEn",
        (lastReport?.catalogDescriptionEn as string) || "Catalog",
      );

      setValue?.(
        "categoryDescriptionForReportsEn",
        (lastReport?.categoryDescriptionEn as string) || "Category",
      );
      setValue?.(
        "itemDescriptionForReportsEn",
        (lastReport?.itemDescriptionEn as string) || "Item",
      );
      setValue?.(
        "subjectDescriptionForReportsEn",
        (lastReport?.subjectDescriptionEn as string) || "Service subject",
      );
    }
  }, [reportsSettings]);
  const toggleAccordion = (id: number) => {
    setAboutData((prev: any) =>
      prev.map((data: any) => {
        if (data.id === id) return { ...data, expanded: !data.expanded };
        else return data;
      }),
    );
  };
  let language: string = intl.locale;

  return (
    <Fragment>
      <div className="row mb-3 d-flex align-items-center scroll-y mh-450px">
        <div className="col-12 mb-5">
          {aboutData?.map((data: any, index: number) => (
            <div
              className="accordion"
              id={`accordionExample${data.id}`}
              key={data.id}
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id={`headingThree${data.id}`}>
                  <button
                    className={`accordion-button bg-light-primary`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseThree${data.id}`}
                    aria-expanded={data.expanded ? "true" : "false"}
                    aria-controls={`collapseThree${data.id}`}
                    onClick={() => {
                      toggleAccordion(data.id);
                    }}
                  >
                    <div className="fw-bolder d-flex align-items-center">
                      <i className={`${data.img} fs-1 text-primary`}></i>
                      <div className="mx-5">
                        <p className="mb-2 d-flex justify-content-start fs-3 text-black ">
                          {intl.formatMessage({ id: data.title })}
                        </p>
                      </div>
                    </div>
                    <div className="flex-grow-1 text-success mx-2">
                      <span className="accordion-arrow">
                        <i
                          className={`bi bi-chevron-${
                            data.expanded ? "up" : "down"
                          } text-black fs-1`}
                        ></i>
                      </span>
                    </div>
                  </button>
                </h2>
                <div
                  id={`collapseThree${data.id}`}
                  className={`accordion-collapse collapse ${
                    data.expanded ? "show" : ""
                  }`}
                  aria-labelledby={`headingThree${data.id}`}
                  data-bs-parent={`#accordionExample${data.id}`}
                >
                  <div className="accordion-body">
                    <div
                      className="p-2 fs-5"
                      style={{ lineHeight: "2.5", fontWeight: "800" }}
                    >
                      {data.id === 1 ? (
                        <>
                          <div className="row mb-2">
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="title"
                                  className={`form-label px-2 fontSz-6 required`}
                                >
                                  {intl.formatMessage({
                                    id: "AddCardInAr",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-clipboard-list special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "AddCardInAr",
                                    })}
                                    {...register?.("titleForOrders")}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.titleForOrders?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* title in english */}
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="titleEn"
                                  className={`form-label px-2 fontSz-6 required`}
                                >
                                  {intl.formatMessage({
                                    id: "AddCardInEn",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-clipboard-list special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="titleEn"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "AddCardInEn",
                                    })}
                                    {...register?.("titleForOrdersEn")}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.titleForOrdersEn?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="titleDescription"
                                  className="form-label px-2 fontSz-6 required"
                                >
                                  {intl.formatMessage({
                                    id: "ServiceTitleInAr",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-clipboard-list special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="titleDescription"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "ServiceTitleInAr",
                                    })}
                                    {...register?.("titleDescriptionForOrders")}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.titleDescriptionForOrders
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* title des in en */}
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="titleDescriptionEn"
                                  className="form-label px-2 fontSz-6 required"
                                >
                                  {intl.formatMessage({
                                    id: "ServiceTitleInEn",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-clipboard-list special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="titleDescriptionEn"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "ServiceTitleInEn",
                                    })}
                                    {...register?.(
                                      "titleDescriptionForOrdersEn",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.titleDescriptionForOrdersEn
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="MainClassification"
                                  className="form-label px-2 fontSz-6 required"
                                >
                                  {intl.formatMessage({
                                    id: "MainClassificationInAr",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-globe-asia special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="MainClassification"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "MainClassificationInAr",
                                    })}
                                    {...register?.(
                                      "mainClassificationDescriptionForOrders",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors
                                      ?.mainClassificationDescriptionForOrders
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* mainclassification in english */}
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="MainClassificationEn"
                                  className="form-label px-2 fontSz-6 required"
                                >
                                  {intl.formatMessage({
                                    id: "MainClassificationInEn",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-globe-asia special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="MainClassificationEn"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "MainClassificationInEn",
                                    })}
                                    {...register?.(
                                      "mainClassificationDescriptionForOrdersEn",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors
                                      ?.mainClassificationDescriptionForOrdersEn
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="SubCategory"
                                  className="form-label px-2 fontSz-6 required "
                                >
                                  {intl.formatMessage({
                                    id: "SubCategoryInAr",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-layer-group special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="SubCategory"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "SubCategoryInAr",
                                    })}
                                    {...register?.(
                                      "catalogDescriptionForOrders",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.catalogDescriptionForOrders
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* التصنيف الفرعى en */}
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="SubCategoryEn"
                                  className="form-label px-2 fontSz-6 required "
                                >
                                  {intl.formatMessage({
                                    id: "SubCategoryInEn",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-layer-group special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="SubCategoryEn"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "SubCategoryInEn",
                                    })}
                                    {...register?.(
                                      "catalogDescriptionForOrdersEn",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.catalogDescriptionForOrdersEn
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="RequestType"
                                  className="form-label px-2 fontSz-6 required"
                                >
                                  {intl.formatMessage({ id: "CategoryInAr" })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fad fa-file special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="RequestType"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "CategoryInAr",
                                    })}
                                    {...register?.(
                                      "categoryDescriptionForOrders",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.categoryDescriptionForOrders
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                            {/*  category in en  */}
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="RequestTypeEn"
                                  className="form-label px-2 fontSz-6 required"
                                >
                                  {intl.formatMessage({ id: "CategoryInEn" })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fad fa-file special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="RequestTypeEn"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "CategoryInEn",
                                    })}
                                    {...register?.(
                                      "categoryDescriptionForOrdersEn",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.categoryDescriptionForOrdersEn
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="Clause"
                                  className="form-label px-2 fontSz-6 required "
                                >
                                  {intl.formatMessage({
                                    id: "ClauseInAr",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fad fa-layer-plus special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="Clause"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "ClauseInAr",
                                    })}
                                    {...register?.("itemDescriptionForOrders")}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.itemDescriptionForOrders
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* item in en */}
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="ClauseEn"
                                  className="form-label px-2 fontSz-6 required "
                                >
                                  {intl.formatMessage({
                                    id: "ClauseInEn",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fad fa-layer-plus special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="ClauseEn"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "ClauseInEn",
                                    })}
                                    {...register?.(
                                      "itemDescriptionForOrdersEn",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.itemDescriptionForOrdersEn
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="ServiceContent"
                                  className="form-label px-2 fontSz-6 required"
                                >
                                  {intl.formatMessage({
                                    id: "ServiceContentInAr",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-sticky-note special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="ServiceContent"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "ServiceContentInAr",
                                    })}
                                    {...register?.(
                                      "subjectDescriptionForOrders",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.subjectDescriptionForOrders
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* service in en */}
                            <div className="col-12 col-lg-4">
                              <div className="mb-1 py-1">
                                <label
                                  htmlFor="ServiceContentEn"
                                  className="form-label px-2 fontSz-6 required"
                                >
                                  {intl.formatMessage({
                                    id: "ServiceContentInEn",
                                  })}
                                </label>
                                <div className="input-group mt-1">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-sticky-note special"></i>
                                    </span>
                                  </div>
                                  <input
                                    id="ServiceContentEn"
                                    type="text"
                                    className="form-control"
                                    placeholder={intl.formatMessage({
                                      id: "ServiceContentInEn",
                                    })}
                                    {...register?.(
                                      "subjectDescriptionForOrdersEn",
                                    )}
                                  />
                                  {DisplayErrorMessage(
                                    errors?.subjectDescriptionForOrdersEn
                                      ?.message as string,
                                    intl,
                                    language,
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : data.id === 2 ? (
                        <>
                          <>
                            <div className="row mb-2">
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="title"
                                    className="form-label px-2 fontSz-6 required "
                                  >
                                    {intl.formatMessage({
                                      id: "AddReportInAr",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-clipboard-list special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="title"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "AddReportInAr",
                                      })}
                                      {...register?.("titleForReports")}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.titleForReports
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="titleEn"
                                    className="form-label px-2 fontSz-6 required "
                                  >
                                    {intl.formatMessage({
                                      id: "AddReportInEn",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-clipboard-list special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="titleEn"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "AddReportInEn",
                                      })}
                                      {...register?.("titleForReportsEn")}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.titleForReportsEn
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="titleDescription"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "ReportTitleInAr",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-clipboard-list special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="titleDescription"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "ReportTitleInAr",
                                      })}
                                      {...register?.(
                                        "titleDescriptionForReports",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.titleDescriptionForReports
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="titleDescriptionEn"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "ReportTitleInEn",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-clipboard-list special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="titleDescriptionEn"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "ReportTitleInEn",
                                      })}
                                      {...register?.(
                                        "titleDescriptionForReportsEn",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.titleDescriptionForReportsEn
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="MainClassification"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "MainClassificationInAr",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-globe-asia special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="MainClassification"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "MainClassificationInAr",
                                      })}
                                      {...register?.(
                                        "mainClassificationDescriptionForReports",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors
                                        ?.mainClassificationDescriptionForReports
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="MainClassificationEn"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "MainClassificationInEn",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-globe-asia special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="MainClassificationEn"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "MainClassificationInEn",
                                      })}
                                      {...register?.(
                                        "mainClassificationDescriptionForReportsEn",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors
                                        ?.mainClassificationDescriptionForReportsEn
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="SubCategory"
                                    className="form-label px-2 fontSz-6 required "
                                  >
                                    {intl.formatMessage({
                                      id: "SubCategoryInAr",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-layer-group special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="SubCategory"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "SubCategoryInAr",
                                      })}
                                      {...register?.(
                                        "catalogDescriptionForReports",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.catalogDescriptionForReports
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="SubCategoryEn"
                                    className="form-label px-2 fontSz-6 required "
                                  >
                                    {intl.formatMessage({
                                      id: "SubCategoryInEn",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-layer-group special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="SubCategoryEn"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "SubCategoryInEn",
                                      })}
                                      {...register?.(
                                        "catalogDescriptionForReportsEn",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.catalogDescriptionForReportsEn
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="RequestType"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "CategoryInAr",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fad fa-file special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="RequestType"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "CategoryInAr",
                                      })}
                                      {...register?.(
                                        "categoryDescriptionForReports",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.categoryDescriptionForReports
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="RequestTypeEn"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "CategoryInEn",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fad fa-file special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="RequestTypeEn"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "CategoryInEn",
                                      })}
                                      {...register?.(
                                        "categoryDescriptionForReportsEn",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.categoryDescriptionForReportsEn
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="Clause"
                                    className="form-label px-2 fontSz-6 required "
                                  >
                                    {intl.formatMessage({
                                      id: "ClauseInAr",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fad fa-layer-plus special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="Clause"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "ClauseInAr",
                                      })}
                                      {...register?.(
                                        "itemDescriptionForReports",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.itemDescriptionForReports
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="ClauseEn"
                                    className="form-label px-2 fontSz-6 required "
                                  >
                                    {intl.formatMessage({
                                      id: "ClauseInEn",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fad fa-layer-plus special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="ClauseEn"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "ClauseInEn",
                                      })}
                                      {...register?.(
                                        "itemDescriptionForReportsEn",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.itemDescriptionForReportsEn
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="ServiceContent"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "ServiceContentInAr",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-sticky-note special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="ServiceContent"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "ServiceContentInAr",
                                      })}
                                      {...register?.(
                                        "subjectDescriptionForReports",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.subjectDescriptionForReports
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div className="mb-1 py-1">
                                  <label
                                    htmlFor="ServiceContentEn"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "ServiceContentInEn",
                                    })}
                                  </label>
                                  <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-sticky-note special"></i>
                                      </span>
                                    </div>
                                    <input
                                      id="ServiceContentEn"
                                      type="text"
                                      className="form-control"
                                      placeholder={intl.formatMessage({
                                        id: "ServiceContentInEn",
                                      })}
                                      {...register?.(
                                        "subjectDescriptionForReportsEn",
                                      )}
                                    />
                                    {DisplayErrorMessage(
                                      errors?.subjectDescriptionForReportsEn
                                        ?.message as string,
                                      intl,
                                      language,
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
