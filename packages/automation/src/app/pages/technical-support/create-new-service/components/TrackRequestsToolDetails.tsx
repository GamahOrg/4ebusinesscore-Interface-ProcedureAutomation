import { Fragment } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "../../../../partials/functions/language";

function TrackRequestsToolDetails() {
  const intl = useIntl();
  return (
    <Fragment>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start  mt-4"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="row g-5 g-xl-8">
            <div className="col-xl-12">
              <div className="card card-xl-stretch mb-xl-8 card-body p-5 ">
                <div className="card-header border-0 mb-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bolder text-dark">
                      {intl.formatMessage({ id: "RequestDetails" })}
                    </span>
                  </h3>
                </div>
                <hr />
                <br />
                <br />
                <div className="d-flex align-items-center justify-content-between pe-3 ps-5">
                  <div className="w-25 pe-5">
                    <p className="mb-4">
                      {intl.formatMessage({ id: "OrderName" })}
                    </p>
                    <p className="fw-bolder text-black fs-7">
                      {intl.formatMessage({ id: "PurchaseOrder" })}
                    </p>
                  </div>
                  <div className="w-25 text-center">
                    <p className="mb-4">
                      {intl.formatMessage({ id: "OrderType" })}
                    </p>
                    <p className="fw-bolder text-black fs-7">
                      {intl.formatMessage({ id: "PurchaseOrderSpecification" })}
                    </p>
                  </div>
                  <div className="w-25 text-center">
                    <p className="mb-4">
                      {intl.formatMessage({ id: "DepartmentsNumber" })}
                    </p>
                    <p className="fw-bolder text-black fs-7">5</p>
                  </div>
                  <div className="w-25 text-center ps-4 ">
                  <p className="mb-4">
                      {intl.formatMessage({ id: "OrderClassification" })}
                    </p>
                    <p className="fw-bolder text-black fs-7">
                      {intl.formatMessage({ id: "Classification" })} 1
                    </p>
                  </div>
                </div>
               
                <div className="timeline timeline-1 pe-5 position-relative mt-4 pt-4">
                  <div
                    className="timeline-sep bg-secondary h-100 border border-1 border-dashed  "
                    style={{
                      position: "absolute",
                      top: "10px",
                      [getCurrentSystemLanguage() == "ar"
                        ? "right"
                        : "left"]: `30px`,
                    }}
                  ></div>
                  <div className="timeline-item mb-8 ">
                    <div className="timeline-badge  w-60px">
                      <span className="badge bg-success fs-2 p-3 d-flex align-items-center justify-content-center w-30px ">
                        1
                      </span>{" "}
                    </div>
                    <div className="timeline-content d-flex justify-content-between align-items-center text-muted font-weight-normal ms-4">
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({ id: "FinancialManagement" })}{" "}
                      </p>
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({ id: "Role" })}{" "} / مدير المعرفه
                      </p>
                      <p
                        className="min-w-175px p-1 py-2"
                        style={{ backgroundColor: "#C9F7F5", opacity: ".8" }}
                      >
                        <span className="ms-3 text-black">
                          {" "}
                          {intl.formatMessage({ id: "DurationInDays" })}:{" "}
                        </span>
                        <span className="text-primary">
                          {intl.formatMessage({ id: "20Day" })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item mb-8 pt-4">
                    <div className="timeline-badge  w-60px">
                      <span className="badge bg-success fs-2 p-3">2</span>{" "}
                    </div>
                    <div className="timeline-content ms-4 d-flex align-items-center justify-content-between text-muted font-weight-normal">
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({ id: "StrategicManagement" })}{" "}
                      </p>
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({ id: "Role" })}{" "} / موظف ادارة المشاريع
                      </p>
                      <p
                        className="min-w-175px p-1 py-2"
                        style={{ backgroundColor: "#C9F7F5", opacity: ".8" }}
                      >
                        <span className="ms-3 text-black">
                          {" "}
                          {intl.formatMessage({ id: "DurationInDays" })}:{" "}
                        </span>
                        <span className="text-primary">
                          {intl.formatMessage({ id: "20Day" })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item mb-8 pt-4">
                    <div className="timeline-badge  w-60px">
                      <span className="badge bg-success fs-2 p-3">3</span>{" "}
                    </div>
                    <div className="timeline-content ms-4 text-muted font-weight-normal d-flex align-items-center justify-content-between">
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({ id: "ProjectManagementOffice" })}{" "}
                      </p>
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({ id: "Role" })}{" "} / مدير ادارة المشاريع
                      </p>
                      <p
                        className="min-w-175px p-1 py-2"
                        style={{ backgroundColor: "#C9F7F5", opacity: ".8" }}
                      >
                        <span className="ms-3 text-black">
                          {" "}
                          {intl.formatMessage({ id: "DurationInDays" })}:{" "}
                        </span>
                        <span className="text-primary">
                          {intl.formatMessage({ id: "20Day" })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item mb-8 pt-4">
                    <div className="timeline-badge  w-60px">
                      <span className="badge bg-success fs-2 p-3">4</span>{" "}
                    </div>
                    <div className="timeline-content ms-4 d-flex align-items-center justify-content-between text-muted font-weight-normal">
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({
                          id: "StrategicTechnicalCommittee",
                        })}{" "}
                      </p>
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({ id: "Role" })}{" "} / موظف ادارة المشاريع
                      </p>
                      <p
                        className="min-w-175px p-1 py-2"
                        style={{ backgroundColor: "#C9F7F5", opacity: ".8" }}
                      >
                        <span className="ms-3 text-black">
                          {" "}
                          {intl.formatMessage({ id: "DurationInDays" })}:{" "}
                        </span>
                        <span className="text-primary">
                          {intl.formatMessage({ id: "20Day" })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="timeline-item mb-8 pt-4">
                    <div className="timeline-badge w-80px">
                      <span
                        className={`badge bg-success fs-2 p-3 ${
                          getCurrentSystemLanguage() == "ar" ? "ms-4" : "me-4"
                        } }`}
                      >
                        5
                      </span>{" "}
                    </div>
                    <div className="timeline-content ms-4 d-flex align-items-center justify-content-between text-muted font-weight-normal">
                      <p className="fw-bolder fs-5 min-w-100px text-black">
                        {intl.formatMessage({ id: "PurchaseManagement" })}{" "}
                      </p>
                      <p className="fw-bolder fs-5 min-w-100px text-black ms-4">
                        {intl.formatMessage({ id: "Role" })}{" "} / مدير ادارة المشتريات
                      </p>
                      <p
                        className="min-w-175px p-1 py-2"
                        style={{ backgroundColor: "#C9F7F5", opacity: ".8" }}
                      >
                        <span className="ms-3 text-black">
                          {" "}
                          {intl.formatMessage({ id: "DurationInDays" })}:{" "}
                        </span>
                        <span className="text-primary">
                          {" "}
                          {intl.formatMessage({ id: "20Day" })}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TrackRequestsToolDetails;
