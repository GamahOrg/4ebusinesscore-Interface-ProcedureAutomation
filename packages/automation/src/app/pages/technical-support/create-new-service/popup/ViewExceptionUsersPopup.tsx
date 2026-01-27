import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { getExceptionUsersRequestTemplate } from "../../../../redux/features/requestTemplate/requestTemplateSlice";
import { RootState } from "../../../../redux/store/store";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

type ViewExceptionUsersPopupProps = {
  show: boolean;
  handleClose: () => void;
  exceptedUsers?: any;
};

const ViewExceptionUsersPopup: FC<ViewExceptionUsersPopupProps> = ({
  show,
  handleClose,
  exceptedUsers,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [allSelectedUser, setAllSelectedUser] = useState<any>([]);

  const exceptionUsers = useSelector((state: RootState) => state?.requestTemplate?.exceptionUsers) || [];

  useEffect(() => {
    dispatch(getExceptionUsersRequestTemplate({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (exceptionUsers && exceptedUsers && show) {
      const selectedUsers = exceptionUsers?.filter((user: any) =>
        exceptedUsers?.some((selectedUserId: any) =>
          selectedUserId?.toLocaleUpperCase() === user?.userId?.toLocaleUpperCase()
        )
      );
      setAllSelectedUser(selectedUsers);
    }
  }, [exceptionUsers, exceptedUsers, show]); 
  
  return (
    <div className="modal-dialog modal-xl">
      <Modal
        centered
        show={show}
        onHide={() => {
          handleClose();
        }}
        size="lg"
      >
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
          <div className="fw-bolder pb-8">
            <h1 className="mb-3 text-center">
              {intl.formatMessage({ id: "AllTheExceptions" })}
            </h1>
          </div>

          <div className="mb-10">
            <div className="py-3"></div>
            <div className="table-responsive fs-6 ">
              <table className="table table-borderless align-middle">
                <thead className="p-2 text-center fw-bolder border">
                  <tr>
                    <td className="p-2">
                      <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                        {/* <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="checkbox"
                          defaultValue={0}
                          checked={
                            checkedUserIds?.length === recordsTableData?.length
                          }
                        /> */}
                      </div>
                    </td>
                    <td className="p-5">
                      {intl.formatMessage({
                        id: "Name",
                      })}
                    </td>
                  </tr>
                </thead>
                <tbody className="p-4  text-center border">
                  {Array.isArray(allSelectedUser) &&
                    allSelectedUser?.map((user, index: number) => (
                        <tr
                          key={user?.userId}
                          className="text-center fw-lighter"
                        >
                          <td className="p-2">
                            <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                              <input
                                className="form-check-input widget-9-check xCheckBg"
                                type="checkbox"
                                name={user?.userName}
                                checked
                              />
                            </div>
                          </td>
                          <td className="d-flex  py-4">
                            <div className="d-flex">
                              <div className="symbol symbol-45px symbol-circle ms-2">
                                <img
                                  alt="Pic"
                                  src={
                                    user?.imageUrl
                                      ? `${UserManagmentRootUrl}${user?.imageUrl}`
                                      : toAbsoluteUrl(`/media/avatars/user.jpeg`)
                                  }
                                  onError={(e: any) =>
                                    (e.target.src = toAbsoluteUrl(`/media/avatars/user.jpeg`))
                                  }
                                />
                              </div>
                              <div>
                                <div className="fs-5 fw-bolder mb-2 d-flex justify-content-start">
                                  {user?.userFullName}
                                </div>
                                <div className="fw-bold text-muted">
                                  {user?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center mt-5">
                <button
                  type="reset"
                  onClick={() => {
                    handleClose();
                  }}
                  className="btn btn-secondary px-15 me-5"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewExceptionUsersPopup;
