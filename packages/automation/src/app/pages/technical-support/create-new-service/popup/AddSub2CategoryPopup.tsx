import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../../../../redux/store/store";
import { addCategory } from "../../../../redux/features/category/categorySlice";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import { categoryProps, categorySchema } from "../../../../validations/CategoryValidation";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { showSuccessAlert } from '@4eplatform/shared';
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type PopupProps = {
  show?: any;
  handleClose?: any;
  parentId?: string ;
  serviceCategoryId?: string;
};
const AddSub2CategoryPopup: React.FC<PopupProps> = ({ show, handleClose,parentId,serviceCategoryId}) => {
  const intl = useIntl();
  let [message, setMessage] = useState<string>("");

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
  
  const AddCategory = async (formValues:categoryProps) => { 
    let body={
      category:{
        name: formValues.name,
        status: formValues.status,
        priority: formValues.priority,
        description: formValues.description,
        serviceCatalogId:serviceCategoryId,
        parentCategoryId:parentId,
        serviceType:1,
        teamName:  "",
      }
    }
  
      const result = await  dispatch(addCategory(body)as any);
      if (result?.payload.statusEnum===1) {
        showSuccessAlert(true, "AddedSuccessfully", intl);
         handleClose();
         dispatch(fetchMainClassificationTree(parentId as string)as any )
         reset();
      } else {
        setMessage(result?.payload?.message);
        showSuccessAlert(false, message, intl);
        handleClose();
      }
    }
    const popupClickHandler = (event:any) => {
      event.stopPropagation();
    };
    const popupElement:any = document.getElementById('CategoryModal');
    popupElement?.addEventListener('click', popupClickHandler);
    let closeBtn=document.getElementsByClassName("btn-close")[0]
    let backDrop:any=document.getElementsByClassName("modal-backdrop")[0]
    closeBtn?.addEventListener("click",()=>{
      if(popupElement !=null){
        popupElement.style.display="none"
      }
      backDrop.style.display="none"
    })
    let cancelButton=document.getElementById("CategoryCancelButton")
    cancelButton?.addEventListener("click",()=>{
      if(popupElement !=null){
        popupElement.style.display="none"
      }
      backDrop.style.display="none"
    })
  return (
    <>
      {/* <div className="modal-dialog modal-dialog-centered mw-1000px"> */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
          id="CategoryModal"
        >
          <div className="card">
            <div className="mx-5"></div>
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale == "ar" ? "flex-start" : "center",
                flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
                <Modal.Title>
                  <h3 className="card-title flex-column align-items-center">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      {intl.formatMessage({ id: "AddSub2Category" })}
                    </span>

                    <span className="mt-1 fw-semibold fs-5 text-muted">
                      {intl.formatMessage({ id: "ChooseDataClassification" })}
                    </span>
                    <p className="mb-5 mt-6 text-primary fs-4 fw-bolder">
                      {intl.formatMessage({ id: "MainClassification" })} /
                      Category
                    </p>
                  </h3>
                </Modal.Title>
              </div>
            </Modal.Header>
            <form onSubmit={handleSubmit(AddCategory)}>
            <Modal.Body>
              <div className="row mb-3">
                <div className="col-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700">
                      {intl.formatMessage({ id: "SubCategoryName" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-th-large special"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "SubCategoryName",
                        })}
                        {...register('name')}
                      />
                    {DisplayErrorMessage(errors?.name?.message, intl)}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700">
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
                      {...register('status')}
                    >
                      <option selected>
                        {intl.formatMessage({ id: "Status" })}
                      </option>
                    
                      <option value={1}>{intl.formatMessage({ id: "Status" })} 1</option>
                      <option value={2}>{intl.formatMessage({ id: "Status" })} 2</option>

                    </select>
                    {DisplayErrorMessage(errors?.status?.message, intl)}

                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label className="form-label px-2  fs-6 text-gray-700">
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
                      {...register('priority')}

                    >
                      <option value={0} selected>
                        {intl.formatMessage({ id: "Priority" })}
                      </option>
                      <option value={1}>{intl.formatMessage({ id: "High" })}</option>
                      <option value={2}>{intl.formatMessage({ id: "Medium" })}</option>
                      <option value={3}>{intl.formatMessage({ id: "Low" })}</option>
                    </select>
                    {DisplayErrorMessage(errors?.priority?.message, intl)}

                  </div>
                </div>
              </div>

              <div className="row  mb-3">
                <div className="col-lg-12">
                  <label htmlFor="reason" className="form-label px-2 fontSz-6">
                    {intl.formatMessage({ id: "Description" })}
                  </label>

                  <textarea
                    id="reason"
                    className="form-control h-100px pt-4 form-control-lg form-control-solid mb-3 mb-lg-2"
                    placeholder={intl.formatMessage({
                      id: "Description",
                    })}
                    {...register('description')}

                  ></textarea>
                   {DisplayErrorMessage(errors?.description?.message, intl)}

                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      onClick={handleClose}
                      id="CategoryCancelButton"
                      className="btn btn-secondary mx-1 text-center w-100"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <button
                      type="submit"
                      // data-bs-dismiss="modal"
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
      {/* </div> */}
    </>
  );
};

export default AddSub2CategoryPopup;
