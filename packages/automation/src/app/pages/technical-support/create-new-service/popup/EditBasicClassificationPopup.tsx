import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  mainClassificationProps,
  mainClassificationSchema,
} from "../../../../validations/MainClassificationValidation";
import { putMainClassification } from "../../../../redux/features/mainClassification/mainClassificationSlice";
import { RootState } from "../../../../redux/store/store";
import { fetchOrgs } from "../../../../redux/features/mainClassification/orgsSlice";
import { fetchMainClassificationById } from "../../../../redux/features/mainClassification/mainClassificationByIdSlice";
import { ManagementHierarchyPopup } from "./ManagementHierarchyPopup";
import { fetchOrgMembers } from "../../../../redux/features/mainClassification/GetAllMembersOrgSlice";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { fetchElectronicServices } from "../../../../redux/features/mainClassification/electronic-services";
import { AppDispatch } from "@4eplatform/connect/src/app/store/store";

import { EditServiceSettings } from "./EditServiceSettings";
import { EditDigitalServicesSettings } from "./EditDigitalServicesSettings";
import { EditScreenSettingsTab } from "./EditScreenSettingsTab"; 
import { AddMainClassificationsDetailsForSettingsProps, AddMainClassificationsDetailsForSettingsSchema } from "../../../../validations/AddMainClassificationsDetailsForSettings";
import { addMainClassificationTitleDetails, editMainClassificationTitleDetails, fetchMainClassificationtTitleDetailesByMainClassificationId } from "../../../../redux/features/mainClassification/mainClassificationTitleDetailsSlice";
import { MainClassificationSettingsModel } from "../../../../models/MainClassificationSettingsModel";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useParams } from "react-router-dom";
import { getAllSubSystemSettingsMainClassification, getSubsytemSettingsByMainClassificationId } from "../../../../redux/features/getAllSubsytemSettingsMainClassification";
import { getAllSubSystemMainLookUP } from "../../../../redux/features/getAllSubsytemMainLookUpSlice";

