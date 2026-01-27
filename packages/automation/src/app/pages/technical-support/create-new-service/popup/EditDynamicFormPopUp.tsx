import Modal from "react-bootstrap/Modal";
import DynamicForm from "./DynamicForm";
import { useState } from "react";
import { useIntl } from "react-intl";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

const EditDynamicFormPopup = ({
  questionsList,
  setQuestionsList,
  handleClose = () => {},
}: any) => {
  const intl = useIntl();
  const [formInputs, setFormInputs] = useState([...questionsList]);
  const handleEdit = () => {
    setQuestionsList([...formInputs]);
    handleClose();
    showSuccessAlert(true, "EditedSuccessfully", intl);
  };

  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={handleClose}
      id="EditItemModal"
      style={{zIndex:"10055"}}
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
                  {intl.formatMessage({ id: "EditApplicationForm" })}
                </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <DynamicForm
            editForm={true}
            formInputs={formInputs}
            setQuestionsList={setFormInputs}
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-center py-2">
          <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <div className="d-flex justify-content-center align-items-center w-50">
                <div
                  onClick={handleClose}
                  className="btn btn-secondary mx-1 text-center w-100"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </div>
                <button
                  onClick={handleEdit}
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
      </div>
    </Modal>
  );
};

export default EditDynamicFormPopup;
