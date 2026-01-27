import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Link } from "react-router-dom";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup"
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";

interface IAction {
  id?: string | number;
  isDelete: boolean;
  deleteHandler?: any;
  editHandler?: () => {};
  navigationHandler?: any;
  show: { isShow: boolean; link: string };
  edit: { isEdit: boolean; link: string };
  notification?: any;
}

export const Actions: FC<IAction> = ({
  show,
  edit,
  isDelete,
  deleteHandler = null,
  navigationHandler = () => {},
  notification,
}) => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {show.isShow && (
            <Dropdown.Item as="button">
              <span
                onClick={() => {
                  navigationHandler();
                  localStorage.setItem(
                    "mainClassificationId",
                    notification?.mainclassificationId
                  );
                  localStorage.setItem(
                    "isSubSystem",
                    notification?.mainclassificationId !==
                      "00000000-0000-0000-0000-000000000000"
                      ? "false"
                      : "true"
                  );
                }}
                className="menu-link px-3 text-dark d-block"
              >
                <i className="fa-solid fa-eye mx-2"></i>
                {intl.formatMessage({ id: "Show" })}
              </span>
            </Dropdown.Item>
          )}

          {edit.isEdit && (
            <Dropdown.Item as="button">
              <Link to={edit.link} className="menu-link px-3 text-primary">
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                </span>
                {intl.formatMessage({ id: "Edit" })}
              </Link>
            </Dropdown.Item>
          )}

          {isDelete && (
            <Dropdown.Item as="button">
              <a
                onClick={() => setShowDelete(true)}
                className="menu-link px-3 text-danger d-block"
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                </span>
                {intl.formatMessage({ id: "Delete" })}
              </a>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          showDelete={showDelete}
          handleCloseDelete={() => setShowDelete(false)}
          handleDelete={deleteHandler}
        />
      </div>
    </>
  );
};
