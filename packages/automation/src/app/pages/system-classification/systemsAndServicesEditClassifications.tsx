import { FC, useEffect, useState } from "react";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { showSuccessAlert } from "@4eplatform/shared/index";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import Swal from "sweetalert2";

// import { getAllSubSystemMainLookUP } from "./slices/getAllSubsytemMainLookUpSlice";

// import { getAllSubSystemSettingsMainClassification } from "./slices/getAllSubsytemSettingsMainClassification";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";



import Select from "react-select";
import { RootState } from "../../redux/store/store";
import { SystemContent } from "./SystemContent";
import { fetchOrgs } from "../../redux/features/orgHierarchySlice";
import { ManagementHierarchyPopup } from "./ManagementHierarchyPopup";
import { getAllSubSystemSettingsMainClassification } from "../../redux/features/getAllSubsytemSettingsMainClassification";
import { getAllSubSystemMainLookUP } from "../../redux/features/getAllSubsytemMainLookUpSlice";
import { mainClassificationProps, mainClassificationSchema } from "../../validations/MainClassificationValidation";
import { fetchMainClassificationById, fetchOrgMembers, putMainClassification } from "../../redux/features/editClassificationSlice";


const SystemsAndServicesEditClassifications: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;
  let exceptionURL = location?.state?.exceptionURL;
  const [URL, setURL] = useState<string>("");
  const UrlParams = useParams();

  useEffect(() => {
    if (location?.pathname?.includes("/edit-external-system")) {
      setURL("/external-systems");
    } else if (location?.pathname?.includes("/edit-external-component")) {
      setURL("/external-components");
    } else if (location?.pathname?.includes("/edit-sso-system")) {
      setURL("/sso-systems");
    } else if (location?.pathname?.includes("/systems-settings")) {
      setURL("/systems-settings");
    } else {
      setURL("");
    }
  }, [location?.pathname]);

  const intl = useIntl();
  const breadcrumbItems = exceptionURL
    ? [
        {
          path: `/systems-services-settings/systems-classifications`,
          defaultName: "Cards",
          name: cardName || serviceName,
        },
        {
          path: `/systems-services-settings/systems-classifications/view-system/${exceptionURL}`,
          defaultName: "Systems",
          name: partTitle,
        },
        {
          path: "",
          defaultName: "EditMainClassification",
          name: "",
        },
      ]
    : [
        {
          path: `/systems-settings${URL}`,
          defaultName: "Cards",
          name: cardName || serviceName,
        },
        {
          path: "",
          defaultName: "EditMainClassification",
          name: "",
        },
      ];

  
  const [isSelected, setIsSelected] = useState<string>("no");
  const dispatch = useDispatch<any>();
  const [selectedElectronicServices, setSelectedElectronicServices] =
    useState<any>([]);
  const [selectedAdminOption, setSelectedAdminOption] = useState<any>(null);
  let [orgId, setOrgId] = useState<string>("");
  let [orgName, setOrgName] = useState<string>("");
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let language = intl.locale;
  let [type, setType] = useState<any>("");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<mainClassificationProps>({
    resolver: yupResolver(mainClassificationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  
  // useEffect(() => {
  //   dispatch(fetchElectronicServices({}) as any);
  // }, []);

  // let ElectronicServices = useSelector((state: RootState) => {
  //   return state?.electronicServices?.data?.electronicServices;
  // });

  // useEffect(() => {
  //   setElectronicServicesOptions(ElectronicServices as any);
  //   if (
  //     Array.isArray(mainClassification?.electronicsServices) &&
  //     mainClassification?.electronicsServices?.length === 0
  //   ) {
  //   } else {
  //     setSelectedElectronicServices(mainClassification?.electronicsServices);
  //   }
  // }, [ElectronicServices]);

  useEffect(() => {
    dispatch(fetchOrgs({}) as any);
    dispatch(getAllSubSystemSettingsMainClassification({}));
    dispatch(getAllSubSystemMainLookUP({}));
  }, []);

  let mainClassification = useSelector((state: RootState) => {
    return state?.editClassification?.mainClassificationData;
  });
  let AllSubSystemMainClassification = useSelector((state: RootState) => {
    return state?.subSystemSettingsMainClassification?.items;
  });
  let AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });
  let orgs = useSelector((state: RootState) => {
    return state?.orgHierarchy?.data;
  });
  let orgMembers = useSelector((state: RootState) => {
    return state?.editClassification?.orgMembersData;
  });

  useEffect(() => {
    if (UrlParams?.id) {
      dispatch(fetchMainClassificationById(UrlParams?.id) as any);
    }
  }, [UrlParams?.id]);

  let [selectedAdmins, setSelectedAdmins] = useState<any>([]);

  useEffect(() => {
    if (mainClassification) {
      setValue("name", mainClassification?.name);
      setValue("nameEn", mainClassification?.nameEn);
      setValue("color", mainClassification?.color);
      setValue("description", mainClassification?.description);
     setValue("descriptionEn", mainClassification?.descriptionEn);
      setValue("icon", mainClassification?.icon);
      setOrgId(mainClassification?.orgId);
      setValue("kpi", mainClassification?.kpi);
      setValue("teamName", mainClassification?.teamName);
      setIsSelected(mainClassification?.isShowInHomePage ? "yes" : "no");
      setValue(
        "subSystemMainClassificationId",
        mainClassification?.subSystemMainClassificationId
      );
      setValue(
        "subSystemMainClassificationLookupId",
        mainClassification?.subSystemMainClassificationLookupId
      );
    }
  }, [mainClassification]);

  useEffect(() => {
    setValue("serviceType", type || mainClassification?.serviceType);
  }, [type]);

  useEffect(() => {
    if (orgId) {
      const params = {
        pageSize: "10000",
        pageNumber: "1",
      };

      dispatch(fetchOrgMembers({ id: orgId, myparams: params }));
    }
    setOrgName(
      language == "ar"
        ? (findOrganizationById(orgs, orgId)?.nameAr as string)
        : (findOrganizationById(orgs, orgId)?.nameEn as string)
    );
  }, [orgs, orgId, dispatch]);

  function findOrganizationById(orgs: any, orgId: any) {
    if (orgs?.length > 0) {
      for (const org of orgs) {
        if (org?.id === orgId) {
          return org;
        }

        if (org?.children && org?.children?.length > 0) {
          const foundInChildren:any = findOrganizationById(org.children, orgId);
          if (foundInChildren) {
            return foundInChildren;
          }
        }
      }
    }

    return null;
  }



  useEffect(() => {
    setValue("admins", mainClassification?.admins);
    setSelectedAdmins(
      Array.isArray(orgMembers) &&
        orgMembers
          ?.filter((member: any) => {
            return mainClassification?.admins?.includes(member?.memberId);
          })
          ?.map((admin: any) => {
            return {
              label: admin?.memberName,
              value: admin?.memberId,
            };
          })
    );
  }, [orgMembers]);

  const EditMainClassification = async (
    formValues: mainClassificationProps
  ) => {
    const emptyFields = selectedElectronicServices.filter(
      (selectedService: any) =>
        !selectedService.name || !selectedService.description
    );
    if (emptyFields?.length !== 0) {
      showSuccessAlert(false, "YouMustFillEservice", intl);
    } else {
      let data = {
        id: UrlParams?.id,
        body: {
          putMainClassificationDTO: {
            name: formValues.name,
            nameEn: formValues.nameEn,
            orgId: orgId,
            admins: formValues.admins,
            icon: formValues.icon,
            color: formValues.color,
            description: formValues.description,
            descriptionEn: formValues.descriptionEn,
            kpi: formValues.kpi || "",
            serviceType: formValues.serviceType,
            isShowInHomePage: isSelected === "yes" ? true : false,
            teamName: formValues.teamName || "",
            electronicsServices: selectedElectronicServices,
            subSystemMainClassificationId:
              formValues.subSystemMainClassificationId,
            subSystemMainClassificationLookupId:
              formValues.subSystemMainClassificationLookupId,
          },
        },
      };
      dispatch(putMainClassification(data as any) as any).then((res: any) => {
        if (res.payload.statusEnum == 1) {
          showSuccessAlert(true, "EditedSuccessfully", intl);
          // fetchData();
          // dispatch(getMainClassification({}) as any);
          navigate(
            exceptionURL
              ? `/systems-services-settings/systems-classifications/view-system/${exceptionURL}`
              : URL.includes("edit-external-component")
                ? "/systems-settings/external-components"
                : URL.includes("edit-sso-system")
                  ? "/systems-settings/sso-systems"
                  : URL.includes("edit-external-system")
                    ? "/systems-settings/external-systems"
                    : "/systems-services-settings/systems-classifications",
            {
              state: {
                serviceName: cardName,
                cardId: id,
                cardTitle: cardName,
                partTitle: partTitle,
              },
            }
          );
        } else if (res.payload.message === '["checkservicetype"]') {
          Swal.fire({
            text: intl.formatMessage({ id: "checkServiceCatlog" }),
            icon: "error",
            heightAuto: false,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: "Agree" }),
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } else if (res.payload.message === '["checkServiceCatlog"]') {
          Swal.fire({
            text: intl.formatMessage({ id: "checkServiceCatlog" }),
            icon: "error",
            heightAuto: false,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: "Agree" }),
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } else if (
          res.payload.message === '["MainClassificationNameIsAlreadyExists"]'
        ) {
          Swal.fire({
            text: intl.formatMessage({
              id: "MainClassificationNameIsAlreadyExists",
            }),
            icon: "error",
            heightAuto: false,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: "Agree" }),
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } else if (res.payload.message === '["CheckcatoguryServicetype"]') {
          Swal.fire({
            text: intl.formatMessage({ id: "checkServiceCatlog" }),
            icon: "error",
            heightAuto: false,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: "Agree" }),
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          } else if (res.payload.message === '["checkitem"]') {
          Swal.fire({
            text: intl.formatMessage({ id: "checkServiceCatlog" }),
            icon: "error",
            heightAuto: false,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: "Agree" }),
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
        } else {
          showSuccessAlert(false, "AnErrorOccured", intl)
        }
      });
    }
  };

  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsSelected(selectedOption);
  };
  useEffect(() => {
    if (orgId) {
      setValue(
        "admins",
        Array.isArray(selectedAdmins) &&
          (selectedAdmins?.map((admin: any) => {
            return admin?.value;
          }) as any)
      );
      trigger("admins");
    }
  }, [selectedAdmins, orgId]);

  let [systemName, setSystemName] = useState<string>("");
    let [systemNameEn, setSystemNameEn] = useState<string>("");
  let [systemDescription, setSystemDescription] = useState<string>("");
  let [systemDescriptionEn, setSystemDescriptionEn] = useState<string>("");
  let [color, setColor] = useState<any>(0);
  let [icon, setIcon] = useState<string>("");

  useEffect(() => {

    // setColor(mainClassification?.color);
        setSystemName(
           mainClassification?.name 
    );
    setSystemNameEn(mainClassification?.nameEn)
    setIcon(mainClassification?.icon);
  setSystemDescription( mainClassification?.description);
  setSystemDescriptionEn( mainClassification?.descriptionEn);



  }, [mainClassification]);

  useEffect(() => {
    setOrgName(orgName);
  }, [orgName]);
  let formValues = watch();
  useEffect(() => {
    setColor(formValues.color);
  }, [formValues.color]);

  return (
    <>
      <DynamicToolbar
        defaultTitle="EditMainClassification"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
        fixedTitle={true}
        extraState={partTitle}
      />

      <div className="row gy-5">
        <div className="col-md-4">
          <SystemContent
            orgName={orgName}
            icon={icon}
            systemDescription={systemDescription}
            color={color}
            systemName={systemName}
           systemDescriptionInEn={systemDescriptionEn}
            subSystemSetting={mainClassification?.color as any}
            systemNameInEn={systemNameEn}
          />
        </div>
        <div className="col-md-8">
          <div className="row flex-start">
            <div className="card card-xl-stretch card-body">
              <div className="card-header py-5 mb-5">
                <div className="py-2">
                  <h3>
                    {intl.formatMessage({ id: "EditMainClassification" })}
                  </h3>
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })}
                  </span>
                </div>
              </div>
              <div className="py-1">
                <div className="pb-4 w-100">
                  <form onSubmit={handleSubmit(EditMainClassification)}>
                    <div>
                      <div className="row mb-3">
                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label className="form-label px-2  fs-6 text-gray-700 required">
                              {intl.formatMessage({ id: "ClassificationNameInAr" })}
                            </label>

                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="bi bi-diagram-3 special"></i>
                                </span>
                              </div>
                              <input
                                className="form-control"
                                placeholder={intl.formatMessage({
                                  id: "ClassificationNameInAr",
                                })}
                                {...register("name")}
                                onChange={(e) => setSystemName(e.target.value)}
                              />
                              {DisplayErrorMessage(
                                errors?.name?.message,
                                intl,
                                language
                              )}
                            </div>
                          </div>
                        </div>
                      {/* classification name in en  */}
                     <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label className="form-label px-2  fs-6 text-gray-700 required">
                              {intl.formatMessage({ id: "ClassificationNameInEn" })}
                            </label>

                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="bi bi-diagram-3 special"></i>
                                </span>
                              </div>
                              <input
                                className="form-control"
                                placeholder={intl.formatMessage({
                                  id: "ClassificationNameInEn",
                                })}
                                {...register("nameEn")}
                                onChange={(e) => setSystemNameEn(e.target.value)}
                              />
                              {DisplayErrorMessage(
                                errors?.nameEn?.message,
                                intl,
                                language
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label
                              className="form-label px-2  fs-6 text-gray-700 required"
                              style={{
                                textAlign:
                                  intl.locale == "ar" ? "right" : "left",
                                width: "100%",
                                display: "block",
                              }}
                            >
                              {intl.formatMessage({
                                id: "SubordinateManagement",
                              })}
                            </label>

                            <div className="mx-auto mt-1  ">
                              <div
                                className="input-group"
                                role="button"
                                onClick={() => setModalHShow(true)}
                              >
                                <input
                                  type="select"
                                  className="form-control form-control-solid ps-10"
                                  name="search"
                                  value={orgName}
                                  placeholder={intl.formatMessage({
                                    id: "Choose",
                                  })}
                                  role="button"
                                  readOnly={true}
                                />

                                <i className="bi bi-diagram-3 fs-1 input-group-text border-radius-0"></i>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2">
                            <label
                              className="form-label px-2 fs-6 text-gray-700 required"
                              htmlFor="admin"
                            >
                              {intl.formatMessage({ id: "ResponsibleForIt" })}
                            </label>
                            <div className="input-group d-flex flex-nowrap">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-user-circle special"></i>
                                </span>
                              </div>
                              <Select
                                id="admin"
                                className="flex-grow-1"
                                options={orgMembers?.map((member: any) => ({
                                  value: member?.memberId,
                                  label: member?.memberName,
                                }))}
                                placeholder={intl.formatMessage({
                                  id: "Choose",
                                })}
                                classNamePrefix="react-select"
                                value={selectedAdmins}
                                onChange={(selectedOption: any) =>
                                  setSelectedAdmins(selectedOption)
                                }
                                isMulti
                                isClearable={true}
                              />
                            </div>
                            {DisplayErrorMessage(
                              errors?.admins?.message,
                              intl,
                              language
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label className="form-label px-2  fs-6 text-gray-700">
                              {intl.formatMessage({ id: "TeamName" })}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="bi bi-diagram-3 special"></i>
                                </span>
                              </div>
                              <input
                                className="form-control"
                                placeholder={intl.formatMessage({
                                  id: "TeamName",
                                })}
                                {...register("teamName")}
                              />
                              {DisplayErrorMessage(
                                errors?.teamName?.message,
                                intl,
                                language
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label className="form-label px-2  fs-6 text-gray-700 required">
                              {intl.formatMessage({ id: "ShowCategoryAtMain" })}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fad fa-eye fs-3"></i>
                                </span>
                              </div>
                              <select
                                className="form-select form-select-solid px-4 py-0 m-0"
                                id="selectOption"
                                value={isSelected}
                                onChange={handleSelectChange}
                              >
                                <option value="yes">
                                  {intl.formatMessage({ id: "YES" })}
                                </option>
                                <option value="no">
                                  {intl.formatMessage({ id: "NO" })}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label className="form-label px-2  fs-6 text-gray-700 required">
                              {intl.formatMessage({ id: "Icon" })}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fa-solid fa-icons special"></i>
                                </span>
                              </div>
                              <input
                                className="form-control"
                                placeholder={intl.formatMessage({
                                  id: "IconInWebsite",
                                })}
                                {...register("icon")}
                              />
                              <div
                                style={{
                                  top: "50%",
                                  left: intl.locale == "ar" ? "15px" : "",
                                  right: intl.locale == "en" ? "15px" : "",
                                }}
                                className="position-absolute translate-middle-y"
                              >
                                <a
                                  href="https://fontawesome.com/v5/search?q=file&o=r&s=duotone"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fa-solid fa-link fs-5 text-muted"></i>
                                </a>
                              </div>
                            </div>

                            {DisplayErrorMessage(
                              errors?.icon?.message,
                              intl,
                              language
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label className="form-label px-2  fs-6 text-gray-700 required">
                              {intl.formatMessage({ id: "Color" })}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-palette special"></i>
                                </span>
                              </div>

                              <select
                                id="color"
                                className="form-select form-select-solid px-4 py-0 m-0"
                                data-placeholder={intl.formatMessage({
                                  id: "Color",
                                })}
                                tabIndex={-1}
                                {...register("color")}
                              >
                                <option disabled selected value="">
                                  {intl.formatMessage({ id: "Color" })}
                                </option>
                                <option
                                  value={intl.formatMessage({ id: "Red" })}
                                >
                                  {intl.formatMessage({ id: "Red" })}
                                </option>
                                <option
                                  value={intl.formatMessage({ id: "Green" })}
                                >
                                  {intl.formatMessage({ id: "Green" })}
                                </option>
                                <option
                                  value={intl.formatMessage({ id: "Yellow" })}
                                >
                                  {intl.formatMessage({ id: "Yellow" })}
                                </option>
                                <option
                                  value={intl.formatMessage({ id: "Blue" })}
                                >
                                  {intl.formatMessage({ id: "Blue" })}
                                </option>
                              </select>
                              {DisplayErrorMessage(
                                errors?.color?.message,
                                intl,
                                language
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label
                              className="fs-6 fw-bold mb-2 required"
                              htmlFor="ServiceType"
                            >
                              {intl.formatMessage({ id: "ServiceType" })}{" "}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-cogs special"></i>
                                </span>
                              </div>
                              <select
                                id="ServiceType"
                                className="form-select form-select-solid px-4 py-0 m-0"
                                {...register("serviceType")}
                              >
                                <option value={0}>
                                  {intl.formatMessage({ id: "Choose" })}
                                </option>
                                <option value={1}>
                                  {intl.formatMessage({ id: "All" })}
                                </option>
                                <option value={2}>
                                  {intl.formatMessage({ id: "ServiceReqest" })}
                                </option>
                                <option value={3}>
                                  {intl.formatMessage({ id: "ReportAService" })}
                                </option>
                              </select>
                            </div>
                            {DisplayErrorMessage(
                              errors?.serviceType?.message,
                              intl,
                              language
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label
                              className="fs-6 fw-bold mb-2 required"
                              htmlFor="SubCategory"
                            >
                              {intl.formatMessage({ id: "SubCategory" })}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-layer-group special"></i>
                                </span>
                              </div>
                              <select
                                id="SubCategory"
                                className="form-select form-select-solid px-4 py-0 m-0"
                                {...register("subSystemMainClassificationId")}
                              >
                                <option value="" disabled>
                                  {intl.formatMessage({ id: "Choose" })}
                                </option>
                                {AllSubSystemMainClassification?.map(
                                  (item: any) => (
                                    <option key={item?.id} value={item?.id}>
                                      {intl.locale === "ar"
                                        ? item?.nameAr
                                        : item?.nameEn}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            {DisplayErrorMessage(
                              errors?.subSystemMainClassificationId?.message,
                              intl,
                              language
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-1 py-2 ">
                            <label
                              className="fs-6 fw-bold mb-2 required"
                              htmlFor="SystemStatus"
                            >
                              {intl.formatMessage({ id: "SystemStatus" })}{" "}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-newspaper special"></i>
                                </span>
                              </div>
                              <select
                                id="SystemStatus"
                                className="form-select form-select-solid px-4 py-0 m-0"
                                {...register(
                                  "subSystemMainClassificationLookupId"
                                )}
                              >
                                <option value="" selected disabled>
                                  {intl.formatMessage({ id: "Choose" })}
                                </option>
                                {AllSubSystemMainLookUp?.map((item: any) => (
                                  <option key={item?.id} value={item?.id}>
                                    {intl.locale === "ar"
                                      ? item?.nameAr
                                      : item?.nameEn}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {DisplayErrorMessage(
                              errors?.subSystemMainClassificationLookupId
                                ?.message,
                              intl,
                              language
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-1 pb-2 ">
                            <label className="form-label px-2  fs-6 text-gray-700">
                              {intl.formatMessage({ id: "WebsiteURL" })}
                            </label>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="special fa-solid fa-link"></i>
                                </span>
                              </div>
                              <input
                                className="form-control"
                                placeholder={intl.formatMessage({
                                  id: "WebsiteURL",
                                })}
                                {...register("kpi")}
                              />
                              <div
                                style={{
                                  top: "50%",
                                  left: intl.locale == "ar" ? "15px" : "",
                                  right: intl.locale == "en" ? "15px" : "",
                                }}
                                className="position-absolute translate-middle-y"
                              ></div>
                            </div>
                            {DisplayErrorMessage(
                              errors?.kpi?.message,
                              intl,
                              language
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row pb-4">
                        <div className="col-lg-12">
                          <label
                            htmlFor="reason"
                            className="form-label px-2 fontSz-6 required"
                          >
                            {intl.formatMessage({ id: "DescriptionInArabic" })}
                          </label>

                          <textarea
                            id="reason"
                            className="form-control pt-4 form-control-lg form-control-solid mb-1"
                            rows={2}
                            placeholder={intl.formatMessage({
                              id: "DescriptionInArabic",
                            })}
                            {...register("description")}
                            onChange={(e) =>
                              setSystemDescription(e.target.value)
                            }
                          ></textarea>
                          {DisplayErrorMessage(
                            errors?.description?.message,
                            intl,
                            language
                          )}
                        </div>
                      </div>
                      {/* des in en */}
            <div className="row pb-4">
                        <div className="col-lg-12">
                          <label
                            htmlFor="reason"
                            className="form-label px-2 fontSz-6 required"
                          >
                            {intl.formatMessage({ id: "DescriptionInEn" })}
                          </label>

                          <textarea
                            id="reason"
                            className="form-control pt-4 form-control-lg form-control-solid mb-1"
                            rows={2}
                            placeholder={intl.formatMessage({
                              id: "DescriptionInEn",
                            })}
                            {...register("descriptionEn")}
                            onChange={(e) =>
                              setSystemDescriptionEn(e.target.value)
                            }
                          ></textarea>
                          {DisplayErrorMessage(
                            errors?.descriptionEn?.message,
                            intl,
                            language
                          )}
                        </div>
                      </div>
                      <div
                        className="modal fade"
                        id="Rega_modal_viewallcards_hierarchy"
                      >
                        <ManagementHierarchyPopup
                          show={modalHShow}
                          orgId={orgId}
                          setOrgId={setOrgId}
                          orgName={orgName}
                          setOrgName={setOrgName}
                          handleClose={() => {
                            setModalHShow(false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mb-3 col-12 col-lg-7 mx-auto">
                      <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                        <div className="d-flex justify-content-center align-items-center w-50">
                          <Link
                            id="editMainClassificationCancelButton"
                            to={
                              exceptionURL
                                ? `/systems-services-settings/systems-classifications/view-system/${exceptionURL}`
                                : URL.includes("edit-external-component")
                                  ? "/systems-settings/external-components"
                                  : URL.includes("edit-sso-system")
                                    ? "/systems-settings/sso-systems"
                                    : URL.includes("edit-external-system")
                                      ? "/systems-settings/external-systems"
                                      : "/systems-services-settings/systems-classifications"
                            }
                            type="reset"
                            className="btn btn-secondary px-15 mx-3"
                            state={{
                              cardId: id,
                              cardTitle: cardName,
                              partTitle: partTitle,
                            }}
                          >
                            {intl.formatMessage({ id: "Cancel" })}
                          </Link>
                          {orgId == "" ? (
                            <div
                              className="btn btn-primary px-15 mx-3"
                              style={{ border: "none" }}
                              onClick={() => {
                                showSuccessAlert(
                                  false,
                                  "YouMustSelectTheDepartment",
                                  intl
                                );
                              }}
                            >
                              {intl.formatMessage({ id: "Edit" })}
                            </div>
                          ) : (
                            <button
                              className="btn btn-primary px-15 mx-3"
                              style={{ border: "none" }}
                              type="submit"
                              disabled={isSubmitting ? true : false}
                            >
                              {intl.formatMessage({ id: "Edit" })}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="Rega_modal_viewallcards_hierarchy">
        <ManagementHierarchyPopup
          show={modalHShow}
          orgId={orgId}
          setOrgId={setOrgId}
          orgName={orgName}
          setOrgName={setOrgName}
          handleClose={() => {
            setModalHShow(false);
          }}
        />
      </div>
    </>
  );
};

export { SystemsAndServicesEditClassifications };
