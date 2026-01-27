import { Fragment } from "react";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
import TrackRequestsToolDetails from "./components/TrackRequestsToolDetails";

export function AutomationRequestsPathDetails() {
  let location = useLocation();

  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/automation-requests-path",
      defaultName: "TrackRequests",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "RequestDetails",
      name: "",
    },
  ];
  return (
    <Fragment>
      <DynamicToolbar
        defaultTitle="RequestDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <TrackRequestsToolDetails />
    </Fragment>
  );
}
