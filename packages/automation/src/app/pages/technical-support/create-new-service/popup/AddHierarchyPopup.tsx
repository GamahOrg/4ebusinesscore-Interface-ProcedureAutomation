import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import AddManagmentOption from "./AddManagmentOption";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import SpecifiedOption from "./SpecifiedOption";
import AddEmployeeOption from "./AddEmployeeOption";
import { useDispatch } from "react-redux";
import {
  getEmployee,
  getOrganization,
} from "../../../../redux/features/requestTemplate/requestTemplateSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";
interface Iprop {
  cancelFunc: any;
  show?: any;
  handleClose?: any;
  organization: any;
  selectedIds?: any;
  setSelectedIds?: any;
  selectedNames?: any;
  setSelectedNames?: any;
  employee?: any;
  arrayIndex: any;
  setDestination?: any;
  specialized: any;
  currentVal?: any;
  setCurrentVal?: any;
  setName?: any;
  setNameForEmployee?: any;
  alterSelectedIds?: string;
  setAlterSelectedIds?: any;
}
const AddHierarchyPopup: React.FC<Iprop> = ({
  setDestination,
  arrayIndex,
  cancelFunc,
  show,
  handleClose,
  organization,
  selectedIds,
  setSelectedIds,
  selectedNames,
  setSelectedNames,
  employee,
  specialized,
  currentVal,
  setCurrentVal,
  setName,
  setNameForEmployee,
  alterSelectedIds,
  setAlterSelectedIds,
}) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTermForEmployee, setSearchTermForEmployee] =
    useState<string>("");
  const [searchTermForSpecified, setSearchTermForSpecified] =
    useState<string>("");
  const newArr = [...currentVal];
  const [selectedValue, setSelectedValue] = useState<string>(
    newArr.length > arrayIndex ? currentVal[arrayIndex] : "1"
  );

  useEffect(() => {
    if (!show) {
      if (newArr.length < arrayIndex)
        setCurrentVal([...currentVal, selectedValue]);
      else {
        newArr[arrayIndex] = selectedValue;
        setCurrentVal(newArr);
      }
    }
    // setSelectedValue("1");
  }, [show]);

  const handelSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
  };

  const getActiveElement = (selectedValue: any) => {
    switch (selectedValue) {
      // case "1":
      //   return <EntityOption />;
      case "1":
        return (
          <AddManagmentOption
            arrayIndex={arrayIndex}
            setDestination={setDestination}
            organization={organization}
            setSelectedIds={setSelectedIds}
            setSelectedNames={setSelectedNames}
          />
        );
      // case "3":
      case "2":
        return (
          <AddEmployeeOption
            employee={employee}
            arrayIndex={arrayIndex}
            setDestination={setDestination}
            setSelectedIds={setSelectedIds}
            setSelectedNames={setSelectedNames}
          />
        );
      case "3":
        return (
          <SpecifiedOption
            specialized={specialized}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            selectedNames={selectedNames}
            setSelectedNames={setSelectedNames}
            arrayIndex={arrayIndex}
            setDestination={setDestination}
            searchTermForSpecified={searchTermForSpecified}
            alterSelectedIds={alterSelectedIds}
            setAlterSelectedIds={setAlterSelectedIds}
          />
        );
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setName(searchTerm);
    } else {
      dispatch(getOrganization({ name: "" }) as any);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (searchTermForEmployee) {
      setNameForEmployee(searchTermForEmployee);
    } else {
      dispatch(getEmployee({ search: "" }) as any);
    }
  }, [searchTermForEmployee]);

  return (
    <Fragment>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        style={{ zIndex: "10055" }}
      >
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
              <Modal.Title>
                <div className="mb-9 text-center">
                  <h1 className="mb-3">
                    {intl.formatMessage({ id: "OrganizationalChart" })}
                  </h1>
                  <h6 className="mb-2 text-muted">
                    {intl.formatMessage({
                      id: "YouCanSeeTheDepartmentsAndDivisionsOfTheAuthority",
                    })}
                  </h6>
                </div>
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row ">
              <div className="col-12 col-sm-6">
                <select
                  onChange={handelSelectChange}
                  defaultValue={selectedValue}
                  className="form-select form-select-lg mb-3 form-select-solid"
                  aria-label=".form-select-lg example"
                >
                  {/* <option value="1">
                      {intl.formatMessage({ id: "Entity Type" })}
                    </option> */}
                  <option value="1">
                    {intl.formatMessage({ id: "RealEstateOperations" })}
                  </option>
                  {/* <option value="3">
                      {intl.formatMessage({ id: "Committee" })}
                    </option> */}
                  <option value="2">
                    {intl.formatMessage({ id: "Employee" })}
                  </option>
                  <option value="3">
                    {intl.formatMessage({ id: "specified" })}
                  </option>
                </select>
              </div>
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-center position-relative my-1 px-5">
                  <KTSVG
                    path="/media/icons/duotune/general/gen021.svg"
                    className="svg-icon-1 position-absolute text-muted mx-3"
                  />
                  {selectedValue == "1" ? (
                    <input
                      type="text"
                      name="search"
                      className="form-control form-control-solid ps-10 pr-2"
                      placeholder={intl.formatMessage({ id: "Search" })}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  ) : selectedValue == "2" ? (
                    <input
                      type="text"
                      name="searchTermForEmployee"
                      className="form-control form-control-solid ps-10 pr-2"
                      placeholder={intl.formatMessage({ id: "Search" })}
                      value={searchTermForEmployee}
                      onChange={(e) => setSearchTermForEmployee(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      name="searchTermForSpecified"
                      className="form-control form-control-solid ps-10 pr-2"
                      placeholder={intl.formatMessage({ id: "Search" })}
                      value={searchTermForSpecified}
                      onChange={(e) =>
                        setSearchTermForSpecified(e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
              <div className="col-12">{getActiveElement(selectedValue)}</div>
            </div>
            <div className="d-flex justify-content-center ">
              <button
                className="btn btn-secondary px-15 mx-3"
                onClick={() => {
                  setSelectedIds("");
                  setSelectedNames("");
                  setAlterSelectedIds("");
                  handleClose();
                }}
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>
              <button
                onClick={() => {
                  showSuccessAlert(true, "AddedSuccessfully", intl);
                  setSelectedIds("");
                  setSelectedNames("");
                  setAlterSelectedIds("");
                  handleClose();
                  setSearchTerm("");
                  setSearchTermForSpecified("");
                  setSearchTermForEmployee("");
                }}
                className="btn btn-success px-15 "
              >
                {intl.formatMessage({ id: "Add" })}
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>

      {/* <div className="modal fade" aria-hidden="true">
        <EmployeeHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div> */}
    </Fragment>
  );
};

export default AddHierarchyPopup;
