import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { RootState } from "../../../../redux/store/store";
import { deleteExcludedUsers, fetchExcludedUsers } from "../../../../redux/features/excludedUsers/excludedUsersSlice";
import { KTSVG, toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { DeleteExcludedUsersPopup } from "../popup/DeleteExcludedUsersPopup";
import AddExcludedUsersPopup from "../popup/AddExcludedUsersPopup";
import { useAppDispatch } from "@4eplatform/connect/src/app/store/store";
import { useDispatch } from 'react-redux';
import { showSuccessAlert } from "@4eplatform/shared/index";

const ExcludedUsers = () => {
  let intl = useIntl();
  const dispatch = useDispatch();
  const dispatchApp = useAppDispatch();
  let location = useLocation()
  let cardName = location?.state?.cardTitle
  let cardId = location?.state?.cardId
  let partTitle = location?.state?.partTitle || location?.state?.extraState
  let systemId = location?.state?.systemId
  const [showExceptionUsersPopup, setExceptionUsersPopup] = useState(false)
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(0);

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState("");

  let params: any = {
    pageSize: pageSize,
    pageNumber: pageIndex,
    userName: searchText,
  };

  const handleSearchChange = (e: any) => setSearchText(e.target.value);

  useEffect(() => {
    dispatch(fetchExcludedUsers(params) as any)
  }, [pageIndex, pageSize, searchText, dispatch, dispatchApp]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(fetchExcludedUsers(params) as any)
      setIsDeleted(false)
    }
  }, [isDeleted]);

  let excludedUsers = useSelector((state: RootState) => state?.excludedUsers?.excludedUsers)
  let userTotalItems = useSelector((state: RootState) => state?.excludedUsers?.pagination?.totalItems)
  let userTotalPages = useSelector((state: RootState) => state?.excludedUsers?.pagination?.totalPages)

  const handleDeleteExcludedUser = () => {
    if (selectedId) {
      dispatchApp(deleteExcludedUsers([selectedId])).then((res: any) => {
        if (res.payload?.statusEnum === 1 || res.payload?.message == "DefaultExceptionActionTacker  deleted Successfully") {
          showSuccessAlert(true, "DeletedSuccessfully", intl);
          setIsDeleted(true)
          // excludedUsers = excludedUsers.filter((user: any) => user.userId !== selectedId);
        } else {
          showSuccessAlert(false, "AnErrorOccured", intl);
        }
      })
        .catch((error: any) => {
          showSuccessAlert(false, "AnErrorOccured", intl);
          console.error('Deletion failed:', error);
        });
    }
  };

  const breadcrumbItems = systemId ? [
    { path: `/create-new-service/${systemId}`, defaultName: 'CreateNewService', name: cardName },
    { path: ``, defaultName: 'ExceptionEmployeeSettings', name: "" },
  ] : [
    { path: `/create-new-service`, defaultName: 'CreateNewService', name: cardName },
    { path: ``, defaultName: 'ExceptionEmployeeSettings', name: "" },
  ]

  return <>
    <DynamicToolbar defaultTitle={"ExceptionEmployeeSettings"} fixedTitle={true} extraTitle={""} breadcrumbItems={breadcrumbItems} showWorkspace={true} cardId={cardId} cardOption={cardName} extraState={partTitle} />
    <div className="card card-xl-stretch mb-xl-0 pb-3">
      <div className="row px-3 pt-3 pb-2 mb-3 d-flex justify-content-between flex-wrap">
        <div className="col-lg-8 py-1 col-12">
          <div className="position-relative">
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
              value={searchText}
            />
          </div>
        </div>
        <div className="col-lg-4 d-flex align-items-center px-3 justify-content-lg-end col-12 my-2 my-lg-0">
          <div className="btn btn-primary"
            onClick={() => { setExceptionUsersPopup(true) }}
          >
            {intl.formatMessage({ id: "AddUser", })}
          </div>
        </div>
      </div>

      <div className="card-body py-3 px-3 mb-5">

        <div className="tab-content">

          <div className="mb-2">
            <div className="py-2"></div>

            <div className="table-responsive fs-6 ">
              <table className="table table-row-bordered table-row-dashed align-middle fw-bolder dark-table-head">
                <thead className="p-2 text-center fw-bolder border">
                  <tr>
                    <td className="p-5">
                      {intl.formatMessage({
                        id: "Name",
                      })}
                    </td>
                    <td className="p-5">
                      {intl.formatMessage({
                        id: "Email",
                      })}
                    </td>
                    <td className="p-5">
                      {intl.formatMessage({
                        id: "Actions",
                      })}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(excludedUsers) && excludedUsers?.map((user: any) => (
                      <tr key={user?.userId} className="text-center fw-lighter">
                        <td>
                          <div className="d-flex px-3 py-1">
                            <div className="symbol symbol-45px symbol-circle ms-2">
                              <img
                                alt="Pic"
                                src={
                                  user?.imageUrl
                                    ? `${UserManagmentRootUrl}${user?.imageUrl}`
                                    :toAbsoluteUrl(`/media/avatars/user.jpeg`)
                                }
                                onError={(e: any) =>
                                  (e.target.src = toAbsoluteUrl(`/media/avatars/user.jpeg`))
                                }
                              />
                            </div>
                            <div className="fs-5 fw-bolder mx-2 d-flex justify-content-start align-items-center">
                              {user?.userFullName}
                            </div>
                            <div>
                            </div>
                          </div>
                        </td>

                        <td className="">
                          <div className="fw-bold text-muted">
                            {user?.email}
                          </div>
                        </td>

                        <td className="">
                          <div className="fw-bold text-muted">
                            <div
                              className="menu-link px-3 text-danger cursor-pointer"
                              onClick={() => { setShowDelete(true); setSelectedId(user?.userId) }}
                            >
                              <span className="svg-icon svg-icon-2 mx-2">
                                <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                              </span>
                            </div>
                          </div>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        {userTotalPages>0 ? (
          <SystemPagination
            totalItems={userTotalItems}
            totalPages={userTotalPages}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        ) : (
          <div className="d-flex fw-bolder justify-content-center align-items-center">
            {intl.formatMessage({ id: "No_data_yet" })}
          </div>
        )}
      </div>
    </div>

    <AddExcludedUsersPopup
      show={showExceptionUsersPopup}
      handleClose={() => {
        setExceptionUsersPopup(false);
      }}
      pageSizeForAll={pageSize}
      pageIndexForAll={pageIndex}
    />
    <div className="modal fade" aria-hidden="true">
      <DeleteExcludedUsersPopup showDelete={showDelete} handleCloseDelete={() => setShowDelete(false)} id={selectedId} handleDelete={handleDeleteExcludedUser} setIsDeleted={setIsDeleted} />
    </div>


  </>;
}

export default ExcludedUsers;
