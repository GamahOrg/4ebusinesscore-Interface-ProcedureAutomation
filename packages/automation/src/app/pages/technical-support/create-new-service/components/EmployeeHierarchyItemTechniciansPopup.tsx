import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/store/store";
import {
  fetchEmloyeeManagement,
  fetchTechniciansItem,
} from "../../../../redux/features/SLA/employeManagementSlice";
import {
  fetchItemTechnicians,
  addItemTechnician,
} from "../../../../redux/features/item/itemTechniciansSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";
const EN_LANG = "en";
type PopupProps = {
  show: boolean;
  handleClose: any;
  employeeIds?: any;
  setEmployeeIds?: any;
  setEmployeeNames?: any;
  id?: string | Number | number;
};
export const EmployeeHierarchyItemTechniciansPopup: FC<PopupProps> = ({
  show,
  handleClose,
  employeeIds,
  setEmployeeIds,
  setEmployeeNames,
  id,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  let [message, setMessage] = useState("");
  const managements = useAppSelector((state: RootState) => {
    return state?.employeeManagement?.orgUsers;
  });
  useEffect(() => {
    dispatch(fetchTechniciansItem(id) as any);
  }, [id]);

  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang as string).selectedLang;
  } catch (err) {
    //console.log("Can't get selectedLang from localStorage");
  }

  // const handleChildrenChecked = (item: any, isChecked: boolean) => {
  //   const updatedItem = {
  //     ...item,
  //     checked: isChecked,
  //   };

  //   if (isChecked) {
  //     setEmployeeIds((prevOrgIds: any) =>
  //       Array.from(new Set([...prevOrgIds, item.userId]))
  //     );
  //     setEmployeeNames((prevOrgNames: any) =>
  //       Array.from(new Set([...prevOrgNames, item.userNmae]))
  //     );
  //   } else {
  //     setEmployeeIds((prevOrgIds: any) =>
  //       prevOrgIds.filter((id: any) => id !== item.userId)
  //     );
  //     setEmployeeNames((prevOrgNames: any) =>
  //       prevOrgNames.filter((name: any) => name !== item.userNmae)
  //     );
  //   }
  //     if (item.mebmers && item.mebmers.length > 0) {
  //       item.mebmers.forEach((child: any) => {
  //         handleChildrenChecked(child, isChecked);
  //       });
  //     }

  //   return updatedItem;
  // };
  const handleChildrenChecked = (item: any, isChecked: boolean) => {
    const updatedItem = {
      ...item,
      checked: isChecked,
    };

    if (isChecked) {
      // Add or update the item in orgIds and orgNames
      setEmployeeIds((prevOrgIds: any) =>
        Array.from(new Set([...prevOrgIds, item.userId]))
      );
      setEmployeeNames((prevOrgNames: any) =>
        Array.from(new Set([...prevOrgNames, item.userNmae]))
      );
    } else {
      // Remove the item from orgIds and orgNames
      setEmployeeIds((prevOrgIds: any) =>
        prevOrgIds.filter((id: any) => id !== item.userId)
      );
      setEmployeeNames((prevOrgNames: any) =>
        prevOrgNames.filter((name: any) => name !== item.userNmae)
      );
    }

    // Check or uncheck the children
    if (item.mebmers && item.mebmers.length > 0) {
      item.mebmers.forEach((child: any) => {
        handleChildrenChecked(child, isChecked);
      });
    }

    return updatedItem;
  };
  //add and get itemTechnician
  let technicianIds = useAppSelector((state) => {
    return state?.itemTechnician?.data?.map((technician) => {
      return technician?.userId;
    });
  });

  let addEmployee = () => {
    let body = {
      itemId: id,
      technicianIds: employeeIds?.filter((id: string) => {
        return id != null;
      }),
      // ?.filter((id: string) => {
      //   return !technicianIds?.includes(id);
      // }),
    };
    dispatch(addItemTechnician(body) as any).then((res: any) => {
      setMessage(res?.payload?.message);
    });
  };
  useEffect(() => {
    if (message == "Item technicians added successfully") {
      dispatch(fetchItemTechnicians(id) as any);
      showSuccessAlert(true, "AddedSuccessfully", intl);
      setSearchTerm("");
      handleClose();
    } else if (message == '["ItemTechnicianIsAlreadyExists"]') {
      showSuccessAlert(false, "EmployeeIsAlreadyExists", intl);
    }

    return () => {
      setMessage("");
    };
  }, [message]);
  let [searchedMangments, setSearchedMangments] = useState<any>([]);
  let [allMangments, setAllMangments] = useState<any>([]);

  useEffect(() => {
    setSearchedMangments((prev: any) => {
      if (searchTerm == "") {
        return [...allMangments];
      } else {
        return allMangments?.map((ele: any) => {
          return {
            ...ele,
            collapsed: true,
            mebmers: ele?.mebmers?.filter((member: any) => {
              return member?.userName
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase());
            }),
          };
        });
      }
    });
  }, [searchTerm]);
  useEffect(() => {
    if (managements) {
      setAllMangments(
        managements?.map((item: any) => ({
          ...item,
          id: item?.orgId,
          mebmers: item?.users,
          collapsed: false,
          checked: false,
        }))
      );
    }
  }, [managements]);
  useEffect(() => {
    setSearchedMangments(
      allMangments?.map((item: any) => ({
        ...item,
        collapsed: false,
        checked: false,
      }))
    );
  }, [allMangments]);
  let handleCollapse = (item: any, id: any) => {
    //   setSearchedMangments(searchedMangments?.map((ele:any)=>{
    //     if(ele?.id==id){
    //       return {...ele,collapsed:!ele?.collapsed}
    //     }
    //     else {
    //       return {...ele}
    //     }

    // }))
    setAllMangments(
      allMangments?.map((ele: any) => {
        if (ele?.id == id) {
          return { ...ele, collapsed: !ele?.collapsed };
        } else {
          return { ...ele };
        }
      })
    );
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "flex-end",
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
                  {!searchTerm
                    ? allMangments
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
                                <div className="d-inline-block">
                                  <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                                  <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                    <input
                                      className="form-check-input widget-9-check xCheckBg mt-0"
                                      type="checkbox"
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        handleChildrenChecked(ele, isChecked);
                                      }}
                                      checked={ele?.mebmers?.every(
                                        (member: any) =>
                                          employeeIds.includes(member?.userId)
                                      )}
                                    />
                                  </div>
                                  <button className="basic-item bg-transparent border-0 title-text">
                                    {localStorage.getItem("i18nextLng") === "en"
                                      ? ele?.orgNameEn
                                      : ele?.orgNameAr}
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
                                              onChange={(e) => {
                                                const isChecked =
                                                  e.target.checked;
                                                handleChildrenChecked(
                                                  child,
                                                  isChecked
                                                );
                                              }}
                                              id={child?.userId}
                                              checked={
                                                employeeIds?.filter(
                                                  (id: string) => {
                                                    return id == child?.userId;
                                                  }
                                                )?.length > 0
                                              }
                                            />
                                          </div>
                                          <label
                                            className="collapsed"
                                            htmlFor="2"
                                          >
                                            {child?.userName}
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
                    : searchedMangments
                        ?.filter((org: any) => {
                          return org?.mebmers?.length > 0;
                        })
                        ?.map((ele: any) => (
                          <div className="tree_main mb-5" key={ele.id}>
                            <ul id="tree1" className="tree list-unstyled">
                              <div className="fs-5 py-4 mb-7 d-flex align-items-center">
                                {/* {ele?.mebmers?.length > 0 &&
                              (ele?.collapsed ? (
                                <i
                                  className={`fas fa-chevron-${
                                    selectedLang === EN_LANG ? "right" : "left"
                                  } fa-xl text-primary`}
                                  onClick={()=>{handleCollapse(ele, ele.id)}}
                                ></i>
                              ) : (
                                <i
                                  className="fas fa-chevron-down fa-xl text-danger"
                                  onClick={()=>{handleCollapse(ele, ele.id)}}
                                ></i>
                              ))} */}

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
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        handleChildrenChecked(ele, isChecked);
                                      }}
                                      checked={ele?.mebmers?.every(
                                        (member: any) =>
                                          employeeIds.includes(member?.userId)
                                      )}
                                    />
                                  </div>
                                  <button className="basic-item bg-transparent border-0 title-text">
                                    {localStorage.getItem("i18nextLng") === "en"
                                      ? ele?.orgNameEn
                                      : ele?.orgNameAr}
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
                                              onChange={(e) => {
                                                const isChecked =
                                                  e.target.checked;
                                                handleChildrenChecked(
                                                  child,
                                                  isChecked
                                                );
                                              }}
                                              id={child?.userId}
                                              checked={
                                                employeeIds?.filter(
                                                  (id: string) => {
                                                    return id == child?.userId;
                                                  }
                                                )?.length > 0
                                              }
                                            />
                                          </div>
                                          <label
                                            className="collapsed"
                                            htmlFor="2"
                                          >
                                            {child?.userName}
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
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center pb-5 pt-3 border-top-0">
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-50">
                  <div
                    onClick={() => {
                      handleClose();
                      setSearchTerm("");
                      setEmployeeIds([]);
                      setEmployeeNames([]);
                    }}
                    className="btn btn-secondary mx-1 text-center w-100"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                  <button
                    className="btn btn-success mx-1 text-center w-100"
                    style={{ border: "none" }}
                    type="submit"
                    onClick={() => {
                      addEmployee();
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
