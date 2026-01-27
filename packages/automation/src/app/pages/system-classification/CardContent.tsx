import { FC } from "react";
import { useIntl } from "react-intl";
import moment from "moment";
import { GetWorkSpaceByIdResponse } from "../../models/GetWorkSpaceByIdResponse";

interface GetSubSystemSettingProp{
  subSystemSetting:GetWorkSpaceByIdResponse;
  icon?:string;
  systemDescription?:string;
  color?:any;
  systemName?:string;
  orgName?:string;
  systemDescriptionEn?:string;
  systemNameEn?:string;
}


const ViewAllcardsCardContent: FC<GetSubSystemSettingProp> = ({subSystemSetting,icon,
  systemDescription,
  color,
  systemName,
  orgName, 
  systemDescriptionEn,
  systemNameEn,
}:GetSubSystemSettingProp) => {
  const intl = useIntl();

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark fs-6">
            {" "}
            {intl.formatMessage({id:"MangmentName"})}
          </span>
          <span className="text-muted mt-2 fw-bold fs-6">
            {" "}
            {orgName}
          </span>
        </h3>
      </div>

      <div className="card-body d-flex flex-center flex-column">
        <div className="symbol symbol-75px mb-2 toolsIcon">
          <span className={`symbol-label bg-light-${color==0?"danger":color==1?"success":color==2?"warning":"info"}`}>
            <span className={`svg-icon svg-icon-4x svg-icon-${color==0?"danger":color==1?"success":color==2?"warning":"info"}`}>
              {icon?<div dangerouslySetInnerHTML={{ __html: icon as string}} />:<i className="bi bi-graph-up-arrow fs-3x"></i>}

            </span>
            <span className="top-icon">
              <i className="bi bi-tools"></i>
            </span>
          </span>
        </div>

        <span className="fs-5 text-gray-800 fw-bolder">
          {intl.locale=="ar" ?systemName:systemNameEn}
          </span>

        <div className="fw-bold text-gray-400 mb-6">
          {intl.locale=="ar" ?systemDescription:systemDescriptionEn}
          
          </div>

        <div className="d-flex flex-center flex-wrap">
          <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
            <div className="fs-7 fw-bolder text-gray-700">{moment(subSystemSetting?.lastUpdate).format('YYYY-MM-DD')}</div>
            <div className="fw-bold text-gray-400 text-center fs-9">
              {intl.formatMessage({ id: "LastUpdate" })}
            </div>
          </div>

          <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
            <div className="fs-7 fw-bolder text-gray-700">{moment(subSystemSetting?.visitDate).format('YYYY-MM-DD')}</div>
            <div className="fw-bold text-gray-400 text-center fs-9">
              {intl.formatMessage({ id: "LastVisit" })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewAllcardsCardContent };
