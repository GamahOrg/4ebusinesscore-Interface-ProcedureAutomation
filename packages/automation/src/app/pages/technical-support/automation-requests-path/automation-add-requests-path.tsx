import { Fragment, useState } from "react";
import AddTrackRequestsTool from "./components/AddTrackRequestsTool";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

function AutomationAddRequestsPath() {
  let location = useLocation();

  const [selectedRequestTemplate, setSelectedRequestTemplate] = useState<any>(
    {}
  );
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

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
      defaultName: "AddNewPath",
      name: "",
    },
  ];
  return (
    <Fragment>
      <DynamicToolbar
        defaultTitle="AddNewPath"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <AddTrackRequestsTool
        setLastAddedId={setLastAddedId}
        setSelectedRequestTemplate={setSelectedRequestTemplate}
      />
    </Fragment>
  );
}

export default AutomationAddRequestsPath;
