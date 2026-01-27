import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { fetchItemById } from "../../../../redux/features/item/itemByIdSlice";
import { EmployeeHierarchyItemTechniciansPopup } from "./EmployeeHierarchyItemTechniciansPopup";
import { fetchItemTechnicians } from "../../../../redux/features/item/itemTechniciansSlice";
import { EmployeeHierarchyItemRequestersPopup } from "./EmployeeHierarchyItemRequestersPopup";
import {
  addItemRequester,
  fetchItemRequesters,
} from "../../../../redux/features/item/itemRequestersSlice";
import { TechnicianRequesterModel } from "../../../../models/TechnicianRequesterModel";
import { TableActions } from "./TableActions";
import { fetchMainClassificationById } from "../../../../redux/features/mainClassification/mainClassificationByIdSlice";
import { getCategoryById } from "../../../../redux/features/category/categoryByIdSlice";
import { fetchServiceCatalogById } from "../../../../redux/features/serviceCatalog/serviceCatalogByIdSlice";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/index";
import { DisplayNameFourProps } from "@4eplatform/shared/functions/displayName";
import { UserGender } from "@4eplatform/gateway/src/app/models/response-status";

function ItemTab({ id }: any) {
  let [message, setMessage] = useState("");
  let [employeeTechnicianIds, setEmployeeTechnicanIds] = useState<string[]>([]);
  let [employeeTechnicianNames, setEmployeeTechnicianNames] = useState<
    string[]
  >([]);
  let [employeeRequesterIds, setEmployeeRequesterIds] = useState<string[]>([]);
  let [employeeRequesterNames, setEmployeeRequesterNames] = useState<string[]>(
    [],
  );
  let intl = useIntl();
  let language = intl.locale;
  let dispatch = useDispatch();
  //dataOfItemById
  let itemById = useSelector((state: RootState) => {
    return state?.itemById?.data;
  });
  let itemTechnicians = useSelector((state: RootState) => {
    return state?.itemTechnician?.data;
  });
  let itemRequesters = useSelector((state: RootState) => {
    return state?.itemRequesters?.data;
  });

  useEffect(() => {
    let params: any = {
      pageSize: 10000,
      pageNumber: 1,
    };
    dispatch(fetchItemById(id) as any);
    dispatch(fetchItemTechnicians(id) as any);
    dispatch(fetchItemRequesters({ id, params }) as any);
  }, [id]);

  const [selectedOption, setSelectedOption] = useState("option2");
  const [modalH1Show, setModalH1Show] = useState<boolean>(false);
  const [modalH2Show, setModalH2Show] = useState<boolean>(false);

  // useEffect(() => {
  //   setSelectedOption(itemRequesters?.length > 0 ? "option2" : "option1");
  // }, [itemRequesters]);

  const handleOptionChange = (changeEvent: any) => {
    setSelectedOption(changeEvent);
  };

  useEffect(() => {
    setSelectedOption(
      itemById?.result?.canBeRequestedByAllUsers ? "option1" : "option2",
    );
  }, [itemById]);

  const addAllRequesters = () => {
    let body = {
      itemId: id,
      canBeRequestedByAllUsers: true,
      requesterIds: [],
    };
    dispatch(addItemRequester(body as any) as any).then((res: any) => {
      return setMessage(res?.payload?.message);
    });
  };

  useEffect(() => {
    if (message == "Item requesters added successfully") {
      showSuccessAlert(true, "AddedSuccessfully", intl);
    }
    return () => {
      setMessage("");
    };
  }, [message]);

  useEffect(() => {
    return () => {
      setEmployeeTechnicanIds([]);
      setEmployeeTechnicianNames([]);
    };
  }, [id]);
  let mainClassification = useSelector((state: RootState) => {
    return state?.mainClassificationById?.data;
  });
  let serviceCatalog = useSelector((state: RootState) => {
    return state?.serviceCatalogById?.data;
  });
  useEffect(() => {
    if (itemById?.result?.categoryId)
      dispatch(getCategoryById(itemById?.result?.categoryId) as any);
  }, [itemById?.result?.categoryId]);

  let categoryById = useSelector((state: RootState) => {
    return state?.categoryById?.data;
  });

  useEffect(() => {
    if (categoryById?.serviceCatalogId)
      dispatch(fetchServiceCatalogById(categoryById?.serviceCatalogId) as any);
  }, [categoryById?.serviceCatalogId]);

  useEffect(() => {
    if (serviceCatalog?.mainClassificationId)
      dispatch(
        fetchMainClassificationById(
          serviceCatalog?.mainClassificationId,
        ) as any,
      );
  }, [serviceCatalog?.mainClassificationId]);

  useEffect(() => {
    setEmployeeTechnicanIds(
      itemTechnicians?.map((technician) => {
        return technician?.userId;
      }) || [],
    );
    setEmployeeTechnicianNames(
      itemTechnicians?.map((technician) => {
        return technician?.userName;
      }) || [],
    );
  }, [itemTechnicians]);
  useEffect(() => {
    setEmployeeRequesterIds(
      itemRequesters?.map((requester) => {
        return requester?.userId;
      }) || [],
    );
    setEmployeeRequesterNames(
      itemRequesters?.map((requester) => {
        return requester?.userName;
      }) || [],
    );
  }, [itemRequesters]);
  const [imgError, setImgError] = useState(false);
  return (
    <Fragment>
      <div className="col-md-6">
        <div className="h-50 pt-0 p-4 pt-0  ">
          <p
            className="fw-bolder fs-4 mb-3"
            style={{ textAlign: language == "ar" ? "right" : "left" }}
          >
            {" "}
            {intl?.locale == "ar" ? (
              <>
                <span>{mainClassification?.name}</span> /
                <span>{serviceCatalog?.name}</span> /
                <span>{categoryById?.name}</span> /
                <span>{itemById?.result?.name}</span>
              </>
            ) : (
              <>
                <span>
                  {mainClassification?.nameEn || "Classification Name"}
                </span>{" "}
                /<span>{serviceCatalog?.nameEn || "Service Catalog Name"}</span>{" "}
                /<span>{categoryById?.nameEn || "Catagory Name"}</span> /
                <span>{itemById?.result?.nameEn || "Item Name"}</span>
              </>
            )}
          </p>
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
          {/* 
          <div className="d-flex flex-column mb-6">
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
                {itemTechnicians?.map(
                  (item: TechnicianRequesterModel, index) => {
                    const fullName = DisplayNameFourProps(
                      item?.firstName,
                      item?.secondName,
                      item?.thirdName,
                      item?.forthName,
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
                                      !imgError &&
                                      item?.imgUrl &&
                                      item?.imgUrl !== "null" &&
                                      item?.imgUrl !== ""
                                        ? `${UserManagmentRootUrl}${item?.imgUrl}`
                                        : toAbsoluteUrl(
                                            "/media/avatars/user.jpeg",
                                          )
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
                                  {language == "ar"
                                    ? item?.jobNameAr
                                    : item?.jobNameEn}
                                </span>
                              </div>
                            </div>
                          </td>
                          {/* <td className="text-center">{power}</td> */}
                          <td className="text-center">
                            <TableActions
                              id={item?.userId}
                              parentId={id}
                              type="Technicians"
                              tabType="item"
                            />
                          </td>
                        </tr>
                      </Fragment>
                    );
                  },
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
              <div className="form-check form-check-success form-check-sm form-check-custom">
                <input
                  className="form-check-input"
                  type="radio"
                  name="options"
                  checked={selectedOption === "option2"}
                  value="option2"
                  id="option2"
                  onChange={(e) => {
                    handleOptionChange(e.target.value);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="option2"
                  style={{ color: "black" }}
                >
                  {intl.formatMessage({ id: "Specify" })}
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
                    {itemRequesters?.map(
                      (item: TechnicianRequesterModel, index) => {
                        const fullName = DisplayNameFourProps(
                          item?.firstName,
                          item?.secondName,
                          item?.thirdName,
                          item?.forthName,
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
                                          !imgError &&
                                          item?.imgUrl &&
                                          item?.imgUrl !== "null" &&
                                          item?.imgUrl !== ""
                                            ? `${UserManagmentRootUrl}${item?.imgUrl}`
                                            : toAbsoluteUrl(
                                                "/media/avatars/user.jpeg",
                                              )
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
                                      {language == "ar"
                                        ? item?.jobNameAr
                                        : item?.jobNameEn}
                                      {/* {jobPosition} */}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              {/* <td className="text-center">{power}</td> */}
                              <td className="text-center">
                                <TableActions
                                  id={item?.userId}
                                  parentId={id}
                                  type="Requesters"
                                  tabType="item"
                                />
                              </td>
                            </tr>
                          </Fragment>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <EmployeeHierarchyItemTechniciansPopup
        show={modalH1Show}
        handleClose={() => setModalH1Show(false)}
        employeeIds={employeeTechnicianIds}
        setEmployeeIds={setEmployeeTechnicanIds}
        setEmployeeNames={setEmployeeTechnicianNames}
        id={id}
      />
      <EmployeeHierarchyItemRequestersPopup
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

export default ItemTab;
