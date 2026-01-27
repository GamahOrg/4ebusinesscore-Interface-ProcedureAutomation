import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useNavigate } from "react-router";
import AddServiceCatalogPopup from "../popup/AddServiceCatalogPopup";
import EditBasicClassificationPopup from "../popup/EditBasicClassificationPopup";
import { Dropdown } from "react-bootstrap";
import { DeleteBasicItemPopup } from "../popup/DeleteBasicItemPopup";

type ActionProps = {
  id: Number | string | number;
  fetchData?: any;
};

export const MainClassificationActions: FC<ActionProps> = ({
  id,
  fetchData,
}) => {
  const intl = useIntl();
  let navigate = useNavigate();
  const [showDelete, setshowDelete] = useState<boolean>(false);
  const [showEditBasicClassification, setshowEditBasicClassification] =
    useState<boolean>(false);
  const [showServiceCatalog, setshowServiceCatalog] = useState<boolean>(false);

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
            className="fw-bold"
            style={{ width: "200px", padding: "1rem" }}
            aria-labelledby={`org-actions-${id}`}
          >
            <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link fs-6 px-3 text-success"
                onClick={() => setshowServiceCatalog(true)}
              >
                <i className="bi bi-plus-lg fs-4 mx-1"></i>
                {intl.formatMessage({ id: "AddServiceCatalog" })}
              </span>
            </Dropdown.Item>

            <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link fs-6 px-3 text-primary"
                onClick={() => setshowEditBasicClassification(true)}
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
          <div className="modal fade" id="rega_modal_Delete" aria-hidden="true">
            <DeleteBasicItemPopup
              handleCloseDelete={() => setshowDelete(false)}
              showDelete={showDelete}
              id={id}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      {/* <AddSubCategoryPopup /> */}

      {
        showServiceCatalog ? (
        <div className="modal fade" aria-hidden="true">
      <AddServiceCatalogPopup
        handleClose={() => setshowServiceCatalog(false)}
        show={showServiceCatalog}
        id={id}
        parentId={id}
        fetchData={fetchData}
      />
</div>
        ):(
          <></>
        )
      }

      {showEditBasicClassification ? (
        <div className="modal fade" aria-hidden="true">
          <EditBasicClassificationPopup
            handleClose={() => setshowEditBasicClassification(false)}
            show={showEditBasicClassification}
            id={id}
            fetchData={fetchData}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
