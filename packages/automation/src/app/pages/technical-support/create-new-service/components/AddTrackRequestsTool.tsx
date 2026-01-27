import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { AddPopup } from "../../../partials/AddPopup";
import { getCurrentSystemLanguage } from "../../../../partials/functions/language";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import {
  addRequestTemplate,
  getEmployee,
  getOrganization,
  getParentRequestTemplate,
  getRequestCategory,
  getRols,
  getSLA,
} from "../../../../redux/features/requestTemplate/requestTemplateSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  requestTemplateSchema,
  requestTemplateSchemaProps,
} from "../../../../validations/RequestTemplate";
import { requestCategoryModel } from "../../../../models/RequestTemplate/requestCategory";
import HierarchyPopup from "../../../partials/HierarchyPopup";
import { showSuccessAlert } from "@4eplatform/shared/index";

function AddTrackRequestsTool() {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>();
  const [selectedRequestCategoryId, setSelectedRequestCategoryId] = useState<any>();
  const [selectedSlaId, setSelectedSlaId] = useState<any>();
  const [selectedRoleId, setSelectedRoleId] = useState<any>();

  const intl = useIntl();
  const navigate = useNavigate();
  let [showHierarichalModal, setShowHierarichalModal] =
    useState<boolean>(false);

  const [numDivs, setNumDivs] = useState(1);
  const handleInputChange = (e: any) => {
    const value = parseInt(e.target.value);
    setNumDivs(value || 1);
  };

  let requestCategory = useSelector((state: RootState) => {
    return state?.requestTemplate?.dataCategory;
  });

  let organization = useSelector((state: RootState) => {
    return state?.requestTemplate?.organization;
  });

  let sla = useSelector((state: RootState) => {
    return state?.requestTemplate?.sla;
  });

  let rols = useSelector((state: RootState) => {
    return state?.requestTemplate?.rols;
  });

  let employee = useSelector((state: RootState) => {
    return state?.requestTemplate?.employee;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestCategory() as any);
    dispatch(getOrganization() as any);
    dispatch(getSLA() as any);
    dispatch(getRols() as any);
    dispatch(getEmployee() as any);
  }, []);

  let ParentRequestTemplate = useSelector((state: RootState) => {
    return state?.requestTemplate?.parentRequestTemplate;
  });
  const handleCategoryChange = (event: any) => {
    const categoryId = event.target.value;
    setSelectedCategoryId(categoryId);
    dispatch(getParentRequestTemplate(categoryId) as any);
  };

  const handleRequestCategoryChange = (event: any) => {
    const RequestCategory = event.target.value;
    setSelectedRequestCategoryId(RequestCategory);
  };

  const handleSlaChange = (event: any) => {
    const SLA = event.target.value;
    setSelectedSlaId(SLA);
  };

  const handleRoleChange = (event: any) => {
    const Role = event.target.value;
    setSelectedRoleId(Role);
  };

  const [selectedIds, setSelectedIds] = useState<any>("");
  const [selectedNames, setSelectedNames] = useState<any>("");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<requestTemplateSchemaProps>({
    resolver: yupResolver(requestTemplateSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const addRequestTemplateHandle = async (
    formValues: requestTemplateSchemaProps
  ) => {  
    try {
      let body = {
        name: formValues.name,
        actionOptions: 1,
        requestCategoryId: selectedCategoryId,
        parentRequestTemplateId: selectedRequestCategoryId,
        requestCategoryTypeId:requestCategory,
        requestTemplateSteps: [
          {
            actionTacker: {
              actionTakerId: selectedIds,
              type: 1,
              roleId: selectedRoleId,
            },
            slaId: selectedSlaId,
          },
        ],
      };
      dispatch(addRequestTemplate(body as any) as any).then((res: any) => {
        return setMessage(res?.payload?.message);
      });
    } catch (error: any) {
      //console.log("Form submission error:", error.message);
    }
  };

  useEffect(() => {
    if (message == "Request Template Has Been Added Successfully") {
      showSuccessAlert(true, "AddedSuccessfully", intl);
      navigate("/track-requests-tools");
    }
    return () => {
      setMessage("");
    };
  }, [message]);

  return (
    <Fragment>
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
                      {intl.formatMessage({ id: "AddNewOrderPath" })}{" "}
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
                  noValidate
                  className="p-5"
                  onSubmit={handleSubmit(addRequestTemplateHandle)}
                >
                  <div className="row d-flex justify-content-around">
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
                            {...register("name")}
                            className="form-control"
                            name="name"
                            placeholder={intl.formatMessage({
                              id: "OrderName",
                            })}
                            id="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-10">
                      <div className="d-flex flex-column mb-8">
                        <label
                          className="fs-6 fw-bold mb-2"
                          htmlFor="classNameification"
                        >
                          {intl.formatMessage({ id: "OrderClassification" })}{" "}
                        </label>

                        <select
                          onChange={handleCategoryChange}
                          value={selectedCategoryId}
                          className="form-select form-select-solid"
                          name="target_details"
                          id="classNameification"
                        >
                          <option value="">
                            {intl.formatMessage({ id: "OrderClassification" })}
                          </option>
                          {requestCategory?.map(
                            (category: requestCategoryModel) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-10">
                      <div className="d-flex flex-column mb-8">
                        <label className="fs-6 fw-bold mb-2" htmlFor="type">
                          {intl.formatMessage({ id: "OrderType" })}{" "}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-vector-square special"></i>
                            </span>
                          </div>
                          <select
                            onChange={handleRequestCategoryChange}
                            value={selectedRequestCategoryId}
                            className="form-select form-select-solid"
                            name="OrderType"
                            id="OrderType"
                          >
                            <option value="">
                              {intl.formatMessage({ id: "OrderType" })}
                            </option>
                            {ParentRequestTemplate?.map(
                              (ParentRequestTemplate) => (
                                <option value={ParentRequestTemplate?.id}>
                                  {ParentRequestTemplate?.name}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-4 col-sm-10">
                      <div className="d-flex flex-column mb-8 ">
                        <label className="fs-6 fw-bold mb-2" htmlFor="number">
                          {intl.formatMessage({ id: "DepartmentsNumber" })}{" "}
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="bi bi-layers-fill special"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            name="target_details"
                            placeholder="1"
                            id="number"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {Array.from({ length: numDivs }).map((_, index) => (
                    <div
                      key={index}
                      className="timeline mb-4 timeline-1 pe-5 position-relative mt-4 pt-4"
                    >
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
                      <div className="timeline-item mb-3 d-flex align-items-center ">
                        <div className="timeline-badge w-50px">
                          <span className="badge bg-success fs-2 p-3 d-flex align-items-center justify-content-center w-30px">
                            {index + 1}
                          </span>{" "}
                        </div>
                        <div className="timeline-content d-flex  align-items-center text-muted font-weight-normal ms-4">
                          <div className="row pt-5 w-100 mb-2 d-flex  align-items-center justify-content-between">
                            <div className="col-md-3 col-sm-10">
                              <div className="d-flex flex-column mb-8">
                                <label className="fs-6 fw-bold mb-2 form-label">
                                  {intl.formatMessage({
                                    id: "TheNameOfTheDepartmentOrEmployee",
                                  })}{" "}
                                </label>

                                <div className="input-group">
                                  <input
                                    className="form-control"
                                    name="name"
                                    placeholder={intl.formatMessage({
                                      id: "ChooseTheDepartmentOrTheEmployee",
                                    })}
                                    id="name"
                                    value={selectedNames}
                                  />
                                  <div
                                    className="input-group-prepend"
                                    onClick={() => {
                                      navigate("#");
                                      setModalHShow(true);
                                    }}
                                  >
                                    <span className="input-group-text h-100">
                                      <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-sm-10">
                              <div className="d-flex flex-column mb-8">
                                <label
                                  className="fs-6 fw-bold mb-2 form-label"
                                  htmlFor="classNameification"
                                >
                                  SLA
                                </label>
                                <div className="input-group">
                                  <select
                                    onChange={handleSlaChange}
                                    value={selectedSlaId}
                                    className="form-select form-select-solid"
                                    name="SlaId"
                                    id="SlaId"
                                  >
                                    <option value="">
                                      {intl.formatMessage({
                                        id: "DepartmentsNumber",
                                      })}
                                    </option>
                                    {sla?.map((sla) => (
                                      <option value={sla?.id}>
                                        {sla?.slaName}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-sm-10">
                              <div className="d-flex flex-column mb-8">
                                <label
                                  className="fs-6 fw-bold mb-2 form-label"
                                  htmlFor="classNameification"
                                >
                                  {intl.formatMessage({
                                    id: "Role",
                                  })}
                                </label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-user-cog special"></i>
                                    </span>
                                  </div>
                                  <select
                                    onChange={handleRoleChange}
                                    value={selectedRoleId}
                                    className="form-select form-select-solid"
                                    name="RoleName"
                                    id="RoleName"
                                  >
                                    <option value="">
                                      {intl.formatMessage({ id: "RoleName" })}
                                    </option>
                                    {rols?.map((role) => (
                                      <option value={role?.id}>
                                        {role?.nameAr}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-sm-10">
                              <div className="d-flex fw-bolder text-primary justify-content-center align-items-center h-100 w-100">
                                5 ايام 8 ساعات 10 دقائق
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center ">
                    <button
                      className="btn btn-secondary px-15 mx-3"
                      onClick={() => {
                        navigate("/track-requests-tools");
                      }}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </button>
                    <button
                      // data-bs-target="#Rega_modal_add"
                      // data-bs-toggle="modal"
                      // onClick={() => setModalShow(true)}
                      type="submit"
                      className="btn btn-success px-15 "
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
      <div className="modal fade" id="Rega_modal_add">
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
      <div className="modal fade" id="Rega_modal_add">
        <HierarchyPopup
          cancelFunc={() => {
            setShowHierarichalModal(false);
          }}
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
          organization={organization}
          setSelectedIds={setSelectedIds}
          setSelectedNames={setSelectedNames}
          employee={employee}
        />
      </div>
    </Fragment>
  );
}

export default AddTrackRequestsTool;
