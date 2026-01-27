import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import DropDownMenu from "./DropDownMenu";

interface props {
  handleLabelChange: any;
  label: string;
  labelEdit: boolean;
  handleChange: any;
  value?: string;
  checked?: boolean;
  id: string;
  name?: string;
  options?: any[];
  type: string;
  display?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  hints?: string[];
  file?: string;
}

const InputField: FC<props> = (props) => {
  let intl = useIntl();
  const [option, setOption] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>("");
  const optionsHandler = (newOptions: any) => {
    props.handleChange(
      props.id,
      newOptions,
      props.type,
      props.labelEdit ? true : false
    );
  };
  useEffect(() => {
    if (props.file) {
      try {
        // Convert base64 string to byte array
        const byteCharacters = atob(props.file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Determine the correct MIME type based on file extension
        const extension = props.value?.split(".").pop();
        let mimeType = "application/octet-stream"; // Default MIME type
        switch (extension) {
          case "pdf":
            mimeType = "application/pdf";
            break;
          case "png":
            mimeType = "image/png";
            break;
          case "jpg":
          case "jpeg":
            mimeType = "image/jpeg";
            break;
          case "txt":
            mimeType = "text/plain";
            break;
          // Add more cases as needed
          default:
            break;
        }

        const blob = new Blob([byteArray], { type: mimeType });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        setFileUrl(url);

        // Clean up by revoking the object URL when component unmounts
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error("Failed to create file URL:", error);
      }
    }
  }, [props.file]);

  switch (props.type) {
    case "text":
    case "date":
    case "time":
    case "file":
    case "datetime-local":
      if (props.type === "file" && props.display) {
        return (
          <>
            {props.value ? (
              <a href={fileUrl ?? ""} target="_blank" rel="noopener noreferrer">
                {props.value?.split("\\")?.pop()}
              </a>
            ) : (
              <p className="m-2">
                {intl.formatMessage({ id: "NoAttachments" })}
              </p>
            )}
          </>
        );
      } 
      else
        return (
          <input
            className="form-control"
            // value={props.value?.toString()}
              {...(props.type !== "file"
              ? { value: props?.value?.toString() ?? "" }
            : {})}
            type={props.type}
            readOnly={props.display}
            required={props.isRequired}
            placeholder={props.placeholder}
            onChange={(e) =>
              props.handleChange(
                props.id,
                e,
                props.type,
                props.labelEdit ? true : false
              )
            }
          />
        );
    case "radio":
    case "checkbox":
      return (
        <input
          className="form-check-input mx-2"
          checked={props.checked}
          type={props.type}
          name={props.name}
          required={props.isRequired}
          onChange={(e) =>
            !props.display && props.handleChange(props.id, e, props.type)
          }
        />
      );
    case "textarea":
      return (
        <textarea
          className="form-control"
          // value={props.value?.toString()}
           value={props.value != null ? props.value.toString() : ""}
          placeholder={props.placeholder}
          required={props.isRequired}
          onChange={(e) =>
            !props.display &&
            props.handleChange(
              props.id,
              e,
              props.type,
              props.labelEdit ? true : false
            )
          }
        ></textarea>
      );
    case "select":
      return (
        <div className="d-flex row col-12">
          <div className={`d-flex  ${props.labelEdit ? "col-6" : "col-12"} `}>
            <DropDownMenu
              className="col-12 w-100"
              options={props.options}
              option={props.value}
              setOption={(value: any) =>
                props.handleChange(props.id, value, props.type)
              }
              optionsHandler={optionsHandler}
              display={props.display}
              selectionAvailable={props.labelEdit ? false : true}
              placeholder={intl.formatMessage({ id: "Choices" })}
              required={props.isRequired}
            />
          </div>
          {props.labelEdit ? (
            <>
              <div className="col-1">
                <i
                  onClick={() => {
                    if (option) {
                      props.handleChange(
                        props.id,
                        option,
                        props.type,
                        props.labelEdit ? true : false
                      );
                      setOption("");
                    }
                  }}
                  className="fa-solid fa-angles-right add-select"
                ></i>
              </div>
              <div className="d-flex col-5">
                <input
                  className="form-control col-6"
                  type="text"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  placeholder={intl.formatMessage({ id: "ChoiceName" })}
                />
              </div>
            </>
          ) : null}
        </div>
      );
    default:
      return null;
  }
};

interface labelProps {
  editable: boolean;
  handleLabelChange: any;
  id: string;
  label: string;
  handleRequire: any;
  isRequired: boolean;
  labelFor: string;
  editForm?: boolean | undefined;
}

const Label: FC<labelProps> = ({
  editable,
  editForm,
  handleLabelChange,
  id,
  label,
  handleRequire,
  isRequired,
  labelFor,
}) => {
  let intl = useIntl();

  const [required, setRequired] = useState(false);
  const [labelText, setLabelText] = useState(label);
  const requiredHandler = () => {
    if (editable) {
      setRequired((prev) => !prev);
      handleRequire(id, !required);
    }
  };
  useEffect(() => {
    setRequired(isRequired);
  }, []);

  return (
    <>
      {editable ? (
        <div className="d-flex align-items-center">
          <label
            onInput={(event) => handleLabelChange(event, id, false)}
            className="input-label"
            contentEditable
            suppressContentEditableWarning={true}
          >
            {editForm ? labelText : intl.formatMessage({ id: "FieldName" })}
          </label>
          {labelFor != "radio" && labelFor != "checkbox" && (
            <span
              title={intl.formatMessage({ id: "MakeRequeired" })}
              className={`text-xl required-option cursor-pointer fs-22px ${required && "active-required text-danger"}`}
              onClick={requiredHandler}
            >
              *
            </span>
          )}
        </div>
      ) : (
        <label
          className={`input-label ${isRequired && labelFor !== "radio" && labelFor !== "checkbox" && "required"}`}
        >
          {label}
        </label>
      )}
    </>
  );
};

type HintsProps = {
  id: string;
  hints: string[];
  editable: boolean;
  onChange?: any;
  isCollection: boolean;
};
const Hints: FC<HintsProps> = ({
  id,
  hints,
  editable,
  onChange,
  isCollection,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  let intl = useIntl();

  return (
    <>
      {editable ? (
        <>
          {showInput ? (
            <div>
              <textarea
                onChange={(e) => onChange(e, id, isCollection)}
                className="form-control mt-1"
              ></textarea>
            </div>
          ) : null}
          <i
            // onMouseMove={() => setShowLabel(true)}
            // onMouseOut={() => setShowLabel(false)}
            onClick={() => setShowInput(true)}
            className="fa-solid fa-notes-medical fs-5 mx-2 mt-2 text-primary cursor-pointer opacity-50 hover-opacity-100"
          ></i>
          <span className={`${showLabel ? "add-hint" : "fade-hint"} text-sx`}>
            {editable ? hints : intl.formatMessage({ id: "AddNote" })}
          </span>
        </>
      ) : hints ? (
        <div className="">
          <i className="fa-solid fa-info-circle opacity-50 text-muted p-2"></i>
          <span className="text-xs fs-8 text-muted ">{hints}</span>
        </div>
      ) : null}
    </>
  );
};

export { InputField, Label, Hints };
