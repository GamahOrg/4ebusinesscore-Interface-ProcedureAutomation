import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showSuccessAlert } from "@4eplatform/shared/index";
import { useLocation } from "react-router";
// import { getAllSubSystemMainLookUP } from "../slices/getAllSubsytemMainLookUpSlice";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { AppDispatch, RootState } from "../../redux/store/store";
import { AddEditSystemClassificationsProps, AddEditSystemClassificationsSchema } from "../../validations/AddEditSystemClassifications";
import { addSubsystemSettingsMainClassification } from "../../redux/features/subsytemSettingsMainClassification";
import { getAllSubSystemMainLookUP } from "../../redux/features/getAllSubsytemMainLookUpSlice";
import { Lookup } from "../../models/Lookup";

const AddSystemsClassificationsContent = ({
  setOrg,
  setIcon,
  setColor,
  setSystemName,
  setSystemDescription,
}: any) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const intl = useIntl();
  let language = intl.locale;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddEditSystemClassificationsProps>({
    resolver: yupResolver(AddEditSystemClassificationsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  let dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  let location = useLocation();
  let cardId = location?.state?.cardId;
  let cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  const [isHide, setIsHide] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllSubSystemMainLookUP({}));
  }, []);

  let AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });

  const Addworkspace = async (
    formValues: AddEditSystemClassificationsProps
  ) => {
    let body = {
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
        addSubsystemSettingsMainClassification(body) as any
      );

      if (result?.payload.statusEnum === 1) {
        showSuccessAlert(true, "AddedSuccessfully", intl);
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

  let formValues = watch();
  useEffect(() => {
    setSystemName(language == "ar" ? formValues?.nameAr : formValues?.nameEn);
  }, [formValues]);

  return (
    <div id="kt_content_container">
      <div id="kt_content">
        <div className="card card-xl-stretch card-body">
          <div className="card-header py-5 mb-5">
            <div className="py-2">
              <h3>{intl.formatMessage({ id: "AddANewClassification" })}</h3>
              <span className="text-gray-600">
                {intl.formatMessage({ id: "PleaseEnterTheData" })}
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit(Addworkspace)}>
            <div className="row gy-5 p-3" style={{ textAlign: "start" }}>
              <div className="col-md-6">
                <div className="mb-4">
                  <label htmlFor="nameAr" className="mb-2 mx-3 required">
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
                      id="nameAr"
                      placeholder={intl.formatMessage({
                        id: "ClassificationName",
                      })}
                      {...register("nameAr")}
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
                  <label htmlFor="nameEn" className="mb-2 mx-3  required">
                    {intl.formatMessage({ id: "ClassificationNameInEnglish" })}
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
                      id="nameEn"
                      placeholder={intl.formatMessage({
                        id: "ClassificationName",
                      })}
                      {...register("nameEn")}
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
                      defaultValue={0}
                    >
                      <option value={0}>
                        {intl.formatMessage({ id: "Red" })}
                      </option>
                      <option value={1}>
                        {intl.formatMessage({ id: "Green" })}
                      </option>
                      <option value={2}>
                        {intl.formatMessage({ id: "Yellow" })}
                      </option>
                      <option value={3}>
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
                      defaultValue=""
                    >
                      <option value="" disabled>
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
                      onChange={() => setIsHide(true)}
                    />
                  </div>
                  <label className="form-check-label ms-3" htmlFor="Hide">
                    {intl.formatMessage({ id: "HideClassification" })}
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-center my-5 mx-2">
                <Link
                  to={`/systems-services-settings/systems-classifications`}
                  type="reset"
                  className="btn btn-secondary px-15 me-5"
                  state={{
                    cardId: cardId,
                    cardTitle: cardName,
                    partTitle: partTitle,
                  }}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </Link>

                <button type="submit" className="btn btn-success px-15 mx-2">
                  {intl.formatMessage({ id: "Add" })}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className="modal fade"
        id="Rega_modal_viewallcards_addcard"
        aria-hidden="true"
      >
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export { AddSystemsClassificationsContent };
