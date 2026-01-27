import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap/";
import { useDispatch, useSelector } from "react-redux";
import { addMainClassification } from "../../../../redux/features/mainClassification/mainClassificationSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  mainClassificationProps,
  mainClassificationSchema,
} from "../../../../validations/MainClassificationValidation";
import { RootState } from "../../../../redux/store/store";
import { fetchOrgMembers } from "../../../../redux/features/mainClassification/GetAllMembersOrgSlice";
import { fetchElectronicServices } from "../../../../redux/features/mainClassification/electronic-services";
import { AppDispatch } from "@4eplatform/connect/src/app/store/store";
import { ServiceSettings } from "./ServiceSettings";
import { DigitalServicesSettings } from "./DigitalServicesSettings";
import { showSuccessAlert } from "@4eplatform/shared/index";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { getClassification } from "../../../../redux/features/mainClassification/classificationsSlice";
import { useParams } from "react-router-dom";
import { getAllSubSystemMainLookUP } from "../../../../redux/features/getAllSubsytemMainLookUpSlice";
import { getAllSubSystemSettingsMainClassification, getSubsytemSettingsByMainClassificationId } from "../../../../redux/features/getAllSubsytemSettingsMainClassification";

type ButtonTypes = {
  id: number;
  name: string;
};
type PopupProps = {
  show?: any;
  handleClose?: any;
  setPageIndex?: any;
  pageIndex?: any;
};

const AddBasicClassificationPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  setPageIndex,
  pageIndex,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedElectronicServices, setSelectedElectronicServices] =
    useState<any>([]);
  const [selectedAdminOption, setSelectedAdminOption] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [orgId, setOrgId] = useState<string>("");
  const [orgName, setOrgName] = useState<string>("");
  const [isSelected, setIsSelected] = useState(false);
  const [isIntegrated, setIsIntegrated] = useState(false);
  const [selectedAdmins, setSelectedAdmins] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const { systemId } = useParams()

  // const [screenSettings, setScreenSettings] = useState<any>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<mainClassificationProps>({
    resolver: yupResolver(mainClassificationSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });

  const buttons: ButtonTypes[] = [
    {
      id: 1,
      name: intl.formatMessage({
        id: "ServiceSettings",
      }),
    },
      ...(!systemId
    ? [
    {
      id: 2,
      name: intl.formatMessage({ id: "DigitalServicesSettings" }),
    },
      ]
    : []),
    // {
    //   id: 3,
    //   name: intl.formatMessage({ id: "ScreensSettings" }),
    // },
  ];

  let ElectronicServices = useSelector((state: RootState) => {
    return state?.electronicServices?.data?.electronicServices;
  });

  const [activeButton, setActiveButton] = useState<ButtonTypes>(buttons[0]);

  const handleButtonClick = (button: ButtonTypes) => {
    setActiveButton(button);
  };

  const AllSubSystemMainClassification = useSelector((state: RootState) => {
    return state?.subSystemSettingsMainClassification?.items;
  });

  const AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });

  const orgMembers = useSelector((state: RootState) => {
    return state?.orgMembers?.data;
  });

  // const orgs = useSelector((state: RootState) => {
  //   return state?.orgsSlice?.data;
  // });

  useEffect(() => {
    setSelectedElectronicServices(ElectronicServices);
  }, [ElectronicServices]);

  useEffect(() => {
    dispatch(fetchElectronicServices({}) as any);
  }, []);

  useEffect(() => {
    // dispatch(fetchOrgs({}) as any);
    getAllSubSystemMainClassification();
    dispatch(getAllSubSystemMainLookUP({}));
  }, []);

  // useEffect(() => {
  //   setValue(
  //     "admin",
  //     orgs?.find((item: any) => {
  //       return item?.id == orgId;
  //     })?.managerId as string
  //   );
  // }, [orgId]);

  useEffect(() => {
    if (orgId) {
      const params = {
        pageSize: "10000",
        pageNumber: "1",
      };

      dispatch(fetchOrgMembers({ id: orgId, myparams: params }));
    }
  }, [orgId, dispatch]);

  useEffect(() => {
    if (!show) {
      setOrgId("");
      setOrgName("");
      setSelectedAdminOption("");
    }
  }, [show]);

  const getAllSubSystemMainClassification = async () => {
    await dispatch(getAllSubSystemSettingsMainClassification({}));
  };

  useEffect(() => {
    setValue("isIntegrated", isIntegrated ? "yes" : "no")
    if (isIntegrated == false) {
      setValue("subSystemId", "")
      trigger("subSystemId")
    }
  }, [isIntegrated])
  let formValues = watch()
  let [subsytemSettingsByMainClassificationId, setSubsytemSettingsByMainClassificationId] = useState<any>([])
  useEffect(() => {
    if (formValues.subSystemMainClassificationId) {
      dispatch(getSubsytemSettingsByMainClassificationId(formValues.subSystemMainClassificationId)).then((res: any) => {
        setSubsytemSettingsByMainClassificationId(res?.payload?.result)
      })
    }
  }, [formValues.subSystemMainClassificationId])
  const AddMainClassification = async (formValues: mainClassificationProps) => {
    const emptyFields = selectedElectronicServices.filter(
      (selectedService: any) =>
        !selectedService.name || !selectedService.description
    );
    if (emptyFields?.length !== 0) {
      showSuccessAlert(false, "YouMustFillEservice", intl);
    } else {
      let body = {
        name: formValues.name,
        orgId: orgId,
        admins: formValues?.admins,
        icon: formValues.icon,
        color: formValues.color,
        description: formValues.description,
        serviceType: formValues.serviceType,
        kpi: formValues.kpi || "",
        teamName: formValues.teamName || "",
        isShowInHomePage: isSelected,
        electronicsServices: selectedElectronicServices,
        subSystemMainClassificationId: formValues.subSystemMainClassificationId,
        subSystemId: formValues?.subSystemId,
        subSystemMainClassificationLookupId:
        formValues.subSystemMainClassificationLookupId,
        nameEn: formValues.nameEn,
        descriptionEn: formValues.descriptionEn,
      };
      let mappedBody = Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== "")
      );
      dispatch(addMainClassification(mappedBody as any) as any).then((res: any) => {
        setPageIndex(1);
        return setMessage(res?.payload?.message);
      });
    }
  };

  useEffect(() => {
    if (message == "Main classification added successfully") {
      showSuccessAlert(true, "AddedSuccessfully", intl);
      dispatch(
        getClassification({ pageNumber: pageIndex, pageSize: pageSize, ...(systemId && { subSystemId: systemId }), }) as any
      );
      reset();
      setSelectedElectronicServices(ElectronicServices);
      handleClose();
      setOrgId("");
      setActiveButton(buttons[0])
      setOrgName("");
      setSelectedAdminOption("");
      setMessage("");
      setSelectedAdmins([]);
      setIsIntegrated(false)
    } else if (
      message == '["MainClassificationNameIsAlreadyExists"]' ||
      message == '["MainClassificationNameIsAlreadyExists"]' ||
      message == "MainClassificationNameIsAlreadyExists"
    ) {
      showSuccessAlert(false, "MainClassificationNameIsAlreadyExists", intl);
      setMessage("");
    }
    return () => { };
  }, [message]);

  // useEffect(() => {
  //   const adminId = getValues("admin");
  //   if (adminId && orgMembers && orgMembers.length > 0) {
  //     const defaultAdmin = orgMembers.find(
  //       (member: any) => member?.memberId === getValues("admin")
  //     );
  //     setSelectedAdminOption(
  //       defaultAdmin
  //         ? { value: defaultAdmin?.memberId, label: defaultAdmin?.memberName }
  //         : null
  //     );
  //   }
  // }, [orgMembers]);

  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return (
          <ServiceSettings
            register={register}
            DisplayErrorMessage={DisplayErrorMessage}
            errors={errors}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            isIntegrated={isIntegrated}
            setIsIntegrated={setIsIntegrated}
            subsytemSettingsByMainClassificationId={subsytemSettingsByMainClassificationId}
            orgName={orgName}
            setOrgName={setOrgName}
            orgMembers={orgMembers}
            setValue={setValue}
            selectedAdminOption={selectedAdminOption}
            setSelectedAdminOption={setSelectedAdminOption}
            AllSubSystemMainClassification={AllSubSystemMainClassification}
            AllSubSystemMainLookUp={AllSubSystemMainLookUp}
            orgId={orgId}
            setOrgId={setOrgId}
            trigger={trigger}
            formValues={watch()}
            setSelectedAdmins={setSelectedAdmins}
            selectedAdmins={selectedAdmins}
          />
        );
      case 2:
        return (
          <DigitalServicesSettings
            ElectronicServices={ElectronicServices}
            setSelectedElectronicServices={setSelectedElectronicServices}
            selectedElectronicServices={selectedElectronicServices}
          />
        );
      // case 3:
      //   return (
      //     <ThirdSettingsTab
      //     setScreenSettings={setScreenSettings}
      //     />
      //   );
    }
  };

  return (
    <>
      <Modal
        size="xl"
        // aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="pt-20"
        style={{ zIndex: "10000" }}
        backdrop={false}
         keyboard={false}
        enforceFocus={false}
      >
        <div className="card">
          <div className="mx-5"></div>
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "flex-end",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <div className=" w-100 px-1 d-flex justify-content-center border-bottom-0 mt-5 mb-4">
              <h3 className="card-title flex-column align-items-center text-center">
                <span className="card-label fw-bolder fs-3 mb-2 ">
                  {intl.formatMessage({ id: "AddingBasicClassification" })}
                </span>
              </h3>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(AddMainClassification)}>
            <Modal.Body className="py-1">
              <div className="pb-4 w-100">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6 fw-bolder border border-bottom border-white border-2 ${activeButton.id === button.id ? "text-dark active" : ""
                      } px-5 mb-8`}
                    onClick={(e) => {
                      handleButtonClick(button);
                      e.preventDefault();
                    }}
                  >

                    {button.name}

                  </button>
                ))}

                {ActivatedUserDetailsTab()}
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2 pb-8">
              {/* {activeButton.id === 2 && ( */}
              <div className="mt-2 mb-3 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      onClick={()=>{
                        handleClose();
                        reset();
                      }}
                      className="btn btn-secondary mx-1 text-center w-100"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    {orgId == "" ? (
                      <div
                        className="btn btn-success mx-1 text-center w-100"
                        style={{ border: "none" }}
                        onClick={() => {
                          showSuccessAlert(
                            false,
                            "YouMustSelectTheDepartment",
                            intl
                          );
                        }}
                      >
                        {intl.formatMessage({ id: "Add" })}
                      </div>
                    ) : (
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn btn-success mx-1 text-center w-100"
                        style={{ border: "none" }}
                        disabled={isSubmitting ? true : false}
                      >
                        {intl.formatMessage({ id: "Add" })}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* )} */}
            </Modal.Footer>
          </form>
        </div>

        {/* <div
        className="modal fade"
        id="rega_modal_departmental_organizational_structure"
        aria-hidden="true"
      >
        <DepartmentalOrganizationalStructurePopup
          showHierarchy={showHierarchy}
          orgId={orgId}
          setOrgId={setOrgId}
          orgName={orgName}
          setOrgName={setOrgName}
          handleClose={() => {
            setShowHierarchy(false);
          }}
        />
      </div> */}
      </Modal>
    </>
  );
};

export default AddBasicClassificationPopup;
