import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { useLocation } from "react-router-dom";
import { Actions } from "./Actions";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchAllRequestTemplateBycategoryId, getRequestCategory } from "../../../../redux/features/requestTemplate/requestTemplateSlice";
import { RootState } from "../../../../redux/store/store";

function TrackRequestsTool() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [projectCategoryId, setProjectCategoryId] = useState<string>(
    "d6f7cc44-0fcd-4b41-af42-643f71cf3703"
  );
  const [allRequestTamplateByCategoryId, setAllRequestTamplateByCategoryId] =
    useState<any>();
  const [selectedValue, setSelectedValue] = useState("طلب دعم فنى");

  const [selectedMainClassificationIds, setSelectedMainClassificationIds] =
    useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // let requestCategory = useSelector((state: RootState) => {
  //   return state?.requestTemplate?.dataCategory;
  // });

  useEffect(() => {
    if (selectedMainClassificationIds)
      setProjectCategoryId(selectedMainClassificationIds);
  }, [selectedMainClassificationIds]);
  useEffect(() => {
    dispatch(getRequestCategory() as any);
  }, []);

  useEffect(() => {
    dispatch(getRequestCategory() as any);
  }, []);
  let requestCategory = useSelector((state: RootState) => {
    return state?.requestTemplate?.dataCategory;
  });

  // let [searchParams] = useSearchParams();

  // let allRequestTamplateByCategoryId = useSelector((state: RootState) => {
  //   return state?.requestTemplate?.allRequestTamplateByCategoryId;
  // });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e?.target?.value?.toLowerCase());
  };

  useEffect(() => {
    let myparams: any = {
      pageSize,
      pageNumber: pageIndex,
      search: searchTerm,
    };
    if (projectCategoryId) {
      dispatch(
        fetchAllRequestTemplateBycategoryId({
          id: projectCategoryId as string,
          myparams,
        }) as any
      ).then((res: any) => {
        setAllRequestTamplateByCategoryId(res?.payload?.result);
        setTotalItems(res?.payload?.totalItems);
        setTotalPages(res?.payload?.totalPages);
      });
    }
  }, [pageSize, pageIndex, projectCategoryId, searchTerm]);

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <Fragment>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start  mt-4"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="row g-5 g-xl-8">
            <div className="col-xl-12">
              <div className="card card-xl-stretch mb-xl-8 card-body  ">
                <div className="card-header border-0 pt-3 pb-2 mb-2 align-items-center">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder text-dark fs-4 mb-1">
                      {intl.formatMessage({ id: "TrackRequests" })}
                    </span>
                    <span className="mt-1 fw-semibold fs-6 text-muted">
                      {intl.formatMessage({ id: "TrackRequestsTable" })}
                    </span>
                  </h3>
                  <div className="w-200px">
                    <Dropdown
                      onSelect={(eventKey) => {
                        const value = requestCategory?.find(
                          (classification: any) =>
                            classification.id === eventKey
                        )?.name;
                        setSelectedValue(value ? value : "");
                        setSelectedMainClassificationIds(eventKey);
                      }}
                    >
                      <Dropdown.Toggle
                        variant="null"
                        id="dropdown-basic"
                        className="DropDownSelect form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                      >
                        {selectedValue}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="scroll-y mh-175px w-200px bg-gray-200 border-1">
                        {requestCategory?.map((role: any) => (
                          <Dropdown.Item
                            className="DropDownOptions py-1"
                            key={role.id}
                            eventKey={role.id}
                          >
                            {intl?.locale.toLowerCase() === "ar"
                              ? role?.name
                              : role?.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="position-relative mx-5 mb-4">
                  <input
                    type="text"
                    name="search"
                    className="form-control form-control-solid ps-12 pr-12"
                    placeholder={intl.formatMessage({ id: "SearchRequest" })}
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <i className="fa-solid fa-light fa-magnifying-glass my-magnify fs-3 text-muted fa-fw position-absolute"></i>
                </div>

                {allRequestTamplateByCategoryId ? (
                  <div className="py-5 taskLogs">
                    <div className="table-responsive">
                      <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                          <tr className="fw-bolder text-muted">
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({ id: "OrderName" })}
                            </th>
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({
                                id: "OrderClassification",
                              })}
                            </th>
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({ id: "TypeOfRequest" })}
                            </th>
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({
                                id: "TheNumberOfDepartmentsOfTheRequestTrack",
                              })}{" "}
                            </th>
                            <th className="min-w-250px text-center">
                              {intl.formatMessage({ id: "Options" })}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {allRequestTamplateByCategoryId?.map(
                            (requestTamplate: any) => {
                              return (
                                <Fragment key={requestTamplate?.id}>
                                  <tr>
                                    <td className="text-center">
                                      <Link
                                        to={{
                                          pathname: `/automation-requests-path/${requestTamplate?.id}/details`,
                                        }}
                                        state={{ serviceName: cardTitle }}
                                      >
                                        {requestTamplate?.name}
                                      </Link>
                                    </td>
                                    <td className="text-center">
                                      {requestTamplate?.requestCategoryName}
                                    </td>
                                    <td className="text-center">
                                      {requestTamplate?.requestCategoryTypeName}
                                    </td>
                                    <td className="text-center">
                                      {requestTamplate?.pathCount}
                                    </td>
                                    <td className="text-center">
                                      <Actions
                                        id={requestTamplate?.id}
                                        pageSize={pageSize}
                                        pageIndex={pageIndex}
                                        projectCategoryId={projectCategoryId}
                                        setAllRequestTamplateByCategoryId={
                                          setAllRequestTamplateByCategoryId
                                        }
                                      />
                                    </td>
                                  </tr>
                                </Fragment>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                      <SystemPagination
                        totalPages={totalPages}
                        totalItems={totalItems}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPageIndex={setPageIndex}
                        setPageSize={setPageSize}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center fw-bold fs-4 mb-4">
                    {intl.formatMessage({ id: "NoRequestTemplateWereFound" })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TrackRequestsTool;
