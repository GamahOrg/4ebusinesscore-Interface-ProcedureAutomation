import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonGroup } from "react-bootstrap";
import { DeleteRequestTemplatePopup } from "../popup/delete-request-template-popup";
type ActionProps = {
  id: any
};



export const Actions: FC<ActionProps> = ({ id }) => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split variant="none" className=" p-0 text-center" id="dropdown-custom-2">
          <i className="bi bi-three-dots fs-2" style={{color: "#7e8299"}}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item as="button">
              <Link
                to={`/track-requests-tools/${id}/details`}
                className="menu-link px-3 text-dark"
              >
                <i className="fa-solid fa-eye mx-2"></i>
                {intl.formatMessage({ id: "Show" })}
              </Link>
            </Dropdown.Item>

            <Dropdown.Item as="button">
              <Link
                to={`/edit-track-requests-tools/${id}`}
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
                // data-bs-toggle="modal"
                // data-bs-target="#Rega_modal_Delete"
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Delete" })}
              </a>
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {modalDShow ? 
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
      <DeleteRequestTemplatePopup
        handleCloseDelete={() => setModalDShow(false)}
        showDelete={modalDShow}
        id = {id}
      />
    </div>
      : "" }
      
    </>
  );
};
