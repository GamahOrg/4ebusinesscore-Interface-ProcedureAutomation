import { FC } from "react";
import { useIntl } from "react-intl";

type EditDigitalServicesSettingsProps = {
  ElectronicServices: any;
  setSelectedElectronicServices: any;
  selectedElectronicServices: any;
  mainClassification: any;
};

export const EditDigitalServicesSettings: FC<
  EditDigitalServicesSettingsProps
> = ({
  ElectronicServices,
  setSelectedElectronicServices,
  selectedElectronicServices,
  mainClassification,
}) => {
  const intl = useIntl();

  const handleInputChange = (
    serviceId: number,
    field: string,
    value: string
  ) => {
    setSelectedElectronicServices((prevServices: any) =>
      prevServices.map((service: any) =>
        service.id === serviceId ? { ...service, [field]: value } : service
      )
    );
  };

  const getPlaceholderDesc = (idx: number) => {
    if (idx === 0) return intl.formatMessage({ id: "YouViewReportsRequests" });
    if (idx === 1)
      return intl.formatMessage({ id: "YouAddReportExistingService" });
    if (idx === 2) return intl.formatMessage({ id: "YouRequestNewService" });
    if (idx === 3)
      return intl.formatMessage({ id: "YouViewAskedQuestionsSolutions" });
    return intl.formatMessage({ id: "ElectronicServices" });
  };

  const getPlaceholderName = (idx: number) => {
    if (idx === 0) return intl.formatMessage({ id: "MyRequests" });
    if (idx === 1) return intl.formatMessage({ id: "CurrentServiceReportt" });
    if (idx === 2) return intl.formatMessage({ id: "NewServiceRequest" });
    if (idx === 3)
      return intl.formatMessage({ id: "TechnicalSupportSolutions" });
    return intl.formatMessage({ id: "ElectronicServices" });
  };

  const handleIsCheck = (serviceId: string) => {
    setSelectedElectronicServices((prevServices: any) =>
      prevServices.map((service: any) => {
        return service?.id === serviceId
          ? { ...service, ischecked: !service.ischecked }
          : service;
      })
    );
  };

  return (
    <div className="row scroll-y mh-450px">
      <div className="table-responsive">
        <div className="col-lg-12">
          <table className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder dark-table-head">
            <thead className="fs-7 text-gray-400 text-uppercase">
              <tr>
                <th className="min-w-100px text-gray-700">
                  {intl.formatMessage({ id: "ElectronicServices" })}
                </th>
                <th className="min-w-350px text-gray-700">
                  {intl.formatMessage({ id: "Description" })}
                </th>
                <th className="min-w-90px text-center text-gray-700">
                  {intl.formatMessage({ id: "Active" })}
                </th>
              </tr>
            </thead>

            <tbody className="fs-6">
              {Array.isArray(mainClassification?.electronicsServices) &&
                mainClassification?.electronicsServices?.map(
                  (eService: any, idx: number) => (
                    <tr key={eService.id}>
                      <td className="py-2">
                        <div>
                          <label className="form-label px-2 fs-6 text-gray-700">
                            {intl.formatMessage({ id: eService.name })}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                {idx === 0 ? (
                                  <i className="fas fa-layer-group special"></i>
                                ) : idx === 1 ? (
                                  <i className="fad fa-file special"></i>
                                ) : idx === 2 ? (
                                  <i className="fad fa-layer-plus special"></i>
                                ) : (
                                  <i className="fas fa-user-cog special"></i>
                                )}
                              </span>
                            </div>
                            <input
                              onChange={(e) =>
                                handleInputChange(
                                  eService.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              id="eServiceName"
                              value={selectedElectronicServices[idx]?.name}
                              type="text"
                              className="form-control"
                              placeholder={
                                eService.name || getPlaceholderName(idx)
                              }
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="w-100 mt-9">
                          <input
                            onChange={(e) =>
                              handleInputChange(
                                eService.id,
                                "description",
                                e.target.value
                              )
                            }
                            id="eServiceDescription"
                            type="text"
                            className="form-control"
                            value={selectedElectronicServices[idx]?.description}
                            placeholder={
                              eService.description || getPlaceholderDesc(idx)
                            }
                          />
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md justify-content-center mt-8">
                          <input
                            className="form-check-input widget-9-check xCheckBg"
                            onChange={() => handleIsCheck(eService?.id)}
                            type="checkbox"
                            checked={selectedElectronicServices[idx]?.ischecked}
                            id={`Checkme${eService.id}`}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
