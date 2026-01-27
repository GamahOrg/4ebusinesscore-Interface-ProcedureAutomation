import React, { ReactNode, useState } from "react";
import { useIntl } from "react-intl";

interface SelectOption {
  label: string;
  value: string;
}
interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  icon?: ReactNode;
  className?: string;
  options?: SelectOption[];
}

const InputField: React.FC<InputFieldProps> = ({
  label = "",
  type = "text",
  placeholder = "",
  value,
  onChange = () => {},
  disabled,
  error = "",
  icon,
  className = "",
  options = [],
}) => {
  const intl = useIntl();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="d-flex flex-column mt-1">
      {label && (
        <span className="text-gray-700 mb-2 px-1 fs-6">
          {intl.formatMessage({ id: label })}
        </span>
      )}

      {type === "text" && (
        <div className="input-field-container">
          <span className="input-field-icon">
            {icon ? icon : <i className="fa-solid fa-align-right" />}
          </span>
          <input
            className={`form-control input-field bg-danger ${className}`}
            value={value}
            type={type}
            placeholder={placeholder && intl.formatMessage({ id: placeholder })}
            disabled={disabled}
            onChange={onChange}
          />
        </div>
      )}

      {type === "file" && (
        <div className="file-upload">
          <label className="cursor-pointer w-100 btn" onClick={handleFileClick}>
            {fileName ? (
              fileName
            ) : (
              <span>
                <i className="fa-solid fa-paperclip mx-2"></i>
                {placeholder && intl.formatMessage({ id: placeholder })}
              </span>
            )}
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={disabled}
            className={className}
          />
        </div>
      )}

      {type === "select" && (
        <select
          className="form-select form-select-solid"
          data-kt-select2="true"
          data-placeholder="Select option"
          data-allow-clear="true"
          defaultValue=""
        >
          <option value="" disabled hidden>
            {label
              ? `${intl.formatMessage({ id: "Choose" })} ${intl.formatMessage({
                  id: label,
                })}`
              : intl.formatMessage({ id: placeholder })}
          </option>
          {options.length ? (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {intl.formatMessage({ id: option.label })}
              </option>
            ))
          ) : (
            <option disabled>{intl.formatMessage({ id: "NotFound" })}</option>
          )}
        </select>
      )}

      <span className="text-danger mt-2 px-3">
        {error && intl.formatMessage({ id: error })}
      </span>
    </div>
  );
};

export default InputField;
