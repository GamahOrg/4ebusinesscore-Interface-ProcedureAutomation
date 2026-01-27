import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import Swal from "sweetalert2";
;


const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  Swal.fire({
    icon: "error",
    title:
      localStorage.getItem("selectedLang") == "ar"
        ? "حدث خطا"
        : "An error occured",
    text:
      localStorage.getItem("selectedLang") == "ar"
        ? "يرجي الرجوع لفريق الدعم"
        : "Please refer to support.",
    confirmButtonText:
      localStorage.getItem("selectedLang") == "ar"
        ? "حاول مجددا في وقت لاحق"
        : "Try again later",
    allowOutsideClick: false,
  }).then((result) => {
    if (result?.isConfirmed) {
      window.location.href = `${
        (window as any)._env_?.REACT_APP_Base_Url
      }/home-workspace`;
    } else {
    }
  });

  return null;
};

const CustomErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
    {children}
  </ReactErrorBoundary>
);

export default CustomErrorBoundary;
