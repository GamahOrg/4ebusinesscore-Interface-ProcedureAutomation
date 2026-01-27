import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG} from "@4eplatform/gateway/src/app/helpers";
import { useNavigate } from "react-router";
import {Dropdown } from "react-bootstrap";
import { DeleteMainClassificianTechnicianRequesterPopup } from "../popup/DeleteMainClassificianTechnicianRequesterPopup";

type ActionProps = {
  id: number | Number | string;
  mainClassificationId: number | Number | string;
  type:string
};

export const MainClassificationsTechnicianRequesterActions: FC<ActionProps> = ({
  id,
  mainClassificationId,
  type
}) => {
  const intl = useIntl();
  let navigate = useNavigate();
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
        <DeleteMainClassificianTechnicianRequesterPopup
          handleCloseDelete={() => setshowDelete(false)}
          showDelete={showDelete}
          id={id}
          mainClassificationId={mainClassificationId}
          type={type}
        />
      </div>
    </>
  );
};

export default MainClassificationsTechnicianRequesterActions;
