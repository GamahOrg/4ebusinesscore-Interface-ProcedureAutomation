import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { fetchServiceCatalogTechnicians } from "../../../../redux/features/serviceCatalog/serviceCatalogTechniciansSlice";
import { EmployeeHierarchyServiceCatalogTechnicianPopup } from "./EmployeeHierarchyServiceCatalogTechnicianPopup";
import { EmployeeHierarchyServiceCatalogRequesterPopup } from "./EmployeeHierarchyServiceCatalogRequesterPopup";
import {
  addServiceCatalogRequester,
  fetchServiceCatalogRequesters,
} from "../../../../redux/features/serviceCatalog/serviceCatalogRequestersSlice";
import { TechnicianRequesterModel } from "../../../../models/TechnicianRequesterModel";
import ServiceCatalogTechnicianRequestersActions from "./ServiceCatalogTechnicianRequestersActions";
import { fetchMainClassificationById } from "../../../../redux/features/mainClassification/mainClassificationByIdSlice";
import { fetchMainClassificationTechnicians } from "../../../../redux/features/mainClassification/mainClassificationTechniciansSlice";
import { fetchMainClassificationRequesters } from "../../../../redux/features/mainClassification/mainClassificationRequestersSlice";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/index";
import { DisplayNameFourProps } from "@4eplatform/shared/functions/displayName";
import { UserGender } from "@4eplatform/gateway/src/app/models/response-status";

