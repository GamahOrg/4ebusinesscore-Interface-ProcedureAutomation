import { FC, RefObject, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { exceptionUsersModel } from "../../../../models/RequestTemplate/exceptionUsersModel";
import { RootState } from "../../../../redux/store/store";
import { fetchExcludedUsers, fetchNotExcludedUsers, postExcludedUsers } from "../../../../redux/features/excludedUsers/excludedUsersSlice";
import { KTSVG, toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { useAppDispatch } from "@4eplatform/connect/src/app/store/store";
import { showSuccessAlert } from "@4eplatform/shared/index";

type AddExcludedUsersPopupProps = {
  show: boolean;
  handleClose: () => void;
  pageIndexForAll?: number;
  pageSizeForAll?: number;
};

const AddExcludedUsersPopup: FC<AddExcludedUsersPopupProps> = ({
  show,
  handleClose,
  pageIndexForAll,
  pageSizeForAll
}) => {

  const intl = useIntl();
  const dispatch = useDispatch();
  const dispatchApp = useAppDispatch();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const selectAllRef: RefObject<HTMLInputElement> = useRef(null);
  const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);


  const notExcludedUsers = useSelector((state: RootState) => state?.excludedUsers?.notExcludedUsers)

  const handleSearchChange = (e: any) => setSearchText(e.target.value);

  useEffect(() => {
    if (show) {
      setIsAdded(false)
      const params: any = {
      };
      dispatch(fetchNotExcludedUsers(params) as any)
    }
  }, [pageIndex, pageSize, searchText, dispatch, dispatchApp, show]);

  useEffect(() => {
    if (isAdded) { 
      const params: any = {
        pageSize: pageSizeForAll,
        pageNumber: pageIndexForAll,
        // Search: searchText,
      };
      dispatch(fetchExcludedUsers(params) as any)
    }
  }, [isAdded]);

  const handleSelectedUsers = (user: exceptionUsersModel) => {
    const isUserSelected = checkedUserIds?.includes(user?.userId);

    if (isUserSelected) {
      setCheckedUserIds((prev) => prev?.filter((id) => id !== user?.userId));
    } else {
      setCheckedUserIds((prev) => [...prev, user?.userId]);
    }
  };

  const selectAllUsers = () => {
    if (checkedUserIds?.length === notExcludedUsers?.length) {
      setCheckedUserIds([]);
    } else {
      const allUserIds = notExcludedUsers?.map((user: exceptionUsersModel) => user.userId);
      setCheckedUserIds(allUserIds);
    }
  };

  const handlePostUsers = () => {
    if (checkedUserIds?.length) {
      dispatchApp(postExcludedUsers(checkedUserIds)).then((res: any) => {
        if (res.payload?.statusEnum === 1 || res.payload?.message == "DefaultExceptionActionTacker  Added Successfully") {
          showSuccessAlert(true, "AddedSuccessfully", intl);
          setIsAdded(true)
        } else {
          showSuccessAlert(false, "AnErrorOccured", intl);
        }
      })
    }
  };

  useEffect(() => {
    return () => {
      setCheckedUserIds([]);
    };
  }, [show]);

  return (
    <div id="excluded-users" className="modal-dialog modal-sm" >
      <Modal
        centered
        show={show}
        onHide={() => { handleClose(); }}
        style={{zIndex:"10000"}}
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "flex-end",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
        </Modal.Header>

        <Modal.Body>
          <div className="fw-bolder pb-1">
            <h1 className="mb-3 text-center">
              {intl.formatMessage({ id: "AddUser" })}
            </h1>
          </div>

          <div className="mb-4">
            <div className="py-3 mb-2">
              <div className="position-relative w-100 ">
                <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                  <KTSVG path="/media/icons/duotune/general/gen065.svg" />
                </span>
                <input
                  type="text"
                  className="form-control form-control-solid ps-10"
                  name="search"
                  onChange={handleSearchChange}
                  placeholder={intl.formatMessage({
                    id: "TypeYourSearchHere",
                  })}
                />
              </div>
            </div>
            {/* style={{ height: "350px" }} */}
            <div className="table-responsive fs-6 overflow-y-auto h-auto" >
              <table className="table table-borderless align-middle">
                <thead className="p-2 text-center fw-bolder border">
                  <tr>
                    <td className="p-2">
                      <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="checkbox"
                          defaultValue={0}
                          ref={selectAllRef}
                          onChange={selectAllUsers}
                          checked={checkedUserIds?.length === notExcludedUsers?.length}
                        />
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
                  {Array.isArray(notExcludedUsers) && notExcludedUsers?.
                    filter((user: any) =>
                      user.userFullName
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase())
                      || user.userName
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase())
                      || user.email
                        ?.toLowerCase()
                        ?.includes(searchText?.toLowerCase())
                    )
                    ?.map((user: any) => (
                      <tr key={user?.userId} className="text-center fw-lighter">
                        <td className="p-2">
                          <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                            <input
                              className="form-check-input widget-9-check xCheckBg"
                              type="checkbox"
                              name={user?.userName}
                              checked={checkedUserIds?.includes(user?.userId)}
                              onChange={() => handleSelectedUsers(user)}
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
                                    : toAbsoluteUrl(`/media/avatars/300-1.jpg`)
                                }
                                onError={(e: any) =>
                                  (e.target.src = toAbsoluteUrl(`/media/avatars/300-1.jpg`))
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
            </div>

            <div className="d-flex justify-content-center mt-5 pt-5">
              <button
                type="reset"
                onClick={() => {
                  handleClose();
                }}
                className="btn btn-secondary px-15 me-5"
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>
              <button
                disabled={checkedUserIds?.length === 0}
                onClick={() => {
                  handlePostUsers();
                  handleClose()
                }}

                className="btn btn-success px-15 ms-5"
              >
                {intl.formatMessage({ id: "Add" })}
              </button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddExcludedUsersPopup;
