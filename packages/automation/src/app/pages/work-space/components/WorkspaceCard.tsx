import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface Iprop {
  id: any;
  name: string;
  dept: string;
  title: string;
  subTitle: string;
  subTitleEn: string;
  count: string;
  lastUpdate: string;
  lastLogin: string;
  link: string;
  icon: any;
  subIcon: any;
  color: string;
  background: string;
  isShow: boolean;
  handleHideCard: any;
  handleFavouriteCard: any;
  setFavouritesList: any;
  getFavouritesList: any;
  favorite: any;
  setFavourite: any;
  index: number;
  workspaceKey: number;
  subSystemId?: string;
  card?: any;
  titleAr?: any;
  titleEn?: any;
}

const WorkspaceCard: FC<Iprop> = ({
  index,
  id,
  handleHideCard,
  name,
  dept,
  title,
  subTitle,
  subTitleEn,
  count,
  lastUpdate,
  lastLogin,
  link,
  icon,
  subIcon,
  color,
  background,
  isShow,
  handleFavouriteCard,
  setFavouritesList,
  getFavouritesList,
  favorite,
  setFavourite,
  workspaceKey,
  subSystemId,
  card,
  titleAr,
  titleEn,
}) => {
  const intl = useIntl();
  let language = intl.locale;
  const [showMenu, setShowMenu] = useState(false);

  const minHeight = language === "en" ? "115px" : "110px";

  return (
    <>
      {isShow && (
        <div id={id} className="flex-fill workspace-card-custom">
          <div
            className="card-header border-0 pt-5 mt-5 d-flex justify-content-center"
            style={{ minHeight: minHeight }}
          >
            <div className="card-toolbar">
              <Dropdown show={showMenu}>
                <Dropdown.Menu
                  align="end"
                  className={`w-200px w-md-200px ${showMenu ? "show" : ""}`}
                >
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bolder d-flex justify-content-start">
                      {" "}
                      {intl.formatMessage({ id: "Properties" })}
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="card-body d-flex flex-column justify-content-between align-items-center p-5 h-100 workspace-card-body-custom">
            <div className="w-100 text-center flex-grow-1 d-flex flex-column align-items-center mt-10">
              <div className="symbol symbol-75px mb-2">
                <span
                  className={
                    "symbol-label " +
                    (background === "1"
                      ? "bg-light-primary"
                      : background === "2"
                      ? "bg-light-warning"
                      : background === "6"
                      ? "bg-light-danger"
                      : "")
                  }
                >
                  <span
                    className={
                      "svg-icon svg-icon-4x " +
                      (color === "0"
                        ? "svg-icon-danger"
                        : color === "4"
                        ? "svg-icon-info"
                        : color === "5"
                        ? "svg-icon-primary"
                        : "")
                    }
                    dangerouslySetInnerHTML={{ __html: icon }}
                  ></span>
                </span>
              </div>

              {subTitle?.length <= 55 && (
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip">
                      {intl.locale === "ar" ? titleAr : titleEn}
                    </Tooltip>
                  }
                >
                  <div className="fw-bold text-gray-500 mb-6 two-line-ellipsis">
                    {intl.locale === "ar" ? subTitle : subTitleEn} {count}
                  </div>
                </OverlayTrigger>
              )}
            </div>
            <div className="w-100 d-flex justify-content-center mt-auto mb-3">
              {card?.isExternal ? (
                <Link
                  to={link}
                  target="_blank"
                  className="btn btn-primary py-3 w-100"
                  style={{ maxWidth: 200 }}
                >
                  {intl.formatMessage({ id: "ViewDetails" })}{" "}
                </Link>
              ) : (
                <span
                  className="btn btn-primary py-3 w-100"
                  style={{ maxWidth: 200, cursor: "pointer" }}
                >
                  {intl.formatMessage({ id: "ViewDetails" })}{" "}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { WorkspaceCard };
