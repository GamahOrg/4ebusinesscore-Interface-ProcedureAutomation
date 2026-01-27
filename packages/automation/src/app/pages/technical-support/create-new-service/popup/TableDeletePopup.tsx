import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Row, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteCategoryTechnician, fetchCategoryTechnicians } from "../../../../redux/features/category/categoryTechniciansSlice";
import { deleteCategoryRequester, fetchCategoryRequesters } from "../../../../redux/features/category/categoryRequestersSlice";
import {deleteItemTechnician ,fetchItemTechnicians } from "../../../../redux/features/item/itemTechniciansSlice";
import {deleteItemRequester , fetchItemRequesters} from "../../../../redux/features/item/itemRequestersSlice"
import { showSuccessAlert } from "@4eplatform/shared/index";

type DeletePopupProps = {
  id?: string;
  showDelete?: any;
  handleCloseDelete?: any;
  parentId?: string;
  type?: string;
  tabType?:string;
};

export const TableDeletePopup: FC<DeletePopupProps> = ({
  showDelete,
  handleCloseDelete,
  id,
  parentId,
  type,
  tabType,
}) => {
  const intl = useIntl();
  let [message, setMessage] = useState<string>("");
  let [statusEnum, setStatusEnum] = useState<number>();

  const handleDelete =async ()=>{
    if(type=="Technicians"&&tabType=="Category"){
    dispatch(
        await deleteCategoryTechnician({
          categoryId: parentId,
          technicianId: id,
        }) as any
      ).then((res: any) => {
        setMessage(res?.payload?.message);
        setStatusEnum(res?.payload?.statusEnum)
        }
      );
    }
    if(type=="Requesters"&&tabType=="Category"){
    dispatch(
        await deleteCategoryRequester({
          categoryId: parentId,
          requesterId: id,
        }) as any
      ).then((res: any) => {
        setMessage(res?.payload?.message);
        setStatusEnum(res?.payload?.statusEnum)
        }
      );
    }
    if(type=="Technicians"&&tabType=="item"){
      dispatch(
          await deleteItemTechnician({
            itemId:parentId,
            technicianId: id,
          }) as any
        ).then((res: any) => {
          setMessage(res?.payload?.message);
          setStatusEnum(res?.payload?.statusEnum)
          }
        );
      }
    if(type=="Requesters"&&tabType=="item"){
        dispatch(
            await deleteItemRequester({
              itemId: parentId,
              requesterId:  id,
            }) as any
          ).then((res: any) => {
            setMessage(res?.payload?.message);
            setStatusEnum(res?.payload?.statusEnum)
            }
          );
        }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    let params: any = {
      pageSize: 10000,
      pageNumber: 1,
    };
    if (statusEnum === 1) {
      handleCloseDelete();
      showSuccessAlert(true, "DeletedSuccessfully", intl)
      if(type==="Technicians"&&tabType=="Category" )
      dispatch(fetchCategoryTechnicians(parentId) as any);
      if(type==="Requesters"&&tabType=="Category")
      dispatch(fetchCategoryRequesters({id:parentId, params}) as any);
      if(type==="Technicians"&&tabType=="item" )
      dispatch(fetchItemTechnicians(parentId) as any);
      if(type==="Requesters"&&tabType=="item")
      dispatch(fetchItemRequesters({id:parentId, params}) as any);
    }
    // else{
    //     handleCloseDelete();
    //     showErrorAlert(); 
    // }
    return () => {
      setStatusEnum(0);
      setMessage("")
    };
  }, [statusEnum]);
  return (
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <Modal centered show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "flex-end",
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
                     handleDelete();
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
