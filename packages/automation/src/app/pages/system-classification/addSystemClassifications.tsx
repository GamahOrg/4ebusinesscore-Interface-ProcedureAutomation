import { FC } from "react";

import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { AddSystemClassifi } from "./AddsystemClassifi";

const AddSystemClassifications: FC = () => {
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
      defaultName: "AddAClassification",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="AddAClassification"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        fixedTitle={true}
        cardId={id}
        extraState={partTitle}
      />

      <AddSystemClassifi />
    </>
  );
};

export { AddSystemClassifications };
