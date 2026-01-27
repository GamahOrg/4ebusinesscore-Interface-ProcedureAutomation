import { FC, useState } from "react";
import { AddSystemsClassificationsContent } from "./AddsystemsClassificationsContent";

const AddSystemClassifi: FC = () => {
  let [systemName, setSystemName] = useState<string>("");
  let [systemDescription, setSystemDescription] = useState<string>("");
  let [color, setColor] = useState<any>(0);
  let [icon, setIcon] = useState<string>("");
  let [orgName, setOrgName] = useState<string>("");

  return (
    <>
      <div className="row gy-5 justify-content-center">
        <div className="col-md-10 col-12">
          <AddSystemsClassificationsContent
            setOrg={setOrgName}
            setIcon={setIcon}
            setColor={setColor}
            setSystemName={setSystemName}
            setSystemDescription={setSystemDescription}
          />
        </div>
      </div>
    </>
  );
};

export { AddSystemClassifi };
