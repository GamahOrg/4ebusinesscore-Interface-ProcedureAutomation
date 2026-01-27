import { FC } from "react";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
import { EditSystemClassifi } from "./EditSystemClassifi";


const EditSystemsClassifications: FC = () => {
  const location = useLocation();

  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  const breadcrumbItems = [
    {
      path: "/systems-services-settings/systems-classifications",
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "EditAClassification",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="EditAClassification"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
        fixedTitle={true}
        extraState={partTitle}
      />
      <EditSystemClassifi />
    </>
  );
};

export { EditSystemsClassifications };
