import { FC, Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddMainClassificationsDetailsProps,
  AddMainClassificationsDetailsSchema,
} from "../../../../validations/MainClassificationDetailsValidation";
import { useAppDispatch } from "../../../../redux/store/store";
import { addMainClassificationTitleDetails } from "../../../../redux/features/mainClassification/mainClassificationTitleDetailsSlice";

type ThirdSettingsTabProps = {
  setScreenSettings?: any;
};
export const ThirdSettingsTab: FC<ThirdSettingsTabProps> = ({
  setScreenSettings,
}) => {
  const intl = useIntl();

  let [aboutData, setAboutData] = useState<any>([
    {
      id: 1,
      title: "OrdersScreenSettings",
      expanded: false,
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

  const toggleAccordion = (id: number) => {
    setAboutData((prev: any) =>
      prev.map((data: any) => {
        if (data.id === id) return { ...data, expanded: !data.expanded };
        else return data;
      }),
    );
  };

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddMainClassificationsDetailsProps>({
    resolver: yupResolver(AddMainClassificationsDetailsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  let formValues = watch();

  let dispatch = useAppDispatch();
  const handleAddMainClassificationDetails = async (
    formValues: AddMainClassificationsDetailsProps,
  ) => {
    let body = {
      postMainClassificationtTitleDetailesDto: [
        {
          title: formValues.title,
          titleDescription: formValues.itemDescription,
          mainClassificationDescription:
            formValues.mainClassificationDescription,
          catalogDescription: formValues.catalogDescription,
          categoryDescription: formValues.categoryDescription,
          itemDescription: formValues.itemDescription,
          subjectDescription: formValues.subjectDescription,
          serviceType: 2,
          // mainClassificationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
      ],
    };
    try {
      await dispatch(addMainClassificationTitleDetails(body) as any).then(
        (res: any) => {},
      );
    } catch (error) {
      // console.error("Error during editing basic data:", error);
    }
  };
  return (
    <Fragment>
      <form>
        <div className="row mb-3 d-flex align-items-center">
          <div className="col-12 mb-5">
            {aboutData?.map((data: any, index: number) => (
              <div
                className="accordion"
                id={`accordionExample${data.id}`}
                key={data.id}
              >
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={`headingThree${data.id}`}
                  >
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
                        className="p-5 fs-5"
                        style={{ lineHeight: "2.5", fontWeight: "800" }}
                      >
                        {data.id === 1 ? (
                          <>
                            <div className="row mb-4">
                              <div className="col-lg-6">
                                <div className="mb-2 pt-2 pb-3 ">
                                  <label
                                    htmlFor="title"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "Title1",
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
                                        id: "Title1",
                                      })}
                                      {...register("title")}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-2 pt-2 pb-3 ">
                                  <label
                                    htmlFor="titleDescription"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "TitleDescription",
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
                                        id: "TitleDescription",
                                      })}
                                      {...register("titleDescription")}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-6">
                                <div className="mb-2 pt-2 pb-3 ">
                                  <label
                                    htmlFor="MainClassification"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "MainClassification",
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
                                        id: "MainClassification",
                                      })}
                                      {...register(
                                        "mainClassificationDescription",
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-2 pt-2 pb-3 ">
                                  <label
                                    htmlFor="SubCategory"
                                    className="form-label px-2 fontSz-6 required "
                                  >
                                    {intl.formatMessage({
                                      id: "SubCategory",
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
                                        id: "SubCategory",
                                      })}
                                      {...register("catalogDescription")}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-6">
                                <div className="mb-2 pt-2 pb-3 ">
                                  <label
                                    htmlFor="RequestType"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({ id: "RequestType" })}
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
                                        id: "RequestType",
                                      })}
                                      {...register("categoryDescription")}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-2 pt-2 pb-3 ">
                                  <label
                                    htmlFor="Clause"
                                    className="form-label px-2 fontSz-6 required "
                                  >
                                    {intl.formatMessage({
                                      id: "Clause",
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
                                        id: "Clause",
                                      })}
                                      {...register("itemDescription")}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-6">
                                <div className="mb-2 pt-2 pb-3 ">
                                  <label
                                    htmlFor="ServiceContent"
                                    className="form-label px-2 fontSz-6 required"
                                  >
                                    {intl.formatMessage({
                                      id: "ServiceContent",
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
                                        id: "ServiceContent",
                                      })}
                                      {...register("subjectDescription")}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : data.id === 2 ? (
                          <>
                            <>
                              <div className="row mb-4">
                                <div className="col-lg-6">
                                  <div className="mb-2 pt-2 pb-3 ">
                                    <label
                                      htmlFor="title"
                                      className="form-label px-2 fontSz-6 required "
                                    >
                                      {intl.formatMessage({
                                        id: "Title1",
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
                                          id: "Title1",
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-2 pt-2 pb-3 ">
                                    <label
                                      htmlFor="titleDescription"
                                      className="form-label px-2 fontSz-6 required"
                                    >
                                      {intl.formatMessage({
                                        id: "TitleDescription",
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
                                          id: "TitleDescription",
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-6">
                                  <div className="mb-2 pt-2 pb-3 ">
                                    <label
                                      htmlFor="MainClassification"
                                      className="form-label px-2 fontSz-6 required"
                                    >
                                      {intl.formatMessage({
                                        id: "MainClassification",
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
                                          id: "MainClassification",
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-2 pt-2 pb-3 ">
                                    <label
                                      htmlFor="SubCategory"
                                      className="form-label px-2 fontSz-6 required "
                                    >
                                      {intl.formatMessage({
                                        id: "SubCategory",
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
                                          id: "SubCategory",
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-6">
                                  <div className="mb-2 pt-2 pb-3 ">
                                    <label
                                      htmlFor="RequestType"
                                      className="form-label px-2 fontSz-6 required"
                                    >
                                      {intl.formatMessage({
                                        id: "RequestType",
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
                                          id: "RequestType",
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="mb-2 pt-2 pb-3 ">
                                    <label
                                      htmlFor="Clause"
                                      className="form-label px-2 fontSz-6 required "
                                    >
                                      {intl.formatMessage({
                                        id: "Clause",
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
                                          id: "Clause",
                                        })}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mb-4">
                                <div className="col-lg-6">
                                  <div className="mb-2 pt-2 pb-3 ">
                                    <label
                                      htmlFor="ServiceContent"
                                      className="form-label px-2 fontSz-6 required"
                                    >
                                      {intl.formatMessage({
                                        id: "ServiceContent",
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
                                          id: "ServiceContent",
                                        })}
                                      />
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
      </form>
    </Fragment>
  );
};
