import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";


// import { editSubsystem } from "../slices/editWorkspaceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { format } from "date-fns";

import { showSuccessAlert } from "@4eplatform/shared/services/helper";
// import { getAllSubSystemMainLookUP } from "../slices/getAllSubsytemMainLookUpSlice";
import Select from "react-select";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
// import { getAllSSOSecuritySetting } from "../slices/ssoSecuritySettingSlice";
import { GetWorkSpaceByIdResponse } from "../../models/GetWorkSpaceByIdResponse";
import { ManagementHierarchyPopup } from "./ManagementHierarchyPopup";
import { EditPopup } from "./EditPopup";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getAllSubSystemSettingsMainClassification } from "../../redux/features/getAllSubsytemSettingsMainClassification";
import { ValidationSFormsSchema, ValidationSystemFormsProps } from "../../validations/ValidationSystemFormsProps";
import { getAllSubSystemMainLookUP } from "../../redux/features/getAllSubsytemMainLookUpSlice";
import { Lookup } from "../../models/Lookup";
import { editSubsystem } from "../../redux/features/editWorkspaceSlice";
import { Color } from "../../enums/response-status";
import { getAllSSOSecuritySetting } from "../../redux/features/ssoSecuritySettingSlice";
interface GetSubSystemSettingProp {
  subSystemSetting: GetWorkSpaceByIdResponse;
  setIcon?: any;
  setColor?: any;
  setSystemName?: any;
  setSystemDescription?: any;
  setOrg?: any;
  setSystemDescriptionInEn?:any;
  setSystemNameInEn?:any;
}

