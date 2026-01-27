import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
} from "../../../strategic-communication/src/app/store/store";
import {
  fetchOrgsWithEmployee,
  fetchOrgs,
} from "../../../strategic-communication/src/app/features/allOrgsHierarchySlice";
import { showAlert } from "../../services/showAlert";
import { OrgModel } from "../../../strategic-communication/src/app/models/OrgsModel";

const EN_LANG = "en";

type PopupProps = {
  show: boolean;
  handleClose: any;
  title?: string;
  popupTitle?: any;
  employees: { id: string; name: string }[];
  setEmployees: any;
  orgs: { id: string; name: string }[];
  setOrgs: any;
  availableFor: any;
  setAvailableFor: any;
};
export const ManagementEmployeeHierarchyPopup: FC<PopupProps> = ({
  show,
  handleClose,
  availableFor,
  setAvailableFor,
  title,
  popupTitle,
  employees,
  setEmployees,
  orgs,
  setOrgs,
}) => {
  const intl = useIntl();
  let selectedLang: string | null = localStorage.getItem("i18nConfig");
  const dispatch = useDispatch<AppDispatch>();

  const MANAGEMENT = 1;
  const EMPLOYEE = 0;
  // const [hierarchyType, setHierarchyType] = useState(MANAGEMENT);
  const [searchTerm, setSearchTerm] = useState("");
  let [selectedUsers, setSelectedUsers] = useState<any>([]);
  const { orgswithEmployees, allOrgs } = useSelector((state: RootState) => {
    return state?.allorgsHierarchy;
  });

  useEffect(() => {
    if (show) {
      dispatch(fetchOrgsWithEmployee({}));
      dispatch(fetchOrgs({}));
    }
  }, [dispatch, show]);

  useEffect(() => {
    if (employees?.length > 0) {
      setSelectedUsers(
        employees?.map((user) => {
          return {
            id: user?.id,
            name: user?.name,
          };
        }),
      );
    }
  }, [employees]);

  try {
    if (selectedLang) {
      const parsedLang = JSON.parse(selectedLang);
      selectedLang = parsedLang.selectedLang;
    } else {
      selectedLang = null;
    }
  } catch (err) {
    selectedLang = null;
  }

  const handleCheckboxChange = (item: any, isChecked: boolean) => {
    setSelectedUsers((prev) => {
      if (isChecked) {
        if (!prev.find((emp) => emp.id === item.userId)) {
          return [
            ...prev,
            { id: item.userId, name: item.firstName + " " + item.secondName },
          ];
        }
        return prev;
      } else {
        return prev.filter((emp) => emp.id !== item.userId);
      }
    });
  };

  let [searchedMangments, setSearchedMangments] = useState<any>([]);
  let [allMangments, setAllMangments] = useState<any>([]);

  useEffect(() => {
    setSearchedMangments(() => {
      if (searchTerm == "") {
        return [...allMangments];
      } else {
        return allMangments?.map((ele: any) => {
          return {
            ...ele,
            collapsed: true,
            mebmers: ele?.mebmers?.filter((member: any) => {
              return member?.userNmae
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase());
            }),
          };
        });
      }
    });
  }, [searchTerm]);
  useEffect(() => {
    if (orgswithEmployees) {
      setAllMangments(
        orgswithEmployees?.map((item) => ({
          ...item,
          collapsed: true,
          checked: false,
        })),
      );
    }
  }, [orgswithEmployees]);
  useEffect(() => {
    setSearchedMangments(
      allMangments?.map((item: any) => ({
        ...item,
        collapsed: true,
        checked: false,
      })),
    );
  }, [allMangments]);
  let handleCollapse = (_: any, id: string) => {
    setAllMangments(
      allMangments?.map((ele: any) => {
        if (ele?.id == id) {
          return { ...ele, collapsed: !ele?.collapsed };
        } else {
          return { ...ele };
        }
      }),
    );
  };

  /////////////////////-----------------------------   ORGS   --------------------------------////////////////////////
  const [modifiedOrgs, setmodifiedOrgs] = useState<any>();
  let [selectedOrgs, setSelectedOrgs] = useState<any>([]);
  useEffect(() => {
    if (orgs.length > 0) {
      setSelectedOrgs(
        orgs?.map((org) => {
          return {
            id: org?.id,
            name: org?.name,
          };
        }),
      );
    }
  }, [orgs]);

  function modifyOrgs(items: any) {
    let x = items?.map((element: any) => {
      return {
        ...element,
        collapsed: true,
        checked: false,
        children: modifyOrgs(element.children),
      };
    });
    return x;
  }
  useEffect(() => {
    const modifiedOrgs = modifyOrgs(allOrgs);
    setmodifiedOrgs(modifiedOrgs);
  }, [allOrgs]);

  const handleChange = () => {
    if (modifiedOrgs) {
      setmodifiedOrgs([...modifiedOrgs]);
    }
  };
  const handleChildrenChecked = (item: OrgModel, isChecked: boolean) => {
    item.checked = isChecked;
    setSelectedOrgs((prev = []) => {
      if (isChecked) {
        if (!prev.find((org: OrgModel) => org?.id === item?.id)) {
          return [
            ...prev,
            {
              id: item?.id,
              name: intl.locale == "ar" ? item?.nameAr : item?.nameEn,
            },
          ];
        }
        return prev;
      } else {
        return prev.filter((org: OrgModel) => org?.id !== item.id);
      }
    });

    handleChange();
  };

  const handleCollapseOrgs = (item: OrgModel, id: string): {} => ({
    onClick: () => {
      item.collapsed = !item.collapsed;
      handleChange();
    },
  });

  useEffect(() => {
    if (show) {
      dispatch(fetchOrgs({}) as any);
    }
  }, [dispatch, show]);
  const renderNestedChildren = (children: any) => {
    return (
      <ul className="list-unstyled">
        {children?.map((child: OrgModel) => (
          <li className="branch mb-3" key={child?.id}>
            {child?.children && child?.children.length > 0 && (
              <i
                className={`fas fa-chevron-${
                  selectedLang === EN_LANG ? "right" : "left"
                } fa-xl text-primary`}
                {...(child?.children
                  ? handleCollapseOrgs(child, `${children?.id}${child?.id}`)
                  : {})}
              ></i>
            )}

            <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
              <input
                className="form-check-input widget-9-check xCheckBg"
                type="checkbox"
                name={`item_${child?.id}`}
                id={child?.id}
                checked={selectedOrgs
                  ?.map((org) => {
                    return org?.id;
                  })
                  ?.includes(child?.id)}
                onChange={() => {
                  handleChildrenChecked(child, !child?.checked);
                }}
              />
            </div>
            <label
              htmlFor={`${child?.id}`}
              className="collapsed"
              {...(child?.children
                ? handleCollapseOrgs(child, `${children?.id}${child?.id}`)
                : {})}
            >
              {intl.locale == "ar" ? child?.nameAr : child?.nameEn}
            </label>
            {/* nested children */}
            {child?.children?.length > 0 &&
              !child?.collapsed &&
              renderNestedChildren(child?.children || [])}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <div className="card overflow-auto" style={{ height: "95vh" }}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "flex-start",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <Modal.Title id="contained-modal-title-vcenter">
              <h3 className="card-title flex-column align-items-center">
                <span className="card-label fw-bolder fs-3 mb-2 d-flex justify-content-center w-100">
                  {intl.formatMessage({
                    id: "SelectEligibleForBadge",
                  })}
                </span>
                <span className="mt-1 fw-semibold fs-5 text-muted">
                  {intl.formatMessage({
                    id: "PleaseEnterTheData",
                  })}
                </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body className="pb-0 mx-4">
          <div className="d-flex justify-content-center align-items-center">
            <form className="w-400px position-relative mb-5" autoComplete="off">
              <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y">
                <KTSVG
                  path="/media/icons/duotune/general/gen114_search.svg"
                  className="px-2"
                />
              </span>
              {availableFor == MANAGEMENT ? (
                <>
                  <input
                    type="text"
                    className="form-control form-control-solid px-10"
                    name="search"
                    placeholder={intl.formatMessage({
                      id: "SearchWithManagementName",
                    })}
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    className="form-control form-control-solid px-10"
                    name="search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e?.target?.value);
                    }}
                    placeholder={intl.formatMessage({
                      id: "SearchWithEmployeeName",
                    })}
                  />
                </>
              )}
            </form>
          </div>

          <div className="row my-4">
            <div className="col-12 mb-4">
              <div className="d-flex gap-4 mt-3 bg-gray-100 py-3 px-2 rounded-2">
                <div className="d-flex align-items-center gap-20">
                  <div
                    onClick={() => {
                      setAvailableFor(MANAGEMENT);
                    }}
                    className="d-flex align-items-center"
                  >
                    <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                      <input
                        type="radio"
                        id="management"
                        name="userType"
                        value="management"
                        className="form-check-input widget-9-radio xRadioBg"
                        checked={availableFor == MANAGEMENT}
                      />
                    </div>
                    <label htmlFor="management" style={{ cursor: "pointer" }}>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-diagram-3 fs-1"></i>
                        {intl.formatMessage({ id: "Management " })}
                      </div>
                    </label>
                  </div>
                  <div
                    onClick={() => {
                      setAvailableFor(EMPLOYEE);
                    }}
                    className="d-flex align-items-center"
                  >
                    <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                      <input
                        type="radio"
                        id="members"
                        name="userType"
                        value="members"
                        className="form-check-input widget-9-radio xRadioBg"
                        checked={availableFor == EMPLOYEE}
                      />
                    </div>
                    <label htmlFor="members" style={{ cursor: "pointer" }}>
                      <div className="d-flex align-items-center gap-2">
                        <i className="fa-regular fa-user fs-4"></i>
                        {intl.formatMessage({ id: "Members" })}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="mb-2 pt-2 pb-3 custom_tree">
                {availableFor == MANAGEMENT ? (
                  <>
                    {modifiedOrgs?.map((item: any) => (
                      <div className="tree_main mb-5" key={item?.id}>
                        <ul id="tree1" className="tree list-unstyled">
                          <div className="fs-5 py-4 mb-7 d-flex align-items-center">
                            {item?.children?.length > 0 &&
                              (item?.collapsed && item?.children?.length > 0 ? (
                                <i
                                  className={`fas fa-chevron-${
                                    selectedLang === EN_LANG ? "right" : "left"
                                  } fa-xl text-primary`}
                                  {...handleCollapseOrgs(item, item?.id)}
                                ></i>
                              ) : (
                                <i
                                  className="fas fa-chevron-down fa-xl text-danger"
                                  {...handleCollapseOrgs(item, item?.id)}
                                ></i>
                              ))}

                            <div className=" d-inline mx-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                              <input
                                className="form-check-input widget-9-check xCheckBg mt-0"
                                type="checkbox"
                                name={`item_${item?.id}`}
                                onChange={() => {
                                  handleChildrenChecked(item, !item?.checked);
                                }}
                                id={item?.id}
                                checked={selectedOrgs
                                  ?.map((org) => {
                                    return org?.id;
                                  })
                                  ?.includes(item?.id)}
                              />
                            </div>
                            <div
                              className="d-inline-block"
                              {...handleCollapseOrgs(item, item?.id)}
                            >
                              <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                              <button className="basic-item bg-transparent border-0">
                                {intl.locale == "ar"
                                  ? item?.nameAr
                                  : item?.nameEn}
                              </button>
                            </div>
                          </div>
                          <div className="px-8 mx-4">
                            <li
                              className={`basic-branch branch accordion-collapse ${
                                item?.collapsed ? "collapse" : "show"
                              }`}
                              id={`flush-main-tree${item?.id}`}
                              aria-labelledby={`flush-main-tree${item?.id}`}
                              data-bs-parent={`#accordionFlushMainTree${item?.id}`}
                            >
                              <ul className="list-unstyled">
                                {item?.children?.map((child: any) => (
                                  <li className="branch mb-3" key={child?.id}>
                                    {child?.children?.length > 0 &&
                                      (child?.collapsed ? (
                                        <i
                                          className={`fas fa-chevron-${
                                            selectedLang === EN_LANG
                                              ? "right"
                                              : "left"
                                          } fa-xl text-primary`}
                                          {...(child?.children
                                            ? handleCollapseOrgs(
                                                child,
                                                `${item?.id}${child?.id}`,
                                              )
                                            : {})}
                                        ></i>
                                      ) : (
                                        <i
                                          className="fas fa-chevron-down fa-xl text-danger"
                                          {...(child?.children
                                            ? handleCollapseOrgs(
                                                child,
                                                `${item?.id}${child?.id}`,
                                              )
                                            : {})}
                                        ></i>
                                      ))}
                                    <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                      <input
                                        className="form-check-input widget-9-check xCheckBg"
                                        type="checkbox"
                                        name={`item_${child?.id}`}
                                        id={child?.id}
                                        checked={selectedOrgs
                                          ?.map((org) => {
                                            return org?.id;
                                          })
                                          ?.includes(child?.id)}
                                        onChange={() => {
                                          handleChildrenChecked(
                                            child,
                                            !child?.checked,
                                          );
                                        }}
                                      />
                                    </div>
                                    <label
                                      htmlFor={`${child?.id}`}
                                      className="collapsed"
                                      {...(child?.children
                                        ? handleCollapseOrgs(
                                            child,
                                            `${item?.id}${child?.id}`,
                                          )
                                        : {})}
                                    >
                                      {intl.locale == "ar"
                                        ? child?.nameAr
                                        : child?.nameEn}
                                    </label>
                                    {/* nested children */}
                                    {!child?.collapsed &&
                                      renderNestedChildren(
                                        child?.children || [],
                                      )}
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </div>
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {!searchTerm
                      ? allMangments?.map((ele: any) => (
                          <div className="tree_main mb-5" key={ele.id}>
                            <ul id="tree1" className="tree list-unstyled">
                              <div className="fs-5 py-4 mb-7 d-flex align-items-center">
                                {ele?.mebmers?.length > 0 &&
                                  (ele?.collapsed ? (
                                    <i
                                      className={`fas fa-chevron-${
                                        selectedLang === EN_LANG
                                          ? "right"
                                          : "left"
                                      } fa-xl text-primary`}
                                      onClick={() => {
                                        handleCollapse(ele, ele.id);
                                      }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="fas fa-chevron-down fa-xl text-danger"
                                      onClick={() => {
                                        handleCollapse(ele, ele.id);
                                      }}
                                    ></i>
                                  ))}
                                <div className=" d-inline mx-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md"></div>
                                <div className="d-inline-block">
                                  <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                                  <button className="basic-item bg-transparent border-0 title-text">
                                    {intl.locale === "ar"
                                      ? ele?.nameAr
                                      : ele?.nameEn}
                                  </button>
                                </div>
                              </div>
                              {ele?.collapsed ? (
                                <div className="px-8 mx-4">
                                  <li
                                    className="basic-branch branch accordion-collapse show"
                                    id={`flush-main-tree${ele?.id}`}
                                    aria-labelledby={`flush-main-tree${ele?.id}`}
                                    data-bs-parent={`#accordionFlushMainTree${ele?.id}`}
                                  >
                                    <ul className="list-unstyled">
                                      {ele?.mebmers?.map((child: any) => (
                                        <li
                                          className="branch mb-3"
                                          key={child?.userId}
                                        >
                                          <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                            <input
                                              className="form-check-input widget-9-check xCheckBg mt-0"
                                              type="checkbox"
                                              name="employee"
                                              checked={selectedUsers
                                                ?.map((employee) => {
                                                  return employee?.id;
                                                })
                                                ?.includes(child?.userId)}
                                              onChange={(e) => {
                                                handleCheckboxChange(
                                                  child,
                                                  e?.target?.checked,
                                                );
                                              }}
                                            />
                                          </div>
                                          <label
                                            className="collapsed"
                                            htmlFor="2"
                                          >
                                            {child?.userNmae}
                                          </label>
                                          <div className="my-8 px-8 mx-4">
                                            <ul
                                              className="list-unstyled accordion-collapse collapse"
                                              id={`flush-main-tree${ele?.id}${child?.userId}`}
                                              aria-labelledby={`flush-headingOne${ele?.id}${child?.userId}`}
                                              data-bs-parent={`#accordionFlushMainTree${ele?.id}${child?.userId}`}
                                            ></ul>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                </div>
                              ) : (
                                <></>
                              )}
                            </ul>
                          </div>
                        ))
                      : searchedMangments?.map((ele: any) => (
                          <div className="tree_main mb-5" key={ele.id}>
                            <ul id="tree1" className="tree list-unstyled">
                              <div className="fs-5 py-4 mb-7 d-flex align-items-center">
                                <div className=" d-inline mx-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md"></div>
                                <div
                                  className="d-inline-block"
                                  onClick={() => {
                                    handleCollapse(ele, ele.id);
                                  }}
                                >
                                  <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                                  <button className="basic-item bg-transparent border-0 title-text">
                                    {localStorage.getItem("i18nextLng") === "en"
                                      ? ele?.nameEn
                                      : ele?.nameAr}
                                  </button>
                                </div>
                              </div>
                              {ele?.collapsed ? (
                                <div className="px-8 mx-4">
                                  <li
                                    className="basic-branch branch accordion-collapse show"
                                    id={`flush-main-tree${ele?.id}`}
                                    aria-labelledby={`flush-main-tree${ele?.id}`}
                                    data-bs-parent={`#accordionFlushMainTree${ele?.id}`}
                                  >
                                    <ul className="list-unstyled">
                                      {ele?.mebmers?.map((child: any) => (
                                        <li
                                          className="branch mb-3"
                                          key={child?.userId}
                                        >
                                          <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                            <input
                                              className="form-check-input widget-9-check xCheckBg mt-0"
                                              type="checkbox"
                                              name="employee"
                                              onChange={(e) => {
                                                handleCheckboxChange(
                                                  child,
                                                  e?.target?.checked,
                                                );
                                              }}
                                              checked={selectedUsers
                                                ?.map((employee) => {
                                                  return employee?.id;
                                                })
                                                ?.includes(child?.userId)}
                                            />
                                          </div>
                                          <label
                                            className="collapsed"
                                            htmlFor="2"
                                          >
                                            {child?.userNmae}
                                          </label>
                                          <div className="my-8 px-8 mx-4">
                                            <ul
                                              className="list-unstyled accordion-collapse collapse"
                                              id={`flush-main-tree${ele?.id}${child?.userId}`}
                                              aria-labelledby={`flush-headingOne${ele?.id}${child?.userId}`}
                                              data-bs-parent={`#accordionFlushMainTree${ele?.id}${child?.userId}`}
                                            ></ul>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                </div>
                              ) : (
                                <></>
                              )}
                            </ul>
                          </div>
                        ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0">
          <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <div className="d-flex justify-content-center align-items-center w-50">
                <div
                  onClick={handleClose}
                  className="btn btn-secondary mx-1 text-center w-100"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </div>
                <button
                  className="btn btn-success mx-1 text-center w-100"
                  style={{ border: "none" }}
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    if (
                      selectedUsers?.length == 0 &&
                      availableFor == EMPLOYEE
                    ) {
                      showAlert(false, "YouMustSelectEmployee", intl);
                    }
                    if (selectedUsers?.length > 0 && availableFor == EMPLOYEE) {
                      handleClose();
                      setEmployees(
                        selectedUsers?.map((user) => {
                          return {
                            id: user?.id,
                            name: user?.name,
                          };
                        }),
                      );
                      showAlert(true, "AddedSuccessfully", intl);
                    }
                    if (
                      selectedOrgs?.length == 0 &&
                      availableFor == MANAGEMENT
                    ) {
                      showAlert(false, "YouMustSelectManagement", intl);
                    }
                    if (
                      selectedOrgs?.length > 0 &&
                      availableFor == MANAGEMENT
                    ) {
                      handleClose();
                      setOrgs(
                        selectedOrgs?.map((org) => {
                          return {
                            id: org?.id,
                            name: org?.name,
                          };
                        }),
                      );
                      showAlert(true, "AddedSuccessfully", intl);
                    }
                  }}
                >
                  {intl.formatMessage({ id: "Add" })}
                </button>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};
