import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Row, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteServiceCatalogTechnician,
  fetchServiceCatalogTechnicians,
} from "../../../../redux/features/serviceCatalog/serviceCatalogTechniciansSlice";
import {
  deleteServiceCatalogRequester,
  fetchServiceCatalogRequesters,
} from "../../../../redux/features/serviceCatalog/serviceCatalogRequestersSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";

type DeletePopupProps = {
  id?: string | number | Number;
  showDelete?: any;
  handleCloseDelete?: any;
  serviceCatalogId?: number | Number | string;
  type: string;
};

export const DeleteServiceCatalogTechnicianRequesterPopup: FC<
  DeletePopupProps
> = ({ showDelete, handleCloseDelete, id, serviceCatalogId, type }) => {
  const intl = useIntl();
  let [message, setMessage] = useState<string>("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (message == "The Technician Has Been Removed") {
      handleCloseDelete();
      showSuccessAlert(true, "DeletedSuccessfully", intl);
      dispatch(fetchServiceCatalogTechnicians(serviceCatalogId) as any);
    } else if (message == "The Requester Has Been Deleted") {
      handleCloseDelete();
      showSuccessAlert(true, "DeletedSuccessfully", intl);
      dispatch(fetchServiceCatalogRequesters(serviceCatalogId) as any);
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
                          deleteServiceCatalogTechnician({
                            serviceCatalogId: serviceCatalogId,
                            technicianId: id,
                          }) as any
                        ).then((res: any) => {
                          setMessage(res?.payload?.message);
                        });
                      } else if (type == "requester") {
                        dispatch(
                          deleteServiceCatalogRequester({
                            serviceCatalogId: serviceCatalogId,
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
