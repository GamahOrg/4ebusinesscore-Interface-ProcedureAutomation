const convertNullString = (value: string) => {
  if (
    value == null ||
    value == "" ||
    value == "null" ||
    value == "undefined" ||
    value == undefined
  ) {
    return "";
  } else {
    return value;
  }
};
export default convertNullString;
