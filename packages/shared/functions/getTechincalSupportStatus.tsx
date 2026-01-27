import { IntlShape } from "react-intl";

export const getStatusLabel = (status: number, intl: IntlShape): string => {
  switch (status) {
    case 0:
      return intl.formatMessage({ id: "Completed" });
    case 1:
      return intl.formatMessage({ id: "Rejected" });
    case 2:
      return intl.formatMessage({ id: "Closed" });
    case 3:
      return intl.formatMessage({ id: "Postponed" });
    case 4:
      return intl.formatMessage({ id: "Transferred" });
    case 5:
      return intl.formatMessage({ id: "Received" });
    case 6:
      return "";
    case 7:
      return intl.formatMessage({ id: "Late" });
    case 8:
      return intl.formatMessage({ id: "Continue" });
    case 9:
      return intl.formatMessage({ id: "Sent" });
    case 10:
      return intl.formatMessage({ id: "Accepted" });
    case 11:
      return intl.formatMessage({ id: "Reopened" });
    case 13:
      return intl.formatMessage({ id: "UnderReview" });
    case -1:
      return intl.formatMessage({ id: "Undefined" });
    case 14:
      return intl.formatMessage({ id: "RejectedByWorkflow" });
    case 15:
        return intl.formatMessage({ id: "ExceptionAgree" });
    case 16:
        return intl.formatMessage({ id: "Canceled" });
    default:
      return "";
  }
};

export const getStatusClass = (status: number): string => {
  switch (status) {
    case 0:
    case 15:
      return "badgex badge-light-success";
    case 1:
    case 16:
      return "badgex badge-light-danger";
    case 2:
    case 4:
    case 5:
    case 6:
    case 7:
      return "badgex badge-light-dark";
    case 3:
    case 13:
    case 11:
      return "badgex badge-light-primary";
    case 8:
      return "badgex badge-light-warning";
    case 14:
      return "badgex badge-light-danger";
    default:
      return "badgex badge-light-secondary";
  }
};
