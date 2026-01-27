import Modal from "react-bootstrap/Modal";
import DynamicForm from "./DynamicForm";
import { useIntl } from "react-intl";
import { showSuccessAlert } from "@4eplatform/shared/index";

const AddDynamicFormPopUp = ({
  setQuestionsList,
  isLabelsExist,
  setIsLabelsExist,
  parseRefFromChild,
  handleClose = () => {},
  formInputs,
}: any) => {
  const intl = useIntl();

  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={handleClose}
      id="AddItemModal"
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
                  {intl.formatMessage({
                    id: "AddApplicationForm",
                  })}
                </span>

                <span className=" mb-5 mt-1 fw-semibold fs-5 text-muted">
                  {intl.formatMessage({
                    id: "AddApplicationFormDesc",
                  })}
                </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className={"d-block"}>
              <DynamicForm
                setIsLabelsExist={setIsLabelsExist}
                editForm={true}
                setQuestionsList={setQuestionsList}
                formInputs={formInputs}
              />
              <div className="d-flex justify-content-center mt-4 gap-2">
                <div
                  onClick={handleClose}
                  className="btn btn-secondary mx-1 text-center w-125px"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (isLabelsExist) {
                      parseRefFromChild();
                      showSuccessAlert(true, "AddedSuccessfully", intl);
                      setTimeout(() => {
                        handleClose();
                      }, 500);
                    }
                  }}
                  className="btn btn-primary px-15 ms-5"
                >
                  {intl.formatMessage({ id: "Save" })}
                </button>
              </div>
            </div>
          </Modal.Body>
        </form>
      </div>
    </Modal>
  );
};

export default AddDynamicFormPopUp;
