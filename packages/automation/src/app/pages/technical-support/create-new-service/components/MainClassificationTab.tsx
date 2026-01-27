import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { EmployeeHierarchyMainClassificationTechniciansPopup } from "./EmployeeHierarchyMainClassificationTechniciansPopup";
import { fetchMainClassificationTechnicians } from "../../../../redux/features/mainClassification/mainClassificationTechniciansSlice";
import { EmployeeHierarchyMainClassificationRequestersPopup } from "./EmployeeHierarchyMainClassificationRequestersPopup";
import {
  addMainClassificationRequester,
  fetchMainClassificationRequesters,
} from "../../../../redux/features/mainClassification/mainClassificationRequestersSlice";
import { TechnicianRequesterModel } from "../../../../models/TechnicianRequesterModel";
import MainClassificationsTechnicianRequesterActions from "./MainClassificationsTechnicianRequesterActions";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/index";
import { DisplayNameFourProps } from "@4eplatform/shared/functions/displayName";
import { UserGender } from "@4eplatform/gateway/src/app/models/response-status";

function MainClassificationTab({ id }: any) {
  const intl = useIntl();
  const language = intl.locale;
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
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
  const [serviceType, setServiceType] = useState<number>(0);
  const [type, setType] = useState<any>("");
  const [teamName, setTeamName] = useState<string>("");

  const mainClassificationById = useSelector((state: RootState) => {
    return state?.mainClassificationById?.data;
  });

  const mainClassificationTechnicians = useSelector((state: RootState) => {
    return state?.mainClassificationTechnicians?.data;
  });

  const mainClassificationRequesters = useSelector((state: RootState) => {
    return state?.mainClassificationRequesters?.data;
  });

  const tree = useSelector((state: RootState) => {
    return state?.mainClassificationTree?.data;
  });

  useEffect(() => {
    const params: any = {
      pageSize: 10000,
      pageNumber: 1,
    };
    if (id) {
      dispatch(fetchMainClassificationTechnicians({ id, params }) as any);
      dispatch(fetchMainClassificationRequesters({ id, params }) as any);
      dispatch(fetchMainClassificationTree(id) as any);
    }
  }, [id]);

  useEffect(() => {
    setSelectedOption(
      mainClassificationRequesters?.length > 0 ? "option2" : "option1"
    );
  }, [mainClassificationRequesters]);

  const handleOptionChange = (changeEvent: any) => {
    setSelectedOption(changeEvent);
  };

  useEffect(() => {

    setType(mainClassificationById?.serviceType);
  }, [tree]);

  useEffect(() => {
    setTeamName(mainClassificationById?.teamName);
  }, [mainClassificationById]);

  useEffect(() => {
    setServiceType(type);
  }, [type, mainClassificationById]);

  const addAllRequesters = () => {
    let body = {
      areAllRequesters: true,
      mainClassificationId: id,
    };
    dispatch(addMainClassificationRequester(body as any) as any).then(
      (res: any) => {
        return setMessage(res?.payload?.message);
      }
    );
  };

  useEffect(() => {
    if (message == "Requesters Has Been Added") {
      showSuccessAlert(true, "AddedSuccessfully", intl);
    }
    return () => {
      setMessage("");
    };
  }, [message]);

  useEffect(() => {
    setEmployeeTechnicanIds(
      mainClassificationTechnicians?.map((technician) => {
        return technician?.userId;
      }) || []
    );
    setEmployeeTechnicianNames(
      mainClassificationTechnicians?.map((technician) => {
        return technician?.userName;
      }) || []
    );
  }, [mainClassificationTechnicians]);

  useEffect(() => {
    setEmployeeRequesterIds(
      mainClassificationRequesters?.map((requester: any) => {
        return requester?.userId;
      }) || []
    );
    setEmployeeRequesterNames(
      mainClassificationRequesters?.map((requester: any) => {
        return requester?.userName;
      }) || []
    );
  }, [mainClassificationRequesters]);

  const [imgError, setImgError] = useState(false);
  return (
    <Fragment>
      <div className="col-md-6">
        <div className="h-50 pt-0 p-4 pt-0  ">
          <p
            className="fw-bolder fs-4 mb-3"
            style={{ textAlign: language == "ar" ? "right" : "left" }}
          >
            {intl.locale == "ar" ? mainClassificationById?.name:(mainClassificationById?.nameEn||"Classification Name")}
          </p>

          <div className="d-flex flex-column mb-6 mt-5">
            <label
              className="fs-6 fw-bold mb-2"
              htmlFor="ServiceType"
              style={{ textAlign: language == "ar" ? "right" : "left" }}
            >
              {intl.formatMessage({ id: "ServiceType" })}{" "}
            </label>
            <input
              value={
                serviceType == 1
                  ? intl.formatMessage({ id: "All" })
                  : serviceType == 2
                    ? intl.formatMessage({ id: "ServiceReqest" })
                    : intl.formatMessage({ id: "ReportAService" })
              }
              onChange={() => {}}
              readOnly
              className="form-control form-control-solid"
            />
          </div>

          <div className="d-flex flex-column mb-6">
            <label
              className="fs-6 fw-bold mb-5"
              htmlFor="TeamName"
              style={{ textAlign: language == "ar" ? "right" : "left" }}
            >
              {intl.formatMessage({ id: "TeamName" })}{" "}
            </label>

            <div className="position-relative w-100 ">
              <input
                type="text"
                readOnly
                name="searchForProject"
                className="input input-group searchBoxDesign search_input"
                id="TeamName"
                value={mainClassificationById?.teamName}
                onChange={() => {}}
              />
            </div>
          </div>
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
                value={employeeTechnicianNames?.join("-")}
                name="name"
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
                  <th className="min-w-100px text-center">
                    {intl.formatMessage({ id: "Options" })}{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {mainClassificationTechnicians?.map(
                  (item: TechnicianRequesterModel, index) => {
                    const fullName = DisplayNameFourProps(
                      item?.firstName,
                      item?.secondName,
                      item?.thirdName,
                      item?.forthName
                    );
                    return (
                      <Fragment 
                      key={index}
                      >
                        <tr>
                          <td className="text-center"> {index + 1}</td>
                          <td className="text-center">
                            <div className="d-flex align-items-center">
                              <div className=" ms-1 symbol symbol-50 symbol-light mr-4">
                                <span className="symbol-label">
                                  <img
                                    className="h-75 w-75 mb-2 align-self-end rounded-circle "
                                    alt=""
                                      src={
                                     !imgError && item?.imgUrl && item?.imgUrl !== "null" && item?.imgUrl !== ""
                                      ? `${UserManagmentRootUrl}${item?.imgUrl}`
                                : toAbsoluteUrl("/media/avatars/user.jpeg")
                                  }
                                onError={() => setImgError(true)}
                                  />
                                </span>
                              </div>
                              <div>
                                <div className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                                  {item?.userName}
                                </div>
                                <span className="text-muted font-weight-bold d-block">
                                  {fullName} {}
                                </span>
                                <span className="text-muted font-weight-bold d-block">
                                  {language == "ar"
                                    ? item?.jobNameAr
                                    : item?.jobNameEn}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <MainClassificationsTechnicianRequesterActions
                              id={item?.userId}
                              mainClassificationId={id}
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
                    addAllRequesters();
                    handleOptionChange(e.target.value);
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
                    value={employeeRequesterNames.join("-")}
                    onChange={() => {}}
                  />
                  <div
                    className="input-group-prepend  h-100 d-flex"
                    role="button"
                  >
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
                className="mt-3"
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
                    {mainClassificationRequesters?.map(
                      (item: TechnicianRequesterModel, index: number) => {
                        const fullName = DisplayNameFourProps(
                          item?.firstName,
                          item?.secondName,
                          item?.thirdName,
                          item?.forthName
                        );
                        // let { name, id, img, jobPosition, power } = item;
                        return (
                          <Fragment 
                          key={index}
                          >
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
                                <MainClassificationsTechnicianRequesterActions
                                  id={item?.userId}
                                  mainClassificationId={id}
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
      <EmployeeHierarchyMainClassificationTechniciansPopup
        show={modalH1Show}
        handleClose={() => setModalH1Show(false)}
        employeeIds={employeeTechnicianIds}
        setEmployeeIds={setEmployeeTechnicanIds}
        setEmployeeNames={setEmployeeTechnicianNames}
        id={id}
      />
      <EmployeeHierarchyMainClassificationRequestersPopup
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

export default MainClassificationTab;
