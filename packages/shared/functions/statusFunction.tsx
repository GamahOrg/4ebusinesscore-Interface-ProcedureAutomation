import { IntlShape } from "react-intl";

export const getStatusText = (number: number, intl: any) => {
  switch (number) {
    case 1:
      return {
        text: intl.formatMessage({ id: "Draft" }),
        className: "danger",
        textColor: "danger",
      };
    case 2:
      return {
        text: intl.formatMessage({ id: "Published" }),
        className: "success",
        textColor: "success",
      };
    default:
      return { text: "", bgClass: "" };
  }
};
