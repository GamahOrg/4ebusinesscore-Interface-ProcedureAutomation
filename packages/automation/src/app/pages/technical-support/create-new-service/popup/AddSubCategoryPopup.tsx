import React from "react";
import { IntlShape, useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../../../../redux/store/store";
import { addCategory } from "../../../../redux/features/category/categorySlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  categoryProps,
  categorySchema,
} from "../../../../validations/CategoryValidation";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type PopupProps = {
  show?: any;
  handleClose?: any;
  parentId?: string;
  serviceCategoryId?: string;
};
const AddSubCategoryPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  parentId,
  serviceCategoryId,
}) => {
  const intl = useIntl();

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<categoryProps>({
    resolver: yupResolver(categorySchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const AddCategory = async (formValues: categoryProps) => {
    let body = {
      category: {
        name: formValues.name,
        status: formValues.status,
        priority: formValues.priority,
        description: formValues.description,
        serviceCatalogId: serviceCategoryId,
        parentCategoryId: null,
        serviceType: formValues.serviceType,
        teamName: "",
        nameEn: formValues.nameEn,
        descriptionEn: formValues.descriptionEn,

      },
    }; 
    const result = await dispatch(addCategory(body) as any);
    if (result?.payload.statusEnum === 1) {
      showSuccessAlert(true, "AddedSuccessfully", intl);
      dispatch(fetchMainClassificationTree(parentId as string) as any);
      reset();
      handleClose();
    } else if (result?.payload?.message === '["CategoryNameIsAlreadyExists"]') {
      showSuccessAlert(false, "CategoryNameIsAlreadyExists", intl);
    } else if (result?.payload?.message === '["checkServiceCatlog"]' || result?.payload?.message === '["CheckcatoguryServicetype"]'
      || result?.payload?.message === '["checkitem"]' || result?.payload?.message === '["checkservicetype"]'
    ) {
      showSuccessAlert(false, "checkServiceCatlog", intl);
    } else {
      showSuccessAlert(false, "AnErrorOccured", intl);
      // handleClose();
      // reset();
    }
  };
  const popupClickHandler = (event: any) => {
    event.stopPropagation();
  };
  const popupElement: any = document.getElementById("MainCategoryModal");
  popupElement?.addEventListener("click", popupClickHandler);
  let closeBtn = document.getElementsByClassName("btn-close")[0];
  let backDrop: any = document.getElementsByClassName("modal-backdrop")[0];
  closeBtn?.addEventListener("click", () => {
    if (popupElement != null) {
      popupElement.style.display = "none";
    }
    backDrop.style.display = "none";
  });
  let cancelButton = document.getElementById("addCategoryCancelButton");
  cancelButton?.addEventListener("click", () => {
    if (popupElement != null) {
      popupElement.style.display = "none";
    }
    backDrop.style.display = "none";
  });
  return (
    <>
      {/* <div className="modal-dialog modal-dialog-centered mw-1000px"> */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        id="MainCategoryModal"
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
                    {intl.formatMessage({ id: "AddSub1Category" })}
                  </span>

                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({ id: "PleaseChooseDataClassification" })}
                  </span>
                  {/* <p className="mb-5 mt-6 text-primary fs-4 fw-bolder">
                    {intl.formatMessage({ id: "MainClassification" })} /
                    Category
                  </p> */}
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(AddCategory)}>
            <Modal.Body>
              <div className="row mb-3">
                <div className="col-12 col-lg-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700 required">
                      {intl.formatMessage({ id: "SubCategoryNameInAr1" })}
                    </label>
                    <div className="input-group mt-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-th-large special"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "SubCategoryNameInAr1",
                        })}
                        {...register("name")}
                        defaultValue={""}
                      />
                      {DisplayErrorMessage(errors?.name?.message, intl ,intl.locale)}
                    </div>
                  </div>
                </div>

                 <div className="col-12 col-lg-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700 required">
                      {intl.formatMessage({ id: "SubCategoryNameInEn1" })}
                    </label>
                    <div className="input-group mt-1">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-th-large special"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "SubCategoryNameInEn1",
                        })}
                        {...register("nameEn")}
                        defaultValue={""}
                      />
                      {DisplayErrorMessage(errors?.nameEn?.message, intl ,intl.locale)}
                    </div>
                  </div>
                </div>


                <div className="col-12 col-lg-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700 required">
                      {intl.formatMessage({ id: "Status" })}
                    </label>
                    <select
                      id="domain"
                      className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                      data-kt-select2="true"
                      data-placeholder={intl.formatMessage({ id: "Status" })}
                      data-dropdown-parent="#kt_menu_62775e8642438"
                      data-allow-clear="true"
                      data-select2-id="select2-data-4-vqtd"
                      tabIndex={-1}
                      {...register("status")}
                      defaultValue={-1}
                    >
                      <option  >
                        {intl.formatMessage({ id: "Status" })}
                      </option>

                      <option value={1}>{intl.formatMessage({ id: "Status" })} 1</option>
                      <option value={2}>{intl.formatMessage({ id: "Status" })} 2</option>
                    </select>
                    {DisplayErrorMessage(errors?.status?.message, intl,intl.locale)}
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700 required">
                      {intl.formatMessage({ id: "Priority" })}
                    </label>
                    <select
                      id="domain"
                      className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                      data-kt-select2="true"
                      data-placeholder={intl.formatMessage({
                        id: "Priority",
                      })}
                      data-dropdown-parent="#kt_menu_62775e8642438"
                      data-allow-clear="true"
                      data-select2-id="select2-data-4-vqtd"
                      tabIndex={-1}
                      {...register("priority")}
                      defaultValue={-1}
                    >
                      <option value={0}>
                        {intl.formatMessage({ id: "Priority" })}
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
                    {DisplayErrorMessage(errors?.priority?.message, intl,intl.locale)}
                  </div>
                </div>
                    <div className="col-12 col-lg-4">
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
                    defaultValue={-1}
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
          

              <div className="row  mb-3">
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

                  <div className="row  mb-3">
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
                      onClick={handleClose}
                      className="btn btn-secondary mx-1 text-center w-100"
                      id="addCategoryCancelButton"
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
    </>
  );
};

export default AddSubCategoryPopup;
