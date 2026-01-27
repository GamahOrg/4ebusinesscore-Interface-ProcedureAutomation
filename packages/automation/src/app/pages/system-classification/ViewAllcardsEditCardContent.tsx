import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { editSubsystemCard } from "../slices/editWorkspaceSlice";
// import { getSubsystemsDropdown } from "../slices/getAllSubsystemSlice";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Select from "react-select";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { getAllSubSystemMainLookUP } from "../../redux/features/getAllSubsytemMainLookUpSlice";
import { getAllSubSystemSettingsMainClassification } from "../../redux/features/getAllSubsytemSettingsMainClassification";
import { Lookup } from "../../models/Lookup";
import { GetWorkSpaceByIdResponse } from "../../models/GetWorkSpaceByIdResponse";
import { ValidationFormsProps, ValidationFormsSchema } from "../../validations/ValidationForms";
import { GetAllTypesWithParent } from "../../redux/features/getAllTypesWithParent";
import { RootState } from "../../redux/store/store";
import { getNoteTypeId } from "../../redux/features/getLookUpsSlice";
import { Color } from "../../enums/response-status";

// import editSubsystemCard from "../../redux/features/Resolver/editResolveSlice";
import { format } from "date-fns";
import { getSubsystemsDropdown } from "../../redux/features/getAllSubsystemSlice";
import { editSubsystemCard } from "../../redux/features/editWorkspaceSlice";
import { ManagementHierarchyPopup } from "./ManagementHierarchyPopup";

interface GetSubSystemSettingProp {
  subSystemSetting: GetWorkSpaceByIdResponse;
  setOrg?: any;
  setIcon?: any;
  setColor?: any;
  setSystemName?: any;
  setSystemDescription?: any;
  setSystemNameEn?: any;
  setSystemDescriptionEn?: any;
}

