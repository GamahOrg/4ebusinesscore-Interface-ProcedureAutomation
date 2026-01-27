import {
    FormElementsTypes,
    formElements,
  } from "../../../../partials/inputs/inputs-typies";
  import { FC, useEffect, useState } from "react";
  import {
    InputField,
    Label,
  } from "./Inputs";
  import FormElement from "./FormElement";
  import { useIntl } from "react-intl";
  
  const DynamicForm: FC<{ setQuestionsList?: any; formInputs?: any , display?:boolean,changed?:number }> = ({
    setQuestionsList = (x: any) => {},
    formInputs,
    display=false,changed=0
  }) => {
    const [inputs, setInputs] = useState<any[]>([]);
  const [collectionLabels, setCollectionLabels] = useState<string[]>([]);

    let intl = useIntl();
  
    const renderInputElement = (input: any) => {
      return (
          <div className={`d-flex justify-content-end ${input.inputType == "radio" ||input.inputType == "checkbox" ? "flex-row-reverse" :"flex-column" }`}>
              <Label 
                  labelFor={input.inputType} 
                  isRequired={input.required} 
                  handleRequire={handleRequire} 
                  label={input.label} 
                  handleLabelChange={handleLabelChange} 
                  id={input.id} 
                  editable={formInputs ? false : true}  />
              <InputField
                  label={input.label}
                  labelEdit={formInputs ? false : true}
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
              />
              <div></div>
          </div>
  
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
      const foundCollectionIndex = inputs.findIndex(collection=> collection.id === id);
      let tempInputs = [...inputs]
      if (foundCollectionIndex !== -1) {
        const firstInput = { ...inputs[foundCollectionIndex].inputs[0] };
        if(firstInput.inputType=='radio'){
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
                      return { ...input, label: value,};
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
  
    const handleChange = (id: string, value: string, change: string,creation:boolean) => {
      let updatedInputs = inputs.map((collection) => {
        return {
          ...collection,
          inputs: collection.inputs.map((input: any) => {
              if (input.id == id) {
                  switch (change) {
                      case "text":
                      case "textarea":
                          input.value = value
                          creation&&(input.placeholder = value)
                          break;
                      case "date":
                      case "time":
                          input.value = value;
                          break;
                      case "radio":
                      case "checkbox":
                          input.checked = value;
                          break;
                      case "select":
                          creation?(
                            Array.isArray(value)?
                              input.options =value
                              :input.options.push({name:value,value})
                          )
                            :input.value = value;
                          break;
                  }
              }
              return input;
          }),
        };
      });
      setInputs(updatedInputs);
    };
    
    const handleRequire=(id:string,value:boolean)=>{
      inputs.map((collection:any) => {
          return {
            ...collection,
            inputs: collection.inputs.map((input: any) => {
               if(input.id==id){
                  input.required=value
               }
            })
          }
      })
    }
  
    useEffect(() => {
      if (formInputs ) {
      var labels: string[] = [];

          if(!display){
            formInputs.map((collection:any) => {
          labels.push(collection.label);

                return {
                  ...collection,
                  inputs: collection.inputs.map((input: any) => {
                    if(input.inputType=='text'||input.inputType=='textarea'){
                        input.value=''
                    }  
                  })
                }
            })
          }
          setInputs(formInputs);
      setCollectionLabels(labels);

        }
    }, [changed]);
  
    useEffect(() => {
      setQuestionsList(inputs);
    }, [inputs]);
  
  
    return (
      <form id="dynamic_form">
  
      <div className="row col-12 ">
        {!formInputs && (
          <div className="inputs-menu menu col-4 d-flex flex-column rounded p-1 border">
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
          className={`show inputs-elements relative pt-3 ${
            formInputs ? "col-12" : "col-8"
          }`}
        >
          {inputs.length ? (
            <>
              {inputs.length > 1 && !formInputs && (
                <span onClick={() => setInputs([])} className="clear-all">
                  {" "}
                  {intl.formatMessage({ id: "DeleteAll" })}
                </span>
              )}
              {inputs.map((collection: any, index: number) => (
                <div className="relative">
                  {!formInputs && (
                    <div className="input-actions">
                      {collection.type == "radio" ||
                      collection.type == "checkbox" ? (
                        <i
                          onClick={() => addHandler(collection.id)}
                          className="fa-solid fa-circle-plus"
                        ></i>
                      ) : null}
                      <i
                        onClick={() => deleteHandler(collection.id)}
                        className="fa-solid fa-trash-can mx-3"
                      ></i>
                      {/* <i className="fa-solid fa-gear"></i> */}
                    </div>
                  )}
                  {(collection.type == "radio" ||
                    collection.type == "checkbox") && (
                    <label
                      className="main-label"
                      contentEditable={formInputs ? false : true}
                      suppressContentEditableWarning={true}
                      onInput={(event) => handleLabelChange(event, collection.id)}
                    >
 {collectionLabels[index]
                        ? collectionLabels[index]
                        : intl.formatMessage({ id: "ChoicesName" })}{" "}                    </label>
                  )}
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
                            {collection.inputs.length > 1 && !formInputs && (
                              <i
                                onClick={() => deleteHandler(input.id, false)}
                                className="fa-solid fa-square-minus mt-2"
                              ></i>
                            )}
                          </div>
                        ))
                      : renderInputElement(collection.inputs[0])}
                  </div>
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
  