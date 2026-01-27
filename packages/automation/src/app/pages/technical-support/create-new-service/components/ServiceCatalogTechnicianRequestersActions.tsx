import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Dropdown } from "react-bootstrap";
import { DeleteServiceCatalogTechnicianRequesterPopup } from "../popup/DeleteServiceCatalogTechnicianRequesterPopup";

type ActionProps = {
  id: number | Number | string;
  serviceCatalogId: number | Number | string;
  type: string;
};

export const ServiceCatalogTechnicianRequestersActions: FC<ActionProps> = ({
  id,
  serviceCatalogId,
  type,
}) => {
  const intl = useIntl();
  const [showDelete, setshowDelete] = useState<boolean>(false);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          size="sm"
          className="btn-icon btn-light fs-2 text-muted"
          id={`org-actions-${id}`}
        >
          <i className="bi bi-three-dots fs-2"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="fw-bold w-200px py-3"
          aria-labelledby={`org-actions-${id}`}
        >
          {/* <div className="menu-item px-3">
            <Dropdown.Item
              className="menu-link fs-6 px-3 text-primary"
              onClick={() => {
                navigate(`/admin-panel-users-workspace/admin-panel-users/details/${id}`);
              }}
            >
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen087.svg" />
              </span>{" "}
              {intl.formatMessage({ id: "Edit" })}
            </Dropdown.Item>
          </div> */}

          <div className="menu-item px-3">
            <Dropdown.Item
              className="menu-link fs-6 px-3 text-danger"
              onClick={() => {
                setshowDelete(true);
              }}
            >
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen088.svg" />
              </span>{" "}
              {intl.formatMessage({ id: "Delete" })}
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" id="rega_modal_Delete" aria-hidden="true">
        <DeleteServiceCatalogTechnicianRequesterPopup
          handleCloseDelete={() => setshowDelete(false)}
          showDelete={showDelete}
          id={id}
          serviceCatalogId={serviceCatalogId}
          type={type}
        />
      </div>
    </>
  );
};

export default ServiceCatalogTechnicianRequestersActions;
