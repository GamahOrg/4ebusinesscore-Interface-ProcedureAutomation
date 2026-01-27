export const getColorByStatus = (status: number) => {
  switch (status) {
    case 1:
      return "light-danger text-danger";
    case 2:
      return "light-success text-success";
    case 3:
      return "light-warning text-warning";
    case 4:
      return "secondary text-dark ";
    default:
      return "light-primary text-primary";
  }
};
