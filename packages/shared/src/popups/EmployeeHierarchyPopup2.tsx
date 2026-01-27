import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { RootState, useAppDispatch, useAppSelector } from "../../../strategic-communication/src/app/store/store";
import { fetchOrgsWithEmployee } from "../../../strategic-communication/src/app/features/allOrgsHierarchySlice";

const EN_LANG = "en";

type PopupProps = {
  show: boolean;
  handleClose: any;
  employeeIds?: any;
  setEmployeeIds?: any;
  membersChecked?: any;
  setMembersChecked?: any;
  orgIds?: any;
  setOrgIds?: any;
  setEmployeeNames?: any;
  employeeNames?: any;
  data?: any;
  setData?: any;
};
export const EmployeeHierarchyPopupForGroup2: FC<PopupProps> = ({
  show,
  handleClose,
  employeeIds,
  setEmployeeIds,
  membersChecked,
  setMembersChecked,
  orgIds,
  setOrgIds,
  setEmployeeNames,
  employeeNames,
  data,
  setData,
}) => {
  const intl = useIntl();

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
  let params: any = {
    search: searchTerm,
  };
  dispatch(fetchOrgsWithEmployee(params) as any);
}, [dispatch, searchTerm]);

  const managementsItems = useAppSelector((state: RootState) => {
    return state?.allorgsHierarchy?.orgswithEmployees;
  });

  useEffect(() => {
    if (managementsItems) {
      const modifiedManagements = managementsItems?.map((item: any) => ({
        ...item,
        collapsed: true,
        checked: orgIds ? orgIds.includes(item?.id) : false,
        mebmers: item?.mebmers?.map((ele: any) => {
          return {
            ...ele,
            checked: employeeIds.includes(ele?.userId),
          };
        }),
      }));

      setData(modifiedManagements);
    }
  }, [managementsItems]);


  let handleCollapse = (item: any, id: any) => {
    setData(
      data?.map((ele: any) => {
        if (ele?.id == id) {
          return { ...ele, collapsed: !ele?.collapsed };
        } else {
          return { ...ele };
        }
      })
    );
  };
  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang as string).selectedLang;
  } catch (err) {}

  let handleParentChecked = (item: any, isChecked: boolean) => {
    if (isChecked) {
      setData(
        data?.map((ele: any) => {
          if (ele?.id == item?.id) {
            return {
              ...ele,
              checked: true,
              mebmers: ele?.mebmers?.map((member: any) => {
                return { ...member, checked: true };
              }),
            };
          } else {
            return ele;
          }
        })
      );
    } else if (isChecked == false) {
      setData(
        data?.map((ele: any) => {
          if (ele?.id == item?.id) {
            return {
              ...ele,
              checked: false,
              mebmers: ele?.mebmers?.map((member: any) => {
                return { ...member, checked: false };
              }),
            };
          } else {
            return ele;
          }
        })
      );
    }
  };
  const handleChildrenChecked = (
    item: any,
    isChecked: boolean,
    parentId: string
  ) => {
    if (isChecked) {
      setData(
        data?.map((ele: any) => {
          if (ele?.id == parentId) {
            return {
              ...ele,
              checked:
                ele?.mebmers?.filter((member: any) => {
                  return member?.checked;
                })?.length ==
                ele?.mebmers?.length - 1
                  ? true
                  : false,
              mebmers: ele?.mebmers?.map((member: any) => {
                if (member?.userId == item?.userId) {
                  return { ...member, checked: true };
                } else {
                  return member;
                }
              }),
            };
          } else {
            return ele;
          }
        })
      );
    } else {
      setData(
        data?.map((ele: any) => {
          if (ele?.id == parentId) {
            return {
              ...ele,
              checked: false,
              mebmers: ele?.mebmers?.map((member: any) => {
                if (member?.userId == item?.userId) {
                  return { ...member, checked: false };
                } else {
                  return member;
                }
              }),
            };
          } else {
            return ele;
          }
        })
      );
    }
  };

  let [searchedMangments, setSearchedMangments] = useState(data);
  useEffect(() => {
    if (setOrgIds)
      setOrgIds(
        data
          ?.filter((item: any) => {
            return (
              item?.checked ||
              item?.mebmers?.some((member: any) => member?.checked)
            );
          })
          ?.map((element: any) => {
            return element?.id;
          })
      );
      
    setEmployeeIds(
      data
        ?.map((ele: any) => {
          return ele?.mebmers;
        })
        ?.flat()
        ?.filter((member: any) => {
          return member?.checked;
        })
        ?.map((element: any) => {
          return element?.userId;
        })
    );
  }, [data]);

  useEffect(() => {
    if (employeeIds) {
      setEmployeeNames(
        data
          ?.map((ele: any) => {
            return ele?.mebmers;
          })
          ?.flat()
          ?.filter((member: any) => {
            return member?.checked;
          })
          ?.map((element: any) => {
            return element?.userNmae;
          })
      );
    }
  }, [employeeIds]);

  useEffect(() => {
    setSearchedMangments((prev: any) => {
      if (searchTerm == "") {
        return [...data];
      } else {
        return data?.map((ele: any) => {
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
  }, [searchTerm, data]);

  useEffect(() => {
    if (employeeIds && data) {
      setMembersChecked(
        data
          ?.map((ele: any) => ele?.mebmers)
          ?.flat()
          ?.filter((member: any) => {
            return member?.checked && employeeIds.includes(member.userId);
          })
      );
    }
  }, [employeeIds, data]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "flex-start",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h3 className="card-title flex-column align-items-center">
                  <span className="card-label fw-bolder fs-3 mb-2 d-flex justify-content-center w-100">
                    {intl.formatMessage({
                      id: "OrganizationalChart",
                    })}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({
                      id: "YouCanSeeTheEmployeesAndManagersInTheOrganization",
                    })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>

          <Modal.Body className="pb-0 mx-4">
            <div className="d-flex justify-content-center align-items-center">
              <form
                className="w-400px position-relative mb-5"
                autoComplete="off"
              >
                <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-3 translate-middle-y">
                  <KTSVG
                    path="/media/icons/duotune/general/gen114_search.svg"
                    className="pe-5"
                  />
                </span>
                <input
                  type="text"
                  className="form-control form-control-solid px-15"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e?.target?.value);
                  }}
                  placeholder={intl.formatMessage({
                    id: "SearchWithEmployeeName",
                  })}
                />
              </form>
            </div>
            <div className="row my-4">
              <div className="col-12">
                <div className="mb-2 pt-2 pb-3 custom_tree">
                  {searchTerm
                    ? searchedMangments
                        ?.filter((org: any) => {
                          return org?.mebmers?.length > 0;
                        })
                        ?.map((ele: any) => (
                          <div className="tree_main mb-5" key={ele.id}>
                            <ul id="tree1" className="tree list-unstyled">
                              <div className="fs-5 py-4 mb-7 d-flex align-items-center">
                                <div className=" d-inline mx-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md"></div>
                                <div className="d-inline-block">
                                  <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                                  <button className="basic-item bg-transparent border-0 title-text">
                                    {localStorage.getItem("i18nextLng") === "en"
                                      ? ele?.nameEn
                                      : ele?.nameAr}
                                  </button>
                                </div>
                              </div>
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
                                            onChange={(e) => {
                                              const isChecked =
                                                e.target.checked;
                                              handleChildrenChecked(
                                                child,
                                                isChecked,
                                                ele?.id
                                              );
                                            }}
                                            id={child?.userId}
                                            checked={child?.checked}
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
                            </ul>
                          </div>
                        ))
                    : data
                        ?.filter((org: any) => {
                          return org?.mebmers?.length > 0;
                        })
                        ?.map((ele: any) => (
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
                                <div
                                  className="d-inline-block"
                                  onClick={() => {
                                    handleCollapse(ele, ele.id);
                                  }}
                                >
                                  <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                                  <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                    <input
                                      className="form-check-input widget-9-check xCheckBg mt-0"
                                      type="checkbox"
                                      checked={ele?.checked}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        handleParentChecked(ele, isChecked);
                                      }}
                                    />
                                  </div>
                                  <button className="basic-item bg-transparent border-0 title-text">
                                    {localStorage.getItem("i18nextLng") === "en"
                                      ? ele?.nameEn
                                      : ele?.nameAr}
                                  </button>
                                </div>
                              </div>
                              {ele?.collapsed ? (
                                <></>
                              ) : (
                                <>
                                  {" "}
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
                                                onChange={(e) => {
                                                  const isChecked =
                                                    e.target.checked;
                                                  handleChildrenChecked(
                                                    child,
                                                    isChecked,
                                                    ele?.id
                                                  );
                                                }}
                                                id={child?.userId}
                                                checked={child?.checked}
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
                                </>
                              )}
                            </ul>
                          </div>
                        ))}
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
                    onClick={() => {
                      setEmployeeIds(employeeIds);
                      handleClose();
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
    </>
  );
};