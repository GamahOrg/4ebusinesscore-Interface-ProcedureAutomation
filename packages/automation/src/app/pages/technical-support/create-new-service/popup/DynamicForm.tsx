import {
  FormElementsTypes,
  formElements,
} from "../../../../partials/inputs/inputs-typies";
import { FC, useEffect, useState } from "react";
import { Hints, InputField, Label } from "./Inputs";
import FormElement from "./FormElement";
import { useIntl } from "react-intl";

const DynamicForm: FC<{
  setQuestionsList?: any;
  formInputs?: any;
  display?: boolean;
  editForm?: boolean;
  setIsLabelsExist?: any;
  rerender?: number;
}> = ({
  setQuestionsList = (x: any) => {},
  formInputs,
  display = false,
  editForm,
  setIsLabelsExist,
  rerender,
}) => {
  const [inputs, setInputs] = useState<any[]>([]);
  const [collectionLabels, setCollectionLabels] = useState<string[]>([]);
  let intl = useIntl();

  const [required, setRequired] = useState(false);
  const requiredHandler = (id: any, editable: any) => {
    if (editable) {
      setRequired((prev) => !prev);
      handleRequire(id, !required);
    }
  };

  const renderInputElement = (input: any) => {
    return (
      <>
        <div
          className={`d-flex justify-content-end ${
            input.inputType == "radio" || input.inputType == "checkbox"
              ? "flex-row-reverse"
              : "flex-column"
          }`}
        >
          <Label
            labelFor={input.inputType}
            isRequired={input.required}
            handleRequire={handleRequire}
            label={input.label}
            handleLabelChange={handleLabelChange}
            id={input.id}
            editable={formInputs && !editForm ? false : true}
            editForm={editForm}
          />

          <InputField
            label={input.label}
            labelEdit={formInputs && !editForm ? false : true}
            handleLabelChange={handleLabelChange}
            handleChange={handleChange}
            value={input.value}
            checked={input.checked}
            id={input.id}
            name={input.name}
            options={input.options}
            type={input.inputType}
            display={display}
            placeholder={input.placeholder}
            isRequired={input.required}
            file={input.file}
          />
          <div
            className={`${
              input.inputType !== "radio" && input.inputType !== "checkbox"
                ? "show"
                : "d-none"
            }`}
          >
            <Hints
              id={input.id}
              editable={formInputs && !editForm ? false : true}
              onChange={handleHintChange}
              hints={input?.hints}
              isCollection={false}
            />
          </div>
        </div>
      </>
    );
  };
  const deleteHandler = (id = "", isCollection = true) => {
    let updatedInputs;
    if (isCollection) {
      updatedInputs = inputs.filter((collection) => collection.id !== id);
    } else {
      updatedInputs = inputs.map((collection) => {
        return {
          ...collection,
          inputs: collection.inputs.filter((input: any) => input.id !== id),
        };
      });
    }
    setInputs(updatedInputs);
  };

  const addHandler = (id: string = "") => {
    const foundCollectionIndex = inputs.findIndex(
      (collection) => collection.id === id,
    );
    let tempInputs = [...inputs];
    if (foundCollectionIndex !== -1) {
      const firstInput = { ...inputs[foundCollectionIndex].inputs[0] };
      if (firstInput.inputType == "radio") {
        // firstInput.checked = true;
      }
      firstInput.id = Math.random().toString().slice(10);
      tempInputs[foundCollectionIndex].inputs.push(firstInput);
      setInputs([...tempInputs]);
    }
  };

  const handleLabelChange = (event: any, id: string, isCollection = true) => {
    const value = event.target.innerText;
    let tempInputs = [];

    tempInputs = inputs.map((collection) => {
      if (isCollection && collection.id === id) {
        return {
          ...collection,
          label: value,
        };
      } else if (!isCollection) {
        const updatedInputs = collection.inputs.map((input: any) => {
          if (input.id === id) {
            return { ...input, label: value };
          }
          return input;
        });
        return {
          ...collection,
          inputs: updatedInputs,
        };
      }
      return collection;
    });
    setInputs(tempInputs);
  };

  const handleHintChange = (event: any, id: string, isCollection = true) => {
    const value = event.target.value;
    let tempInputs = [];

    tempInputs = inputs.map((collection) => {
      if (isCollection && collection.id === id) {
        return {
          ...collection,
          hints: value,
        };
      } else if (!isCollection) {
        const updatedInputs = collection.inputs.map((input: any) => {
          if (input.id === id) {
            return { ...input, hints: value };
          }
          return input;
        });
        return {
          ...collection,
          inputs: updatedInputs,
        };
      }
      return collection;
    });
    setInputs(tempInputs);
  };
  const handleChange = (
    id: string,
    e: any,
    change: string,
    creation: boolean,
  ) => {
    let value = e?.target?.value;
    let updatedInputs = inputs.map((collection) => {
      return {
        ...collection,
        inputs: collection.inputs.map((input: any) => {
          if (input.id == id) {
            switch (change) {
              case "text":
              case "textarea":
                input.value = value;
                creation && (input.placeholder = value);
                break;
              case "date":
              case "time":
              case "datetime-local":
                input.value = value;
                break;
              case "radio":
              case "checkbox":
                input.checked = e?.target?.checked;
                break;
              case "select":
                creation
                  ? Array.isArray(e)
                    ? (input.options = e)
                    : input.options.push({ name: e, e })
                  : (input.value = e);
                break;
              case "file":
                input.value = value;
                let file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                      const base64String = reader?.result?.split(",")[1]; // Extract base64 part
                      input.file = base64String;
                    }
                  };
                  reader.readAsDataURL(file);
                }
                break;
            }
          }
          return input;
        }),
      };
    });
    setInputs(updatedInputs);
  };

  const handleRequire = (id: string, value: boolean) => {
    inputs.map((collection: any) => {
      return {
        ...collection,
        inputs: collection.inputs.map((input: any) => {
          if (input.id == id) {
            input.required = value;
          }
        }),
      };
    });
  };
  useEffect(() => {
    if (formInputs) {
      var labels: string[] = [];
      if (!display) {
        formInputs.map((collection: any) => {
          labels.push(collection.label);
          return {
            ...collection,
            inputs: collection.inputs.map((input: any) => {
              if (
                input.inputType === "text" ||
                input.inputType === "textarea"
              ) {
                input.value = "";
              }
            }),
          };
        });
      } else {
        formInputs?.map((collection: any) => {
          labels.push(collection.label);
          return {
            ...collection,
            inputs: collection.inputs,
          };
        });
      }
      setInputs(formInputs);
      setCollectionLabels(labels);
    }
  }, [rerender]);

  useEffect(() => {
    setQuestionsList(inputs);
  }, [inputs]);

  return (
    <form id="dynamic_form">
      <div className="row col-12 ">
        {editForm && (
          <div className=" menu col-4 d-flex flex-column rounded p-1 border">
            {Object.keys(formElements).map((elementType) => (
              <FormElement
                setInputs={setInputs}
                key={elementType}
                elementType={elementType as FormElementsTypes}
              />
            ))}
          </div>
        )}

        <div
          className={`show inputs-elements relative pt-3  ${
            formInputs && !editForm ? "col-12" : "col-8"
          }`}
        >
          {inputs.length ? (
            <>
              {inputs.length > 1 && formInputs && (
                <div className="d-flex justify-content-end  ">
                  <div
                    onClick={() => setInputs([])}
                    className="clear-all my-3 symbol-label bg-light-danger text-danger cursor-pointer p-4 rounded-1"
                  >
                    {" "}
                    <i className="fa-solid fa-trash-can mx-3"></i>
                    <span> {intl.formatMessage({ id: "DeleteAll" })}</span>
                  </div>
                </div>
              )}
              {inputs.map((collection: any, index: number) => (
                <div className="relative" key={collection.id || index}>
                  {(collection.type == "radio" ||
                    collection.type == "checkbox") &&
                    (formInputs && !editForm ? (
                      <label
                        className={`text-muted position-relative ms-0 top-0 ${
                          collection?.inputs?.some(
                            (input: any) => input.required === true,
                          ) && "required"
                        }`}
                        contentEditable={false}
                        suppressContentEditableWarning={true}
                        onInput={(event) =>
                          handleLabelChange(event, collection.id)
                        }
                      >
                        {collectionLabels[index]
                          ? collectionLabels[index]
                          : intl.formatMessage({ id: "ChoicesName" })}
                      </label>
                    ) : (
                      <>
                        <label
                          className="main-label position-relative ms-0 top-0"
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onInput={(event) =>
                            handleLabelChange(event, collection.id)
                          }
                        >
                          {collectionLabels[index]
                            ? collectionLabels[index]
                            : intl.formatMessage({ id: "ChoicesName" })}
                        </label>
                        <span
                          title={intl.formatMessage({ id: "MakeRequeired" })}
                          className={`text-xl required-option  cursor-pointer fs-22px ${
                            collection?.inputs?.some(
                              (input: any) => input.required === true,
                            ) && "active-required  text-danger"
                          }`}
                          onClick={() => requiredHandler(collection?.id, true)}
                        >
                          *
                        </span>
                      </>
                    ))}
                  <div
                    key={index}
                    className={`${
                      formInputs ? "shadow-sm" : ""
                    } border px-5 py-3 pt-4 rounded my-3 d-flex flex-column`}
                  >
                    {collection.type == "radio" || collection.type == "checkbox"
                      ? collection.inputs.map((input: any, index: any) => (
                          <div key={index} className="input-cont d-flex">
                            {renderInputElement(input)}
                            {collection.inputs.length > 1 && editForm && (
                              <i
                                onClick={() => deleteHandler(input.id, false)}
                                className="fa-solid fa-square-minus mt-2"
                              ></i>
                            )}
                          </div>
                        ))
                      : renderInputElement(collection.inputs[0])}
                    {collection.type == "radio" ||
                    collection.type == "checkbox" ? (
                      <div>
                        <Hints
                          id={collection.id}
                          editable={formInputs && !editForm ? false : true}
                          onChange={handleHintChange}
                          hints={collection.hints}
                          isCollection={true}
                        />
                      </div>
                    ) : null}
                  </div>
                  {(!formInputs || editForm) && (
                    <div className="input-actions mb-8">
                      {collection.type == "radio" ||
                      collection.type == "checkbox" ? (
                        <i
                          onClick={() => addHandler(collection.id)}
                          className="fa-solid fa-circle-plus"
                        ></i>
                      ) : null}
                      <i
                        onClick={() => deleteHandler(collection.id)}
                        className="fa-solid fa-trash-can mx-3 cursor-pointer"
                      ></i>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            !formInputs && <i className="fa-solid fa-paste icon-no-input"></i>
          )}
        </div>
      </div>
    </form>
  );
};

export default DynamicForm;
