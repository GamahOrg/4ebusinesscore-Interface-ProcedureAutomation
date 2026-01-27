import { FC } from "react";
import CreateNewServiceHome from './components/CreateNewService'
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CreateNewService: FC = () => {

  let location = useLocation()
  let id = location?.state?.cardId
  let cardName = location?.state?.cardTitle
  let partTitle = location?.state?.partTitle || location?.state?.extraState
  
  const breadcrumbItems =  partTitle ? [
    { path: `/systems-services-settings`, defaultName: 'SystemsSettings', name: cardName },
    { path: ``, defaultName: partTitle, name: partTitle },
  ] : [
    // { path: ``, defaultName: 'TechnicalSupportSystemManager', name: '' },
    { path: ``, defaultName: 'CreateNewService', name: cardName },
  ]

  return (
    <>
      <DynamicToolbar defaultTitle={partTitle ? partTitle : "CreateNewService"} fixedTitle={partTitle? true : false} extraTitle={cardName} breadcrumbItems={breadcrumbItems} showWorkspace={true} cardId={id} extraState={partTitle}/>

      <CreateNewServiceHome/>
    </>
  );
};

export { CreateNewService };
