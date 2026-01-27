import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import TrackRequestsTool from "./components/TrackRequestsTool";
import { useIntl } from "react-intl";

const AutomationRequestsPath: FC = () => {
  const intl = useIntl();
  let location = useLocation();
  let id = location?.state?.cardId;
  let serviceName = location?.state?.serviceName;
  let cardName = location?.state?.cardTitle;
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "ProcessAutomationRequestsPath",
      name: serviceName || cardName,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle={"ProcessAutomationRequestsPath"}
          extraTitle={serviceName || cardName}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardId={id}
        />
        <Link
          to="/automation-requests-path/add-requests-path"
          state={{ serviceName: cardTitle }}
          className="btn btn-light text-gray-800"
        >
          {intl.formatMessage({ id: "AddNewPath" })}
        </Link>
      </div>
      <TrackRequestsTool />
    </>
  );
};

export { AutomationRequestsPath };
