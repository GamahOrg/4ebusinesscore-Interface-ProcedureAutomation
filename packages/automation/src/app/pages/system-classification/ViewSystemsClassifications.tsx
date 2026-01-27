import { FC } from "react";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { ViewSystemClassifi } from "./ViewSystemClassifi";

const ViewSystemsClassifications: FC = () => {
  const intl = useIntl();
  const location = useLocation();

  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState ;

  const breadcrumbItems = [
    {
      path: "/systems-services-settings/systems-classifications",
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: intl.locale =="ar" ? "الانظمة":"systems",
      name: partTitle,
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle={partTitle ? partTitle : intl.locale =="ar" ? "الانظمة":"systems"}
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
        fixedTitle={true}
        extraState={partTitle}
        translate={false}
      />
      <ViewSystemClassifi />
    </>
  );
};

export { ViewSystemsClassifications };
