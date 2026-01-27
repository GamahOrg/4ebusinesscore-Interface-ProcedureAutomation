import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import {
  deleteMainClassificationTechnician,
  fetchMainClassificationTechnicians,
} from "../../../../redux/features/mainClassification/mainClassificationTechniciansSlice";
import {
  deleteMainClassificationRequester,
  fetchMainClassificationRequesters,
} from "../../../../redux/features/mainClassification/mainClassificationRequestersSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";

type DeletePopupProps = {
  id?: string | number | Number;
  showDelete?: any;
  handleCloseDelete?: any;
  mainClassificationId?: number | Number | string;
  type: string;
};

export const DeleteMainClassificianTechnicianRequesterPopup: FC<
  DeletePopupProps
> = ({ showDelete, handleCloseDelete, id, mainClassificationId, type }) => {
  const intl = useIntl();
  let [message, setMessage] = useState<string>("");
  

  const dispatch = useDispatch();
  let params: any = {
    pageSize: 10000,
    pageNumber: 1,
  };
  useEffect(() => {
    if (message == "The Technician Has Been Removed") {
      handleCloseDelete();
      showSuccessAlert(true, "DeletedSuccessfully", intl);
      dispatch(fetchMainClassificationTechnicians({id:mainClassificationId, params}) as any);
    } else if (message == "The Requester Has Been Deleted") {
      handleCloseDelete();
      showSuccessAlert(true, "DeletedSuccessfully", intl);
      dispatch(fetchMainClassificationRequesters({id:mainClassificationId, params}) as any);
    }
    return () => {
      setMessage("");
    };
  }, [message]);

  return (
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <Modal centered show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center my-5 pb-4">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmDeletion" })}</h3>
            </div>
          </Row>

          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>
                {intl.formatMessage({ id: "AreYouSureToDeleteThisItem" })}
              </h5>
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-center py-2">
          <div className="row">
            <div className="col-12 col-lg-7 mx-auto my-2 pb-2">
              <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-3 w-100"
                    onClick={handleCloseDelete}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <div
                    onClick={() => {
                      if (type == "technician") {
                        dispatch(
                          deleteMainClassificationTechnician({
                            mainClassificationId: mainClassificationId,
                            technicinaId: id,
                          }) as any
                        ).then((res: any) => {
                          setMessage(res?.payload?.message);
                        });
                      } else if (type == "requester") {
                        dispatch(
                          deleteMainClassificationRequester({
                            mainClassificationId: mainClassificationId,
                            requesterId: id,
                          }) as any
                        ).then((res: any) => {
                          setMessage(res?.payload?.message);
                        });
                      }
                    }}
                    className="  btn btn-danger me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Delete" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Deleting" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
