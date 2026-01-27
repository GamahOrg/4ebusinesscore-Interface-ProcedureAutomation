import React, { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Modal } from "react-bootstrap";
import { EmployeeHierarchyPopup } from "./EmployeeHierarchyPopup";
import ManagmentOption from "../technical-support/create-new-service/components/ManagmentOption";
import EmployeeOption from "../technical-support/create-new-service/components/EmployeeOption";

interface Iprop {
  cancelFunc: any;
  show?: any;
  handleClose?: any;
  organization: any;
  setSelectedIds?: any;
  setSelectedNames?: any;
  employee?: any;
}
const HierarchyPopup: React.FC<Iprop> = ({
  cancelFunc,
  show,
  handleClose,
  organization,
  setSelectedIds,
  setSelectedNames,
  employee,
}) => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("1");

  useEffect(() => {
    setSelectedValue("1");
  }, [show]);

  const handelSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
  };

  const getActiveElement = (selectedValue: any) => {
    switch (selectedValue) {
      //   return <EntityOption />;
      case "1":
        return (
          <ManagmentOption
            organization={organization}
            setSelectedIds={setSelectedIds}
            setSelectedNames={setSelectedNames}
          />
        );
      //   return <CommitteOption />;
      case "2":
        return (
          <EmployeeOption
            employee={employee}
            setSelectedIds={setSelectedIds}
            setSelectedNames={setSelectedNames}
          />
        );
      //   return <SpecifiedOption />;
    }
  };

  return (
    <Fragment>
      <div className="modal-dialog">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
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
                    defaultValue="1"
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
                    {/* <option value="5">
                      {intl.formatMessage({ id: "specified" })}
                    </option> */}
                  </select>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-center position-relative my-1">
                    <KTSVG
                      path="/media/icons/duotune/general/gen021.svg"
                      className="svg-icon-1 position-absolute text-muted mx-3"
                    />
                    <input
                      type="text"
                      data-kt-user-table-filter="search"
                      className="form-control form-control-solid px-11"
                      placeholder={intl.formatMessage({
                        id: "Search",
                      })}
                    />
                  </div>
                </div>
                <div className="col-12">{getActiveElement(selectedValue)}</div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>

      <div className="modal fade" aria-hidden="true">
        <EmployeeHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div>
    </Fragment>
  );
};

export default HierarchyPopup;
