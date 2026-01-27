import React, { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchToolbar } from "../store/features/toolbarSlice";
import { AppDispatch, RootState } from "../store/store";
import { encryptUsingAES256 } from "@4eplatform/gateway/src/app/helpers/encrypt";

interface BreadcrumbItem {
  name?: string;
  defaultName?: string;
  path?: string;
}

interface DynamicToolbarProps {
  defaultTitle?: string;
  extraTitle?: string;
  breadcrumbItems: BreadcrumbItem[];
  showWorkspace: boolean;
  cardId?: number;
  cardOption?: string;
  fixedTitle?: boolean;
  extraState?: any;
  translate?: boolean;
}

const DynamicToolbar: FC<DynamicToolbarProps> = ({
  defaultTitle,
  extraTitle,
  breadcrumbItems,
  showWorkspace,
  cardId,
  cardOption,
  fixedTitle,
  extraState,
  translate = true,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const { state } = location;

  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.toolbar
  );

  const [cardName, setCardName] = useState<{
    nameAr?: string;
    nameEn?: string;
  } | null>(null);
  const [subSystemId, setSubSystemId] = useState<string | null>(null);
  const [digitalServices, setDigitalServices] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedCardName = localStorage.getItem("cardName");
      setCardName(storedCardName ? JSON.parse(storedCardName) : null);
      setSubSystemId(localStorage.getItem("subSystemId"));
      setDigitalServices(localStorage.getItem("DigitalServices"));
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (location.pathname) {
      let encryptedRoute;
      const parts = location.pathname.split("/");

      if (
        `${parts[1]}/${parts[2]}` ===
          "systems-services-settings/digital-services-settings" ||
        `${parts[1]}/${parts[2]}` ===
          "systems-services-settings/systems-classifications"
      ) {
        encryptedRoute = encryptUsingAES256(
          (window as any)._env_?.PUBLIC_URL +
            "/" +
            location.pathname.split("/")[1] +
            "/" +
            location.pathname.split("/")[2]
        );
      } else {
        encryptedRoute = encryptUsingAES256(
          (window as any)._env_?.PUBLIC_URL +
            "/" +
            location.pathname.split("/")[1]
        );
      }
      dispatch(fetchToolbar({ route: encryptedRoute })).then(
        (response: any) => {
          if (response.payload?.message === "LooKUpRetrievedSuccessfully") {
            localStorage.setItem(
              "cardName",
              JSON.stringify({
                nameAr: response.payload?.result?.cardNameAr,
                nameEn: response.payload?.result?.cardNameEn,
              })
            );
            localStorage.setItem(
              "subSystemId",
              response.payload?.result?.subSystemId || ""
            );
            localStorage.setItem(
              "workspaceKey",
              response.payload?.result?.workspaceKey || ""
            );
          }
        }
      );
    }
  }, [dispatch, location.pathname]);

  const cardTitle = state?.cardTitle || extraTitle;
  const subCardTitle = state?.subCardTitle || extraTitle;

  const getFormattedMessage = (defaultTitleMessage?: string) => {
    return defaultTitleMessage
      ? translate
        ? intl.formatMessage({ id: defaultTitleMessage })
        : defaultTitleMessage
      : "";
  };

  const getDisplayName = () => {
    if (breadcrumbItems.length === 1 && items) {
      return items?.cardNameEn || items?.cardNameAr
        ? intl.locale === "ar"
          ? items.cardNameAr
          : items.cardNameEn
        : subCardTitle ||
            cardTitle ||
            (intl.locale === "ar" ? cardName?.nameAr : cardName?.nameEn);
    }
    return !fixedTitle
      ? subCardTitle || cardTitle || getFormattedMessage(defaultTitle) || ""
      : getFormattedMessage(defaultTitle);
  };

  const workspaceState =
    subSystemId && digitalServices === "true" ? { subSystemId } : {};

  // Merge static breadcrumb items with toolbar item from API (if it has a name)
  const allBreadcrumbs: BreadcrumbItem[] = [
    ...(items?.cardNameEn || items?.cardNameAr
      ? [
          {
            name: intl.locale === "ar" ? items.cardNameAr : items.cardNameEn,
            path: getBreadcrumbPath(location),
          },
        ]
      : []),
    ...breadcrumbItems.slice(1), // Skip the first item as it is handled separately
  ];
  function getBreadcrumbPath(location: ReturnType<typeof useLocation>) {
    if (
      location.pathname.includes("/systems-classifications/add-system") ||
      location.pathname.includes("/systems-classifications/view-system") ||
      location.pathname.includes("/systems-classifications/edit-system") ||
      location.pathname.includes("/systems-classifications/edit-subsystem") ||
      location.pathname.includes(
        "/systems-classifications/edit-mainclassification"
      ) ||
      location.pathname.includes("/systems-classifications/edit-card/")
    ) {
      return `/systems-services-settings/systems-classifications`;
    }
    return "/" + location.pathname.split("/")[1];
  }

  return (
    <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
      <div className="container-xxl d-flex flex-stack flex-wrap p-0">
        <div className="page-title d-flex flex-column me-3">
          <h1 className="d-flex text-white fw-bolder my-1 fs-2">
            <bdi>{getDisplayName()}</bdi>
          </h1>

          <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
            {/* Home link */}
            <li className="breadcrumb-item text-white opacity-75 cursor-pointer">
              <span
                className="text-white text-hover-primary"
                onClick={() => {
                  window.open(
                    (window as any)._env_?.REACT_APP_Base_Url +
                      "/home-workspace",
                    "_self"
                  );
                }}
              >
                <bdi>{intl.formatMessage({ id: "Home" })}</bdi>
              </span>
            </li>

            {/* Workspace link */}
            {showWorkspace &&
              !location.pathname.includes("notifications-details") && (
                <>
                  <li className="breadcrumb-item">
                    <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
                  </li>
                  <li className="breadcrumb-item cursor-pointer opacity-75">
                    <Link
                      onClick={() => {
                        localStorage.setItem(
                          "mainClassificationId",
                          "00000000-0000-0000-0000-000000000000"
                        );
                        localStorage.setItem("DigitalServices", "true");
                        localStorage.setItem("ClassificationName", "null");
                        localStorage.setItem("isSubSystem", "true");
                        localStorage.setItem(
                          "subSystemId",
                          "2905eef8-d77d-468e-891a-9b6ca922d02a"
                        );
                        // window.open(
                        //   (window as any)._env_?.REACT_APP_Base_Url +
                        //     "/systems-services-settings/dynamic-workspace",
                        //   "_self"
                        // );
                      }}
                      to="/"
                      className="text-white text-hover-primary "
                    >
                      {intl.formatMessage({ id: "Workspace" })}
                    </Link>
                  </li>
                </>
              )}

            {allBreadcrumbs?.map((item, idx) => (
              <React.Fragment key={idx}>
                <li className="breadcrumb-item">
                  <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
                </li>
                <li
                  className={`breadcrumb-item text-white opacity-75 pe-0 ${
                    idx === allBreadcrumbs.length - 1 ? "active" : ""
                  }`}
                >
                  {item?.path && idx !== allBreadcrumbs.length - 1 ? (
                    <Link
                      to={item?.path}
                      className="text-white text-hover-primary"
                    >
                      {item.name || getFormattedMessage(item.defaultName)}
                    </Link>
                  ) : (
                    item.name || getFormattedMessage(item.defaultName)
                  )}
                </li>
              </React.Fragment>
            ))}

            {loading && (
              <li className="breadcrumb-item text-white opacity-75">
                <span className="spinner-border spinner-border-sm" />
              </li>
            )}
            {/* {error && <li className="breadcrumb-item text-danger">{error}</li>} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DynamicToolbar;
