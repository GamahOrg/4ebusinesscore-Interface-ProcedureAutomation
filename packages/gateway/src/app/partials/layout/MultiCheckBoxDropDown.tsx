import React, { FC, useState } from "react";
import { useIntl } from "react-intl";

type option = {
  id: string;
  name: string;
};

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  options: option[];
  selectTitle?: string;
}

const MultiCheckBoxDropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  options,
  selectTitle = "Select",
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsCheck = (optionName: string) => {
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter((name: string) => name !== optionName));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  };

  return (
    <>
      <div className="position-relative">
        <button
          className="btn btn-transparent border w-100 d-flex justify-content-start flex-wrap btn-dropdwon bg-gray-200"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions && selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : intl.formatMessage({ id: selectTitle })}
        </button>
        
        {isOpen && (
          <div className="position-absolute w-100 bg-white border rounded shadow-sm mt-1" style={{ zIndex: 1000 }}>
            <div className="overflow-auto" style={{ maxHeight: "200px" }}>
              <ul className="list-unstyled p-0 m-0">
                {options?.map((option) => (
                  <li key={option?.id} className="border-bottom">
                    <button
                      className="w-100 btn btn-light d-flex justify-content-between align-items-center py-2 px-3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleIsCheck(option?.name);
                      }}
                    >
                      <label className="form-check-label mb-0" htmlFor={`Checkme1-${option.id}`}>
                        {option?.name}
                      </label>
                      <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          checked={selectedOptions.includes(option?.name)}
                          type="checkbox"
                          value={option?.name}
                          id={`Checkme1-${option.id}`}
                          onChange={() => handleIsCheck(option?.name)}
                        />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MultiCheckBoxDropDown;
