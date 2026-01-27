import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DeletePopup } from "../partials/DeletePopup";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { AppDispatch } from "../../redux/store/store";
import { removeSubsystemSettingsMainClassification } from "../../redux/features/subsytemSettingsMainClassification";

type ActionProps = {
  id: string;
  searchTerm: string;
  sysName?: string;
  deletionAllowed?: boolean;
};

export const SubSystemClassificationActions: FC<ActionProps> = ({
  id,
  searchTerm,
  sysName,
  deletionAllowed = true,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handelDelete = async (id: string) => {
    await dispatch(removeSubsystemSettingsMainClassification(id) as any).then(
      (res: any) => {
        if (res?.payload?.response?.statusEnum == 1) {
          showSuccessAlert(true, "DeletedSuccessfully", intl);
          handleCloseDelete();
        } else showSuccessAlert(false, res?.payload?.message, intl);
      }
    );
  };

  let location = useLocation();
  let cardId =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  return (
    <>
      <div className="card-toolbar text-center">
        <div className="me-n3">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              size="sm"
              className="btn-icon btn-light"
            >
              <i className="bi bi-three-dots fs-2"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu 
            className="none-translate menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-100px py-0"
         >
              <Dropdown.Item
                as={Link}
                to={`/systems-services-settings/systems-classifications/view-system/${id}`}
                className="menu-link p-2 px-2 text-primary d-flex align-items-center justify-content-center"
                state={{
                  cardId: cardId,
                  cardTitle: cardName,
                  partTitle: sysName,
                }}
              >
                  <span className="svg-icon svg-icon-3 mx-1">
                    <i className="fa-solid fa-eye fa-fw fs-5"></i>
                  </span>
                  {intl.formatMessage({ id: "Show" })}
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/systems-services-settings/systems-classifications/edit-system/${id}`}
                className="menu-link p-2 px-2 text-primary d-flex align-items-center justify-content-center"
                state={{
                  cardId: cardId,
                  cardTitle: cardName,
                  partTitle: partTitle,
                }}
              >
           
                  <span className="svg-icon svg-icon-3 mx-1">
                    <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                  </span>
                  {intl.formatMessage({ id: "Settings" })}
            
              </Dropdown.Item>
              {deletionAllowed ? <>
              <Dropdown.Item className="menu-link p-2 px-2 text-danger d-flex align-items-center justify-content-center" onClick={handleShowDelete}>
                    <span className="svg-icon svg-icon-3 mx-1">
                      <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                    </span>
                    {intl.formatMessage({ id: "Delete" })}
          
              </Dropdown.Item>
              </> : <></>}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
          id={id}
          handleDelete={handelDelete}
        />
      </div>
    </>
  );
};
