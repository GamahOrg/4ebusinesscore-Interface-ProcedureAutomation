import { FC } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

type ActionProps = {
  id: number;
};

export const Actions: FC<ActionProps> = ({ id }) => {
  const intl = useIntl();

  return (
    <>
      <button className="btn btn-sm btn-icon btn-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="bi bi-three-dots fs-2"></i>
      </button>
      <div className="dropdown-menu dropdown-menu-end p-0" aria-labelledby="dropdownMenuButton">
      <div className="menu-item px-3">
          <a className="dropdown-item menu-link fs-6 px-3 text-primary ">
            <span className="svg-icon svg-icon-3 me-2">
              <KTSVG path="/media/icons/duotune/general/gen087.svg" />
            </span>{" "}
            {intl.formatMessage({ id: "Edit" })}
          </a>
        </div>

        <div className="menu-item px-3">

          <a className="dropdown-item menu-link fs-6 px-3 ">
          <span className="svg-icon svg-icon-3 me-2">
            <KTSVG path="/media/icons/duotune/general/gen073.svg" />
          </span>{" "}
          {intl.formatMessage({ id: "FormerManagers" })}
          </a>
        </div>

      </div>
    </>
  );
};
