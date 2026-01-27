import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/store/store";
import { fetchEmloyeeManagement } from "../../redux/features/SLA/employeManagementSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
const EN_LANG = "en";
type PopupProps = {
  show: boolean;
  handleClose: any;
  employeeId?: string;
  employeeName?: string;
  setEmployeeId?: any;
  setEmployeeName?: any;
};
export const EmployeeHierarchyPopup: FC<PopupProps> = ({
  show,
  handleClose,
  employeeId,
  employeeName,
  setEmployeeId,
  setEmployeeName,
}) => {
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const managements = useAppSelector((state: RootState) => {
    const items = state?.employeeManagement?.items;
    if (items) {
      const modifiedManagements = items.map((item) => ({
        ...item,
        collapsed: true,
        checked: false,
      }));
      return modifiedManagements;
    }
    return items;
  });
  useEffect(() => {
    let params: any = {
      search: searchTerm,
    };
    dispatch(fetchEmloyeeManagement(params) as any);
  }, [dispatch]);

  // const handleChange = () => {
  //   setManagementData([...managementData]);
  // };

  // const handleChildrenChecked = (item :any, isChecked :boolean) => {
  //   item.checked = isChecked;
  //   item?.children?.forEach((child:any) => {
  //     child.checked = isChecked;
  //     if (child?.children?.length) {
  //       handleChildrenChecked(child, isChecked);
  //     }
  //   });
  //   handleChange();
  // };
  const handleChildrenChecked = (item: any, isChecked: boolean) => {
    const updatedData = managements.map((managementItem: any) => {
      if (managementItem.id === item.id) {
        return {
          ...managementItem,
          checked: isChecked,
          children: managementItem.children.map((child: any) => ({
            ...child,
            checked: isChecked,
          })),
        };
      } else {
        return managementItem;
      }
    });
    //  handleChange();
  };
  const handleCollapse = (item: any, id: string): {} => ({
    "data-bs-toggle": "collapse",
    "data-bs-target": `#flush-main-tree${id}`,
    "aria-expanded": "true",
    "aria-controls": `flush-main-tree${id}`,
    onClick: () => {
      item.collapsed = !item.collapsed;
      // handleChange();
    },
  });
  let selectedLang = localStorage.getItem("i18nConfig") as string;
  try {
    selectedLang = JSON.parse(selectedLang as string).selectedLang;
  } catch (err) {
    //console.log("Can't get selectedLang from localStorage");
  }

  const handleRadioChange = (item: any) => {
    setEmployeeId(item?.userId);
    setEmployeeName(item?.userNmae);
  };

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
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
                  onChange={handleSearchChange}
                  placeholder={intl.formatMessage({
                    id: "SearchWithEmployeeName",
                  })}
                />
              </form>
            </div>
            <div className="row my-4">
              <div className="col-12">
                <div className="mb-2 pt-2 pb-3 custom_tree">
                  {managements
                    ?.filter((ele) =>
                      ele.mebmers.some((child) =>
                        child.userNmae
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                    )
                    ?.map((ele, index: number) => (
                      <div className="tree_main mb-5" key={ele.id}>
                        <ul id="tree1" className="tree list-unstyled">
                          <div className="fs-5 py-4 mb-7 d-flex align-items-center">
                            {ele?.mebmers?.length > 0 &&
                              (ele?.collapsed ? (
                                <i
                                  className={`fas fa-chevron-${
                                    selectedLang === EN_LANG ? "right" : "left"
                                  } fa-xl text-primary`}
                                  {...handleCollapse(ele, ele.id)}
                                ></i>
                              ) : (
                                <i
                                  className="fas fa-chevron-down fa-xl text-danger"
                                  {...handleCollapse(ele, ele.id)}
                                ></i>
                              ))}

                            <div className=" d-inline mx-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                              {/* <input
                className="form-check-input widget-9-check xCheckBg mt-0"
                type="checkbox"
                id="3"
                checked={item.checked}
                onChange={() => {
                  handleChildrenChecked(item, !item.checked);
                }}
              /> */}
                            </div>
                            <div
                              className="d-inline-block"
                              {...handleCollapse(ele, ele.id)}
                            >
                              <i className="bi bi-diagram-3 mx-3 fs-1"></i>
                              <button className="basic-item bg-transparent border-0">
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
                                {ele?.mebmers?.map((child) => (
                                  <li
                                    className="branch mb-3"
                                    key={child?.userId}
                                  >
                                    <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                      <input
                                        className="form-check-input widget-9-radio xRadioBg"
                                        type="radio"
                                        id={child?.userId}
                                        checked={child?.userId === employeeId}
                                        name="children"
                                        onChange={() => {
                                          handleChildrenChecked(
                                            child,
                                            !child.checked
                                          );
                                          handleRadioChange(child);
                                        }}
                                      />
                                    </div>
                                    <label className="collapsed" htmlFor="2">
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
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      handleClose();
                      showSuccessAlert(true, "AddedSuccessfully", intl);
                    }}
                  >
                    {intl.formatMessage({ id: "Add" })}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </div>
        {/* </div>
      </div> */}
      </Modal>
    </>
  );
};
