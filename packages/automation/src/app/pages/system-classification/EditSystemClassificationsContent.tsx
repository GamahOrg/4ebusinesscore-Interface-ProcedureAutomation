import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { AddEditSystemClassificationsProps, AddEditSystemClassificationsSchema } from "../../validations/AddEditSystemClassifications";
import { AppDispatch, RootState } from "../../redux/store/store";
import SubSystemClassification from "../../models/SubSystemClassification";
import { Lookup } from "../../models/Lookup";
import { editSubsystemSettingsMainClassification } from "../../redux/features/subsytemSettingsMainClassification";
import { getAllSubSystemMainLookUP } from "../../redux/features/getAllSubsytemMainLookUpSlice";
import { EditPopup } from "./EditPopup";

interface EditSubSystemClassificationSettingProp {
  subSystemSetting: SubSystemClassification;
  setColor?: any;
  setSystemName?: any;
}

const EditSystemClassificationsContent: FC<
  EditSubSystemClassificationSettingProp
> = ({
  subSystemSetting,
  setColor,
  setSystemName,
}: EditSubSystemClassificationSettingProp) => {
  const [showEdit, setShowEdit] = useState(false);
  const [subsystem, setSubsystem] =
    useState<SubSystemClassification>(subSystemSetting);
  const handleCloseEdit = () => setShowEdit(false);
  const [isHide, setIsHide] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();
  let { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  let cardId = location?.state?.cardId;
  let cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  useEffect(() => {
    setSubsystem(subSystemSetting);
  }, [subSystemSetting]);

  useEffect(() => {
    setValue("nameAr", subsystem.nameAr);
    setValue("nameEn", subsystem.nameEn);
    setValue("description", subsystem.description);
    setValue("descriptionEn", subsystem.descriptionEn);
    setValue("icon", subsystem.icon);
    setValue("subsytemMainLookupId", subsystem?.subsytemMainLookupId);
    setValue("color", subsystem?.color?.toString());
    setIsHide(subsystem?.isHide);
  }, [subsystem]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddEditSystemClassificationsProps>({
    resolver: yupResolver(AddEditSystemClassificationsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    dispatch(getAllSubSystemMainLookUP({}));
  }, []);

  let AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });

  const SubmitEditHandler = async (
    formValues: AddEditSystemClassificationsProps
  ) => {
    let body = {
      id: id,
      NameAr: formValues.nameAr,
      NameEn: formValues.nameEn,
      description: formValues.description,
      descriptionEn: formValues.descriptionEn,
      icon: formValues.icon,
      subsytemMainLookupId: formValues.subsytemMainLookupId,
      color: formValues.color,
      isHide,
    };
    try {
      const result = await dispatch(
        editSubsystemSettingsMainClassification({
          id,
          body,
        }) as any
      );

      if (result?.payload.statusEnum === 1) {
        showSuccessAlert(true, "EditedSuccessfully", intl);
        navigate(`/systems-services-settings/systems-classifications`, {
          state: {
            cardId: cardId,
            cardTitle: cardName,
            partTitle: partTitle,
          },
        });
      } else if (
        result?.payload?.message ==
        '["NameEn is already exist","NameAr is already exist"]'
      )
        showSuccessAlert(false, "NameArAndNameEnAlreadyExists", intl);
      else if (result?.payload?.message == '["NameAr is already exist"]')
        showSuccessAlert(false, "NameArIsAlreadyExists", intl);
      else if (result?.payload?.message == '["NameEn is already exist"]')
        showSuccessAlert(false, "NameEnIsAlreadyExists", intl);
      else showSuccessAlert(false, result?.payload?.message, intl);
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  let language = intl.locale;
  useEffect(() => {
    setSystemName(language == "ar" ? subsystem?.nameAr : subsystem?.nameEn);
  }, [subsystem]);

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
                  <h3>{intl.formatMessage({ id: "EditAClassification" })}</h3>
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
                        {intl.formatMessage({ id: "ClassificationNameInArabic" })}
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
                          {...register("nameAr")}
                          onChange={(e) => setSystemName(e.target.value)}
                        />
                        {DisplayErrorMessage(
                          errors?.nameAr?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="SystemName" className="mb-2 required">
                        {intl.formatMessage({ id: "AddCategoryEN" })}
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
                          {...register("nameEn")}
                          onChange={(e) => setSystemName(e.target.value)}
                        />
                        {DisplayErrorMessage(
                          errors?.nameEn?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="SystemDescriptionAr"
                        className="mb-2 required"
                      >
                        {intl.formatMessage({ id: "AddDescriptionAr" })}
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
                          id="SystemDescriptionAr"
                          placeholder={intl.formatMessage({
                            id: "SystemDescription",
                          })}
                          {...register("description")}
                          onChange={(e) => setSystemName(e.target.value)}
                        />
                        {DisplayErrorMessage(
                          errors?.description?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="SystemDescriptionEn"
                        className="mb-2 required"
                      >
                        {intl.formatMessage({ id: "AddDescriptionEn" })}
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
                          id="SystemDescriptionEn"
                          placeholder={intl.formatMessage({
                            id: "SystemDescription",
                          })}
                          {...register("descriptionEn")}
                          onChange={(e) => setSystemName(e.target.value)}
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
                      <label htmlFor="iconSystem" className="mb-2 required">
                        {intl.formatMessage({ id: "Icon" })}
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
                          id="iconSystem"
                          placeholder={intl.formatMessage({ id: "Icon" })}
                          {...register("icon")}
                          onChange={(e) => setSystemName(e.target.value)}
                        />
                        <div className="h-110 d-flex" role="button">
                          <a
                            className="input-group-text"
                            href="https://fontawesome.com/v5/search?q=file&o=r&s=duotone"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="bi bi-link fa-lg special"></i>
                          </a>
                        </div>
                        {DisplayErrorMessage(
                          errors?.icon?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-4">
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
                          data-placeholder={intl.formatMessage({ id: "Color" })}
                          tabIndex={-1}
                          // aria-hidden="true"
                          {...register("color")}
                        >
                          <option value={"0"}>
                            {intl.formatMessage({ id: "Red" })}
                          </option>
                          <option value={"1"}>
                            {intl.formatMessage({ id: "Green" })}
                          </option>
                          <option value={"2"}>
                            {intl.formatMessage({ id: "Yellow" })}
                          </option>
                          <option value={"3"}>
                            {intl.formatMessage({ id: "Blue" })}
                          </option>
                        </select>
                        {DisplayErrorMessage(
                          errors?.color?.message as string,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </div>
                  </div>

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

                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label className="required text-gray-600 fw-bold fs-8 mb-1">
                      {intl.formatMessage({ id: "HideFromDigitalServices" })}
                    </label>
                    <div className="d-flex align-items-center my-3">
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
                        {intl.formatMessage({ id: "ShowClassification" })}
                      </label>
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
                        {intl.formatMessage({ id: "HideClassification" })}
                      </label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center my-5">
                    <Link
                      to={`/systems-services-settings/systems-classifications`}
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

                    <button
                      type="submit"
                      className="btn btn-primary px-15 mx-3"
                    >
                      {intl.formatMessage({ id: "Edit" })}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="Rega_modal_viewallcards_addcard"
          aria-hidden="true"
        >
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

export { EditSystemClassificationsContent };
