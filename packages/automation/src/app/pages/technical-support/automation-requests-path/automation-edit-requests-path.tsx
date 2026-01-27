import { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import EditTrackRequestsTool from "./components/EditTrackRequestsTool";
import { fetchItemById } from "../../../redux/features/item/itemByIdSlice";
import { RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";

function AutomationEditRequestsPath() {
  let location = useLocation();

  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { id } = useParams();
  //getItemById
  useEffect(() => {
    if (id) dispatch(fetchItemById(id) as any) as any;
  }, [id]);
  let item = useSelector((state: RootState) => {
    return state?.itemById?.data;
  });

  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    setRequestId(item?.result?.requestTemplateId);
  }, [item]);
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
      defaultName: "EditTrack",
      name: "",
    },
  ];
  return (
    <Fragment>
      <DynamicToolbar
        defaultTitle="EditTrack"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <EditTrackRequestsTool
        id={id}
        setLastAddedId={setLastAddedId}
        lastAddedId={lastAddedId}
      />
    </Fragment>
  );
}

export default AutomationEditRequestsPath;
