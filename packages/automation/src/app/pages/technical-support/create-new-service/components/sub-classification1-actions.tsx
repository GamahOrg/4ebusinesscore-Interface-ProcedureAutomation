import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import AddSubCategoryPopup from "../popup/AddSubCategoryPopup";
import { useNavigate } from "react-router";
import EditServiceCatalogPopup from "../popup/EditServiceCatalogPopup";
import { Dropdown } from "react-bootstrap";
import { DeleteServiceCatalogPopup } from "../popup/DeleteServiceCatalogPopup";

type ActionProps = {
  id: Number | string | number;
  parentId?:string;
};

export const SubClassification1Actions: FC<ActionProps> = ({ id , parentId}) => {
  const intl = useIntl();
  let navigate = useNavigate();
  const [showDelete, setshowDelete] = useState<boolean>(false);
  const [showServiceCatalog, setshowServiceCatalog] = useState<boolean>(false);
  const [showSubCategory, setshowSubCategory] = useState<boolean>(false);

  return (
    <>
      <div className="d-flex w-fit">
        <button
          className="btn btn-sm border border-3 btn-icon btn-light fs-2 text-muted d-flex"
          type="button"
        >
          <i className="fa-solid fa-users"></i>{" "}
        </button>

        <Dropdown>
          <Dropdown.Toggle
            id={`org-actions-${id}`}
            variant="light"
            className="btn-sm btn-icon border border-3 btn-light fs-2 text-muted d-flex"
          >
            <i className="bi bi-three-dots fs-2"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="fw-bold w-200px py-3"
            aria-labelledby={`org-actions-${id}`}
          >
            <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link fs-6 px-3 text-success"
                onClick={() => setshowSubCategory(true)}
              >
                <i className="bi bi-plus-lg fs-4 mx-1"></i>
                {intl.formatMessage({ id: "AddSub1Category" })}
              </span>
            </Dropdown.Item>

            <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link fs-6 px-3 text-primary"
                onClick={() => setshowServiceCatalog(true)}
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Edit" })}
              </span>
            </Dropdown.Item>

            <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link fs-6 px-3 text-danger"
                onClick={() => setshowDelete(true)}
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Delete" })}
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {showDelete ? (
        <>
          {" "}
          <div className="modal fade" id="rega_modal_Delete" aria-hidden="true">
            <DeleteServiceCatalogPopup
              handleCloseDelete={() => setshowDelete(false)}
              showDelete={showDelete}
              id={id}
              parentId={parentId}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <AddSubCategoryPopup
        handleClose={() => setshowSubCategory(false)}
        show={showSubCategory}
        parentId={parentId}
        serviceCategoryId={id as string}
      />
      {showServiceCatalog ? (
        <>
          <EditServiceCatalogPopup
            id={id}
            handleClose={() => setshowServiceCatalog(false)}
            show={showServiceCatalog}
            parentId={parentId}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
