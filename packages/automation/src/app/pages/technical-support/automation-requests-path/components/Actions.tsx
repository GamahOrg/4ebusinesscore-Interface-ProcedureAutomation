import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { DeleteRequestTemplatePopup } from "../popups/delete-request-template-popup";

type ActionProps = {
  id: any;
  pageSize: any;
  pageIndex: any;
  projectCategoryId: any;
  setAllRequestTamplateByCategoryId: any;
};

export const Actions: FC<ActionProps> = ({
  id,
  pageSize,
  pageIndex,
  projectCategoryId,
  setAllRequestTamplateByCategoryId,
}) => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
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
          <Dropdown.Item as="button">
            <Link
              to={`/automation-requests-path/${id}/details`}
              state={{ serviceName: cardTitle }}
              className="menu-link px-3 text-dark"
            >
              <i className="fa-solid fa-eye mx-2"></i>
              {intl.formatMessage({ id: "Show" })}
            </Link>
          </Dropdown.Item>

          <Dropdown.Item as="button">
            <Link
              to={`/automation-requests-path/edit-requests-path/${id}`}
              state={{ serviceName: cardTitle }}
              className="menu-link px-3 text-primary"
            >
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen087.svg" />
              </span>{" "}
              {intl.formatMessage({ id: "Edit" })}
            </Link>
          </Dropdown.Item>

          <Dropdown.Item as="button">
            <a
              className="menu-link px-3 text-danger"
              onClick={(event) => {
                event.preventDefault();
                setModalDShow(true);
              }}
            >
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen088.svg" />
              </span>{" "}
              {intl.formatMessage({ id: "Delete" })}
            </a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {modalDShow && (
        <div className="modal fade" id="Rega_modal_Delete" >
          <DeleteRequestTemplatePopup
            handleCloseDelete={() => setModalDShow(false)}
            showDelete={modalDShow}
            id={id}
            pageSize={pageSize}
            pageIndex={pageIndex}
            projectCategoryId={projectCategoryId}
            setAllRequestTamplateByCategoryId={
              setAllRequestTamplateByCategoryId
            }
          />
        </div>
      )}
    </>
  );
};
