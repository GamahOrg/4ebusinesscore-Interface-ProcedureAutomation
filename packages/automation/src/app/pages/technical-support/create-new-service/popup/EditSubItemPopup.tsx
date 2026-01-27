import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { itemSchema, itemProps } from "../../../../validations/ItemValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById } from "../../../../redux/features/item/itemByIdSlice";
import { RootState } from "../../../../redux/store/store";
import {
  getAllMyComponents,
  getWorkSpaceComponent,
  putItem,
} from "../../../../redux/features/item/itemSlice";
import { getSla } from "../../../../redux/features/SLA/slaSlice";
import { SlaModel } from "../../../../models/slaModel";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { getSlaById } from "../../../../redux/features/SLA/slaDetailsSlice";
import EditNewRequestTemplate from "./EditNewRequestTemplate";
import EditDynamicFormPopup from "./EditDynamicFormPopUp";
import { showSuccessAlert } from "@4eplatform/shared/index";
import { AddExistingRequest } from "./AddExistingRequest";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import SubSystemSettingsModel from "../../../../models/SubSystemSettingsModel";

type PopupProps = {
  show?: any;
  handleClose?: any;
  id: string | number | Number;
  parentId: string;
};
const EditSubItemPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  id,
  parentId,
}) => {
  const intl = useIntl();
  let language = intl.locale;
  const dispatch = useDispatch();
  const [showExistingRequest, setShowExistingRequest] =
    useState<boolean>(false);
  const [showEditNewTrack, setShowEditNewTrack] = useState<boolean>(false);
  const [watchTechnicianSelection, setWatchTechnicianSelection] = useState<any>(
    {}
  );
  const [showEditDynamicForm, setShowEditDynamicForm] =
    useState<boolean>(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [selectedRequestTemplate, setSelectedRequestTemplate] = useState<any>(
    {}
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<itemProps>({
    resolver: yupResolver(itemSchema),
    mode: "all",
    reValidateMode: "onChange",
  });


 useEffect(() => {
      let params: any = {
        pageSize: 100,
        pageNumber: 1,
       mainclassiffication:parentId,

      };
      dispatch(getSla(params) as any) as any;
    }, []);
  const sla = useSelector((state: RootState) => {
    return state?.sla?.items;
  });

  useEffect(() => {
    setWatchTechnicianSelection(watch("technicianSelection"));
  }, [watch("technicianSelection")]);

  //getItemById
  useEffect(() => {
    dispatch(fetchItemById(id) as any) as any;
  }, [id]);
  let item = useSelector((state: RootState) => {
    return state?.itemById?.data;
  });

  // const requestId = item?.result?.requestTemplateId;
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    setRequestId(item?.result?.requestTemplateId);
  }, [item]);
  let mainClassification = useSelector((state: RootState) => {
    return state?.mainClassificationById?.data;
  });
  const [isIntegrated, setIsIntegrated] = useState(false);

  useEffect(() => {
    setValue("isIntegrated", isIntegrated ? "yes" : "no");
    if (isIntegrated == false) {
      setValue("workspaceServiceID", "");
      trigger("workspaceServiceID");
    }
  }, [isIntegrated]);
  let [
    allComponentsBySubSystemIdOfMainClassification,
    setAllComponentsBySubSystemIdOfMainClassification,
  ] = useState<any>([]);
  useEffect(() => {
    if (mainClassification?.subSystemId) {
      let params = {
        isIntegration: true,
        pageNumber: 1,
        pageSize: 100000,
      };
      dispatch(
        getWorkSpaceComponent({
          id: mainClassification?.subSystemId,
          params,
        }) as any
      ).then((res: any) => {
        setAllComponentsBySubSystemIdOfMainClassification(res?.payload?.result);
      });
    }
  }, [mainClassification?.subSystemId]);
  const handleIntegrationChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsIntegrated(selectedOption === "yes");
  };

  useEffect(() => {
    setValue("name", item?.result?.name);
    setValue("duration", item?.result?.duration);
    setValue("effect", item?.result?.effect);
    setValue("priorityLevel", item?.result?.priorityLevel);
    setValue("description", item?.result?.description);
    setValue("slaId", item?.result?.slaId);
    setValue("categoryId", item?.result?.categoryId);
    setValue("serviceType", item?.result?.serviceType);
    setValue("technicianSelection", item?.result?.technicianSelection);
    setValue("requestTempleteName", item?.result?.requestTempleteName);
    setValue("nameEn", item?.result?.nameEn);
    setValue("descriptionEn", item?.result?.descriptionEn);
    setValue("requestFor", item?.result?.requestFor);
    setValue("isIntegrated", item?.result?.isIintegrated ? "yes" : "no");
    setIsIntegrated(item?.result?.isIintegrated as boolean);
    item?.result?.dynamicForm &&
      setQuestionsList((prev) => JSON.parse(item?.result?.dynamicForm || ""));
  }, []);

  useEffect(() => {
    setValue(
      "requestTempleteName",
      selectedRequestTemplate?.label || item?.result?.requestTempleteName
    );
  }, [selectedRequestTemplate?.label]);

  useEffect(() => {
    setValue("workspaceServiceID", item?.result?.workspaceServiceID);
  }, [item, allComponentsBySubSystemIdOfMainClassification]);

  const EditItem = async (formValues: itemProps) => {
    let values = {
      name: formValues.name,
      duration: formValues.duration,
      effect: +formValues.effect,
      priorityLevel: +formValues.priorityLevel,
      slaId: formValues.slaId,
      description: formValues.description,
      categoryId: formValues.categoryId,
      serviceType: formValues.serviceType,
      technicianSelection: formValues.technicianSelection,
      dynamicForm: JSON.stringify(questionsList),
      isIintegrated: isIntegrated,
      workspaceServiceID: formValues?.workspaceServiceID,
      // requestTemplateId: lastAddedId || item?.result?.requestTemplateId,
      teamName: mainClassification?.teamName || "",
      requestFor: formValues?.requestFor,
      nameEn: formValues.nameEn,
      descriptionEn: formValues.descriptionEn,
      ...(watchTechnicianSelection == 2
        ? {}
        : {
            requestTemplateId: lastAddedId || item?.result?.requestTemplateId,
          }),
    };
    let mappedValues: any = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== "")
    );
    let data = {
      id,
      body: {
        item: mappedValues,
      },
    };
    dispatch(putItem(data as any) as any).then((res: any) => {
      if (res?.payload?.statusEnum === 1) {
        showSuccessAlert(true, "EditedSuccessfully", intl);
        dispatch(fetchMainClassificationTree(parentId as string) as any);
        reset();
        handleClose();
        setSlaId("");
        setLastAddedId(null);
      } else if (res?.payload?.message === '["ItemNameIsAlreadyExists"]') {
        showSuccessAlert(false, "ItemNameIsAlreadyExists", intl);
      } else if (
        res?.payload?.message === '["checkServiceCatlog"]' ||
        res?.payload?.message === '["CheckcatoguryServicetype"]' ||
        res?.payload?.message === '["checkitem"]' ||
        res?.payload?.message === '["checkservicetype"]' ||
        res?.payload?.message === '["CheckMainclassifficationServicetype"]' ||
        res?.payload?.message === '["checkCategory"]' ||
        res?.payload?.message == '["checkServiceCatlog","checkitem"]'
      ) {
        showSuccessAlert(false, "checkServiceCatlog", intl);
      } else {
        showSuccessAlert(false, "AnErrorOccured", intl);
      }
    });
  };

  //getSlaById
  const [slaId, setSlaId] = useState("");
  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    setSlaId(selectedValue);
  };
  useEffect(() => {
    dispatch(getSlaById(slaId) as any) as any;
  }, [slaId]);
  const slaById = useSelector((state: RootState) => {
    return state?.slaDetails?.item;
  });
  useEffect(() => {
    if (slaById && slaById.length > 0) {
      const respondDays = slaById[0]?.implementDays || 0;
      const respondHours = slaById[0]?.implementHours || 0;
      const respondMinutes = slaById[0]?.implementMinutes || 0;
      const concatenatedValue =
        language == "en"
          ? `${respondDays} Days, ${respondHours} Hours, ${respondMinutes} Minutes`
          : `${respondDays} ايام, ${respondHours} ساعات, ${respondMinutes} دقائق`;
      setValue("duration", concatenatedValue as any);
    }
  }, [slaById, setValue]);

  return (
    <>
      {/* <div className="modal-dialog modal-dialog-centered mw-1000px"> */}
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        id="EditItemModal"
        style={{ zIndex: "10000" }}
      >
        <div className="card">
          <div className="mx-5"></div>
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "flex-end",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
              <Modal.Title>
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 ">
                    {intl.formatMessage({ id: "EditItem" })}
                  </span>

                  <span className=" mb-5 mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({ id: "ChooseDataClassification" })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(EditItem)}>
            <Modal.Body>
              {/* {showEditDynamicForm ? (
                <DynamicForm setQuestionsList={setQuestionsList} />
              ) : ( */}
              <div>
                <div className="row mb-3">
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "ClauseNameInAr" })}&nbsp;(
                        {intl.formatMessage({ id: "TheService" })})
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-globe special"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "ClauseNameInAr",
                          })}
                          {...register("name")}
                        />
                        {DisplayErrorMessage(errors?.name?.message, intl,intl.locale)}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "ClauseNameInEn" })}&nbsp;(
                        {intl.formatMessage({ id: "TheService" })})
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-globe special"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "ClauseNameInEn",
                          })}
                          {...register("nameEn")}
                        />
                        {DisplayErrorMessage(errors?.nameEn?.message, intl,intl.locale)}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "DurationOfServiceImplementation",
                        })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-clock special"></i>
                          </span>
                        </div>
                        {/* <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "SLA",
                        })}
                      /> */}
                        <select
                          className="form-select form-select-control"
                          id="sla"
                          {...register("slaId")}
                          onChange={handleSelectChange}
                        >
                          <option value={""} selected disabled>
                            {intl.formatMessage({
                              id: "Choose",
                            })}
                          </option>
                          {sla?.map((ele: SlaModel) => (
                            <option value={ele?.id} key={ele?.id}>
                              {ele?.slaName}
                              {ele?.implementPeriod}
                            </option>
                          ))}
                        </select>
                        {DisplayErrorMessage(errors?.slaId?.message, intl,intl.locale)}
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({
                          id: "DurationOfServiceAvailability",
                        })}
                      </label>
                      {/* <select
                      id="domain"
                      className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                      data-kt-select2="true"
                      data-placeholder={intl.formatMessage({
                        id: "DurationOfServiceAvailability",
                      })}
                      data-dropdown-parent="#kt_menu_62775e8642438"
                      data-allow-clear="true"
                      data-select2-id="select2-data-4-vqtd"
                      tabIndex={-1}
                      aria-hidden="true"
                      {...register("duration")}
                    >
                      <option disabled selected>
                        {intl.formatMessage({
                          id: "DurationOfServiceAvailability",
                        })}
                      </option>
                     
                    </select> */}
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "DurationOfServiceAvailability",
                        })}
                        {...register("duration")}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "ImpactOfItem" })}
                      </label>
                      <select
                        id="domain"
                        className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                        data-kt-select2="true"
                        data-placeholder={intl.formatMessage({
                          id: "ImpactOfItem",
                        })}
                        data-dropdown-parent="#kt_menu_62775e8642438"
                        data-allow-clear="true"
                        data-select2-id="select2-data-4-vqtd"
                        tabIndex={-1}
                        {...register("effect")}
                      >
                        <option disabled selected>
                          {intl.formatMessage({ id: "ImpactOfItem" })}
                        </option>
                        <option value={1}>
                          {intl.formatMessage({ id: "High" })}
                        </option>
                        <option value={2}>
                          {intl.formatMessage({ id: "Medium" })}
                        </option>
                        <option value={3}>
                          {intl.formatMessage({ id: "Low" })}
                        </option>
                      </select>
                      {DisplayErrorMessage(errors?.effect?.message, intl,intl.locale)}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "PriorityLevel" })}
                      </label>
                      <select
                        id="domain"
                        className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                        data-kt-select2="true"
                        data-placeholder={intl.formatMessage({
                          id: "PriorityLevel",
                        })}
                        data-dropdown-parent="#kt_menu_62775e8642438"
                        data-allow-clear="true"
                        data-select2-id="select2-data-4-vqtd"
                        tabIndex={-1}
                        {...register("priorityLevel")}
                      >
                        <option disabled value={""}>
                          {intl.formatMessage({ id: "PriorityLevel" })}
                        </option>
                        <option value={1}>
                          {intl.formatMessage({ id: "High" })}
                        </option>
                        <option value={2}>
                          {intl.formatMessage({ id: "Medium" })}
                        </option>
                        <option value={3}>
                          {intl.formatMessage({ id: "Low" })}
                        </option>
                      </select>
                      {DisplayErrorMessage(
                        errors?.priorityLevel?.message,
                        intl,intl.locale
                      )}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        className="fs-6 fw-bold mb-2 text-gray-700 required"
                        htmlFor="ServiceType"
                      >
                        {intl.formatMessage({ id: "ServiceType" })}{" "}
                      </label>
                      <select
                        id="ServiceType"
                        className="form-select  form-select-solid "
                        {...register("serviceType")}
                      >
                        <option value={0}>
                          {intl.formatMessage({ id: "Choose" })}
                        </option>
                        <option value={1}>
                          {intl.formatMessage({ id: "All" })}
                        </option>
                        <option value={2}>
                          {intl.formatMessage({ id: "ServiceReqest" })}
                        </option>
                        <option value={3}>
                          {intl.formatMessage({ id: "ReportAService" })}
                        </option>
                      </select>
                      {DisplayErrorMessage(errors?.serviceType?.message, intl,intl.locale)}
                    </div>
                  </div>

                  {/* <div className="col-6 pt-5 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="mx-2 form-check-input my-2 my-md-0"
                      {...register("RequireATechnician")}
                      id="RequireATechnician"
                    />
                    <label htmlFor="RequireATechnician">
                      {intl.formatMessage({
                        id: "ItDoesNotRequireATechnicianToImplementTheTrack",
                      })}
                    </label>
                  </div> */}

                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        className="fs-6 fw-bold mb-2 text-gray-700"
                        htmlFor="TheWayToProcessTheItem"
                      >
                        {intl.formatMessage({ id: "TheWayToProcessTheItem" })}{" "}
                      </label>
                      <select
                        id="technicianSelection"
                        className="form-select  form-select-solid "
                        {...register("technicianSelection")}
                      >
                        <option value={0}>
                          {/* {intl.formatMessage({ id: "ProcessTheItem" })} */}
                          {intl.formatMessage({
                            id: "ApprovalPathwithTechnician",
                          })}
                        </option>
                        <option value={1}>
                          {/* {intl.formatMessage({id: "ProcessTheItemAndRequiresATechnician",})} */}
                          {intl.formatMessage({
                            id: "ApprovalPathwithoutTechnician",
                          })}
                        </option>
                        <option value={2}>
                          {intl.formatMessage({ id: "DirecttoTechnician" })}
                        </option>
                      </select>
                      {DisplayErrorMessage(
                        errors?.technicianSelection?.message,
                        intl,intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-1 py-2 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "IntegrationAbility" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-gear-fill fs-3"></i>
                          </span>
                        </div>
                        <select
                          className="form-select form-select-solid px-4 py-0 m-0"
                          id="selectOption"
                          value={isIntegrated ? "yes" : "no"}
                          onChange={handleIntegrationChange}
                        >
                          <option value="yes">
                            {intl.formatMessage({ id: "YES" })}
                          </option>
                          <option value="no">
                            {intl.formatMessage({ id: "NO" })}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {isIntegrated ? (
                    <>
                      <div className="col-6">
                        <div className="mb-1 py-2 ">
                          <label
                            className="fs-6 fw-bold mb-2 required"
                            htmlFor="IntegrationSystem"
                          >
                            {intl.formatMessage({ id: "IntegrationSystemm" })}{" "}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fas fa-layer-group special"></i>
                              </span>
                            </div>
                            <select
                              id="IntegrationSystem"
                              className="form-select form-select-solid px-4 py-0 m-0"
                              {...register("workspaceServiceID")}
                            >
                              <option value="" selected disabled>
                                {intl.formatMessage({ id: "Choose" })}
                              </option>
                              {allComponentsBySubSystemIdOfMainClassification?.map(
                                (item: SubSystemSettingsModel) => (
                                  <option key={item?.id} value={item?.id}>
                                    {intl.locale === "ar"
                                      ? item?.noteNameAr
                                      : item?.noteNameEn}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          {DisplayErrorMessage(
                            errors?.workspaceServiceID?.message,
                            intl,
                            intl.locale
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>{/* <div className="col-6"></div> */}</>
                  )}

                  <div className="col-6">
                    <div className="mb-1 py-2 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "Applicant" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-gear-fill fs-3"></i>
                          </span>
                        </div>
                        <select
                          className="form-select form-select-solid px-4 py-0 m-0"
                          id="selectOption"
                          defaultValue={""}
                          {...register("requestFor")}
                        >
                          <option value={""}>
                            {intl.formatMessage({ id: "Choose" })}
                          </option>
                          <option value={0}>
                            {intl.formatMessage({
                              id: "ApplicantforThemselves",
                            })}
                          </option>
                          <option value={1}>
                            {intl.formatMessage({
                              id: "ApplicantonBehalfofOthers",
                            })}
                          </option>
                          <option value={2}>
                            {intl.formatMessage({ id: "Both" })}
                          </option>
                        </select>
                        {DisplayErrorMessage(errors?.requestFor?.message, intl,intl.locale)}
                      </div>
                    </div>
                  </div>

                  {/* <div className="mb-3"> */}
                  <div className="col-lg-12">
                    <label
                      htmlFor="reason"
                      className="form-label px-2 fontSz-6 required"
                    >
                      {intl.formatMessage({ id: "DescriptionInArabic" })}
                    </label>

                    <textarea
                      id="reason"
                      className="form-control h-100px pt-4 form-control-lg form-control-solid mb-3 mb-lg-2"
                      placeholder={intl.formatMessage({
                        id: "DescriptionInArabic",
                      })}
                      {...register("description")}
                    ></textarea>
                    {DisplayErrorMessage(errors?.description?.message, intl,intl.locale)}
                  </div>

                       <div className="col-lg-12">
                    <label
                      htmlFor="reason"
                      className="form-label px-2 fontSz-6 required"
                    >
                      {intl.formatMessage({ id: "DescriptionInEn" })}
                    </label>

                    <textarea
                      id="reason"
                      className="form-control h-100px pt-4 form-control-lg form-control-solid mb-3 mb-lg-2"
                      placeholder={intl.formatMessage({
                        id: "DescriptionInEn",
                      })}
                      {...register("descriptionEn")}
                    ></textarea>
                    {DisplayErrorMessage(errors?.descriptionEn?.message, intl,intl.locale)}
                  </div>



                  {/* </div> */}
                </div>

                {watchTechnicianSelection == 2 ? (
                  <></>
                ) : (
                  <>
                    <div className="col-lg-6 mb-4">
                      <input
                        className="form-control disable"
                        placeholder={intl.formatMessage({
                          id: "NameRequestPath",
                        })}
                        {...register("requestTempleteName")}
                        disabled
                      />
                    </div>
                  </>
                )}

                <div className="d-flex justify-content-between">
                  {watchTechnicianSelection == 2 ? (
                    <></>
                  ) : (
                    <>
                      <div className="mb-7 d-flex gap-5 ">
                        <div
                          className="btn btn-primary py-3 mx-0 mt-2"
                          onClick={() => setShowEditNewTrack(true)}
                        >
                          {" "}
                          {intl.formatMessage({ id: "EditNewRequestPath" })}
                        </div>
                        <div
                          className="btn btn-primary py-3 mx-0 mt-2"
                          onClick={() => setShowExistingRequest(true)}
                        >
                          {" "}
                          {intl.formatMessage({ id: "AddExistingRequestPath" })}
                        </div>
                      </div>
                    </>
                  )}

                  <div
                    className="mb-7 d-flex gap-5 "
                    onClick={() => setShowEditDynamicForm(true)}
                  >
                    {" "}
                    <div className="btn btn-primary py-3 mx-0 mt-2">
                      {intl.formatMessage({ id: "EditApplicationForm" })}
                    </div>
                  </div>
                </div>
              </div>
              {/* )} */}
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      onClick={() => {
                        setLastAddedId(null);
                        handleClose();
                      }}
                      className="btn btn-secondary mx-1 text-center w-100"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-success mx-1 text-center w-100"
                      style={{ border: "none" }}
                    >
                      {intl.formatMessage({ id: "Edit" })}
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </div>
        {showEditNewTrack && (
          <EditNewRequestTemplate
            cancelFun={() => setShowEditNewTrack(false)}
            handleClose={handleClose}
            id={requestId}
            lastAddedId={lastAddedId}
            setLastAddedId={setLastAddedId}
          />
        )}

        {showEditDynamicForm && (
          <EditDynamicFormPopup
            handleClose={() => setShowEditDynamicForm(false)}
            {...{ questionsList, setQuestionsList }}
          />
        )}
        {showExistingRequest ? (
          <AddExistingRequest
            cancelFun={() => setShowExistingRequest(false)}
            handleClose={handleClose}
            setLastAddedId={setLastAddedId}
            setSelectedRequestTemplate={setSelectedRequestTemplate}
          />
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default EditSubItemPopup;
