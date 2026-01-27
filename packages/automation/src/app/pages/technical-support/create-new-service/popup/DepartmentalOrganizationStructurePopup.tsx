import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { fetchOrgs } from "../../../../redux/features/mainClassification/orgsSlice";
import ChildOrg from "../components/ChildOrg";
import { showSuccessAlert } from "@4eplatform/shared/index";

type DepartmentalOrganizationalStructurePopupProps = {
  showHierarchy?: boolean;
  handleClose?: any;
  orgId?: string;
  setOrgId?: any;
  orgName?: string;
  setOrgName?: any;
};

export const DepartmentalOrganizationalStructurePopup: FC<
  DepartmentalOrganizationalStructurePopupProps
> = ({ showHierarchy, handleClose, orgId, setOrgId, orgName, setOrgName }) => {
  const intl = useIntl();
  const [managementData, setManagementData] = useState<any>();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrgs({}) as any);
  }, []);
  let orgs = useSelector((state: RootState) => {
    return state.orgsSlice.data;
  });

  let orgsAfterConversion = orgs?.map((org: any) => {
    return {
      id: org?.id,
      nameAr: org?.nameAr,
      nameEn: org?.nameEn,
      collapsed: true,
      children: org?.children?.map((child: any) => {
        return {
          id: child?.id,
          nameAr: child?.nameAr,
          nameEn: child?.nameEn,
          children: child?.children,
          collapsed: true,
        };
      }),
    };
  });

  useEffect(() => {
    setManagementData(orgsAfterConversion);
  }, [orgs]);

  const handleChildrenChecked = (item: any, isChecked: boolean) => {
    const updatedItem = {
      ...item,
      checked: isChecked,
      children: item?.children?.map((child: any) =>
        handleChildrenChecked(child, isChecked)
      ),
    };
    return updatedItem;
  };
  // const handleCollapse = (item: any, id: any): {} => ({
  //   "data-bs-toggle": "collapse",
  //   "data-bs-target": `#flush-main-tree${id}`,
  //   "aria-expanded": item?.collapsed ? "false" : "true",
  //   "aria-controls": `flush-main-tree${id}`,
  //   onClick: () => {
  //     const updatedItem = toggleCollapse(item, true); // Start collapsing from the clicked item
  //     handleChange(updatedItem);
  //   },
  // });

  // const toggleCollapse = (item: any, startFromCurrent: boolean) => {
  //
  //   const updatedItem = {
  //     ...item,
  //     collapsed: !item.collapsed,
  //     children: startFromCurrent
  //       ? item?.children?.map((child: any) => {toggleCollapse(child, false)})
  //       : item.children,
  //     // children:item?.children
  //   };

  //   return updatedItem;
  // };

  const handleCollapse = (item: any, id: any): {} => ({
    "data-bs-toggle": "collapse",
    "data-bs-target": `#flush-main-tree${id}`,
    "aria-expanded": item.collapsed ? "false" : "true",
    "aria-controls": `flush-main-tree${id}`,
    onClick: () => {
      const updatedItem = toggleCollapse(item);
      handleChange(updatedItem);
    },
  });

  const toggleCollapse = (item: any) => {
    const updatedItem = {
      ...item,
      collapsed: !item.collapsed,
      children: item?.children?.map(toggleCollapse),
    };

    // If the current item is collapsing, propagate the collapse state upwards
    if (updatedItem.collapsed) {
      let parent = item.parent; // Assuming there is a parent reference in your data structure

      while (parent) {
        if (!Object.isExtensible(parent)) {
          // Make the parent extensible if it's not
          parent = { ...parent };
        }

        if (!parent.hasOwnProperty("collapsed")) {
          // Add the collapsed property if it doesn't exist
          parent = { ...parent, collapsed: true };
        } else {
          // Update the collapsed property
          parent = { ...parent, collapsed: true };
        }

        parent = parent.parent; // Assuming there is a parent reference in your data structure
      }
    }

    return updatedItem;
  };
  // const toggleCollapse = (item: any) => {
  //   const updatedItem = {
  //     ...item,
  //     collapsed: !item.collapsed,
  //     children: item?.children?.map((child: any) => toggleCollapse(child)),
  //   };

  //   return updatedItem;
  // };

  const handleChange = (updatedItem: any) => {
    setManagementData((prevData: any) => {
      const updatedData = prevData.map((item: any) => {
        if (item.id === updatedItem.id) {
          return updatedItem;
        }
        return item;
      });
      return updatedData;
    });
  };

  let selectedLang = localStorage.getItem("i18nConfig");
  try {
    selectedLang = JSON.parse(selectedLang as string).selectedLang;
  } catch (err) {
    //console.log("Can't get selectedLang from localStorage");
  }

  const handleRadioChange = (item: any) => {
    setOrgId(item?.id);
    setOrgName(intl?.locale.toLowerCase() === "ar" ? item.nameAr : item.nameEn);
  };
  return (
    <>
      <Modal centered show={showHierarchy} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="card">
            <div className="card-body mx-5">
              <div className="card-header px-1 d-flex justify-content-start  pb-2 mb-5">
                <h3 className="card-title flex-column">
                  <span className="card-label fw-bolder fs-3 mb-2 ">
                    {intl.formatMessage({
                      id: "OrganizationalStructure",
                    })}
                  </span>
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({
                      id: "PleaseEnterTheData",
                    })}
                  </span>
                </h3>
              </div>
              <div className="row my-4">
                <div className="col-12">
                  <div className="mb-2 pt-2 pb-3 custom_tree">
                    {managementData?.map((item: any) => (
                      <ChildOrg
                        key={item?.id}
                        item={item}
                        orgId={orgId}
                        handleCollapse={handleCollapse}
                        handleChildrenChecked={handleChildrenChecked}
                        handleRadioChange={handleRadioChange}
                        selectedLang={selectedLang}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      // data-bs-dismiss="modal"
                      onClick={() => {
                        handleClose();
                      }}
                      className="btn btn-secondary mx-1 text-center w-100"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <button
                      data-bs-dismiss="modal"
                      className="btn btn-success mx-1 text-center w-100"
                      style={{ border: "none" }}
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault();
                        showSuccessAlert(true, "AddedSuccessfully", intl);
                      }}
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
