import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditSystemClassificationsContent } from "./EditSystemClassificationsContent";
import { GetSubsystemSettingsClassificationById } from "../../redux/features/subsytemSettingsMainClassification";
import { RootState } from "../../redux/store/store";


const EditSystemClassifi: FC = () => {
  let [systemName, setSystemName] = useState<string>("");
  let [color, setColor] = useState<any>(0);

  let SubsystemSettingsClassification = useSelector((state: RootState) => {
    return state?.subsystemSettingsClassification?.item;
  });
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(GetSubsystemSettingsClassificationById(id) as any);
  }, [id]);

  return (
    <>
      <div className="row gy-5 justify-content-center">
        <div className="col-md-10 col-12">
          <EditSystemClassificationsContent
            setColor={setColor}
            setSystemName={setSystemName}
            subSystemSetting={SubsystemSettingsClassification}
          />
        </div>
      </div>
    </>
  );
};

export { EditSystemClassifi };
