export const getAdByStatus = (status: number, intl: any) => {
  switch (status) {
    case 1:
      return { text: intl.formatMessage({ id: 'AjudgmentIssued'}), className: "success" };
    case 2:
      return { text: intl.formatMessage({ id: 'AdjudmentExpired'}), className: "danger" };
    case 3:
      return { text: intl.formatMessage({ id: 'InSessions'}), className: "warning" };
    case 4:
      return { text: "", className: "secondary" };
    default:
      return { text: "", className: "primary" };
  }
};

export const getJudgmentStatus = (status: number, intl: any) => {
  switch (status) {
    case 1:
      return { text: intl.formatMessage({ id: 'AjudgmentIssued' }), className: "success" };
    case 2:
      return { text: intl.formatMessage({ id: 'Postponement' }), className: "warning" };
    default:
      return { text:intl.formatMessage({ id: 'Postponement' }), className: "primary" };
  }
};

export  const getStatusColor = (status: number, intl: any) => {
  switch (status) {
    case 0:
      return { text: intl.formatMessage({ id: 'Permanent' }), className: "bg-light-success text-success" };
    case 1:
      return { text: intl.formatMessage({ id: 'Temporary' }), className: "bg-light-warning text-warning" };
    case 2:
      return { text: intl.formatMessage({ id: 'Stopped' }), className: "bg-light-danger text-danger" };
    default:
      return { text: "", className: "bg-light-secondary text-secondary" };
  }
};