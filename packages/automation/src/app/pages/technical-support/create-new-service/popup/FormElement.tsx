import { useEffect, useState } from "react";
import { FormElementsTypes, InputModel, LabelNameOfType, formElements } from "../../../../partials/inputs/inputs-typies";
import { useIntl } from "react-intl";

interface FormElementProps {
    elementType: FormElementsTypes;
    setInputs: React.Dispatch<React.SetStateAction<any[]>>;
}

const FormElement: React.FC<FormElementProps> = ({ elementType, setInputs }) => {
    
    let intl = useIntl();
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        elementType=='input'&&setOpen(true)
    },[])
    const addInputHandler = async(inputType: string , type:string) => {
        let tempInput = new InputModel();
        tempInput.inputType=inputType;
        tempInput.type=type;
        tempInput.label=intl.formatMessage({ id: "FieldName" });
        tempInput.id=Math.random().toString().slice(10);
        tempInput.name=Math.random().toString().slice(10);
        let collection = {
            id:tempInput.id,
            type:inputType,
            inputs:[tempInput],
            label:""
        }
        if(inputType=='radio' || inputType=='checkbox'){
            collection = {...collection,label:intl.formatMessage({ id: "ChoicesName" })}
        }
       
        setInputs(prevInputs => [...prevInputs,collection]);
    };
    
    return (
        <div className="col-12 cursor-pointer" key={elementType}>
            <h6 onClick={() => setOpen(prev => !prev)} className={`rounded bg-light p-3 cursor-pointer ${open?"text-gray-800":"text-gray-500"}`}>
                {LabelNameOfType[elementType as keyof typeof LabelNameOfType]}{" "}
                <i className={`fa-solid ${open ? "fa-angle-up" : "fa-angle-down"}`}></i>
            </h6> 
            <div className={`element-container pb-4 ${open ? "open" : ""}`}>
                {open && formElements[elementType].map((element, index) => (
                    <div onClick={() => addInputHandler(element,elementType)} className="mx-2  d-flex justify-content-between px-2 py-1  form-element" key={index}>
                        <label className="cursor-pointer text-gray-800" htmlFor={`${elementType}-${index}`}>
                            {LabelNameOfType[element as keyof typeof LabelNameOfType]}{" "}
                            <sub className="type-name text-gray-500">( {element} )</sub>
                        </label>
                        <i className="fa-regular fa-square-plus text-primary opacity-50 mt-2"></i>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormElement