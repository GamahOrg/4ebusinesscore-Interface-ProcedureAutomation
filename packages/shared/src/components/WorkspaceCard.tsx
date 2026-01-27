import { FC } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { setWorkspaceKey } from "@4eplatform/shared/index";

interface Iprop {
  id: any;
  name: string;
  dept: string;
  title: string;
  subTitle: string;
  count: string;
  lastUpdate: string;
  lastLogin: string;
  link: string;
  icon: any;
  subIcon: any;
  color: string;
  background: string;
  isShow: boolean;
  workspaceKey?: number;
}

const WorkspaceCard: FC<Iprop> = ({
  id,
  name,
  dept,
  title,
  subTitle,
  count,
  lastUpdate,
  lastLogin,
  link,
  icon,
  subIcon,
  color,
  background,
  isShow,
  workspaceKey,
}) => {
  const intl = useIntl();
  let navigate = useNavigate();
  return (
    <>
      {isShow && (
        <div id={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 pt-4 pb-5">
            <div className="d-flex flex-column px-8 py-4">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder text-dark fs-4">
                  {intl.formatMessage({ id: "ProcedureAutomationSolutions" })}
                </span>
              </h3>
            </div>
            <div className="card-body d-flex flex-center flex-column p-5">
              <div className="symbol symbol-75px mb-2">
                <span
                  className={
                    "symbol-label " +
                    (background == "0"
                      ? "bg-light-danger"
                      : background == "1"
                      ? "bg-light-success"
                      : background == "2"
                      ? "bg-light-warning"
                      : "bg-light-info"
                     )
                  }
                >
                  <span
                    className={
                      "svg-icon svg-icon-4x " +
                      (color == "0"
                        ? "svg-icon-danger"
                        : color == "1"
                        ? "svg-icon-success"
                        : color == "2"
                        ? "svg-icon-warning"
                        : "svg-icon-info")
                    }
                  >
                    {icon}
                  </span>
                </span>
              </div>
              <div

                onClick={() => {
                  setWorkspaceKey(workspaceKey);
                  navigate(
                    link?.startsWith("/procedureautomation")
                      ? link.replace("/procedureautomation", "")
                      : link,
                    {
                      state: {
                        cardId: id,
                        cardTitle: title,
                      },
                    }
                  );
                }}
                className="fs-3 text-gray-800 text-hover-gblue fw-bolder mb-0 mt-3"
              >
                {title}
              </div>
              <div className="fw-bold text-gray-400 mb-12 mt-4 text-center">
                {subTitle && intl.formatMessage({ id: subTitle })}
              </div>
              <div
            
                onClick={() => {
                  setWorkspaceKey(workspaceKey);
                  navigate(
                    link?.startsWith("/procedureautomation")
                      ? link.replace("/procedureautomation", "")
                      : link,
                    {
                      state: {
                        cardId: id,
                        cardTitle: title,
                      },
                    }
                  );
                }}
                className="btn btn-primary py-4 mx-8 w-200px"
              >
                {intl.formatMessage({ id: "ViewDetails" })}{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { WorkspaceCard };
