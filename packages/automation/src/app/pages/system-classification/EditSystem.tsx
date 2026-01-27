import { FC, useEffect, useState } from "react";

import { EditSystemContent } from "./EditSystemContent";
import { useDispatch, useSelector} from "react-redux";

import { useParams } from "react-router-dom";
import { fetchWorkSpace } from "../../redux/features/SubsytemSettingsSlice";
import { RootState } from "../../redux/store/store";
import { SystemContent } from "./SystemContent";


const EditSystem: FC = () => {
  let [systemName,setSystemName]=useState<string>("")
  let [systemDescription,setSystemDescription]=useState<string>("")
  let [color,setColor]=useState<any>(0)
  let [icon,setIcon]=useState<string>("")
  let [orgName,setOrgName]=useState<string>("")
  let [systemDescriptionInEn,setSystemDescriptionInEn]=useState<string>("");
  let [systemNameInEn,setSystemNameInEn]=useState<string>("")
  let workspace=useSelector((state:RootState)=>{return state?.SubsytemSettingsAggregator})
  const dispatch = useDispatch();
 let {id}=useParams();
 useEffect(()=>{
 if(workspace){
  setColor(workspace?.data?.color)
 }
 },[workspace])

  useEffect(()=>{
     dispatch(fetchWorkSpace(id) as any);
 },[id]);
  return (
    <>
      <div className="row gy-5">
        <div className="col-md-4">
          <SystemContent orgName={orgName} icon={icon} 
           systemDescription={systemDescription} color={color} systemName={systemName} subSystemSetting={workspace.data}
           systemDescriptionInEn={systemDescriptionInEn} systemNameInEn={systemNameInEn}
            />
        </div>
        <div className="col-md-8">
          <EditSystemContent setOrg={setOrgName} setIcon={setIcon} setColor={setColor} setSystemName={setSystemName}
           setSystemDescription={setSystemDescription} subSystemSetting={workspace.data} setSystemDescriptionInEn={setSystemDescriptionInEn}
           setSystemNameInEn={setSystemNameInEn}
           />
        </div>
      </div>
    </>
  );
};

export { EditSystem };
