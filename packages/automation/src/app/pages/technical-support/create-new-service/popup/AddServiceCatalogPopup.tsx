import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  serviceCatalogProps,
  serviceCatalogSchema,
} from "../../../../validations/ServiceCatalogValidation";
import { useDispatch } from "react-redux";
import { addServiceCatalog } from "../../../../redux/features/serviceCatalog/serviceCatalogSlice";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type PopupProps = {
  show?: any;
  handleClose?: any;
  id?: number | Number | string;
  parentId?: number | Number | string;
  fetchData?: any;
};
const AddServiceCatalogPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  id,
  parentId,
  fetchData,
}) => {
  const intl = useIntl();
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<serviceCatalogProps>({
    resolver: yupResolver(serviceCatalogSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const AddServiceCatalog = async (formValues: serviceCatalogProps) => {
    let body = {
      serviceCatalogDTO: {
        name: formValues.name,
        priority: formValues.priority,
        icon: formValues.icon,
        color: formValues.color,
        description: formValues.description,
        mainClassificationId: id,
        serviceType: formValues.serviceType,
        teamName: formValues.teamName || "",
        nameEn: formValues.nameEn,
        descriptionEn: formValues.descriptionEn,
      },
    };
    dispatch(addServiceCatalog(body as any) as any).then((res: any) => {
      return setMessage(res?.payload?.message);
    });
  };

  useEffect(() => {
    if (message == "Service catalog added successfully") {
      showSuccessAlert(true, "AddedSuccessfully", intl);
      // dispatch(getServiceCatalog() as any);
      fetchData();
      dispatch(fetchMainClassificationTree(parentId as string) as any);
    handleClose();
    } else if (message == "Service catalog already exist" || message == "[\"ServiceCatalogNameIsAlreadyExists\"]"
      || message == "[\"ServiceCatalogNameIsAlreadyExists\",\"CheckMainclassifficationServicetype\"]") {
      showSuccessAlert(false, "ServiceCatalogNameIsRepeated", intl);
          handleClose();
    } else if (message === '["checkServiceCatlog"]' || message === '["CheckcatoguryServicetype"]'
      || message === '["checkitem"]' || message === '[\"CheckMainclassifficationServicetype\"]'
      || message === '["CheckMainclassifficationServicetype"]' || message === '["checkservicetype"]') {
      showSuccessAlert(false, "checkServiceCatlog", intl);
          handleClose();
    } else {
      setMessage("");
    }
    reset();
  }, [message]);

  const popupClickHandler = (event: any) => {
    event.stopPropagation();
  };
  const popupElement: any = document.getElementById("ServiceCatalogModal");
  popupElement?.addEventListener("click", popupClickHandler);
  let closeBtn = document.getElementsByClassName("btn-close")[0];
  let backDrop: any = document.getElementsByClassName("modal-backdrop")[0];
  closeBtn?.addEventListener("click", () => {
    if (popupElement != null) {
      popupElement.style.display = "none";
    }
    backDrop.style.display = "none";
  });
  let cancelButton = document.getElementById("addServiceCatalogCancelButton");
  cancelButton?.addEventListener("click", () => {
    if (popupElement != null) {
      popupElement.style.display = "none";
    }
    backDrop.style.display = "none";
  });
useEffect(() => {
  const root = document.getElementById("root");
  if (show) {
    if (root?.getAttribute("aria-hidden") === "true") {
      root.removeAttribute("aria-hidden");
    }
  }
  return () => {
    if (root?.getAttribute("aria-hidden") === "true") {
      root.removeAttribute("aria-hidden");
    }

  };
}, [show]);
  return (
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        id="ServiceCatalogModal"
        style={{zIndex:"10000"}}
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
                    {intl.formatMessage({ id: "AddingServiceCatalog" })}
                  </span>

                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({ id: "ChooseDataClassification" })}
                  </span>
                  <p className="mb-5 mt-6 text-primary fs-4 fw-bolder">
                    {intl.formatMessage({ id: "BasicDataForAddition" })}
                  </p>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(AddServiceCatalog)}>
            <Modal.Body>
              <div className="row mb-3">
                <div className="col-12 col-lg-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700 required">
                      {intl.formatMessage({ id: "ClassificationNameInAr" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-diagram-3 special"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "ClassificationNameInAr",
                        })}
                        {...register("name")}
                      />
                      {DisplayErrorMessage(errors?.name?.message, intl ,intl.locale)}
                    </div>
                  </div>
                </div>


         <div className="col-12 col-lg-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700 required">
                      {intl.formatMessage({ id: "ClassificationNameInEn" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-diagram-3 special"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "ClassificationNameInEn",
                        })}
                        {...register("nameEn")}
                      />
                      {DisplayErrorMessage(errors?.nameEn?.message, intl ,intl.locale)}
                    </div>
                  </div>
                </div>



                <div className="col-12 col-lg-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="priority"
                    >
                      {intl.formatMessage({ id: "PriorityDegree" })}
                    </label>
                    <select
                      id="priority"
                      className="form-select form-select-solid"
                      {...register("priority")}
                      defaultValue={0}
                    >
                      <option value={0}>
                        {intl.formatMessage({ id: "Choose" })}
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
                    {DisplayErrorMessage(errors?.priority?.message, intl ,intl.locale)}
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700 required">
                      {intl.formatMessage({ id: "Icon" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-icons special"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "IconInWebsite",
                        })}
                        {...register("icon")}
                      />
                      <div
                        style={{
                          top: "50%",
                          left: intl.locale == "ar" ? "15px" : "",
                          right: intl.locale == "en" ? "15px" : "",
                        }}
                        className="position-absolute translate-middle-y"
                      >
                        <a
                          href="https://fontawesome.com/v5/search?q=file&o=r&s=duotone"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-solid fa-link fs-5 text-muted"></i>
                        </a>
                      </div>
                    </div>
                    {DisplayErrorMessage(errors?.icon?.message, intl,intl.locale)}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700 required">
                      {intl.formatMessage({ id: "Color" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-palette special"></i>
                        </span>
                      </div>
                      <select
                        id="color"
                        className="form-select form-select-solid px-4 py-0 m-0"
                        data-placeholder={intl.formatMessage({ id: "Color" })}
                        tabIndex={-1}
                        {...register("color")}
                        defaultValue={""}
                      >
                        <option value="">
                          {intl.formatMessage({ id: "Color" })}
                        </option>
                        <option value={intl.formatMessage({ id: "Red" })}>
                          {intl.formatMessage({ id: "Red" })}
                        </option>
                        <option value={intl.formatMessage({ id: "Green" })}>
                          {intl.formatMessage({ id: "Green" })}
                        </option>
                        <option value={intl.formatMessage({ id: "Yellow" })}>
                          {intl.formatMessage({ id: "Yellow" })}
                        </option>
                        <option value={intl.formatMessage({ id: "Blue" })}>
                          {intl.formatMessage({ id: "Blue" })}
                        </option>
                      </select>
                      {DisplayErrorMessage(errors?.color?.message, intl,intl.locale)}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="fs-6 fw-bold mb-2 required" htmlFor="ServiceType">
                      {intl.formatMessage({ id: "ServiceType" })}{" "}
                    </label>
                    <select
                      id="ServiceType"
                      className="form-select  form-select-solid "
                      {...register("serviceType")}
                      defaultValue={0}
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
              </div>
              <div className="row w-100 mb-3">
                <div className="col-lg-12">
                  <label htmlFor="reason" className="form-label px-2 fontSz-6 required">
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
              </div>

                 <div className="row w-100 mb-3">
                <div className="col-lg-12">
                  <label htmlFor="reason" className="form-label px-2 fontSz-6 required">
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
              </div>

            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      onClick={()=>{
                          reset({});
                        handleClose();
                      }}
                      className="btn btn-secondary mx-1 text-center w-100"
                      id="addServiceCatalogCancelButton"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success mx-1 text-center w-100"
                      style={{ border: "none" }}
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>

  );
};

export default AddServiceCatalogPopup;