const EditSystemContent: FC<GetSubSystemSettingProp> = ({
  setOrg,
  subSystemSetting,
  setIcon,
  setColor,
  setSystemName,
  setSystemDescription,
  setSystemDescriptionInEn,
  setSystemNameInEn,
}: GetSubSystemSettingProp) => {
  const [showEdit, setShowEdit] = useState(false);
  const [subsystem, setSubsystem] =
    useState<GetWorkSpaceByIdResponse>(subSystemSetting);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let location = useLocation();
  let exceptionURL = location?.state?.exceptionURL;
  const [URL, setURL] = useState<string>("");

  useEffect(() => {
    if (location?.pathname?.includes("/edit-external-system")) {
      setURL("/edit-external-system");
    } else if (location?.pathname?.includes("/edit-external-component")) {
      setURL("/edit-external-component");
    } else if (location?.pathname?.includes("/edit-sso-system")) {
      setURL("/edit-sso-system");
    } else if (location?.pathname?.includes("/edit-system")) {
      setURL("/edit-system");
    } else {
      setURL("");
    }
  }, [location?.pathname]);

  const [isHide, setIsHide] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();
  let language = intl.locale;
  let { id } = useParams();
  const [isSelected, setIsSelected] = useState<string>("");
  const [signOn, setSignOn] = useState<string>("no");
  const [system, setSystem] = useState<string>("internal");
  const [isExternalComponent, setIsExternalComponent] = useState<string>("no");
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [errorSelectedCategory, setErrorSelectedCategory] =
    useState<Boolean>(false);

  const handleSelectSignOnChange = (event: any) => {
    const selectedOption = event.target.value;
    setSignOn(selectedOption);
  };
  const handleSelectExternalComponentChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsExternalComponent(selectedOption);
  };

  useEffect(() => {
    setSubsystem(subSystemSetting);
  }, [subSystemSetting]);
  useEffect(() => {
    dispatch(getAllSubSystemSettingsMainClassification({}) as any);
    dispatch(getAllSubSystemMainLookUP({}));
  }, [dispatch]);
  let Subcategories = useSelector((state: RootState) => {
    return state?.subSystemSettingsMainClassification?.items;
  });
  let AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });

  useEffect(() => {
    setValue("noteNameAr", subsystem?.noteNameAr);
    setValue("noteNameEn", subsystem?.noteNameEn);
    setValue("description", subsystem?.description);
    setValue("descriptionEn", subsystem?.descriptionEn);
    setValue("color", subsystem?.color);
    setValue("icon", subsystem?.icon);
    setValue("organizationHierarchyId", subsystem?.organizationHierarchyId);
    setValue("url", subsystem?.url);
    setValue("subsytemMainLookupId", subsystem?.subsytemMainLookupId);
    setValue("ssoSecuritySettingId", subsystem?.ssoSecuritySettingId);

    setOrgName(intl.locale === "ar" ? subsystem?.orgNameAr : subsystem?.orgNameEn);
    setOrgId(subsystem?.organizationHierarchyId);
    setIsSelected(subsystem?.isVisiable ? "yes" : "no");
    setSystem(subsystem?.isExternal ? "external" : "internal");
    setSignOn(subsystem?.isSinglSignOn ? "yes" : "no");
    setIsExternalComponent(subsystem?.isExternalComponent ? "yes" : "no");
    if (subsystem?.isSinglSignOn) {
      setValue("identityProvider", subsystem?.identityProvider);
      setValue("clientId", subsystem?.clientId);
      setValue("clientSecret", subsystem?.clientSecret);
    }

    setIsHide(!subsystem?.subsystemIsVisiable);
  }, [subsystem]);

  useEffect(() => {
    if (URL == "/edit-external-component") {
      setValue("url", `/dynamic-workspace`);
    }
  }, [URL]);

  useEffect(() => {
    if (subsystem?.subsytemMainIds) {
      const selectedOptions =
        Array.isArray(subsystem?.subsytemMainIds) &&
        subsystem?.subsytemMainIds
          ?.map((id: string) => {
            const matchingCategory =
              Array.isArray(Subcategories) &&
              Subcategories?.find(
                (subCategory: Lookup) => subCategory?.id === id
              );
            if (matchingCategory) {
              return {
                value: matchingCategory?.id,
                label:
                  language === "ar"
                    ? matchingCategory?.nameAr
                    : matchingCategory?.nameEn,
              };
            }
            return null;
          })
          ?.filter((option) => option !== null);
      setValue("subsytemMainId", subsystem?.subsytemMainIds);
      setSelectedCategory(selectedOptions);
    }
  }, [subsystem, Subcategories]);

  const [orgName, setOrgName] = useState("");

  const [orgId, setOrgId] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSystemFormsProps>({
    resolver: yupResolver(ValidationSFormsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const categoryOptions = Subcategories?.map((subCategory: Lookup) => ({
    value: subCategory?.id,
    label: language === "ar" ? subCategory?.nameAr : subCategory?.nameEn,
  }));

  useEffect(() => {
    if (selectedCategory?.id) {
      setValue("subsytemMainId", selectedCategory?.id);
      trigger("subsytemMainId");
    }

    const id =
      (Array.isArray(selectedCategory) &&
        selectedCategory?.map((category: any) => category.value)) ||
      [];
    setSelectedCategoryIds(id);
  }, [selectedCategory]);

  const navigate = useNavigate();

  let cardId = location?.state?.cardId;
  let cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  const SubmitEditHandler = async (formValues: ValidationSystemFormsProps) => {
    if (selectedCategoryIds?.length == 0) {
      return setErrorSelectedCategory(true);
    }
    setErrorSelectedCategory(false);
    let body = {
      id: id,
      noteNameAr: formValues.noteNameAr,
      noteNameEn: formValues.noteNameEn,
      organizationHierarchyId: orgId,
      description: formValues.description,
     descriptionEn: formValues.descriptionEn,
      icon: formValues.icon,
      url: formValues.url,
      color: formValues.color,
      subsytemMainLookupId: formValues.subsytemMainLookupId,
      state: 0,
      visitDate: format(new Date(), "yyyy-MM-dd"),
      isActive: true,
      isVisiable: isSelected == "yes" ? true : false,
      subsytemMainId: selectedCategoryIds,
      subsystemIsVisiable: !isHide,
      isExternal: system === "external" ? true : false,
      isExternalComponent: isExternalComponent === "yes" ? true : false,
      isSinglSignOn:
        system === "internal" ? null : signOn === "yes" ? true : false,
      identityProvider:
        signOn === "no" ? null : formValues.identityProvider || null,
      clientId: signOn === "no" ? null : formValues.clientId || null,
      clientSecret: signOn === "no" ? null : formValues.clientSecret || null,
      ssoSecuritySettingId: signOn === "yes" ? formValues.ssoSecuritySettingId : null
    };
    try {
      const result = await dispatch(
        editSubsystem({ id: id ?? "", item: body }) as any
      );

      if (result?.payload.statusEnum === 1) {
        showSuccessAlert(true, "EditedSuccessfully", intl);
        navigate(
          exceptionURL
            ? `/systems-services-settings/systems-classifications/view-system/${exceptionURL}`
            : URL.includes("edit-external-component")
              ? "/systems-settings/external-components"
              : URL.includes("edit-sso-system")
                ? "/systems-settings/sso-systems"
                : URL.includes("edit-external-system")
                  ? "/systems-settings/external-systems"
                  : "/systems-settings",
          {
            state: {
              serviceName: cardName,
              cardId: cardId,
              cardTitle: cardName,
              partTitle: partTitle,
            },
          }
        );
      } else if (result?.payload.statusEnum === 4) {
        showSuccessAlert(false, "YouMustSelectTheDepartment", intl);
      } else if (
        result?.payload?.message ==
        '["NameEn is already exist","NameAr is already exist"]'
      )
        showSuccessAlert(false, "NameArAndNameEnAlreadyExists", intl);
      else if (result?.payload?.message == '["NameAr is already exist"]')
        showSuccessAlert(false, "NameArIsAlreadyExists", intl);
      else if (result?.payload?.message == '["NameEn is already exist"]')
        showSuccessAlert(false, "NameEnIsAlreadyExists", intl);
      else showSuccessAlert(false, "AnErrorOccured", intl);
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  useEffect(() => {
    setSystemName(
   subsystem?.noteNameAr
    );
    setIcon(subsystem?.icon);
    setSystemDescription(
 subsystem?.description 
)
setSystemDescriptionInEn( subsystem?.descriptionEn);
setSystemNameInEn(subsystem?.noteNameEn)
  }, [subsystem]);

  useEffect(() => {
    setOrg(orgName);
  }, [orgName]);
  let formValues = watch()
  useEffect(() => {
    setColor(formValues.color)
  }, [formValues.color])

  useEffect(() => {
    dispatch(getAllSSOSecuritySetting({}) as any)
  }, [])

  const SSOSecuritySettings = useSelector((state: RootState) => state.ssoSecuritySetting)

  return (
    <div
      id="kt_content_container"
      className="d-flex flex-column-fluid align-items-start"
    >
      <div id="kt_content">
        <div className="row">
          <div>
            <div className="card card-xl-stretch card-body">
              <div className="card-header py-5 mb-5">
                <div className="py-2">
                  <h3>{intl.formatMessage({ id: "EditSystem" })}</h3>
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })}
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit(SubmitEditHandler)}>
                <div className="row gy-5 p-3" style={{ textAlign: "start" }}>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="SystemName" className="mb-2 required">
                        {intl.formatMessage({ id: "SystemNameInArabic" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-gear"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="SystemName"
                          placeholder={intl.formatMessage({ id: "SystemName" })}
                          {...register("noteNameAr")}
                          onChange={(e) => setSystemName(e.target.value)}
                        />
                        {DisplayErrorMessage(
                          errors?.noteNameAr?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="SystemName" className="mb-2 required">
                        {intl.formatMessage({ id: "SystemNameInEnglish" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-gear"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="SystemName"
                          placeholder={intl.formatMessage({ id: "SystemName" })}
                          {...register("noteNameEn")}
                          onChange={(e) => setSystemNameInEn(e.target.value)}
                        />
                        {DisplayErrorMessage(
                          errors?.noteNameEn?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="ManagementName" className="mb-2 required">
                        {intl.formatMessage({ id: "FollowingManagementName" })}
                      </label>
                      <div className="position-relative">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="special fas fa-user-shield"></i>
                            </span>
                          </div>
                          <input
                            defaultValue={orgName}
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="ManagementName"
                            placeholder={intl.formatMessage({
                              id: "FollowingManagementName",
                            })}
                          />
                          <div
                            className="position-absolute translate-middle-y"
                            style={{
                              top: "50%",
                              left: intl.locale == "ar" ? "15px" : "",
                              right: intl.locale == "en" ? "15px" : "",
                            }}
                          >
                            <i
                              className="bi bi-diagram-3 cursor-pointer fs-1 text-muted"
                              onClick={() => setModalHShow(true)}
                            ></i>
                          </div>
                        </div>
                      </div>
                      {DisplayErrorMessage(
                        errors?.organizationHierarchyId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="CardDescription"
                        className="mb-2 required"
                      >
                        {intl.formatMessage({ id: "DescriptionInArabic" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-circle-info"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="CardDescription"
                          placeholder={intl.formatMessage({
                            id: "DescriptionInArabic",
                          })}
                          {...register("description")}
                          onChange={(e) => setSystemDescription(e.target.value)}
                        />
                        {DisplayErrorMessage(
                          errors?.description?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>

                  {/* des in en */}

                    <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="CardDescriptionEn"
                        className="mb-2 required"
                      >
                        {intl.formatMessage({ id: "DescriptionInEn" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-circle-info"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="CardDescriptionEn"
                          placeholder={intl.formatMessage({
                            id: "DescriptionInEn",
                          })}
                          {...register("descriptionEn")}
                          onChange={(e) => setSystemDescriptionInEn(e.target.value)}
                        />
                        {DisplayErrorMessage(
                          errors?.descriptionEn?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="Icon" className="mb-2 required">
                        {intl.formatMessage({ id: "Icon" })}
                      </label>
                      <div className="position-relative">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="special fa-solid fa-icons"></i>
                            </span>
                          </div>
                          <input
                            {...register("icon")}
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="Icon"
                            placeholder={intl.formatMessage({ id: "Icon" })}
                            onChange={(e) => setIcon(e.target.value)}
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
                      </div>
                    </div>
                    {DisplayErrorMessage(
                      errors?.icon?.message as string,
                      intl,
                      intl.locale
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="Color" className="mb-2 required">
                        {intl.formatMessage({ id: "Color" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-palette special"></i>
                          </span>
                        </div>
                        <select
                          {...register("color")}
                          id="Color"
                          className="form-select form-select-solid px-4 py-0 m-0"
                          data-placeholder="اختر"
                          tabIndex={-1}
                          defaultValue={""}
                        >
                          <option disabled value="">
                            {intl.formatMessage({ id: "Color" })}
                          </option>
                          <option value={Color.Red}>
                            {intl.formatMessage({ id: "Red" })}
                          </option>
                          <option value={Color.Green}>
                            {intl.formatMessage({ id: "Green" })}
                          </option>
                          <option value={Color.Yellow}>
                            {intl.formatMessage({ id: "Yellow" })}
                          </option>
                        </select>
                      </div>
                      {DisplayErrorMessage(
                        errors?.color?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>

                  {URL === "/edit-external-component" ? (
                    <></>
                  ) : (
                    <>
                      <div className="col-md-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="CardLink"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "SystemLink" })}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="special fa-solid fa-link"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              id="CardLink"
                              placeholder={intl.formatMessage({
                                id: "SystemLink",
                              })}
                              disabled={URL == "/edit-system"}
                              {...register("url")}
                            />
                            {DisplayErrorMessage(
                              errors?.url?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "ShowSystemAtWorkspace" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                          >
                            <i className="fad fa-eye fs-3"></i>
                          </span>
                        </div>
                        <select
                          className="form-select form-select-solid px-4 py-0 m-0"
                          id="selectOption"
                          value={isSelected}
                          onChange={(e) => setIsSelected(e.target.value)}
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

                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "SubCategory" })}
                      </label>
                      <div className="d-flex w-100">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                          >
                            <i className="fas fa-layer-group fs-3"></i>
                          </span>
                        </div>
                        <Controller
                          name="subsytemMainId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              id="subsytemMainId"
                              className="react-select__container"
                              classNamePrefix="react-select"
                              placeholder={intl.formatMessage({
                                id: "SelectUserName",
                              })}
                              options={categoryOptions}
                              isMulti={true}
                              isClearable={true}
                              onChange={(selectedOption) =>
                                setSelectedCategory(selectedOption)
                              }
                              value={selectedCategory}
                              noOptionsMessage={() =>
                                intl.formatMessage({
                                  id: "NotAvailable",
                                })
                              }
                            />
                          )}
                        />
                      </div>
                      {errorSelectedCategory ? (
                        <>
                          {DisplayErrorMessage(
                            "ThisFelidIsRequired",
                            intl,
                            intl.locale
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="col-6 mb-2 pt-2 pb-3">
                    <label className="required text-gray-600 fw-bold fs-8 mb-1">
                      {intl.formatMessage({ id: "HideFromDigitalServices" })}
                    </label>
                    <div className="d-flex align-items-center gap-4 my-3">
                      <div className="d-flex">
                        <div className="form-check form-check-success form-check-custom form-check-solid form-check-md">
                          <input
                            className="form-check-input widget-9-check xCheckBg"
                            type="radio"
                            name="HideFromDigitalServices"
                            id="Show"
                            value="Show"
                            checked={!isHide}
                            onChange={() => setIsHide(false)}
                          />
                        </div>
                        <label className="form-check-label ms-3" htmlFor="Show">
                          {intl.formatMessage({ id: "ShowSystem" })}
                        </label>
                      </div>
                      <div className="d-flex">
                        <div className="form-check form-check-success form-check-custom form-check-solid form-check-md">
                          <input
                            className="form-check-input widget-9-check xCheckBg"
                            type="radio"
                            name="HideFromDigitalServices"
                            id="Hide"
                            value="Hide"
                            checked={isHide}
                            onChange={() => setIsHide(true)}
                          />
                        </div>
                        <label className="form-check-label ms-3" htmlFor="Hide">
                          {intl.formatMessage({ id: "HideSystem" })}
                        </label>
                      </div>
                    </div>
                  </div>
                  {
                    <>
                      {URL.includes(`edit-sso-system`) && (
                        <>
                          <div className="col-md-6">
                            <div className="mb-2 pt-2 pb-3">
                              <label
                                htmlFor="description"
                                className="form-label px-2  fs-6 text-gray-700 required"
                              >
                                {intl.formatMessage({ id: "SecuritySettings" })}
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="special fa-solid fa-circle-info"></i>
                                  </span>
                                </div>
                                <select
                                  id="identityProvider"
                                  className="form-select form-select-solid px-4 py-0 m-0"
                                  {...register("ssoSecuritySettingId")}
                                  defaultValue={""}
                                >
                                  <option value=""  disabled>
                                    {intl.formatMessage({ id: "Choose" })}
                                  </option>
                                  {SSOSecuritySettings?.items?.map((item: any) => (
                                    <option key={item?.id} value={item?.id}>
                                      {item?.name}
                                    </option>
                                  ))}
                                </select>
                                {DisplayErrorMessage(
                                  errors?.ssoSecuritySettingId?.message as string,
                                  intl,
                                  intl.locale
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  }

                  <div className="col-md-6">
                    <div className="mb-1 py-2 ">
                      <label
                        className="fs-6 fw-bold mb-2 required"
                        htmlFor="SystemStatus"
                      >
                        {intl.formatMessage({ id: "SystemStatus" })}
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
                          {...register("subsytemMainLookupId")}
                        >
                          <option value="" disabled>
                            {intl.formatMessage({ id: "Choose" })}
                          </option>
                          {AllSubSystemMainLookUp?.map((item: Lookup) => (
                            <option key={item?.id} value={item?.id}>
                              {intl.locale === "ar"
                                ? item?.nameAr
                                : item?.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>
                      {DisplayErrorMessage(
                        errors?.subsytemMainLookupId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center my-5">
                    <Link
                      to={
                        exceptionURL
                          ? `/systems-services-settings/systems-classifications/view-system/${exceptionURL}`
                          : URL.includes("edit-external-component")
                            ? "/systems-settings/external-components"
                            : URL.includes("edit-sso-system")
                              ? "/systems-settings/sso-systems"
                              : URL.includes("edit-external-system")
                                ? "/systems-settings/external-systems"
                                : "/systems-settings"
                      }
                      type="reset"
                      className="btn btn-secondary px-15 mx-3"
                      state={{
                        cardId: cardId,
                        cardTitle: cardName,
                        partTitle: partTitle,
                      }}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </Link>
                    {orgId != "" ? (
                      <button
                        type="submit"
                        className="btn btn-primary px-15 mx-3"
                        disabled={isSubmitting}
                      >
                        {intl.formatMessage({ id: "Edit" })}
                      </button>
                    ) : (
                      <div
                        className="btn btn-primary px-15 mx-3"
                        onClick={() => {
                          showSuccessAlert(
                            false,
                            "NameArAndNameEnAlreadyExists",
                            intl
                          );
                        }}
                      >
                        {intl.formatMessage({ id: "Edit" })}
                      </div>
                    )}
                  </div>
                </div>
              </form>
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
        <div className="modal fade" id="Rega_modal_viewallcards_addcard">
          <EditPopup
            handleSubmitEdit={SubmitEditHandler}
            handleCloseEdit={handleCloseEdit}
            showEdit={showEdit}
          />
        </div>
      </div>
    </div>
  );
};

export { EditSystemContent };
