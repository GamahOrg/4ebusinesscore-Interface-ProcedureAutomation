import React from "react";
import { useIntl } from "react-intl";

interface ActionBtnProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const ActionBtn = ({
  label,
  onClick = () => {},
  disabled = false,
  className = "",
  icon,
}: ActionBtnProps) => {
  const intl = useIntl();

  return (
    <button
      className={`btn fw-bolder ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="svg-icon svg-icon-5 text-gray-800 me-1">
        {icon && icon}
      </span>
      {intl.formatMessage({ id: label })}
    </button>
  );
};

export default ActionBtn;