const ViewAllcardsEditCardContent: FC<GetSubSystemSettingProp> = ({
  setOrg,
  subSystemSetting,
  setIcon,
  setColor,
  setSystemName,
  setSystemDescription,
  setSystemNameEn,
  setSystemDescriptionEn,
}: GetSubSystemSettingProp) => {
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const { id } = useParams();
  const language = intl.locale;
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [errorSelectedCategory, setErrorSelectedCategory] =
    useState<Boolean>(false);
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");
  const [subsystem, setSubsystem] =
    useState<GetWorkSpaceByIdResponse>(subSystemSetting);
  const [isSelected, setIsSelected] = useState<string>("");
  const [isHide, setIsHide] = useState<boolean>(false);
  const [orgName, setOrgName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [URL, setURL] = useState<string>("");
  const [signOn, setSignOn] = useState<string>("no");
  const cardType = location?.state?.cardType;

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ValidationFormsProps>({
    resolver: yupResolver(ValidationFormsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (location?.pathname?.includes("/external-systems")) {
      setURL("/external-systems");
    } else if (location?.pathname?.includes("/external-components")) {
      setURL("/external-components");
    } else if (location?.pathname?.includes("/sso-systems")) {
      setURL("/sso-systems");
    } else if (location?.pathname?.includes("/edit-card")) {
      setURL("/edit-card");
    } else {
      setURL("");
    }
  }, [location?.pathname]);

  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsSelected(selectedOption);
  };
  useEffect(() => {
    dispatch(getSubsystemsDropdown({}) as any);
    dispatch(GetAllTypesWithParent() as any);
    dispatch(getNoteTypeId() as any);
    dispatch(getAllSubSystemSettingsMainClassification({}) as any);
    dispatch(getAllSubSystemMainLookUP({}) as any);
  }, [dispatch]);

  useEffect(() => {
    setSubsystem(subSystemSetting);
  }, [subSystemSetting]);

  let subsystemWithParent = useSelector((state: RootState) => {
    return state?.AllTypesWithParents.items;
  });
  let Subcategories = useSelector((state: RootState) => {
    return state?.subSystemSettingsMainClassification?.items;
  });
  let AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });

  useEffect(() => {
    if (subsystem) {
      setValue("noteNameAr", subsystem?.noteNameAr);
      setValue("noteNameEn", subsystem?.noteNameEn);
      setValue("description", subsystem?.description);
       setValue("descriptionEn", subsystem?.descriptionEn);
      setValue("color", subsystem?.color);
      setValue("icon", subsystem?.icon);
      setValue("url", subsystem?.url);
      setOrgName(subsystem?.orgNameAr);
      setOrgId(subsystem?.organizationHierarchyId);
      setValue("noteTypeId", subsystem?.noteTypeId);
      setValue("parentId", subsystem?.parentId);

      setSelectedComponentId(subsystem?.noteTypeId);
      setSelectedWorkspaceId(subsystem?.parentId);
      setIsSelected(subsystem?.isVisiable ? "yes" : "no");
      setIsHide(!subsystem?.subsystemIsVisiable);
      if (subsystem?.subsytemMainId !== "00000000-0000-0000-0000-000000000000")
        setValue("subsytemMainId", subsystem?.subsytemMainId);
      if (
        subsystem?.subsytemMainLookupId !==
        "00000000-0000-0000-0000-000000000000"
      )
        setSignOn(cardType == 1 ? "yes" : "no");
      if (subsystem?.isSinglSignOn) {
        setValue("identityProvider", subsystem?.identityProvider);
        setValue("clientId", subsystem?.clientId);
        setValue("clientSecret", subsystem?.clientSecret);
      }
      setValue(
        "subsytemMainLookupId",
        subsystem?.subsytemMainLookupId ===
          "00000000-0000-0000-0000-000000000000"
          ? ""
          : subsystem?.subsytemMainLookupId
      );
      setValue("endPoint", subsystem?.endPoint);
      setValue("isIntegerated", subsystem?.isIntegerated ? "yes" : "no");
      setIsIntegrated(subsystem?.isIntegerated as boolean);
    }
  }, [subsystem]);

  useEffect(() => {
    setOrg(orgName);
  }, [orgName]);

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
          ?.filter((option:any) => option !== null);
      setValue("subsytemMainId", subsystem?.subsytemMainIds);
      setSelectedCategory(selectedOptions);
    }
  }, [subsystem, Subcategories]);

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
  const [isIntegrated, setIsIntegrated] = useState(false);

  useEffect(() => {
    setValue("isIntegerated", isIntegrated ? "yes" : "no");
    if (subsystem?.endPoint === "" && isIntegrated === true) {
      showSuccessAlert(
        false,
        "ThisServiceDoesNotContainIntegrationAssociation",
        intl
      );
      setValue("isIntegerated", "no");
      setIsIntegrated(false);
    }
  }, [isIntegrated]);

  const handleIntegrationChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsIntegrated(selectedOption === "yes");
  };

  const SubmitEditHandler = async (formValues: ValidationFormsProps) => {
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
      state: 0,
      visitDate: format(new Date(), "yyyy-MM-dd"),
      noteTypeId: formValues.noteTypeId,
      parentId: selectedWorkspaceId || null,
      isActive: true,
      isVisiable: isSelected == "yes" ? true : false,
      subsytemMainId: selectedCategoryIds,
      subsystemIsVisiable: !isHide,
      subsytemMainLookupId: formValues.subsytemMainLookupId || -1,
      isExternal: URL === "/edit-card" || URL === "" ? false : true,
      isSinglSignOn:
        URL === "/external-components" && cardType === true ? true : false,
      identityProvider:
        URL === "/external-components" && cardType === true
          ? formValues.identityProvider
          : null,
      clientId:
        URL === "/external-components" && cardType === true
          ? formValues.clientId
          : null,
      clientSecret:
        URL === "/external-components" && cardType === true
          ? formValues.clientSecret
          : null,
      isIntegerated: isIntegrated,
      endPoint: formValues.endPoint || subsystem?.endPoint,
    };

    try {
      const result = await dispatch(
        editSubsystemCard({ id: id ?? "", item: body }) as any
      );

      if (
        result?.payload.statusEnum === 1 ||
        result?.payload.message === "WorkSpaceUpdatedSuccessfully"
      ) {
        showSuccessAlert(true, "EditedSuccessfully", intl, () => {
          navigate(-1);
        });
      } else if (
        result.payload.message ==
        '["NameEn is already exist","NameAr is already exist","Type is Invalid"]'
      ) {
        showSuccessAlert(
          false,
          "CardNameArEnIsAlreadyExistOrTypeInvalid",
          intl
        );
      } else if (result?.payload?.message == '["NameEn is already exist"]') {
        showSuccessAlert(false, "CardNameEnIsAlreadyExist", intl);
      } else if (result?.payload?.message == '["NameAr is already exist"]') {
        showSuccessAlert(false, "CardNameArIsAlreadyExist", intl);
      } else if (
        result.payload.message ==
        '["NameEn is already exist","NameAr is already exist"]'
      ) {
        showSuccessAlert(false, "CardNameArEnIsAlreadyExist", intl);
      } else if (result.payload.message == '["Type is Invalid"]') {
        showSuccessAlert(false, "YouMustSelectTheMainSystem", intl);
      } else {
        console.error("Error:", result.payload.message);
        showSuccessAlert(false, "AnErrorOccured", intl);
      }
    } catch (error) {
      console.error("Error:", error);
      showSuccessAlert(false, "AnErrorOccured", intl);
    }
  };

  useEffect(() => {
    setSystemName(subsystem?.noteNameAr)
    setSystemNameEn(subsystem?.noteNameEn)
    setColor(subsystem?.color);
    setIcon(subsystem?.icon);
    setSystemDescription(subsystem?.description);
    setSystemDescriptionEn(subsystem?.descriptionEn);
  }, [subsystem]);

  const handleComponentChange = (event: any) => {
    setSelectedComponentId(event.target.value);
  };

  const handleWorkspaceChange = (event: any) => {
    setSelectedWorkspaceId(event.target.value);
  };
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
                  <h3>{intl.formatMessage({ id: "EditCard" })}</h3>
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })}
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit(SubmitEditHandler)}>
                <div className="row gy-5 p-3">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="CardName"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "CardNameInArabic" })}
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
                          id="CardName"
                          placeholder={intl.formatMessage({ id: "CardName" })}
                          {...register("noteNameAr")}
                          onChange={(e) => setSystemName(e.target.value)}
                        />
                      </div>
                      {DisplayErrorMessage(
                        errors?.noteNameAr?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="CardName"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "CardNameInEnglish" })}
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
                          id="CardName"
                          placeholder={intl.formatMessage({ id: "CardName" })}
                          {...register("noteNameEn")}
                          onChange={(e) => setSystemNameEn(e.target.value)}
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
                      <label
                        htmlFor="ManagementName"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "ManagementName" })}
                      </label>
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
                            paddingRight: intl.locale == "en" ? "2.75rem" : "",
                          }}
                          type="text"
                          className="form-control"
                          id="ManagementName"
                          placeholder={intl.formatMessage({
                            id: "ManagementName",
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
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="CardDescription"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "CardDescriptionInAr" })}
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
                            id: "CardDescriptionInAr",
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
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "CardDescriptionInEn" })}
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
                            id: "CardDescriptionInEn",
                          })}
                          {...register("descriptionEn")}
                          onChange={(e) => setSystemDescriptionEn(e.target.value)}
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
                      <label
                        htmlFor="Icon"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
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
                            onChange={(e) => setIcon(e.target.value)}
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="Icon"
                            placeholder={intl.formatMessage({ id: "Icon" })}
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
                      <label
                        htmlFor="Color"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
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
                          onChange={(e) => setColor(e.target.value)}
                          id="Color"
                          className="form-select form-select-solid px-4 py-0 m-0"
                          data-placeholder="اختر"
                          tabIndex={-1}
                          defaultValue=""
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
                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="noteTypeId"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "Type" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-bezier-curve special"></i>
                          </span>
                        </div>
                        <select
                          id="noteTypeId"
                          className="form-select form-select-solid px-4 py-0 m-0"
                          data-placeholder="اختر"
                          tabIndex={-1}
                          {...register("noteTypeId")}
                          value={selectedComponentId}
                          onChange={handleComponentChange}
                        >
                          {subsystemWithParent?.map((ele:any) => (
                            <option value={ele?.id} key={ele?.id}>
                              {ele.nameAr}
                            </option>
                          ))}
                        </select>
                      </div>
                      {DisplayErrorMessage(
                        errors?.noteTypeId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="CardLink"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "CardLink" })}
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
                          placeholder={intl.formatMessage({ id: "CardLink" })}
                          disabled={URL == "/edit-card"}
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
                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="MainSystem"
                        className="form-label px-2  fs-6 text-gray-700 required"
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                        }}
                      >
                        {intl.formatMessage({ id: "MainSystem" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-code-branch special"></i>
                          </span>
                        </div>
                        <select
                          {...register("parentId")}
                          id="MainSystem"
                          className="form-select form-select-solid px-4 py-0 m-0"
                          data-placeholder="اختر"
                          tabIndex={-1}
                          value={selectedWorkspaceId}
                          onChange={handleWorkspaceChange}
                        >
                          <option disabled value="">
                            {intl.formatMessage({ id: "MainSystem" })}
                          </option>
                          {subsystemWithParent
                            .find(
                              (component:any) =>
                                component.id === selectedComponentId
                            )
                            ?.workspaces?.map((workspace:any) => (
                              <option key={workspace.id} value={workspace.id}>
                                {workspace.noteNameAr}
                              </option>
                            ))}
                        </select>
                      </div>
                      {DisplayErrorMessage(
                        errors?.parentId?.message as string,
                        intl,
                        intl.locale
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "ShowServiceAtWorkspace" })}
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

                  <div className="col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2 fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "SubCategory" })}
                      </label>
                      <div className="d-flex w-100">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
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
                            "ThisFelidIsRequired" as string,
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
                          {intl.formatMessage({ id: "ShowCard" })}
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
                          {intl.formatMessage({ id: "HideCard" })}
                        </label>
                      </div>
                    </div>
                  </div>
                  {URL == "/edit-card" ? (
                    <>
                      <div className="col-6">
                        <div className="mb-1 py-2 ">
                          <label className="form-label px-2  fs-6 text-gray-700 required">
                            {intl.formatMessage({ id: "IntegrationAbility" })}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="bi bi-gear-fill fs-3"></i>
                              </span>
                            </div>
                            <select
                              className="form-select form-select-solid px-4 py-0 m-0"
                              id="selectOption"
                              value={isIntegrated ? "yes" : "no"}
                              onChange={handleIntegrationChange}
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
                    </>
                  ) : (
                    <></>
                  )}

                  {cardType === true ? (
                    <>
                      <div className="col-md-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="description"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "IdentityProvider" })}
                            {language === "ar" ? (
                              <> (Identity Provider)</>
                            ) : (
                              <></>
                            )}
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
                              id="identityProvider"
                              placeholder={intl.formatMessage({
                                id: "IdentityProvider",
                              })}
                              {...register("identityProvider")}
                            />
                            {DisplayErrorMessage(
                              errors?.identityProvider?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="ClientId"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "ClientId" })}
                            {language === "ar" ? <> (Client Id)</> : <></>}
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
                              id="ClientId"
                              placeholder={intl.formatMessage({
                                id: "ClientId",
                              })}
                              {...register("clientId")}
                            />
                            {DisplayErrorMessage(
                              errors?.clientId?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="ClientSecret"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "ClientSecret" })}
                            {language === "ar" ? <> (Client Secret)</> : <></>}
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
                              id="ClientSecret"
                              placeholder={intl.formatMessage({
                                id: "ClientSecret",
                              })}
                              {...register("clientSecret")}
                            />
                            {DisplayErrorMessage(
                              errors?.clientSecret?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="col-md-6">
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
                          {...register("subsytemMainLookupId")}
                          defaultValue=""
                        >
                          <option value="">
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

                  {URL == "/edit-card" ? (
                    <>
                      <div className="col-12 mt-2">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            htmlFor="CardLink"
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({ id: "EndpointLink" })}
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
                              id="EndpointLink"
                              placeholder={intl.formatMessage({
                                id: "EndpointLink",
                              })}
                              {...register("endPoint")}
                            />
                            {DisplayErrorMessage(
                              errors?.endPoint?.message as string,
                              intl,
                              intl.locale
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="d-flex justify-content-center my-5">
                    <span
                      onClick={() => navigate(-1)}
                      className="btn btn-secondary px-15 mx-3"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </span>
                    {orgName != "" ? (
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
                            "YouMustSelectTheDepartment",
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
      </div>
    </div>
  );
};

export { ViewAllcardsEditCardContent };
