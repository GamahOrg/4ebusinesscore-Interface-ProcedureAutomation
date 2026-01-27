import { FC } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import SystemClassification from "../../models/SystemClassification";


type ActionProps = {
  id: string;
  sysClassification: SystemClassification;
  mainClassificationId?: string;
  parentId: string;
};

export const ShowSystemsClassifiActions: FC<ActionProps> = ({
  id,
  sysClassification,
  mainClassificationId,
  parentId,
}) => {
  const intl = useIntl();
  const params = useParams();
  const location = useLocation();
  const cardId = location?.state?.cardId;
  const cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  const partTitle = location?.state?.partTitle || location?.state?.extraState;
  const sysId =
    mainClassificationId === "00000000-0000-0000-0000-000000000000"
      ? id
      : mainClassificationId;

  const { id: classificationId } = useParams();
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

            <Dropdown.Menu className="menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-100px py-3">
              <Dropdown.Item
                as={Link}
                to={
                  mainClassificationId ===
                  "00000000-0000-0000-0000-000000000000"
                    ? parentId == null
                      ? `/systems-services-settings/systems-classifications/edit-subsystem/${sysId}`
                      : `/systems-services-settings/systems-classifications/edit-card/${sysId}`
                    : `/systems-services-settings/systems-classifications/edit-mainclassification/${sysId}`
                }
                state={{
                  cardId: cardId,
                  cardTitle: cardName,
                  partTitle: partTitle,
                  exceptionURL: params?.id,
                  additionalId: classificationId,
                }}
                className="menu-link px-1 text-primary"
              >
                <div className="d-flex align-items-center">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                  </span>
                  {intl.formatMessage({ id: "Edit" })}
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
