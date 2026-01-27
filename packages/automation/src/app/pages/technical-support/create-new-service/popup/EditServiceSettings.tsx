import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ManagementHierarchyPopup } from "./ManagementHierarchyPopup";
import Select from "react-select";
import SubSystemSettingsModel from "../../../../models/SubSystemSettingsModel";
import { Lookup } from "../../../../models/Lookup";


type EditServiceSettingsProps = {
  register: any;
  DisplayErrorMessage: any;
  errors: any;
  isSelected: any;
  setIsSelected: any;
  orgName: any;
  orgMembers: any;
  setValue: any;
  selectedAdminOption: any;
  setSelectedAdminOption: any;
  AllSubSystemMainClassification: any;
  AllSubSystemMainLookUp: any;
  orgId: any;
  setOrgId: any;
  setOrgName: any;
  setSelectedAdmins?:any;
  selectedAdmins?:any;
  trigger?:any;
  setIsIntegrated?: any;
  isIntegrated?: any;
  subsytemSettingsByMainClassificationId?:any
};
export const EditServiceSettings: FC<EditServiceSettingsProps> = ({
  register,
  DisplayErrorMessage,
  errors,
  isSelected,
  setIsSelected,
  orgName,
  orgMembers,
  setValue,
  selectedAdminOption,
  setSelectedAdminOption,
  AllSubSystemMainClassification,
  AllSubSystemMainLookUp,
  orgId,
  setOrgId,
  setOrgName,
  selectedAdmins,
  setSelectedAdmins,
  trigger,
  isIntegrated,
  setIsIntegrated,
  subsytemSettingsByMainClassificationId
}) => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const handleIntegrationChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsIntegrated(selectedOption === "yes");
  };
  const handleSelectChange = (event: any) => {
    const selectedOption = event.target.value;
    setIsSelected(selectedOption);
  };
  useEffect(()=>{
    if(orgId){
      setValue("admins",Array.isArray(selectedAdmins) && selectedAdmins?.map((admin:any)=>{return admin?.value}))
      trigger("admins")
    }

  },[selectedAdmins,orgId])

  // const changeAdminSelect = (selectedOption: any) => {
  //   setValue("admin", selectedOption?.value);
  //   const defaultAdmin = orgMembers.find(
  //     (member: any) => member?.memberId === selectedOption?.value
  //   );
  //   setSelectedAdminOption(
  //     defaultAdmin
  //       ? { value: selectedOption?.value, label: selectedOption?.label }
  //       : null
  //   );
  // };
  return (
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
              />
              {DisplayErrorMessage(errors?.name?.message, intl ,intl.locale)}
            </div>
          </div>
        </div>

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
              />
              {DisplayErrorMessage(errors?.nameEn?.message, intl ,intl.locale)}
            </div>
          </div>
        </div>


        <div className="col-12 col-lg-6">
          <div className="mb-1 py-2 ">
            <label
              className="form-label px-2  fs-6 text-gray-700 required"
              style={{
                textAlign: intl.locale == "ar" ? "right" : "left",
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
                placeholder={intl.formatMessage({ id: "Choose" })}
                classNamePrefix="react-select"
                value={selectedAdmins}
                onChange={(selectedOption: any) =>
                  setSelectedAdmins(selectedOption)
                }
                isMulti
                isClearable={true}
              />
            </div>
            {DisplayErrorMessage(errors?.admins?.message, intl ,intl.locale)}
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="mb-1 py-2 ">
            <label className="form-label px-2  fs-6 text-gray-700 required">
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
              {DisplayErrorMessage(errors?.teamName?.message, intl ,intl.locale)}
            </div>
          </div>
        </div>


        <div className="col-12 col-lg-4">
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
                <option value="yes">{intl.formatMessage({ id: "YES" })}</option>
                <option value="no">{intl.formatMessage({ id: "NO" })}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
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

            {DisplayErrorMessage(errors?.icon?.message, intl ,intl.locale)}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-4">
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
              {/* <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "Color",
                        })}
                        {...register("color")}
                      /> */}
              <select
                id="color"
                className="form-select form-select-solid px-4 py-0 m-0"
                data-placeholder={intl.formatMessage({ id: "Color" })}
                tabIndex={-1}
                {...register("color")}
              >
                <option disabled selected value="">
                  {intl.formatMessage({ id: "Color" })}
                </option>
                <option value={intl.formatMessage({ id: "Red" })}>
                  {intl.formatMessage({ id: "Red" })}
                </option>
                <option value={intl.formatMessage({ id: "Green" })}>
                  {intl.formatMessage({ id: "Green" })}
                </option>
                <option value={intl.formatMessage({ id: "Yellow" })}>
                  {intl.formatMessage({ id: "Yellow" })}
                </option>
                <option value={intl.formatMessage({ id: "Blue" })}>
                  {intl.formatMessage({ id: "Blue" })}
                </option>
              </select>
              {DisplayErrorMessage(errors?.color?.message, intl ,intl.locale)}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="mb-1 py-2 ">
            <label className="fs-6 fw-bold mb-2 required" htmlFor="ServiceType">
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
                <option value={1}>{intl.formatMessage({ id: "All" })}</option>
                <option value={2}>
                  {intl.formatMessage({ id: "ServiceReqest" })}
                </option>
                <option value={3}>
                  {intl.formatMessage({ id: "ReportAService" })}
                </option>
              </select>
            </div>
            {DisplayErrorMessage(errors?.serviceType?.message, intl ,intl.locale)}
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="mb-1 py-2 ">
            <label className="fs-6 fw-bold mb-2 required" htmlFor="SubCategory">
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
                {AllSubSystemMainClassification?.map((item: Lookup) => (
                  <option key={item?.id} value={item?.id}>
                    {intl.locale === "ar" ? item?.nameAr : item?.nameEn}
                  </option>
                ))}
              </select>
            </div>
            {DisplayErrorMessage(
              errors?.subSystemMainClassificationId?.message,
              intl ,intl.locale
            )}
          </div>
        </div>
        <div className="col-12 col-lg-4">
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
                <option value="yes">{intl.formatMessage({ id: "YES" })}</option>
                <option value="no">{intl.formatMessage({ id: "NO" })}</option>
              </select>
            </div>
          </div>
        </div>
        {isIntegrated ? (
          <>
            <div className="col-4">
              <div className="mb-1 py-2 ">
                <label
                  className="fs-6 fw-bold mb-2 required"
                  htmlFor="IntegrationSystem"
                >
                  {intl.formatMessage({ id: "IntegrationSystemm" })}{" "}
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-layer-group special"></i>
                    </span>
                  </div>
                  <select
                    id="IntegrationSystem"
                    className="form-select form-select-solid px-4 py-0 m-0"
                    {...register("subSystemId")}
                  >
                    <option value="" selected disabled>
                      {intl.formatMessage({ id: "Choose" })}
                    </option>
                    {subsytemSettingsByMainClassificationId?.map((item: SubSystemSettingsModel) => (
                      <option key={item?.id} value={item?.id}>
                        {intl.locale === "ar" ? item?.noteNameAr : item?.noteNameEn}
                      </option>
                    ))}
                  </select>
                </div>
                {DisplayErrorMessage(
                  errors?.subSystemId?.message,
                  intl,
                  intl.locale
                )}
              </div>
            </div>
            <div className="col-4"></div>
          </>
        ) : (
          <>
            <div className="col-8"></div>
          </>
        )}
        <div className="col-6">
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
            {DisplayErrorMessage(errors?.kpi?.message, intl ,intl.locale)}
          </div>
        </div>
        <div className="col-6">
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
                {...register("subSystemMainClassificationLookupId")}
              >
                <option value="" selected disabled>
                  {intl.formatMessage({ id: "Choose" })}
                </option>
                {AllSubSystemMainLookUp?.map((item: Lookup) => (
                  <option key={item?.id} value={item?.id}>
                    {intl.locale === "ar" ? item?.nameAr : item?.nameEn}
                  </option>
                ))}
              </select>
            </div>
            {DisplayErrorMessage(
              errors?.subSystemMainClassificationLookupId?.message,
              intl ,intl.locale
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <label htmlFor="reason" className="form-label px-2 fontSz-6 required">
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
          ></textarea>
          {DisplayErrorMessage(errors?.description?.message, intl ,intl.locale)}
        </div>
      </div>

          <div className="row">
        <div className="col-lg-12">
          <label htmlFor="reason" className="form-label px-2 fontSz-6 required">
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
          ></textarea>
          {DisplayErrorMessage(errors?.descriptionEn?.message, intl ,intl.locale)}
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
          EditClassification={true}
        />
      </div>
    </div>
  );
};