type ButtonTypes = {
  id: number;
  name: string;
};
type PopupProps = {
  show?: any;
  handleClose?: any;
  id: string | number | Number;
  fetchData?: any;
};
const EditBasicClassificationPopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  id,
  fetchData,
}) => {
  const intl = useIntl();
  const [isSelected, setIsSelected] = useState<string>("no");
  const dispatch = useDispatch<AppDispatch>();
  const [electronicServicesOptions, setElectronicServicesOptions] = useState([]);
  const [selectedElectronicServices, setSelectedElectronicServices] = useState<any>([]);
  const [selectedAdminOption, setSelectedAdminOption] = useState<any>(null);
  let [orgId, setOrgId] = useState<string>("");
  let [orgName, setOrgName] = useState<string>("");
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let language = intl.locale;
  let [type, setType] = useState<any>("");
  const { systemId } = useParams()

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
        {
          id: 3,
          name: intl.formatMessage({ id: "ScreensSettings" }),
        },
      ]
    : []),
  ];

  const [activeButton, setActiveButton] = useState<ButtonTypes>(buttons[0]);

  const handleButtonClick = (button: ButtonTypes) => {
    setActiveButton(button);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<mainClassificationProps>({
    resolver: yupResolver(mainClassificationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const {
    register:registerForSettings,
    setValue:setValueForSettings,
    watch:watchForSettings,
    handleSubmit:handleSubmitForSettings,
    formState: { errors:errorsForSettings,isSubmitting:isSubmittingForSettings},
  } = useForm<AddMainClassificationsDetailsForSettingsProps>({
    resolver: yupResolver(AddMainClassificationsDetailsForSettingsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  useEffect(() => {
    dispatch(fetchElectronicServices({}) as any);
  }, []);

  let ElectronicServices = useSelector((state: RootState) => {
    return state?.electronicServices?.data?.electronicServices;
  });

  useEffect(() => {
    setElectronicServicesOptions(ElectronicServices as any);
    if (
      Array.isArray(mainClassification?.electronicsServices) &&
      mainClassification?.electronicsServices?.length === 0
    ) {
    } else {
      setSelectedElectronicServices(mainClassification?.electronicsServices);
    }
  }, [ElectronicServices]);

  let orgs = useSelector((state: RootState) => {
    return state?.orgsSlice?.data;
  });

  let mainClassification = useSelector((state: RootState) => {
    return state?.mainClassificationById?.data;
  });

  const getAllSubSystemMainClassification = async () => {
    await dispatch(getAllSubSystemSettingsMainClassification({}));
  };

  useEffect(() => {
    dispatch(fetchOrgs({}) as any);
    getAllSubSystemMainClassification();
    dispatch(getAllSubSystemMainLookUP({}));
  }, []);

  let AllSubSystemMainClassification = useSelector((state: RootState) => {
    return state?.subSystemSettingsMainClassification?.items;
  });
  let AllSubSystemMainLookUp = useSelector((state: RootState) => {
    return state?.allSubSystemMainLookUp?.items;
  });

  useEffect(() => {
    if (id) { 
      dispatch(fetchMainClassificationById(id) as any);
      dispatch(fetchMainClassificationTree(id) as any);
    }
  }, [id]);
  let [selectedAdmins,setSelectedAdmins]=useState<any>([])
  const [isIntegrated, setIsIntegrated] = useState(false);
  useEffect(()=>{
    setValue("isIntegrated",isIntegrated?"yes":"no")
    if(isIntegrated==false){
      setValue("subSystemId","")
      trigger("subSystemId")
    }
},[isIntegrated])
let formValues=watch()
let [subsytemSettingsByMainClassificationId,setSubsytemSettingsByMainClassificationId]=useState<any>([])
useEffect(()=>{
  if(formValues.subSystemMainClassificationId){
    dispatch(getSubsytemSettingsByMainClassificationId(formValues.subSystemMainClassificationId)).then((res:any)=>{
      setSubsytemSettingsByMainClassificationId(res?.payload?.result)
    })
  }
},[formValues.subSystemMainClassificationId])

  useEffect(() => {
    if (mainClassification) {
      setValue("name", mainClassification?.name);
      setValue("color", mainClassification?.color);
      setValue("description", mainClassification?.description);
      setValue("icon", mainClassification?.icon);
      setValue("isIntegrated",mainClassification?.subSystemId==null || mainClassification?.subSystemId==""?"no":"yes")
      setIsIntegrated(mainClassification?.subSystemId==null || mainClassification?.subSystemId==""?false:true)
      // setValue("serviceType", mainClassification?.serviceType);
      setOrgId(mainClassification?.orgId);
      // setValue("admins", mainClassification?.admins?.map((admin)=>{return admin?.id}));
      // setSelectedAdmins( mainClassification?.admins?.map((admin)=>{
      //   return {
      //     label:admin?.userName,
      //     value:admin?.id
      //   }
      // }))
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
     setValue("nameEn", mainClassification?.nameEn);
      setValue("descriptionEn", mainClassification?.descriptionEn);
    }
  }, [mainClassification]);

  useEffect(()=>{
    if(formValues?.subSystemMainClassificationLookupId){
      setValue("subSystemId",mainClassification?.subSystemId)
    }
  },[subsytemSettingsByMainClassificationId,mainClassification,formValues?.subSystemMainClassificationLookupId])



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
      // setValue("admins", []);
    }
    setOrgName(
      language == "ar"
        ? (findOrganizationById(orgs, orgId)?.nameAr as string)
        : (findOrganizationById(orgs, orgId)?.nameEn as string)
    );
  }, [orgs, orgId, dispatch]);

  function findOrganizationById(orgs: any, orgId: any) {
    if (orgs?.length > 0) {
      // debugger
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

  let orgMembers = useSelector((state: RootState) => {
    return state?.orgMembers?.data;
  });

  useEffect(()=>{
    setValue("admins", mainClassification?.admins);
    setSelectedAdmins( Array.isArray(orgMembers) && orgMembers?.filter((member:any)=>{
      return mainClassification?.admins?.includes(member?.memberId)
    })?.map((admin:any)=>{
      return {
        label:admin?.memberName,
        value:admin?.memberId
      }
    }))

  },[orgMembers])
  // useEffect(() => {
  //   if (mainClassification && orgMembers && orgMembers.length > 0) {
  //     setValue("admin", mainClassification?.admin);

  //     const defaultAdmin = orgMembers.find(
  //       (member: any) => member?.memberId === mainClassification?.admin
  //     );
  //     setSelectedAdminOption(
  //       defaultAdmin
  //         ? { value: defaultAdmin?.memberId, label: defaultAdmin?.memberName }
  //         : null
  //     );
  //   }
  // }, [mainClassification, orgMembers]);

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
      let values={
        name: formValues.name,
        orgId: orgId,
        admins: formValues.admins,
        icon: formValues.icon,
        color: formValues.color,
        description: formValues.description,
        kpi: formValues.kpi || "",
        serviceType: formValues.serviceType,
        isShowInHomePage: isSelected === "yes" ? true : false,
        teamName: formValues.teamName || "",
        electronicsServices: selectedElectronicServices,
        subSystemId:formValues?.subSystemId,
        subSystemMainClassificationId:
          formValues.subSystemMainClassificationId,
        subSystemMainClassificationLookupId:
          formValues.subSystemMainClassificationLookupId,
        nameEn: formValues.nameEn,
        descriptionEn: formValues.descriptionEn,
      }
      let bodyWithoutEmptyStringValues=Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== "")
      );
      let data = {
        id,
        body: {
          putMainClassificationDTO: bodyWithoutEmptyStringValues,
        },
      };
      dispatch(putMainClassification(data as any) as any).then((res: any) => {
        if (res.payload.statusEnum == 1) {
          showSuccessAlert(true, "EditedSuccessfully", intl);
          // setSelectedAdmins([])
          fetchData();
          // dispatch(getMainClassification({}) as any);
          reset();
          handleClose();
        } else if (res.payload.message === '["checkservicetype"]') {

            showSuccessAlert(false,"checkServiceCatlog" , intl)
          // reset();
          // handleClose();
        } else if (res.payload.message === '["checkServiceCatlog"]') {
            showSuccessAlert(false,"checkServiceCatlog" , intl)
          // reset();
          // handleClose();
        } else if (
          res.payload.message === '["MainClassificationNameIsAlreadyExists"]'
        ) {
           showSuccessAlert(false,"checkServiceCatlog" , intl)
          // reset();
          // handleClose();
        } else if (res.payload.message === '["CheckcatoguryServicetype"]') {
           showSuccessAlert(false,"checkServiceCatlog" , intl)
          // reset();
          // handleClose();
        } else if (res.payload.message === '["checkitem"]') {
           showSuccessAlert(false,"checkServiceCatlog" , intl)
          // reset();
          // handleClose();
        }
      });
    }
  };

  let [ordersSettings, setOrdersSettings] = useState<MainClassificationSettingsModel[]>([new MainClassificationSettingsModel()]);
  let [reportsSettings, setReportsSettings] = useState<MainClassificationSettingsModel[]>([new MainClassificationSettingsModel()]);

useEffect(() => {
  dispatch(
    fetchMainClassificationtTitleDetailesByMainClassificationId({
      mainClassificationId: id,
      serviceType: 2,
    }) as any
  ).then((res: any) => {
    setOrdersSettings(res?.payload?.result);
  });
  dispatch(
    fetchMainClassificationtTitleDetailesByMainClassificationId({
      mainClassificationId: id,
      serviceType: 3,
    }) as any
  ).then((res: any) => {
    setReportsSettings(res?.payload?.result);
  });
}, [id]);


  
  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return (
          <>
          <form onSubmit={handleSubmit(EditMainClassification)}>
          <EditServiceSettings
            register={register}
            DisplayErrorMessage={DisplayErrorMessage}
            errors={errors}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            orgName={orgName}
            setOrgName={setOrgName}
            orgMembers={orgMembers}
            setValue={setValue}
            isIntegrated={isIntegrated}
            setIsIntegrated={setIsIntegrated}
            subsytemSettingsByMainClassificationId={subsytemSettingsByMainClassificationId}
            selectedAdminOption={selectedAdminOption}
            setSelectedAdminOption={setSelectedAdminOption}
            AllSubSystemMainClassification={AllSubSystemMainClassification}
            AllSubSystemMainLookUp={AllSubSystemMainLookUp}
            orgId={orgId}
            setOrgId={setOrgId}
            selectedAdmins={selectedAdmins}
            setSelectedAdmins={setSelectedAdmins}
            trigger={trigger}
          />
           <div className="mt-2 mb-3 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      onClick={handleClose}
                      className="btn btn-secondary mx-1 text-center w-100"
                      id="editMainClassificationCancelButton"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    {orgId == "" ? (
                      <div
                        className="btn btn-success mx-1 text-center w-100"
                        style={{ border: "none" }}
                        onClick={() => {
                          showSuccessAlert(false, "YouMustSelectTheDepartment", intl);
                        }}
                      >
                        {intl.formatMessage({ id: "Edit" })}
                      </div>
                    ) : (
                      <button
                        className="btn btn-success mx-1 text-center w-100"
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
          </>
        );
      case 2:
        return (
          <>
          <form onSubmit={handleSubmit(EditMainClassification)}>
          <EditDigitalServicesSettings
            ElectronicServices={ElectronicServices}
            setSelectedElectronicServices={setSelectedElectronicServices}
            selectedElectronicServices={selectedElectronicServices}
            mainClassification={mainClassification}
          />
          <div className="mt-2 mb-3 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      onClick={handleClose}
                      className="btn btn-secondary mx-1 text-center w-100"
                      id="editMainClassificationCancelButton"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    {orgId == "" ? (
                      <div
                        className="btn btn-success mx-1 text-center w-100"
                        style={{ border: "none" }}
                        onClick={() => {
                          showSuccessAlert(false, "YouMustSelectTheDepartment", intl);
                        }}
                      >
                        {intl.formatMessage({ id: "Edit" })}
                      </div>
                    ) : (
                      <button
                        className="btn btn-success mx-1 text-center w-100"
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
          </>
        );
        case 3:
          return (
           <>
           <form onSubmit={handleSubmitForSettings(addEditHandler)}>
           <EditScreenSettingsTab
            errors={errorsForSettings}
            formValues={watchForSettings()}
            setValue={setValueForSettings}
            register={registerForSettings}
            id={id as string}
            reportsSettings={reportsSettings}
            ordersSettings={ordersSettings}
            />
            <div className="mt-2 mb-3 col-12 col-lg-7 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                      onClick={handleClose}
                      className="btn btn-secondary mx-1 text-center w-100"
                      id="editMainClassificationCancelButton"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </div>
                    <button
                        className="btn btn-success mx-1 text-center w-100"
                        style={{ border: "none" }}
                        type="submit"
                        disabled={isSubmittingForSettings ? true : false}
                      >
                        {intl.formatMessage({ id: "Edit" })}
                      </button>
                  </div>
                </div>
            </div>
           </form>
           </>
          );
    }
  };
  let  formValuesForSetttings=watchForSettings()
  let mainClassificationDetailsArrayForPost =
  [
    {
      title: formValuesForSetttings?.titleForOrders,
      titleDescription: formValuesForSetttings?.titleDescriptionForOrders,
      mainClassificationDescription:
        formValuesForSetttings?.mainClassificationDescriptionForOrders,
      catalogDescription: formValuesForSetttings?.catalogDescriptionForOrders,
      categoryDescription: formValuesForSetttings?.catalogDescriptionForOrders,
      itemDescription: formValuesForSetttings?.itemDescriptionForOrders,
      subjectDescription: formValuesForSetttings?.subjectDescriptionForOrders,
      serviceType: 2,
      mainClassificationId: id,
    },
    {
      title: formValuesForSetttings?.titleForReports,
      titleDescription: formValuesForSetttings?.itemDescriptionForReports,
      mainClassificationDescription:
        formValuesForSetttings?.mainClassificationDescriptionForReports,
      catalogDescription: formValuesForSetttings?.catalogDescriptionForReports,
      categoryDescription: formValuesForSetttings?.categoryDescriptionForReports,
      itemDescription: formValuesForSetttings?.itemDescriptionForReports,
      subjectDescription: formValuesForSetttings?.subjectDescriptionForReports,
      serviceType: 3,
      mainClassificationId: id,
    },
  ];
let mainClassificationDetailsArrayForEdit=
[
  { id:Array.isArray(ordersSettings) && ordersSettings?.slice(-1)[0]?.id,
    title: formValuesForSetttings?.titleForOrders,
    titleDescription: formValuesForSetttings?.titleDescriptionForOrders,
    mainClassificationDescription:
    formValuesForSetttings?.mainClassificationDescriptionForOrders,
    catalogDescription: formValuesForSetttings?.catalogDescriptionForOrders,
    categoryDescription: formValuesForSetttings?.categoryDescriptionForOrders,
    itemDescription: formValuesForSetttings?.itemDescriptionForOrders,
    subjectDescription: formValuesForSetttings?.subjectDescriptionForOrders,
    serviceType: 2,
    mainClassificationId: id,
    titleEn:formValuesForSetttings?.titleForOrdersEn,
    titleDescriptionEn:formValuesForSetttings?.titleDescriptionForOrdersEn,
    mainClassificationDescriptionEn:formValuesForSetttings?.mainClassificationDescriptionForOrdersEn,
   catalogDescriptionEn:formValuesForSetttings?.catalogDescriptionForOrdersEn,
   categoryDescriptionEn:formValuesForSetttings?.categoryDescriptionForOrdersEn,
   itemDescriptionEn:formValuesForSetttings?.itemDescriptionForOrdersEn,
   subjectDescriptionEn:formValuesForSetttings?.subjectDescriptionForOrdersEn,
  },
  {
    id:Array.isArray(reportsSettings) && reportsSettings?.slice(-1)[0]?.id,
    title: formValuesForSetttings?.titleForReports,
    titleDescription: formValuesForSetttings?.titleDescriptionForReports,
    mainClassificationDescription:
      formValuesForSetttings?.mainClassificationDescriptionForReports,
    catalogDescription: formValuesForSetttings?.catalogDescriptionForReports,
    categoryDescription: formValuesForSetttings?.categoryDescriptionForReports,
    itemDescription: formValuesForSetttings?.itemDescriptionForReports,
    subjectDescription: formValuesForSetttings?.subjectDescriptionForReports,
    serviceType: 3,
    mainClassificationId: id,
        titleEn:formValuesForSetttings?.titleForReportsEn,
    titleDescriptionEn:formValuesForSetttings?.titleDescriptionForReportsEn,
    mainClassificationDescriptionEn:formValuesForSetttings?.mainClassificationDescriptionForReportsEn,
   catalogDescriptionEn:formValuesForSetttings?.catalogDescriptionForReportsEn,
   categoryDescriptionEn:formValuesForSetttings?.categoryDescriptionForReportsEn,
   itemDescriptionEn:formValuesForSetttings?.itemDescriptionForReportsEn,
   subjectDescriptionEn:formValuesForSetttings?.subjectDescriptionForReportsEn,
  },
];
const handleAddMainClassificationDetails = async (
  formValues: AddMainClassificationsDetailsForSettingsProps
) => {
  let body = {
    postMainClassificationtTitleDetailesDto: mainClassificationDetailsArrayForPost,
  };
  try {
    await dispatch(addMainClassificationTitleDetails(body) as any).then(
      (res: any) => {
        if (res?.payload?.statusEnum==1){
          showSuccessAlert(
            true,
            "SavedSuccessfully",
            intl,
            () => {
              handleClose()
            }
          )
          dispatch(
            fetchMainClassificationtTitleDetailesByMainClassificationId({
              mainClassificationId: mainClassification?.id,
              serviceType: 1,
            })
          );
        }
        else if (res?.payload?.message){
          showSuccessAlert(
            false,
            "AnErrorOccured",
            intl,
            () => {
            }
          )
        }
        
      }
    );
  } catch (error) {
    console.error("Error during editing basic data:", error);
  }
};

const handleEditMainClassificationDetails = async (
  formValues: AddMainClassificationsDetailsForSettingsProps
) => {
  let body = {
    putMainClassificationtTitleDetailesDto: mainClassificationDetailsArrayForEdit,
  };
  try {
    await dispatch(editMainClassificationTitleDetails(body) as any).then(
      (res: any) => {
        if (res?.payload?.statusEnum==1){
          showSuccessAlert(
            true,
            "SavedSuccessfully",
            intl,
            () => {
              handleClose()
            }
          )
        }
        else if (res?.payload?.message){
          showSuccessAlert(
            false,
            "AnErrorOccured",
            intl,
            () => {
            }
          )
        }
        
      }
    );
  } catch (error) {
    console.error("Error during editing basic data:", error);
  }
};
let addEditHandler=(formValues: AddMainClassificationsDetailsForSettingsProps)=>{
  if((Array.isArray(ordersSettings) && ordersSettings?.slice(-1)[0]?.id) ||(Array.isArray(reportsSettings) && reportsSettings?.slice(-1)[0]?.id) ){
    handleEditMainClassificationDetails(formValues)
  }
  else {
    handleEditMainClassificationDetails(formValues)
  }
}
  return (
    <>
      {/* <div className="modal-dialog modal-dialog-centered mw-1000px"> */}
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        id="EditMainClassification"
        className="pt-20"
         style={{ zIndex: "10000" }}
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
              <h3 className="card-title flex-column align-items-center">
                <span className="card-label fw-bolder fs-3 mb-2 ">
                  {intl.formatMessage({ id: "EditingBasicClassification" })}
                </span>
              </h3>
              {/* <Modal.Title>
                
                  <span className="mt-1 fw-semibold fs-5 text-muted">
                    {intl.formatMessage({ id: "ChooseDataClassification" })}
                  </span>
                  <p className="mb-5 mt-6 text-primary fs-4 fw-bolder">
                    {intl.formatMessage({ id: "BasicDataForAddition" })}
                  </p>
              </Modal.Title> */}
            </div>
          </Modal.Header>
            <Modal.Body className="py-1">
              <div className="pb-4 w-100">
                {buttons?.map((button) => {
                  return (
                      <button
                    key={button.id}
                    className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6 fw-bolder border border-bottom border-white border-2 ${
                      activeButton.id === button.id ? "text-dark active" : ""
                    } px-5 mb-8`}
                    onClick={(e) => {
                      handleButtonClick(button);
                      e.preventDefault();
                    }}
                  >
                    {intl.formatMessage({
                      id: button.name,
                    })}
                  </button>                        
                  )
                })}
                {ActivatedUserDetailsTab()}
              </div>
            </Modal.Body>           
        </div>
      </Modal>
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
      {/* </div> */}
    </>
  );
};

export default EditBasicClassificationPopup;
