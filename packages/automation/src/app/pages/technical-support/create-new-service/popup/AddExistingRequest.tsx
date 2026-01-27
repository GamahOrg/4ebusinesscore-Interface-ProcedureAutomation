import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "../../../../partials/functions/language";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { useSearchParams } from "react-router-dom";
import {
  getRequestTemplate,
  getRequestTemplateById,
  getRols,
} from "../../../../redux/features/requestTemplate/requestTemplateSlice";
import Select from "react-select";
import { showSuccessAlert } from "@4eplatform/shared/index";
import ViewExceptionUsersPopup from "./ViewExceptionUsersPopup";

interface IProps {
  cancelFun: () => void;
  handleClose: any;
  setLastAddedId?: any;
  setSelectedRequestTemplate?: any;
}

export const AddExistingRequest: React.FC<IProps> = ({
  cancelFun,
  handleClose,
  setLastAddedId,
  setSelectedRequestTemplate,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  const [showExceptionUsersPopup, setShowExceptionUsersPopup] = useState(false);
  const [selectedExistingRequestId, setSelectedExistingRequestId] =
    useState<any>();
  const [selectedOption, setSelectedOption] = useState(null);

  let requestTemplate = useSelector((state: RootState) => {
    return state?.requestTemplate?.data;
  });

  let rols = useSelector((state: RootState) => {
    return state?.requestTemplate?.rols;
  });

  const options = requestTemplate?.map((option) => ({
    value: option?.id,
    label: option?.name,
  }));

  useEffect(() => {
    let params: any = {
      pageSize: searchParams.get("pageSize") || "400",
      pageNumber: searchParams.get("pageNumber") || "1",
    };
    dispatch(getRequestTemplate(params) as any);
  }, [searchParams.get("pageSize"), searchParams.get("pageNumber")]);

  useEffect(() => {
    dispatch(getRols() as any);
  }, []);

  // const handleRequestTemplateChange = (event: any) => {
  //   const requestId = event.target.value;
  //   setSelectedExistingRequestId(requestId);
  //   dispatch(getRequestTemplateById(requestId) as any);
  // };
  const handleRequestTemplateChange = (selectedOption: any) => {
    setSelectedExistingRequestId(selectedOption?.value);
    setSelectedOption(selectedOption);
    setSelectedRequestTemplate(selectedOption);
    dispatch(getRequestTemplateById(selectedOption?.value) as any);
  };

  useEffect(() => {
    setLastAddedId(selectedExistingRequestId);
  }, [selectedExistingRequestId]);

  let requestTemplateById = useSelector((state: RootState) => {
    return state?.requestTemplate?.requestTemplateById;
  });

  const [inputValues, setInputValues] = useState({
    OrderName: "",
    categoryName: "",
    pathCount: "",
    actionTackerName: "",
    slaName: "",
    rolName: "",
    requestCategoryTypeName: "",
  });

  useEffect(() => {
    setInputValues({
      OrderName: "",
      categoryName: "",
      pathCount: "",
      actionTackerName: "",
      slaName: "",
      rolName: "",
      requestCategoryTypeName: "",
    });
  }, [selectedExistingRequestId]);

  const clearInputValues = () => {
    setInputValues({
      OrderName: "",
      categoryName: "",
      pathCount: "",
      actionTackerName: "",
      slaName: "",
      rolName: "",
      requestCategoryTypeName: "",
    });
  };
  const customStyles = {
    menu: (provided:any) => ({
      ...provided,
      zIndex: 9999
    }),
    menuList: (provided:any) => ({
      ...provided,
      maxHeight: "250px",
      overflowY: "auto",
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#ccc",
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#aaa",
      },
    }),
    option: (provided:any) => ({
      ...provided,
      zIndex: 9999,
    }),
  };
  return (
    <Fragment>
      <div
        className="modal fade show creatForm "
        style={{
          paddingRight: "10px",
          display: "block",
          backgroundColor: "rgba(0,0,0,.5)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered mw-1000px">
          <div className="modal-content rounded">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                onClick={() => {
                  cancelFun();
                }}
              >
                <span className="svg-icon svg-icon-1">
                  <KTSVG
                    path="/media/icons/duotune/general/gen106_close.svg"
                    className="svg-icon-4 me-1"
                  />
                </span>
              </div>
            </div>
            <div
              id="kt_content_container"
              className="d-flex flex-column-fluid align-items-start  mt-4"
            >
              <div className="content flex-row-fluid" id="kt_content">
                <div className="row g-5 g-xl-8">
                  <div className="col-xl-12">
                    <div className="card card-xl-stretch mb-xl-8 card-body p-2 ">
                      <div className="card-header border-0 pt-5 mb-5">
                        <h3 className="card-title align-items-start flex-column">
                          <span className="card-label fw-bolder text-dark mb-3">
                            {intl.formatMessage({
                              id: "AddExistingRequestPath",
                            })}{" "}
                          </span>
                          <span className="text-muted mt-1 fw-bolder fs-7">
                            {intl.formatMessage({
                              id: "PleaseEnterTheFollowingDataToAddNewApplicationPath",
                            })}{" "}
                          </span>
                        </h3>
                      </div>
                      <hr />
                      <form
                        className="p-5"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="row d-flex justify-content-around">
                          <div className="col-md-12 col-sm-10">
                            <div className="d-flex flex-column mb-8">
                              <label
                                className="fs-6 fw-bold mb-2"
                                htmlFor="classNameification"
                              >
                                {intl.formatMessage({
                                  id: "ExistingRequest",
                                })}{" "}
                              </label>
                              {/* <select
                                onChange={handleRequestTemplateChange}
                                value={selectedExistingRequestId}
                                className="form-select form-select-solid"
                                name="ExistingRequest"
                                id="ExistingRequest"
                              >
                                <option value="">
                                  {intl.formatMessage({
                                    id: "ExistingRequest",
                                  })}
                                </option>
                                {requestTemplate?.map(
                                  (requestTemplate: requestTamplateModel) => (
                                    <option
                                      key={requestTemplate.id}
                                      value={requestTemplate.id}
                                    >
                                      {requestTemplate.name}
                                    </option>
                                  )
                                )}
                              </select> */}
                              <Select
                                id="ExistingRequest"
                                className="react-select__container"
                                classNamePrefix="react-select"
                                placeholder={intl.formatMessage({
                                  id: "ExistingRequest",
                                })}
                                options={options}
                                isClearable={true}
                                onChange={handleRequestTemplateChange}
                                value={selectedOption}
                                noOptionsMessage={() =>
                                  intl.formatMessage({
                                    id: "NotAvailableExistingRequest",
                                  })
                                }
                                styles={customStyles} 
                              />
                            </div>
                          </div>
                          {selectedExistingRequestId ? (
                            <>
                              <div className="col-md-4 col-sm-10">
                                <div className="d-flex flex-column mb-8">
                                  <label
                                    className="fs-6 fw-bold mb-2 form-label"
                                    htmlFor="name"
                                  >
                                    {intl.formatMessage({ id: "OrderName" })}{" "}
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-cube special"></i>
                                      </span>
                                    </div>
                                    <input
                                      readOnly
                                      className="form-control"
                                      name="OrderName"
                                      placeholder={intl.formatMessage({
                                        id: "OrderName",
                                      })}
                                      id="name"
                                      value={requestTemplateById?.name}
                                      onChange={(e) =>
                                        setInputValues((prevValues) => ({
                                          ...prevValues,
                                          OrderName: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="d-flex flex-column mb-8 ">
                                  <label
                                    className="fs-6 fw-bold mb-2"
                                    htmlFor="pathCount"
                                  >
                                    {intl.formatMessage({
                                      id: "DepartmentsNumber",
                                    })}{" "}
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="bi bi-layers-fill special"></i>
                                      </span>
                                    </div>
                                    <input
                                      readOnly
                                      className="form-control"
                                      name="pathCount"
                                      placeholder={intl.formatMessage({
                                        id: "DepartmentsNumber",
                                      })}
                                      id="name"
                                      value={
                                        requestTemplateById?.pathCount || ""
                                      }
                                      onChange={(e) =>
                                        setInputValues((prevValues) => ({
                                          ...prevValues,
                                          pathCount: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-10">
                                <div className="d-flex flex-column mb-8">
                                  <label
                                    className="fs-6 fw-bold mb-2"
                                    htmlFor="categoryName"
                                  >
                                    {intl.formatMessage({
                                      id: "OrderClassification",
                                    })}{" "}
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-vector-square special"></i>
                                      </span>
                                    </div>
                                    <input
                                      readOnly
                                      className="form-control"
                                      name="categoryName"
                                      placeholder={intl.formatMessage({
                                        id: "OrderName",
                                      })}
                                      id="categoryName"
                                      value={
                                        requestTemplateById?.categoryName || ""
                                      }
                                      onChange={(e) =>
                                        setInputValues((prevValues) => ({
                                          ...prevValues,
                                          categoryName: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-10">
                                <div className="d-flex flex-column mb-8">
                                  <label
                                    className="fs-6 fw-bold mb-2"
                                    htmlFor="type"
                                  >
                                    {intl.formatMessage({ id: "OrderType" })}{" "}
                                  </label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        <i className="fas fa-vector-square special"></i>
                                      </span>
                                    </div>
                                    <input
                                      readOnly
                                      className="form-control"
                                      name="categoryName"
                                      placeholder={intl.formatMessage({
                                        id: "OrderName",
                                      })}
                                      id="categoryName"
                                      value={
                                        requestTemplateById?.requestCategoryTypeName ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        setInputValues((prevValues) => ({
                                          ...prevValues,
                                          requestCategoryTypeName:
                                            e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                        {selectedExistingRequestId &&
                          requestTemplateById?.requestTemplateStepDtos?.map(
                            (stepDots) => {
                              return (
                                <>
                                <div className="timeline mb-4 timeline-1 pe-5 position-relative mt-4 pt-4">
                                  <div
                                    className="timeline-sep bg-secondary h-100 border border-1 border-dashed"
                                    style={{
                                      position: "absolute",
                                      top: "10px",
                                      [getCurrentSystemLanguage() == "ar"
                                        ? "right"
                                        : "left"]: `30px`,
                                    }}
                                  ></div>
                                  <div className="timeline-item mb-3 d-flex align-items-center">
                                    <div className="timeline-badge w-50px">
                                      <span className="badge bg-success fs-2 p-3 d-flex align-items-center justify-content-center w-30px">
                                        {stepDots?.stepNumber}
                                      </span>{" "}
                                    </div>
                                    <div className="timeline-content d-flex align-items-center text-muted font-weight-normal ms-4">
                                      <div className="row pt-3 w-100 mb-4 d-flex align-items-center">
                                        <div
                                          className={`${stepDots?.actionTackerType !== 0 ? "col-md-3" : "col-md-4"} col-sm-12`}
                                        >
                                          {/* <div className="col-md-6 col-sm-10"> */}
                                          <div className="d-flex flex-column mb-3">
                                            <label className="fs-6 fw-bold mb-2 form-label">
                                              {intl.formatMessage({
                                                id: "TheNameOfTheDepartmentOrEmployee",
                                              })}
                                            </label>
                                            <div className="input-group">
                                              <input
                                                readOnly
                                                className="form-control"
                                                name="actionTackerName"
                                                placeholder={intl.formatMessage(
                                                  {
                                                    id: "TheNameOfTheDepartmentOrEmployee",
                                                  }
                                                )}
                                                id="classNameification"
                                                value={
                                                  stepDots?.actionTackerName
                                                    ? stepDots?.actionTackerName
                                                    : "لا يوجد اسم ادارة او موظف"
                                                }
                                                onChange={(e) =>
                                                  setInputValues(
                                                    (prevValues) => ({
                                                      ...prevValues,
                                                      actionTackerName:
                                                        e.target.value,
                                                    })
                                                  )
                                                }
                                              />
                                              <div className="input-group-prepend">
                                                <span className="input-group-text h-100">
                                                  <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          className={`${stepDots?.actionTackerType !== 0 ? "col-md-3" : "col-md-4"} col-sm-12 d-flex flex-column mt-5`}
                                        >
                                          {/* <div className="col-md-6 col-sm-12 d-flex flex-column mt-8"> */}
                                          <div className="d-flex flex-column mb-2">
                                            <label
                                              className="fs-6 fw-bold mb-2 form-label"
                                              htmlFor="classNameification"
                                            >
                                              SLA
                                            </label>
                                            <div className="input-group">
                                              <input
                                                readOnly
                                                className="form-control"
                                                name="slaName"
                                                placeholder={intl.formatMessage(
                                                  {
                                                    id: "TheNameOfTheDepartmentOrEmployee",
                                                  }
                                                )}
                                                id="classNameification"
                                                value={
                                                  stepDots?.slaName ||
                                                  "لا يوجد اتفاقية"
                                                }
                                                onChange={(e) =>
                                                  setInputValues(
                                                    (prevValues) => ({
                                                      ...prevValues,
                                                      slaName: e.target.value,
                                                    })
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>

                                          <div className="d-flex fw-bolder text-primary justify-content-center align-items-center h-100 w-100">
                                            {stepDots?.implementationDays} يوم{" "}
                                            {stepDots?.implementationHours} ساعة{" "}
                                            {stepDots?.implementationMinutes}{" "}
                                            دقيقة
                                          </div>
                                        </div>

                                        {stepDots?.actionTackerType !== 0 && (
                                          <div
                                            className={`${stepDots?.actionTackerType !== 0 ? "col-md-2" : "col-md-3"} col-sm-12`}
                                          >
                                            <div className="d-flex flex-column mb-2 p-0">
                                              <label
                                                className="fs-6 fw-bold mb-2 form-label"
                                                htmlFor="classNameification"
                                              >
                                                {intl.formatMessage({
                                                  id: "RoleName",
                                                })}
                                              </label>

                                              <select
                                                className="form-select form-select-solid"
                                                name="RoleName"
                                                id="RoleName"
                                                disabled
                                              >
                                                <option value="">
                                                  {intl.formatMessage({
                                                    id: "RoleName",
                                                  })}
                                                </option>
                                                {rols?.map((role: any) => (
                                                  <option
                                                    value={role?.id}
                                                    selected={
                                                      role.nameAr ==
                                                      stepDots?.roleName
                                                    }
                                                  >
                                                    {role?.nameAr}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                          </div>
                                        )}

                                        <div
                                          className={`${stepDots?.actionTackerType !== 0 ? "col-md-1" : "col-md-6"} col-sm-12 d-flex flex-column `}
                                        >
                                          <div className="d-flex flex-column mb-2 p-0">
                                            <label className="fs-6 fw-bold mb-2 form-label">
                                              {intl.formatMessage({
                                                id: "Exception",
                                              })}
                                            </label>

                                            <select
                                              value={
                                                stepDots?.isExceptionActionTacker
                                                  ? 0
                                                  : 1
                                              }
                                              disabled
                                              className="form-select form-select-solid px-2"
                                            >
                                              <option value={0}>
                                                {intl.formatMessage({
                                                  id: "Yes",
                                                })}
                                              </option>
                                              <option value={1}>
                                                {intl.formatMessage({
                                                  id: "No",
                                                })}
                                              </option>
                                            </select>
                                          </div>
                                        </div>

                                        {stepDots?.isExceptionActionTacker ===
                                          true &&
                                        (stepDots.exceptionActionTackers ?? [])
                                          ?.length > 0 ? (
                                          <>
                                            <div
                                              className={`${stepDots?.actionTackerType !== 0 ? "col-md-3" : "col-md-6"} col-sm-12 d-flex flex-column `}
                                            >
                                              <label className="fs-6 fw-bold mb-6 form-label"></label>
                                              <div
                                                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                                                style={{
                                                  fontSize: "10",
                                                  height: "40px",
                                                }}
                                                onClick={() => {
                                                  setShowExceptionUsersPopup(
                                                    true
                                                  );
                                                }}
                                              >
                                                {intl.formatMessage({
                                                  id: "TheExceptions",
                                                })}
                                              </div>
                                            </div>

                                            <ViewExceptionUsersPopup
                                              show={showExceptionUsersPopup}
                                              handleClose={() => {
                                                setShowExceptionUsersPopup(
                                                  false
                                                );
                                              }}
                                              exceptedUsers={
                                                stepDots?.exceptionActionTackers
                                              }
                                            />
                                          </>
                                        ) : (
                                          <></>
                                        )}

                                        <div className="mt-5 col-md-3 col-sm-12 d-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            className="mx-2 form-check-input my-2 my-md-0"
                                            id="CanAttribute"
                                            checked={
                                              stepDots
                                                ?.assginRequestTemplateStepDto
                                                ?.isCountTask
                                                ? true
                                                : false
                                            }
                                          />
                                          <label
                                            htmlFor="CanAttribute"
                                            className="fs-6 fw-bold form-label"
                                          >
                                            {intl.formatMessage({
                                              id: "CanAssign",
                                            })}
                                          </label>
                                        </div>

                                        {stepDots?.assginRequestTemplateStepDto
                                          ?.isCountTask ? (
                                          <>
                                            <div className="col-md-3 col-sm-12 d-flex flex-column mb-2">
                                              <label
                                                className="fs-6 fw-bold mb-2 form-label"
                                                htmlFor="TasksNumber"
                                              >
                                                {intl.formatMessage({
                                                  id: "NumberOfTasksAssigned",
                                                })}
                                              </label>
                                              <div className="input-group">
                                                <div className="input-group-prepend">
                                                  <span className="input-group-text">
                                                    <i className="fa-solid fa-list-check special"></i>
                                                  </span>
                                                </div>
                                                <input
                                                  className="form-control"
                                                  name="target_details"
                                                  type="number"
                                                  value={
                                                    stepDots
                                                      ?.assginRequestTemplateStepDto
                                                      ?.countTask
                                                      ? stepDots
                                                          ?.assginRequestTemplateStepDto
                                                          ?.countTask
                                                      : null
                                                  }
                                                  placeholder={intl.formatMessage(
                                                    {
                                                      id: "NumberOfTasksAssigned",
                                                    }
                                                  )}
                                                  readOnly
                                                  disabled
                                                  id="TasksNumber"
                                                />
                                              </div>
                                            </div>
                                          </>
                                        ) : (
                                          <></>
                                        )}

                                        <div className="col-3">
                                          <div className="d-flex flex-column">
                                            <label
                                              className="fs-6 fw-bold mb-2 form-label"
                                              htmlFor={"slaAvailable"}
                                            >
                                              {intl.formatMessage({
                                                id: "SLAShow",
                                              })}
                                            </label>

                                            <select
                                              className="form-select form-select-solid"
                                              disabled
                                              value={
                                                stepDots
                                                  ?.assginRequestTemplateStepDto
                                                  ?.isSlaVisbale === true
                                                  ? "1"
                                                  : "0"
                                              }
                                            >
                                              <option value={"0"}>
                                                {intl.formatMessage({
                                                  id: "No",
                                                })}
                                              </option>
                                              <option value={"1"}>
                                                {intl.formatMessage({
                                                  id: "Yes",
                                                })}
                                              </option>
                                            </select>
                                          </div>
                                        </div>

                                        <div className="col-4 mt-3">
                                          <div className="d-flex flex-column">
                                            <label
                                              className="fs-6 fw-bold mb-2 form-label"
                                              htmlFor={"availableforClosing"}
                                            >
                                              {intl.formatMessage({
                                                id: "AvailableforClosing",
                                              })}
                                            </label>

                                            <select
                                              className="form-select form-select-solid"
                                              name={"availableforClosing"}
                                              id={"availableforClosing"}
                                              defaultValue={
                                                stepDots?.availableforClosing
                                                  ? "true"
                                                  : "false"
                                              }
                                            >
                                              <option value={"false"}>
                                                {intl.formatMessage({
                                                  id: "No",
                                                })}
                                              </option>
                                              <option value={"true"}>
                                                {intl.formatMessage({
                                                  id: "Yes",
                                                })}
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr/>
                                </>
                              );
                            }
                          )}

                        <div className="d-flex justify-content-center ">
                          <button
                            className="btn btn-secondary px-15 me-5"
                            onClick={() => {
                              cancelFun();
                            }}
                          >
                            {intl.formatMessage({ id: "Cancel" })}
                          </button>
                          <button
                            onClick={() => {
                              cancelFun();
                              showSuccessAlert(true, "AddedSuccessfully", intl);
                              clearInputValues();
                            }}
                            className="btn btn-success px-15 ms-5"
                            disabled={!selectedExistingRequestId}
                          >
                            {intl.formatMessage({ id: "Add" })}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div> */}
      {/* <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <HierarchyPopup
          cancelFunc={() => {
            setShowHierarichalModal(false);
          }}
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div> */}
    </Fragment>
  );
};