function ServiceCatalogTab({ id }: any) {
  const intl = useIntl();
  const language = intl.locale;
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [serviceType, setServiceType] = useState<number>(0);
  const [teamName, setTeamName] = useState<string>("");
  const [employeeTechnicianIds, setEmployeeTechnicanIds] = useState<string[]>(
    []
  );
  const [employeeTechnicianNames, setEmployeeTechnicianNames] = useState<
    string[]
  >([]);
  const [employeeRequesterIds, setEmployeeRequesterIds] = useState<string[]>(
    []
  );
  const [employeeRequesterNames, setEmployeeRequesterNames] = useState<
    string[]
  >([]);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [modalH1Show, setModalH1Show] = useState<boolean>(false);
  const [modalH2Show, setModalH2Show] = useState<boolean>(false);

  const serviceCatalogById = useSelector((state: RootState) => {
    return state?.serviceCatalogById?.data;
  });
  const serviceCatalogRequesters = useSelector((state: RootState) => {
    return state?.serviceCatalogRequesters?.data;
  });
  const serviceCatalogTechnicians = useSelector((state: RootState) => {
    return state?.serviceCatalogTechnicians?.data;
  });
  const mainClassificationName = useSelector((state: RootState) => {
    return state?.mainClassificationById?.data?.name;
  });
    const mainClassificationNameEn = useSelector((state: RootState) => {
    return state?.mainClassificationById?.data?.nameEn;
  });
  // const mainClassificcationTechnicians = useSelector((state: RootState) => {
  //   return state?.mainClassificationTechnicians;
  // });
  // const mainClassificcationRequesters = useSelector((state: RootState) => {
  //   return state?.mainClassificationRequesters;
  // });

  useEffect(() => {
    dispatch(fetchServiceCatalogTechnicians(id) as any);
    dispatch(fetchServiceCatalogRequesters(id) as any);
  }, [id, serviceCatalogById]);

  useEffect(() => {
    setServiceType(serviceCatalogById?.serviceType);
    setTeamName(serviceCatalogById?.teamName as string);
  }, [serviceCatalogById]);

  useEffect(() => {
    setSelectedOption(
      serviceCatalogRequesters?.length > 0 ? "option2" : "option1"
    );
  }, [serviceCatalogRequesters]);

  const handleOptionChange = (changeEvent: any) => {
    setSelectedOption(changeEvent);
  };
  const addAllRequesters = () => {
    const body = {
      serviceCatalogId: id,
      areAllUsersRequesters: true,
    };
    dispatch(addServiceCatalogRequester(body as any) as any).then(
      (res: any) => {
        return setMessage(res?.payload?.message);
      }
    );
  };

  useEffect(() => {
    dispatch(
      fetchMainClassificationById(
        serviceCatalogById?.mainClassificationId
      ) as any
    );
  }, [serviceCatalogById]);

  useEffect(() => {
    setEmployeeTechnicanIds(
      serviceCatalogTechnicians?.map((technician) => {
        return technician?.userId;
      }) || []
    );
    setEmployeeTechnicianNames(
      serviceCatalogTechnicians?.map((technician) => {
        return technician?.userName;
      }) || []
    );
  }, [serviceCatalogTechnicians]);

  useEffect(() => {
    setEmployeeRequesterIds(
      serviceCatalogRequesters?.map((requester: any) => {
        return requester?.userId;
      }) || []
    );
    setEmployeeRequesterNames(
      serviceCatalogRequesters?.map((requester: any) => {
        return requester?.userName;
      }) || []
    );
  }, [serviceCatalogRequesters]);

  useEffect(() => {
    const params: any = {
      pageSize: 1000,
      pageNumber: 1,
    };

    if (serviceCatalogById) {
      const classificationId = serviceCatalogById?.mainClassificationId;

      if (classificationId) {
        dispatch(
          fetchMainClassificationTechnicians({
            id: classificationId,
            params,
          }) as any
        );
        dispatch(
          fetchMainClassificationRequesters({
            id: classificationId,
            params,
          }) as any
        );
      }
    }
  }, [serviceCatalogById]);

  useEffect(() => {
    if (message == "Requesters Has Been Added") {
      showSuccessAlert(true, "AddedSuccessfully", intl);
    }
    return () => {
      setMessage("");
    };
  }, [message]);
  const [imgError, setImgError] = useState(false);
  return (
    <Fragment>
      <div className="col-md-6">
        <div className="h-50 pt-0 p-4 pt-0  ">
          <p
            className="fw-bolder fs-4 mb-3"
            style={{ textAlign: language == "ar" ? "right" : "left" }}
          >
  {intl.locale=="ar" ? `${mainClassificationName} / ${serviceCatalogById?.name}`:
  `${mainClassificationNameEn || "Classification Name"} / ${serviceCatalogById?.nameEn || "Service Catalog"}`
  }
          </p>

          <div className="d-flex flex-column mb-6 mt-5">
            <label
              className="fs-6 fw-bold mb-2"
              htmlFor="ServiceType"
              style={{ textAlign: language == "ar" ? "right" : "left" }}
            >
              {intl.formatMessage({ id: "ServiceType" })}{" "}
            </label>
            {/* <select
              id="ServiceType"
              value={serviceType}
              className="form-select form-select-solid mt-1"
            >
              <option value={0}>{intl.formatMessage({ id: "Choose" })}</option>
              <option value={1}>{intl.formatMessage({ id: "All" })}</option>
              <option value={2}>
                {intl.formatMessage({ id: "ServiceReqest" })}
              </option>
              <option value={3}>
                {intl.formatMessage({ id: "ReportAService" })}
              </option>
            </select> */}
            <input
              value={
                serviceType == 1
                  ? intl.formatMessage({ id: "All" })
                  : serviceType == 2
                    ? intl.formatMessage({ id: "ServiceReqest" })
                    : intl.formatMessage({ id: "ReportAService" })
              }
              readOnly
              onChange={() => {}}
              className="form-control form-control-solid"
            />
          </div>

          {/* <div className="d-flex flex-column mb-6">
            <label
              className="fs-6 fw-bold mb-5"
              htmlFor="TeamName"
              style={{ textAlign: language == "ar" ? "right" : "left" }}
            >
              {intl.formatMessage({ id: "TeamName" })}{" "}
            </label>

            <div className="position-relative w-100 ">
              <input
                type="search"
                name="TeamName"
                className="input input-group searchBoxDesign search_input"
                id="searchForProject"
                placeholder={intl.formatMessage({
                  id: "EnterTeamName",
                })}
                value={teamName}
              />
              <i className="fa-solid fa-light fa-magnifying-glass my-magnify fs-3 text-muted fa-fw position-absolute"></i>
            </div>
          </div> */}
          <p
            className="fw-bolder fs-4 mb-3 text-primary"
            style={{ textAlign: language == "ar" ? "right" : "left" }}
          >
            {intl.formatMessage({
              id: "OrderExecutorsData",
            })}{" "}
          </p>
          <div className="d-flex flex-column mb-6">
            <label
              className="fs-6 fw-bold mb-2"
              htmlFor="name"
              style={{ textAlign: language == "ar" ? "right" : "left" }}
            >
              {intl.formatMessage({ id: "EmployeeName" })}{" "}
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user-cog special"></i>
                </span>
              </div>
              <input
                className="form-control"
                placeholder={intl.formatMessage({
                  id: "EmployeeName",
                })}
                value={employeeTechnicianNames}
                onChange={() => {}}
              />
              <div className="h-110 d-flex" role="button">
                <span
                  className="input-group-text"
                  onClick={() => setModalH1Show(true)}
                >
                  <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                </span>
              </div>
            </div>
          </div>

          {/* <div className="d-flex flex-column mb-6">
            <label
              className="fs-6 fw-bold mb-2"
              htmlFor="power"
              style={{ textAlign: language == "ar" ? "right" : "left" }}
            >
              {intl.formatMessage({ id: "Power" })}{" "}
            </label>
            <select id="power" className="form-select form-select-solid mt-1">
              <option disabled selected>
                {intl.formatMessage({ id: "Power" })}
              </option>
            </select>
          </div> */}
          <div
            className="mt-3 mb-5"
            style={{ maxHeight: "450px", overflowY: "auto" }}
          >
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-100px text-center">ID</th>
                  <th className="min-w-150px text-center">
                    {intl.formatMessage({ id: "EmployeesData" })}{" "}
                  </th>
                  {/* <th className="min-w-100px text-center">
                    {intl.formatMessage({
                      id: "Power",
                    })}{" "}
                  </th> */}
                  <th className="min-w-100px text-center">
                    {intl.formatMessage({ id: "Options" })}{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {serviceCatalogTechnicians?.map(
                  (item: TechnicianRequesterModel, index: number) => {
                    const fullName = DisplayNameFourProps(
                      item?.firstName,
                      item?.secondName,
                      item?.thirdName,
                      item?.forthName
                    );
                    // let { name, id, img, jobPosition, power } = item;
                    return (
                      <Fragment key={index}>
                        <tr>
                          <td className="text-center"> {index + 1}</td>
                          <td className="text-center">
                            <div className="d-flex align-items-center">
                              <div className=" ms-1 symbol symbol-50 symbol-light mr-4">
                                <span className="symbol-label">
                                  <img
                                      src={
                                     !imgError && item?.imgUrl && item?.imgUrl !== "null" && item?.imgUrl !== ""
                                      ? `${UserManagmentRootUrl}${item?.imgUrl}`
                                : toAbsoluteUrl("/media/avatars/user.jpeg")
                                  }
                                onError={() => setImgError(true)}
                                    className="h-75 w-75 mb-2 align-self-end rounded-circle "
                                    alt=""
                                  />
                                </span>
                              </div>
                              <div>
                                <span className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                                  {item?.userName}
                                </span>
                                <span className="text-muted font-weight-bold d-block">
                                  {fullName} {}
                                </span>
                                <span className="text-muted font-weight-bold d-block">
                                  {/* {jobPosition} */}
                                  {language == "ar"
                                    ? item?.jobNameAr
                                    : item?.jobNameEn}
                                </span>
                              </div>
                            </div>
                          </td>
                          {/* <td className="text-center">{power}--</td> */}
                          <td className="text-center">
                            <ServiceCatalogTechnicianRequestersActions
                              id={item?.userId}
                              serviceCatalogId={id}
                              type="technician"
                            />
                          </td>
                        </tr>
                      </Fragment>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <br />
          <p
            className="fw-bolder fs-4 my-5 text-primary "
            style={{ textAlign: language == "ar" ? "right" : "left" }}
          >
            {intl.formatMessage({
              id: "RequestorsData",
            })}{" "}
          </p>

          {/* //radio buttons */}

          <div className="col-12">
            <div className="d-flex p-3 filed_background mb-3">
              <div className="form-check form-check-success form-check-sm form-check-custom mx-3">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={selectedOption === "option1"}
                  name="options"
                  value="option1"
                  id="option1"
                  onChange={(e) => {
                    handleOptionChange(e.target.value);
                    addAllRequesters();
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="option1"
                  style={{ color: "black" }}
                >
                  {intl.formatMessage({ id: "All" })}
                </label>
              </div>
              {/* <div className="form-check form-check-success form-check-sm form-check-custom">
                <input
                  className="form-check-input"
                  type="radio"
                  name="options"
                  checked={selectedOption === "option2"}
                  value="option2"
                  id="option2"
                  onChange={(e) => handleOptionChange(e.target.value)}
                />
                <label
                  className="form-check-label"
                  htmlFor="option2"
                  style={{ color: "black" }}
                >
                  {intl.formatMessage({ id: "Specify" })}
                </label>
              </div> */}
            </div>
          </div>

          {selectedOption === "option2" && (
            <>
              <div className="d-flex flex-column mb-6">
                <label className="fs-6 fw-bold mb-3" htmlFor="name">
                  {intl.formatMessage({
                    id: "AdminstrationOrEmployeeName",
                  })}{" "}
                </label>

                <div className="input-group">
                  <input
                    className="form-control form-control-solid"
                    placeholder={intl.formatMessage({
                      id: "AdminstrationOrEmployeeName",
                    })}
                    value={employeeRequesterNames?.join("-")}
                    onChange={() => {}}
                  />
                  <div
                    className="input-group-prepend  h-100 d-flex"
                    role="button"
                  >
                    {/* <span className="input-group-text">
                      <i className="bi bi-plus-lg text-muted"></i>
                    </span> */}
                    <span
                      className="input-group-text"
                      onClick={() => setModalH2Show(true)}
                    >
                      <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className=" mt-3"
                style={{ maxHeight: "450px", overflowY: "auto" }}
              >
                <table className="table table-rounded border  table-row-gray-200 align-middle gs-0 gy-4 text-center">
                  <thead>
                    <tr className="fw-bold bg-light">
                      <th className="min-w-100px text-center  border-end border-bottom">
                        ID
                      </th>
                      <th className="min-w-150px text-center  border-end border-bottom">
                        {intl.formatMessage({
                          id: "AdminstrationOrEmployeeData",
                        })}{" "}
                      </th>

                      <th className="min-w-100px text-center border-end border-bottom">
                        {intl.formatMessage({ id: "Options" })}{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {serviceCatalogRequesters?.map(
                      (item: TechnicianRequesterModel, index: number) => {
                        const fullName = DisplayNameFourProps(
                          item?.firstName,
                          item?.secondName,
                          item?.thirdName,
                          item?.forthName
                        );
                        // let { name, id, img, jobPosition, power } = item;
                        return (
                          <Fragment key={index}>
                            <tr>
                              <td className="text-center"> {index + 1}</td>
                              <td className="text-center">
                                <div className="d-flex align-items-center">
                                  <div className=" ms-1 symbol symbol-50 symbol-light mr-4">
                                    <span className="symbol-label">
                                      <img
                                         src={
                                           !imgError && item?.imgUrl && item?.imgUrl !== "null" && item?.imgUrl !== ""
                                          ? `${UserManagmentRootUrl}${item?.imgUrl}`
                                       : toAbsoluteUrl("/media/avatars/user.jpeg")
                                       }
                                        onError={() => setImgError(true)}
                                        className="h-75 mb-2 align-self-end rounded-circle "
                                        alt=""
                                      />
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                                      {item?.userName}
                                    </span>
                                    <span className="text-muted font-weight-bold d-block">
                                      {fullName} {}
                                    </span>
                                    <span className="text-muted font-weight-bold d-block">
                                      {/* {jobPosition} */}
                                      {language == "ar"
                                        ? item?.jobNameAr
                                        : item?.jobNameEn}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              {/* <td className="text-center">{power}--</td> */}
                              <td className="text-center">
                                <ServiceCatalogTechnicianRequestersActions
                                  id={item?.userId}
                                  serviceCatalogId={id}
                                  type="requester"
                                />
                              </td>
                            </tr>
                          </Fragment>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <EmployeeHierarchyServiceCatalogTechnicianPopup
        show={modalH1Show}
        handleClose={() => setModalH1Show(false)}
        employeeIds={employeeTechnicianIds}
        setEmployeeIds={setEmployeeTechnicanIds}
        setEmployeeNames={setEmployeeTechnicianNames}
        id={id}
      />
      <EmployeeHierarchyServiceCatalogRequesterPopup
        show={modalH2Show}
        handleClose={() => setModalH2Show(false)}
        employeeIds={employeeRequesterIds}
        setEmployeeIds={setEmployeeRequesterIds}
        setEmployeeNames={setEmployeeRequesterNames}
        id={id}
      />
    </Fragment>
  );
}

export default ServiceCatalogTab;
