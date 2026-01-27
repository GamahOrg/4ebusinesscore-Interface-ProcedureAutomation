import React from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/index";

const AddClausePopup: React.FC = () => {
  const intl = useIntl();
  
  return (
    <>
      <div className="modal fade" id="rega_modal_add_clause">
        <div className="modal-dialog modal-dialog-centered mw-1000px">
          <div className="modal-content">
            <div className="modal-header justify-content-end border-0 pb-0">
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                data-bs-dismiss="modal"
              >
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon-1"
                />
              </div>
            </div>
            <div className="card">
              <div className="card-body mx-5">
                <div className="card-header px-1 d-flex justify-content-center  pb-2 mb-5">
                  <h3 className="card-title flex-column align-items-center">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      {intl.formatMessage({ id: "AddClause" })}
                      (Item)
                    </span>

                    <span className="mt-1 fw-semibold fs-5 text-muted">
                      {intl.formatMessage({ id: "PleaseChooseData" })}
                    </span>
                  </h3>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "ClauseName" })}
                        (الخدمه)
                      </label>
                      <div className="input-group">
                        <input
                          className="form-control form-control-solid"
                          placeholder={intl.formatMessage({
                            id: "ClauseName",
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "ServiceAvailability" })}
                      </label>
                      <select
                        id="domain"
                        className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                        data-kt-select2="true"
                        data-placeholder={intl.formatMessage({ id: "ServiceAvailability" })}
                        data-dropdown-parent="#kt_menu_62775e8642438"
                        data-allow-clear="true"
                        data-select2-id="select2-data-4-vqtd"
                        tabIndex={-1}
                      >
                        <option disabled selected>
                          {intl.formatMessage({ id: "ServiceAvailability" })}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "Effect" })}
                      </label>
                      <select
                        id="domain"
                        className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                        data-kt-select2="true"
                        data-placeholder={intl.formatMessage({
                          id: "ResponsibleForIt",
                        })}
                        data-dropdown-parent="#kt_menu_62775e8642438"
                        data-allow-clear="true"
                        data-select2-id="select2-data-4-vqtd"
                        tabIndex={-1}
                        defaultValue="-1"
                      >
                        <option disabled selected>
                          {intl.formatMessage({ id: "Effect" })}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "PriorityDegree" })}
                      </label>
                      <select
                        id="domain"
                        className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                        data-kt-select2="true"
                        data-placeholder={intl.formatMessage({
                          id: "PriorityDegree",
                        })}
                        data-dropdown-parent="#kt_menu_62775e8642438"
                        data-allow-clear="true"
                        data-select2-id="select2-data-4-vqtd"
                        tabIndex={-1}
                      >
                        <option disabled selected>
                          {intl.formatMessage({ id: "PriorityDegree" })}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row w-100 mb-3">
                  <div className="col-lg-12">
                    <label
                      htmlFor="reason"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "Description" })}
                    </label>

                    <textarea
                      id="reason"
                      className="form-control h-100px pt-4 form-control-lg form-control-solid mb-3 mb-lg-2"
                      placeholder={intl.formatMessage({
                        id: "Description",
                      })}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                  <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center w-50">
                      <div
                        data-bs-dismiss="modal"
                        className="btn btn-secondary mx-1 text-center w-100"
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </div>
                      <button
                        type="button"
                        data-bs-dismiss="modal"
                        className="btn btn-success mx-1 text-center w-100"
                        style={{ border: "none" }}
                        onClick={() => {
                          showSuccessAlert(true, "AddedSuccessfully", intl);
                        }}
                      >
                        {intl.formatMessage({ id: "Add" })}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClausePopup;
