export const GetAdjugeforByStatus = (status: number , intl: any) => {
  switch (status) {
    case 1:
      return intl.formatMessage({ id: 'ForMe'});
    case 2:
      return intl.formatMessage({ id: 'OpposeMe'});
    case 3:
      return intl.formatMessage({ id: 'OpposeMe'});
    
    default:
      return "Error";
  }
};
