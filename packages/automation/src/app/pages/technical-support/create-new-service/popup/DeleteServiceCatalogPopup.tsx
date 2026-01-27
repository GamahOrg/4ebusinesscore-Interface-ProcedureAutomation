import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Row, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteServiceCatalog,
} from "../../../../redux/features/serviceCatalog/serviceCatalogSlice";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { getClassification } from "../../../../redux/features/mainClassification/classificationsSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";
import { useParams } from "react-router-dom";

type DeletePopupProps = {
  id?: string | number | Number;
  showDelete?: any;
  handleCloseDelete?: any;
  parentId?: string | number | Number;
};

export const DeleteServiceCatalogPopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
  id,
  parentId,
}) => {
  const intl = useIntl();
  let [message, setMessage] = useState<any>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { systemId } = useParams()

  const dispatch = useDispatch();
  useEffect(() => {
    if (message == "The ServiceCatalog Deleted Successfully") {
      handleCloseDelete();
      showSuccessAlert(true, "DeletedSuccessfully", intl);
      dispatch(fetchMainClassificationTree(parentId as string) as any);
      dispatch(getClassification({pageNumber: pageIndex,pageSize: pageSize, ...(systemId && { subSystemId: systemId }),}) as any);
    }
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
                      dispatch(deleteServiceCatalog(id as string) as any).then(
                        (res: any) => {
                          setMessage(res?.payload?.message);
                        }
                      );
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
